import React, { useState } from 'react';
import { Search, Shield, Shirt, MapPin, Star, Info, ChevronRight, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { Team } from '../types';

// Mock Data for "Raio X" Demo (Flamengo)
const MOCK_XRAY_DATA: any = {
    'flamengo': {
        badges: [
            { year: '1895', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/CRFlamengo-1895.png/180px-CRFlamengo-1895.png', desc: 'Primeiro escudo (Remo)' },
            { year: '1912', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_braz_logo.svg/1200px-Flamengo_braz_logo.svg.png', desc: 'Início do Futebol' },
            { year: '1981', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_braz_logo.svg/1200px-Flamengo_braz_logo.svg.png', desc: 'Era de Ouro' },
            { year: '2018', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_braz_logo.svg/1200px-Flamengo_braz_logo.svg.png', desc: 'Atualização Moderna' },
        ],
        kits: [
            { year: '1981', img: 'https://i.pinimg.com/originals/d6/3c/6a/d63c6a00667087612716766479708781.png', desc: 'Campeão Mundial' },
            { year: '2019', img: 'https://static.netshoes.com.br/produtos/camisa-flamengo-i-1920-s-n-torcedor-adidas-masculina/16/COL-4478-016/COL-4478-016_zoom1.jpg', desc: 'Ano Mágico' },
        ],
        stadium: {
            name: 'Maracanã',
            capacity: '78.838',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Maracan%C3%A3_Stadium_in_Rio_de_Janeiro.jpg/1200px-Maracan%C3%A3_Stadium_in_Rio_de_Janeiro.jpg',
            desc: 'O Templo do Futebol. Palco de duas finais de Copa do Mundo.'
        },
        legends: [
            { name: 'Zico', role: 'Meia', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Zico_in_1982.jpg/220px-Zico_in_1982.jpg' },
            { name: 'Júnior', role: 'Lateral', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/J%C3%BAnior_1982.jpg/200px-J%C3%BAnior_1982.jpg' },
            { name: 'Gabigol', role: 'Atacante', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Gabigol_2019.jpg/200px-Gabigol_2019.jpg' },
        ],
        trivia: [
            "O Flamengo foi fundado originalmente como um clube de remo.",
            "Possui a maior torcida do mundo, com mais de 40 milhões de torcedores.",
            "Zico é o maior artilheiro da história do clube com 508 gols."
        ]
    },
    'real_madrid': {
        badges: [
            { year: '1902', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png', desc: 'Fundação (Madrid FC)' },
            { year: '1920', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png', desc: 'Título Real' },
            { year: '2001', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png', desc: 'Galácticos' },
        ],
        kits: [
            { year: '1950', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Real_Madrid_Kit_1955-56_Home.png/180px-Real_Madrid_Kit_1955-56_Home.png', desc: 'Era Di Stéfano' },
            { year: '2017', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Real_Madrid_Kit_1955-56_Home.png/180px-Real_Madrid_Kit_1955-56_Home.png', desc: 'Duodecima' },
        ],
        stadium: {
            name: 'Santiago Bernabéu',
            capacity: '81.044',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Santiago_Bernabeu_Stadium_-_Madrid.jpg/1200px-Santiago_Bernabeu_Stadium_-_Madrid.jpg',
            desc: 'Um dos estádios mais icônicos do mundo, recentemente reformado.'
        },
        legends: [
            { name: 'Cristiano Ronaldo', role: 'Atacante', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/200px-Cristiano_Ronaldo_2018.jpg' },
            { name: 'Di Stéfano', role: 'Atacante', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Alfredo_Di_St%C3%A9fano_2011.jpg/200px-Alfredo_Di_St%C3%A9fano_2011.jpg' },
            { name: 'Zidane', role: 'Meia', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg/220px-Zinedine_Zidane_by_Tasnim_03.jpg' },
        ],
        trivia: [
            "Maior vencedor da Champions League com 14 títulos.",
            "Foi eleito o Melhor Clube do Século XX pela FIFA.",
            "Nunca foi rebaixado da primeira divisão espanhola."
        ]
    },
    'brasil': {
        badges: [
            { year: '1914', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Brazilian_Football_Confederation_logo.svg/1200px-Brazilian_Football_Confederation_logo.svg.png', desc: 'Primeiro Escudo' },
            { year: '1970', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Brazilian_Football_Confederation_logo.svg/1200px-Brazilian_Football_Confederation_logo.svg.png', desc: 'Tri Mundial' },
            { year: '2002', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Brazilian_Football_Confederation_logo.svg/1200px-Brazilian_Football_Confederation_logo.svg.png', desc: 'Penta' },
        ],
        kits: [
            { year: '1958', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Brazilian_Football_Confederation_logo.svg/1200px-Brazilian_Football_Confederation_logo.svg.png', desc: 'A Amarelinha' },
            { year: '1970', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Brazilian_Football_Confederation_logo.svg/1200px-Brazilian_Football_Confederation_logo.svg.png', desc: 'O Esquadrão' },
        ],
        stadium: {
            name: 'Maracanã',
            capacity: '78.838',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Maracan%C3%A3_Stadium_in_Rio_de_Janeiro.jpg/1200px-Maracan%C3%A3_Stadium_in_Rio_de_Janeiro.jpg',
            desc: 'Casa espiritual da Seleção Brasileira.'
        },
        legends: [
            { name: 'Pelé', role: 'Rei', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pele_con_la_copa_Jules_Rimet_en_1970.jpg/220px-Pele_con_la_copa_Jules_Rimet_en_1970.jpg' },
            { name: 'Ronaldo', role: 'Fenômeno', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Ronaldo_Cannes_2018.jpg/220px-Ronaldo_Cannes_2018.jpg' },
            { name: 'Romário', role: 'Baixinho', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rom%C3%A1rio_2014.jpg/220px-Rom%C3%A1rio_2014.jpg' },
        ],
        trivia: [
            "Única seleção a participar de todas as Copas do Mundo.",
            "Maior campeã mundial com 5 títulos.",
            "Pelé é o único jogador a vencer 3 Copas do Mundo."
        ]
    },
    'santos': {
        badges: [
            { year: '1912', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Santos_Logo.png/1200px-Santos_Logo.png', desc: 'Fundação' },
            { year: '1962', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Santos_Logo.png/1200px-Santos_Logo.png', desc: 'Bicampeão Mundial' },
        ],
        kits: [
            { year: '1962', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Santos_Logo.png/1200px-Santos_Logo.png', desc: 'O Branco Imaculado' },
            { year: '2011', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Santos_Logo.png/1200px-Santos_Logo.png', desc: 'Era Neymar' },
        ],
        stadium: {
            name: 'Vila Belmiro',
            capacity: '16.068',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Vila_Belmiro_-_Santos_FC.jpg/1200px-Vila_Belmiro_-_Santos_FC.jpg',
            desc: 'O Alçapão. Onde o Rei Pelé brilhou.'
        },
        legends: [
            { name: 'Pelé', role: 'Rei', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pele_con_la_copa_Jules_Rimet_en_1970.jpg/220px-Pele_con_la_copa_Jules_Rimet_en_1970.jpg' },
            { name: 'Neymar Jr', role: 'Atacante', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg/220px-Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg' },
            { name: 'Pepe', role: 'Canhão', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pepe_Santos.jpg/220px-Pepe_Santos.jpg' },
        ],
        trivia: [
            "Clube que revelou Pelé e Neymar.",
            "Parou uma guerra na Nigéria em 1969.",
            "Marcou mais de 12 mil gols em sua história."
        ]
    },
    'manchester_city': {
        badges: [
            { year: '1894', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png', desc: 'Fundação' },
            { year: '1997', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png', desc: 'A Águia' },
            { year: '2016', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png', desc: 'Retorno ao Clássico' },
        ],
        kits: [
            { year: '2012', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png', desc: 'Agueroooo' },
            { year: '2023', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png', desc: 'Treble Winners' },
        ],
        stadium: {
            name: 'Etihad Stadium',
            capacity: '53.400',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Etihad_Stadium.jpg/1200px-Etihad_Stadium.jpg',
            desc: 'Fortaleza moderna dos Citizens.'
        },
        legends: [
            { name: 'De Bruyne', role: 'Meia', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Kevin_De_Bruyne_201807091.jpg/220px-Kevin_De_Bruyne_201807091.jpg' },
            { name: 'Aguero', role: 'Atacante', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Sergio_Ag%C3%BCero_2018.jpg/220px-Sergio_Ag%C3%BCero_2018.jpg' },
            { name: 'Haaland', role: 'Atacante', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Erling_Haaland_2023.jpg/220px-Erling_Haaland_2023.jpg' },
        ],
        trivia: [
            "Venceu a Tríplice Coroa (Treble) em 2023.",
            "Dominou a Premier League sob o comando de Pep Guardiola.",
            "Possui uma das academias mais modernas do mundo."
        ]
    }
};

export const Encyclopedia = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<Team | null>(null);
    const [xrayData, setXrayData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'badges' | 'kits' | 'stadium' | 'legends' | 'trivia'>('badges');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setResult(null);
        setXrayData(null);

        try {
            // 1. Search in API
            const searchRes = await api.search(query);
            if (searchRes.teams.length > 0) {
                const team = searchRes.teams[0]; // Take the first match
                setResult(team);

                // 2. Check for Mock X-Ray Data
                const key = query.toLowerCase();
                if (key.includes('flamengo')) {
                    setXrayData(MOCK_XRAY_DATA['flamengo']);
                } else if (key.includes('real madrid')) {
                    setXrayData(MOCK_XRAY_DATA['real_madrid']);
                } else if (key.includes('brasil') || key.includes('seleção')) {
                    setXrayData(MOCK_XRAY_DATA['brasil']);
                } else if (key.includes('santos')) {
                    setXrayData(MOCK_XRAY_DATA['santos']);
                } else if (key.includes('city') || key.includes('manchester city')) {
                    setXrayData(MOCK_XRAY_DATA['manchester_city']);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-0 pt-8 md:pt-0 pb-24">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-main mb-2 flex items-center gap-2">
                    <Shield className="text-primary" /> Raio X Infalível
                </h1>
                <p className="text-text-muted">A enciclopédia visual definitiva. Escudos, uniformes e lendas.</p>
            </header>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
                <div className="relative flex items-center bg-surface rounded-xl border border-muted p-2" style={{ backgroundColor: 'var(--surface)' }}>
                    <Search className="ml-3 text-text-muted" size={20} />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Digite o nome do clube (Ex: Flamengo)..."
                        className="w-full bg-transparent border-none text-text-main px-4 py-3 focus:outline-none placeholder:text-text-muted"
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Buscando...' : 'Analisar'}
                    </Button>
                </div>
            </form>

            {/* Results */}
            {result && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Header Card - Using generic Card which has the fix, removing broken gradient */}
                    <Card className="p-6 border-primary/20">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-background p-4 rounded-full shadow-lg flex items-center justify-center border border-muted">
                                <img src={result.logo} alt={result.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-text-main mb-1">{result.name}</h2>
                                <div className="flex gap-2 text-sm text-text-muted">
                                    <span>Fundado em {result.founded}</span>
                                    <span>•</span>
                                    <span>{result.stadium}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* X-Ray Content */}
                    {xrayData ? (
                        <div>
                            {/* Tabs */}
                            <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
                                {[
                                    { id: 'badges', label: 'Escudos', icon: Shield },
                                    { id: 'kits', label: 'Uniformes', icon: Shirt },
                                    { id: 'stadium', label: 'Estádio', icon: MapPin },
                                    { id: 'legends', label: 'Lendas', icon: Star },
                                    { id: 'trivia', label: 'Curiosidades', icon: Info },
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        // Added inline style for background to ensure it works
                                        style={{ backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--surface)' }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${activeTab === tab.id
                                            ? 'text-black font-bold'
                                            : 'text-text-muted hover:text-text-main border border-muted'
                                            }`}
                                    >
                                        <tab.icon size={16} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="min-h-[300px]">
                                {activeTab === 'badges' && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {xrayData.badges.map((badge: any, idx: number) => (
                                            <Card key={idx} className="p-4 flex flex-col items-center text-center hover:border-primary transition-colors">
                                                <span className="text-primary font-bold mb-2">{badge.year}</span>
                                                <div className="w-20 h-20 mb-3 flex items-center justify-center">
                                                    {/* Using placeholder if image fails or generic */}
                                                    <img src={badge.img} alt={badge.year} className="max-w-full max-h-full" onError={(e) => (e.currentTarget.src = result.logo)} />
                                                </div>
                                                <p className="text-xs text-text-muted">{badge.desc}</p>
                                            </Card>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'kits' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {xrayData.kits.map((kit: any, idx: number) => (
                                            <Card key={idx} className="p-4 flex items-center gap-4 hover:border-primary transition-colors">
                                                <div className="w-24 h-24 bg-background border border-muted rounded-lg flex items-center justify-center">
                                                    <Shirt size={40} className="text-text-muted" />
                                                </div>
                                                <div>
                                                    <span className="text-primary font-bold block mb-1">{kit.year}</span>
                                                    <p className="text-text-main font-medium">{kit.desc}</p>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'stadium' && (
                                    <Card className="overflow-hidden">
                                        <div className="h-48 bg-gray-800 relative">
                                            <img src={xrayData.stadium.img} alt={xrayData.stadium.name} className="w-full h-full object-cover opacity-60" />
                                            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
                                                <h3 className="text-2xl font-bold text-white shadow-sm">{xrayData.stadium.name}</h3>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between mb-4 text-sm text-text-muted">
                                                <span>Capacidade: {xrayData.stadium.capacity}</span>
                                            </div>
                                            <p className="text-text-main">{xrayData.stadium.desc}</p>
                                        </div>
                                    </Card>
                                )}

                                {activeTab === 'legends' && (
                                    <div className="space-y-3">
                                        {xrayData.legends.map((legend: any, idx: number) => (
                                            <Card key={idx} className="p-3 flex items-center gap-4 hover:bg-surface transition-colors">
                                                <div className="w-12 h-12 rounded-full bg-background border border-muted overflow-hidden">
                                                    <img src={legend.img} alt={legend.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-text-main">{legend.name}</h4>
                                                    <span className="text-xs text-primary">{legend.role}</span>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'trivia' && (
                                    <Card className="p-6">
                                        <ul className="space-y-4">
                                            {xrayData.trivia.map((fact: string, idx: number) => (
                                                <li key={idx} className="flex gap-3 text-text-main">
                                                    <Info className="text-primary shrink-0 mt-1" size={16} />
                                                    <span>{fact}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-surface rounded-xl border border-dashed border-muted" style={{ backgroundColor: 'var(--surface)' }}>
                            <Lock className="mx-auto text-text-muted mb-4" size={48} />
                            <h3 className="text-xl font-bold text-text-main mb-2">Arquivo Histórico Bloqueado</h3>
                            <p className="text-text-muted max-w-xs mx-auto mb-6">
                                O "Raio X" completo com evolução de escudos e uniformes para <strong>{result.name}</strong> está disponível apenas no <strong>Oraculo PRO</strong>.
                            </p>
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
                                Desbloquear Oraculo PRO
                            </Button>
                            <p className="text-xs text-text-muted mt-4">
                                (Dica: Tente buscar por "Flamengo" para ver uma demonstração gratuita)
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
