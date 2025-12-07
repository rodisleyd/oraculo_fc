import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Calendar, Trophy, History, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'squad' | 'history'>('overview');

  useEffect(() => {
    const fetchTeam = async () => {
      setIsLoading(true);
      if (id) {
        const data = await api.getTeamById(id);
        setTeam(data || null);
      }
      setIsLoading(false);
    };
    fetchTeam();
  }, [id]);

  if (isLoading) {
    return <div className="p-8 text-center text-text-muted">Carregando...</div>;
  }

  if (!team) {
    return <div className="p-8 text-center text-text-muted">Time não encontrado.</div>;
  }

  return (
    <div className="p-4 md:p-0 pt-8 md:pt-0 space-y-6 pb-20">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2 pl-0 hover:bg-transparent text-text-muted hover:text-text-main">
        <ArrowLeft size={18} /> Voltar
      </Button>

      {/* Header Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-surface border border-muted">
        <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-800 relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundColor: team.colors[0] }}></div>
        </div>
        <div className="px-6 pb-6 relative -mt-12 flex flex-col md:flex-row items-start md:items-end gap-4">
          <div className="w-24 h-24 rounded-xl bg-surface border-4 border-background flex items-center justify-center text-5xl shadow-2xl">
            {team.logo}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-text-main">{team.name}</h1>
            <div className="flex items-center gap-2 text-text-muted text-sm mt-1">
              <span>Fundado em {team.founded}</span>
              <span>•</span>
              <span>{team.stadium}</span>
            </div>
          </div>
          <Button className="w-full md:w-auto">Seguir Clube</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-muted overflow-x-auto">
        {['overview', 'squad', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-3 text-sm font-medium capitalize whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-text-muted hover:text-text-main'
              }`}
          >
            {tab === 'overview' ? 'Visão Geral' : tab === 'squad' ? 'Elenco' : 'História & Títulos'}
            {activeTab === tab && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <section>
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">Próxima Partida</h3>
                <Card className="flex justify-between items-center bg-surface">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{team.logo}</span>
                    <span className="font-bold text-text-main">{team.name}</span>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-xs text-text-muted mb-1">Brasileirão</div>
                    <div className="font-mono text-xl text-text-main font-bold">16:00</div>
                    <Badge variant="warning">DOM</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-text-main">Rival</span>
                    <span className="text-2xl">🛡️</span>
                  </div>
                </Card>
              </section>

              <section>
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">Forma Recente</h3>
                <div className="flex gap-2">
                  {['W', 'W', 'D', 'L', 'W'].map((res, i) => (
                    <div key={i} className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${res === 'W' ? 'bg-green-500/20 text-green-500 border border-green-500/30' :
                      res === 'D' ? 'bg-gray-500/20 text-text-muted border border-gray-500/30' :
                        'bg-red-500/20 text-red-500 border border-red-500/30'
                      }`}>
                      {res}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-4">
              <Card className="bg-surface">
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <TrendingUp size={20} />
                  <span className="font-bold">Estatísticas da Temporada</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Gols Marcados</span>
                    <span className="text-text-main font-mono">45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Posse Média</span>
                    <span className="text-text-main font-mono">58%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Cartões Amarelos</span>
                    <span className="text-text-main font-mono">12</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-primary mb-4">
              <History />
              <h3 className="font-bold text-lg">Linha do Tempo</h3>
            </div>

            <div className="relative border-l-2 border-muted ml-3 space-y-8 pb-8">
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary shadow-neon"></div>
                <span className="text-xs font-mono text-primary mb-1 block">2025 (Presente)</span>
                <h4 className="text-text-main font-bold">Busca pelo Tetra</h4>
                <p className="text-sm text-text-muted mt-1">O clube investe pesado em contratações para conquistar a América novamente.</p>
              </div>
              <div className="relative pl-8 opacity-70">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface border-2 border-text-muted"></div>
                <span className="text-xs font-mono text-text-muted mb-1 block">2019</span>
                <h4 className="text-text-main font-bold">O Ano Mágico</h4>
                <p className="text-sm text-text-muted mt-1">Campeão da Libertadores e do Brasileiro no mesmo fim de semana.</p>
              </div>
              <div className="relative pl-8 opacity-50">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface border-2 border-text-muted"></div>
                <span className="text-xs font-mono text-text-muted mb-1 block">1981</span>
                <h4 className="text-text-main font-bold">Campeão do Mundo</h4>
                <p className="text-sm text-text-muted mt-1">A era de ouro liderada por Zico conquista o planeta no Japão.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'squad' && (
          <div className="text-center py-10 text-gray-500">
            <UsersIcon />
            <p className="mt-2">Dados do elenco sendo atualizados...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const UsersIcon = () => (
  <svg className="mx-auto w-12 h-12 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
)
