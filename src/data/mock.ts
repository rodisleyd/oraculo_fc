import { Team, League, Match, NewsItem, Player } from '../types';

// --- MOCK DATABASE ---

export const LEAGUES: League[] = [
  { id: 'bra-bsa', name: 'Brasileirão Série A', country: 'Brasil', continent: 'América do Sul', logo: '🇧🇷' },
  { id: 'eng-pl', name: 'Premier League', country: 'Inglaterra', continent: 'Europa', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'esp-pd', name: 'La Liga', country: 'Espanha', continent: 'Europa', logo: '🇪🇸' },
  { id: 'south-america-cli', name: 'Libertadores', country: 'América do Sul', continent: 'América do Sul', logo: '🏆' },
  { id: 'eur-cl', name: 'Champions League', country: 'Europa', continent: 'Europa', logo: '🇪🇺' },
];

export const TEAMS: Team[] = [
  // Brasileirão
  { id: 'fla', name: 'Flamengo', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1783.png', colors: ['#C3281E', '#000000'], founded: 1895, stadium: 'Maracanã' },
  { id: 'pal', name: 'Palmeiras', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1769.png', colors: ['#006437', '#FFFFFF'], founded: 1914, stadium: 'Allianz Parque' },
  { id: 'bot', name: 'Botafogo', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1770.png', colors: ['#000000', '#FFFFFF'], founded: 1904, stadium: 'Nilton Santos' },
  { id: 'for', name: 'Fortaleza', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/3984.png', colors: ['#1C3C75', '#FFFFFF', '#CE1126'], founded: 1918, stadium: 'Castelão' },
  { id: 'int', name: 'Internacional', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1768.png', colors: ['#FF0000', '#FFFFFF'], founded: 1909, stadium: 'Beira-Rio' },
  { id: 'spfc', name: 'São Paulo', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1776.png', colors: ['#FE0000', '#FFFFFF', '#000000'], founded: 1930, stadium: 'Morumbi' },
  { id: 'cor', name: 'Corinthians', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1779.png', colors: ['#000000', '#FFFFFF'], founded: 1910, stadium: 'Neo Química Arena' },
  { id: 'bah', name: 'Bahia', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1777.png', colors: ['#009CA6', '#FFFFFF', '#CE1126'], founded: 1931, stadium: 'Arena Fonte Nova' },
  { id: 'cru', name: 'Cruzeiro', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1771.png', colors: ['#005CA9', '#FFFFFF'], founded: 1921, stadium: 'Mineirão' },
  { id: 'vas', name: 'Vasco', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1780.png', colors: ['#000000', '#FFFFFF'], founded: 1898, stadium: 'São Januário' },
  { id: 'vit', name: 'Vitória', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1782.png', colors: ['#FF0000', '#000000'], founded: 1899, stadium: 'Barradão' },
  { id: 'cam', name: 'Atlético-MG', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1766.png', colors: ['#000000', '#FFFFFF'], founded: 1908, stadium: 'Arena MRV' },
  { id: 'flu', name: 'Fluminense', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1765.png', colors: ['#9F022D', '#035D43', '#FFFFFF'], founded: 1902, stadium: 'Maracanã' },
  { id: 'gre', name: 'Grêmio', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1767.png', colors: ['#0D80BF', '#000000', '#FFFFFF'], founded: 1903, stadium: 'Arena do Grêmio' },
  { id: 'red', name: 'Bragantino', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/4286.png', colors: ['#FFFFFF', '#CE1126'], founded: 1928, stadium: 'Nabi Abi Chedid' },
  { id: 'juv', name: 'Juventude', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/4266.png', colors: ['#00913F', '#FFFFFF'], founded: 1913, stadium: 'Alfredo Jaconi' },
  // 2025 Promoted
  { id: 'san', name: 'Santos', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/6685.png', colors: ['#FFFFFF', '#000000'], founded: 1912, stadium: 'Vila Belmiro' },
  { id: 'mir', name: 'Mirassol', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/6019.png', colors: ['#FFC125', '#009000'], founded: 1925, stadium: 'Maião' },
  { id: 'spt', name: 'Sport', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1792.png', colors: ['#000000', '#CC0000'], founded: 1905, stadium: 'Ilha do Retiro' },
  { id: 'cea', name: 'Ceará', leagueId: 'bra-bsa', logo: 'https://crests.football-data.org/1054.png', colors: ['#000000', '#FFFFFF'], founded: 1914, stadium: 'Castelão' },

  // Internacional
  { id: 'mci', name: 'Man City', leagueId: 'eng-pl', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', colors: ['#6CABDD', '#FFFFFF'], founded: 1880, stadium: 'Etihad Stadium' },
  { id: 'liv', name: 'Liverpool', leagueId: 'eng-pl', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', colors: ['#C8102E', '#FFFFFF'], founded: 1892, stadium: 'Anfield' },
  { id: 'rma', name: 'Real Madrid', leagueId: 'esp-pd', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', colors: ['#FFFFFF', '#FEBE10'], founded: 1902, stadium: 'Santiago Bernabéu' },
  { id: 'bar', name: 'Barcelona', leagueId: 'esp-pd', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', colors: ['#004D98', '#A50044'], founded: 1899, stadium: 'Camp Nou' },
];

export const MATCHES: Match[] = [
  { id: 'm1', homeTeamId: 'fla', awayTeamId: 'pal', homeScore: null, awayScore: null, status: 'SCHEDULED', time: '16:00', date: '2025-05-20', leagueId: 'bra-bsa' },
  { id: 'm2', homeTeamId: 'liv', awayTeamId: 'mci', homeScore: 1, awayScore: 1, status: 'LIVE', time: "67'", date: '2025-05-19', leagueId: 'eng-pl' },
  { id: 'm3', homeTeamId: 'rma', awayTeamId: 'bar', homeScore: 3, awayScore: 1, status: 'FINISHED', time: 'FT', date: '2025-05-18', leagueId: 'esp-pd' },
  { id: 'm4', homeTeamId: 'cor', awayTeamId: 'fla', homeScore: 0, awayScore: 2, status: 'FINISHED', time: 'FT', date: '2025-05-10', leagueId: 'bra-bsa' },
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
