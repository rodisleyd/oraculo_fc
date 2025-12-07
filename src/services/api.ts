import { Team, League, Match } from '../types';
import { mockApi, LEAGUES, TEAMS } from '../data/mock';

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const BASE_URL = 'https://api.football-data.org/v4';

const headers = {
    'X-Auth-Token': API_TOKEN || '',
};

// Cache duration: 1 hour for static data, 1 minute for live data
const CACHE_DURATION = {
    STATIC: 60 * 60 * 1000,
    LIVE: 60 * 1000,
};

const getFromCache = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { data, timestamp, expiry } = JSON.parse(item);
    if (Date.now() - timestamp > expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return data;
};

const setCache = (key: string, data: any, duration: number) => {
    localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now(),
        expiry: duration
    }));
};

// Mappings to convert API data to our App types
const mapTeam = (apiTeam: any, leagueId?: string): Team => ({
    id: apiTeam.id.toString(),
    name: apiTeam.shortName || apiTeam.name,
    leagueId: leagueId || 'unknown',
    logo: apiTeam.crest,
    colors: apiTeam.clubColors ? apiTeam.clubColors.split(' / ').map((c: string) => c.toLowerCase()) : ['#000000'],
    founded: apiTeam.founded,
    stadium: apiTeam.venue,
});

const mapMatch = (apiMatch: any): Match => ({
    id: apiMatch.id.toString(),
    homeTeamId: apiMatch.homeTeam.id.toString(),
    awayTeamId: apiMatch.awayTeam.id.toString(),
    homeScore: apiMatch.score.fullTime.home,
    awayScore: apiMatch.score.fullTime.away,
    status: apiMatch.status === 'IN_PLAY' ? 'LIVE' : apiMatch.status,
    time: apiMatch.status === 'IN_PLAY' ? `${Math.floor((Date.now() - new Date(apiMatch.utcDate).getTime()) / 60000)}'` : new Date(apiMatch.utcDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    date: new Date(apiMatch.utcDate).toISOString().split('T')[0],
    leagueId: apiMatch.competition.code.toLowerCase(), // This might need better mapping
    homeTeam: mapTeam(apiMatch.homeTeam),
    awayTeam: mapTeam(apiMatch.awayTeam),
});

export const api = {
    getTeams: async (): Promise<Team[]> => {
        if (!API_TOKEN) return mockApi.getTeams();

        // Example: Fetching teams from Premier League (PL) as a default
        const cacheKey = 'api_teams_PL';
        const cached = getFromCache<Team[]>(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(`${BASE_URL}/competitions/PL/teams`, { headers });
            if (!response.ok) throw new Error('Failed to fetch teams');
            const data = await response.json();
            const teams = data.teams.map((t: any) => mapTeam(t, 'eng-pl'));
            setCache(cacheKey, teams, CACHE_DURATION.STATIC);
            return teams;
        } catch (error) {
            console.error('API Error:', error);
            return mockApi.getTeams();
        }
    },

    getTeamById: async (id: string): Promise<Team | undefined> => {
        if (!API_TOKEN) return mockApi.getTeamById(id);

        const cacheKey = `api_team_${id}`;
        const cached = getFromCache<Team>(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(`${BASE_URL}/teams/${id}`, { headers });
            if (!response.ok) throw new Error('Failed to fetch team');
            const data = await response.json();
            const team = mapTeam(data);
            setCache(cacheKey, team, CACHE_DURATION.STATIC);
            return team;
        } catch (error) {
            console.error('API Error:', error);
            return mockApi.getTeamById(id);
        }
    },

    getLeagues: () => mockApi.getLeagues(), // The API has competitions, but our mock list is curated. Keeping mock for now or fetching competitions.

    getMatches: async (): Promise<Match[]> => {
        if (!API_TOKEN) return mockApi.getMatches();

        const cacheKey = 'api_matches_today';
        const cached = getFromCache<Match[]>(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(`${BASE_URL}/matches`, { headers }); // Fetches matches for today by default
            if (!response.ok) throw new Error('Failed to fetch matches');
            const data = await response.json();
            const matches = data.matches.map(mapMatch);
            setCache(cacheKey, matches, CACHE_DURATION.LIVE);
            return matches;
        } catch (error) {
            console.error('API Error:', error);
            return mockApi.getMatches();
        }
    },

    getLiveMatches: async (): Promise<Match[]> => {
        if (!API_TOKEN) return mockApi.getLiveMatches();
        // Reusing getMatches logic but filtering or using specific endpoint if available
        const matches = await api.getMatches();
        return matches.filter(m => m.status === 'LIVE' || m.status === 'IN_PLAY' || m.status === 'PAUSED');
    },

    search: async (query: string) => {
        // Search is complex with this API, falling back to mock or implementing basic local filtering on cached data
        return mockApi.search(query);
    }
};
