import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Globe, Tv, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Início' },
  { path: '/explore', icon: Globe, label: 'Explorar' },
  { path: '/search', icon: Search, label: 'Busca', isPrimary: true },
  { path: '/live', icon: Tv, label: 'Ao Vivo' },
  { path: '/profile', icon: User, label: 'Perfil' },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-muted z-50 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
              isActive ? "text-primary" : "text-gray-500 hover:text-gray-300",
              item.isPrimary && "-mt-6"
            )}
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "p-2 rounded-full transition-all",
                  item.isPrimary && isActive ? "bg-primary text-black shadow-neon" : "",
                  item.isPrimary && !isActive ? "bg-surface border border-muted text-gray-400" : ""
                )}>
                  <item.icon size={item.isPrimary ? 24 : 20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
