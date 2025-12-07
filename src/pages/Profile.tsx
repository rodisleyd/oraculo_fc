import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Settings, Bell, Shield, LogOut } from 'lucide-react';

export const Profile = () => {
  const { favoriteTeam, favoriteLeague } = useApp();

  return (
    <div className="p-4 pt-8 space-y-6">
      <header className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-black font-bold text-2xl shadow-neon">
          U
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Usuário Oráculo</h1>
          <span className="text-xs font-bold px-2 py-0.5 rounded border bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20">Membro Gratuito</span>
        </div>
      </header>

      <section>
        <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">Minhas Preferências</h2>
        <Card className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-muted">
            <span className="text-text-muted text-sm">Time do Coração</span>
            <div className="text-text-main font-bold flex items-center gap-2">
              {favoriteTeam?.logo && <img src={favoriteTeam.logo} alt={favoriteTeam.name} className="w-6 h-6 object-contain" />}
              {favoriteTeam?.name || 'Não definido'}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted text-sm">Liga Favorita</span>
            <span className="text-text-main font-bold">{favoriteLeague?.name || 'Não definido'}</span>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">Configurações</h2>
        <div className="space-y-2">
          <Button variant="secondary" className="w-full justify-between text-sm h-12">
            <span className="flex items-center gap-2"><Bell size={16} /> Notificações</span>
            <span className="text-xs text-text-muted">Ativado</span>
          </Button>
          <Button variant="secondary" className="w-full justify-between text-sm h-12">
            <span className="flex items-center gap-2"><Shield size={16} /> Privacidade</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-danger hover:bg-danger/10 hover:text-danger h-12">
            <span className="flex items-center gap-2"><LogOut size={16} /> Sair</span>
          </Button>
        </div>
      </section>

      <Card className="bg-gradient-to-r from-[rgba(57,255,20,0.2)] to-blue-500/20 border-[rgba(57,255,20,0.3)]">
        <h3 className="font-bold text-text-main mb-1">Seja Oráculo PRO</h3>
        <p className="text-xs text-text-muted mb-3">Acesse estatísticas avançadas, mapas de calor e xG histórico.</p>
        <Button size="sm" className="w-full">Assinar Agora</Button>
      </Card>
    </div>
  );
};
