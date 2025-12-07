import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';
import { cn } from '../../lib/utils';

export const AppLayout = () => {
  const location = useLocation();
  const isSearch = location.pathname === '/search';

  return (
    <div className="min-h-screen bg-background text-secondary font-sans selection:bg-primary selection:text-black flex">
      
      {/* Desktop Sidebar - Hidden on Mobile */}
      <aside className="hidden md:flex w-72 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 min-h-screen transition-all duration-300",
        "md:pl-72", // Push content right on desktop to account for sidebar
        "pb-20 md:pb-0" // Bottom padding for mobile nav, none for desktop
      )}>
        <div className={cn(
          "w-full mx-auto min-h-screen relative",
          // Remove max-w-md constraint, use max-w-7xl for desktop containment
          "max-w-md md:max-w-7xl", 
          // Add horizontal padding on desktop
          "md:p-8"
        )}>
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav - Hidden on Desktop */}
      <div className="md:hidden max-w-md mx-auto fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>
    </div>
  );
};
