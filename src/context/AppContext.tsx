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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteTeam, setFavoriteTeam] = useState<Team | null>(null);
  const [favoriteLeague, setFavoriteLeague] = useState<League | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

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
            if (team) setFavoriteTeam(team);
          } catch (error) {
            console.error("Failed to load favorite team", error);
          }
        }
        if (storedLeagueId) {
          const league = api.getLeagues().find(l => l.id === storedLeagueId);
          if (league) setFavoriteLeague(league);
        }
      }
    };
    loadData();
  }, []);

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
      completeOnboarding
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
