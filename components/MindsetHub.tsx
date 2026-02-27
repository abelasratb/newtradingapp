
import React, { useState, useMemo } from 'react';
import { 
  Brain, ShieldCheck, Calculator, Quote, 
  ArrowRight, AlertCircle, CheckCircle2, 
  Target, Zap, Heart,
  Wind, ListChecks, TrendingDown, Eye, Scale, RotateCw,
  DollarSign
} from 'lucide-react';

interface PsychologyScenario {
  id: number;
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
    biasName: string;
  }[];
}

const PSYCH_SCENARIOS: PsychologyScenario[] = [
  {
    id: 1,
    situation: "You've lost 3 trades in a row today. Your strategy says there's a new setup, but you're down 2% of your account already.",
    options: [
      {
        text: "Double the lot size on the next trade to win back today's losses quickly.",
        isCorrect: false,
        biasName: "Revenge Trading",
        feedback: "This is a trap! Increasing lot sizes to 'recover' losses usually leads to even bigger drawdowns."
      },
      {
        text: "Take the trade with standard risk if it fits the plan, or walk away if you feel tilted.",
        isCorrect: true,
        biasName: "Emotional Discipline",
        feedback: "Correct. Trading is a marathon. Your edge works over 100 trades, not 3."
      }
    ]
  },
  {
    id: 2,
    situation: "You missed the entry of a massive breakout on XAU/USD. Price has already moved 50 pips without you. Your friends are posting profits.",
    options: [
      {
        text: "Market Buy immediately. You can't let this move go without making some money.",
        isCorrect: false,
        biasName: "FOMO",
        feedback: "Entering late means your stop loss is too wide and your reward is too small. Don't chase a moving bus."
      },
      {
        text: "Wait for a retest of the breakout level or look for a different setup entirely.",
        isCorrect: true,
        biasName: "Patience",
        feedback: "Professional traders wait for the market to come to them. Chasing leads to 'buying the top'."
      }
    ]
  }
];

const QUOTES = [
  { text: "The goal of a successful trader is to make the best trades. Money is secondary.", author: "Alexander Elder" },
  { text: "In trading, you have to be defensive. If you don't protect what you have, you won't be around long enough to get more.", author: "Paul Tudor Jones" },
  { text: "90% of trading is waiting. The other 10% is execution.", author: "Unknown" },
  { text: "You don't need to know what is going to happen next in order to make money.", author: "Mark Douglas" }
];

const BIASES = [
  { title: "Sunk Cost Fallacy", desc: "Holding a losing trade because you've already spent too much time/money on it." },
  { title: "Recency Bias", desc: "Thinking the next trade will fail because the last one did. Outcomes are independent." },
  { title: "Gambler's Fallacy", desc: "Believing that price is 'due' for a reversal because it's moved too far." },
  { title: "Confirmation Bias", desc: "Seeking only indicators that support your trade while ignoring signs it's failing." }
];

// Explicitly typed as React.FC to handle 'key' and other JSX attributes correctly
const BiasCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div 
      className="perspective-1000 w-full h-48 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
       <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${flipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute w-full h-full backface-hidden bg-slate-900 border border-slate-800 rounded-[28px] p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-indigo-500/30">
             <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Cognitive Bias</span>
             <h4 className="text-sm font-bold text-white">{title}</h4>
             <div className="absolute bottom-4 flex items-center gap-1 text-[9px] text-slate-600 font-black uppercase">
                <RotateCw size={10} /> Flip
             </div>
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-indigo-600 rounded-[28px] p-6 flex flex-col items-center justify-center text-center shadow-2xl">
             <p className="text-xs text-white font-medium leading-relaxed">{desc}</p>
          </div>
       </div>
    </div>
  );
};

