
import React from 'react';
import { Chapter, UserProgress, User } from '../types.ts';
import { 
  CheckCircle2, Circle, TrendingUp, Activity, 
  BrainCircuit, Newspaper, Calendar,
  HeartPulse, ScrollText, ShieldCheck,
  BookOpen, Gamepad2, Users
} from 'lucide-react';

interface NavigationProps {
  chapters: Chapter[];
  currentChapterId: number | null;
  currentView: any;
  onNavigate: (view: any, chapterId?: number) => void;
  progress: UserProgress;
  currentUser: User | null;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  chapters, currentChapterId, currentView, onNavigate, progress, currentUser, isOpen, onCloseMobile
}) => {
  const NavBtn = ({ view, icon: Icon, label, color = "indigo" }: any) => (
    <button
      onClick={() => onNavigate(view)}
      className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3.5 transition-all ${
        currentView === view 
          ? `bg-${color}-600/20 text-${color}-400 border border-${color}-500/30 shadow-lg shadow-${color}-900/10` 
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
      }`}
    >
      <Icon size={20} className="shrink-0" />
      <span className="text-[13px] font-black uppercase tracking-[0.05em]">{label}</span>
    </button>
  );

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-trade-card border-r border-slate-800 lg:static transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="h-full flex flex-col p-6">
        <div className="flex items-center gap-3 mb-12 cursor-pointer group" onClick={() => onNavigate('dashboard')}>
          <div className="w-10 h-10 bg-trade-primary rounded-xl flex items-center justify-center shadow-xl shadow-blue-900/40 group-hover:rotate-6 transition-transform">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div>
            <h1 className="font-black text-white text-lg tracking-tighter leading-none uppercase">PRECISE FX</h1>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Academy</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-1.5 mb-10">
            <NavBtn view="dashboard" icon={TrendingUp} label="Dashboard" />
            <NavBtn view="simulator" icon={Activity} label="Simulator" />
            <NavBtn view="game" icon={Gamepad2} label="Price Game" color="emerald" />
            <NavBtn view="forum" icon={Users} label="Community" color="blue" />
            <NavBtn view="journal" icon={ScrollText} label="Journal" />
            <NavBtn view="trainer" icon={BrainCircuit} label="Pattern Lab" />
            <NavBtn view="fundamental" icon={Newspaper} label="News IQ" />
            <NavBtn view="calendar" icon={Calendar} label="Calendar" />
            <NavBtn view="mindset" icon={HeartPulse} label="Mindset" />
            
            {currentUser?.role === 'admin' && (
              <div className="pt-2">
                <NavBtn view="admin" icon={ShieldCheck} label="Admin Panel" color="rose" />
              </div>
            )}
          </div>
          
          <div className="pt-2 pb-3 px-4 flex items-center justify-between border-t border-slate-800/50 mt-4 mb-2">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
               <BookOpen size={14} className="text-indigo-500" /> Curriculum
             </p>
          </div>
          
          <div className="space-y-1.5">
            {chapters.map(ch => {
              const isActive = currentView === 'chapter' && currentChapterId === ch.id;
              const isCompleted = progress.completedChapters.includes(ch.id);

              return (
                <button 
                  key={ch.id} 
                  onClick={() => onNavigate('chapter', ch.id)} 
                  className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3.5 transition-all group/item ${
                    isActive 
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-900/10' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <div className="shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    ) : (
                      <Circle size={18} className={isActive ? 'text-indigo-400' : 'text-slate-700 group-hover/item:text-slate-500'} />
                    )}
                  </div>
                  <span className="text-[13px] font-black uppercase tracking-[0.05em] truncate">
                    {ch.title.split(':').pop()?.trim() || ch.title}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {currentUser && (
          <div className="mt-auto pt-6 border-t border-slate-800/80">
            <button 
              onClick={() => onNavigate('profile')}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-2xl border transition-all group ${
                currentView === 'profile' 
                  ? 'bg-indigo-600/20 border-indigo-500/30' 
                  : 'bg-slate-900/50 border-slate-800/50 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-sm group-hover:scale-105 transition-transform">
                {currentUser.name?.[0].toUpperCase() || 'T'}
              </div>
              <div className="min-w-0 text-left">
                <p className={`text-xs font-black truncate uppercase tracking-wide transition-colors ${currentView === 'profile' ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  {currentUser.name || 'Trader'}
                </p>
                <p className="text-[9px] font-black text-slate-500 truncate uppercase tracking-[0.1em] mt-0.5 group-hover:text-indigo-400 transition-colors">
                  View Profile
                </p>
              </div>
            </button>
          </div>
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
      `}</style>
    </aside>
  );
};
