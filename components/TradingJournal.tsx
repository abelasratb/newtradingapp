
import React, { useState, useMemo } from 'react';
import { 
  BookOpen, BarChart3, TrendingUp, TrendingDown, 
  Clock, Brain, MessageSquareText, Search, 
  Filter, Download, AlertCircle, ChevronRight
} from 'lucide-react';
import { JournalEntry } from '../types.ts';

interface TradingJournalProps {
  entries: JournalEntry[];
}

export const TradingJournal: React.FC<TradingJournalProps> = ({ entries }) => {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const stats = useMemo(() => {
    const total = entries.length;
    const wins = entries.filter(e => e.pnl > 0).length;
    const loss = entries.filter(e => e.pnl < 0).length;
    const totalPnl = entries.reduce((acc, e) => acc + e.pnl, 0);
    const winRate = total > 0 ? (wins / total) * 100 : 0;
    
    return { total, wins, loss, totalPnl, winRate };
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter(e => {
      const matchesSymbol = filter === 'All' || e.symbol === filter;
      const matchesSearch = e.notes.toLowerCase().includes(search.toLowerCase()) || 
                           e.symbol.toLowerCase().includes(search.toLowerCase());
      return matchesSymbol && matchesSearch;
    }).sort((a, b) => b.closeTime - a.closeTime);
  }, [entries, filter, search]);

  const EmotionBadge = ({ emotion }: { emotion: string }) => {
    const colors = {
      Calm: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      Greedy: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      Fearful: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      Tilted: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${colors[emotion as keyof typeof colors] || 'bg-slate-800 text-slate-400'}`}>
        {emotion}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in p-2 md:p-4">
      {/* Journal Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-trade-card border border-slate-800 p-6 rounded-[32px] shadow-xl">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Net Performance</p>
           <h3 className={`text-2xl font-mono font-black ${stats.totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
             {stats.totalPnl >= 0 ? '+$' : '-$'}{Math.abs(stats.totalPnl).toFixed(2)}
           </h3>
        </div>
        <div className="bg-trade-card border border-slate-800 p-6 rounded-[32px] shadow-xl">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Win Rate</p>
           <h3 className="text-2xl font-mono font-black text-white">{stats.winRate.toFixed(1)}%</h3>
        </div>
        <div className="bg-trade-card border border-slate-800 p-6 rounded-[32px] shadow-xl">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Trades</p>
           <h3 className="text-2xl font-mono font-black text-white">{stats.total}</h3>
        </div>
        <div className="bg-trade-card border border-slate-800 p-6 rounded-[32px] shadow-xl">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Mental State</p>
           <div className="flex items-center gap-1.5 mt-1">
              <Brain size={16} className="text-indigo-400" />
              <span className="text-xs font-bold text-slate-300">Evaluating...</span>
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text"
            placeholder="Search by notes or pair..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 shrink-0">
          {['All', 'XAU/USD', 'EUR/USD', 'GBP/USD'].map(s => (
            <button 
              key={s} 
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${filter === s ? 'bg-white text-slate-900' : 'text-slate-500 hover:text-white'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Journal Table */}
      <div className="bg-trade-card border border-slate-800 rounded-[40px] shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">
                <th className="px-8 py-5">Date / Time</th>
                <th className="px-8 py-5">Pair</th>
                <th className="px-8 py-5">Type</th>
                <th className="px-8 py-5">Entry/Exit</th>
                <th className="px-8 py-5 text-center">Outcome (PnL)</th>
                <th className="px-8 py-5">Psychology</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="group hover:bg-slate-800/20 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-slate-600" />
                      <div>
                        <p className="text-xs font-bold text-white">{new Date(entry.closeTime).toLocaleDateString()}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{new Date(entry.closeTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-black text-indigo-400">{entry.symbol}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${entry.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-[11px] font-mono text-slate-400">
                      <p>In: {entry.entryPrice.toFixed(4)}</p>
                      <p>Out: {entry.closePrice.toFixed(4)}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`text-sm font-black font-mono ${entry.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {entry.pnl >= 0 ? '+' : ''}${Math.abs(entry.pnl).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <EmotionBadge emotion={entry.emotion} />
                      <p className="text-[10px] text-slate-500 italic max-w-[150px] truncate">{entry.notes}</p>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEntries.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="opacity-20 flex flex-col items-center gap-4">
                      <BookOpen size={48} />
                      <p className="text-xs font-black uppercase tracking-widest">Journal Empty — Execute Trades in Simulator</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
