import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Filter, RefreshCw, Clock, Trophy } from 'lucide-react';
import { Button } from '../components/ui/Button';
// import { api } from '../services/api';

// Mock Live Data for Demo
const INITIAL_MATCHES = [
  {
    id: 1,
    league: { name: 'Champions League', country: 'Europe' },
    homeTeam: { name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png' },
    awayTeam: { name: 'Man City', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png' },
    homeScore: 1,
    awayScore: 1,
    time: 35,
    status: 'LIVE'
  },
  {
    id: 2,
    league: { name: 'Brasileirão', country: 'Brasil' },
    homeTeam: { name: 'Flamengo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_braz_logo.svg/1200px-Flamengo_braz_logo.svg.png' },
    awayTeam: { name: 'Palmeiras', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/1200px-Palmeiras_logo.svg.png' },
    homeScore: 2,
    awayScore: 0,
    time: 68,
    status: 'LIVE'
  },
  {
    id: 3,
    league: { name: 'Premier League', country: 'England' },
    homeTeam: { name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png' },
    awayTeam: { name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png' },
    homeScore: 0,
    awayScore: 0,
    time: 12,
    status: 'LIVE'
  },
  {
    id: 4,
    league: { name: 'Serie A', country: 'Italy' },
    homeTeam: { name: 'Juventus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/1200px-Juventus_FC_2017_icon_%28black%29.svg.png' },
    awayTeam: { name: 'Milan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1200px-Logo_of_AC_Milan.svg.png' },
    homeScore: 1,
    awayScore: 2,
    time: 88,
    status: 'LIVE'
  }
];

export const Live = () => {
  const [matches, setMatches] = useState<any[]>(INITIAL_MATCHES);
  const [loading, setLoading] = useState(false);

  // Simulate Live Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(currentMatches =>
        currentMatches.map(match => {
          // Increment time
          let newTime = match.time + 1;
          if (newTime > 90) newTime = 90; // Cap at 90 for demo

          // Random Goal Chance (very low prob)
          let newHomeScore = match.homeScore;
          let newAwayScore = match.awayScore;

          if (Math.random() > 0.98) { // 2% chance per tick
            if (Math.random() > 0.5) newHomeScore++;
            else newAwayScore++;
          }

          return {
            ...match,
            time: newTime,
            homeScore: newHomeScore,
            awayScore: newAwayScore
          };
        })
      );
    }, 3000); // Update every 3 seconds (fast time for demo)

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="p-4 md:p-0 pt-8 md:pt-0 space-y-6 pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-muted pb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-main flex items-center gap-3">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
            Central Ao Vivo
          </h1>
          <p className="text-text-muted mt-1">Acompanhe todos os jogos em tempo real.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </Button>
          <Button variant="outline" size="sm" className="gap-2 border-muted text-text-main hover:border-primary hover:text-primary">
            <Filter size={16} /> Filtrar
          </Button>
          <Badge variant="default" className="text-sm py-1.5 px-3 bg-red-500/10 text-red-500 border-red-500/20">{matches.length} JOGOS AO VIVO</Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="relative overflow-hidden group hover:border-primary transition-all duration-300 bg-surface">
            <div className={`absolute top-0 left-0 w-1 h-full ${match.status === 'LIVE' ? 'bg-primary' : 'bg-yellow-500'}`}></div>

            {/* League Header */}
            <div className="flex justify-between items-center mb-6 px-4 pt-4">
              <div className="flex items-center gap-2">
                <Trophy size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{match.league.name}</span>
              </div>
              <div className="flex items-center gap-1 text-green-700 dark:text-primary animate-pulse">
                <Clock size={14} />
                <span className="text-xs font-mono font-bold">{match.time}'</span>
              </div>
            </div>

            {/* Scoreboard */}
            <div className="px-6 pb-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface p-1 flex items-center justify-center shadow-lg border border-muted">
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bold text-text-main text-lg">{match.homeTeam.name}</span>
                </div>
                <span className="text-3xl font-bold text-text-main font-mono">{match.homeScore}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface p-1 flex items-center justify-center shadow-lg border border-muted">
                    <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bold text-text-main text-lg">{match.awayTeam.name}</span>
                </div>
                <span className="text-3xl font-bold text-text-main font-mono">{match.awayScore}</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-2 py-3 px-4 bg-muted/10 border-t border-muted flex justify-between items-center">
              <span className="text-[10px] text-text-muted flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Em andamento
              </span>
              <span className="text-xs text-text-muted font-bold cursor-pointer hover:text-text-main hover:underline flex items-center gap-1">
                Estatísticas <Filter size={10} className="rotate-90" />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
