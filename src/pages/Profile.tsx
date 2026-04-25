import { User, Settings, CheckCircle, Headphones, Edit3, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState<{ name: string; username: string; followers: number } | null>(null);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="relative pb-24">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-tr from-violet-600/40 to-fuchsia-600/40 relative">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
           <Edit3 className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="px-6 relative -mt-12">
        <div className="flex justify-between items-end mb-4">
          <div className="w-24 h-24 rounded-2xl border-4 border-sonorix-bg relative bg-sonorix-surface shadow-xl shadow-black/50">
             <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop" className="w-full h-full rounded-xl object-cover" />
             <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-sonorix-bg flex items-center justify-center">
               <CheckCircle className="w-3 h-3 text-white" />
             </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center border-sonorix-border hover:bg-white/10 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center border-sonorix-border hover:bg-white/10 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">{userData ? userData.name : 'João Produtor'}</h1>
          <p className="text-violet-400 text-sm font-medium mb-2">@{userData ? userData.username : 'joaoprodutor'}</p>
          <p className="text-sm text-white/60 leading-relaxed max-w-sm">Criando batidas do zero e mixando vida nas faixas. Produtor de Luanda.</p>
        </div>

        <div className="flex gap-6 mb-8 border-b border-white/5 pb-6">
          <div>
            <p className="text-2xl font-bold text-white">{userData ? (userData.followers >= 1000 ? (userData.followers / 1000).toFixed(1) + 'K' : userData.followers) : '12.5K'}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Seguidores</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">42</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Músicas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">1.2M</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Plays</p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 flex items-center gap-2 mb-4">
            <Headphones className="w-4 h-4 text-fuchsia-400" /> Minha Biblioteca
          </h3>
          <div className="grid grid-cols-2 gap-3">
             <div className="glass-panel border-sonorix-border p-4 rounded-2xl flex flex-col items-center justify-center aspect-square text-center cursor-pointer hover:border-sonorix-accent-1/50 transition-colors">
               <span className="text-3xl mb-2">💽</span>
               <p className="text-sm font-bold text-white/90">Meus Projetos</p>
               <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">No Estúdio</p>
             </div>
             <div className="glass-panel border-sonorix-border p-4 rounded-2xl flex flex-col items-center justify-center aspect-square text-center cursor-pointer hover:border-sonorix-accent-1/50 transition-colors">
               <span className="text-3xl mb-2">🎵</span>
               <p className="text-sm font-bold text-white/90">Músicas Salvas</p>
               <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">Offline</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
