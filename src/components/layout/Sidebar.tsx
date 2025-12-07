import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Globe, Tv, User, LogOut, Settings, BookOpen, Sun, Moon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

const navItems = [
  { path: '/', icon: Home, label: 'Início' },
  { path: '/explore', icon: Globe, label: 'Explorar' },
  { path: '/search', icon: Search, label: 'Busca Universal' },
  { path: '/encyclopedia', icon: BookOpen, label: 'Raio X' },
  { path: '/live', icon: Tv, label: 'Ao Vivo' },
  { path: '/profile', icon: User, label: 'Perfil' },
];

export const Sidebar = () => {
  const { favoriteTeam, theme, toggleTheme } = useApp();

  return (
    <div className="flex flex-col h-full p-6 bg-background border-r border-muted" style={{ backgroundColor: 'var(--background)' }}>
      {/* Logo Area */}
      <div className="mb-10 flex items-center gap-3">
        <img src="/logo.png" alt="Oraculo FC Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
        <div>
          <h1 className="text-xl font-bold text-text-main tracking-tight">
            Oraculo <span className="text-primary">FC</span>
          </h1>
          <p className="text-[10px] text-text-muted uppercase tracking-wider">Enciclopédia Viva</p>
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
                ? "bg-primary text-black font-bold shadow-neon"
                : "text-text-muted hover:bg-surface hover:text-text-main border border-transparent"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={cn(isActive ? "text-black" : "text-text-muted group-hover:text-text-main")} />
                <span className="font-medium">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-neon" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="mt-auto pt-6 border-t border-muted">
        <div className="flex items-center gap-2">
          <div
            className="flex-1 flex items-center gap-3 p-3 rounded-lg bg-surface border border-muted hover:border-[rgba(57,255,20,0.3)] transition-colors cursor-pointer"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <div className="w-10 h-10 rounded-full bg-background border border-muted flex items-center justify-center text-lg overflow-hidden">
              {favoriteTeam?.logo ? (
                favoriteTeam.logo.startsWith('http') ? (
                  <img src={favoriteTeam.logo} alt={favoriteTeam.name} className="w-full h-full object-contain p-1" />
                ) : (
                  favoriteTeam.logo
                )
              ) : (
                '👤'
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-main truncate">Usuário</p>
              <p className="text-xs text-text-muted truncate">Membro Gratuito</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-14 w-10 border border-muted"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleTheme();
            }}
          >
            {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
