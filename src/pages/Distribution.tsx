import { Rocket, UploadCloud, CheckCircle2, Music } from "lucide-react";
import { useEffect, useState } from "react";

export default function Distribution() {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/tracks')
      .then(res => res.json())
      .then(data => setTracks(data))
      .catch(console.error);
  }, []);

  const handleAddTrack = async () => {
    try {
      await fetch('/api/tracks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Nova Faixa ' + Math.floor(Math.random() * 100), genre: 'Hip Hop' })
      });
      // Refresh tracks
      fetch('/api/tracks')
        .then(res => res.json())
        .then(data => setTracks(data))
        .catch(console.error);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col pb-24">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Distribuição</h1>
        <p className="text-white/60 text-sm">Lance sua música para o mundo instantaneamente.</p>
      </div>

      <div className="bg-gradient-to-br from-violet-900/40 via-black to-black border border-white/10 rounded-[32px] p-8 text-center mb-8 flex-shrink-0 relative overflow-hidden group shadow-[0_0_20px_rgba(139,92,246,0.1)]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-violet-600/20 blur-[60px] rounded-full" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center mb-4 text-violet-400">
            <Rocket className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">Novo Lançamento</h2>
          <p className="text-xs text-white/60 mb-6">Distribua para Spotify, Apple Music, TikTok e +150 lojas.</p>
          <button 
            onClick={handleAddTrack}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Adicionar Música
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4 px-1">Meus Lançamentos</h3>
        
        <div className="space-y-3">
          {tracks.map((track) => (
           <div key={track.id} className={`glass-panel p-4 rounded-2xl flex items-center gap-4 ${track.status === 'processing' ? 'opacity-70' : ''}`}>
             <div className={`w-14 h-14 ${track.status === 'processing' ? 'bg-sonorix-surface border-dashed' : 'bg-black'} rounded-lg flex items-center justify-center relative overflow-hidden border border-white/20`}>
               {track.status === 'processing' ? (
                 <UploadCloud className="w-5 h-5 text-white/40" />
               ) : (
                 <>
                   <Music className="w-6 h-6 text-white/40 relative z-10" />
                   <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&h=100&fit=crop" className="absolute inset-0 opacity-40 object-cover" />
                 </>
               )}
             </div>
             <div className="flex-1">
               <h4 className="font-semibold text-sm text-white/90">{track.title}</h4>
               <p className="text-[10px] text-white/40">Single • {track.genre}</p>
             </div>
             <div className="flex flex-col items-end gap-1">
                <span className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded font-medium
                  ${track.status === 'live' ? 'text-emerald-400 bg-emerald-400/10' : 'text-fuchsia-400 bg-fuchsia-400/10'}`}>
                   {track.status === 'live' && <CheckCircle2 className="w-3 h-3" />}
                   {track.status === 'live' ? 'Ao vivo' : 'Em processamento'}
                </span>
             </div>
           </div>
          ))}
        </div>
      </div>
    </div>
  );
}
