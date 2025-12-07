import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Check, Search } from 'lucide-react';
import { api } from '../services/api';

export const Onboarding = () => {
  const { setFavoriteTeam, setFavoriteLeague, completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [teams, setTeams] = useState<any[]>([]);
  const leagues = api.getLeagues();

  useEffect(() => {
    const fetchTeams = async () => {
      const allTeams = await api.getTeams();
      setTeams(allTeams.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())));
    };
    fetchTeams();
  }, [searchTerm]);

  const handleTeamSelect = (team: any) => {
    setSelectedTeamId(team.id);
    setFavoriteTeam(team);
    setTimeout(() => setStep(2), 300);
  };

  const handleLeagueSelect = (league: any) => {
    setSelectedLeagueId(league.id);
    setFavoriteLeague(league);
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col justify-center max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Oraculo <span className="text-primary">FC</span>
        </h1>
        <p className="text-gray-400 mb-8">Configure seu universo do futebol.</p>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl text-white font-semibold">Qual seu time do coração?</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Buscar time..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface border border-muted rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-primary focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
              {teams.map((team) => (
                <Card
                  key={team.id}
                  onClick={() => handleTeamSelect(team)}
                  className={`cursor-pointer transition-all flex items-center justify-between ${selectedTeamId === team.id ? 'border-primary bg-primary/10' : 'hover:border-gray-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{team.logo}</span>
                    <span className="font-medium text-white">{team.name}</span>
                  </div>
                  {selectedTeamId === team.id && <Check className="text-primary" size={20} />}
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl text-white font-semibold">Qual liga você não perde?</h2>
            <div className="grid grid-cols-1 gap-3">
              {leagues.map((league) => (
                <Card
                  key={league.id}
                  onClick={() => handleLeagueSelect(league)}
                  className={`cursor-pointer transition-all flex items-center justify-between ${selectedLeagueId === league.id ? 'border-primary bg-primary/10' : 'hover:border-gray-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{league.logo}</span>
                    <span className="font-medium text-white">{league.name}</span>
                  </div>
                  {selectedLeagueId === league.id && <Check className="text-primary" size={20} />}
                </Card>
              ))}
            </div>
            <Button
              className="w-full mt-8"
              disabled={!selectedLeagueId}
              onClick={completeOnboarding}
            >
              Começar
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
