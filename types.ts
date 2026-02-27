

export type VisualType =
  | 'NONE'
  | 'M1_THREE_PILLARS'
  | 'M1_MINDSET_VS'
  | 'M1_PROFIT_MECHANICS'
  | 'M1_ECOSYSTEM_PYRAMID'
  | 'M1_TRADER_TYPES'
  | 'M1_SUCCESS_REALITY'
  | 'M3_EXECUTION_MISTAKES'
  | 'M3_GOLD_LOT_TABLE'
  | 'M4_TIME_NESTING'
  | 'M4_SR_ZONES'
  | 'M4_IMPULSE_WAVE'
  | 'M4_CLEAN_CHART_COMPARE'
  | 'M4_CANDLE_ANATOMY'
  | 'CANDLE_FORMATION_STEPS'
  | 'M5_RISK_RULE'
  | 'M5_STOP_LOSS'
  | 'M5_RR_RATIO'
  | 'M5_DRAWDOWN_MATH'
  | 'MARKET_STRUCTURE_ADV'
  | 'MARKET_CYCLE_STEPS'
  | 'INDICATOR_CONFIRMATION'
  | 'STRATEGY_RULES'
  | 'ENTRY_FLOW_STEPS'
  | 'TRADE_MANAGEMENT'
  | 'EMOTION_CYCLE'
  | 'PERFORMANCE_METRICS'
  | 'CORRELATION_MATRIX'
  | 'EQUITY_CURVE'
  | 'PLAYBOOK_CHECKLIST'
  | 'BACKTEST_RESULTS'
  | 'IDENTITY_PYRAMID'
  | 'SCALING_PLAN'
  | 'INSTRUMENT_SELECTOR'
  | 'CANDLE_ANATOMY'
  | 'SUPPORT_RESISTANCE'
  | 'TREND_MAP'
  | 'RISK_PIE'
  | 'FIBONACCI'
  | 'GLOBE'
  | 'MARKET_ECOSYSTEM'
  | 'GAMBLER_VS_TRADER'
  | 'MARKET_VS_INSTRUMENT'
  | 'FOREX_TIERS'
  | 'INDICES_COMPOSITION'
  | 'COMMODITY_VOLATILITY'
  | 'CRYPTO_RISK_METER'
  | 'SESSION_TIMELINE'
  | 'PLATFORM_UI'
  | 'BROKER_FLOW'
  | 'DEMO_VS_LIVE'
  | 'BID_ASK_SPREAD'
  | 'ORDER_TYPES'
  | 'SL_TP_VISUAL'
  | 'LEVERAGE_VISUAL'
  | 'M4_CHART_HISTORY'
  | 'M4_WICK_VS_BODY'
  | 'M4_TREND_FLOW'
  | 'M4_RANGE_TRAP'
  | 'M5_RISK_CALCULATOR'
  | 'M5_LOSING_STREAK'
  | 'M5_POSITION_SIZE'
  | 'M6_STRUCTURE_MAP'
  | 'M6_HIGHS_LOWS'
  | 'M6_BOS_CONFIRMATION'
  | 'M6_CHOCH_PATTERN'
  | 'M6_TREND_VS_RANGE'
  | 'M6_LIQUIDITY_TRAP'
  | 'M7_INDICATOR_LAG'
  | 'M7_INDICATOR_CATEGORIES'
  | 'M7_MA_TREND_FILTER'
  | 'M7_RSI_MOMENTUM'
  | 'M7_ATR_VOLATILITY'
  | 'M7_CHART_CLUTTER'
  | 'M7_INDICATOR_FAILURE'
  | 'M8_STRATEGY_VS_SETUP'
  | 'M8_STRATEGY_COMPONENTS'
  | 'M8_MARKET_CONDITION_FILTER'
  | 'M8_ENTRY_MODEL_FLOW'
  | 'M8_STOP_LOSS_LOGIC'
  | 'M8_RISK_RULES'
  | 'M8_BACKTESTING_FLOW'
  | 'M9_MANAGEMENT_TIMELINE'
  | 'M9_ALLOWED_VS_FORBIDDEN'
  | 'M9_HANDS_OFF_MODE'
  | 'M9_TRAILING_STOP_VISUAL'
  | 'M9_SESSION_LIMITS'
  | 'M9_KILL_SWITCH_SIM'
  | 'M9_REVIEW_SCORECARD'
  | 'M9_IDENTITY_SEPARATION'
  | 'M10_EMOTION_CYCLE'
  | 'M10_REVENGE_TRADING'
  | 'M10_OVERTRADING_VISUAL'
  | 'M10_RULE_BREAKING'
  | 'M11_JOURNAL_TEMPLATE'
  | 'M11_METRICS_PRIORITY'
  | 'M11_WEEKLY_REVIEW'
  | 'M12_MULTI_TIMEFRAME'
  | 'M12_CORRELATIONS'
  | 'M13_EQUITY_CURVE'
  | 'M13_SCALING_PLAN'
  | 'M14_PLAYBOOK_CHECKLIST'
  | 'M15_BACKTEST_RESULTS'
  | 'M16_IDENTITY_PYRAMID'
  | 'M17_CAPITAL_SCALING';

export interface ContentSection {
  subtitle: string;
  english: string;
  amharic: string;
  visualType: VisualType;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionAmharic: string;
  options: string[];
  optionsAmharic: string[];
  correctIndex: number;
}

export interface Flashcard {
  id: number;
  front: string;
  frontAmharic: string;
  back: string;
  backAmharic: string;
}

export interface Chapter {
  id: number;
  title: string;
  titleAmharic: string;
  content: ContentSection[];
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
}

export interface User {
  id: string;
  name: string;
  identifier: string; // email or phone
  method: 'email' | 'phone';
  role: 'user' | 'admin';
  isPaid: boolean;
}

export interface UserProgress {
  completedChapters: number[];
  quizScores: Record<number, number>;
}

export interface TradePosition {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  lotSize: number;
  openTime: number;
}

export interface JournalEntry extends TradePosition {
  closePrice: number;
  closeTime: number;
  pnl: number;
  emotion: 'Calm' | 'Greedy' | 'Fearful' | 'Tilted';
  notes: string;
}

export interface GlobalUserData {
  [userId: string]: {
    user: User;
    progress: UserProgress;
    journal: JournalEntry[];
  };
}

export interface AppSnapshot {
  timestamp: number;
  version: string;
  label: string;
  data: {
    chapters: Chapter[];
    allUserData: GlobalUserData;
  };
}

export interface ForumReply {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: number;
  likes: number;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  category: 'Strategy' | 'Psychology' | 'Technical' | 'General';
  timestamp: number;
  likes: number;
  replies: ForumReply[];
}