export const MindsetHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'scenarios' | 'lab' | 'wisdom'>('checklist');
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [disciplineScore, setDisciplineScore] = useState(0);
  
  const [checklist, setChecklist] = useState({
    slept: false,
    hydrated: false,
    calm: false,
    planReady: false,
    riskDefined: false
  });

  const [balance, setBalance] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [stopLoss, setStopLoss] = useState(20);

  const lotSizeResult = useMemo(() => {
    const riskAmount = balance * (riskPercent / 100);
    const result = riskAmount / (stopLoss * 10);
    return Math.max(0.01, result).toFixed(2);
  }, [balance, riskPercent, stopLoss]);

  const currentScenario = PSYCH_SCENARIOS[scenarioIdx];

  const handleScenarioChoice = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    if (currentScenario.options[idx].isCorrect) {
      setDisciplineScore(s => s + 10);
    }
  };

  const nextScenario = () => {
    setSelectedOpt(null);
    setScenarioIdx((prev) => (prev + 1) % PSYCH_SCENARIOS.length);
  };

  const checklistComplete = Object.values(checklist).every(v => v);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in p-2 md:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Brain size={120} />
        </div>
        <div className="flex items-center gap-5 z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">Trader Readiness</h1>
            <div className="flex items-center gap-2 mt-1">
               <div className="w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-1000" 
                    style={{ width: `${(disciplineScore % 100)}%` }} 
                  />
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mastery Level {Math.floor(disciplineScore/100) + 1}</span>
            </div>
          </div>
        </div>
        <div className="flex bg-slate-800 p-1.5 rounded-2xl border border-slate-700 z-10">
          {[
            { id: 'checklist', label: 'Pre-Flight', icon: ListChecks },
            { id: 'scenarios', label: 'Mind Games', icon: Target },
            { id: 'lab', label: 'Risk Analytics', icon: Scale },
            { id: 'wisdom', label: 'The Way', icon: Quote }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all ${
                activeTab === tab.id ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[550px]">
        {activeTab === 'checklist' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up">
            <div className="bg-trade-card border border-slate-800 rounded-[40px] p-10 shadow-3xl">
              <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                <ListChecks className="text-trade-primary" /> Pre-Session Protocol
              </h2>
              <p className="text-sm text-slate-400 mb-10 leading-relaxed">
                Check your internal state before entering the market.
              </p>
              
              <div className="space-y-4">
                {[
                  { key: 'slept', label: 'I have had 7+ hours of quality sleep' },
                  { key: 'hydrated', label: 'I am hydrated and physically nourished' },
                  { key: 'calm', label: 'I am in a neutral state (Not chasing/revenge)' },
                  { key: 'planReady', label: 'My trading plan is open and referenced' },
                  { key: 'riskDefined', label: 'I know exactly where I am wrong (Stop Loss)' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setChecklist(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof checklist] }))}
                    className={`w-full p-5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      checklist[item.key as keyof typeof checklist] 
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-sm">{item.label}</span>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                      checklist[item.key as keyof typeof checklist] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-700'
                    }`}>
                      {checklist[item.key as keyof typeof checklist] && <CheckCircle2 size={16} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
               <div className={`flex-1 rounded-[40px] p-10 flex flex-col justify-center items-center text-center transition-all duration-700 ${
                 checklistComplete ? 'bg-emerald-500/20 border-2 border-emerald-500/50' : 'bg-slate-900/40 border-2 border-slate-800 border-dashed'
               }`}>
                  {checklistComplete ? (
                    <div className="animate-scale-up">
                      <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-emerald-500/40">
                         <Zap size={48} />
                      </div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">CLEAR FOR TAKEOFF</h3>
                      <button 
                        onClick={() => setActiveTab('scenarios')}
                        className="mt-8 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-all"
                      >
                        Enter Market <ArrowRight size={18} className="inline ml-2" />
                      </button>
                    </div>
                  ) : (
                    <div className="opacity-40">
                      <AlertCircle size={64} className="text-slate-600 mx-auto mb-6" />
                      <h3 className="text-lg font-black text-slate-500 uppercase tracking-widest">Protocol Incomplete</h3>
                    </div>
                  )}
               </div>

               <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-[40px] p-8 flex items-center gap-6 relative overflow-hidden group">
                  <div className="absolute -left-10 w-40 h-40 bg-indigo-500/20 rounded-full animate-breath blur-2xl"></div>
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-500/50 flex items-center justify-center shrink-0 relative">
                     <div className="absolute w-full h-full border-4 border-indigo-400 rounded-full animate-breath opacity-40"></div>
                     <Wind className="text-indigo-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1 italic">Mindful Reset</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed">Follow the circle. Inhale as it grows, exhale as it shrinks.</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className="bg-trade-card border border-slate-800 rounded-[40px] p-10 md:p-14 shadow-3xl animate-slide-up relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 opacity-20" />
            <div className="flex justify-between items-center mb-10">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase rounded-full border border-indigo-500/20 tracking-widest">
                Real Scenario #{currentScenario.id}
              </span>
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-rose-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Discipline: {disciplineScore} XP</span>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mb-12 leading-tight italic font-serif">
              "{currentScenario.situation}"
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {currentScenario.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleScenarioChoice(idx)}
                  className={`p-6 rounded-3xl text-left border-2 transition-all relative overflow-hidden group ${
                    selectedOpt === null 
                      ? 'bg-slate-800/50 border-slate-700 hover:border-indigo-500 hover:bg-slate-800' 
                      : idx === selectedOpt 
                        ? opt.isCorrect ? 'bg-emerald-500/10 border-emerald-500' : 'bg-rose-500/10 border-rose-500'
                        : 'bg-slate-900 border-slate-800 opacity-40'
                  }`}
                >
                  <p className="font-bold text-white mb-1 text-lg">{opt.text}</p>
                  {selectedOpt !== null && idx === selectedOpt && (
                    <div className="mt-4 flex items-start gap-3 p-4 bg-black/30 rounded-2xl animate-fade-in">
                       <div className={`p-2 rounded-lg ${opt.isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                          {opt.isCorrect ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                       </div>
                       <div>
                          <p className="text-xs text-white font-black uppercase tracking-widest mb-1">{opt.biasName}</p>
                          <p className={`text-xs ${opt.isCorrect ? 'text-emerald-400' : 'text-rose-400'} font-medium`}>{opt.feedback}</p>
                       </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {selectedOpt !== null && (
              <button 
                onClick={nextScenario}
                className="mt-12 bg-white text-slate-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 mx-auto shadow-2xl hover:scale-105 active:scale-95"
              >
                Next Mental Challenge <ArrowRight size={20} />
              </button>
            )}
          </div>
        )}

        {activeTab === 'lab' && (
          <div className="space-y-8 animate-slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-trade-card border border-slate-800 rounded-[40px] p-8 shadow-2xl">
                <h3 className="text-lg font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                  <Calculator className="text-indigo-400" /> Professional Calculator
                </h3>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Account Balance ($)</label>
                    <div className="relative">
                       <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                       <input 
                        type="number" 
                        className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={balance}
                        onChange={(e) => setBalance(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Risk (%)</label>
                      <input 
                        type="number" 
                        className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none"
                        value={riskPercent}
                        onChange={(e) => setRiskPercent(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Stop Loss (Pips)</label>
                      <input 
                        type="number" 
                        className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none"
                        value={stopLoss}
                        onChange={(e) => setStopLoss(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/30 rounded-[40px] p-10 flex flex-col justify-center items-center text-center shadow-3xl text-white">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300 mb-6">Safe Execution Volume</p>
                 <h4 className="text-7xl font-black mb-2 tabular-nums tracking-tighter text-white">{lotSizeResult}</h4>
                 <p className="text-xl font-bold text-white mb-10 tracking-tight uppercase">Standard Lots</p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-[40px] p-10">
               <h3 className="text-lg font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                 <TrendingDown className="text-rose-500" /> The Math of Account Recovery
               </h3>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800">
                        <th className="px-4 py-4">Account Loss (%)</th>
                        <th className="px-4 py-4">Recovery Required (%)</th>
                        <th className="px-4 py-4">Difficulty Level</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {[
                        { loss: 10, recovery: 11, diff: 'Normal' },
                        { loss: 30, recovery: 43, diff: 'Hard' },
                        { loss: 50, recovery: 100, diff: 'Insane' },
                        { loss: 90, recovery: 900, diff: 'DOA' }
                      ].map((r, i) => (
                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                           <td className="px-4 py-5 font-mono font-bold text-white text-lg">{r.loss}%</td>
                           <td className="px-4 py-5 font-mono font-bold text-emerald-400 text-lg">{r.recovery}%</td>
                           <td className="px-4 py-5 font-black uppercase text-[10px] tracking-widest text-slate-400">{r.diff}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'wisdom' && (
          <div className="space-y-12 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {QUOTES.map((quote, idx) => (
                <div key={idx} className="bg-trade-card border border-slate-800 rounded-[32px] p-10 hover:border-indigo-500/30 transition-all flex flex-col justify-between group shadow-xl">
                  <div className="mb-8">
                    <Quote size={40} className="text-indigo-500 mb-6 opacity-30 group-hover:opacity-100 transition-opacity" />
                    <p className="text-xl font-medium text-slate-200 leading-relaxed italic">"{quote.text}"</p>
                  </div>
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">— {quote.author}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
               <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">
                 <Eye className="text-trade-primary" /> Psychological Bias Library
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {BIASES.map((bias, i) => (
                    <BiasCard key={i} title={bias.title} desc={bias.desc} />
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
