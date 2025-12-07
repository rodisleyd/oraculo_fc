import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Calendar, TrendingUp, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { favoriteTeam } = useApp();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-0 space-y-6 pt-8 md:pt-0">
      {/* Header - Mobile Only (Desktop has Sidebar) */}
      <header className="flex md:hidden justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Meu Oráculo</h1>
          <p className="text-sm text-gray-400">Bem-vindo de volta</p>
        </div>
        <div 
            onClick={() => favoriteTeam && navigate(`/team/${favoriteTeam.id}`)}
            className="w-10 h-10 rounded-full bg-surface border border-muted flex items-center justify-center text-xl cursor-pointer"
        >
          {favoriteTeam?.logo || '👤'}
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-end border-b border-muted pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Visão geral do seu universo do futebol.</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Next Match Hero */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                <Calendar size={16} /> Próximo Jogo
              </h2>
              <Button variant="ghost" size="sm" className="text-xs px-0 h-auto hover:text-primary">Ver calendário completo <ArrowRight size={14} className="ml-1"/></Button>
            </div>
            <Card className="bg-gradient-to-br from-surface to-[#1a1a1a] border-l-4 border-l-primary relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="text-9xl font-bold text-white">VS</div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-6 md:gap-0">
                <div className="flex flex-col items-center gap-3 w-1/3 cursor-pointer" onClick={() => favoriteTeam && navigate(`/team/${favoriteTeam.id}`)}>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl md:text-4xl shadow-lg transition-transform hover:scale-110">
                    {favoriteTeam?.logo || '⚽'}
                  </div>
                  <span className="font-bold text-white text-lg">{favoriteTeam?.name || 'Seu Time'}</span>
                </div>
                
                <div className="text-center w-1/3">
                  <div className="text-sm text-gray-400 mb-1">Campeonato</div>
                  <div className="text-3xl md:text-5xl font-mono font-bold text-white mb-2">16:00</div>
                  <Badge variant="warning">Amanhã</Badge>
                </div>
                
                <div className="flex flex-col items-center gap-3 w-1/3">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl md:text-4xl shadow-lg">🛡️</div>
                  <span className="font-bold text-white text-lg">Rival</span>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-center md:justify-end">
                <Button variant="outline" size="sm" className="w-full md:w-auto">Ver Análise Pré-jogo</Button>
              </div>
            </Card>
          </section>

          {/* News Feed */}
          <section>
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Destaques Recentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <Card key={i} noPadding className="flex flex-col h-full cursor-pointer hover:border-primary/50 transition-all group">
                  <div className="h-40 bg-gray-800 relative overflow-hidden">
                     <img 
                        src={`https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/1a1a1a/39FF14?text=News+${i}`} 
                        alt="News" 
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
                     />
                     <div className="absolute top-2 left-2">
                        <Badge variant="default" className="bg-black/50 backdrop-blur border-none text-primary">Transferências</Badge>
                     </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-bold text-white leading-tight mb-2 group-hover:text-primary transition-colors">
                        Rumores indicam nova contratação bombástica para a temporada 2025.
                      </h3>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-muted/50">
                      <span className="text-[10px] text-gray-500">Há 2 horas</span>
                      <ChevronRight size={16} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Stats & Quick Info) */}
        <div className="space-y-6">
          <section>
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Raio-X da Temporada</h2>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              <Card className="flex flex-col justify-between h-28 hover:bg-surface/80 transition-colors">
                 <div className="flex justify-between items-start">
                   <span className="text-xs text-gray-400 uppercase">Gols Marcados</span>
                   <TrendingUp size={18} className="text-primary" />
                 </div>
                 <div>
                    <span className="text-4xl font-mono font-bold text-white">42</span>
                    <span className="text-xs text-green-500 ml-2">▲ 12%</span>
                 </div>
              </Card>
              <Card className="flex flex-col justify-between h-28 hover:bg-surface/80 transition-colors">
                 <div className="flex justify-between items-start">
                   <span className="text-xs text-gray-400 uppercase">Posse Média</span>
                   <div className="w-2 h-2 rounded-full bg-warning animate-pulse"></div>
                 </div>
                 <div>
                    <span className="text-4xl font-mono font-bold text-white">58%</span>
                    <div className="w-full h-1 bg-gray-700 mt-2 rounded-full overflow-hidden">
                        <div className="h-full bg-warning w-[58%]"></div>
                    </div>
                 </div>
              </Card>
            </div>
          </section>

          <Card className="bg-primary/5 border-primary/20">
            <h3 className="font-bold text-white mb-2">Oraculo PRO</h3>
            <p className="text-xs text-gray-400 mb-4">Desbloqueie estatísticas avançadas e compare jogadores historicamente.</p>
            <Button className="w-full text-sm">Fazer Upgrade</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
)
