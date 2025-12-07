import React, { useState } from 'react';
import { Search as SearchIcon, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{ teams: any[], leagues: any[] } | null>(null);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResults(null); // Clear previous results immediately

    try {
      const data = await api.search(query);
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-0 pt-12 md:pt-0 max-w-3xl mx-auto">
      <div className="text-center mb-10 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Busca Universal</h1>
        <p className="text-gray-400 text-lg">Pergunte qualquer coisa ou busque por times.</p>
      </div>

      <form onSubmit={handleSearch} className="relative z-10 w-full">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-green-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-surface rounded-xl border border-muted p-2 shadow-2xl">
            <SearchIcon className="ml-4 text-gray-400" size={24} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Ex: Flamengo, Premier League..."
              className="w-full bg-transparent border-none text-white px-4 py-4 text-lg focus:outline-none placeholder:text-gray-600"
            />
            <Button type="submit" className="rounded-lg px-6">
              Buscar
            </Button>
          </div>
        </div>
      </form>

      <div className="flex-1 mt-12 w-full">
        {isSearching ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-t-4 border-primary rounded-full mb-6"
            />
            <p className="text-primary font-mono text-lg animate-pulse">Consultando os arquivos...</p>
          </div>
        ) : results ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {results.teams.length === 0 && results.leagues.length === 0 && (
              <div className="text-center text-gray-500 mt-10">Nenhum resultado encontrado para "{query}".</div>
            )}

            {results.teams.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Clubes</h3>
                <div className="grid grid-cols-1 gap-3">
                  {results.teams.map(team => (
                    <Card key={team.id} onClick={() => navigate(`/team/${team.id}`)} className="flex items-center justify-between cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{team.logo}</span>
                        <div>
                          <h4 className="font-bold text-white">{team.name}</h4>
                          <span className="text-xs text-gray-500">Clube de Futebol</span>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-gray-600" />
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {results.leagues.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Ligas</h3>
                <div className="grid grid-cols-1 gap-3">
                  {results.leagues.map(league => (
                    <Card key={league.id} className="flex items-center justify-between cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{league.logo}</span>
                        <div>
                          <h4 className="font-bold text-white">{league.name}</h4>
                          <span className="text-xs text-gray-500">{league.country}</span>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-gray-600" />
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-700 opacity-20 mt-10">
            <SearchIcon size={80} />
          </div>
        )}
      </div>
    </div>
  );
};
