
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Bot, Send, BrainCircuit, Info } from 'lucide-react';
import { JournalEntry, UserProgress, Chapter } from '../types.ts';

interface AiMentorProps {
  journal: JournalEntry[];
  progress: UserProgress;
  chapters: Chapter[];
}

export const AiMentor: React.FC<AiMentorProps> = ({ journal, progress, chapters }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue;
    setInputValue("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // API Key must be obtained exclusively from process.env.API_KEY
      const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;
      if (!apiKey) {
        throw new Error("Neural Link Offline: API Key Missing.");
      }

      // Dynamic Import with specific target to ensure browser compatibility
      let GoogleGenAI;
      try {
        const module = await import("https://esm.sh/@google/genai@0.1.2?target=es2022");
        GoogleGenAI = module.GoogleGenAI;
      } catch (importError) {
        console.error("SDK Import Error:", importError);
        throw new Error("Failed to load AI module. Network or compatibility issue.");
      }

      // Initialize with correct named parameter
      const ai = new GoogleGenAI({ apiKey });

      const stats = `Trader status: ${progress.completedChapters.length} modules complete, ${journal.length} trades recorded.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => m.content), userMessage].join('\n'),
        config: {
          systemInstruction: `You are a professional Forex Performance Coach. ${stats} Focus on Module topics like Central Banks and Risk Management. Give concise, actionable advice. Use bolding for key terms.`,
        }
      });

      // Directly access .text property from GenerateContentResponse
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "Data stream interrupted." }]);
    } catch (err: any) {
      console.error("AI Mentor error:", err);
      setMessages(prev => [...prev, { role: 'assistant', content: `Core Error: ${err.message || "Unknown neural fault."}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-slate-950 border border-indigo-500/30 rounded-[40px] p-8 relative overflow-hidden shadow-2xl min-h-[500px] flex flex-col">
      <div className="absolute top-0 right-0 p-8 opacity-5">
         <Sparkles size={160} className="text-indigo-400" />
      </div>
      
      <header className="flex items-center justify-between mb-8 relative z-10 shrink-0">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
              <Bot size={32} />
           </div>
           <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">AI Neural Mentor</h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Institutional Performance Coach</p>
           </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20">
           <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
           <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Active Intelligence</span>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 mb-8 pr-2 custom-scrollbar relative z-10">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
             <BrainCircuit size={48} className="text-slate-600" />
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] max-w-xs">Query the core regarding market structure or psychology</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
             <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed shadow-lg ${
               m.role === 'user' 
                 ? 'bg-indigo-600 text-white rounded-tr-none' 
                 : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
             }`}>
               {m.content}
             </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl rounded-tl-none">
                <Loader2 size={16} className="text-indigo-400 animate-spin" />
             </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="relative z-10 shrink-0">
        <div className="relative group">
           <input 
            type="text" 
            placeholder="Ask the mentor..."
            className="w-full bg-slate-900 border border-slate-800 rounded-3xl py-5 pl-7 pr-20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
          <button 
            type="submit" 
            disabled={isTyping || !inputValue.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};
