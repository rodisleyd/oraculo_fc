import React from 'react';
import { Card } from '../components/ui/Card';
import { ChevronRight, Map, Trophy, Users } from 'lucide-react';

const CONTINENTS = [
  { name: 'América do Sul', count: '12 Ligas', color: 'text-green-400' },
  { name: 'Europa', count: '24 Ligas', color: 'text-blue-400' },
  { name: 'África', count: '8 Ligas', color: 'text-yellow-400' },
  { name: 'Ásia', count: '10 Ligas', color: 'text-red-400' },
  { name: 'América do Norte', count: '4 Ligas', color: 'text-purple-400' },
  { name: 'Oceania', count: '2 Ligas', color: 'text-cyan-400' },
];

const POPULAR_LEAGUES = [
    { name: 'Brasileirão Série A', country: 'Brasil' },
    { name: 'Premier League', country: 'Inglaterra' },
    { name: 'La Liga', country: 'Espanha' },
    { name: 'Serie A', country: 'Itália' },
    { name: 'Bundesliga', country: 'Alemanha' },
    { name: 'Libertadores', country: 'América do Sul' },
]

export const Explore = () => {
  return (
    <div className="p-4 md:p-0 pt-8 md:pt-0 space-y-8">
      <header className="mb-6 border-b border-muted pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Explorar Mundo</h1>
        <p className="text-gray-400">Navegue pelo ecossistema global do futebol. Do macro ao micro.</p>
      </header>

      <section>
        <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
            <Map size={16} /> Continentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONTINENTS.map((cont) => (
            <Card key={cont.name} className="flex items-center justify-between cursor-pointer hover:bg-surface/80 hover:border-primary/50 transition-all group h-24">
                <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center ${cont.color} group-hover:bg-primary/10 transition-colors`}>
                    <GlobeIcon />
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">{cont.name}</h3>
                    <span className="text-xs text-gray-500 group-hover:text-gray-300">{cont.count}</span>
                </div>
                </div>
                <ChevronRight size={20} className="text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Card>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
            <Trophy size={16} /> Ligas Populares
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {POPULAR_LEAGUES.map((league) => (
                <Card key={league.name} className="flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-primary hover:-translate-y-1 transition-all h-32">
                    <div className="w-10 h-10 rounded-full bg-white/5 mb-3 flex items-center justify-center text-xl">
                        ⚽
                    </div>
                    <h3 className="font-bold text-white text-sm leading-tight">{league.name}</h3>
                    <span className="text-[10px] text-gray-500 mt-1">{league.country}</span>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
};

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
)
