import { useState, FormEvent } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";

export function AIChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Olá! Sou o assistente do Sonorix. Como posso ajudar com suas músicas, estúdio ou ganhos hoje?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("API Key não configurada");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Você é o assistente virtual do aplicativo 'Sonorix', um estúdio de música móvel revolucionário de Angola. Ajude o usuário de forma amigável, concisa e focada. Usuário perguntou: "${userMessage}"`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
      });

      setMessages((prev) => [...prev, { role: "ai", text: response.text || "Desculpe, não entendi." }]);
    } catch (error) {
       console.error(error);
       setMessages((prev) => [...prev, { role: "ai", text: "Estou com problemas para me conectar agora. Tente mais tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 w-12 h-12 rounded-full bg-gradient-to-tr from-sonorix-accent-1 to-sonorix-accent-3 flex items-center justify-center text-white shadow-lg shadow-sonorix-accent-1/40 z-50 hover:scale-110 transition-transform"
      >
        <MessageSquare className="w-5 h-5 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-x-4 bottom-24 top-24 md:inset-auto md:bottom-24 md:right-4 md:w-80 md:h-96 z-50 bg-sonorix-surface/90 backdrop-blur-xl rounded-[24px] flex flex-col overflow-hidden border border-sonorix-border shadow-2xl"
          >
            <div className="bg-sonorix-surface p-3 items-center justify-between border-b border-sonorix-border flex">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sonorix-accent-1/20 to-sonorix-accent-3/20 flex items-center justify-center border border-sonorix-accent-2/30">
                  <Bot className="w-4 h-4 text-sonorix-accent-2" />
                </div>
                <span className="font-bold text-sm text-white">Sonorix AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sonorix-bg/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${m.role === 'user' ? 'bg-gradient-to-tr from-sonorix-accent-1 to-sonorix-accent-3 text-white rounded-br-none border-none' : 'glass-panel text-gray-200 rounded-bl-none shadow-lg'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                   <div className="bg-sonorix-surface border border-sonorix-border rounded-2xl rounded-bl-none p-3 px-4 flex gap-1">
                     <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                     <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-75" />
                     <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-150" />
                   </div>
                 </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-3 bg-sonorix-surface border-t border-sonorix-border flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte algo..."
                className="flex-1 bg-sonorix-bg border border-sonorix-border rounded-xl px-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-sonorix-accent-1/50 placeholder:text-gray-500"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sonorix-accent-1 to-sonorix-accent-3 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-lg shadow-sonorix-accent-1/20"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
