import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { ChevronRight, Map, Trophy, ArrowLeft, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { Team } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

// Mapping structure for navigation
const CONTINENTS = [
  {
    name: 'América do Sul', id: 'south-america', color: 'text-green-400', leagues: [
      { name: 'Brasileirão Série A', id: 'bra-bsa', country: 'Brasil' },
      { name: 'Copa Libertadores', id: 'south-america-cli', country: 'América do Sul' },
      { name: 'Liga Profesional', id: 'arg-lp', country: 'Argentina' },
      { name: 'Primera A', id: 'col-pa', country: 'Colômbia' },
      { name: 'Primera División', id: 'chi-pd', country: 'Chile' },
      { name: 'Primera División', id: 'uru-pd', country: 'Uruguai' },
      { name: 'Liga Pro', id: 'ecu-lp', country: 'Equador' },
      { name: 'Primera División', id: 'par-pd', country: 'Paraguai' },
      { name: 'Liga 1', id: 'per-l1', country: 'Peru' },
      { name: 'Liga FUTVE', id: 'ven-lf', country: 'Venezuela' },
      { name: 'División Profesional', id: 'bol-dp', country: 'Bolívia' },
      { name: 'Copa Sudamericana', id: 'south-america-cs', country: 'América do Sul' }
    ]
  },
  {
    name: 'Europa', id: 'europe', color: 'text-blue-400', leagues: [
      { name: 'Champions League', id: 'eur-cl', country: 'Europa' },
      { name: 'Premier League', id: 'eng-pl', country: 'Inglaterra' },
      { name: 'La Liga', id: 'esp-pd', country: 'Espanha' },
      { name: 'Serie A', id: 'ita-sa', country: 'Itália' },
      { name: 'Bundesliga', id: 'ger-bl1', country: 'Alemanha' },
      { name: 'Ligue 1', id: 'fra-fl1', country: 'França' },
      { name: 'Primeira Liga', id: 'por-ppl', country: 'Portugal' },
      { name: 'Eredivisie', id: 'ned-er', country: 'Holanda' },
      { name: 'Süper Lig', id: 'tur-sl', country: 'Turquia' },
      { name: 'Jupiler Pro League', id: 'bel-jpl', country: 'Bélgica' },
      { name: 'First League', id: 'bul-fl', country: 'Bulgária' },
      { name: 'Austrian Bundesliga', id: 'aut-bl', country: 'Áustria' },
      { name: 'Superliga', id: 'den-sl', country: 'Dinamarca' },
      { name: 'Scottish Premiership', id: 'sco-sp', country: 'Escócia' },
      { name: 'Super League Greece', id: 'gre-sl', country: 'Grécia' },
      { name: 'Ekstraklasa', id: 'pol-ek', country: 'Polônia' },
      { name: 'Allsvenskan', id: 'swe-all', country: 'Suécia' },
      { name: 'Swiss Super League', id: 'sui-sl', country: 'Suíça' },
      { name: 'Ukrainian Premier League', id: 'ukr-upl', country: 'Ucrânia' }
    ]
  },
  {
    name: 'África', id: 'africa', color: 'text-yellow-400', leagues: [
      { name: 'CAF Champions League', id: 'afr-cl', country: 'África' },
      { name: 'Egyptian Premier League', id: 'egy-pl', country: 'Egito' },
      { name: 'Botola Pro', id: 'mar-bp', country: 'Marrocos' },
      { name: 'South African Premier Div', id: 'rsa-psl', country: 'África do Sul' },
      { name: 'Ligue 1', id: 'tun-l1', country: 'Tunísia' },
      { name: 'Girabola', id: 'ang-gb', country: 'Angola' },
      { name: 'NPFL', id: 'nga-npfl', country: 'Nigéria' },
      { name: 'GPL', id: 'gha-gpl', country: 'Gana' }
    ]
  },
  {
    name: 'Ásia', id: 'asia', color: 'text-red-400', leagues: [
      { name: 'AFC Champions League', id: 'asi-cl', country: 'Ásia' },
      { name: 'Saudi Pro League', id: 'ksa-spl', country: 'Arábia Saudita' },
      { name: 'J1 League', id: 'jpn-j1', country: 'Japão' },
      { name: 'K League 1', id: 'kor-k1', country: 'Coreia do Sul' },
      { name: 'UAE Pro League', id: 'uae-pl', country: 'Emirados Árabes' },
      { name: 'Chinese Super League', id: 'chn-csl', country: 'China' },
      { name: 'Bhutan Premier League', id: 'bhu-bpl', country: 'Butão' },
      { name: 'Thai League 1', id: 'tha-tl1', country: 'Tailândia' },
      { name: 'V.League 1', id: 'vie-vl1', country: 'Vietnã' },
      { name: 'Indian Super League', id: 'ind-isl', country: 'Índia' },
      { name: 'Qatar Stars League', id: 'qat-qsl', country: 'Catar' }
    ]
  },
  {
    name: 'América do Norte', id: 'north-america', color: 'text-purple-400', leagues: [
      { name: 'CONCACAF Champions Cup', id: 'nam-cl', country: 'América do Norte' },
      { name: 'MLS', id: 'usa-mls', country: 'EUA / Canadá' },
      { name: 'Liga MX', id: 'mex-lmx', country: 'México' },
      { name: 'Canadian Premier League', id: 'can-cpl', country: 'Canadá' },
      { name: 'Liga Nacional', id: 'hon-ln', country: 'Honduras' },
      { name: 'Primera División', id: 'crc-pd', country: 'Costa Rica' }
    ]
  },
  {
    name: 'Oceania', id: 'oceania', color: 'text-cyan-400', leagues: [
      { name: 'OFC Champions League', id: 'oce-cl', country: 'Oceania' },
      { name: 'New Zealand National League', id: 'nzl-nl', country: 'Nova Zelândia' },
      { name: 'Fiji Premier League', id: 'fij-pl', country: 'Fiji' }
    ]
  },
];

export const Explore = () => {
  const navigate = useNavigate();
  const { setFavoriteTeam } = useApp();
  const [view, setView] = useState<'continents' | 'leagues' | 'teams'>('continents');
  const [selectedContinent, setSelectedContinent] = useState<any>(null);
  const [selectedLeague, setSelectedLeague] = useState<any>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);

  // Load teams when a league is selected
  useEffect(() => {
    if (view === 'teams' && selectedLeague) {
      setLoading(true);
      api.getTeams().then(allTeams => {
        // Filter teams by the selected league ID
        const leagueTeams = allTeams.filter(t => t.leagueId === selectedLeague.id);
        setTeams(leagueTeams);
        setLoading(false);
      });
    }
  }, [view, selectedLeague]);

  const handleContinentClick = (continent: any) => {
    if (continent.leagues.length === 0) return; // Handle empty continents
    setSelectedContinent(continent);
    setView('leagues');
  };

  const handleLeagueClick = (league: any) => {
    setSelectedLeague(league);
    setView('teams');
  };

  const handleTeamClick = (team: Team) => {
    // Navigate to team details
    navigate(`/team/${team.id}`);
  };

  const goBack = () => {
    if (view === 'teams') setView('leagues');
    else if (view === 'leagues') setView('continents');
  };

  return (
    <div className="p-4 md:p-0 pt-8 md:pt-0 space-y-8 min-h-[80vh]">
      <header className="mb-6 border-b border-muted pb-6">
        <div className="flex items-center gap-4">
          {view !== 'continents' && (
            <button onClick={goBack} className="p-2 hover:bg-surface rounded-full transition-colors">
              <ArrowLeft className="text-text-main" />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-text-main mb-2">
              {view === 'continents' && 'Explorar Mundo'}
              {view === 'leagues' && selectedContinent?.name}
              {view === 'teams' && selectedLeague?.name}
            </h1>
            <p className="text-text-muted">
              {view === 'continents' && 'Navegue pelo ecossistema global do futebol.'}
              {view === 'leagues' && `Principais ligas de ${selectedContinent?.name}.`}
              {view === 'teams' && `Clubes da ${selectedLeague?.name}.`}
            </p>
          </div>
        </div>
      </header>

      {/* CONTINENTS VIEW */}
      {view === 'continents' && (
        <section>
          <h2 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 flex items-center gap-2 border-l-4 border-primary pl-2">
            <Map size={16} className="text-primary" /> Continentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONTINENTS.map((cont) => (
              <Card
                key={cont.name}
                onClick={() => handleContinentClick(cont)}
                className={`flex items-center justify-between cursor-pointer hover:bg-surface hover:border-[rgba(57,255,20,0.5)] transition-all group h-24 ${cont.leagues.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center ${cont.color} group-hover:bg-[rgba(57,255,20,0.1)] transition-colors`}>
                    <GlobeIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main text-lg">{cont.name}</h3>
                    <span className="text-xs text-text-muted group-hover:text-text-main">
                      {cont.leagues.length > 0 ? `${cont.leagues.length} Ligas` : 'Em breve'}
                    </span>
                  </div>
                </div>
                {cont.leagues.length > 0 && (
                  <ChevronRight size={20} className="text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                )}
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* LEAGUES VIEW */}
      {view === 'leagues' && (
        <section className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 flex items-center gap-2 border-l-4 border-primary pl-2">
            <Trophy size={16} className="text-primary" /> Ligas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedContinent?.leagues.map((league: any) => (
              <Card
                key={league.name}
                onClick={() => handleLeagueClick(league)}
                className="flex items-center justify-between p-4 cursor-pointer hover:border-primary hover:bg-surface transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-background border border-muted flex items-center justify-center text-xl">
                    ⚽
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main">{league.name}</h3>
                    <span className="text-xs text-text-muted">{league.country}</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-text-muted group-hover:text-primary" />
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* TEAMS VIEW */}
      {view === 'teams' && (
        <section className="animate-in fade-in slide-in-from-right-4 duration-300">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {teams.length > 0 ? (
                teams.map((team) => (
                  <Card
                    key={team.id}
                    onClick={() => handleTeamClick(team)}
                    className="cursor-pointer hover:border-primary hover:bg-surface transition-all flex items-center gap-4 p-4"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-background border border-muted p-2 rounded-lg">
                      <img src={team.logo} alt={team.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-medium text-text-main text-lg">{team.name}</span>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-text-muted">
                  <p className="text-lg mb-2">Nenhum time encontrado.</p>
                  <p className="text-sm opacity-60">
                    (Nota: Na versão gratuita da API, apenas ligas selecionadas como Brasileirão, Premier League e Champions League possuem dados completos.)
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
)
