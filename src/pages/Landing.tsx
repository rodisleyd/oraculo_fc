import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Search, Zap, Trophy, ChevronRight, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Landing = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [joined, setJoined] = useState(false);

    const handleJoinWaitlist = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setJoined(true);
        // In a real app, this would send to Supabase/ConvertKit
        setTimeout(() => {
            // Optional: Auto redirect or let them click
        }, 1500);
    };

    const handleDemo = () => {
        navigate('/onboarding');
    };

    return (
        <div className="min-h-screen bg-background text-text-main flex flex-col overflow-hidden">

            {/* Navbar */}
            <nav className="p-6 flex justify-between items-center z-10 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-neon">
                        <Sparkles size={18} className="text-black" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Oraculo <span className="text-primary">FC</span></span>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" onClick={() => navigate('/login')} className="hidden md:flex">Login</Button>
                    <Button onClick={handleDemo} className="shadow-neon">
                        Testar Demo Grátis <ArrowRight size={16} />
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 max-w-5xl mx-auto z-10">

                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Nova Era do Futebol
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
                >
                    O Futebol não é só <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">Números. É História.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xl text-text-muted max-w-2xl mb-10"
                >
                    Esqueça as planilhas chatas. O Oráculo FC usa Inteligência Artificial para te dar argumentos irrefutáveis, estatísticas profundas e narrativas épicas.
                </motion.p>

                {/* Waitlist Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-md bg-surface p-2 rounded-2xl border border-muted shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-300"
                >
                    {!joined ? (
                        <form onSubmit={handleJoinWaitlist} className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Seu melhor e-mail..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent border-none flex-1 px-4 py-3 text-text-main focus:outline-none placeholder:text-text-muted"
                                required
                            />
                            <Button type="submit" className="rounded-xl font-bold">
                                Entrar na Lista <Mail size={16} className="ml-2" />
                            </Button>
                        </form>
                    ) : (
                        <div className="flex items-center justify-center gap-2 py-3 text-green-500 font-bold">
                            <CheckCircle2 size={24} />
                            Você está na fila! 🚀
                        </div>
                    )}
                </motion.div>

                {joined && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-8"
                    >
                        <p className="text-sm text-text-muted mb-2">Enquanto espera, que tal ver o que preparamos?</p>
                        <Button variant="outline" onClick={handleDemo} className="border-primary text-primary hover:bg-primary/10">
                            Acessar Demonstração Agora
                        </Button>
                    </motion.div>
                )}

            </section>

            {/* Features Grid */}
            <section className="bg-surface/50 py-20 border-t border-muted relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16">Poderes do Oráculo</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Search className="text-primary" size={32} />}
                            title="Busca Universal"
                            desc="Pergunte 'Quem foi melhor: Zico ou Platini?' e receba uma análise completa baseada em dados históricos."
                        />
                        <FeatureCard
                            icon={<Shield className="text-blue-400" size={32} />}
                            title="Raio-X Infalível"
                            desc="Explore a evolução dos escudos, uniformes e estádios de qualquer time do mundo."
                        />
                        <FeatureCard
                            icon={<Zap className="text-yellow-400" size={32} />}
                            title="Ao Vivo (Beta)"
                            desc="Acompanhe placares em tempo real com uma interface limpa, rápida e sem poluição visual."
                        />
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-20 text-center px-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 -z-10" />
                <Trophy size={48} className="mx-auto text-yellow-500 mb-6" />
                <h2 className="text-4xl font-bold mb-4">Feito por fanáticos, para fanáticos.</h2>
                <p className="text-text-muted text-lg mb-8">Junte-se a outros 14.000 torcedores na lista de espera.</p>
                <div className="flex justify-center -space-x-4 mb-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-gray-600" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`, backgroundSize: 'cover' }} />
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-background bg-surface flex items-center justify-center text-xs font-bold text-text-muted">
                        +14k
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-muted text-center text-text-muted text-sm relative z-10 bg-background">
                <p>© {new Date().getFullYear()} Oráculo FC. Todos os direitos reservados.</p>
                <p className="mt-2 text-xs opacity-50">Dados fornecidos por API-Football e OpenAI (Simulado).</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <Card className="p-8 hover:border-primary/50 transition-colors group cursor-default bg-background/50 backdrop-blur">
        <div className="w-14 h-14 rounded-2xl bg-surface border border-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-text-muted leading-relaxed">{desc}</p>
    </Card>
);
