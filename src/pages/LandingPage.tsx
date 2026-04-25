import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, Music, Mic2, Play, ArrowRight, Star, Rocket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-sonorix-bg text-gray-200 font-sans selection:bg-sonorix-accent-1/30 selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] bg-fuchsia-600/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 max-w-7xl mx-auto flex items-center justify-between border-b border-sonorix-border bg-sonorix-surface/40 backdrop-blur-md mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Music className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">Sonorix</span>
        </div>
        <div className="flex items-center gap-6">
          <Link 
            to="/auth" 
            className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-violet-500/50 transition-colors"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">Estúdio Online</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 pt-12 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold mb-8 uppercase tracking-widest text-violet-400"
        >
          <Sparkles className="w-3 h-3 text-fuchsia-400" />
          O estúdio do futuro chegou
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl text-white"
        >
          Crie, Distribua e <br className="hidden md:block" />
          Lucre com a <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400">Inteligência Artificial</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mb-10 leading-relaxed font-medium"
        >
          Tudo que você precisa em um só aplicativo. Grave vocais, separe stems, crie instrumentais com IA, gere capas e distribua para o Spotify.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link 
            to="/auth" 
            className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-300 shadow-xl shadow-white/10"
          >
            Começar Gratuitamente <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors duration-300 backdrop-blur-md hover:border-violet-500/50">
            <Play className="w-4 h-4 text-violet-400" /> Ver Tutorial
          </button>
        </motion.div>

        {/* Feature Grid preview */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
           className="w-full mt-24 mb-10 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sonorix-bg to-sonorix-bg z-10 h-full w-full pointer-events-none mt-[20%]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-0">
            <div className="h-64 glass-panel bg-sonorix-surface rounded-[32px] p-6 flex flex-col items-start justify-end text-left shadow-2xl relative overflow-hidden group">
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                 <Mic2 className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-white">Estúdio Pro com IA</h3>
              <p className="text-sm text-white/50 leading-relaxed font-medium">Grave a qualquer momento, afine automaticamente e adicione efeitos profissionais.</p>
            </div>
            
            <div className="h-64 glass-panel bg-sonorix-surface rounded-[32px] p-6 flex flex-col items-start justify-end text-left shadow-2xl transform md:-translate-y-8 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="absolute top-6 right-6 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                 <Layers className="w-5 h-5 text-fuchsia-400" />
               </div>
              <h3 className="font-bold text-xl mb-2 text-white">Separação de Stems</h3>
              <p className="text-sm text-white/50 leading-relaxed font-medium">Extraia a voz ou os instrumentos de qualquer música instantaneamente.</p>
            </div>

            <div className="h-64 glass-panel bg-sonorix-surface rounded-[32px] p-6 flex flex-col items-start justify-end text-left shadow-2xl relative overflow-hidden group">
               <div className="absolute top-6 right-6 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                 <Rocket className="w-5 h-5 text-orange-400" />
               </div>
              <h3 className="font-bold text-xl mb-2 text-white">Distribuição Digital</h3>
              <p className="text-sm text-white/50 leading-relaxed font-medium">Lance suas músicas no Spotify e Apple Music. Acompanhe ganhos.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// Icon placeholder for Layers
function Layers(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
  );
}
