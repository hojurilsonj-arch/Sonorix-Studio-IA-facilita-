import { Play, TrendingUp, Gift, BookOpen, ChevronRight, Speaker } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userData, setUserData] = useState<{ name: string; balance: number } | null>(null);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(console.error);
  }, []);
  const dailyVerse = {
    verse: "Tudo posso naquele que me fortalece.",
    reference: "Filipenses 4:13",
    application: "Use sua criatividade hoje sabendo que a sua força não vem apenas do seu talento, mas do propósito que guia suas mãos."
  };

  const trendingArtists = [
    { name: "Soraia M.", genre: "Kizomba", img: "https://images.unsplash.com/photo-1516280440502-85078d1217e9?w=150&h=150&fit=crop" },
    { name: "DJ Lua", genre: "Afrobeat", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=150&h=150&fit=crop" },
    { name: "X-Boy", genre: "Hip Hop", img: "https://images.unsplash.com/photo-1520443240718-fce21901db79?w=150&h=150&fit=crop" },
  ];

  return (
    <div className="p-6 pb-24">
      {/* Header Profile Summary */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 p-0.5 shadow-lg shadow-violet-500/20">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <span className="text-xs font-bold text-white">PRO</span>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Olá, {userData ? userData.name.split(' ')[0] : 'Produtor'}!</h2>
            <p className="text-xs text-violet-400 font-medium">Kz {userData ? userData.balance.toLocaleString('pt-PT') : '0,00'}</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center relative hover:bg-white/10 transition-colors">
          <Gift className="w-5 h-5 text-fuchsia-400" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-fuchsia-500 rounded-full border-2 border-sonorix-bg"></span>
        </button>
      </div>

      {/* Daily Verse */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden mb-8">
        <p className="text-[11px] text-white/40 uppercase tracking-[0.1em] mb-4 italic flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-violet-400" /> Frase do Dia
        </p>
        <p className="text-lg font-serif italic leading-relaxed text-white/90">
          "{dailyVerse.verse}"
        </p>
        <p className="text-xs text-violet-400 mt-2">{dailyVerse.reference}</p>
        <div className="mt-6 pt-6 border-t border-white/5">
          <p className="text-xs text-white/60 leading-relaxed text-opacity-90">{dailyVerse.application}</p>
        </div>
      </div>

      {/* Quick Action - Studio CTA */}
      <div className="bg-gradient-to-br from-violet-900/50 via-sonorix-surface to-sonorix-surface border border-white/10 rounded-[32px] p-8 flex flex-col justify-end relative overflow-hidden mb-8 group cursor-pointer">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop')] mix-blend-overlay opacity-20 object-cover" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1 leading-tight tracking-tighter">
              Estúdio <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">IA</span>
            </h2>
            <p className="text-white/60 text-sm">Crie, afine e grave vocais</p>
          </div>
          <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-lg shadow-white/10">
            <Play className="w-5 h-5 ml-1" />
          </div>
        </div>
      </div>

      {/* Trending Artists */}
      <div className="mb-8 glass-panel rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">Trending Artists</h3>
          <button className="text-xs text-violet-400 flex items-center">Ver mais <ChevronRight className="w-3 h-3 ml-1" /></button>
        </div>
        <div className="space-y-4">
          {trendingArtists.map((artist, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
                ${idx === 0 ? 'bg-orange-500/20 text-orange-400' : 
                  idx === 1 ? 'bg-violet-500/20 text-violet-400' : 
                  idx === 2 ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/60'}`}>
                {idx + 1}
              </div>
              <img src={artist.img} alt={artist.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{artist.name}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">{artist.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tracks (Mocked) */}
      <div className="glass-panel rounded-3xl p-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 flex items-center gap-2 mb-6">
          <Speaker className="w-4 h-4 text-fuchsia-400" /> Destaques
        </h3>
        <div className="space-y-4">
          {[1,2,3].map((i) => (
             <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors">
               <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center relative overflow-hidden border border-white/10 group-hover:border-violet-500/50 transition-colors">
                 <img src={`https://images.unsplash.com/photo-1493225457124-a1a2a5f5f92${i}?w=100&h=100&fit=crop`} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                 <Play className="w-4 h-4 relative z-10 text-white drop-shadow-md" />
               </div>
               <div className="flex-1">
                 <p className="text-sm font-medium text-white/90">Sonho Noturno {i}</p>
                 <p className="text-xs text-white/40">Beatmaker {i} • 2k plays</p>
               </div>
               <button className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
               </button>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
