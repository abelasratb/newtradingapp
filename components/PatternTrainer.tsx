
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Cell 
} from 'recharts';
import { 
  CheckCircle, XCircle, BrainCircuit, Target, Zap, 
  Trophy, History, ChevronRight, TrendingUp, TrendingDown, Minus
} from 'lucide-react';
import { User } from '../types.ts';
import * as dbService from '../lib/services.ts';

type PatternType = 'Head & Shoulders' | 'Inverse Head & Shoulders' | 'Double Top' | 'Double Bottom' | 'Triple Top' | 'Triple Bottom' | 'Uptrend' | 'Downtrend' | 'Consolidation' | 'Ascending Triangle' | 'Descending Triangle' | 'Symmetrical Triangle' | 'Bull Flag' | 'Bear Flag' | 'Falling Wedge' | 'Rising Wedge';

const PATTERN_INFO: Record<PatternType, { description: string; signal: 'Bullish' | 'Bearish' | 'Neutral' }> = {
  'Head & Shoulders': { description: 'Reversal: Three peaks with the middle one being the highest. Signals an end to an uptrend.', signal: 'Bearish' },
  'Inverse Head & Shoulders': { description: 'Reversal: Three troughs with the middle one being the lowest. Signals an end to a downtrend.', signal: 'Bullish' },
  'Double Top': { description: 'Bearish reversal pattern consisting of two peaks at nearly the same price level.', signal: 'Bearish' },
  'Double Bottom': { description: 'Bullish reversal pattern consisting of two troughs at nearly the same price level.', signal: 'Bullish' },
  'Triple Top': { description: 'Strong bearish reversal pattern with three peaks hitting resistance.', signal: 'Bearish' },
  'Triple Bottom': { description: 'Strong bullish reversal pattern with three troughs hitting support.', signal: 'Bullish' },
  'Uptrend': { description: 'Higher Highs and Higher Lows. The fundamental bullish price action.', signal: 'Bullish' },
  'Downtrend': { description: 'Lower Highs and Lower Lows. The fundamental bearish price action.', signal: 'Bearish' },
  'Consolidation': { description: 'Price moves sideways between clear support and resistance levels.', signal: 'Neutral' },
  'Ascending Triangle': { description: 'Bullish continuation pattern with a flat top and rising bottom.', signal: 'Bullish' },
  'Descending Triangle': { description: 'Bearish continuation pattern with a flat bottom and falling top.', signal: 'Bearish' },
  'Symmetrical Triangle': { description: 'Coiling pattern showing indecision before a breakout in either direction.', signal: 'Neutral' },
  'Bull Flag': { description: 'Small consolidation channel after a sharp upward move. Bullish continuation.', signal: 'Bullish' },
  'Bear Flag': { description: 'Small consolidation channel after a sharp downward move. Bearish continuation.', signal: 'Bearish' },
  'Falling Wedge': { description: 'A bullish reversal or continuation pattern that slopes downward and narrows.', signal: 'Bullish' },
  'Rising Wedge': { description: 'A bearish reversal or continuation pattern that slopes upward and narrows.', signal: 'Bearish' }
};

const PATTERNS: PatternType[] = Object.keys(PATTERN_INFO) as PatternType[];

interface ChartPoint {
  index: number;
  open: number;
  close: number;
  high: number;
  low: number;
  range: [number, number];
}

const CandlestickShape = (props: any) => {
  const { x, width, y, height, payload } = props;
  const { open, close, high, low } = payload;
  const isUp = close >= open;
  const color = isUp ? '#10b981' : '#f43f5e';
  
  const strokeWidth = 2;
  const wickX = x + width / 2;
  const candleTop = y;
  const candleBottom = y + height;
  const pixelPerUnit = height / Math.abs(open - close || 0.001);
  const highOffset = (Math.max(open, close) - high) * pixelPerUnit;
  const lowOffset = (Math.min(open, close) - low) * pixelPerUnit;

  return (
    <g>
      <line x1={wickX} y1={candleTop + highOffset} x2={wickX} y2={candleBottom - lowOffset} stroke={color} strokeWidth={strokeWidth} />
      <rect x={x} y={y} width={width} height={height} fill={color} stroke={color} strokeWidth={1} rx={1} />
    </g>
  );
};

interface PatternTrainerProps {
  currentUser?: User | null;
}

