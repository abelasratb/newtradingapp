
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Trophy, Zap, 
  CheckCircle2, XCircle, Play, RotateCcw, AlertTriangle 
} from 'lucide-react';

type Direction = 'BUY' | 'SELL';

interface GameLevel {
  pattern: string;
  direction: Direction;
  description: string;
}

const LEVELS: GameLevel[] = [
  { pattern: 'Double Bottom', direction: 'BUY', description: "Price failed to break support twice, indicating seller exhaustion." },
  { pattern: 'Double Top', direction: 'SELL', description: "Price failed to break resistance twice, indicating buyer exhaustion." },
  { pattern: 'Bull Flag', direction: 'BUY', description: "A consolidation channel sloping downwards after a strong impulse up." },
  { pattern: 'Bear Flag', direction: 'SELL', description: "A consolidation channel sloping upwards after a strong impulse down." },
  { pattern: 'Head & Shoulders', direction: 'SELL', description: "Three peaks with the middle highest. A classic reversal signal." },
  { pattern: 'Inv. Head & Shoulders', direction: 'BUY', description: "Three troughs with the middle lowest. A classic bottoming signal." },
  { pattern: 'Ascending Triangle', direction: 'BUY', description: "Flat resistance and higher lows. Buyers are squeezing sellers." },
  { pattern: 'Descending Triangle', direction: 'SELL', description: "Flat support and lower highs. Sellers are squeezing buyers." },
  { pattern: 'Hammer Reversal', direction: 'BUY', description: "Long lower wick rejecting lower prices at support." },
  { pattern: 'Shooting Star', direction: 'SELL', description: "Long upper wick rejecting higher prices at resistance." }
];

// Custom Candlestick Shape
const CandlestickShape = (props: any) => {
  const { x, width, y, height, payload } = props;
  const { open, close, high, low } = payload;
  const isUp = close >= open;
  const color = isUp ? '#10b981' : '#f43f5e';
  
  const wickX = x + width / 2;
  // Handle zero height/division by zero cases
  const range = Math.max(0.0001, Math.abs(open - close));
  const pixelPerUnit = height / range;
  
  // Guard against weird rendering if height is 0 (flat candle)
  const safePixelPerUnit = height === 0 ? 1 : pixelPerUnit;

  const candleTop = y;
  const candleBottom = y + height;
  
  const highOffset = (Math.max(open, close) - high) * safePixelPerUnit;
  const lowOffset = (Math.min(open, close) - low) * safePixelPerUnit;

  return (
    <g>
      <line x1={wickX} y1={candleTop + highOffset} x2={wickX} y2={candleBottom - lowOffset} stroke={color} strokeWidth={2} />
      <rect x={x} y={y} width={width} height={Math.max(2, height)} fill={color} stroke={color} strokeWidth={1} rx={1} />
    </g>
  );
};

