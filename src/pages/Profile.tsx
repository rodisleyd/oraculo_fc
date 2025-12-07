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
          <h1 className="text-xl font-bold text-white">Usuário Oráculo</h1>
          <span className="text-xs bg-warning/20 text-warning px-2 py-0.5 rounded border border-warning/30">Membro Gratuito</span>
        </div>
      </header>

      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Minhas Preferências</h2>
        <Card className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-muted">
            <span className="text-gray-400 text-sm">Time do Coração</span>
            <span className="text-white font-bold flex items-center gap-2">
              {favoriteTeam?.logo} {favoriteTeam?.name || 'Não definido'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Liga Favorita</span>
            <span className="text-white font-bold">{favoriteLeague || 'Não definido'}</span>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Configurações</h2>
        <div className="space-y-2">
          <Button variant="secondary" className="w-full justify-between text-sm h-12">
            <span className="flex items-center gap-2"><Bell size={16} /> Notificações</span>
            <span className="text-xs text-gray-500">Ativado</span>
          </Button>
          <Button variant="secondary" className="w-full justify-between text-sm h-12">
            <span className="flex items-center gap-2"><Shield size={16} /> Privacidade</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-danger hover:bg-danger/10 hover:text-danger h-12">
            <span className="flex items-center gap-2"><LogOut size={16} /> Sair</span>
          </Button>
        </div>
      </section>

      <Card className="bg-gradient-to-r from-primary/20 to-blue-500/20 border-primary/30">
        <h3 className="font-bold text-white mb-1">Seja Oráculo PRO</h3>
        <p className="text-xs text-gray-400 mb-3">Acesse estatísticas avançadas, mapas de calor e xG histórico.</p>
        <Button size="sm" className="w-full">Assinar Agora</Button>
      </Card>
    </div>
  );
};
