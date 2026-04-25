import { Mic2, Layers, Music, Image as ImageIcon, Video, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Studio() {
  const tools = [
    { title: "Estúdio IA", icon: Mic2, color: "text-violet-400", bg: "bg-violet-500/10", desc: "Auto-tune e mixagem" },
    { title: "Separar Stems", icon: Layers, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", desc: "Isole voz/instrumentos" },
    { title: "Criar Batidas", icon: Music, color: "text-orange-400", bg: "bg-orange-500/10", desc: "Loops por IA" },
    { title: "Capa Arte", icon: ImageIcon, color: "text-cyan-400", bg: "bg-cyan-500/10", desc: "Capas profissionais" },
    { title: "Videoclipes", icon: Video, color: "text-emerald-400", bg: "bg-emerald-500/10", desc: "Vídeos com letras" },
    { title: "Monetização", icon: Wand2, color: "text-red-400", bg: "bg-red-500/10", desc: "Ganhe com sua arte" },
  ];

  return (
    <div className="p-6 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Estúdio Criativo</h1>
        <p className="text-white/60 text-sm">Ferramentas de IA para produzir sucessos.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool, idx) => (
          <div key={idx} className="bg-sonorix-surface border border-sonorix-border rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-sonorix-accent-1/50 transition-colors cursor-pointer">
             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tool.bg} ${tool.color}`}>
               <tool.icon className={`w-6 h-6`} />
             </div>
             <p className="text-[11px] font-bold uppercase tracking-wider text-white/90">{tool.title}</p>
             <p className="text-[9px] text-white/40">{tool.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-br from-violet-900/40 via-black to-black border border-white/10 rounded-[32px] p-8 flex flex-col justify-end relative overflow-hidden text-center">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-violet-600/20 blur-[80px] rounded-full"></div>
        <div className="relative z-10 flex flex-col items-center">
          <Wand2 className="w-10 h-10 text-fuchsia-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Compositor de IA</h2>
          <p className="text-sm text-white/60 mb-6">Descreva o estilo e nossa IA criará sua batida instrumental em segundos.</p>
          <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
            Criar Instrumental
          </button>
        </div>
      </div>
    </div>
  );
}
