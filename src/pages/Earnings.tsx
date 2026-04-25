import { Wallet, TrendingUp, ArrowDownToLine, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function Earnings() {
  const [userData, setUserData] = useState<{ balance: number } | null>(null);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(console.error);
  }, []);

  const withdrawalMethods = [
    { name: "Multicaixa Express", icon: "💳" },
    { name: "Unitel Money", icon: "📱" },
    { name: "AquiPaga", icon: "🏧" },
    { name: "IBAN", icon: "🏦" },
  ];

  return (
    <div className="p-6 pb-24">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Ganhos</h1>
        <p className="text-white/60 text-sm">Acompanhe suas receitas e realize saques.</p>
      </div>

      <div className="glass-panel rounded-3xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 blur-[80px] rounded-full" />
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Saldo Disponível</h3>
        <p className="text-3xl font-bold text-white">Kz {userData ? userData.balance.toLocaleString('pt-PT') : '0,00'}</p>
        <p className="text-xs text-emerald-400 mt-1">+ Kz 250 hoje</p>
        
        <button className="w-full mt-6 py-3 bg-violet-600 hover:bg-violet-500 transition-colors rounded-2xl text-xs font-bold uppercase tracking-widest text-white">
          Saque Rápido
        </button>
        <div className="mt-4 flex justify-between items-center px-1">
          <span className="text-[10px] text-white/40 uppercase">Express</span>
          <span className="text-[10px] text-white/40 uppercase">Multicaixa</span>
          <span className="text-[10px] text-white/40 uppercase">Iban</span>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-3xl p-6 relative mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-6">Desempenho de Streams</h3>
        <div className="flex items-end gap-2 h-32 px-2">
          <div className="flex-1 bg-violet-500/20 rounded-t-lg h-[40%]"></div>
          <div className="flex-1 bg-violet-500/40 rounded-t-lg h-[60%]"></div>
          <div className="flex-1 bg-violet-500/30 rounded-t-lg h-[50%]"></div>
          <div className="flex-1 bg-violet-500/80 rounded-t-lg h-[90%]"></div>
          <div className="flex-1 bg-violet-500/60 rounded-t-lg h-[70%]"></div>
          <div className="flex-1 bg-violet-500 rounded-t-lg h-[100%]"></div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="opacity-50">Spotify</span>
            <span className="font-bold">4.2k</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span class="opacity-50">Apple Music</span>
            <span className="font-bold">1.8k</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="opacity-50">YouTube</span>
            <span className="font-bold">6.4k</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4 px-1">Métodos de Saque</h3>
        <div className="grid grid-cols-2 gap-3">
          {withdrawalMethods.map((method, idx) => (
             <div key={idx} className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 cursor-pointer hover:border-sonorix-accent-1/50 transition-colors">
               <span className="text-2xl">{method.icon}</span>
               <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 text-center">{method.name}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
