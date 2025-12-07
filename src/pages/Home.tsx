import React from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Calendar, TrendingUp, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { favoriteTeam } = useApp();
  const navigate = useNavigate();
  const [nextMatch, setNextMatch] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const matches = await api.getMatches();
        // Find a match for the favorite team, or just the first interesting match
        const myMatch = favoriteTeam
          ? matches.find(m => m.homeTeamId === favoriteTeam.id || m.awayTeamId === favoriteTeam.id)
          : matches[0];

        setNextMatch(myMatch || matches[0]);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [favoriteTeam]);

  return (
    <div className="p-4 md:p-0 space-y-6 pt-8 md:pt-0">
      {/* Header - Mobile Only (Desktop has Sidebar) */}
      <header className="flex md:hidden justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Meu Oráculo</h1>
          <p className="text-sm text-text-muted">Bem-vindo de volta</p>
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
          <h1 className="text-3xl font-bold text-text-main">Dashboard</h1>
          <p className="text-text-muted">Visão geral do seu universo do futebol.</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-text-main bg-surface px-2 py-1 rounded border border-muted shadow-sm">
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
              <h2 className="text-sm font-bold text-text-main uppercase tracking-wider flex items-center gap-2 border-l-4 border-primary pl-2">
                <Calendar size={16} className="text-primary" /> Próximo Jogo
              </h2>
              <Button variant="ghost" size="sm" className="text-xs px-0 h-auto hover:text-primary">Ver calendário completo <ArrowRight size={14} className="ml-1" /></Button>
            </div>

            {loading ? (
              <Card className="h-64 flex items-center justify-center">
                <div className="text-text-muted">Carregando jogos...</div>
              </Card>
            ) : nextMatch ? (
              <Card className="bg-gradient-to-br from-surface to-[#1a1a1a] border-l-4 border-l-primary relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="text-9xl font-bold text-text-muted/10">VS</div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-6 md:gap-0">
                  <div className="flex flex-col items-center gap-3 w-1/3 cursor-pointer" onClick={() => navigate(`/team/${nextMatch.homeTeamId}`)}>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface border border-muted flex items-center justify-center text-3xl md:text-4xl shadow-lg transition-transform hover:scale-110">
                      {nextMatch.homeTeam?.logo || '⚽'}
                    </div>
                    <span className="font-bold text-text-main text-lg text-center">{nextMatch.homeTeam?.name || 'Casa'}</span>
                  </div>

                  <div className="text-center w-1/3">
                    <div className="text-sm text-text-muted mb-1">{nextMatch.leagueId?.toUpperCase() || 'CAMPEONATO'}</div>
                    <div className="text-3xl md:text-5xl font-mono font-bold text-text-main mb-2">
                      {nextMatch.status === 'LIVE' || nextMatch.status === 'FINISHED'
                        ? `${nextMatch.homeScore} - ${nextMatch.awayScore}`
                        : nextMatch.time}
                    </div>
                    <Badge variant={nextMatch.status === 'LIVE' ? 'danger' : 'warning'}>
                      {nextMatch.status === 'LIVE' ? 'AO VIVO' : nextMatch.status === 'FINISHED' ? 'ENCERRADO' : 'EM BREVE'}
                    </Badge>
                  </div>

                  <div className="flex flex-col items-center gap-3 w-1/3 cursor-pointer" onClick={() => navigate(`/team/${nextMatch.awayTeamId}`)}>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface border border-muted flex items-center justify-center text-3xl md:text-4xl shadow-lg">
                      {nextMatch.awayTeam?.logo || '🛡️'}
                    </div>
                    <span className="font-bold text-text-main text-lg text-center">{nextMatch.awayTeam?.name || 'Visitante'}</span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex justify-center md:justify-end">
                  <Button variant="outline" size="sm" className="w-full md:w-auto">Ver Detalhes</Button>
                </div>
              </Card>
            ) : (
              <Card className="h-64 flex items-center justify-center flex-col gap-4">
                <div className="text-text-muted">Nenhum jogo encontrado para hoje.</div>
                <Button variant="outline" onClick={() => navigate('/explore')}>Explorar Campeonatos</Button>
              </Card>
            )}
          </section>

          {/* News Feed */}
          <section>
            <h2 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 border-l-4 border-primary pl-2">Destaques Recentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <Card key={i} noPadding className="flex flex-col h-full cursor-pointer hover:border-primary/50 transition-all group">
                  <div className="h-40 bg-gray-800 relative overflow-hidden">
                    <img
                      src={`https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/1a1a1a/39FF14?text=News+${i}`}
                      alt="News"
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="default" className="bg-surface backdrop-blur border-muted text-primary">Transferências</Badge>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-bold text-text-main leading-tight mb-2 group-hover:text-primary transition-colors">
                        Rumores indicam nova contratação bombástica para a temporada 2025.
                      </h3>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-muted/50">
                      <span className="text-[10px] text-text-muted">Há 2 horas</span>
                      <ChevronRight size={16} className="text-text-muted group-hover:translate-x-1 transition-transform" />
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
            <h2 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 border-l-4 border-primary pl-2">Raio-X da Temporada</h2>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              <Card className="flex flex-col justify-between h-28 hover:bg-surface transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-text-muted uppercase">Gols Marcados</span>
                  <TrendingUp size={18} className="text-primary" />
                </div>
                <div>
                  <span className="text-4xl font-mono font-bold text-text-main">42</span>
                  <span className="text-xs text-green-500 ml-2">▲ 12%</span>
                </div>
              </Card>
              <Card className="flex flex-col justify-between h-28 hover:bg-surface transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-text-muted uppercase">Posse Média</span>
                  <div className="w-2 h-2 rounded-full bg-warning animate-pulse"></div>
                </div>
                <div>
                  <span className="text-4xl font-mono font-bold text-text-main">58%</span>
                  <div className="w-full h-1 bg-gray-700 mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-warning w-[58%]"></div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <Card className="bg-[rgba(57,255,20,0.05)] border-[rgba(57,255,20,0.2)]">
            <h3 className="font-bold text-text-main mb-2">Oraculo PRO</h3>
            <p className="text-xs text-text-muted mb-4">Desbloqueie estatísticas avançadas e compare jogadores historicamente.</p>
            <Button className="w-full text-sm">Fazer Upgrade</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
