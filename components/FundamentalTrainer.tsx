
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Newspaper, TrendingUp, TrendingDown, Info, ArrowRight, 
  Globe, Zap, BarChart2, CheckCircle2, XCircle, RefreshCw,
  Landmark, Briefcase, ShoppingCart
} from 'lucide-react';

interface Scenario {
  id: number;
  category: 'Economic' | 'Political' | 'Central Bank';
  pair: string;
  headline: string;
  impact: 'Bullish' | 'Bearish';
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    category: 'Economic',
    pair: 'USD/JPY',
    headline: "US Non-Farm Payrolls (NFP) report shows 350k jobs added vs 180k expected. Unemployment rate drops to 3.5%.",
    impact: 'Bullish',
    explanation: "Higher employment growth signals a strong economy, making it more likely for the Fed to raise or maintain high interest rates, which strengthens the USD."
  },
  {
    id: 2,
    category: 'Central Bank',
    pair: 'EUR/USD',
    headline: "ECB President announces a surprise 0.5% interest rate hike to combat rising Eurozone inflation.",
    impact: 'Bullish',
    explanation: "Increasing interest rates typically attracts foreign investment looking for higher yields, increasing demand for the Euro."
  },
  {
    id: 3,
    category: 'Political',
    pair: 'GBP/USD',
    headline: "UK Prime Minister announces a snap election amid widespread cabinet resignations and economic uncertainty.",
    impact: 'Bearish',
    explanation: "Political instability and uncertainty generally lead to capital flight as investors seek safer assets, causing the currency to weaken."
  },
  {
    id: 4,
    category: 'Economic',
    pair: 'AUD/USD',
    headline: "China's Manufacturing PMI falls to 47.0, indicating a significant contraction in the world's second-largest economy.",
    impact: 'Bearish',
    explanation: "Australia is a major commodity exporter to China. When Chinese manufacturing slows, demand for Australian resources drops, weakening the AUD."
  },
  {
    id: 5,
    category: 'Economic',
    pair: 'USD/CAD',
    headline: "OPEC announces a surprise production cut of 1 million barrels per day; Crude Oil prices surge 5%.",
    impact: 'Bearish', // Impact on USD/CAD means CAD strengthens, so pair goes down
    explanation: "Canada is a major oil exporter. Rising oil prices strengthen the Canadian Dollar. Since CAD is the quote currency in USD/CAD, the pair moves lower."
  },
  {
    id: 6,
    category: 'Economic',
    pair: 'USD/JPY',
    headline: "US CPI (Inflation) data comes in lower than expected at 2.9% annually, vs 3.2% consensus.",
    impact: 'Bearish',
    explanation: "Lower inflation reduces the pressure on the Federal Reserve to keep interest rates high, making the USD less attractive to yield-seekers."
  },
  {
    id: 7,
    category: 'Central Bank',
    pair: 'USD/JPY',
    headline: "Bank of Japan (BoJ) Governor reaffirms commitment to 'Yield Curve Control' and negative interest rates despite global inflation.",
    impact: 'Bullish', // Impact on USD/JPY (JPY weakens, pair goes up)
    explanation: "Persistent low rates in Japan while other countries raise rates leads to a 'carry trade' where investors sell Yen to buy higher-yielding currencies."
  },
  {
    id: 8,
    category: 'Economic',
    pair: 'EUR/USD',
    headline: "German GDP contracts by 0.3% in Q3, confirming a technical recession in Europe's largest economy.",
    impact: 'Bearish',
    explanation: "A recession in Germany weighs heavily on the Eurozone economy, reducing demand for the Euro."
  },
  {
    id: 9,
    category: 'Central Bank',
    pair: 'GBP/USD',
    headline: "Bank of England Governor Bailey states that inflation has peaked and rate cuts may be on the table sooner than expected.",
    impact: 'Bearish',
    explanation: "Dovish comments regarding rate cuts reduce the yield appeal of the GBP, causing it to weaken against the USD."
  },
  {
    id: 10,
    category: 'Economic',
    pair: 'XAU/USD',
    headline: "Global stock markets crash 5% intraday due to fears of a banking crisis.",
    impact: 'Bullish',
    explanation: "Gold is a safe-haven asset. During financial panic and stock market crashes, investors flock to Gold, driving up XAU/USD."
  },
  {
    id: 11,
    category: 'Economic',
    pair: 'USD/CAD',
    headline: "Canada's Consumer Price Index (CPI) rises to 4.5% vs 3.8% expected.",
    impact: 'Bearish',
    explanation: "Higher inflation forces the Bank of Canada to be more hawkish (raise rates). Stronger CAD pushes USD/CAD down."
  },
  {
    id: 12,
    category: 'Political',
    pair: 'USD/JPY',
    headline: "Japanese Ministry of Finance official warns they are 'ready to intervene' in FX markets if Yen weakness continues.",
    impact: 'Bearish',
    explanation: "Verbal intervention scares speculators selling the Yen. The threat of buying JPY strengthens it, pulling USD/JPY down."
  },
  {
    id: 13,
    category: 'Economic',
    pair: 'AUD/USD',
    headline: "Australia's employment change shows -15k jobs vs +20k expected.",
    impact: 'Bearish',
    explanation: "Job losses signal a weakening economy, making it less likely the RBA will raise rates, weakening the AUD."
  },
  {
    id: 14,
    category: 'Central Bank',
    pair: 'USD/CHF',
    headline: "Swiss National Bank unexpectedly cuts interest rates by 25bps.",
    impact: 'Bullish',
    explanation: "Lower interest rates in Switzerland weaken the Franc (CHF). Since CHF is the quote currency, USD/CHF rises."
  },
  {
    id: 15,
    category: 'Economic',
    pair: 'USD', // General USD strength
    headline: "US Retail Sales jump 1.2% MoM vs 0.4% estimated, showing strong consumer demand.",
    impact: 'Bullish',
    explanation: "Strong consumption fuels GDP and inflation, supporting a hawkish Fed stance and a stronger Dollar."
  },
  {
    id: 16,
    category: 'Economic',
    pair: 'NZD/USD',
    headline: "Global Dairy Trade price index falls 4.5% in latest auction.",
    impact: 'Bearish',
    explanation: "Dairy is New Zealand's largest export. Falling prices reduce export revenue, weakening the NZD."
  },
  {
    id: 17,
    category: 'Central Bank',
    pair: 'EUR/USD',
    headline: "ECB Minutes reveal majority of members favor a 50bps hike at the next meeting.",
    impact: 'Bullish',
    explanation: "Hawkish minutes indicating larger rate hikes increase the yield appeal of the Euro."
  },
  {
    id: 18,
    category: 'Political',
    pair: 'EUR/GBP',
    headline: "UK announces a new comprehensive trade deal with India, boosting economic outlook post-Brexit.",
    impact: 'Bearish',
    explanation: "Positive trade news strengthens the GBP. In EUR/GBP, a stronger Pound pushes the pair lower."
  },
  {
    id: 19,
    category: 'Economic',
    pair: 'USD/JPY',
    headline: "US 10-Year Treasury Yields surge above 4.5% following hawkish Fed comments.",
    impact: 'Bullish',
    explanation: "USD/JPY is highly correlated with US bond yields. Higher US yields attract capital from Japan, lifting the pair."
  },
  {
    id: 20,
    category: 'Economic',
    pair: 'GBP/USD',
    headline: "UK CPI comes in at 2.1%, hitting the BoE's target faster than anticipated.",
    impact: 'Bearish',
    explanation: "Inflation hitting target removes pressure on the BoE to keep rates high, leading to potential rate cuts and weaker GBP."
  },
  {
    id: 21,
    category: 'Economic',
    pair: 'USD/CAD',
    headline: "Canadian GDP is flat (0.0%) for the month, missing the 0.2% growth forecast.",
    impact: 'Bullish',
    explanation: "Economic stagnation weakens the CAD. A weaker CAD causes USD/CAD to rise."
  },
  {
    id: 22,
    category: 'Central Bank',
    pair: 'AUD/USD',
    headline: "RBA Meeting Minutes show the board considered a pause in rate hikes.",
    impact: 'Bearish',
    explanation: "Consideration of a pause is a dovish signal, reducing the yield advantage of the AUD."
  },
  {
    id: 23,
    category: 'Economic',
    pair: 'XAU/USD',
    headline: "US Dollar Index (DXY) drops significantly as 'soft landing' hopes increase.",
    impact: 'Bullish',
    explanation: "Gold is priced in Dollars. When the Dollar weakens, Gold becomes cheaper for foreign buyers, increasing demand and price."
  },
  {
    id: 24,
    category: 'Economic',
    pair: 'EUR/USD',
    headline: "Eurozone Purchasing Managers' Index (PMI) hits 54.2, signalling expansion.",
    impact: 'Bullish',
    explanation: "PMI above 50 indicates expansion. Strong business activity boosts confidence in the Euro."
  },
  {
    id: 25,
    category: 'Political',
    pair: 'USD/CAD',
    headline: "Geopolitical tensions escalate in the Strait of Hormuz, threatening oil supply.",
    impact: 'Bearish',
    explanation: "Supply threats boost Oil prices. Higher oil prices strengthen the CAD (a petro-currency), pushing USD/CAD down."
  },
  {
    id: 26,
    category: 'Economic',
    pair: 'USD/CHF',
    headline: "Swiss CPI rises surprisingly to 3.2%, putting pressure on SNB to hike.",
    impact: 'Bearish',
    explanation: "Higher inflation forces the SNB to raise rates, strengthening the Franc and pushing USD/CHF down."
  },
  {
    id: 27,
    category: 'Economic',
    pair: 'GBP/USD',
    headline: "UK Average Earnings excluding bonuses rise by 7.0%, fueling wage-price spiral fears.",
    impact: 'Bullish',
    explanation: "Rapid wage growth implies persistent inflation, forcing the BoE to keep interest rates higher for longer."
  },
  {
    id: 28,
    category: 'Economic',
    pair: 'USD/JPY',
    headline: "Japan's Tankan Large Manufacturing Index turns positive for the first time in 3 quarters.",
    impact: 'Bearish',
    explanation: "Positive economic sentiment in Japan supports the Yen, exerting downward pressure on USD/JPY."
  },
  {
    id: 29,
    category: 'Central Bank',
    pair: 'USD',
    headline: "Fed Chair Powell testifies to Congress, emphasizing 'higher for longer' rates.",
    impact: 'Bullish',
    explanation: "Reaffirming a high-rate environment supports the USD against lower-yielding currencies."
  },
  {
    id: 30,
    category: 'Economic',
    pair: 'NZD/USD',
    headline: "New Zealand Q2 GDP grows 0.9% vs 0.5% expected.",
    impact: 'Bullish',
    explanation: "Stronger than expected economic growth supports the NZD."
  },
  {
    id: 31,
    category: 'Economic',
    pair: 'EUR/USD',
    headline: "German IFO Business Climate index falls to lowest level since 2020.",
    impact: 'Bearish',
    explanation: "Pessimism in the German business sector weighs heavily on the Euro."
  },
  {
    id: 32,
    category: 'Political',
    pair: 'AUD/USD',
    headline: "US imposes new tariffs on Chinese tech imports, sparking trade war fears.",
    impact: 'Bearish',
    explanation: "Australia is economically linked to China. Trade wars hurt China's economy, indirectly dragging down the AUD."
  },
  {
    id: 33,
    category: 'Economic',
    pair: 'USD/CAD',
    headline: "Canada adds 60k full-time jobs, unemployment drops to 5.0%.",
    impact: 'Bearish',
    explanation: "Strong labor market data strengthens the CAD, pushing USD/CAD lower."
  },
  {
    id: 34,
    category: 'Central Bank',
    pair: 'EUR/JPY',
    headline: "BoJ leaves policy unchanged but removes 'dovish forward guidance' from statement.",
    impact: 'Bearish',
    explanation: "Removing dovish guidance hints at future tightening, strengthening the Yen and pulling cross-pairs down."
  },
  {
    id: 35,
    category: 'Economic',
    pair: 'XAU/USD',
    headline: "US Core PCE (Fed's favorite inflation gauge) rises 0.4% MoM, hotter than expected.",
    impact: 'Bearish',
    explanation: "High inflation keeps the Fed hawkish (raising rates). Higher rates hurt non-yielding assets like Gold."
  },
  {
    id: 36,
    category: 'Economic',
    pair: 'GBP/USD',
    headline: "UK Construction PMI falls into contraction territory (48.0).",
    impact: 'Bearish',
    explanation: "Contraction in the construction sector signals economic weakness, weighing on the GBP."
  },
  {
    id: 37,
    category: 'Economic',
    pair: 'USD/ZAR', // Using typical EM pair logic
    headline: "South Africa implements stage 6 loadshedding (power cuts), crippling mining output.",
    impact: 'Bullish', // USD/ZAR goes UP
    explanation: "Power cuts harm the economy and mining exports, weakening the Rand (ZAR) significantly against the Dollar."
  },
  {
    id: 38,
    category: 'Central Bank',
    pair: 'USD',
    headline: "FOMC Dot Plot shows median rate expectation rising to 5.6%.",
    impact: 'Bullish',
    explanation: "The Dot Plot indicates policymakers expect higher rates than previously thought, boosting USD."
  },
  {
    id: 39,
    category: 'Economic',
    pair: 'AUD/USD',
    headline: "Iron Ore prices slump 10% on weak Chinese housing data.",
    impact: 'Bearish',
    explanation: "Iron Ore is Australia's top export. A price crash reduces demand for AUD."
  },
  {
    id: 40,
    category: 'Economic',
    pair: 'EUR/USD',
    headline: "France Inflation harmonized rises to 6.2%, beating expectations.",
    impact: 'Bullish',
    explanation: "Rising inflation in the Eurozone's second-largest economy pressures the ECB to hike rates, supporting EUR."
  },
  {
    id: 41,
    category: 'Political',
    pair: 'GBP/USD',
    headline: "Scottish referendum for independence is blocked by Supreme Court, stabilizing political outlook.",
    impact: 'Bullish',
    explanation: "The removal of breakup risk provides political stability, which is positive for the GBP."
  },
  {
    id: 42,
    category: 'Economic',
    pair: 'USD/JPY',
    headline: "Tokyo CPI data shows inflation slowing down to 1.8%.",
    impact: 'Bullish',
    explanation: "Slowing inflation allows the BoJ to keep rates low/negative, weakening the Yen further against the USD."
  },
  {
    id: 43,
    category: 'Economic',
    pair: 'USD/CAD',
    headline: "Building Permits in Canada plunge 12% MoM.",
    impact: 'Bullish',
    explanation: "A crash in building permits indicates a slowing housing market and economy, weakening the CAD."
  },
  {
    id: 44,
    category: 'Central Bank',
    pair: 'EUR/USD',
    headline: "ECB President Lagarde states 'We are not pausing', signaling more hikes.",
    impact: 'Bullish',
    explanation: "Direct confirmation of future rate hikes acts as a strong catalyst for Euro strength."
  },
  {
    id: 45,
    category: 'Economic',
    pair: 'USD',
    headline: "US ISM Manufacturing PMI 46.0, signaling deeper contraction.",
    impact: 'Bearish',
    explanation: "Recessionary signals in manufacturing weigh on the USD as investors bet on Fed rate cuts."
  },
  {
    id: 46,
    category: 'Economic',
    pair: 'XAU/USD',
    headline: "Central Bank of China increases gold reserves for the 10th consecutive month.",
    impact: 'Bullish',
    explanation: "Consistent buying by major central banks increases physical demand for Gold, supporting prices."
  },
  {
    id: 47,
    category: 'Political',
    pair: 'EUR/USD',
    headline: "Far-right party wins election in major EU economy, threatening EU unity.",
    impact: 'Bearish',
    explanation: "Political fragmentation risks in the EU typically cause the Euro to weaken due to uncertainty."
  },
  {
    id: 48,
    category: 'Economic',
    pair: 'GBP/USD',
    headline: "UK Retail Consortium reports strongest sales growth in 2 years.",
    impact: 'Bullish',
    explanation: "Strong consumer spending supports GDP growth and a stronger Pound."
  },
  {
    id: 49,
    category: 'Central Bank',
    pair: 'NZD/USD',
    headline: "RBNZ surprises with a 50bps hike when 25bps was expected.",
    impact: 'Bullish',
    explanation: "A larger-than-expected rate hike provides a significant immediate boost to the currency."
  },
  {
    id: 50,
    category: 'Economic',
    pair: 'USD/JPY',
    headline: "Japan's GDP revised up to 1.5% annualized growth.",
    impact: 'Bearish',
    explanation: "Stronger growth makes the Japanese economy more attractive, strengthening the Yen (USD/JPY down)."
  }
];

