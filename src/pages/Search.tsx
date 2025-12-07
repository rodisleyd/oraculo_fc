import React, { useState } from 'react';
import { ArrowRight, Sparkles, BrainCircuit } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{ teams: any[], leagues: any[] } | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResults(null);
    setAiResponse(null);

    // Simulate AI Processing for complex queries
    const lowerQuery = query.toLowerCase();
    let simulatedAiAnswer = null;

    if (lowerQuery.includes('quem') || lowerQuery.includes('qual') || lowerQuery.includes('quando') || lowerQuery.includes('comparar')) {
      // Mock AI Logic
      if (lowerQuery.includes('maior') && lowerQuery.includes('mundo')) {
        simulatedAiAnswer = "Com base em títulos internacionais e alcance global, o Real Madrid é frequentemente citado como o maior clube do mundo, com 14 títulos da Champions League.";
      } else if (lowerQuery.includes('pelé') && lowerQuery.includes('mbappé')) {
        simulatedAiAnswer = "Comparando Pelé (1962) e Mbappé (2022): Pelé venceu sua segunda Copa do Mundo em 62, embora tenha se lesionado cedo. Mbappé marcou um hat-trick na final de 2022, mas a França foi vice-campeã. Ambos demonstram domínio físico e técnico precoce.";
      } else {
        simulatedAiAnswer = "Esta é uma pergunta complexa que requer acesso ao meu banco de dados histórico completo (Oraculo PRO). No momento, posso ajudar você a encontrar times e ligas atuais.";
      }
    }

    try {
      const data = await api.search(query);

      // Artificial delay for "AI Thinking" effect if it's a question
      if (simulatedAiAnswer) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setAiResponse(simulatedAiAnswer);
      }

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
        <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4 tracking-tight flex items-center justify-center gap-3">
          <Sparkles className="text-primary animate-pulse" />
          Busca Universal
        </h1>
        <p className="text-text-muted text-lg">Pergunte qualquer coisa. O Oráculo sabe.</p>
      </div>

      <form onSubmit={handleSearch} className="relative z-10 w-full">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-green-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-surface rounded-xl border border-muted p-2 shadow-2xl" style={{ backgroundColor: 'var(--surface)' }}>
            <BrainCircuit className="ml-4 text-primary" size={24} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Ex: Compare Pelé e Mbappé..."
              className="w-full bg-transparent border-none text-text-main px-4 py-4 text-lg focus:outline-none placeholder:text-text-muted"
              style={{ color: 'var(--text-main)', caretColor: 'var(--primary)' }}
            />
            <Button type="submit" className="rounded-lg px-6">
              Perguntar
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
            <p className="text-primary font-mono text-lg animate-pulse">Consultando os arquivos akáshicos...</p>
          </div>
        ) : (results || aiResponse) ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* AI Answer Section */}
            {aiResponse && (
              <Card className="bg-[rgba(57,255,20,0.1)] border-[rgba(57,255,20,0.3)] p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BrainCircuit size={100} />
                </div>
                <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
                  <Sparkles size={16} /> Resposta do Oráculo
                </h3>
                <p className="text-text-main text-lg leading-relaxed">
                  {aiResponse}
                </p>
              </Card>
            )}

            {results && results.teams.length === 0 && results.leagues.length === 0 && !aiResponse && (
              <div className="text-center text-text-muted mt-10">
                <p>Nenhum resultado encontrado nos arquivos atuais.</p>
                <p className="text-sm mt-2">Tente buscar por nomes de times ou ligas.</p>
              </div>
            )}

            {results && results.teams.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">Clubes Encontrados</h3>
                <div className="grid grid-cols-1 gap-3">
                  {results.teams.map(team => (
                    <Card key={team.id} onClick={() => navigate(`/team/${team.id}`)} className="flex items-center justify-between cursor-pointer hover:border-primary transition-colors p-4">
                      <div className="flex items-center gap-4">
                        <img src={team.logo} alt={team.name} className="w-10 h-10 object-contain" />
                        <div>
                          <h4 className="font-bold text-text-main text-lg">{team.name}</h4>
                          <span className="text-xs text-text-muted">Clube de Futebol</span>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-text-muted" />
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {results && results.leagues.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">Ligas Encontradas</h3>
                <div className="grid grid-cols-1 gap-3">
                  {results.leagues.map(league => (
                    <Card key={league.id} className="flex items-center justify-between cursor-pointer hover:border-primary transition-colors p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-background border border-muted flex items-center justify-center text-xl">⚽</div>
                        <div>
                          <h4 className="font-bold text-text-main text-lg">{league.name}</h4>
                          <span className="text-xs text-text-muted">{league.country}</span>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-text-muted" />
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-text-muted opacity-20 mt-10">
            <BrainCircuit size={80} />
          </div>
        )}
      </div>
    </div>
  );
};
