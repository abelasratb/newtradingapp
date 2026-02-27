
import React, { useState } from 'react';
import { Chapter, VisualType } from '../types.ts';
import { 
  BookOpen, CheckCircle2, Clock, Globe, Landmark, TrendingUp, Zap, 
  ShieldCheck, TrendingDown, ArrowDownRight, ArrowUpRight, MousePointer2, 
  Layers, Info, ArrowRight, ShieldAlert, Target, Scale, MousePointerClick,
  Timer, Flame, DollarSign, MoveHorizontal, BarChart3, Activity, ListChecks,
  ChevronRight, BrainCircuit, FileText, Settings, Shield, Crosshair,
  User, Briefcase, Bitcoin, Coins, X, Lock, Gem as Diamond, AlertTriangle,
  RefreshCw, Smile, Frown, Meh, LineChart, PieChart, ClipboardCheck, BarChart,
  Play, Pause, RotateCcw, Box, Fish, UserCheck, Factory, AlertOctagon,
  Monitor, Server, ArrowDown, Eye, Filter, Calculator, PieChart as PieIcon,
  Anchor, Scale as ScaleIcon, Users, Building2, Cpu, Repeat, GitCommit,
  Compass, Gauge, Waves, AlertCircle, FileCheck, Power, History, Coins as CoinsIcon,
  Calendar, Gamepad, LogOut, Copy, Shuffle, BarChart4, Minus, XCircle
} from 'lucide-react';

interface ChapterContentProps {
  chapter: Chapter;
  langMode: 'english' | 'amharic';
  onAction: (tab: 'quiz' | 'flashcards') => void;
  isCompleted?: boolean;
}

const formatContent = (text: string, isAmharic: boolean) => {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, i) => {
    let content = line.trim();
    if (!content) return <div key={i} className="h-4" />;
    const isBullet = content.startsWith('- ') || content.startsWith('* ');
    let renderedLine = content;
    if (isBullet) renderedLine = content.substring(2);
    const parts = renderedLine.split(/(\*\*.*?\*\*)/g);
    const formattedLine = parts.map((part, pi) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={pi} className="font-black text-white bg-trade-primary/10 px-1.5 py-0.5 rounded border border-trade-primary/20 mx-0.5">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
    if (isBullet) {
      return (
        <div key={i} className="flex gap-3 mb-2 ml-4">
          <div className="w-1.5 h-1.5 rounded-full bg-trade-primary mt-2.5 shrink-0" />
          <span className="flex-1">{formattedLine}</span>
        </div>
      );
    }
    return <p key={i} className="mb-4">{formattedLine}</p>;
  });
};

// --- Interactive Calculators ---