export const FundamentalTrainer: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<'Bullish' | 'Bearish' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);

  const scenario = SCENARIOS[currentIdx];
  const isCorrect = selected === scenario.impact;

  const handleChoice = (choice: 'Bullish' | 'Bearish') => {
    if (selected) return;
    setSelected(choice);
    setShowExplanation(true);
    setTotal(t => t + 1);
    if (choice === scenario.impact) {
      setScore(s => s + 1);
      setStreak(st => st + 1);
    } else {
      setStreak(0);
    }
  };

  const nextScenario = () => {
    setSelected(null);
    setShowExplanation(false);
    setCurrentIdx((prev) => (prev + 1) % SCENARIOS.length);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Economic': return <BarChart2 size={16} />;
      case 'Political': return <Globe size={16} />;
      case 'Central Bank': return <Landmark size={16} />;
      default: return <Newspaper size={16} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in p-2 md:p-4">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-trade-card p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Zap size={20} /></div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase">Intelligence Score</p>
              <p className="text-xl font-black text-white">{total === 0 ? '0%' : Math.round((score/total)*100)+'%'}</p>
            </div>
          </div>
        </div>
        <div className="bg-trade-card p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><TrendingUp size={20} /></div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase">Current Streak</p>
              <p className="text-xl font-black text-white">{streak}</p>
            </div>
          </div>
        </div>
        <div className="bg-trade-card p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Globe size={20} /></div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase">Progress</p>
              <p className="text-xl font-black text-white">{currentIdx + 1} / {SCENARIOS.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Terminal */}
      <div className="bg-trade-card rounded-[40px] border border-slate-700 shadow-2xl overflow-hidden flex flex-col min-h-[500px] relative">
        {/* Ticker Tape */}
        <div className="bg-slate-900 border-b border-slate-800 p-3 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-[ticker_30s_linear_infinite] text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
            LIVE NEWS FEED: US NFP EXPECTED 200K • GOLD HITS ALL-TIME HIGH • ECB TO ADDRESS RATE DECISION AT 13:45 UTC • OIL PRICES STABILIZE • CHINA GDP DATA PENDING •
          </div>
        </div>

        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
             <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-black text-trade-primary uppercase tracking-widest flex items-center gap-1.5">
               {getCategoryIcon(scenario.category)} {scenario.category}
             </span>
             <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               Market: {scenario.pair}
             </span>
          </div>

          <div className="relative mb-12 group">
             <div className="absolute -inset-4 bg-blue-500/5 rounded-3xl blur-xl group-hover:bg-blue-500/10 transition-all"></div>
             <h2 className="text-2xl md:text-3xl font-black text-white leading-tight relative z-10 italic font-serif">
               "{scenario.headline}"
             </h2>
          </div>

          {!selected ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto w-full">
              <button 
                onClick={() => handleChoice('Bullish')}
                className="group relative bg-emerald-500 hover:bg-emerald-600 text-white p-6 rounded-2xl flex flex-col items-center gap-2 transition-all shadow-lg active:scale-95"
              >
                <TrendingUp size={32} />
                <div className="text-center">
                  <p className="font-black uppercase tracking-widest text-sm">Bullish / Buy</p>
                  <p className="text-[10px] opacity-70">Price likely to increase</p>
                </div>
              </button>
              <button 
                onClick={() => handleChoice('Bearish')}
                className="group relative bg-rose-500 hover:bg-rose-600 text-white p-6 rounded-2xl flex flex-col items-center gap-2 transition-all shadow-lg active:scale-95"
              >
                <TrendingDown size={32} />
                <div className="text-center">
                  <p className="font-black uppercase tracking-widest text-sm">Bearish / Sell</p>
                  <p className="text-[10px] opacity-70">Price likely to decrease</p>
                </div>
              </button>
            </div>
          ) : (
            <div className="animate-scale-up space-y-6 max-w-2xl mx-auto">
              <div className={`p-6 rounded-3xl border-2 flex items-center gap-4 text-left ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-rose-500/10 border-rose-500/50 text-rose-400'}`}>
                {isCorrect ? <CheckCircle2 size={40} className="shrink-0" /> : <XCircle size={40} className="shrink-0" />}
                <div>
                  <h4 className="font-black uppercase tracking-wider text-lg">{isCorrect ? 'Correct Analysis' : 'Incorrect Assessment'}</h4>
                  <p className="text-sm opacity-80">This news event is fundamentally <span className="font-bold">{scenario.impact}</span> for {scenario.pair}.</p>
                </div>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 text-left">
                <h5 className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2"><Info size={14} /> Intelligence Debrief</h5>
                <p className="text-slate-300 text-sm leading-relaxed">{scenario.explanation}</p>
              </div>

              <button 
                onClick={nextScenario}
                className="bg-trade-primary hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest w-full md:w-auto transition-all flex items-center justify-center gap-2 mx-auto"
              >
                Next Intelligence Report <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-800/50 p-6 text-center border-t border-slate-700">
          <p className="text-xs text-slate-500">
            Analysis based on standard economic theory. Real market movements can be affected by "Pricing in", "Buy the rumor, Sell the news", and central bank sentiment.
          </p>
        </div>
      </div>

      {/* Glossary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-trade-card p-6 rounded-3xl border border-slate-700">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
            <Briefcase size={16} className="text-trade-primary" /> Key Indicators
          </h4>
          <ul className="space-y-3">
             <li className="flex justify-between items-center text-xs">
               <span className="text-slate-400">Interest Rates</span>
               <span className="text-emerald-400 font-bold">Primary Driver</span>
             </li>
             <li className="flex justify-between items-center text-xs">
               <span className="text-slate-400">GDP (Growth)</span>
               <span className="text-slate-200">Economic Health</span>
             </li>
             <li className="flex justify-between items-center text-xs">
               <span className="text-slate-400">CPI (Inflation)</span>
               <span className="text-slate-200">Purchasing Power</span>
             </li>
          </ul>
        </div>
        <div className="bg-trade-card p-6 rounded-3xl border border-slate-700">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
            <Landmark size={16} className="text-trade-primary" /> Central Banks
          </h4>
          <div className="flex flex-wrap gap-2">
            {['FED (USD)', 'ECB (EUR)', 'BoE (GBP)', 'BoJ (JPY)', 'RBA (AUD)'].map(bank => (
              <span key={bank} className="px-3 py-1 bg-slate-800 rounded-full text-[10px] text-slate-400 border border-slate-700">{bank}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};
