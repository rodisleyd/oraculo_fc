import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Globe, Tv, User, LogOut, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useApp } from '../../context/AppContext';

const navItems = [
  { path: '/', icon: Home, label: 'Início' },
  { path: '/explore', icon: Globe, label: 'Explorar' },
  { path: '/search', icon: Search, label: 'Busca Universal' },
  { path: '/live', icon: Tv, label: 'Ao Vivo' },
  { path: '/profile', icon: User, label: 'Perfil' },
];

export const Sidebar = () => {
  const { favoriteTeam } = useApp();

  return (
    <div className="flex flex-col h-full p-6 bg-background border-r border-muted">
      {/* Logo Area */}
      <div className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-black font-bold text-xl shadow-neon">
          O
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Oraculo <span className="text-primary">FC</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Enciclopédia Viva</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
              isActive 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-gray-400 hover:bg-surface hover:text-white border border-transparent"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={cn(isActive ? "text-primary" : "text-gray-500 group-hover:text-white")} />
                <span className="font-medium">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-neon" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="mt-auto pt-6 border-t border-muted">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-muted hover:border-primary/30 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-black border border-muted flex items-center justify-center text-lg">
            {favoriteTeam?.logo || '👤'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">Usuário</p>
            <p className="text-xs text-gray-500 truncate">Membro Gratuito</p>
          </div>
          <Settings size={16} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};
