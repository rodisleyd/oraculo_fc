export interface Team {
  id: string;
  name: string;
  logo: string;
  leagueId: string;
  colors: [string, string];
  founded: number;
  stadium: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  continent: string;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'BREAK';
  time: string; // "45+2'", "16:00", "FT"
  date: string;
  leagueId: string;
  homeTeam?: Team;
  awayTeam?: Team;
}

export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  teamId: string;
  number: number;
  stats: {
    goals: number;
    assists: number;
    rating: number;
  }
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  timestamp: string;
  category: string;
  relatedTeamIds: string[];
}
