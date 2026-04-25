import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Music, ArrowRight, User } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Crie Instrumentais",
      desc: "Use IA para gerar batidas incríveis em segundos.",
      color: "from-sonorix-accent-1 to-purple-600"
    },
    {
      title: "Grave e Afine",
      desc: "Estúdio completo no seu bolso com correção de tom.",
      color: "from-sonorix-accent-2 to-blue-600"
    },
    {
      title: "Distribua e Lucre",
      desc: "Sucesso global. Ganhe dinheiro com sua arte.",
      color: "from-sonorix-accent-3 to-sonorix-accent-1"
    }
  ];

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      setStep(3); // Go to login
    }
  };

  const skipTutorial = () => setStep(3);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-sonorix-bg flex flex-col items-center justify-center p-6 relative overflow-hidden text-gray-200 font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 blur-[100px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="z-10 w-full max-w-sm">
        <div className="flex justify-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Music className="w-8 h-8 text-white" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step < 3 ? (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <div className={`w-full aspect-square rounded-[32px] mb-8 bg-gradient-to-br ${
                step === 0 ? "from-violet-500/80 to-fuchsia-500/80" : 
                step === 1 ? "from-fuchsia-500/80 to-orange-500/80" : 
                "from-orange-500/80 to-violet-500/80"
              } shadow-[0_0_40px_rgba(139,92,246,0.3)] flex items-center justify-center relative overflow-hidden border border-white/10`}>
                 <div className="absolute inset-0 bg-black/20" />
                 {/* Visual placeholder for tutorial animation */}
                 <Music className="w-24 h-24 text-white opacity-90 animate-bounce drop-shadow-2xl" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-3">{tutorialSteps[step].title}</h2>
              <p className="text-white/60 leading-relaxed mb-10">{tutorialSteps[step].desc}</p>
              
              <div className="flex items-center justify-between">
                <button onClick={skipTutorial} className="text-sm font-bold uppercase tracking-wider text-white/40 hover:text-white transition-colors">
                  Pular
                </button>
                <div className="flex gap-2">
                  {tutorialSteps.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === step ? "bg-white" : "bg-white/20"}`} />
                  ))}
                </div>
                <button onClick={handleNext} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/20">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8 rounded-[32px] text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-600/20 blur-[40px] rounded-full"></div>
              
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2 relative z-10">Bem-vindo(a)</h2>
              <p className="text-sm text-white/60 mb-8 relative z-10">Faça login para começar a criar</p>
              
              <form onSubmit={handleLogin} className="flex flex-col gap-4 relative z-10">
                <button type="submit" className="w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 transition-colors shadow-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  Continuar com Google
                </button>
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink-0 mx-4 text-[10px] text-white/40 uppercase font-bold tracking-wider">Ou</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>
                <div className="flex gap-3">
                   <button type="button" className="flex-1 py-3 px-4 rounded-xl flex items-center justify-center glass-panel hover:border-sonorix-accent-1/50 hover:bg-white/10 transition-colors group">
                     <svg className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                   </button>
                   <button type="button" className="flex-1 py-3 px-4 rounded-xl flex items-center justify-center glass-panel hover:border-sonorix-accent-2/50 hover:bg-white/10 transition-colors group">
                     <User className="w-5 h-5 text-white/80 group-hover:scale-110 transition-transform" />
                   </button>
                </div>
                
                <p className="text-[10px] text-white/40 mt-6 px-4 leading-relaxed font-medium">
                  Ao continuar, você concorda com nossos <br/> <a href="#" className="text-white/60 hover:text-white underline decoration-white/20">Termos de Serviço</a> e <a href="#" className="text-white/60 hover:text-white underline decoration-white/20">Política de Privacidade</a>.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
