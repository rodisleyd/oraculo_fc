import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Filter, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';
import { Match } from '../types';

export const Live = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const data = await api.getLiveMatches();
      setMatches(data);
    } catch (error) {
      console.error("Failed to fetch live matches:", error);
      // Optionally handle error state here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="p-4 md:p-0 pt-8 md:pt-0 space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-muted pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
            Central Ao Vivo
          </h1>
          <p className="text-gray-400 mt-1">Acompanhe todos os jogos em tempo real.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={fetchMatches} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter size={16} /> Filtrar
          </Button>
          <Badge variant="default" className="text-sm py-1.5 px-3">{matches.length} JOGOS</Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="relative overflow-hidden group hover:border-primary transition-all duration-300">
            <div className={`absolute top-0 left-0 w-1 h-full ${match.status === 'LIVE' ? 'bg-primary' : 'bg-yellow-500'}`}></div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-muted px-2 py-0.5 rounded">{match.league?.name}</span>
              </div>
              <span className={`text-xs font-mono font-bold ${match.status === 'LIVE' ? 'text-primary animate-pulse' : 'text-yellow-500'}`}>
                {match.time}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-lg">{match.homeTeam?.logo}</div>
                  <span className="font-bold text-white text-lg">{match.homeTeam?.name}</span>
                </div>
                <span className="text-2xl font-bold text-white font-mono">{match.homeScore}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-lg">{match.awayTeam?.logo}</div>
                  <span className="font-bold text-white text-lg">{match.awayTeam?.name}</span>
                </div>
                <span className="text-2xl font-bold text-white font-mono">{match.awayScore}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-muted/50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-gray-500">Detalhes da Partida</span>
              <span className="text-xs text-primary font-bold cursor-pointer hover:underline">Ver Estatísticas &rarr;</span>
            </div>
          </Card>
        ))}
        {matches.length === 0 && !loading && (
          <div className="col-span-full text-center py-10 text-gray-500">
            Nenhum jogo ao vivo no momento.
          </div>
        )}
      </div>
    </div>
  );
};
