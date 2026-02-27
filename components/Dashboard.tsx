
import React, { useState, useEffect } from 'react';
import { UserProgress, Chapter } from '../types.ts';
import { BookOpen, Trophy, Activity, Clock, Zap, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

const MarketSessions = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sessions = [
    { name: 'Sydney', start: 1, end: 10, range: '01:00 - 10:00 EAT' },
    { name: 'Tokyo', start: 3, end: 12, range: '03:00 - 12:00 EAT' },
    { name: 'London', start: 11, end: 20, range: '11:00 - 20:00 EAT' },
    { name: 'New York', start: 16, end: 1, range: '16:00 - 01:00 EAT' }
  ];

  const currentEatHour = (now.getUTCHours() + 3) % 24;
  const isGlobalOpen = now.getUTCDay() !== 6 && !(now.getUTCDay() === 0 && now.getUTCHours() < 22) && !(now.getUTCDay() === 5 && now.getUTCHours() >= 22);

  const isSessionOpen = (start: number, end: number) => {
    if (!isGlobalOpen) return false;
    return start > end ? (currentEatHour >= start || currentEatHour < end) : (currentEatHour >= start && currentEatHour < end);
  };

  return (
    <div className="bg-trade-card p-8 rounded-[40px] border border-slate-800 shadow-2xl h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
         <Clock size={120} />
      </div>
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2.5 uppercase tracking-tighter">
            <Clock size={20} className="text-trade-primary" /> Session Hub
          </h3>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1.5 flex items-center gap-2">
            Status: {isGlobalOpen ? <span className="text-emerald-500 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE</span> : <span className="text-rose-500">CLOSED</span>}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-mono font-black text-white tracking-widest tabular-nums">
            {new Date(now.getTime() + (3 * 60 * 60 * 1000)).toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false, hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      <div className="space-y-3 flex-1 relative z-10">
        {sessions.map(session => {
          const isOpen = isSessionOpen(session.start, session.end);
          return (
            <div key={session.name} className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-500 ${isOpen ? 'bg-slate-800/80 border-trade-primary/50 shadow-xl' : 'bg-slate-900/30 border-slate-800/50 opacity-40'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`} />
                <div>
                   <p className="font-black text-xs uppercase text-slate-100 tracking-wider">{session.name}</p>
                   <p className="text-[9px] text-slate-500 font-mono font-bold mt-0.5">{session.range}</p>
                </div>
              </div>
              {isOpen && <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 tracking-widest">TRADING</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface DashboardProps {
  progress: UserProgress;
  chapters: Chapter[];
  onStartChapter: (id: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress, chapters, onStartChapter }) => {
  const nextChapter = chapters.find(ch => !progress.completedChapters.includes(ch.id)) || chapters[chapters.length - 1];

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-trade-card p-7 rounded-[40px] border border-slate-800 shadow-2xl group hover:border-trade-primary/30 transition-all">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Module Conquest</p>
          <div className="flex items-end justify-between">
            <h3 className="text-5xl font-black text-white leading-none tracking-tighter">{progress.completedChapters.length}<span className="text-2xl text-slate-700 mx-1">/</span><span className="text-2xl text-slate-600">{chapters.length}</span></h3>
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-inner group-hover:scale-110 transition-transform"><BookOpen size={28} /></div>
          </div>
        </div>
        <div className="bg-trade-card p-7 rounded-[40px] border border-slate-800 shadow-2xl group hover:border-yellow-500/30 transition-all">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">IQ Percentile</p>
          <div className="flex items-end justify-between">
            <h3 className="text-5xl font-black text-white leading-none tracking-tighter">
              {Object.keys(progress.quizScores).length > 0 
                ? Math.round((Object.values(progress.quizScores) as number[]).reduce((a, b) => a + b, 0) / (Object.values(progress.quizScores).length * 3) * 100) + '%'
                : '0%'}
            </h3>
            <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 border border-yellow-500/20 shadow-inner group-hover:scale-110 transition-transform"><Trophy size={28} /></div>
          </div>
        </div>
        <div className="bg-trade-card p-7 rounded-[40px] border border-slate-800 shadow-2xl group hover:border-emerald-500/30 transition-all">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Status Matrix</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black text-emerald-500 leading-none uppercase tracking-tighter">Elite Active</h3>
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-inner group-hover:scale-110 transition-transform"><Activity size={28} /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-trade-card rounded-[50px] border border-slate-800 p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden">
             <div className="flex justify-between items-center mb-12 relative z-10">
               <div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3"><Zap className="text-trade-primary" size={28} /> Academic Roadmap</h3>
                 <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1.5">Your evolutionary path to profitability</p>
               </div>
             </div>

             <div className="space-y-5 relative z-10">
               {chapters.map((ch, idx) => {
                 const isCompleted = progress.completedChapters.includes(ch.id);
                 const isLocked = !isCompleted && idx > 0 && !progress.completedChapters.includes(chapters[idx-1].id);
                 const isCurrent = nextChapter.id === ch.id;

                 return (
                   <div 
                    key={ch.id} 
                    onClick={() => !isLocked && onStartChapter(ch.id)}
                    className={`group relative p-6 rounded-[32px] border transition-all cursor-pointer flex items-center gap-8 ${
                      isCompleted ? 'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10' : 
                      isCurrent ? 'bg-trade-primary/5 border-trade-primary/50 shadow-[0_20px_40px_rgba(59,130,246,0.1)] hover:bg-trade-primary/10' : 
                      'bg-slate-950/40 border-slate-800 opacity-60 grayscale hover:grayscale-0 transition-all'
                    }`}
                   >
                     <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center shadow-2xl transition-all group-hover:rotate-6 group-hover:scale-110 ${
                       isCompleted ? 'bg-emerald-500 text-white shadow-emerald-900/40' : 
                       isCurrent ? 'bg-trade-primary text-white shadow-blue-900/40' : 'bg-slate-900 text-slate-600'
                     }`}>
                       {isCompleted ? <CheckCircle2 size={28} /> : isLocked ? <Lock size={24} /> : <BookOpen size={28} />}
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className={`text-[11px] font-black uppercase tracking-[0.3em] mb-1 ${isCurrent ? 'text-trade-primary' : 'text-slate-500'}`}>Level Phase {ch.id}</p>
                       <h4 className="font-black text-white text-lg uppercase truncate tracking-tighter">{ch.title}</h4>
                     </div>
                     <div className="shrink-0 flex items-center gap-3">
                       {isLocked ? (
                          <div className="px-3 py-1 bg-slate-800 rounded-lg text-[9px] font-black uppercase text-slate-500 tracking-widest">Locked</div>
                       ) : (
                          <ChevronRight className={`transition-all ${isLocked ? 'opacity-0' : 'opacity-100 group-hover:translate-x-2 text-trade-primary'}`} />
                       )}
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <MarketSessions />
          <div className="bg-gradient-to-br from-indigo-950 to-trade-card border border-indigo-500/30 rounded-[40px] p-10 relative overflow-hidden group shadow-2xl shadow-indigo-900/20 cursor-pointer transition-all hover:scale-[1.02]">
             <div className="relative z-10">
               <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                 <Zap size={24} className="text-white" />
               </div>
               <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-4">Performance Lab</p>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-8">Reflex Edge: Master Price Patterns</h3>
               <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl group-hover:bg-indigo-500 group-hover:text-white transition-all active:scale-95 w-full">Initialize Session</button>
             </div>
             <div className="absolute -right-12 -bottom-12 text-white/5 group-hover:rotate-12 group-hover:scale-125 transition-all duration-1000">
               <Activity size={240} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
