import { Team, League, Match, NewsItem, Player } from '../types';

// --- MOCK DATABASE ---

export const LEAGUES: League[] = [
  { id: 'bra-a', name: 'Brasileirão Série A', country: 'Brasil', continent: 'América do Sul', logo: '🇧🇷' },
  { id: 'eng-pl', name: 'Premier League', country: 'Inglaterra', continent: 'Europa', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'esp-ll', name: 'La Liga', country: 'Espanha', continent: 'Europa', logo: '🇪🇸' },
  { id: 'libertadores', name: 'Libertadores', country: 'América do Sul', continent: 'América do Sul', logo: '🏆' },
  { id: 'ucl', name: 'Champions League', country: 'Europa', continent: 'Europa', logo: '🇪🇺' },
];

export const TEAMS: Team[] = [
  { id: 'fla', name: 'Flamengo', leagueId: 'bra-a', logo: '🔴', colors: ['#C3281E', '#000000'], founded: 1895, stadium: 'Maracanã' },
  { id: 'pal', name: 'Palmeiras', leagueId: 'bra-a', logo: '🟢', colors: ['#006437', '#FFFFFF'], founded: 1914, stadium: 'Allianz Parque' },
  { id: 'cor', name: 'Corinthians', leagueId: 'bra-a', logo: '⚪', colors: ['#000000', '#FFFFFF'], founded: 1910, stadium: 'Neo Química Arena' },
  { id: 'mci', name: 'Man City', leagueId: 'eng-pl', logo: '🔵', colors: ['#6CABDD', '#FFFFFF'], founded: 1880, stadium: 'Etihad Stadium' },
  { id: 'liv', name: 'Liverpool', leagueId: 'eng-pl', logo: '🔴', colors: ['#C8102E', '#FFFFFF'], founded: 1892, stadium: 'Anfield' },
  { id: 'rma', name: 'Real Madrid', leagueId: 'esp-ll', logo: '👑', colors: ['#FFFFFF', '#FEBE10'], founded: 1902, stadium: 'Santiago Bernabéu' },
  { id: 'bar', name: 'Barcelona', leagueId: 'esp-ll', logo: '🔵🔴', colors: ['#004D98', '#A50044'], founded: 1899, stadium: 'Camp Nou' },
];

export const MATCHES: Match[] = [
  { id: 'm1', homeTeamId: 'fla', awayTeamId: 'pal', homeScore: null, awayScore: null, status: 'SCHEDULED', time: '16:00', date: '2025-05-20', leagueId: 'bra-a' },
  { id: 'm2', homeTeamId: 'liv', awayTeamId: 'mci', homeScore: 1, awayScore: 1, status: 'LIVE', time: "67'", date: '2025-05-19', leagueId: 'eng-pl' },
  { id: 'm3', homeTeamId: 'rma', awayTeamId: 'bar', homeScore: 3, awayScore: 1, status: 'FINISHED', time: 'FT', date: '2025-05-18', leagueId: 'esp-ll' },
  { id: 'm4', homeTeamId: 'cor', awayTeamId: 'fla', homeScore: 0, awayScore: 2, status: 'FINISHED', time: 'FT', date: '2025-05-10', leagueId: 'bra-a' },
];

export const NEWS: NewsItem[] = [
  { 
    id: 'n1', 
    title: 'Flamengo negocia novo atacante', 
    summary: 'Diretoria rubro-negra busca reforço de peso na Europa para a janela de meio de ano.', 
    imageUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/black/red?text=Mercado', 
    timestamp: '2025-05-19T10:00:00Z', 
    category: 'Transferências',
    relatedTeamIds: ['fla']
  },
  { 
    id: 'n2', 
    title: 'City assume liderança provisória', 
    summary: 'Com empate no clássico, time de Guardiola dorme no topo da tabela.', 
    imageUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/skyblue/white?text=Premier', 
    timestamp: '2025-05-19T18:00:00Z', 
    category: 'Resumo da Rodada',
    relatedTeamIds: ['mci', 'liv']
  }
];

// Helper functions to simulate API calls
export const mockApi = {
  getTeams: () => TEAMS,
  getTeamById: (id: string) => TEAMS.find(t => t.id === id),
  getLeagues: () => LEAGUES,
  getMatches: () => MATCHES.map(m => ({
    ...m,
    homeTeam: TEAMS.find(t => t.id === m.homeTeamId),
    awayTeam: TEAMS.find(t => t.id === m.awayTeamId),
    league: LEAGUES.find(l => l.id === m.leagueId)
  })),
  getLiveMatches: () => MATCHES.filter(m => m.status === 'LIVE' || m.status === 'BREAK').map(m => ({
    ...m,
    homeTeam: TEAMS.find(t => t.id === m.homeTeamId),
    awayTeam: TEAMS.find(t => t.id === m.awayTeamId),
    league: LEAGUES.find(l => l.id === m.leagueId)
  })),
  search: (query: string) => {
    const q = query.toLowerCase();
    return {
      teams: TEAMS.filter(t => t.name.toLowerCase().includes(q)),
      leagues: LEAGUES.filter(l => l.name.toLowerCase().includes(q)),
    };
  }
};