export const PriceActionGame: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(LEVELS[0]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [gameState, setGameState] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState('');

  const generateChartData = useCallback((pattern: string) => {
    let keyframes: number[] = [];
    // Define shape structure
    switch (pattern) {
      case 'Double Bottom': keyframes = [80, 20, 50, 20, 60]; break;
      case 'Double Top': keyframes = [20, 80, 50, 80, 40]; break;
      case 'Bull Flag': keyframes = [20, 80, 70, 75, 65, 70]; break;
      case 'Bear Flag': keyframes = [80, 20, 30, 25, 35, 30]; break;
      case 'Head & Shoulders': keyframes = [30, 50, 40, 80, 40, 50, 30]; break;
      case 'Inv. Head & Shoulders': keyframes = [70, 50, 60, 20, 60, 50, 70]; break;
      case 'Ascending Triangle': keyframes = [20, 80, 40, 80, 60, 80, 70]; break;
      case 'Descending Triangle': keyframes = [80, 20, 60, 20, 40, 20, 30]; break;
      case 'Hammer Reversal': keyframes = [80, 60, 40, 20, 25]; break; // Logic handled in candle generation
      case 'Shooting Star': keyframes = [20, 40, 60, 80, 75]; break; // Logic handled in candle generation
      default: keyframes = [50, 50];
    }

    const data: any[] = [];
    const pointsPerSegment = 5;
    const noise = 2;
    let lastClose = keyframes[0];

    for (let i = 0; i < keyframes.length - 1; i++) {
      const start = keyframes[i];
      const end = keyframes[i+1];
      for (let j = 0; j < pointsPerSegment; j++) {
        const progress = j / pointsPerSegment;
        const target = start + (end - start) * progress;
        
        let open = lastClose;
        let close = target + (Math.random() - 0.5) * noise;
        
        // Specific candle override for single candle patterns at the end
        if (i === keyframes.length - 2 && j === pointsPerSegment - 1) {
           if (pattern === 'Hammer Reversal') {
             close = open + 2; // Small body up
             // Deep low
             var high = Math.max(open, close) + 1;
             var low = Math.min(open, close) - 15; // Long lower wick
           } else if (pattern === 'Shooting Star') {
             close = open - 2; // Small body down
             var high = Math.max(open, close) + 15; // Long upper wick
             var low = Math.min(open, close) - 1;
           } else {
             var high = Math.max(open, close) + Math.random() * noise;
             var low = Math.min(open, close) - Math.random() * noise;
           }
        } else {
           var high = Math.max(open, close) + Math.random() * noise;
           var low = Math.min(open, close) - Math.random() * noise;
        }

        data.push({ index: data.length, open, close, high, low, range: [open, close] });
        lastClose = close;
      }
    }
    return data;
  }, []);

  const startRound = useCallback(() => {
    const randomLevel = LEVELS[Math.floor(Math.random() * LEVELS.length)];
    setCurrentLevel(randomLevel);
    setChartData(generateChartData(randomLevel.pattern));
    setGameState('PLAYING');
    setFeedback('');
  }, [generateChartData]);

  useEffect(() => {
    startRound();
  }, [startRound]);

  const handleGuess = (guess: Direction) => {
    if (gameState !== 'PLAYING') return;

    if (guess === currentLevel.direction) {
      setGameState('WON');
      setScore(s => s + 100);
      setStreak(s => s + 1);
      setFeedback(`Correct! The ${currentLevel.pattern} is a ${currentLevel.direction === 'BUY' ? 'Bullish' : 'Bearish'} signal. ${currentLevel.description}`);
    } else {
      setGameState('LOST');
      setStreak(0);
      setFeedback(`Incorrect. You chose ${guess}, but this is a ${currentLevel.pattern}, which signals ${currentLevel.direction}. ${currentLevel.description}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in p-2 md:p-4 pb-20">
      {/* Header */}
      <div className="bg-slate-900/80 p-6 rounded-[32px] border border-slate-800 flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Price Action Reflex</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Read the raw candles</p>
          </div>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-black">Score</p>
            <p className="text-2xl text-white font-mono font-black">{score}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-black">Streak</p>
            <p className="text-2xl text-emerald-500 font-mono font-black">{streak}</p>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative bg-trade-card rounded-[40px] border border-slate-800 p-8 h-[500px] shadow-2xl overflow-hidden flex flex-col">
        <div className="flex-1 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
              <XAxis dataKey="index" hide />
              <YAxis domain={['auto', 'auto']} hide />
              <Bar dataKey="range" shape={<CandlestickShape />} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Controls */}
        <div className="mt-8 grid grid-cols-2 gap-6 relative z-20">
          <button 
            onClick={() => handleGuess('BUY')}
            disabled={gameState !== 'PLAYING'}
            className="group py-6 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/50 hover:bg-emerald-500 hover:border-emerald-500 text-emerald-500 hover:text-white transition-all shadow-lg active:scale-95 flex flex-col items-center justify-center gap-2"
          >
            <TrendingUp size={32} />
            <span className="text-lg font-black uppercase tracking-widest">BUY</span>
          </button>
          <button 
            onClick={() => handleGuess('SELL')}
            disabled={gameState !== 'PLAYING'}
            className="group py-6 rounded-3xl bg-rose-500/10 border-2 border-rose-500/50 hover:bg-rose-500 hover:border-rose-500 text-rose-500 hover:text-white transition-all shadow-lg active:scale-95 flex flex-col items-center justify-center gap-2"
          >
            <TrendingDown size={32} />
            <span className="text-lg font-black uppercase tracking-widest">SELL</span>
          </button>
        </div>

        {/* Result Overlay */}
        {gameState !== 'PLAYING' && (
          <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex items-center justify-center p-8 animate-fade-in">
            <div className={`w-full max-w-lg bg-trade-card border p-8 rounded-[40px] shadow-2xl text-center transform animate-scale-up ${gameState === 'WON' ? 'border-emerald-500/50' : 'border-rose-500/50'}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${gameState === 'WON' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                {gameState === 'WON' ? <Trophy size={40} /> : <AlertTriangle size={40} />}
              </div>
              
              <h3 className={`text-3xl font-black uppercase tracking-tight mb-2 ${gameState === 'WON' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {gameState === 'WON' ? 'Trade Executed' : 'Stop Loss Hit'}
              </h3>
              
              <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 mb-8 text-left">
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {feedback}
                </p>
              </div>

              <button 
                onClick={startRound}
                className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                <RotateCcw size={18} /> Next Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