const RiskCalculator: React.FC = () => {
  const [balance, setBalance] = useState(1000);
  const [riskPercent, setRiskPercent] = useState(1);
  const riskAmount = balance * (riskPercent / 100);

  return (
    <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-6">Risk Defined</h4>
      <div className="space-y-6">
        <div>
          <label className="text-xs text-slate-400 font-bold mb-2 block">Account Balance ($)</label>
          <input 
            type="range" min="100" max="10000" step="100" value={balance} 
            onChange={(e) => setBalance(Number(e.target.value))}
            className="w-full accent-trade-primary" 
          />
          <div className="text-right text-sm font-black text-white mt-1">${balance}</div>
        </div>
        <div>
          <label className="text-xs text-slate-400 font-bold mb-2 block">Risk Percentage (%)</label>
          <input 
            type="range" min="0.5" max="10" step="0.5" value={riskPercent} 
            onChange={(e) => setRiskPercent(Number(e.target.value))}
            className="w-full accent-rose-500" 
          />
          <div className="text-right text-sm font-black text-white mt-1">{riskPercent}%</div>
        </div>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Max Loss Allowed</p>
          <p className="text-3xl font-black text-rose-500">${riskAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

const PositionSizeCalculator: React.FC = () => {
  const [riskAmt, setRiskAmt] = useState(10);
  const [stopLoss, setStopLoss] = useState(10);
  const lotSize = riskAmt / (stopLoss * 10);

  return (
    <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-6">Position Sizer</h4>
      <div className="space-y-6">
        <div>
          <label className="text-xs text-slate-400 font-bold mb-2 block">Risk Amount ($)</label>
          <input 
            type="number" value={riskAmt} 
            onChange={(e) => setRiskAmt(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm focus:outline-none focus:border-trade-primary"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 font-bold mb-2 block">Stop Loss Distance (Pips)</label>
          <input 
            type="number" value={stopLoss} 
            onChange={(e) => setStopLoss(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-bold text-sm focus:outline-none focus:border-trade-primary"
          />
        </div>
        <div className="bg-indigo-900/20 p-6 rounded-2xl border border-indigo-500/30 text-center">
          <p className="text-[10px] text-indigo-300 uppercase font-black mb-1">Required Lot Size</p>
          <p className="text-3xl font-black text-white">{lotSize < 0.01 ? 'Too Small' : lotSize.toFixed(2)} Lots</p>
          <p className="text-[8px] text-slate-500 mt-2">Assuming 1 Std Lot = $10/pip</p>
        </div>
      </div>
    </div>
  );
};

// --- Step Visualizer ---

const StepVisualizer: React.FC<{ type: VisualType; lang: string }> = ({ type, lang }) => {
  const [step, setStep] = useState(0);
  const isAmh = lang === 'amharic';

  const CANDLE_STEPS = [
    { title: isAmh ? "መክፈቻ (Open)" : "The Open", text: isAmh ? "ገበያው በዚህ ዋጋ ይከፈታል። ሻማው ማደግ ይጀምራል።" : "Price starts here. The session begins.", draw: "OPEN" },
    { title: isAmh ? "ዝቅተኛ (Low)" : "The Low", text: isAmh ? "ሻጮች ዋጋውን ወደ ታች ይገፋሉ።" : "Sellers push price down temporarily.", draw: "LOW" },
    { title: isAmh ? "ከፍተኛ (High)" : "The High", text: isAmh ? "ገዢዎች ተቆጣጥረው ዋጋውን ወደ ላይ ይገፋሉ።" : "Buyers take control and push price up.", draw: "HIGH" },
    { title: isAmh ? "መዝጊያ (Close)" : "The Close", text: isAmh ? "ጊዜው ሲያልቅ በዚህ ዋጋ ይዘጋል።" : "Session ends. The body color is decided.", draw: "CLOSE" }
  ];
  
  const STRUCTURE_STEPS = [
    { title: isAmh ? "ግፊት (Impulse)" : "Impulse Move", text: isAmh ? "ገዢዎች በኃይል ይገባሉ። አዲስ High ይፈጠራል።" : "Buyers push price up aggressively.", draw: "IMPULSE" },
    { title: isAmh ? "እርማት (Correction)" : "Correction", text: isAmh ? "ትርፍ የሚወስዱ ሰዎች ሲወጡ ዋጋው ትንሽ ይመለሳል።" : "Profit taking causes a pullback (HL).", draw: "CORRECTION" },
    { title: isAmh ? "መዋቅር ስብራት (BOS)" : "Break of Structure", text: isAmh ? "ዋጋው የቀድሞውን High ሲሰብር አዝማሚያው ይቀጥላል።" : "Price breaks previous high. Trend confirmed.", draw: "BOS" }
  ];

  const ENTRY_STEPS = [
    { title: isAmh ? "ዞን መለየት" : "Identify Zone", text: isAmh ? "ቁልፍ የድጋፍ ቦታ ይለዩ።" : "Locate Key Support Level on HTF.", draw: "ZONE" },
    { title: isAmh ? "ምላሽ መጠበቅ" : "Wait for Reaction", text: isAmh ? "ዋጋው ዞኑን ሲነካ ዊክ (Wick) መስራቱን ያረጋግጡ።" : "Price touches zone and rejects (Wick).", draw: "REACTION" },
    { title: isAmh ? "መግባት እና ማረጋገጥ" : "Execute & Protect", text: isAmh ? "ቀጣዩ ሻማ ሲከፈት ይግዙ። ስቶፕ ሎስ ከታች ያድርጉ።" : "Enter on next candle open. SL below wick.", draw: "EXECUTE" }
  ];

  let activeSteps: any[] = [];
  let svgContent = null;

  if (type === 'CANDLE_FORMATION_STEPS') {
    activeSteps = CANDLE_STEPS;
    svgContent = (
      <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
        <line x1="100" y1="100" x2="100" y2="100" stroke="#334155" strokeWidth="2" />
        {step >= 0 && <line x1="90" y1="100" x2="110" y2="100" stroke="#fff" strokeWidth="2" />}
        {step >= 1 && <line x1="100" y1="100" x2="100" y2="140" stroke="#f43f5e" strokeWidth="2" className="animate-slide-down" />}
        {step >= 2 && <line x1="100" y1="140" x2="100" y2="40" stroke="#10b981" strokeWidth="2" className="animate-slide-up" />}
        {step >= 3 && <rect x="92" y="60" width="16" height="40" fill="#10b981" rx="2" className="animate-scale-up" />}
      </svg>
    );
  } else if (type === 'MARKET_CYCLE_STEPS') {
    activeSteps = STRUCTURE_STEPS;
    svgContent = (
      <svg width="240" height="150" viewBox="0 0 240 150" className="mx-auto">
        {step >= 0 && <path d="M20,130 L100,50" stroke="#10b981" strokeWidth="3" fill="none" className="animate-draw" />}
        {step >= 1 && <path d="M100,50 L140,90" stroke="#64748b" strokeWidth="3" fill="none" className="animate-draw" />}
        {step >= 2 && (
          <>
            <path d="M140,90 L220,10" stroke="#10b981" strokeWidth="3" fill="none" className="animate-draw" />
            <line x1="100" y1="50" x2="220" y2="50" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,4" />
            <text x="160" y="40" fill="#3b82f6" fontSize="10" fontWeight="bold">BOS</text>
          </>
        )}
      </svg>
    );
  } else if (type === 'ENTRY_FLOW_STEPS') {
    activeSteps = ENTRY_STEPS;
    svgContent = (
      <svg width="240" height="150" viewBox="0 0 240 150" className="mx-auto">
        {step >= 0 && <rect x="20" y="100" width="200" height="30" fill="#3b82f6" fillOpacity="0.2" className="animate-fade-in" />}
        {step >= 0 && (
          <>
             <rect x="40" y="60" width="10" height="40" fill="#f43f5e" />
             <line x1="45" y1="50" x2="45" y2="100" stroke="#f43f5e" />
             <rect x="60" y="80" width="10" height="30" fill="#f43f5e" />
             <line x1="65" y1="70" x2="65" y2="110" stroke="#f43f5e" />
          </>
        )}
        {step >= 1 && (
          <g className="animate-scale-up">
             <line x1="95" y1="120" x2="95" y2="90" stroke="#10b981" strokeWidth="1" />
             <rect x="90" y="90" width="10" height="15" fill="#10b981" />
          </g>
        )}
        {step >= 2 && (
          <g className="animate-fade-in">
             <text x="90" y="80" fill="#fff" fontSize="8" fontWeight="bold">BUY</text>
             <line x1="85" y1="125" x2="105" y2="125" stroke="#f43f5e" strokeWidth="2" />
             <text x="110" y="128" fill="#f43f5e" fontSize="8" fontWeight="bold">SL</text>
             <path d="M120,90 L160,50" stroke="#10b981" strokeWidth="2" strokeDasharray="4,4" />
          </g>
        )}
      </svg>
    );
  } else {
    return <div className="p-4 text-center text-slate-500">Visualization not interactive</div>;
  }

  const currentInfo = activeSteps[Math.min(step, activeSteps.length - 1)];

  return (
    <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col gap-6">
      <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 min-h-[200px] flex items-center justify-center relative overflow-hidden">
         {svgContent}
      </div>
      
      <div className="space-y-4">
         <div className="flex justify-between items-center px-2">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Step {Math.min(step + 1, activeSteps.length)} of {activeSteps.length}</span>
            <div className="flex gap-1">
               {activeSteps.map((_, i) => (
                 <div key={i} className={`w-2 h-2 rounded-full transition-all ${i <= step ? 'bg-trade-primary' : 'bg-slate-800'}`} />
               ))}
            </div>
         </div>
         
         <div className="min-h-[80px]">
            <h4 className="text-lg font-black text-white mb-2">{currentInfo?.title}</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{currentInfo?.text}</p>
         </div>

         <div className="flex gap-4 pt-2">
            <button 
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all font-black text-[10px] uppercase tracking-widest border border-slate-700"
            >
              Previous
            </button>
            <button 
              onClick={() => {
                 if (step < activeSteps.length - 1) {
                   setStep(step + 1);
                 } else {
                   setStep(0); 
                 }
              }}
              className="flex-1 py-3 rounded-xl bg-trade-primary text-white hover:bg-blue-600 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/20"
            >
              {step < activeSteps.length - 1 ? 'Next Step' : 'Replay'}
            </button>
         </div>
      </div>
    </div>
  );
};

// --- Main Visual Renderer ---

const VisualAidRenderer: React.FC<{ type: VisualType; lang: string }> = ({ type, lang }) => {
  if (type === 'NONE' || !type) return null;

  // Intercept interactive types
  if (['M5_RISK_CALCULATOR', 'M5_POSITION_SIZE', 'CANDLE_FORMATION_STEPS', 'MARKET_CYCLE_STEPS', 'ENTRY_FLOW_STEPS'].includes(type)) {
     if (type === 'M5_RISK_CALCULATOR') return <RiskCalculator />;
     if (type === 'M5_POSITION_SIZE') return <PositionSizeCalculator />;
     return <StepVisualizer type={type} lang={lang} />;
  }

  // Helper for Card Grids
  const CardGrid = ({ items }: { items: { title: string; icon: any; color: string }[] }) => (
    <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-wrap gap-4 justify-center">
      {items.map((item, i) => (
        <div key={i} className="flex-1 min-w-[140px] flex flex-col items-center text-center p-4 rounded-3xl bg-slate-950 border border-slate-800">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${item.color.replace('text-', 'bg-')}/10 ${item.color}`}>
             <item.icon size={24} />
          </div>
          <h4 className="font-black text-white uppercase text-[10px] tracking-widest">{item.title}</h4>
        </div>
      ))}
    </div>
  );

  switch (type) {
    // --- MODULE 9 ---
    case 'M9_MANAGEMENT_TIMELINE':
    case 'TRADE_MANAGEMENT':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-6">Zone of Influence</h4>
           <div className="flex items-center w-full max-w-lg">
              <div className="flex flex-col items-center">
                 <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white"><Zap size={18} /></div>
                 <p className="text-[9px] font-black text-emerald-500 uppercase mt-2">Entry</p>
                 <p className="text-[8px] text-slate-500 uppercase">You Control</p>
              </div>
              <div className="flex-1 h-1 bg-slate-700 mx-2 relative">
                 <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <span className="bg-slate-950 px-2 text-[8px] font-black text-slate-600 uppercase tracking-widest">No Touch Zone</span>
                 </div>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-400"><LogOut size={18} /></div>
                 <p className="text-[9px] font-black text-slate-500 uppercase mt-2">Exit</p>
                 <p className="text-[8px] text-slate-500 uppercase">Market Controls</p>
              </div>
           </div>
        </div>
      );
    case 'M9_ALLOWED_VS_FORBIDDEN':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl grid grid-cols-2 gap-4">
           <div className="bg-emerald-900/10 border border-emerald-500/20 p-6 rounded-3xl">
              <h4 className="text-emerald-500 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2"><CheckCircle2 size={16} /> Allowed</h4>
              <ul className="text-[10px] text-slate-400 space-y-2 font-bold uppercase">
                 <li className="text-emerald-200">Doing Nothing</li>
                 <li>Taking Partial Profit (Planned)</li>
                 <li>Trailing Stop (Planned)</li>
              </ul>
           </div>
           <div className="bg-rose-900/10 border border-rose-500/20 p-6 rounded-3xl">
              <h4 className="text-rose-500 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2"><X size={16} /> Forbidden</h4>
              <ul className="text-[10px] text-slate-400 space-y-2 font-bold uppercase">
                 <li className="text-rose-200">Moving SL Away</li>
                 <li>Adding to Losers</li>
                 <li>Panic Closing</li>
              </ul>
           </div>
        </div>
      );
    case 'M9_HANDS_OFF_MODE':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center justify-center min-h-[150px]">
           <div className="relative">
              <MousePointer2 size={48} className="text-slate-700" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                 <X size={14} className="text-white" />
              </div>
           </div>
           <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Hands Off Mode Active</p>
        </div>
      );
    case 'M9_TRAILING_STOP_VISUAL':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
           <svg viewBox="0 0 200 100" className="w-full h-full">
              <path d="M10,90 L30,70 L50,80 L80,40 L100,50 L140,10" stroke="#10b981" strokeWidth="2" fill="none" />
              <circle cx="50" cy="80" r="3" fill="#fff" />
              <text x="50" y="95" fill="#64748b" fontSize="8" textAnchor="middle">HL 1</text>
              <circle cx="100" cy="50" r="3" fill="#fff" />
              <text x="100" y="65" fill="#64748b" fontSize="8" textAnchor="middle">HL 2</text>
              
              <line x1="50" y1="85" x2="90" y2="85" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" />
              <text x="60" y="82" fill="#f43f5e" fontSize="8">SL 1</text>
              <line x1="100" y1="55" x2="140" y2="55" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" />
              <text x="110" y="52" fill="#f43f5e" fontSize="8">SL 2 (Trail)</text>
           </svg>
        </div>
      );
    case 'M9_SESSION_LIMITS':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl space-y-4">
           <div>
              <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 mb-1">
                 <span>Daily Loss Limit</span>
                 <span className="text-rose-500">1.5% / 2.0%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                 <div className="bg-rose-500 h-full w-[75%]"></div>
              </div>
           </div>
           <div>
              <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 mb-1">
                 <span>Trade Count</span>
                 <span className="text-blue-500">2 / 3</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                 <div className="bg-blue-500 h-full w-[66%]"></div>
              </div>
           </div>
        </div>
      );
    case 'M9_KILL_SWITCH_SIM':
      return (
        <div className="bg-rose-900/20 rounded-[40px] p-8 border border-rose-500/30 shadow-2xl flex flex-col items-center text-center">
           <Lock size={48} className="text-rose-500 mb-4" />
           <h4 className="text-lg font-black text-white uppercase tracking-tight">System Locked</h4>
           <p className="text-[10px] text-rose-300 font-bold uppercase tracking-widest mt-2">Max Daily Loss Reached</p>
           <div className="mt-6 px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">
              <span className="font-mono text-slate-400 text-xs">Cooldown: 14:23:01</span>
           </div>
        </div>
      );
    case 'M9_REVIEW_SCORECARD':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
           <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Followed Plan?</span>
                 <CheckCircle2 size={16} className="text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Wait for Setup?</span>
                 <CheckCircle2 size={16} className="text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Result</span>
                 <span className="text-[10px] font-black text-rose-500 uppercase">Loss (-1R)</span>
              </div>
              <div className="mt-2 text-center">
                 <span className="text-[9px] font-black text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Good Loss</span>
              </div>
           </div>
        </div>
      );
    case 'M9_IDENTITY_SEPARATION':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex items-center justify-center gap-8">
           <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30"><User size={32} /></div>
              <p className="text-[9px] font-black text-indigo-400 uppercase mt-2">Self Worth</p>
           </div>
           <div className="h-16 w-0.5 bg-slate-700 border-l border-dashed border-slate-500"></div>
           <div className="flex flex-col items-center opacity-50">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700"><BarChart3 size={32} /></div>
              <p className="text-[9px] font-black text-slate-500 uppercase mt-2">P & L</p>
           </div>
        </div>
      );

    // --- MODULE 10 ---
    case 'M10_EMOTION_CYCLE':
    case 'EMOTION_CYCLE':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                 <path d="M50,10 A40,40 0 0,1 90,50" stroke="#f43f5e" strokeWidth="4" fill="none" markerEnd="url(#arrow)" />
                 <path d="M90,50 A40,40 0 0,1 50,90" stroke="#3b82f6" strokeWidth="4" fill="none" markerEnd="url(#arrow)" />
                 <path d="M50,90 A40,40 0 0,1 10,50" stroke="#10b981" strokeWidth="4" fill="none" markerEnd="url(#arrow)" />
                 <path d="M10,50 A40,40 0 0,1 50,10" stroke="#fbbf24" strokeWidth="4" fill="none" markerEnd="url(#arrow)" />
              </svg>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-black bg-slate-900 px-2 uppercase text-yellow-500">Hope</div>
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 text-[8px] font-black bg-slate-900 px-2 uppercase text-rose-500">Fear</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[8px] font-black bg-slate-900 px-2 uppercase text-blue-500">Regret</div>
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 text-[8px] font-black bg-slate-900 px-2 uppercase text-emerald-500">Greed</div>
           </div>
        </div>
      );
    case 'M10_REVENGE_TRADING':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex items-center justify-center gap-4">
           <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-2"><Minus size={24} /></div>
              <p className="text-[8px] font-black uppercase text-slate-500">Loss</p>
           </div>
           <ArrowRight size={16} className="text-slate-600" />
           <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center mx-auto mb-2"><Flame size={24} /></div>
              <p className="text-[8px] font-black uppercase text-slate-500">Urgency</p>
           </div>
           <ArrowRight size={16} className="text-slate-600" />
           <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto mb-2 shadow-lg shadow-rose-900/50"><TrendingDown size={32} /></div>
              <p className="text-[8px] font-black uppercase text-rose-500">Big Loss</p>
           </div>
        </div>
      );
    case 'M10_OVERTRADING_VISUAL':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl grid grid-cols-2 gap-4">
           <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center opacity-50">
              <h4 className="text-3xl font-black text-slate-600 mb-2">20</h4>
              <p className="text-[8px] font-black uppercase text-slate-500">Trades / Day</p>
              <p className="text-[8px] font-black uppercase text-rose-500 mt-2">-5% Return</p>
           </div>
           <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 bg-emerald-500 rounded-bl-lg"><CheckCircle2 size={12} className="text-white" /></div>
              <h4 className="text-3xl font-black text-white mb-2">2</h4>
              <p className="text-[8px] font-black uppercase text-slate-500">Trades / Day</p>
              <p className="text-[8px] font-black uppercase text-emerald-500 mt-2">+3% Return</p>
           </div>
        </div>
      );
    case 'M10_RULE_BREAKING':
      return (
        <div className="bg-rose-900/20 rounded-[40px] p-8 border border-rose-500/30 shadow-2xl flex flex-col items-center">
           <AlertTriangle size={48} className="text-rose-500 mb-4" />
           <h4 className="text-lg font-black text-white uppercase tracking-tight">System Failure</h4>
           <div className="w-full bg-slate-900/50 p-3 rounded-xl mt-4 border border-rose-500/20">
              <div className="flex justify-between items-center text-[10px] font-bold text-rose-300 mb-2">
                 <span>Stop Loss Moved</span>
                 <span>CRITICAL</span>
              </div>
              <div className="h-1.5 w-full bg-rose-900/50 rounded-full overflow-hidden">
                 <div className="h-full bg-rose-500 w-full animate-pulse"></div>
              </div>
           </div>
        </div>
      );

    // --- MODULE 11 ---
    case 'M11_JOURNAL_TEMPLATE':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl space-y-3">
           <div className="flex gap-2">
              <div className="h-2 w-12 bg-slate-700 rounded-full"></div>
              <div className="h-2 w-24 bg-slate-800 rounded-full"></div>
           </div>
           <div className="h-20 bg-slate-950 rounded-xl border border-slate-800 w-full p-3 flex gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-lg"></div>
              <div className="space-y-2 flex-1">
                 <div className="h-2 w-full bg-slate-800 rounded-full"></div>
                 <div className="h-2 w-2/3 bg-slate-800 rounded-full"></div>
              </div>
           </div>
           <p className="text-[8px] font-black text-center text-slate-500 uppercase mt-2">Data Log</p>
        </div>
      );
    case 'M11_METRICS_PRIORITY':
    case 'PERFORMANCE_METRICS':
      return <CardGrid items={[
        { title: 'Win Rate', icon: Target, color: 'text-blue-500' },
        { title: 'Avg R:R', icon: Scale, color: 'text-purple-500' },
        { title: 'Expectancy', icon: Calculator, color: 'text-emerald-500' }
      ]} />;
    case 'M11_WEEKLY_REVIEW':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <Calendar size={48} className="text-indigo-500 mb-4" />
           <p className="text-[10px] font-black text-white uppercase tracking-widest">Sunday Ritual</p>
           <div className="flex gap-1 mt-4">
              {[1,2,3,4,5].map(d => <div key={d} className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold ${d===5 ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'}`}>{d}</div>)}
           </div>
        </div>
      );

    // --- MODULE 12 ---
    case 'M12_MULTI_TIMEFRAME':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl space-y-4">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xs">4H</div>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="w-full h-full bg-emerald-500"></div></div>
              <ArrowUpRight className="text-emerald-500" />
           </div>
           <div className="flex items-center gap-4 opacity-50">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs">15m</div>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="w-1/2 h-full bg-rose-500"></div></div>
              <ArrowDownRight className="text-rose-500" />
           </div>
           <p className="text-[8px] font-black text-center text-slate-500 uppercase">Align with the Giant</p>
        </div>
      );
    case 'M12_CORRELATIONS':
    case 'CORRELATION_MATRIX':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex justify-around items-center">
           <div className="text-center">
              <p className="text-xs font-black text-white">DXY</p>
              <TrendingUp className="text-emerald-500 mx-auto my-2" />
           </div>
           <div className="h-12 w-px bg-slate-700"></div>
           <div className="text-center">
              <p className="text-xs font-black text-white">EURUSD</p>
              <TrendingDown className="text-rose-500 mx-auto my-2" />
           </div>
           <div className="h-12 w-px bg-slate-700"></div>
           <div className="text-center">
              <p className="text-xs font-black text-white">GOLD</p>
              <TrendingDown className="text-rose-500 mx-auto my-2" />
           </div>
        </div>
      );

    // --- MODULE 13 ---
    case 'M13_EQUITY_CURVE':
    case 'EQUITY_CURVE':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <div className="relative w-full h-32 border-l border-b border-slate-700">
              <svg className="w-full h-full absolute inset-0 overflow-visible">
                 <path d="M0,100 Q50,90 100,50 T200,10" fill="none" stroke="#10b981" strokeWidth="3" />
              </svg>
           </div>
           <p className="text-[9px] font-black text-emerald-500 uppercase mt-4">Steady Growth</p>
        </div>
      );
    case 'M13_SCALING_PLAN':
    case 'SCALING_PLAN':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex items-end justify-center gap-2">
           <div className="w-8 h-8 bg-indigo-500/30 rounded-t-lg border-t border-x border-indigo-500/50"></div>
           <div className="w-8 h-16 bg-indigo-500/50 rounded-t-lg border-t border-x border-indigo-500/50"></div>
           <div className="w-8 h-24 bg-indigo-500/80 rounded-t-lg border-t border-x border-indigo-500/50 flex items-center justify-center text-white"><TrendingUp size={16} /></div>
           <div className="w-8 h-32 bg-indigo-500 rounded-t-lg border-t border-x border-indigo-500/50"></div>
        </div>
      );

    // --- MODULE 14 ---
    case 'M14_PLAYBOOK_CHECKLIST':
    case 'PLAYBOOK_CHECKLIST':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
           <div className="space-y-2">
              {[1,2,3].map(i => (
                <div key={i} className="flex items-center gap-3 p-2 bg-slate-950 rounded-lg border border-slate-800">
                   <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center text-white"><CheckCircle2 size={10} /></div>
                   <div className="h-1.5 w-24 bg-slate-800 rounded-full"></div>
                </div>
              ))}
           </div>
           <p className="text-[8px] font-black text-center text-slate-500 uppercase mt-4">A+ Setup Only</p>
        </div>
      );

    // --- MODULE 15 ---
    case 'M15_BACKTEST_RESULTS':
    case 'BACKTEST_RESULTS':
    case 'M8_BACKTESTING_FLOW':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl text-center">
           <div className="inline-block p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <h4 className="text-2xl font-black text-white">100</h4>
              <p className="text-[8px] font-black text-indigo-400 uppercase">Trades Tested</p>
           </div>
           <p className="text-[9px] font-black text-slate-500 uppercase">Confidence Level: <span className="text-emerald-500">High</span></p>
        </div>
      );

    // --- MODULE 16 ---
    case 'M16_IDENTITY_PYRAMID':
    case 'IDENTITY_PYRAMID':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <div className="flex flex-col gap-1 w-32">
              <div className="bg-indigo-500 text-white text-[8px] font-black uppercase text-center py-2 rounded-t-lg">Identity</div>
              <div className="bg-indigo-700 text-white text-[8px] font-black uppercase text-center py-2 opacity-80">Process</div>
              <div className="bg-slate-800 text-slate-400 text-[8px] font-black uppercase text-center py-2 rounded-b-lg">Outcome</div>
           </div>
        </div>
      );

    // --- MODULE 17 ---
    case 'M17_CAPITAL_SCALING':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex items-center gap-2">
           <div className="flex-1 bg-slate-950 p-2 rounded-xl text-center opacity-50 border border-slate-800">
              <p className="text-[8px] font-black uppercase text-slate-500">Demo</p>
           </div>
           <ChevronRight size={12} className="text-slate-600" />
           <div className="flex-1 bg-slate-950 p-2 rounded-xl text-center border border-indigo-500/30">
              <p className="text-[8px] font-black uppercase text-indigo-400">Micro</p>
           </div>
           <ChevronRight size={12} className="text-slate-600" />
           <div className="flex-1 bg-emerald-500/10 p-2 rounded-xl text-center border border-emerald-500/30">
              <p className="text-[8px] font-black uppercase text-emerald-400">Live</p>
           </div>
        </div>
      );

    // --- MODULE 1 ---
    case 'M1_THREE_PILLARS':
      return <CardGrid items={[
        { title: 'Risk', icon: ShieldCheck, color: 'text-rose-500' },
        { title: 'Probability', icon: Calculator, color: 'text-indigo-500' },
        { title: 'Psychology', icon: BrainCircuit, color: 'text-emerald-500' }
      ]} />;
    case 'M1_MINDSET_VS':
    case 'GAMBLER_VS_TRADER':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl grid grid-cols-2 gap-4">
           <div className="bg-emerald-900/10 border border-emerald-500/20 p-6 rounded-3xl text-center">
              <h4 className="text-emerald-500 font-black uppercase text-xs tracking-widest mb-4">Trader</h4>
              <ul className="text-[10px] text-slate-400 space-y-2 font-bold uppercase"><li>Defined Risk</li><li>Executed Plan</li><li>Accepts Loss</li></ul>
           </div>
           <div className="bg-rose-900/10 border border-rose-500/20 p-6 rounded-3xl text-center">
              <h4 className="text-rose-500 font-black uppercase text-xs tracking-widest mb-4">Gambler</h4>
              <ul className="text-[10px] text-slate-400 space-y-2 font-bold uppercase"><li>Undefined Risk</li><li>Impulsive</li><li>Chases Loss</li></ul>
           </div>
        </div>
      );
    case 'M1_PROFIT_MECHANICS':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex items-center justify-center gap-4">
           <div className="text-center"><div className="w-12 h-12 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-2"><TrendingDown size={24} /></div><p className="text-[9px] font-black uppercase text-slate-500">Small Loss</p></div>
           <ArrowRight className="text-slate-600" />
           <div className="text-center"><div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2"><TrendingUp size={32} /></div><p className="text-[9px] font-black uppercase text-emerald-500">Big Win</p></div>
           <ArrowRight className="text-slate-600" />
           <div className="text-center"><div className="w-12 h-12 bg-indigo-500/20 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2"><RotateCcw size={24} /></div><p className="text-[9px] font-black uppercase text-slate-500">Repeat</p></div>
        </div>
      );
    case 'M1_ECOSYSTEM_PYRAMID':
    case 'MARKET_ECOSYSTEM':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <div className="flex flex-col gap-2 w-full max-w-xs">
              <div className="bg-indigo-600 p-4 rounded-t-3xl text-center text-white font-black text-xs uppercase tracking-widest">Banks (Market Makers)</div>
              <div className="bg-indigo-700 p-4 text-center text-white font-black text-xs uppercase tracking-widest opacity-80">Institutions & Funds</div>
              <div className="bg-indigo-800 p-4 text-center text-white font-black text-xs uppercase tracking-widest opacity-60">Algos & HFT</div>
              <div className="bg-slate-800 p-4 rounded-b-3xl text-center text-slate-400 font-black text-xs uppercase tracking-widest">Retail Traders (You)</div>
           </div>
        </div>
      );
    case 'M1_TRADER_TYPES':
      return <CardGrid items={[
        { title: 'Scalper (Secs)', icon: Zap, color: 'text-yellow-500' },
        { title: 'Day (Hrs)', icon: Clock, color: 'text-blue-500' },
        { title: 'Swing (Days)', icon: Calendar, color: 'text-purple-500' },
        { title: 'Position (Mths)', icon: Globe, color: 'text-emerald-500' }
      ]} />;
    case 'M3_EXECUTION_MISTAKES':
    case 'M1_SUCCESS_REALITY':
      return (
         <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center text-center">
            <Activity size={48} className="text-trade-primary mb-4" />
            <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Consistency Over Intensity</h4>
            <p className="text-xs text-slate-400 max-w-sm">Success is boring execution of a verified edge. It is not adrenaline and gambling.</p>
         </div>
      );

    // --- MODULE 2 ---
    case 'MARKET_VS_INSTRUMENT':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex items-center justify-center gap-8">
           <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center relative">
              <span className="absolute -top-6 text-[10px] font-black uppercase text-slate-500">The Market</span>
              <div className="w-16 h-16 bg-trade-primary rounded-full flex items-center justify-center text-white font-bold text-xs shadow-[0_0_20px_rgba(59,130,246,0.5)]">Instrument</div>
           </div>
        </div>
      );
    case 'FOREX_TIERS':
      return <CardGrid items={[
        { title: 'Major (Safe)', icon: ShieldCheck, color: 'text-emerald-500' },
        { title: 'Minor (Okay)', icon: Activity, color: 'text-blue-500' },
        { title: 'Exotic (Risk)', icon: AlertTriangle, color: 'text-rose-500' }
      ]} />;
    case 'INDICES_COMPOSITION':
      return (
         <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
            <PieChart size={64} className="text-indigo-400 mb-4" />
            <p className="text-xs text-center text-slate-400 font-bold uppercase">US500 = Apple + Microsoft + Amazon + 497 Others</p>
         </div>
      );
    case 'COMMODITY_VOLATILITY':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex justify-around">
           <div className="text-center"><div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2 text-yellow-500"><CoinsIcon size={32} /></div><p className="text-[10px] font-black uppercase text-yellow-500">Gold (Fast)</p></div>
           <div className="text-center"><div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-2 text-slate-400"><Briefcase size={32} /></div><p className="text-[10px] font-black uppercase text-slate-500">Oil (Political)</p></div>
        </div>
      );
    case 'CRYPTO_RISK_METER':
       return (
         <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl text-center">
            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden mb-2">
               <div className="w-full h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-rose-600"></div>
            </div>
            <div className="flex justify-between text-[8px] font-black uppercase text-slate-500">
               <span>Forex</span><span>Stocks</span><span className="text-rose-500">Crypto (Extreme)</span>
            </div>
         </div>
       );
    case 'SESSION_TIMELINE':
       return (
         <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl space-y-2">
            <div className="flex items-center gap-2"><div className="w-24 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-[9px] font-black text-slate-400 uppercase">Asia</div><span className="text-[9px] text-slate-600">Consolidate</span></div>
            <div className="flex items-center gap-2 ml-12"><div className="w-24 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-[9px] font-black text-white uppercase shadow-lg">London</div><span className="text-[9px] text-blue-400">Move Starts</span></div>
            <div className="flex items-center gap-2 ml-24"><div className="w-24 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-[9px] font-black text-white uppercase shadow-lg">New York</div><span className="text-[9px] text-rose-400">Volatility</span></div>
         </div>
       );
    case 'INSTRUMENT_SELECTOR':
       return <CardGrid items={[{ title: 'EURUSD (Balanced)', icon: Scale, color: 'text-blue-400'}, { title: 'Gold (Aggressive)', icon: Zap, color: 'text-yellow-400'}]} />;

    // --- MODULE 3 ---
    case 'PLATFORM_UI':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <Monitor size={48} className="text-slate-600 mb-4" />
           <p className="text-xs text-center text-slate-400">Charts • Orders • History</p>
           <p className="text-[9px] text-center text-slate-600 mt-2 uppercase font-black">Platform ≠ Market Maker</p>
        </div>
      );
    case 'BROKER_FLOW':
       return (
         <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex items-center justify-between text-center gap-2">
            <div><User size={24} className="mx-auto text-white" /><p className="text-[8px] mt-1 font-black text-slate-500 uppercase">You</p></div>
            <ArrowRight size={16} className="text-slate-600" />
            <div className="bg-slate-800 p-2 rounded-lg border border-slate-700"><Server size={24} className="mx-auto text-indigo-400" /><p className="text-[8px] mt-1 font-black text-indigo-400 uppercase">Broker</p></div>
            <ArrowRight size={16} className="text-slate-600" />
            <div><Globe size={24} className="mx-auto text-emerald-500" /><p className="text-[8px] mt-1 font-black text-emerald-500 uppercase">Market</p></div>
         </div>
       );
    case 'DEMO_VS_LIVE':
       return (
         <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl grid grid-cols-2 gap-4">
            <div className="text-center opacity-50"><Gamepad size={32} className="mx-auto text-slate-400 mb-2" /><h4 className="font-black text-white text-xs uppercase">Demo</h4><p className="text-[8px] text-slate-500">No Emotion</p></div>
            <div className="text-center"><Flame size={32} className="mx-auto text-rose-500 mb-2" /><h4 className="font-black text-white text-xs uppercase">Live</h4><p className="text-[8px] text-slate-500">Real Fear/Greed</p></div>
         </div>
       );
    case 'BID_ASK_SPREAD':
       return (
         <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
            <div className="flex w-full justify-between items-end mb-2 px-8">
               <span className="text-xs font-black text-rose-400">ASK (Buy)</span>
               <span className="text-xs font-black text-emerald-400">BID (Sell)</span>
            </div>
            <div className="w-full h-12 bg-slate-950 rounded-xl border border-slate-800 relative">
               <div className="absolute left-0 top-0 h-full w-2 bg-rose-500"></div>
               <div className="absolute right-0 top-0 h-full w-2 bg-emerald-500"></div>
               <div className="absolute inset-0 flex items-center justify-center"><span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Spread Cost</span></div>
            </div>
         </div>
       );
    case 'ORDER_TYPES':
       return <CardGrid items={[{ title: 'Market (Now)', icon: Zap, color: 'text-white'}, { title: 'Limit (Better Price)', icon: Target, color: 'text-blue-400'}, { title: 'Stop (Breakout)', icon: ArrowUpRight, color: 'text-purple-400'}]} />;
    case 'SL_TP_VISUAL':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl relative h-40 flex items-center justify-center">
             <div className="absolute top-4 right-8 text-emerald-500 font-black text-xs">TP (Take Profit)</div>
             <div className="absolute bottom-4 right-8 text-rose-500 font-black text-xs">SL (Stop Loss)</div>
             <div className="w-1 h-24 bg-slate-700 relative">
                <div className="absolute top-0 w-8 h-1 bg-emerald-500 -left-3.5"></div>
                <div className="absolute top-12 w-8 h-1 bg-white -left-3.5"><span className="absolute left-10 -top-2 text-[9px] font-bold text-white">Entry</span></div>
                <div className="absolute bottom-0 w-8 h-1 bg-rose-500 -left-3.5"></div>
             </div>
          </div>
       );
    case 'LEVERAGE_VISUAL':
       return (
         <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex items-center justify-center gap-4">
            <div className="bg-slate-800 p-4 rounded-xl text-center"><p className="text-xs font-bold text-white">$100</p><p className="text-[8px] uppercase text-slate-500">Your Cash</p></div>
            <X size={16} className="text-slate-600" />
            <div className="bg-indigo-900/30 border border-indigo-500/50 p-4 rounded-xl text-center"><p className="text-xs font-bold text-indigo-400">1:100</p><p className="text-[8px] uppercase text-slate-500">Leverage</p></div>
            <ArrowRight size={16} className="text-slate-600" />
            <div className="bg-emerald-900/30 border border-emerald-500/50 p-4 rounded-xl text-center"><p className="text-xs font-bold text-emerald-400">$10,000</p><p className="text-[8px] uppercase text-slate-500">Power</p></div>
         </div>
       );

    // --- MODULE 4 ---
    case 'M4_CHART_HISTORY':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
             <LineChart size={48} className="text-slate-500 mb-2" />
             <p className="text-[10px] font-black uppercase text-slate-400">Chart = History of Transactions</p>
          </div>
       );
    case 'M4_WICK_VS_BODY':
    case 'M4_CANDLE_ANATOMY':
    case 'CANDLE_ANATOMY':
       return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex justify-center gap-12">
           <div className="flex flex-col items-center">
              <div className="relative w-12 h-32">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-600"></div>
                 <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-20 bg-emerald-500 rounded-sm"></div>
                 <div className="absolute -left-12 top-0 text-[8px] text-slate-500 font-bold">HIGH</div>
                 <div className="absolute -left-12 bottom-0 text-[8px] text-slate-500 font-bold">LOW</div>
                 <div className="absolute -right-12 top-4 text-[8px] text-emerald-400 font-bold">CLOSE</div>
                 <div className="absolute -right-12 bottom-8 text-[8px] text-slate-400 font-bold">OPEN</div>
              </div>
              <p className="mt-4 text-[10px] font-black uppercase text-emerald-500">Bullish</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="relative w-12 h-32">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-600"></div>
                 <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-20 bg-rose-500 rounded-sm"></div>
                 <div className="absolute -right-12 top-8 text-[8px] text-rose-400 font-bold">OPEN</div>
                 <div className="absolute -right-12 bottom-4 text-[8px] text-slate-400 font-bold">CLOSE</div>
              </div>
              <p className="mt-4 text-[10px] font-black uppercase text-rose-500">Bearish</p>
           </div>
        </div>
       );
    case 'M4_TIME_NESTING':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex items-center justify-center gap-4">
             <div className="w-12 h-32 bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px] font-black text-white">4H</div>
             <span className="text-xl font-black text-slate-600">=</span>
             <div className="grid grid-cols-4 gap-1">
                {[1,2,3,4].map(i => <div key={i} className="w-4 h-20 bg-slate-700 border border-slate-500 flex items-center justify-center text-[8px] text-slate-300">1H</div>)}
             </div>
          </div>
       );
    case 'M4_TREND_FLOW':
    case 'M4_IMPULSE_WAVE':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
             <svg viewBox="0 0 200 100" className="w-full h-full">
                <path d="M10,90 L60,20" stroke="#10b981" strokeWidth="4" fill="none" />
                <text x="30" y="60" fill="#10b981" fontSize="10" fontWeight="bold">IMPULSE</text>
                <path d="M60,20 L90,50" stroke="#f43f5e" strokeWidth="2" fill="none" strokeDasharray="4,4" />
                <text x="80" y="30" fill="#f43f5e" fontSize="10" fontWeight="bold">CORR</text>
                <path d="M90,50 L140,10" stroke="#10b981" strokeWidth="4" fill="none" />
             </svg>
          </div>
       );
    case 'M4_RANGE_TRAP':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
             <div className="w-full h-32 border-y-2 border-slate-600 relative bg-slate-900/50">
                <div className="absolute inset-0 flex items-center justify-center">
                   <path className="w-full h-full" d="M0,50 Q25,10 50,50 T100,50 T150,50" stroke="#64748b" fill="none" />
                   <p className="text-[10px] font-black uppercase text-slate-500">Ping Pong (Trap)</p>
                </div>
             </div>
          </div>
       );
    case 'M4_SR_ZONES':
    case 'SUPPORT_RESISTANCE':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <div className="relative w-full h-40">
              <svg className="w-full h-full absolute inset-0">
                 <rect x="0" y="20" width="100%" height="20" fill="#f43f5e" fillOpacity="0.1" />
                 <text x="10" y="34" fill="#f43f5e" fontSize="10" fontWeight="bold">RESISTANCE ZONE</text>
                 <rect x="0" y="120" width="100%" height="20" fill="#10b981" fillOpacity="0.1" />
                 <text x="10" y="134" fill="#10b981" fontSize="10" fontWeight="bold">SUPPORT ZONE</text>
                 <path d="M0,80 L20,30 L50,130 L80,30 L110,130 L140,80" stroke="#64748b" strokeWidth="2" fill="none" />
              </svg>
           </div>
        </div>
      );
    case 'M4_CLEAN_CHART_COMPARE':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl grid grid-cols-2 gap-4">
             <div className="bg-slate-950 p-4 border border-slate-800 rounded-2xl opacity-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
                <div className="text-[8px] font-black uppercase text-rose-500 text-center">Messy (Confused)</div>
                {/* Simulated mess */}
                <div className="w-full h-full border border-slate-700 rounded mt-2"></div>
             </div>
             <div className="bg-slate-950 p-4 border border-trade-primary/30 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
                <div className="text-[8px] font-black uppercase text-trade-primary text-center">Clean (Clear)</div>
                {/* Simulated clean */}
                <div className="w-full h-full border border-slate-700 rounded mt-2"></div>
             </div>
          </div>
       );

    // --- MODULE 5 ---
    case 'M5_LOSING_STREAK':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl text-center">
             <div className="flex justify-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => <div key={i} className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center text-[10px] font-black">L</div>)}
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-black">W</div>
             </div>
             <p className="text-xs text-slate-400">1% Risk x 5 Losses = -5% (Alive). <br/>10% Risk x 5 Losses = -50% (Dead).</p>
          </div>
       );
    case 'M5_STOP_LOSS':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
             <ShieldAlert size={48} className="text-rose-500 mb-4" />
             <p className="text-xs font-black uppercase text-white">The Ejection Seat</p>
             <p className="text-[9px] text-slate-500 text-center max-w-xs mt-2">Without it, one crash kills you.</p>
          </div>
       );
    case 'M5_RR_RATIO':
       return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <div className="flex w-full max-w-xs h-12 rounded-xl overflow-hidden font-black text-xs">
              <div className="flex-1 bg-rose-500 flex items-center justify-center text-white">RISK 1</div>
              <div className="flex-[3] bg-emerald-500 flex items-center justify-center text-white">REWARD 3</div>
           </div>
           <p className="mt-4 text-[10px] text-slate-400 uppercase tracking-widest text-center">Risk $100 to make $300</p>
        </div>
       );
    case 'M5_DRAWDOWN_MATH':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
             <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-400"><span>Lose 10%</span><span className="text-emerald-500">Need 11%</span></div>
                <div className="flex justify-between text-xs font-bold text-slate-400"><span>Lose 50%</span><span className="text-rose-500">Need 100%</span></div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2"><div className="w-1/2 h-full bg-rose-500"></div></div>
             </div>
          </div>
       );

    // --- MODULE 6 ---
    case 'M6_STRUCTURE_MAP':
    case 'M6_HIGHS_LOWS':
    case 'MARKET_STRUCTURE_ADV':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
           <div className="relative w-full h-40">
              <svg className="w-full h-full absolute inset-0">
                 <path d="M10,140 L50,80 L90,110 L140,50 L180,80 L230,20" stroke="#10b981" strokeWidth="2" fill="none" />
                 <text x="50" y="70" fill="#fff" fontSize="10">HH</text>
                 <text x="90" y="130" fill="#fff" fontSize="10">HL</text>
                 <text x="140" y="40" fill="#fff" fontSize="10">HH</text>
                 <text x="180" y="100" fill="#fff" fontSize="10">HL</text>
                 <text x="230" y="15" fill="#fff" fontSize="10">HH</text>
              </svg>
           </div>
        </div>
      );
    case 'M6_BOS_CONFIRMATION':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
             <svg viewBox="0 0 200 100" className="w-full h-full">
                <path d="M10,80 L50,30 L90,60" stroke="#10b981" strokeWidth="2" fill="none" />
                <line x1="50" y1="30" x2="200" y2="30" stroke="#fff" strokeDasharray="4,4" />
                <path d="M90,60 L150,10" stroke="#10b981" strokeWidth="2" fill="none" />
                <text x="160" y="25" fill="#3b82f6" fontWeight="bold" fontSize="10">BOS</text>
             </svg>
          </div>
       );
    case 'M6_CHOCH_PATTERN':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
             <div className="text-center text-[10px] font-black uppercase text-rose-500 mb-2">Trend Change (ChoCH)</div>
             <svg viewBox="0 0 200 100" className="w-full h-full">
                <path d="M10,90 L40,50 L70,80 L100,20 L130,60" stroke="#10b981" strokeWidth="2" fill="none" />
                <line x1="70" y1="80" x2="200" y2="80" stroke="#64748b" strokeDasharray="2,2" />
                <path d="M130,60 L160,95" stroke="#f43f5e" strokeWidth="2" fill="none" />
             </svg>
          </div>
       );
    case 'M6_TREND_VS_RANGE':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl grid grid-cols-2 gap-4">
             <div className="h-20 border border-emerald-500/30 rounded-xl relative"><div className="absolute inset-0 flex items-center justify-center text-[8px] font-black uppercase text-emerald-500">Trend</div></div>
             <div className="h-20 border border-slate-600/30 rounded-xl relative"><div className="absolute inset-0 flex items-center justify-center text-[8px] font-black uppercase text-slate-500">Range</div></div>
          </div>
       );
    case 'M6_LIQUIDITY_TRAP':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl text-center">
             <div className="flex justify-center gap-8 mb-2">
                <span className="text-emerald-400 font-bold">$$$</span>
                <span className="text-emerald-400 font-bold">$$$</span>
             </div>
             <div className="h-1 bg-slate-700 w-1/2 mx-auto mb-2"></div>
             <p className="text-[9px] font-black text-slate-500 uppercase">Equal Highs = Target</p>
          </div>
       );

    // --- MODULE 7 ---
    case 'M7_INDICATOR_LAG':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-6">Reality vs Lag</h4>
           <div className="relative w-full h-40">
              <svg className="w-full h-full absolute inset-0 overflow-visible">
                 <path d="M0,80 L20,60 L40,75 L60,40 L80,55 L100,20 L120,40 L140,30 L160,50 L180,40 L200,60" fill="none" stroke="#10b981" strokeWidth="2" />
                 <circle cx="200" cy="60" r="3" fill="#10b981" />
                 <text x="205" y="60" fill="#10b981" fontSize="10" fontWeight="bold">Price (Now)</text>
              </svg>
              <svg className="w-full h-full absolute inset-0 overflow-visible">
                 <path d="M0,85 L20,75 L40,75 L60,65 L80,60 L100,50 L120,45 L140,40 L160,40 L180,45 L200,50" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" />
                 <circle cx="200" cy="50" r="3" fill="#3b82f6" />
                 <text x="205" y="50" fill="#3b82f6" fontSize="10" fontWeight="bold">Indicator (Late)</text>
              </svg>
           </div>
           <p className="text-[9px] text-slate-500 text-center mt-6">Indicators calculate the past. They cannot see the future.</p>
        </div>
      );
    case 'M7_INDICATOR_CATEGORIES':
    case 'INDICATOR_CONFIRMATION':
       return <CardGrid items={[{ title: 'Trend (MA)', icon: TrendingUp, color: 'text-blue-500' }, { title: 'Momentum (RSI)', icon: Gauge, color: 'text-purple-500' }, { title: 'Volatility (ATR)', icon: Activity, color: 'text-orange-500' }]} />;
    case 'M7_MA_TREND_FILTER':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
             <div className="relative h-24 w-full">
                <div className="absolute top-1/2 w-full h-0.5 bg-blue-500"></div>
                <div className="absolute top-4 left-1/4 w-16 h-8 bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[8px] font-black rounded uppercase">Buy Zone</div>
                <div className="absolute bottom-4 right-1/4 w-16 h-8 bg-rose-500/20 text-rose-500 flex items-center justify-center text-[8px] font-black rounded uppercase">Sell Zone</div>
             </div>
          </div>
       );
    case 'M7_RSI_MOMENTUM':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
             <div className="w-full h-20 border-y border-slate-700 relative">
                <div className="absolute top-[30%] w-full border-t border-slate-800 border-dashed"></div>
                <div className="absolute bottom-[30%] w-full border-t border-slate-800 border-dashed"></div>
                <path d="M0,80 Q50,0 100,50 T200,20" stroke="#a855f7" fill="none" strokeWidth="2" />
             </div>
             <div className="flex justify-between w-full text-[8px] text-slate-500 mt-1"><span>0</span><span>30</span><span>70</span><span>100</span></div>
          </div>
       );
    case 'M7_ATR_VOLATILITY':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex items-end justify-center gap-4 h-32">
             <div className="w-4 h-8 bg-slate-700 rounded-sm"></div>
             <div className="w-4 h-12 bg-slate-700 rounded-sm"></div>
             <div className="w-4 h-24 bg-orange-500 rounded-sm animate-pulse"></div>
             <div className="w-4 h-6 bg-slate-700 rounded-sm"></div>
          </div>
       );
    case 'M7_CHART_CLUTTER':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl text-center">
             <div className="relative w-32 h-20 bg-slate-950 border border-slate-800 mx-auto mb-2 overflow-hidden">
                {/* Random lines */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTAgMTBMMTAgME0wIDBMMTAgMTAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')] opacity-20"></div>
                <div className="absolute top-2 left-0 w-full h-0.5 bg-red-500 transform rotate-12"></div>
                <div className="absolute top-5 left-0 w-full h-0.5 bg-blue-500 transform -rotate-6"></div>
                <div className="absolute top-8 left-0 w-full h-0.5 bg-green-500 transform rotate-3"></div>
             </div>
             <p className="text-[9px] text-rose-500 font-black uppercase">Analysis Paralysis</p>
          </div>
       );
    case 'M7_INDICATOR_FAILURE':
       return (
          <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl text-center">
             <div className="flex items-center justify-center gap-4">
                <div className="text-right"><h4 className="font-black text-rose-500 text-lg">CRASH</h4><p className="text-[8px] uppercase text-slate-500">Price</p></div>
                <div className="h-12 w-0.5 bg-slate-700"></div>
                <div className="text-left"><h4 className="font-black text-slate-500 text-lg">FLAT</h4><p className="text-[8px] uppercase text-slate-500">Indicator</p></div>
             </div>
          </div>
       );

    // --- MODULE 8 ---
    case 'M8_STRATEGY_VS_SETUP':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-6">Strategy Architecture</h4>
           <div className="grid grid-cols-2 gap-0 border border-slate-700 rounded-3xl overflow-hidden">
              <div className="bg-rose-900/10 p-6 flex flex-col items-center text-center border-r border-slate-700">
                 <p className="text-xs font-black text-rose-500 uppercase mb-4 flex items-center gap-2"><Zap size={14} /> Setup</p>
                 <ul className="space-y-3 text-[9px] font-bold text-slate-400">
                    <li className="text-rose-300">Emotional Entry</li>
                    <li>One-time Event</li>
                    <li className="text-rose-300">Vague Exit</li>
                    <li>"It looks good"</li>
                 </ul>
              </div>
              <div className="bg-emerald-900/10 p-6 flex flex-col items-center text-center">
                 <p className="text-xs font-black text-emerald-500 uppercase mb-4 flex items-center gap-2"><Briefcase size={14} /> System</p>
                 <ul className="space-y-3 text-[9px] font-bold text-slate-400">
                    <li className="text-emerald-300">Rule-Based</li>
                    <li>Repeatable</li>
                    <li className="text-emerald-300">Defined Exit</li>
                    <li>"Conditions Met"</li>
                 </ul>
              </div>
           </div>
        </div>
      );
    case 'M8_STRATEGY_COMPONENTS':
    case 'STRATEGY_RULES':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-6">The 12 Pillars of a Strategy</h4>
           <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {['Instrument', 'Session', 'Condition', 'Entry Model', 'Trigger', 'Stop Loss', 'Take Profit', 'Risk %', 'Max Loss', 'Management', 'No-Go Rules', 'Kill Switch'].map((item, i) => (
                <div key={i} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center aspect-square">
                   <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-black mb-2">{i+1}</div>
                   <span className="text-[9px] font-bold text-slate-300 leading-tight">{item}</span>
                </div>
              ))}
           </div>
        </div>
      );
    case 'M8_MARKET_CONDITION_FILTER':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-6">Condition Filter</h4>
           <div className="flex gap-4 w-full">
              <div className="flex-1 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center opacity-100">
                 <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-2 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 size={24} />
                 </div>
                 <p className="text-[9px] font-black text-emerald-400 uppercase">Trending</p>
                 <p className="text-[8px] text-slate-500 uppercase tracking-widest">Trade Active</p>
              </div>
              <div className="flex-1 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex flex-col items-center opacity-50 grayscale">
                 <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white mb-2">
                    <X size={24} />
                 </div>
                 <p className="text-[9px] font-black text-rose-400 uppercase">Ranging</p>
                 <p className="text-[8px] text-slate-500 uppercase tracking-widest">Stand Aside</p>
              </div>
           </div>
           <p className="text-[9px] text-slate-500 text-center mt-4">A strategy only works in the specific condition it was built for.</p>
        </div>
      );
    case 'M8_ENTRY_MODEL_FLOW':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-6">Entry Sequence</h4>
           <div className="relative flex flex-col gap-4 pl-4 border-l-2 border-slate-800 ml-4">
              <div className="relative">
                 <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-800 border-2 border-slate-600 rounded-full"></div>
                 <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-[9px] font-black text-slate-400 uppercase">1. Condition</p>
                    <p className="text-xs font-bold text-white">Is the market trending?</p>
                 </div>
              </div>
              <div className="relative">
                 <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-800 border-2 border-slate-600 rounded-full"></div>
                 <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-[9px] font-black text-slate-400 uppercase">2. Context</p>
                    <p className="text-xs font-bold text-white">Price at Key Level?</p>
                 </div>
              </div>
              <div className="relative">
                 <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-4 h-4 bg-trade-primary border-2 border-white rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                 <div className="bg-indigo-900/20 p-3 rounded-xl border border-indigo-500/50">
                    <p className="text-[9px] font-black text-indigo-400 uppercase">3. Trigger</p>
                    <p className="text-xs font-bold text-white">Engulfing Candle Close</p>
                 </div>
              </div>
           </div>
        </div>
      );
    case 'M8_STOP_LOSS_LOGIC':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-6">Invalidation Point</h4>
           <div className="relative w-full h-40 border-l border-slate-700">
              <svg className="w-full h-full absolute inset-0 overflow-visible">
                 <path d="M0,80 L40,40 L80,60" fill="none" stroke="#10b981" strokeWidth="2" />
                 <circle cx="80" cy="60" r="3" fill="#ffffff" stroke="#10b981" />
                 <text x="85" y="55" fill="#white" fontSize="8" fontWeight="bold">Entry</text>
                 <rect x="0" y="65" width="100" height="15" fill="#3b82f6" fillOpacity="0.1" />
                 <rect x="0" y="80" width="100" height="10" fill="#fbbf24" fillOpacity="0.1" />
                 <text x="5" y="88" fill="#fbbf24" fontSize="8">Noise</text>
                 <line x1="0" y1="95" x2="120" y2="95" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" />
                 <text x="125" y="98" fill="#f43f5e" fontSize="9" fontWeight="bold">Invalidation (SL)</text>
              </svg>
           </div>
           <p className="text-[9px] text-slate-500 text-center mt-4">Place SL below the noise, where the structure is actually broken.</p>
        </div>
      );
    case 'M8_RISK_RULES':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-6">Risk Control Panel</h4>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
                 <ShieldAlert size={20} className="text-rose-500 mb-2" />
                 <p className="text-[9px] font-black text-slate-500 uppercase">Max Daily Loss</p>
                 <p className="text-lg font-black text-white">3%</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
                 <Activity size={20} className="text-indigo-500 mb-2" />
                 <p className="text-[9px] font-black text-slate-500 uppercase">Max Trades/Day</p>
                 <p className="text-lg font-black text-white">3 - 5</p>
              </div>
              <div className="col-span-2 bg-rose-900/20 p-3 rounded-2xl border border-rose-500/30 flex items-center justify-center gap-3">
                 <Power size={16} className="text-rose-500" />
                 <span className="text-[10px] font-bold text-rose-200 uppercase tracking-widest">Kill Switch Active</span>
              </div>
           </div>
        </div>
      );

    case 'TREND_MAP':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
           <svg viewBox="0 0 200 100" className="w-full h-full">
              {/* Uptrend */}
              <path d="M10,90 L60,40" stroke="#10b981" strokeWidth="2" />
              <text x="35" y="80" fill="#10b981" fontSize="8">Uptrend</text>
              {/* Downtrend */}
              <path d="M80,40 L130,90" stroke="#f43f5e" strokeWidth="2" />
              <text x="105" y="40" fill="#f43f5e" fontSize="8">Downtrend</text>
              {/* Ranging */}
              <path d="M150,60 L190,60" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4"/>
              <text x="170" y="50" fill="#64748b" fontSize="8">Range</text>
           </svg>
        </div>
      );

    case 'RISK_PIE':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex justify-center">
           <div className="relative w-32 h-32 rounded-full border-4 border-slate-700 overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500" style={{clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)'}}></div>
              <div className="absolute inset-0 bg-rose-500" style={{clipPath: 'polygon(50% 50%, 0 0, 100% 0)'}}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-[10px] font-black text-white">PORTFOLIO</div>
              </div>
           </div>
        </div>
      );

    case 'FIBONACCI':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl">
           <div className="relative h-40 w-full border-l border-slate-700">
              <div className="absolute top-0 w-full border-t border-slate-600"><span className="text-[8px] text-slate-500 absolute right-0 -top-3">100%</span></div>
              <div className="absolute top-[38.2%] w-full border-t border-indigo-500/50 border-dashed"><span className="text-[8px] text-indigo-400 absolute right-0 -top-3">61.8% (Golden)</span></div>
              <div className="absolute top-[50%] w-full border-t border-slate-600/50"><span className="text-[8px] text-slate-500 absolute right-0 -top-3">50%</span></div>
              <div className="absolute top-[61.8%] w-full border-t border-indigo-500/50 border-dashed"><span className="text-[8px] text-indigo-400 absolute right-0 -top-3">38.2%</span></div>
              <div className="absolute bottom-0 w-full border-t border-slate-600"><span className="text-[8px] text-slate-500 absolute right-0 -top-3">0%</span></div>
              
              <path d="M0,160 L200,0" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" fill="none" />
           </div>
        </div>
      );

    case 'GLOBE':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl flex justify-center">
           <Globe size={64} className="text-indigo-500 animate-pulse-slow" />
        </div>
      );
      
    case 'M3_GOLD_LOT_TABLE':
      return (
        <div className="bg-slate-900/60 rounded-[40px] p-8 border border-slate-800 shadow-2xl overflow-hidden">
           <table className="w-full text-[10px] text-left">
              <thead>
                 <tr className="border-b border-slate-700 text-slate-500 uppercase">
                    <th className="pb-2">Account</th>
                    <th className="pb-2">Risk (1%)</th>
                    <th className="pb-2">Stop Loss</th>
                    <th className="pb-2 text-right">Lot Size</th>
                 </tr>
              </thead>
              <tbody className="text-slate-300 font-mono">
                 <tr className="border-b border-slate-800/50"><td className="py-2">$100</td><td>$1</td><td>30 pips</td><td className="text-right text-rose-400">0.01 (High Risk)</td></tr>
                 <tr className="border-b border-slate-800/50"><td className="py-2">$500</td><td>$5</td><td>30 pips</td><td className="text-right">0.01</td></tr>
                 <tr className="border-b border-slate-800/50"><td className="py-2">$1,000</td><td>$10</td><td>30 pips</td><td className="text-right text-emerald-400">0.03</td></tr>
                 <tr><td className="py-2">$10,000</td><td>$100</td><td>30 pips</td><td className="text-right text-emerald-400">0.33</td></tr>
              </tbody>
           </table>
        </div>
      );

    default:
      return (
        <div className="bg-slate-900/50 rounded-[40px] p-10 border border-slate-800 text-center opacity-40">
           <Zap size={32} className="mx-auto mb-4 text-slate-700" />
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Diagram: {type}</p>
        </div>
      );
  }
};

