import React, { createContext, useContext, useState, useEffect } from 'react';
import { Team, League } from '../types';
import { api } from '../services/api';

interface AppContextType {
  favoriteTeam: Team | null;
  favoriteLeague: League | null;
  setFavoriteTeam: (team: Team) => void;
  setFavoriteLeague: (league: League) => void;
  isOnboarded: boolean;
  completeOnboarding: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isInitialized: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteTeam, setFavoriteTeam] = useState<Team | null>(null);
  const [favoriteLeague, setFavoriteLeague] = useState<League | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load persisted theme or default to dark
    const storedTheme = localStorage.getItem('oraculo_theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const storedOnboarded = localStorage.getItem('oraculo_onboarded');
      const storedTeamId = localStorage.getItem('oraculo_fav_team');
      const storedLeagueId = localStorage.getItem('oraculo_fav_league');

      if (storedOnboarded === 'true') {
        setIsOnboarded(true);
        if (storedTeamId) {
          try {
            const team = await api.getTeamById(storedTeamId);
            if (team) {
              setFavoriteTeam(team);
            } else {
              // Invalid ID (migration), reset onboarding
              localStorage.removeItem('oraculo_fav_team');
              localStorage.removeItem('oraculo_onboarded');
              setIsOnboarded(false);
            }
          } catch (error) {
            console.error("Failed to load favorite team", error);
          }
        }
        if (storedLeagueId) {
          const league = api.getLeagues().find(l => l.id === storedLeagueId);
          if (league) setFavoriteLeague(league);
        }
      }
      setIsInitialized(true); // Mark as initialized
    };
    loadData();
  }, []);

  useEffect(() => {
    // Apply theme to HTML
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('oraculo_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleSetFavoriteTeam = (team: Team) => {
    setFavoriteTeam(team);
    localStorage.setItem('oraculo_fav_team', team.id);
  };

  const handleSetFavoriteLeague = (league: League) => {
    setFavoriteLeague(league);
    localStorage.setItem('oraculo_fav_league', league.id);
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
    localStorage.setItem('oraculo_onboarded', 'true');
  };

  return (
    <AppContext.Provider value={{
      favoriteTeam,
      favoriteLeague,
      setFavoriteTeam: handleSetFavoriteTeam,
      setFavoriteLeague: handleSetFavoriteLeague,
      isOnboarded,
      completeOnboarding,
      theme,
      toggleTheme,
      isInitialized // Export this
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