export const PatternTrainer: React.FC<PatternTrainerProps> = ({ currentUser = null }) => {
  const [currentPattern, setCurrentPattern] = useState<PatternType>('Uptrend');
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [options, setOptions] = useState<PatternType[]>([]);
  const [selected, setSelected] = useState<PatternType | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Pro'>('Beginner');
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<{ pattern: PatternType; result: boolean }[]>([]);

  // Load stats from Firestore
  useEffect(() => {
    if (currentUser) {
      dbService.getGameStats(currentUser.id).then(stats => {
        setXp(stats.xp);
        setStreak(stats.streak);
      });
    }
  }, [currentUser]);

  // Sync stats to Firestore
  const saveStats = (newXp: number, newStreak: number) => {
    if (currentUser) {
      dbService.updateGameStats(currentUser.id, newXp, newStreak);
    }
  };

  const generateData = useCallback((type: PatternType, diff: 'Beginner' | 'Pro') => {
    let keyframes: number[] = [];
    switch (type) {
      case 'Head & Shoulders': keyframes = [30, 50, 40, 80, 40, 50, 30]; break;
      case 'Inverse Head & Shoulders': keyframes = [70, 50, 60, 20, 60, 50, 70]; break;
      case 'Double Top': keyframes = [30, 80, 50, 80, 30]; break;
      case 'Double Bottom': keyframes = [70, 20, 50, 20, 70]; break;
      case 'Triple Top': keyframes = [30, 80, 45, 80, 45, 80, 30]; break;
      case 'Triple Bottom': keyframes = [70, 20, 55, 20, 55, 20, 70]; break;
      case 'Uptrend': keyframes = [20, 40, 30, 60, 50, 80, 70, 95]; break;
      case 'Downtrend': keyframes = [95, 75, 85, 55, 65, 35, 45, 15]; break;
      case 'Consolidation': keyframes = [48, 52, 48, 52, 48, 52, 48, 52, 48]; break;
      case 'Ascending Triangle': keyframes = [25, 75, 40, 75, 55, 75, 65, 75]; break;
      case 'Descending Triangle': keyframes = [75, 25, 60, 25, 45, 25, 35, 25]; break;
      case 'Symmetrical Triangle': keyframes = [25, 75, 35, 65, 45, 55, 48, 52]; break;
      case 'Bull Flag': keyframes = [15, 85, 75, 80, 70, 75, 65]; break;
      case 'Bear Flag': keyframes = [85, 15, 25, 20, 30, 25, 35]; break;
      case 'Falling Wedge': keyframes = [90, 40, 75, 25, 65, 15, 58, 10]; break;
      case 'Rising Wedge': keyframes = [10, 60, 25, 75, 35, 85, 42, 90]; break;
    }

    const data: ChartPoint[] = [];
    const pointsPerSegment = diff === 'Beginner' ? 8 : 12;
    const noiseLevel = diff === 'Beginner' ? 1.5 : 3.5;
    let lastClose = keyframes[0];

    for (let i = 0; i < keyframes.length - 1; i++) {
      const startValue = keyframes[i];
      const endValue = keyframes[i + 1];
      for (let j = 0; j < pointsPerSegment; j++) {
        const progress = j / pointsPerSegment;
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        const targetPrice = startValue + (endValue - startValue) * ease;
        const open = lastClose;
        const close = targetPrice + (Math.random() - 0.5) * noiseLevel;
        const high = Math.max(open, close) + Math.random() * (noiseLevel * 0.8);
        const low = Math.min(open, close) - Math.random() * (noiseLevel * 0.8);
        data.push({ index: data.length, open, close, high, low, range: [open, close] });
        lastClose = close;
      }
    }
    return data;
  }, []);

  const loadNewRound = useCallback(() => {
    const target = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
    setCurrentPattern(target);
    setChartData(generateData(target, difficulty));
    const others = PATTERNS.filter(p => p !== target);
    const shuffledOthers = others.sort(() => 0.5 - Math.random()).slice(0, 3);
    const roundOptions = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());
    setOptions(roundOptions);
    setSelected(null);
    setIsCorrect(null);
  }, [difficulty, generateData]);

  useEffect(() => { loadNewRound(); }, [loadNewRound]);

  const handleGuess = (guess: PatternType) => {
    if (selected) return;
    setSelected(guess);
    const correct = guess === currentPattern;
    setIsCorrect(correct);
    setTotal(t => t + 1);
    
    let newXp = xp;
    let newStreak = streak;

    if (correct) {
      newStreak = streak + 1;
      newXp = xp + (difficulty === 'Pro' ? 25 : 15);
    } else {
      newStreak = 0;
    }
    
    setStreak(newStreak);
    setXp(newXp);
    saveStats(newXp, newStreak);

    setHistory(h => [{ pattern: currentPattern, result: correct }, ...h].slice(0, 10));
  };

  const renderVisualCues = () => {
    if (selected === null) return null;
    const lineProps = { className: "breakout-line", strokeWidth: 2, strokeDasharray: "5 5" };
    const len = chartData.length - 1;
    const cues = [];
    switch (currentPattern) {
      case 'Consolidation':
        cues.push(<ReferenceLine key="c1" y={55} stroke="#3b82f6" {...lineProps} label={{ value: 'RESIST', fill: '#3b82f6', fontSize: 10, position: 'top' }} />);
        cues.push(<ReferenceLine key="c2" y={45} stroke="#3b82f6" {...lineProps} label={{ value: 'SUPP', fill: '#3b82f6', fontSize: 10, position: 'bottom' }} />);
        break;
      case 'Uptrend':
        cues.push(<ReferenceLine key="u1" segment={[{ x: 0, y: 15 }, { x: len, y: 85 }]} stroke="#10b981" {...lineProps} />);
        break;
      case 'Downtrend':
        cues.push(<ReferenceLine key="d1" segment={[{ x: 0, y: 85 }, { x: len, y: 15 }]} stroke="#ef4444" {...lineProps} />);
        break;
    }
    return cues;
  };

  const level = Math.floor(xp / 100) + 1;
  const xpProgress = xp % 100;

  return (
    <div className="space-y-6 h-full flex flex-col max-w-6xl mx-auto animate-fade-in p-2 md:p-4">
      {/* Stats Header with Progress Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/50 p-4 rounded-3xl border border-slate-800 shadow-xl backdrop-blur-sm">
        <div className="md:col-span-2 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 shrink-0">
            <Trophy size={24} />
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex justify-between items-center mb-1">
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Level {level} Trader</span>
               <span className="text-[10px] font-bold text-white">{xp} XP</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700">
               <div 
                 className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 transition-all duration-700 ease-out relative"
                 style={{ width: `${xpProgress}%` }}
               >
                 <div className="absolute top-0 right-0 w-2 h-full bg-white/50 blur-[2px]"></div>
               </div>
            </div>
            <div className="flex justify-between mt-1.5">
               <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Beginner</span>
               <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{100 - xpProgress} XP to Level Up</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 border-l border-slate-800">
          <Zap className="text-yellow-400" size={20} />
          <div>
            <p className="text-[10px] font-black uppercase text-slate-500">Streak</p>
            <p className="text-lg font-mono text-white">{streak}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-end px-4">
          <div className="flex bg-slate-800 p-1 rounded-2xl border border-slate-700">
            <button onClick={() => setDifficulty('Beginner')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${difficulty === 'Beginner' ? 'bg-trade-primary text-white shadow-lg' : 'text-slate-500'}`}>Easy</button>
            <button onClick={() => setDifficulty('Pro')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${difficulty === 'Pro' ? 'bg-red-500 text-white shadow-lg' : 'text-slate-500'}`}>Pro</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          <div className="flex-1 bg-trade-card rounded-3xl border border-slate-800 p-6 flex flex-col relative overflow-hidden shadow-2xl min-h-[400px]">
            <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Identify the Candlestick Pattern</h3>
            </div>
            <div className="flex-1 w-full mt-10">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
                  <XAxis dataKey="index" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Bar dataKey="range" shape={<CandlestickShape />} isAnimationActive={true} animationDuration={600}>
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} />)}
                  </Bar>
                  {renderVisualCues()}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            {isCorrect !== null && (
              <div className="absolute inset-0 bg-trade-dark/95 backdrop-blur-md flex items-center justify-center z-20 animate-fade-in p-6">
                <div className="bg-trade-card border border-slate-700 p-8 rounded-[40px] shadow-3xl text-center max-w-lg transform animate-scale-up">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center ${isCorrect ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {isCorrect ? <CheckCircle size={48} /> : <XCircle size={48} />}
                  </div>
                  <h2 className="text-2xl font-black text-white mb-2">{isCorrect ? 'EXCELLENT EYE!' : 'NOT QUITE'}</h2>
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 mb-6 text-left">
                    <p className="text-slate-300 font-bold mb-1 flex items-center gap-2">
                      {PATTERN_INFO[currentPattern].signal === 'Bullish' ? <TrendingUp size={16} className="text-green-500" /> : PATTERN_INFO[currentPattern].signal === 'Bearish' ? <TrendingDown size={16} className="text-red-500" /> : <Minus size={16} className="text-blue-500" />}
                      {currentPattern} ({PATTERN_INFO[currentPattern].signal})
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed italic">{PATTERN_INFO[currentPattern].description}</p>
                  </div>
                  <button onClick={loadNewRound} className="bg-trade-primary hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest w-full transition-all flex items-center justify-center gap-3">
                    <ChevronRight size={20} /> Next Challenge
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {options.map((option) => (
              <button key={option} onClick={() => handleGuess(option)} disabled={selected !== null} className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-xl ${selected === null ? 'bg-slate-900 border-slate-800 hover:border-purple-500/50 hover:bg-slate-800 text-slate-400 hover:text-white' : selected === option ? (option === currentPattern ? 'bg-green-900/40 border-green-500 text-green-400' : 'bg-red-900/40 border-red-500 text-red-400') : (option === currentPattern ? 'bg-green-900/20 border-green-500/50 text-green-400' : 'bg-slate-900 border-slate-900 text-slate-600 opacity-50')}`}>
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-trade-card rounded-3xl border border-slate-800 p-6 shadow-xl">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><History size={14} /> Training Log</h4>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {history.length === 0 ? (
                <p className="text-xs text-slate-600 italic">Complete a challenge to see history...</p>
              ) : (
                history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
                    <span className="text-slate-300 font-bold truncate mr-2">{h.pattern}</span>
                    {h.result ? <CheckCircle size={14} className="text-green-500 shrink-0" /> : <XCircle size={14} className="text-red-500 shrink-0" />}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-3xl border border-indigo-500/20 p-6">
            <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2 flex items-center gap-2"><BrainCircuit size={14} /> Expert Tip</h4>
            <p className="text-xs text-slate-300 leading-relaxed">Candlesticks tell the story of price rejection. Look at the wicks—long wicks often mean a reversal is imminent at resistance or support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