export const ChapterContent: React.FC<ChapterContentProps> = ({ chapter, langMode, onAction, isCompleted }) => {
  return (
    <div className="space-y-12">
      <div className="space-y-4 text-center pb-8 border-b border-slate-800/50">
         <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
           {langMode === 'amharic' ? chapter.titleAmharic : chapter.title}
         </h2>
         <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">
           {langMode === 'amharic' ? 'የትምህርት ክፍል' : 'Training Module'} {chapter.id}
         </p>
      </div>

      <div className="space-y-16">
        {chapter.content.map((section, idx) => (
          <div key={idx} className="animate-fade-in">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-trade-primary/20 flex items-center justify-center text-trade-primary font-black text-xs border border-trade-primary/30">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-200">
                   {section.subtitle}
                </h3>
             </div>

             <div className="prose prose-invert max-w-none mb-8 text-slate-400 leading-loose">
                {formatContent(langMode === 'amharic' ? section.amharic : section.english, langMode === 'amharic')}
             </div>

             {section.visualType !== 'NONE' && (
               <div className="my-8">
                  <VisualAidRenderer type={section.visualType} lang={langMode} />
               </div>
             )}
          </div>
        ))}
      </div>

      <div className="pt-12 border-t border-slate-800 flex justify-center">
         <button 
           onClick={() => onAction('quiz')}
           className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform flex items-center gap-3"
         >
            {isCompleted ? <RotateCcw size={20} /> : <CheckCircle2 size={20} />}
            {langMode === 'amharic' ? 'ፈተናውን ጀምር' : 'Start Assessment'}
         </button>
      </div>
    </div>
  );
};
