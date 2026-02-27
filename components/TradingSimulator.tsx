
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { X, Brain } from 'lucide-react';
import { TradePosition, JournalEntry } from '../types.ts';

const SYMBOLS: any = {
  'XAU/USD': { startPrice: 2740.50, volatility: 0.8, decimals: 2, pipValue: 100 },
  'EUR/USD': { startPrice: 1.0850, volatility: 0.0002, decimals: 5, pipValue: 10 },
  'GBP/USD': { startPrice: 1.2640, volatility: 0.0003, decimals: 5, pipValue: 10 }
};

export const TradingSimulator: React.FC<{ onAddJournal: (e: JournalEntry) => void }> = ({ onAddJournal }) => {
  const [activeSymbol, setActiveSymbol] = useState('XAU/USD');
  const [balance, setBalance] = useState(10000);
  const [positions, setPositions] = useState<TradePosition[]>([]);
  const [price, setPrice] = useState(SYMBOLS['XAU/USD'].startPrice);
  const [history, setHistory] = useState<any[]>([]);
  const [closingTrade, setClosingTrade] = useState<{ pos: TradePosition, pnl: number } | null>(null);
  const [emotion, setEmotion] = useState<any>('Calm');
  const [notes, setNotes] = useState('');

  const config = SYMBOLS[activeSymbol];

  useEffect(() => {
    // Basic random walk simulation for price
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * config.volatility;
      setPrice(prev => {
        const next = prev + change;
        setHistory(h => [...h, { time: Date.now(), price: next }].slice(-100));
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSymbol, config.volatility]);

  const handleClose = (pos: TradePosition) => {
    // Simple PnL calculation
    const pnl = (pos.type === 'BUY' ? (price - pos.entryPrice) : (pos.entryPrice - price)) * pos.lotSize * config.pipValue * (activeSymbol === 'XAU/USD' ? 1 : 10000);
    setClosingTrade({ pos, pnl });
  };

  const finalizeJournal = () => {
    if (!closingTrade) return;
    const entry: JournalEntry = {
      ...closingTrade.pos,
      closePrice: price,
      closeTime: Date.now(),
      pnl: closingTrade.pnl,
      emotion,
      notes
    };
    onAddJournal(entry);
    setBalance(prev => prev + closingTrade.pnl);
    setPositions(prev => prev.filter(p => p.id !== closingTrade.pos.id));
    setClosingTrade(null);
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-trade-card p-6 rounded-[32px] border border-slate-800">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Balance</p>
           <h3 className="text-2xl font-mono font-black text-white">${balance.toFixed(2)}</h3>
        </div>
        <div className="lg:col-span-3 bg-trade-card p-6 rounded-[32px] border border-slate-800 flex items-center justify-between">
           <div className="flex gap-2">
              {Object.keys(SYMBOLS).map(s => (
                <button key={s} onClick={() => setActiveSymbol(s)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${activeSymbol === s ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>{s}</button>
              ))}
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase">{activeSymbol} PRICE</p>
              <h3 className="text-xl font-mono font-black text-indigo-400">{price.toFixed(config.decimals)}</h3>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 bg-trade-card rounded-[40px] border border-slate-800 p-8 h-[450px] shadow-2xl overflow-hidden relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <YAxis domain={['auto', 'auto']} hide />
              <Area type="monotone" dataKey="price" stroke="#4f46e5" fillOpacity={0.1} fill="#4f46e5" />
              {positions.map(p => (
                <ReferenceLine key={p.id} y={p.entryPrice} stroke={p.type === 'BUY' ? '#10b981' : '#f43f5e'} strokeDasharray="3 3" />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-3 space-y-4">
           <button onClick={() => setPositions([{ id: Math.random().toString(), symbol: activeSymbol, type: 'BUY', entryPrice: price, lotSize: 1.0, openTime: Date.now() }, ...positions])} className="w-full py-6 bg-emerald-500 rounded-3xl text-white font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20">Market Buy</button>
           <button onClick={() => setPositions([{ id: Math.random().toString(), symbol: activeSymbol, type: 'SELL', entryPrice: price, lotSize: 1.0, openTime: Date.now() }, ...positions])} className="w-full py-6 bg-rose-500 rounded-3xl text-white font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20">Market Sell</button>
           
           <div className="bg-slate-900 rounded-3xl p-4 border border-slate-800 overflow-y-auto max-h-[220px]">
             <p className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Open Exposure</p>
             {positions.map(p => (
               <div key={p.id} className="flex justify-between items-center mb-3 p-3 bg-slate-800 rounded-2xl border border-slate-700 group">
                  <span className={`text-[10px] font-black ${p.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>{p.type} 1.0L</span>
                  <button onClick={() => handleClose(p)} className="p-1 hover:text-white text-slate-500 transition-colors"><X size={14} /></button>
               </div>
             ))}
           </div>
        </div>
      </div>

      {closingTrade && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative bg-slate-900 border border-slate-700 w-full max-w-lg rounded-[40px] p-8 shadow-3xl animate-scale-up">
             <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2 flex items-center gap-2">
               <Brain size={24} className="text-indigo-400" /> Close Position Analysis
             </h2>
             <p className="text-xs text-slate-500 mb-8">Reflect on your mental state before committing to the journal.</p>
             
             <div className="bg-slate-800/50 p-6 rounded-3xl mb-8 flex justify-between items-center border border-slate-700">
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase">Realized P/L</p>
                   <p className={`text-2xl font-mono font-black ${closingTrade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                     {closingTrade.pnl >= 0 ? '+$' : '-$'}{Math.abs(closingTrade.pnl).toFixed(2)}
                   </p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-500 uppercase">Pair</p>
                   <p className="text-lg font-bold text-white">{closingTrade.pos.symbol}</p>
                </div>
             </div>

             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase block mb-3 ml-1 tracking-widest">Emotional State</label>
                   <div className="grid grid-cols-2 gap-3">
                      {['Calm', 'Greedy', 'Fearful', 'Tilted'].map(e => (
                        <button key={e} onClick={() => setEmotion(e)} className={`py-3 rounded-2xl text-[10px] font-black uppercase border transition-all ${emotion === e ? 'bg-white text-slate-900 border-white' : 'bg-slate-800 text-slate-500 border-slate-700 hover:border-slate-600'}`}>
                          {e}
                        </button>
                      ))}
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase block mb-3 ml-1 tracking-widest">Session Notes</label>
                   <textarea 
                     className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                     placeholder="Why did you exit? Did you follow your plan?"
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                     rows={3}
                   />
                </div>
                <button onClick={finalizeJournal} className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-900/20 transition-all active:scale-95">Save to Performance Journal</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
