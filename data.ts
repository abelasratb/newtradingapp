

import { Chapter } from './types.ts';

export const courseData: Chapter[] = [
  // --- LEVEL 1: BEGINNER TRADER (FOUNDATIONS) ---
  {
    id: 1,
    title: "Module 1: Trading & Financial Markets 101",
    titleAmharic: "ክፍለ ትምህርት 1፡ የንግድ እና የፋይናንስ ገበያዎች 101",
    content: [
      {
        subtitle: "Lesson 1.1 — What Is Trading? / ትሬዲንግ ምንድነው?",
        english: "**Core Definition**\nTrading is the act of buying and selling financial instruments with the objective of profiting from price movement, while controlling downside risk. It is not about certainty; it is about managing uncertainty.\n\n**Three Pillars**\n1. **Risk Management**: Defining loss limits before entry.\n2. **Probability**: Accepting random individual outcomes.\n3. **Consistency**: Applying rules regardless of emotions.\n\n**What Trading Is NOT**\nIt is not predicting the future or getting rich quickly. A trader asks: 'Is this worth the risk?', not 'Will this win?'.",
        amharic: "**መሰረታዊ ትርጉም**\nትሬዲንግ ማለት አደጋን በመቆጣጠር ከዋጋ እንቅስቃሴ ትርፍ ለማግኘት የሚደረግ ግብይት ነው። ይህ ስለ እርግጠኝነት ሳይሆን እርግጠኛ አለመሆንን ስለማስተዳደር ነው።\n\n**ሶስት መሰረቶች**\n1. **የአደጋ አስተዳደር**: ከመግባትዎ በፊት ምን ያህል ሊያጡ እንደሚችሉ መወሰን።\n2. **ዕድል (Probability)**: የነጠላ ውጤቶች በዘፈቀደ መሆናቸውን መቀበል።\n3. **ወጥነት**: ስሜትን ወደጎን ትቶ ህጎችን መተግበር።\n\n**ትሬዲንግ ምን አይደለም?**\nወደፊት ምን እንደሚሆን መተንበይ ወይም በፍጥነት ሀብታም መሆን አይደለም።",
        visualType: "M1_THREE_PILLARS"
      },
      {
        subtitle: "Lesson 1.2 — Trading vs Gambling / ትሬዲንግ እና ቁማር",
        english: "**Why This Matters**\nThe difference is process, not intention.\n\n**Comparison**\n- **Trading**: Risk is defined. Losses are planned. Decisions follow rules. Capital preservation is prioritized.\n- **Gambling**: Risk is undefined. Losses trigger emotions. Decisions are impulsive. Capital is exposed.\n\n**Key Insight**\nOnly trading involves risk limits, repeatable rules, and long-term expectancy.",
        amharic: "**ልዩነቱ ምንድነው?**\nልዩነቱ በሂደቱ ላይ ነው።\n\n**ማወዳደሪያ**\n- **ትሬዲንግ**: አደጋው የታወቀ ነው። ኪሳራ የታቀደ ነው። ውሳኔዎች በህግ ይመራሉ። ዋናው ነገር ካፒታልን መጠበቅ ነው።\n- **ቁማር**: አደጋው አይታወቅም። ኪሳራ ስሜትን ይረብሻል። ውሳኔዎች በዘፈቀደ ናቸው።\n\n**ቁልፍ ነጥብ**\nትሬዲንግ የአደጋ ገደብ እና ተደጋጋሚ ህጎች አሉት።",
        visualType: "M1_MINDSET_VS"
      },
      {
        subtitle: "Lesson 1.3 — How Traders Make Money / ነጋዴዎች እንዴት ያተርፋሉ?",
        english: "**The Truth**\nTraders make money by losing small when wrong, winning more when right, and repeating consistently.\n\n**Why Price Moves**\nPrices move due to Supply/Demand and Liquidity. Retail traders do not move the market; they swim in the wake of institutions.\n\n**Short-Term vs Long-Term**\nShort-term moves are random. Long-term trends have structure. This is why prediction is unreliable, but risk management is essential.",
        amharic: "**እውነታው**\nነጋዴዎች የሚያተርፉት ሲሳሳቱ በትንሹ በመክሰር፣ ሲያገኙ በብዙ በማግኘት እና ይህንን በመደጋገም ነው።\n\n**ዋጋ ለምን ይንቀሳቀሳል?**\nበፍላጎት እና አቅርቦት። እኛ (ቸርቻሪዎች) ገበያውን ማዘዝ አንችልም፤ ትልልቅ ተቋማትን እንከተላለን።\n\n**የአጭር vs የረጅም ጊዜ**\nየአጭር ጊዜ እንቅስቃሴዎች በዘፈቀደ ናቸው። የረጅም ጊዜ ግን መዋቅር አላቸው።",
        visualType: "M1_PROFIT_MECHANICS"
      },
      {
        subtitle: "Lesson 1.4 — The Market Ecosystem (Sharks vs Fish) / የገበያ ተሳታፊዎች",
        english: "**1. The Interbank Market (The Sharks)**\n- **Who:** Central Banks (Fed, ECB) & Tier 1 Banks (JP Morgan, Citi).\n- **Role:** They transact in Billions. They *are* the market. They facilitate global trade.\n- **Example:** Toyota needs $500M to pay US suppliers. They transact via a bank, moving the price immediately.\n\n**2. Hedge Funds & Institutions (The Whales)**\n- **Who:** Pension Funds, Mutual Funds.\n- **Role:** They trade for profit over days/weeks. They create the **Trends** we follow.\n- **Example:** A fund buys €100M of EURUSD over 3 days, creating a steady uptrend.\n\n**3. Algorithms / HFT (The Machines)**\n- **Who:** Supercomputers near exchange servers.\n- **Role:** Scalping for 0.1 pips in milliseconds. They create liquidity but also 'noise'.\n- **Example:** NFP news drops. Algos buy in 0.005 seconds. You see the candle fly before you can click.\n\n**4. Retail Traders (The Fish - You)**\n- **Who:** Individuals ($100 - $1M accounts).\n- **Reality:** We have **Zero** pricing power. We are liquidity for the big players.\n- **Your Edge:** Agility. The Whales can't hide; we can track their footprints and swim alongside them.",
        amharic: "**1. የባንክ ገበያ (ሻርኮች)**\n- **እነማን ናቸው:** ማዕከላዊ ባንኮች እና ትልልቅ የንግድ ባንኮች (JP Morgan, Citi)።\n- **ሚና:** በቢሊዮኖች ይገበያያሉ። ገበያው እነሱ ናቸው።\n- **ምሳሌ:** Toyota 500 ሚሊዮን ዶላር ለመመንዘር ወደ ባንክ ይሄዳል። ይህ ዋጋን ወዲያውኑ ያንቀሳቅሳል።\n\n**2. ሄጅ ፈንዶች (አሳ ነባሪዎች)**\n- **እነማን ናቸው:** ለትርፍ የሚነግዱ ትልልቅ ተቋማት።\n- **ሚና:** የረጅም ጊዜ አዝማሚያዎችን (Trends) ይፈጥራሉ።\n- **ምሳሌ:** አንድ ተቋም 100 ሚሊዮን ዩሮ ለ 3 ቀናት ቀስ ብሎ ይገዛል፤ ይህ Uptrend ይፈጥራል።\n\n**3. አልጎሪዝም (ማሽኖች)**\n- **ሚና:** በሚሊ-ሰከንዶች ውስጥ ይገበያያሉ። ጫጫታ ይፈጥራሉ።\n- **ምሳሌ:** ዜና ሲወጣ ሮቦቶች ወዲያውኑ ገብተው ዋጋውን ያስወነጭፉታል።\n\n**4. ቸርቻሪ ነጋዴዎች (እኛ)**\n- **እነማን ናቸው:** እኛ ትናንሽ ነጋዴዎች።\n- **እውነታው:** ዋጋን ማንቀሳቀስ አንችልም።\n- **ጥቅም:** ፈጣን ነን። አሳ ነባሪዎቹ ሲንቀሳቀሱ ተከትለን መሄድ እንችላለን።",
        visualType: "M1_ECOSYSTEM_PYRAMID"
      },
      {
        subtitle: "Lesson 1.5 — Types of Traders / የነጋዴ አይነቶች",
        english: "1. **Scalpers**: Seconds/Minutes. High stress. Unforgiving.\n2. **Day Traders**: Open/Close same day. Routine-based.\n3. **Swing Traders**: Days/Weeks. Best for beginners.\n4. **Position Traders**: Weeks/Months. Macro trends.\n\n**Recommendation**\nBeginners should start as **Swing Traders**. Scalping is too fast and emotional for new traders.",
        amharic: "1. **Scalpers**: በደቂቃዎች ውስጥ። ከፍተኛ ውጥረት።\n2. **Day Traders**: በዚያው ቀን።\n3. **Swing Traders**: ቀናት/ሳምንታት። ለጀማሪዎች ይመከራል።\n4. **Position Traders**: ወራት።\n\n**ምክር**\nጀማሪዎች በ Swing Trading መጀመር አለባቸው።",
        visualType: "M1_TRADER_TYPES"
      },
      {
        subtitle: "Lesson 1.6 — Common Trading Myths / የተለመዱ የተሳሳቱ አመለካከቶች",
        english: "- **Myth 1**: High Win Rate = Profit. (False. Risk:Reward matters more.)\n- **Myth 2**: More Trades = More Money. (False. Overtrading kills accounts.)\n- **Myth 3**: Indicators Predict Price. (False. They only react.)\n- **Myth 4**: Small Accounts need Big Risk. (False. Build good habits first.)",
        amharic: "- **አፈታሪክ 1**: ማሸነፍ ብቻ በቂ ነው። (ውሸት። አደጋና ትርፍ ጥምርታ ይበልጣል።)\n- **አፈታሪክ 2**: ብዙ መገበያየት ጥሩ ነው። (ውሸት።)\n- **አፈታሪክ 3**: ጠቋሚዎች (Indicators) ዋጋን ይተነብያሉ። (ውሸት።)\n- **አፈታሪክ 4**: ትንሽ ገንዘብ ያለው ትልቅ ሪስክ መውሰድ አለበት። (ውሸት።)",
        visualType: "M3_EXECUTION_MISTAKES"
      },
      {
        subtitle: "Lesson 1.7 — Real Success / እውነተኛ ስኬት",
        english: "**What Success Looks Like**\nBoring execution, modest consistent gains, strict rules, and emotional neutrality. It is NOT constant excitement or 'all-in' bets.\n\n**Perspective**\nTrading is a process, not an event. Results emerge over time.",
        amharic: "**ስኬት ምን ይመስላል?**\nአሰልቺ ሊሆን ይችላል ግን ውጤቱ ቋሚ ነው። ስሜታዊ አለመሆን እና ህግን ማክበር የስኬት መልክ ነው። ቋሚ ደስታ እና ቁማር አይደለም።\n\n**አመለካከት**\nትሬዲንግ ሂደት ነው እንጂ ድንገተኛ ክስተት አይደለም።",
        visualType: "M1_SUCCESS_REALITY"
      }
    ],
    quiz: [
      { id: 1, question: "What is the primary objective of a professional trader?", questionAmharic: "የአንድ ባለሙያ ነጋዴ ዋና ዓላማ ምንድነው?", options: ["Predicting the future", "Profiting while controlling risk", "Being right every time", "Winning quickly"], optionsAmharic: ["ወደፊትን መተንበይ", "አደጋን እየተቆጣጠሩ ማተርፍ", "ሁሌም ልክ መሆን", "በፍጥነት ማሸነፍ"], correctIndex: 1 },
      { id: 2, question: "Which participant provides the most liquidity to the market?", questionAmharic: "ለገበያው ብዙ ገንዘብ (Liquidity) የሚያቀርበው ማን ነው?", options: ["Retail Traders", "Banks & Institutions", "Gamblers", "YouTube Gurus"], optionsAmharic: ["ቸርቻሪዎች", "ባንኮች እና ተቋማት", "ቁማርተኞች", "ዩቲዩብ ላይ ያሉ አስተማሪዎች"], correctIndex: 1 },
      { id: 3, question: "Why should beginners avoid scalping?", questionAmharic: "ጀማሪዎች ለምን ስካልፒንግን መተው አለባቸው?", options: ["It's too slow", "It requires high speed and emotional control", "It makes too much money", "It's easy"], optionsAmharic: ["በጣም ቀርፋፋ ስለሆነ", "ከፍተኛ ፍጥነት እና ስሜትን መቆጣጠር ስለሚጠይቅ", "በጣም ብዙ ገንዘብ ስለሚያስገኝ", "ቀላል ስለሆነ"], correctIndex: 1 },
      { id: 4, question: "What is the key difference between trading and gambling?", questionAmharic: "በትሬዲንግ እና በቁማር መካከል ያለው ዋና ልዩነት ምንድነው?", options: ["Luck factor", "Defined risk and rules", "The amount of money used", "The time of day"], optionsAmharic: ["የዕድል ጉዳይ", "የተወሰነ አደጋ እና ህግጋት", "የሚጠቀሙት ገንዘብ መጠን", "የቀኑ ሰዓት"], correctIndex: 1 },
      { id: 5, question: "Who are 'The Whales' in the market ecosystem?", questionAmharic: "በገበያ ስርአት ውስጥ 'አሳ ነባሪዎች' (Whales) እነማን ናቸው?", options: ["Individual traders", "Central Banks", "Hedge Funds & Institutions", "Algorithms"], optionsAmharic: ["ግለሰብ ነጋዴዎች", "ማዕከላዊ ባንኮች", "ሄጅ ፈንዶች እና ተቋማት", "አልጎሪዝም"], correctIndex: 2 },
      { id: 6, question: "What does 'Consistency' mean in trading?", questionAmharic: "በትሬዲንግ ውስጥ 'ወጥነት' (Consistency) ማለት ምን ማለት ነው?", options: ["Winning every trade", "Trading every hour", "Applying rules regardless of emotions", "Doubling money every month"], optionsAmharic: ["ሁሉንም ንግድ ማሸነፍ", "በየሰዓቱ መነገድ", "ስሜትን ወደጎን ትቶ ህጎችን መተግበር", "በየወሩ ገንዘብን እጥፍ ማድረግ"], correctIndex: 2 },
      { id: 7, question: "What creates price movement?", questionAmharic: "የዋጋ እንቅስቃሴን የሚፈጥረው ምንድነው?", options: ["Magic", "Supply, Demand, and Liquidity", "Retail traders clicking buy", "News reporters"], optionsAmharic: ["ማጂክ", "ፍላጎት፣ አቅርቦት እና ሊኩዊዲቲ", "ቸርቻሪዎች ሲገዙ", "የዜና አቅራቢዎች"], correctIndex: 1 },
      { id: 8, question: "Which timeframe is recommended for beginners?", questionAmharic: "ለጀማሪዎች የሚመከረው የግብይት ስልት የቱ ነው?", options: ["Scalping (Seconds)", "Swing Trading (Days/Weeks)", "HFT (Milliseconds)", "Position Trading (Years)"], optionsAmharic: ["ስካልፒንግ (ሰከንዶች)", "ስዊንግ (ቀናት/ሳምንታት)", "HFT (ሚሊሰከንዶች)", "ፖዚሽን (ዓመታት)"], correctIndex: 1 },
      { id: 9, question: "What is a common trading myth?", questionAmharic: "የተለመደ የተሳሳተ የንግድ አመለካከት የቱ ነው?", options: ["Risk management is key", "Institutions move the market", "High win rate equals profit", "Losses are part of the game"], optionsAmharic: ["የአደጋ አስተዳደር ወሳኝ ነው", "ተቋማት ገበያውን ያንቀሳቅሳሉ", "ማሸነፍ ብቻ ለትርፍ በቂ ነው", "ኪሳራ የጨዋታው አካል ነው"], correctIndex: 2 },
      { id: 10, question: "What does real trading success look like?", questionAmharic: "እውነተኛ የንግድ ስኬት ምን ይመስላል?", options: ["Excitement and fast cars", "Boring, consistent execution", "Winning the lottery", "Predicting every candle"], optionsAmharic: ["ደስታ እና ፈጣን መኪናዎች", "አሰልቺ እና ወጥ የሆነ ትግበራ", "ሎተሪ ማሸነፍ", "ሁሉንም ሻማ መተንበይ"], correctIndex: 1 }
    ],
    flashcards: [
      { id: 1, front: "Probability", frontAmharic: "Probability", back: "Accepting that outcomes are random in the short term but predictable in the long term.", backAmharic: "የአጭር ጊዜ ውጤቶች በዘፈቀደ መሆናቸውን መቀበል።" },
      { id: 2, front: "Liquidity", frontAmharic: "Liquidity", back: "The availability of buyers and sellers in the market.", backAmharic: "የገዢዎች እና ሻጮች ብዛት በገበያው ውስጥ።" },
      { id: 3, front: "Edge", frontAmharic: "Edge", back: "A statistical advantage that plays out over many trades.", backAmharic: "በብዙ ንግዶች ሂደት ውስጥ የሚታይ የስታቲስቲክስ ብልጫ።" }
    ]
  },
  {
    id: 2,
    title: "Module 2: Market Types & Instruments",
    titleAmharic: "ክፍለ ትምህርት 2፡ የገበያ አይነቶች እና መሣሪያዎች",
    content: [
      {
        subtitle: "Lesson 2.1 — Markets vs Instruments / ገበያዎች እና መሣሪያዎች",
        english: "**Core Definitions**\n- **Market**: The environment (e.g., Forex, Stocks).\n- **Instrument**: The specific asset (e.g., EURUSD, Apple).\n\n**Why This Matters**\nBeginners often jump between many pairs in the 'Forex Market' without mastering any. Professionals specialize in **instruments**. You do not trade 'Forex'; you trade specific pairs like EURUSD.",
        amharic: "**መሰረታዊ ትርጉሞች**\n- **ገበያ (Market)**: አጠቃላይ አካባቢው (ለምሳሌ ፎሬክስ፣ አክሲዮን)።\n- **መሣሪያ (Instrument)**: የምንገበያየው ንብረት (ለምሳሌ EURUSD, ወርቅ)።\n\n**ለምን ይጠቅማል?**\nጀማሪዎች ብዙ አይነት መሣሪያዎችን ይሞክራሉ። ባለሙያዎች ግን በአንድ ወይም ሁለት መሣሪያ ላይ ስፔሻላይዝ ያደርጋሉ። 'ፎሬክስ'ን በጅምላ መገበያየት አይችሉም፤ የሚገበያዩት እንደ EURUSD ያሉ ተለይተው የታወቁ መሣሪያዎችን ነው።",
        visualType: "MARKET_VS_INSTRUMENT"
      },
      {
        subtitle: "Lesson 2.2 — The Forex Market / የፎሬክስ ገበያ",
        english: "**Categories of Pairs**\n1. **Majors**: Always include USD (EURUSD, GBPUSD). High liquidity, lower spreads. **Safe for beginners**.\n2. **Minors**: Major currencies without USD (EURGBP). Moderate volatility.\n3. **Exotics**: Emerging markets (USDTRY, ZARJPY). Wide spreads, erratic moves. **Avoid these**.",
        amharic: "**የጥንዶች ዓይነቶች**\n1. **Majors**: ሁሌም ዶላር (USD) ይይዛሉ። (EURUSD, GBPUSD)። ለጀማሪዎች ተመራጭ።\n2. **Minors**: ዶላር የሌለባቸው ዋና ገንዘቦች (EURGBP)።\n3. **Exotics**: አደገኛ እና ተለዋዋጭ (USDTRY)። እነዚህን ያስወግዱ።",
        visualType: "FOREX_TIERS"
      },
      {
        subtitle: "Lesson 2.3 — Indices / ኢንዴክሶች",
        english: "**What is an Index?**\nA basket of stocks representing a market sector. Instead of trading one company, you trade the whole economy.\n\n**Key Indices**\n- **US500 (S&P 500)**: The benchmark. Respects technicals well.\n- **US100 (NASDAQ)**: Tech-heavy, fast-moving.\n\n**Why Trade Indices?**\nThey trend cleaner than Forex and move specifically during market opens.",
        amharic: "**ኢንዴክስ ምንድን ነው?**\nየብዙ ኩባንያዎች ስብስብ። አንድን ኩባንያ ከመገበያየት ይልቅ የጠቅላላውን ኢኮኖሚ እንቅስቃሴ ይገበያያሉ።\n\n**ዋና ኢንዴክሶች**\n- **US500**: የአሜሪካ 500 ትልልቅ ኩባንያዎች።\n- **US100**: የቴክኖሎጂ ኩባንያዎች። ፈጣን እንቅስቃሴ አለው።",
        visualType: "INDICES_COMPOSITION"
      },
      {
        subtitle: "Lesson 2.4 — Commodities / ኮሞዲቲዎች (ወርቅ እና ነዳጅ)",
        english: "**Gold (XAUUSD)**\nHighly liquid, reacts to USD strength and fear. Volatile but respects structure. Great for specialization.\n\n**Oil (USOIL)**\nDriven by geopolitics and supply shocks. Can be very unpredictable. Better for observation than trading initially.",
        amharic: "**ወርቅ (XAUUSD)**\nከፍተኛ እንቅስቃሴ ያለው። ከዶላር ጋር ይያያዛል። ለስፔሻላይዜሽን ጥሩ ነው።\n\n**ነዳጅ (USOIL)**\nበፖለቲካ እና አቅርቦት ይወሰናል። ለጀማሪዎች አስቸጋሪ ሊሆን ይችላል።",
        visualType: "COMMODITY_VOLATILITY"
      },
      {
        subtitle: "Lesson 2.5 — Crypto / ክሪፕቶ",
        english: "**Reality Check**\nCrypto (BTC, ETH) trades 24/7. It is highly volatile and sentiment-driven. While profitable, it carries higher risk of gaps and manipulation. Treat it as optional exposure, not a foundation.",
        amharic: "**እውነታው**\nክሪፕቶ (BTC) 24/7 ይሰራል። በጣም ተለዋዋጭ ነው። ለጀማሪዎች እንደ ዋና መነሻ አይመከርም።",
        visualType: "CRYPTO_RISK_METER"
      },
      {
        subtitle: "Lesson 2.6 — Trading Sessions / የግብይት ሰዓታት",
        english: "**Timing Matters**\n- **Asian Session**: Slow, ranging. Good for patience.\n- **London Session**: High volume, trend starts.\n- **New York Session**: High volatility, news driven.\n\n**The Overlap**: London/New York overlap (1PM - 4PM GMT) creates the biggest moves.",
        amharic: "**ሰዓት ወሳኝ ነው**\n- **ኤዥያ**: ቀርፋፋ።\n- **ለንደን**: ከፍተኛ እንቅስቃሴ ይጀምራል።\n- **ኒውዮርክ**: በጣም ተለዋዋጭ።\n\n**Overlap**: የለንደን እና ኒውዮርክ መደራረብ ትልቁን እንቅስቃሴ ይፈጥራል።",
        visualType: "SESSION_TIMELINE"
      },
      {
        subtitle: "Lesson 2.7 — Choosing Your First Instrument / የመጀመሪያ መሣሪያ መምረጥ",
        english: "**The Professional Rule**\nMaster ONE instrument before adding another.\n\n**Recommended Start**\n1. **EURUSD**: Balanced, liquid, respects structure.\n2. **Gold (XAUUSD)**: Fast, respects zones, good for active traders.\n\n**Commitment**: Choose one. Ignore everything else for 3 months.",
        amharic: "**የባለሙያ ህግ**\nአንድ መሣሪያ ብቻ ይምረጡ።\n\n**ምርጫዎች**\n1. **EURUSD**: የተረጋጋ።\n2. **Gold**: ፈጣን።\n\n**ውሳኔ**: አንዱን መርጠው ለ 3 ወራት እሱ ላይ ብቻ ያተኩሩ።",
        visualType: "INSTRUMENT_SELECTOR"
      }
    ],
    quiz: [
      { id: 21, question: "Which pair category should beginners avoid?", questionAmharic: "ጀማሪዎች የትኛውን የጥንድ አይነት መራቅ አለባቸው?", options: ["Major Pairs", "Indices", "Exotic Pairs", "Commodities"], optionsAmharic: ["Major Pairs", "Indices", "Exotic Pairs", "Commodities"], correctIndex: 2 },
      { id: 22, question: "What does an Index (like US500) track?", questionAmharic: "ኢንዴክስ (US500) ምንን ይወክላል?", options: ["One specific company", "A basket of top companies", "Gold price", "The crypto market"], optionsAmharic: ["አንድ ኩባንያ", "የኩባንያዎች ስብስብ", "የወርቅ ዋጋ", "ክሪፕቶ ገበያ"], correctIndex: 1 },
      { id: 23, question: "When is the best time for high volatility?", questionAmharic: "ከፍተኛ እንቅስቃሴ የሚኖረው መቼ ነው?", options: ["Asian Session", "Weekend", "London/New York Overlap", "Lunch time"], optionsAmharic: ["ኤዥያ", "ቅዳሜና እሁድ", "ለንደን/ኒውዮርክ መደራረብ", "ምሳ ሰዓት"], correctIndex: 2 },
      { id: 24, question: "What characterizes a Major Pair?", questionAmharic: "ዋና (Major) ጥንድ በምን ይታወቃል?", options: ["Low volume", "High spread", "Includes USD and high liquidity", "Includes Turkish Lira"], optionsAmharic: ["ዝቅተኛ መጠን", "ከፍተኛ ስፕሬድ", "ዶላር (USD) እና ከፍተኛ እንቅስቃሴ አለው", "የቱርክ ሊራ ይዟል"], correctIndex: 2 },
      { id: 25, question: "Why is Gold (XAUUSD) popular?", questionAmharic: "ወርቅ (XAUUSD) ለምን ተወዳጅ ሆነ?", options: ["It never moves", "It is highly volatile and respects structure", "It is cheap", "It is only traded in London"], optionsAmharic: ["ጭራሽ አይንቀሳቀስም", "ተለዋዋጭ እና መዋቅር የሚያከብር ነው", "ርካሽ ነው", "ለንደን ብቻ ይሸጣል"], correctIndex: 1 },
      { id: 26, question: "What drives Oil prices the most?", questionAmharic: "የነዳጅ ዋጋን በዋናነት የሚወስነው ምንድነው?", options: ["Retail traders", "Geopolitics and Supply Shocks", "Apple stock price", "The weather in Tokyo"], optionsAmharic: ["ቸርቻሪዎች", "ፖለቲካ እና አቅርቦት መቆራረጥ", "የአፕል አክሲዮን", "የቶኪዮ የአየር ሁኔታ"], correctIndex: 1 },
      { id: 27, question: "Which session is known for consolidation?", questionAmharic: "ለማረጋጋት (Consolidation) የሚታወቀው የትኛው ሰዓት ነው?", options: ["New York Session", "Asian Session", "London Session", "Overlap"], optionsAmharic: ["ኒውዮርክ", "ኤዥያ", "ለንደን", "መደራረብ"], correctIndex: 1 },
      { id: 28, question: "Why should you focus on one instrument?", questionAmharic: "ለምን በአንድ መሣሪያ ላይ ማተኮር አለብዎት?", options: ["To make less money", "To avoid mastery", "To attain deep familiarity and edge", "Because it is boring"], optionsAmharic: ["ትንሽ ለማግኘት", "ክህሎትን ለማራቅ", "ጥልቅ እውቀት እና ብልጫ ለማግኘት", "አሰልቺ ስለሆነ"], correctIndex: 2 },
      { id: 29, question: "What is an Exotic pair risk?", questionAmharic: "የ Exotic ጥንድ አደጋ ምንድነው?", options: ["Low spreads", "Predictable movement", "High spreads and erratic moves", "Too much liquidity"], optionsAmharic: ["ዝቅተኛ ስፕሬድ", "ተገማች እንቅስቃሴ", "ከፍተኛ ስፕሬድ እና መዋዠቅ", "በጣም ብዙ ገንዘብ"], correctIndex: 2 },
      { id: 30, question: "Which instrument tracks the technology sector?", questionAmharic: "የቴክኖሎጂ ዘርፍን የሚወክለው የትኛው ነው?", options: ["US500", "US100 (NASDAQ)", "US30", "DE40"], optionsAmharic: ["US500", "US100 (NASDAQ)", "US30", "DE40"], correctIndex: 1 }
    ],
    flashcards: [
      { id: 21, front: "Major Pair", frontAmharic: "Major Pair", back: "A currency pair that includes the US Dollar (USD) and has high liquidity.", backAmharic: "የአሜሪካን ዶላር (USD) የያዘ እና በብዛት የሚገበያይ የገንዘብ ጥንድ።" },
      { id: 22, front: "Index", frontAmharic: "Index", back: "A measurement of a section of the stock market (e.g. S&P 500).", backAmharic: "የአክሲዮን ገበያ ክፍል መለኪያ (ለምሳሌ S&P 500)።" },
      { id: 23, front: "Exotic Pair", frontAmharic: "Exotic Pair", back: "A major currency paired with a currency from an emerging economy. High risk.", backAmharic: "አደገኛ እና ተለዋዋጭ የገንዘብ ጥንድ።" }
    ]
  },
  {
    id: 3,
    title: "Module 3: Trading Platforms, Brokers & Order Types",
    titleAmharic: "ክፍለ ትምህርት 3፡ የንግድ ሶፍትዌሮች፣ ደላላዎች እና የትዕዛዝ አይነቶች",
    content: [
      {
        subtitle: "Lesson 3.1 — What a Trading Platform Is (and Is Not) / የንግድ ሶፍትዌር ምንድነው?",
        english: "**Core Definition**\nA trading platform is software that allows you to view price charts, send buy/sell orders, and manage open trades. It DOES NOT control market prices or decide if a trade is good.\n\n**Common Myth**\nMany believe the platform IS the market. It is simply a tool to transmit instructions to your broker.",
        amharic: "**መሰረታዊ ትርጉም**\nየንግድ ፕላትፎርም (ሶፍትዌር) የዋጋ ቻርቶችን ለማየት እና ትዕዛዞችን ለመላክ ይጠቅማል። ዋጋን አይቆጣጠርም፤ ንግዱ ጥሩ መሆን አለመሆኑን አይወስንም።\n\n**የተሳሳተ አመለካከት**\nፕላትፎርሙ ራሱ ገበያው አይደለም። እሱ ትዕዛዝዎን ለደላላው የሚያደርስ መሣሪያ ብቻ ነው።",
        visualType: "PLATFORM_UI"
      },
      {
        subtitle: "Lesson 3.2 — What a Broker Is / ደላላ ምንድነው?",
        english: "**Broker Definition**\nA broker connects you to the market. You never trade directly with banks. Brokers earn money through **Spread** (difference between buy/sell price) and commissions.\n\n**Choosing a Broker**\nFocus on Regulation, Execution Speed, and Transparent Fees. Ignore 'Bonuses' and 'No Loss' marketing.",
        amharic: "**የደላላ ትርጉም**\nደላላ ከገበያ ጋር ያገናኘዎታል። ደላሎች የሚያተርፉት በ **Spread** (በመግዣ እና መሸጫ ዋጋ ልዩነት) ነው።\n\n**ደላላ ሲመርጡ**\nህጋዊነት እና ፍጥነት ላይ ያተኩሩ። ማስታወቂያዎችን እና ጉርሻዎችን (Bonus) አይመኑ።",
        visualType: "BROKER_FLOW"
      },
      {
        subtitle: "Lesson 3.3 — Demo Accounts vs Live Accounts / ዴሞ እና እውነተኛ አካውንት",
        english: "**Demo Account**\nUses simulated money with real market prices. It tests your execution and discipline without financial risk. Mandatory for beginners.\n\n**Live Account**\nUses real money and triggers real emotions. Beginners are **not allowed** to trade live yet.",
        amharic: "**ዴሞ አካውንት**\nበእውነተኛ የገበያ ዋጋ በልምምድ ገንዘብ የሚሰራ። ክህሎትን ያለ ኪሳራ ለመፈተሽ ይጠቅማል። ለጀማሪዎች ግዴታ ነው።\n\n**እውነተኛ (Live) አካውንት**\nእውነተኛ ገንዘብ እና ስሜት ያለው። ጀማሪዎች ገና መጀመር የለባቸውም።",
        visualType: "DEMO_VS_LIVE"
      },
      {
        subtitle: "Lesson 3.4 — Bid, Ask, and Spread / መግዣ፣ መሸጫ እና ስፕሬድ",
        english: "**Understanding Prices**\n- **Ask Price**: The price you BUY at.\n- **Bid Price**: The price you SELL at.\n- **Spread**: The gap between them. This is the cost of business.\n\n**Why You Start Negative**\nEvery trade starts slightly in loss due to the spread. This is normal, not manipulation.",
        amharic: "**የዋጋ አይነቶች**\n- **Ask**: የሚገዙበት ዋጋ።\n- **Bid**: የሚሸጡበት ዋጋ።\n- **Spread**: በሁለቱ መካከል ያለው ልዩነት (የደላላው ትርፍ)።\n\n**ለምን በኪሳራ ይጀምራሉ?**\nበስፕሬድ ምክንያት ማንኛውም ንግድ ሲከፈት በትንሽ ኪሳራ ይጀምራል።",
        visualType: "BID_ASK_SPREAD"
      },
      {
        subtitle: "Lesson 3.5 — Order Types / የትዕዛዝ አይነቶች",
        english: "**1. Market Order**: Execute immediately at current price. Used for speed.\n**2. Limit Order**: Buy lower or Sell higher than current price. Used for precision.\n**3. Stop Order**: Buy above or Sell below current price. Used for breakouts.\n\n**Rule**: If you can't explain WHY you are using an order type, don't use it.",
        amharic: "**1. Market Order**: ወዲያውኑ ባለው ዋጋ መግዛት/መሸጥ።\n**2. Limit Order**: ዋጋው ወደፈለግንበት ሲመጣ እንዲገዛልን ማዘዝ።\n**3. Stop Order**: ዋጋው አንድን ደረጃ ሲያልፍ እንዲገዛልን ማዘዝ።",
        visualType: "ORDER_TYPES"
      },
      {
        subtitle: "Lesson 3.6 — Stop Loss & Take Profit / ስቶፕ ሎስ እና ቴይክ ፕሮፊት",
        english: "**Stop Loss (SL)**\nA mandatory exit to limit loss. Must be set BEFORE entry. Never move it further away.\n\n**Take Profit (TP)**\nA predefined exit to lock in gains. Removes emotional decision making.\n\n**Rule**: Trading without an SL is gambling.",
        amharic: "**Stop Loss (SL)**\nኪሳራን ለመገደብ የግድ አስፈላጊ። ከመግባትዎ በፊት መወሰን አለበት።\n\n**Take Profit (TP)**\nትርፍን በራስ ሰር ለመውሰድ። ስሜታዊ ውሳኔን ያስወግዳል።\n\n**ህግ**: ያለ SL መነገድ ቁማር ነው።",
        visualType: "SL_TP_VISUAL"
      },
      {
        subtitle: "Lesson 3.7 — Lot Size, Leverage & Margin / ሎት፣ ሌቨሬጅ እና ማርጅን",
        english: "**Lot Size**: Determines how much you gain/lose per pip.\n**Leverage**: Amplifies both profits and losses. High leverage does not make you skilled; it makes mistakes expensive.\n**Margin**: The capital reserved to keep a trade open.\n\n**Beginner Rule**: Control risk with Position Size, not Leverage.",
        amharic: "**Lot Size**: በአንድ ፒፕ ምን ያህል እንደሚያተርፉ/እንደሚከስሩ ይወስናል።\n**Leverage**: ትርፍና ኪሳራን ያጎላል። ከፍተኛ ሌቨሬጅ የብቃት መለኪያ አይደለም።\n**Margin**: ንግድ ለመክፈት የሚያስፈልግ ገንዘብ።",
        visualType: "LEVERAGE_VISUAL"
      }
    ],
    quiz: [
      { id: 31, question: "What is the 'Spread'?", questionAmharic: "'ስፕሬድ' (Spread) ምንድነው?", options: ["The broker's commission", "The difference between Bid and Ask price", "The profit you make", "The leverage amount"], optionsAmharic: ["የደላላው ኮሚሽን", "በመግዣ እና መሸጫ ዋጋ ያለው ልዩነት", "የሚያገኙት ትርፍ", "የሌቨሬጅ መጠን"], correctIndex: 1 },
      { id: 32, question: "Which order type executes immediately at the current price?", questionAmharic: "ወዲያውኑ ባለው ዋጋ የሚፈፀመው ትዕዛዝ የቱ ነው?", options: ["Limit Order", "Stop Order", "Market Order", "Pending Order"], optionsAmharic: ["Limit Order", "Stop Order", "Market Order", "Pending Order"], correctIndex: 2 },
      { id: 33, question: "When should you set your Stop Loss?", questionAmharic: "Stop Loss መቼ መወሰን አለበት?", options: ["After the trade is in profit", "Before entering the trade", "When you start losing", "Never"], optionsAmharic: ["ትርፍ ውስጥ ሲገቡ", "ወደ ንግድ ከመግባትዎ በፊት", "መክሰር ሲጀምሩ", "በጭራሽ"], correctIndex: 1 }
    ],
    flashcards: [
      { id: 31, front: "Bid Price", frontAmharic: "Bid Price", back: "The price at which the market is willing to buy from you (Your Sell Price).", backAmharic: "ገበያው ከእርስዎ ለመግዛት ፈቃደኛ የሆነበት ዋጋ (የእርስዎ መሸጫ)።" },
      { id: 32, front: "Ask Price", frontAmharic: "Ask Price", back: "The price at which the market is willing to sell to you (Your Buy Price).", backAmharic: "ገበያው ለእርስዎ ለመሸጥ ፈቃደኛ የሆነበት ዋጋ (የእርስዎ መግዣ)።" },
      { id: 33, front: "Slippage", frontAmharic: "Slippage", back: "The difference between your expected price and the actual execution price during volatility.", backAmharic: "በገበያ መዋዠቅ ምክንያት በታሰበው እና በተፈፀመው ዋጋ መካከል የሚፈጠር ልዩነት።" }
    ]
  },
  {
    id: 4,
    title: "Module 4: Charts, Timeframes & Price Movement",
    titleAmharic: "ክፍለ ትምህርት 4፡ ቻርቶች፣ ታይም ፍሬሞች እና የዋጋ እንቅስቃሴ",
    content: [
      {
        subtitle: "Lesson 4.1 — What a Price Chart Represents / የዋጋ ቻርት ትርጉም",
        english: "**The Chart is History**\nA chart is simply a record of past transactions. It shows where buyers and sellers agreed on a price. It DOES NOT predict the future or explain 'why'.\n\n**Professional Mindset**\nTreat charts as evidence of what HAS happened, not a guarantee of what WILL happen.",
        amharic: "**ቻርት ማለት ታሪክ ነው**\nቻርት ማለት ያለፉ የግብይት መረጃዎች ስብስብ ነው። ገዢዎችና ሻጮች የተስማሙበትን ዋጋ ያሳያል። ወደፊትን አይተነብይም።\n\n**የባለሙያ አመለካከት**\nቻርትን እንደ መረጃ እንጂ እንደ ትንቢት አይውሰዱት።",
        visualType: "M4_CHART_HISTORY"
      },
      {
        subtitle: "Lesson 4.2 — Candlesticks: What They Show / የሻማዎች ትርጉም",
        english: "**Anatomy**\n- **Body**: Who won the battle (Buyers or Sellers).\n- **Wick**: Where price was rejected.\n\n**Interpretation**\nA long wick means rejection (failure to go higher/lower). A big body means conviction. Do not treat single candles as signals; read them in context.",
        amharic: "**አካላት**\n- **አካል (Body)**: ማን እንዳሸነፈ (ገዢዎች ወይስ ሻጮች)።\n- **Wick**: ዋጋ የት እንደተመለሰ።\n\n**ትርጉም**\nረጅም ዊክ ማለት ዋጋው አልቀበልም ብሎ ተመልሷል ማለት ነው። ትልቅ ቦዲ ማለት በራስ መተማመን አለ ማለት ነው።",
        visualType: "M4_WICK_VS_BODY"
      },
      {
        subtitle: "Lesson 4.3 — Timeframes / የጊዜ ገደቦች (Timeframes)",
        english: "**The Market is Fractal**\nThe market looks different on different timeframes. \n- **Higher Timeframe (HTF)**: Shows the main trend (Direction).\n- **Lower Timeframe (LTF)**: Shows detail and entry points (Execution).\n\n**Rule**: Stick to 2-3 timeframes (e.g., Daily for direction, 1H for entry). Random jumping causes confusion.",
        amharic: "**የተለያየ እይታ**\nገበያው በተለያየ ታይም ፍሬም የተለያየ መልክ አለው።\n- **ትልቅ ታይም ፍሬም (HTF)**: ዋናውን አቅጣጫ ያሳያል።\n- **ትንሽ ታይም ፍሬም (LTF)**: ዝርዝር እና መግቢያ ያሳያል።\n\n**ህግ**: 2 ወይም 3 ታይም ፍሬሞችን ብቻ ይጠቀሙ።",
        visualType: "M4_TIME_NESTING"
      },
      {
        subtitle: "Lesson 4.4 — Trends / አዝማሚያዎች",
        english: "**Trend Structure**\n- **Uptrend**: Higher Highs (HH) and Higher Lows (HL).\n- **Downtrend**: Lower Highs (LH) and Lower Lows (LL).\n\n**Trading With The Trend**\nTrading with the trend increases your probability of success. Don't try to pick tops or bottoms.",
        amharic: "**የአዝማሚያ መዋቅር**\n- **Uptrend**: ወደ ላይ የሚሄድ (HH እና HL)።\n- **Downtrend**: ወደ ታች የሚሄድ (LH እና LL)።\n\n**ከአዝማሚያ ጋር መነገድ**\nየማሸነፍ እድልዎን ይጨምራል። ከገበያ ጋር አይጋጩ።",
        visualType: "M4_TREND_FLOW"
      },
      {
        subtitle: "Lesson 4.5 — Ranges / የጎንዮሽ እንቅስቃሴ (Ranges)",
        english: "**What is a Range?**\nWhen price moves sideways between support and resistance. Buyers and sellers are balanced.\n\n**The Trap**\nRanges create false breakouts. Beginners lose money by chasing moves that don't go anywhere. Wait for a clear trend or trade the edges.",
        amharic: "**Range ምንድነው?**\nዋጋ ወደ ጎን ሲንቀሳቀስ። ገዢዎችና ሻጮች ሲመጣጠኑ።\n\n**ወጥመዱ**\nRange የውሸት እንቅስቃሴዎችን ይፈጥራል። ገበያው አቅጣጫ እስኪይዝ ይጠብቁ።",
        visualType: "M4_RANGE_TRAP"
      },
      {
        subtitle: "Lesson 4.6 — Support & Resistance (Zones) / ድጋፍ እና መቋቋሚያ",
        english: "**Zones, Not Lines**\nSupport and Resistance are AREAS of interest, not exact thin lines. Price often pierces a level before reversing.\n\n**Marking Zones**\nUse rectangles to draw zones covering the wicks. Keep your chart clean.",
        amharic: "**ዞኖች እንጂ መስመሮች አይደሉም**\nድጋፍ እና መቋቋሚያ ቦታዎች (Zones) ናቸው። ዋጋው ብዙውን ጊዜ መስመሩን አልፎ ይመለሳል።\n\n**ዞን መሳል**\nዊኮችን የሚያካትት ሬክታንግል ይጠቀሙ።",
        visualType: "M4_SR_ZONES"
      },
      {
        subtitle: "Lesson 4.7 — Impulse vs Correction / ግፊት እና እርማት",
        english: "**Market Rhythm**\nMarkets move in a rhythm: \n1. **Impulse**: Fast, strong move in the trend direction.\n2. **Correction**: Slow, weak pullback.\n\n**Rule**: Don't chase the Impulse. Wait for the Correction to enter.",
        amharic: "**የገበያ እንቅስቃሴ**\n1. **Impulse**: ፈጣን እና ጠንካራ እንቅስቃሴ።\n2. **Correction**: ቀርፋፋ እና ደካማ እርማት።\n\n**ህግ**: Impulseን ተከትለው አይግቡ። እርማቱን ይጠብቁ።",
        visualType: "M4_IMPULSE_WAVE"
      },
      {
        subtitle: "Lesson 4.8 — Clean Chart Discipline / የቻርት ንፅህና",
        english: "**Naked Trading**\nA beginner's chart should only have Candlesticks and Key Zones. NO indicators. NO messy lines.\n\n**Why?**\nClarity precedes confidence. If your chart is messy, your mind will be messy.",
        amharic: "**ንፁህ ቻርት**\nየጀማሪ ቻርት ሻማዎች እና ቁልፍ ዞኖች ብቻ ሊኖሩት ይገባል። ምንም ኢንዲኬተር አያስፈልግም።\n\n**ለምን?**\nቻርትዎ የተዝረከረከ ከሆነ ውሳኔዎም የተዝረከረከ ይሆናል።",
        visualType: "M4_CLEAN_CHART_COMPARE"
      }
    ],
    quiz: [
      { id: 41, question: "What defines an Uptrend?", questionAmharic: "Uptrend (የከፍታ አዝማሚያ) እንዴት ይታወቃል?", options: ["Green candles only", "Higher Highs and Higher Lows", "Price moving fast", "Moving average pointing up"], optionsAmharic: ["አረንጓዴ ሻማዎች ብቻ", "Higher Highs እና Higher Lows", "Moving Average ወደ ላይ ሲያሳይ", "ዋጋ በፍጥነት ሲንቀሳቀስ"], correctIndex: 1 },
      { id: 42, question: "What should you do during an Impulse move?", questionAmharic: "በ Impulse (ግፊት) ወቅት ምን ማድረግ አለብዎት?", options: ["Enter immediately", "Wait for a Correction", "Go against it", "Add indicators"], optionsAmharic: ["ወዲያውኑ መግባት", "እርማት (Correction) መጠበቅ", "ተቃራኒ መግባት", "ኢንዲኬተር መጨመር"], correctIndex: 1 },
      { id: 43, question: "How should Support & Resistance be drawn?", questionAmharic: "Support እና Resistance እንዴት ይሳላሉ?", options: ["As thin exact lines", "As Zones (Areas)", "Wherever price touches once", "Using a robot"], optionsAmharic: ["በቀጭን መስመር", "እንደ ዞን (Zone)", "ዋጋ አንዴ የነካበት ቦታ", "በሮቦት"], correctIndex: 1 }
    ],
    flashcards: [
      { id: 41, front: "Impulse", frontAmharic: "Impulse", back: "A strong, fast move in the direction of the trend.", backAmharic: "በአዝማሚያው አቅጣጫ የሚደረግ ፈጣን እና ጠንካራ እንቅስቃሴ።" },
      { id: 42, front: "Correction", frontAmharic: "Correction", back: "A temporary pause or pullback against the trend.", backAmharic: "ከአዝማሚያው በተቃራኒ የሚደረግ ጊዜያዊ እርማት።" },
      { id: 43, front: "Higher High (HH)", frontAmharic: "Higher High (HH)", back: "A peak that is higher than the previous peak, signaling an uptrend.", backAmharic: "ከቀድሞው ከፍታ የሚበልጥ አዲስ ከፍታ (የ Uptrend ምልክት)።" }
    ]
  },
  {
    id: 5,
    title: "Module 5: Risk Management & Position Sizing",
    titleAmharic: "ክፍለ ትምህርት 5፡ የአደጋ አስተዳደር እና የሎት መጠን",
    content: [
      {
        subtitle: "Lesson 5.1 — What Risk Actually Means / ትክክለኛ የአደጋ ትርጉም",
        english: "**Defined Risk**\nRisk is the specific dollar amount you are willing to lose. It must be known BEFORE you enter.\n\n**The Rule**\nIf you can't say \"I will lose exactly $X if this hits my stop loss\", you are not trading, you are gambling.",
        amharic: "**የታወቀ አደጋ**\nአደጋ (Risk) ማለት ለመክሰር የተዘጋጁት የገንዘብ መጠን ነው። ከመግባትዎ በፊት መታወቅ አለበት።\n\n**ህጉ**\n\"ስቶፕ ሎስ ከተነካ የምከስረው ይሄን ያህል ነው\" ማለት ካልቻሉ እየነገዱ አይደለም።",
        visualType: "M5_RISK_CALCULATOR"
      },
      {
        subtitle: "Lesson 5.2 — Why Accounts Blow Up / አካውንቶች ለምን ይቃጠላሉ?",
        english: "**The Cause**\nAccounts aren't destroyed by the market. They are destroyed by bad behavior: no stop loss, revenge trading, and increasing risk to \"make it back\".\n\n**Psychology**\nAfter a loss, the temptation to double your risk is high. This is the fastest way to zero.",
        amharic: "**ምክንያቱ**\nአካውንት የሚቃጠለው በባህሪ ችግር ነው። ያለ ስቶፕ ሎስ መነገድ እና ለመካካስ ብሎ ሎት መጨመር ዋናዎቹ ናቸው።\n\n**ስነ-ልቦና**\nከኪሳራ በኋላ ሎት የመጨመር ፍላጎት ይመጣል። ይህ ወደ ጥፋት የሚወስድ መንገድ ነው።",
        visualType: "NONE"
      },
      {
        subtitle: "Lesson 5.3 — Risk Per Trade (1% Rule) / የ1% ህግ",
        english: "**The Golden Rule**\nNever risk more than 1% of your account on a single trade. \n\n**Why 1%?**\nWith 1% risk, you can lose 10 times in a row and still have 90% of your capital. With 10% risk, you are dead in 5 trades.",
        amharic: "**የወርቅ ህግ**\nበአንድ ንግድ ከ 1% በላይ አይጋለጡ።\n\n**ለምን 1%?**\nበ 1% ሪስክ 10 ጊዜ በተከታታይ ቢከስሩ እንኳን 90% ካፒታል ይኖርዎታል። በ 10% ግን ወዲያው ያልቃሉ።",
        visualType: "M5_LOSING_STREAK"
      },
      {
        subtitle: "Lesson 5.4 — Stop Loss: The Protector / ስቶፕ ሎስ፡ ጠባቂው",
        english: "**Non-Negotiable**\nEvery trade MUST have a stop loss. It prevents one bad trade from ruining your career.\n\n**Placement**\nPlace your stop loss where your trade idea is invalid (e.g. below support), not just a random number of pips.",
        amharic: "**ግዴታ ነው**\nማንኛውም ንግድ ስቶፕ ሎስ ሊኖረው ይገባል።\n\n**ቦታው**\nስቶፕ ሎስ መቀመጥ ያለበት ንግዱ ስህተት መሆኑ በሚረጋገጥበት ቦታ (ለምሳሌ ከድጋፍ በታች) ነው።",
        visualType: "M5_STOP_LOSS"
      },
      {
        subtitle: "Lesson 5.5 — Risk-to-Reward (R:R) / አደጋ እና ትርፍ",
        english: "**The Formula for Profit**\nRisk $1 to make $3. If you win 40% of the time with a 1:3 ratio, you will be very profitable. You don't need to win every time.",
        amharic: "**የትርፍ ቀመር**\n1 ዶላር ለመክሰር ተዘጋጅተው 3 ዶላር ለማግኘት ያቅዱ። በ 1:3 ጥምርታ፣ ብዙ ጊዜ ቢሳሳቱም ትርፋማ ይሆናሉ።",
        visualType: "M5_RR_RATIO"
      },
      {
        subtitle: "Lesson 5.6 — Position Sizing / የሎት መጠን ስሌት",
        english: "**Math Over Feelings**\nDon't guess your lot size. Calculate it based on your Stop Loss distance and 1% risk. \n\n**Formula**\nLot Size = Risk Amount / (Stop Loss Pips * Pip Value).",
        amharic: "**ስሌት እንጂ ስሜት አይደለም**\nሎት በዘፈቀደ አይምረጡ። በስቶፕ ሎስ ርቀት እና በ 1% ሪስክ አስሉው።\n\n**ቀመር**\nሎት = የአደጋ ገንዘብ / (ስቶፕ ሎስ ፒፕ * የፒፕ ዋጋ)።",
        visualType: "M5_POSITION_SIZE"
      },
      {
        subtitle: "Lesson 5.7 — Drawdowns & Recovery / ኪሳራን ማካካስ",
        english: "**The Math of Loss**\nIf you lose 50% of your account, you need a 100% gain just to break even. Protect your downside at all costs.",
        amharic: "**የኪሳራ ሂሳብ**\n50% ከከሰሩ፣ ወደ ነበሩበት ለመመለስ 100% ማትርፍ አለብዎት። ስለዚህ ጉዳትን መከላከል ቀዳሚ ስራ ነው።",
        visualType: "M5_DRAWDOWN_MATH"
      },
      {
        subtitle: "Lesson 5.8 — Losing Streaks / ተከታታይ ኪሳራ",
        english: "**It Happens to Everyone**\nEven the best traders lose 5-6 times in a row. The difference is they keep the risk small (1%) so they can survive until the winning streak comes.",
        amharic: "**ለሁሉም ያጋጥማል**\nምርጥ ነጋዴዎችም በተከታታይ ይከስራሉ። ልዩነቱ ሪስካቸው ትንሽ ስለሆነ (1%) በገበያው መቆየት ይችላሉ።",
        visualType: "NONE"
      }
    ],
    quiz: [
      { id: 51, question: "What is the maximum recommended risk per trade?", questionAmharic: "ለአንድ ንግድ የሚመከረው ከፍተኛ የአደጋ መጠን ስንት ነው?", options: ["5%", "10%", "1%", "As much as you feel"], optionsAmharic: ["5%", "10%", "1%", "እንደ ስሜትዎ"], correctIndex: 2 },
      { id: 52, question: "If you lose 50% of your account, how much profit do you need to recover?", questionAmharic: "50% ከከሰሩ ለመመለስ ምን ያህል ማትርፍ አለብዎት?", options: ["50%", "100%", "25%", "It's impossible"], optionsAmharic: ["50%", "100%", "25%", "አይቻልም"], correctIndex: 1 },
      { id: 53, question: "What determines your Lot Size?", questionAmharic: "የሎት መጠን (Lot Size) በምን ይወሰናል?", options: ["Confidence", "Stop Loss distance and Risk amount", "How fast the market moves", "Random choice"], optionsAmharic: ["በራስ መተማመን", "በስቶፕ ሎስ ርቀት እና የአደጋ ገንዘብ", "ገበያው በፍጥነት ሲሄድ", "በዘፈቀደ"], correctIndex: 1 }
    ],
    flashcards: [
      { id: 51, front: "Drawdown", frontAmharic: "Drawdown", back: "The reduction in capital from a peak to a trough.", backAmharic: "ከፍተኛ የገንዘብ መጠን ወደ ዝቅተኛ መውረድ (የኪሳራ መጠን)።" },
      { id: 52, front: "Risk Per Trade", frontAmharic: "Risk Per Trade", back: "The percentage of your account you are willing to lose on one trade (e.g. 1%).", backAmharic: "በአንድ ንግድ ለመክሰር የተዘጋጁት የገንዘብ ድርሻ (ለምሳሌ 1%)።" },
      { id: 53, front: "R:R Ratio", frontAmharic: "R:R Ratio", back: "Risk to Reward Ratio. Risk 1 to make X.", backAmharic: "የአደጋ እና ትርፍ ጥምርታ።" }
    ]
  },

  // --- LEVEL 2: INTERMEDIATE TRADER (EXECUTION) ---
  {
    id: 6,
    title: "Module 6: Market Structure & Price Logic",
    titleAmharic: "ክፍለ ትምህርት 6፡ የገበያ መዋቅር እና የዋጋ ሎጂክ",
    content: [
      {
        subtitle: "Lesson 6.1 — What Market Structure Is / የገበያ መዋቅር ምንድነው?",
        english: "**Core Definition**\nMarket structure describes how price moves and organizes itself over time through swings. It answers three fundamental questions:\n1. Who is in control — buyers or sellers?\n2. Is price expanding or consolidating?\n3. Is the current direction intact or weakening?\n\n**Hierarchy**\nStructure is visible on all timeframes, but Higher Timeframes (HTF) dominate Lower Timeframes (LTF). The LTF shows detail, but the HTF shows authority.",
        amharic: "**መሰረታዊ ትርጉም**\nየገበያ መዋቅር (Market Structure) ዋጋ በጊዜ ሂደት እንዴት እንደሚንቀሳቀስ እና እንደሚደራጅ ይገልፃል። ሶስት መሰረታዊ ጥያቄዎችን ይመልሳል፡\n1. ገበያውን የሚቆጣጠረው ማን ነው? (ገዢዎች ወይስ ሻጮች?)\n2. ዋጋ እየሰፋ ነው ወይስ እየተዳከመ?\n3. አሁን ያለው አቅጣጫ ይቀጥላል ወይስ ይቆማል?\n\n**ተዋረድ**\nመዋቅር በሁሉም ታይም ፍሬም ይታያል፣ ነገር ግን ትልቁ ታይም ፍሬም (HTF) ትንሹን (LTF) ይበልጣል። ትንሹ ዝርዝርን ያሳያል፤ ትልቁ ግን ስልጣን አለው።",
        visualType: "M6_STRUCTURE_MAP"
      },
      {
        subtitle: "Lesson 6.2 — Highs and Lows / ከፍተኛ እና ዝቅተኛ ነጥቦች",
        english: "**The Elements**\nAll market structure is built from:\n- **Higher High (HH)**\n- **Higher Low (HL)**\n- **Lower High (LH)**\n- **Lower Low (LL)**\n\n**Combinations**\n- **Uptrend**: HH + HL sequence.\n- **Downtrend**: LL + LH sequence.\n- **Range**: Repeated equal highs and lows.\n\n**Rule**: One swing does not define structure. Structure requires confirmation through sequence.",
        amharic: "**አራቱ መሰረታዊ አካላት**\nማንኛውም የገበያ መዋቅር ከነዚህ የተሰራ ነው፡\n- **Higher High (HH)** - ከፍ ያለ ከፍታ\n- **Higher Low (HL)** - ከፍ ያለ ዝቅታ\n- **Lower High (LH)** - ዝቅ ያለ ከፍታ\n- **Lower Low (LL)** - ዝቅ ያለ ዝቅታ\n\n**ጥምር ውጤቶች**\n- **Uptrend**: HH + HL ተከታታይነት።\n- **Downtrend**: LL + LH ተከታታይነት።\n- **Range**: እኩል ከፍታ እና እኩል ዝቅታ።\n\nአንድ እንቅስቃሴ ብቻውን መዋቅር አይሆንም፤ ተከታታይነት ያስፈልጋል።",
        visualType: "M6_HIGHS_LOWS"
      },
      {
        subtitle: "Lesson 6.3 — Impulse and Correction / ግፊት እና እርማት",
        english: "**The Cycle**\nMarkets move in a repeating cycle:\n1. **Impulse**: Strong directional movement, long candles, clear direction.\n2. **Correction**: Pause, pullback, or consolidation.\n\n**Critical Insight**\nMost beginners enter late in the Impulse (chasing). Professionals enter during the Correction (opportunity). Impulse provides info; Correction provides entry.",
        amharic: "**የእንቅስቃሴ ዑደት**\nገበያ በዚህ ዑደት ይንቀሳቀሳል፡\n1. **Impulse (ግፊት)**፡ ጠንካራ አቅጣጫ ያለው፣ ረጅም ሻማዎች ያሉት።\n2. **Correction (እርማት)**፡ የዋጋ መረጋጋት ወይም ወደኋላ መመለስ።\n\n**ወሳኝ ነጥብ**\nጀማሪዎች በ Impulse መጨረሻ ላይ ይገባሉ። ባለሙያዎች ግን Correction ሲፈጠር ይገባሉ። Impulse መረጃ ይሰጣል፤ Correction እድል ይሰጣል።",
        visualType: "M4_IMPULSE_WAVE"
      },
      {
        subtitle: "Lesson 6.4 — Break of Structure (BOS) / የመዋቅር መጣስ (BOS)",
        english: "**Definition**\nA Break of Structure (BOS) occurs when price breaks a previous structural high (in uptrend) or low (in downtrend) and closes beyond it.\n\n**Meaning**\nBOS signals that the trend is likely to continue. It is NOT a signal to enter immediately; it is a confirmation of direction. Professionals wait for a pullback after BOS.",
        amharic: "**BOS ምንድነው?**\nBreak of Structure (BOS) የሚፈጠረው ዋጋ የቀድሞውን የስትራክቸር ከፍታ (በ Uptrend) ወይም ዝቅታ (በ Downtrend) ሲሰብር ነው።\n\n**ትርጉም**\nBOS አዝማሚያው የመቀጠል እድሉ ሰፊ መሆኑን ያሳያል። ነገር ግን ይህ 'ወዲያውኑ ግቡ' ማለት አይደለም። አዝማሚያው እንደቀጠለ ማረጋገጫ ነው። ባለሙያዎች ከ BOS በኋላ እርማት (Pullback) ይጠብቃሉ።",
        visualType: "M6_BOS_CONFIRMATION"
      },
      {
        subtitle: "Lesson 6.5 — Change of Character (ChoCH) / የባህሪ ለውጥ (ChoCH)",
        english: "**Definition**\nChange of Character (ChoCH) signals a potential shift in market behavior. It occurs when momentum weakens and structure breaks in the OPPOSITE direction (e.g., breaking a Higher Low in an uptrend).\n\n**Implication**\nChoCH means caution is required. The trend may be reversing or entering a deep correction. Reduce aggression and re-evaluate.",
        amharic: "**ChoCH ምንድነው?**\nChange of Character (ChoCH) የገበያ ባህሪ መቀየርን ያሳያል። ዋጋ አዝማሚያውን መቀጠል ሲያቅተው እና ተቃራኒ መዋቅር ሲሰብር ይፈጠራል።\n\n**ትርጉም**\nChoCH ማለት ጥንቃቄ ያስፈልጋል ማለት ነው። አዝማሚያው ሊቀለበስ ወይም ጥልቅ እርማት ሊመጣ ይችላል። በዚህ ጊዜ ሎት መቀነስ ወይም ማቆም ይመከራል።",
        visualType: "M6_CHOCH_PATTERN"
      },
      {
        subtitle: "Lesson 6.6 — Trending vs Ranging Markets / አዝማሚያ እና የጎንዮሽ ገበያ",
        english: "**Trending**\nCharacterized by clear HH/HL or LL/LH sequences. Best for continuation strategies.\n\n**Ranging**\nCharacterized by equal highs and lows with overlapping price. Best for patience or mean-reversion.\n\n**Critical Rule**: Using a trending strategy in a range causes losses. Using a ranging strategy in a trend causes missed opportunities.",
        amharic: "**Trending (አዝማሚያ ያለው)**\nግልጽ HH/HL ወይም LL/LH ያለው። ለቀጣይነት (Continuation) ስትራቴጂዎች ተስማሚ ነው።\n\n**Ranging (የጎንዮሽ)**\nእኩል ከፍታ እና ዝቅታ ያለው። ለትዕግስት እና ለድጋፍ/መቋቋሚያ ንግድ ተስማሚ ነው።\n\n**ህግ**፡ Trending ስትራቴጂን በ Range ውስጥ መጠቀም ኪሳራ ያስከትላል።",
        visualType: "M6_TREND_VS_RANGE"
      },
      {
        subtitle: "Lesson 6.7 — Liquidity (Beginner-Safe) / ሊኩዊዲቲ (መሰረታዊ)",
        english: "**Concept**\nLiquidity refers to areas where many orders (Stop Losses) exist. These often form above equal highs, below equal lows, or near obvious support/resistance.\n\n**The Trap**\nPrice often moves toward liquidity to 'grab' orders before reversing or continuing. Beginners should recognize these zones to avoid placing tight stops there.",
        amharic: "**የሊኩዊዲቲ ጽንሰ-ሀሳብ**\nሊኩዊዲቲ (Liquidity) ማለት ብዙ የ Stop Loss ትዕዛዞች የተከማቹበት ቦታ ነው። እነዚህም ከእኩል ከፍታዎች በላይ ወይም ከእኩል ዝቅታዎች በታች ይገኛሉ።\n\n**ወጥመዱ**\nዋጋ ብዙውን ጊዜ ወደነዚህ ቦታዎች የሚሄደው ትዕዛዞችን ለመውሰድ (Stop Hunt) ነው። ከዚያ በኋላ አቅጣጫውን ይቀይራል። ጀማሪዎች እነዚህን ዞኖች መለየት እና ከመግባት መቆጠብ አለባቸው።",
        visualType: "M6_LIQUIDITY_TRAP"
      }
    ],
    quiz: [
      { id: 61, question: "What defines an Uptrend in market structure?", questionAmharic: "በገበያ መዋቅር ውስጥ Uptrend (የከፍታ አዝማሚያ) እንዴት ይገለፃል?", options: ["Green candles only", "A series of Higher Highs and Higher Lows", "Price moving fast", "Moving average pointing up"], optionsAmharic: ["አረንጓዴ ሻማዎች ብቻ", "ተከታታይ Higher Highs እና Higher Lows", "ዋጋ በፍጥነት ሲንቀሳቀስ", "Moving average ወደ ላይ ሲያሳይ"], correctIndex: 1 },
      { id: 62, question: "What is a 'Break of Structure' (BOS)?", questionAmharic: "'Break of Structure' (BOS) ምንድነው?", options: ["A trend reversal", "Confirmation that the trend is continuing", "A signal to sell immediately", "Market noise"], optionsAmharic: ["የአዝማሚያ መቀልበስ", "አዝማሚያው መቀጠሉን የሚያሳይ ማረጋገጫ", "ወዲያውኑ ለመሸጥ የሚሰጥ ምልክት", "የገበያ ጫጫታ"], correctIndex: 1 },
      { id: 63, question: "Where is 'Liquidity' usually found?", questionAmharic: "'ሊኩዊዲቲ' (Liquidity) ብዙውን ጊዜ የት ይገኛል?", options: ["In the middle of a candle", "Above Equal Highs and Below Equal Lows", "Randomly on the chart", "Only in downtrends"], optionsAmharic: ["በሻማ መሃል", "ከእኩል ከፍታዎች በላይ እና ከእኩል ዝቅታዎች በታች", "በዘፈቀደ ቦታ", "በ Downtrend ብቻ"], correctIndex: 1 }
    ],
    flashcards: [
      { id: 61, front: "BOS", frontAmharic: "BOS", back: "Break of Structure - Confirms trend continuation.", backAmharic: "የአዝማሚያ ቀጣይነትን የሚያረጋግጥ የመዋቅር መጣስ።" },
      { id: 62, front: "ChoCH", frontAmharic: "ChoCH", back: "Change of Character - Signals a potential trend reversal.", backAmharic: "የአዝማሚያ መቀልበስን ሊያመለክት የሚችል የባህሪ ለውጥ።" },
      { id: 63, front: "Swing High", frontAmharic: "Swing High", back: "A peak surrounded by lower highs on both sides.", backAmharic: "በሁለቱም በኩል በዝቅተኛ ነጥቦች የተከበበ ከፍተኛ ነጥብ።" }
    ]
  },
  {
    id: 7,
    title: "Module 7: Technical Tools — Used Correctly",
    titleAmharic: "ክፍለ ትምህርት 7፡ ቴክኒካል መሣሪያዎች — በትክክለኛው አጠቃቀም",
    content: [
      {
        subtitle: "Lesson 7.1 — What Indicators Really Are / ጠቋሚዎች (Indicators) ምንድን ናቸው?",
        english: "**Core Truth**\nIndicators are mathematical transformations of past price data. They react to price, lag behind price, and smooth information. They do NOT predict future price or know market intent.\n\n**Why This Matters**\nIf you believe indicators predict price, you will chase signals and ignore context. Professional traders use indicators to confirm conditions, while price action makes the decisions.",
        amharic: "**መሰረታዊ እውነት**\nጠቋሚዎች (Indicators) የዋጋ ታሪክ ስሌት ውጤቶች ናቸው። ለዋጋ ምላሽ ይሰጣሉ፣ ይዘገያሉ፣ እና መረጃን ያቀላጥፋሉ። ወደፊት የሚሆነውን አይተነብዩም።\n\n**ለምን ይጠቅማል?**\nጠቋሚዎች እንደሚተነብዩ ካመኑ፣ የተሳሳተ ውሳኔ ይወስናሉ። ባለሙያዎች ጠቋሚዎችን ለማረጋገጫ ብቻ ይጠቀማሉ።",
        visualType: "M7_INDICATOR_LAG"
      },
      {
        subtitle: "Lesson 7.2 — Indicator Categories / የጠቋሚ አይነቶች",
        english: "**The Three Categories**\n1. **Trend Indicators**: Identify direction (e.g., Moving Averages).\n2. **Momentum Indicators**: Measure strength (e.g., RSI).\n3. **Volatility Indicators**: Measure movement range (e.g., ATR).\n\n**The Rule**\nUse only ONE indicator per category. Using two indicators that do the same job adds confusion, not value.",
        amharic: "**ሶስት ዋና አይነቶች**\n1. **Trend**: አቅጣጫን የሚጠቁሙ (ለምሳሌ Moving Average)።\n2. **Momentum**: ጉልበትን የሚለኩ (ለምሳሌ RSI)።\n3. **Volatility**: የመንቀሳቀስ አቅምን የሚለኩ (ለምሳሌ ATR)።\n\n**ህግ**\nከአንድ አይነት አንድ ጠቋሚ ብቻ ይጠቀሙ።",
        visualType: "M7_INDICATOR_CATEGORIES"
      },
      {
        subtitle: "Lesson 7.3 — Moving Averages / ሙቪንግ አቬሬጅ",
        english: "**Trend Filters Only**\nMoving Averages smooth price data to show the general direction. \n- **Price above MA**: Look for Buys.\n- **Price below MA**: Look for Sells.\n\nThey do NOT provide exact entry signals. They answer 'Which direction?' not 'When?'.",
        amharic: "**የአቅጣጫ ማጣሪያ**\nMoving Average አጠቃላይ አቅጣጫን ያሳያል።\n- **ዋጋ ከ MA በላይ ሲሆን**: ለመግዛት ያስቡ።\n- **ዋጋ ከ MA በታች ሲሆን**: ለመሸጥ ያስቡ።\n\nትክክለኛ የመግቢያ ጊዜን አይጠቁምም።",
        visualType: "M7_MA_TREND_FILTER"
      },
      {
        subtitle: "Lesson 7.4 — RSI (Momentum) / RSI (የጉልበት መለኪያ)",
        english: "**Momentum Context**\nRSI measures the strength of buying or selling pressure.\n- **Above 50**: Bullish momentum.\n- **Below 50**: Bearish momentum.\n\n**Myth Buster**\nOverbought (>70) does NOT mean sell. Oversold (<30) does NOT mean buy. In strong trends, RSI can stay overbought for weeks.",
        amharic: "**የጉልበት ሁኔታ**\nRSI የገዢዎችን ወይም ሻጮችን ጉልበት ይለካል።\n- **ከ 50 በላይ**: የገዢዎች ጉልበት።\n- **ከ 50 በታች**: የሻጮች ጉልበት።\n\n**ማስጠንቀቂያ**\nOverbought (>70) ስለሆነ ብቻ አይሽጡ። በጠንካራ አዝማሚያ ገበያው ለረጅም ጊዜ Overbought ሆኖ ሊቆይ ይችላል።",
        visualType: "M7_RSI_MOMENTUM"
      },
      {
        subtitle: "Lesson 7.5 — ATR (Volatility) / ATR (ተለዋዋጭነት)",
        english: "**Volatility Tool**\nATR measures how much price typically moves in a candle. It does NOT show direction.\n\n**Usage**\nUse ATR to set realistic Stop Losses. If the daily range is 50 pips, a 5 pip stop loss makes no sense.",
        amharic: "**የተለዋዋጭነት መለኪያ**\nATR ዋጋ በአማካይ ምን ያህል እንደሚንቀሳቀስ ይለካል። አቅጣጫን አያሳይም።\n\n**አጠቃቀም**\nትክክለኛ Stop Loss ለመወሰን ይጠቅማል።",
        visualType: "M7_ATR_VOLATILITY"
      },
      {
        subtitle: "Lesson 7.6 — Discipline Rules / የዲሲፕሊን ህጎች",
        english: "**Mandatory Rules**\n1. Maximum **two indicators** per chart.\n2. Never use indicators to predict reversals.\n3. Indicators must never contradict market structure.\n\n**Principle**\nMore indicators do not reduce risk; they reduce clarity. A clean chart leads to a clear mind.",
        amharic: "**ግዴታ ህጎች**\n1. በቻርት ላይ ከ 2 ጠቋሚዎች በላይ አይጠቀሙ።\n2. ጠቋሚዎችን ለመተንበይ አይጠቀሙ።\n3. ጠቋሚዎች ከገበያ መዋቅር (Structure) ጋር መጋጨት የለባቸውም።\n\n**መርህ**\nብዙ ጠቋሚ መጠቀም አደጋን አይቀንስም፤ ግልጽነትን ያጠፋል እንጂ።",
        visualType: "M7_CHART_CLUTTER"
      },
      {
        subtitle: "Lesson 7.7 — When Indicators Fail / ጠቋሚዎች ሲሳሳቱ",
        english: "**Limitations**\nIndicators fail in ranging markets and during sudden news events. They lag significantly.\n\n**Professional Response**\nWhen indicators conflict with price action, **Trust Price**. If the chart is messy or confusing, do nothing.",
        amharic: "**ድክመቶች**\nጠቋሚዎች በጎንዮሽ ገበያ እና በዜና ወቅት ይሳሳታሉ።\n\n**የባለሙያ ምላሽ**\nጠቋሚ እና ዋጋ ከተጋጩ፣ **ዋጋን** ይመኑ። ሁኔታው ካልጠራ ምንም አያድርጉ።",
        visualType: "M7_INDICATOR_FAILURE"
      }
    ],
    quiz: [
      { id: 71, question: "What is the primary role of indicators?", questionAmharic: "የጠቋሚዎች (Indicators) ዋና ጥቅም ምንድነው?", options: ["To predict the future price", "To confirm decisions made from price action", "To replace market structure", "To guarantee a win"], optionsAmharic: ["የወደፊት ዋጋን መተንበይ", "ከዋጋ እንቅስቃሴ የተወሰነን ውሳኔ ማረጋገጥ", "የገበያ መዋቅርን መተካት", "ማሸነፍን ማረጋገጥ"], correctIndex: 1 },
      { id: 72, question: "What does RSI > 70 (Overbought) mean in a strong trend?", questionAmharic: "በጠንካራ አዝማሚያ ውስጥ RSI > 70 (Overbought) ሲሆን ምን ማለት ነው?", options: ["Sell immediately", "The trend is reversing", "Strong bullish momentum", "Market is broken"], optionsAmharic: ["ወዲያውኑ መሸጥ", "አዝማሚያው እየተቀለበሰ ነው", "ጠንካራ የገዢዎች ጉልበት", "ገበያው ተበላሽቷል"], correctIndex: 2 },
      { id: 73, question: "What is the maximum recommended number of indicators?", questionAmharic: "የሚመከረው ከፍተኛ የጠቋሚዎች ብዛት ስንት ነው?", options: ["As many as possible", "Five", "Two", "Zero"], optionsAmharic: ["የተቻለውን ያህል", "አምስት", "ሁለት", "ዜሮ"], correctIndex: 2 }
    ],
    flashcards: [
      { id: 71, front: "Lagging Indicator", frontAmharic: "Lagging Indicator", back: "An indicator that reacts after price has already moved (e.g. Moving Average).", backAmharic: "ዋጋ ከተንቀሳቀሰ በኋላ ምላሽ የሚሰጥ ጠቋሚ (ለምሳሌ MA)።" },
      { id: 72, front: "ATR", frontAmharic: "ATR", back: "Average True Range - Measures market volatility, not direction.", backAmharic: "የገበያ ተለዋዋጭነትን የሚለካ ጠቋሚ።" },
      { id: 73, front: "Momentum", frontAmharic: "Momentum", back: "The speed or strength of a price movement.", backAmharic: "የዋጋ እንቅስቃሴ ፍጥነት ወይም ጉልበት።" }
    ]
  },
  {
    id: 8,
    title: "Module 8: Strategy Development (From Rules to System)",
    titleAmharic: "ክፍለ ትምህርት 8፡ የንግድ ስትራቴጂ ግንባታ",
    content: [
      {
        subtitle: "Lesson 8.1 — What a Trading Strategy Really Is / የንግድ ስትራቴጂ ምንድነው?",
        english: "**Formal Definition**\nA trading strategy is a **rule-based decision framework** that produces the *same decisions* under the *same market conditions*.\n\n**What a Strategy Is NOT**\nIt is not a single setup, a chart pattern, or a trade you feel confident about. If a decision depends on how you feel, it is **not a strategy**.",
        amharic: "**መደበኛ ትርጉም**\nየንግድ ስትራቴጂ ማለት በተመሳሳይ የገበያ ሁኔታ ውስጥ ሁልጊዜ **ተመሳሳይ ውሳኔ** የሚያሰጥ ህግ-መር ስርዓት ነው።\n\n**ስትራቴጂ ምን አይደለም?**\nስትራቴጂ ማለት አንድ የቻርት ፓተርን ወይም በስሜት የሚወሰን ውሳኔ አይደለም። ውሳኔዎ በስሜትዎ የሚወሰን ከሆነ ስትራቴጂ የለዎትም።",
        visualType: "M8_STRATEGY_VS_SETUP"
      },
      {
        subtitle: "Lesson 8.2 — The Mandatory Components / አስገዳጅ የስትራቴጂ አካላት",
        english: "**Non-Negotiable Components**\nEvery valid strategy must define: Market & Instrument, Trading Session, Entry Model, Stop-Loss Logic, Take-Profit Logic, Risk per Trade, and Management Rules.\n\n**Insight**\nMost traders have partial rule sets, creating emotional gaps. A complete system leaves no room for guessing.",
        amharic: "**አስገዳጅ ክፍሎች**\nማንኛውም ስትራቴጂ የሚከተሉትን መመለስ አለበት፡ የትኛው ገበያ? የትኛው ሰዓት? መግቢያው እንዴት ነው? ስቶፕ ሎስ የት ነው? ትርፍ የት ይወሰዳል? ምን ያህል አደጋ (Risk) ይወሰዳል?\n\n**ማስታወሻ**\nሙሉ ስርዓት ያላቸው ነጋዴዎች ለመገመት ቦታ አይሰጡም።",
        visualType: "M8_STRATEGY_COMPONENTS"
      },
      {
        subtitle: "Lesson 8.3 — Market & Instrument Specialization / የአንድ መሣሪያ ስፔሻላይዜሽን",
        english: "**One Strategy, One Instrument**\nA strategy must be designed for one primary instrument (e.g., XAUUSD) and one dominant session. A universal strategy is a weak strategy.\n\n**Best Practice**\nSpecialize in one pair. Multiple instruments dilute your focus and data quality.",
        amharic: "**አንድ ስትራቴጂ፣ አንድ መሣሪያ**\nስትራቴጂዎ ለአንድ መሣሪያ (ለምሳሌ ወርቅ) እና ለአንድ የገበያ ሰዓት የተሰራ መሆን አለበት። 'ለሁሉም የሚሆን' ስትራቴጂ ደካማ ነው።",
        visualType: "NONE"
      },
      {
        subtitle: "Lesson 8.4 — Market Condition Filters / የገበያ ሁኔታ ማጣሪያዎች",
        english: "**Why Conditions Matter**\nA strategy should not trade all the time. It must specify **when it is active** (e.g., Trending) and **when it is disabled** (e.g., Low Volatility).\n\n**Professional Insight**\nAmateurs force trades in bad conditions. Professionals wait for their specific condition.",
        amharic: "**ሁኔታዎችን መምረጥ**\nስትራቴጂ ሁልጊዜ አይሰራም። መቼ እንደሚሰራ (ለምሳሌ በ Trend ወቅት) እና መቼ መቆም እንዳለበት መወሰን አለበት።\n\n**የባለሙያ እይታ**\nጀማሪዎች በማይሆን ገበያ ውስጥ ይገፋሉ። ባለሙያዎች ትክክለኛውን ሁኔታ ይጠብቃሉ።",
        visualType: "M8_MARKET_CONDITION_FILTER"
      },
      {
        subtitle: "Lesson 8.5 — Entry Models / የመግቢያ ሞዴሎች",
        english: "**Entry Is a Sequence**\nA valid entry is not just a candle pattern. It is a sequence: \n1. Market Condition → 2. Structural Context → 3. Trigger Event → 4. Confirmation.\n\n**Focus**\nPick ONE entry model (e.g., Pullback Continuation) and master it.",
        amharic: "**መግቢያ ሂደት ነው**\nትክክለኛ መግቢያ ቅደም ተከተል አለው፡\n1. የገበያ ሁኔታ → 2. መዋቅራዊ ቦታ → 3. ቀስቅሴ (Trigger) → 4. ማረጋገጫ።\n\n**ትኩረት**\nአንድ የመግቢያ አይነት ብቻ ይምረጡ እና እሱን ይወቁ።",
        visualType: "M8_ENTRY_MODEL_FLOW"
      },
      {
        subtitle: "Lesson 8.6 — Stop-Loss Engineering / ስቶፕ ሎስ ምህንድስና",
        english: "**The Only Correct Question**\n\"Where is my trade idea proven wrong?\" Stop-loss must be placed at the point of invalidation, not based on fear or money amount.\n\n**Discipline**\nStop defined BEFORE entry. Never widened. Only tightened if rules allow.",
        amharic: "**ትክክለኛው ጥያቄ**\n\"ሀሳቤ ስህተት መሆኑ የሚረጋገጠው የት ነው?\" ስቶፕ ሎስ መቀመጥ ያለበት ሀሳብዎ ዋጋ በሚያጣበት ቦታ ላይ እንጂ በገንዘብ መጠን አይደለም።",
        visualType: "M8_STOP_LOSS_LOGIC"
      },
      {
        subtitle: "Lesson 8.7 — Take-Profit Logic / የትርፍ አወሳሰድ",
        english: "**Exit Planning**\nEntries get attention, but exits determine results. Define where profits are taken (Fixed R:R, Structural Targets) before you enter.\n\n**Rule**\nDon't let greed decide your exit. Let the chart decide.",
        amharic: "**መውጫን ማቀድ**\nመግቢያ ትኩረት ያገኛል፣ ነገር ግን ውጤቱን የሚወስነው መውጫ ነው። ከመግባትዎ በፊት ትርፍ የት እንደሚወስዱ ይወስኑ።\n\n**ህግ**\nስግብግብነት መውጫዎን አይወስን። ቻርቱ ይወስን።",
        visualType: "NONE"
      },
      {
        subtitle: "Lesson 8.8 — Risk Rules at the Strategy Level / የስትራቴጂ አደጋ ህጎች",
        english: "**Systematic Risk**\nBeyond individual trades, define: Max daily loss, Max trades per day, and Kill-switch rules (e.g., stop trading after 3 consecutive losses).\n\n**Stopping is a Skill**\nKnowing when to walk away saves more money than winning trades make.",
        amharic: "**ስርዓታዊ አደጋ**\nየቀን ገደብዎን ይወቁ። በቀን ስንት ንግድ? ከፍተኛ ኪሳራ ስንት ነው? (ለምሳሌ፡ 3 ጊዜ ከተሸነፍኩ ለዛሬ አቆማለሁ)።\n\n**ማቆም ችሎታ ነው**\nመቼ ማቆም እንዳለበት ማወቅ ትልቅ ገንዘብ ያድናል።",
        visualType: "M8_RISK_RULES"
      },
      {
        subtitle: "Lesson 8.9 — Documentation & Testing / ሰነድ እና ሙከራ",
        english: "**Write It Down**\nIf a strategy is not written, it will change emotionally. Document every rule.\n\n**Backtesting**\nValidate your rules on historical data (30-50 trades) to build confidence before risking real money.",
        amharic: "**ጽፎ ማስቀመጥ**\nስትራቴጂ ካልተፃፈ በስሜት ይቀያየራል። ሁሉንም ህግ ይፃፉ።\n\n**Backtesting (የታሪክ ሙከራ)**\nወደ እውነተኛ ገንዘብ ከመግባትዎ በፊት ቢያንስ 30-50 ያለፉ የገበያ ሁኔታዎችን ይሞክሩ።",
        visualType: "M8_BACKTESTING_FLOW"
      }
    ],
    quiz: [
      { id: 81, question: "What is the definition of a trading strategy?", questionAmharic: "የንግድ ስትራቴጂ ትርጉም ምንድነው?", options: ["A trade you feel good about", "A rule-based framework for repeatable decisions", "Guessing where price will go", "Copying signals"], optionsAmharic: ["ጥሩ ስሜት የሚሰጥ ንግድ", "ተደጋጋሚ ውሳኔዎችን ለመስጠት የሚያስችል ህግ-መር ስርዓት", "ዋጋ ወዴት እንደሚሄድ መገመት", "ሲግናል መቅዳት"], correctIndex: 1 },
      { id: 82, question: "Where should a Stop Loss be placed?", questionAmharic: "ስቶፕ ሎስ (Stop Loss) የት መቀመጥ አለበት?", options: ["Where you lose too much money", "At a random pip distance", "Where the trade idea is proven wrong (Invalidation)", "Just below the entry"], optionsAmharic: ["ብዙ ገንዘብ የሚከስሩበት ቦታ", "በዘፈቀደ ርቀት", "የንግድ ሀሳቡ ስህተት መሆኑ በሚረጋገጥበት ቦታ", "ከመግቢያው ዝቅ ብሎ"], correctIndex: 2 },
      { id: 83, question: "What is a 'Kill Switch' rule?", questionAmharic: "'Kill Switch' (ማቆሚያ ህግ) ምንድነው?", options: ["A rule to stop trading after a specific loss limit", "Closing a winning trade quickly", "Doubling risk after a loss", "Trading news events"], optionsAmharic: ["ከተወሰነ ኪሳራ በኋላ ንግድ ለማቆም የሚወጣ ህግ", "ያሸነፈን ንግድ በፍጥነት መዝጋት", "ከኪሳራ በኋላ ሪስክ መጨመር", "ዜና መነገድ"], correctIndex: 0 }
    ],
    flashcards: [
      { id: 81, front: "Edge", frontAmharic: "Edge", back: "A statistical advantage where one outcome is more likely than another over time.", backAmharic: "በጊዜ ሂደት አንዱ ውጤት ከሌላው የመከሰት እድሉ ሰፊ መሆኑን የሚያሳይ ስታቲስቲክሳዊ ብልጫ።" },
      { id: 82, front: "Invalidation Point", frontAmharic: "Invalidation Point", back: "The exact price level where your trade thesis is proven incorrect.", backAmharic: "የንግድ ትንታኔዎ ስህተት መሆኑ የሚረጋገጥበት ትክክለኛ የዋጋ ደረጃ።" },
      { id: 83, front: "Backtesting", frontAmharic: "Backtesting", back: "Applying trading rules to historical data to verify performance.", backAmharic: "የስትራቴጂን አዋጭነት ለማረጋገጥ ባለፈ የገበያ መረጃ ላይ መሞከር።" }
    ]
  },
  // --- MODULE 9: TRADE MANAGEMENT ---
  {
    id: 9,
    title: "Module 9: Trade Management & Execution Control",
    titleAmharic: "ክፍለ ትምህርት 9፡ የንግድ አስተዳደር እና የትግበራ ቁጥጥር",
    content: [
      {
        subtitle: "Lesson 9.1 — What Trade Management Really Is / የንግድ አስተዳደር ምንድነው?",
        english: "**Core Definition**\nTrade management governs what happens **after** the order is placed. It involves defining allowed actions, forbidden actions, and knowing when to close. It implies that discretion ends once the trade is entered.\n\n**Professional Insight**\nGood entries can still lose money if managed poorly. Bad management guarantees losses. The goal is obedience to the system, not being clever.",
        amharic: "**መሰረታዊ ትርጉም**\nየንግድ አስተዳደር ማለት ትዕዛዝ ከሰጡ **በኋላ** ምን እንደሚደረግ መወሰን ነው። የተፈቀዱ እና የተከለከሉ ተግባራትን መለየት ማለት ነው። አንዴ ወደ ንግድ ከገቡ በኋላ ምርጫ ያበቃል፤ ህግ ብቻ ይቀራል።\n\n**የባለሙያ እይታ**\nጥሩ መግቢያ ቢኖርዎትም በመጥፎ አስተዳደር ሊከስሩ ይችላሉ። አላማው ህግን ማክበር እንጂ ብልጥ መሆን አይደለም።",
        visualType: "M9_MANAGEMENT_TIMELINE"
      },
      {
        subtitle: "Lesson 9.2 — Allowed vs Forbidden Actions / የተፈቀዱ እና የተከለከሉ ተግባራት",
        english: "**Allowed Actions**\n- Doing nothing (The best action).\n- Taking partial profit (If planned).\n- Trailing stop loss (If planned).\n\n**Forbidden Actions**\n- Moving stop loss further away (Gambling).\n- Adding to losing trades.\n- Closing early due to fear.\n- Changing targets mid-trade.",
        amharic: "**የተፈቀዱ ተግባራት**\n- ምንም አለማድረግ (ምርጥ ተግባር)።\n- ከፊል ትርፍ መውሰድ (ከታቀደ)።\n- ስቶፕ ሎስን ማሻሻል (ከታቀደ)።\n\n**የተከለከሉ ተግባራት**\n- ስቶፕ ሎስን ማራቅ (ቁማር ነው)።\n- በሚከስር ንግድ ላይ መጨመር።\n- በፍርሃት ምክንያት ቀድሞ መውጣት።",
        visualType: "M9_ALLOWED_VS_FORBIDDEN"
      },
      {
        subtitle: "Lesson 9.3 — Doing Nothing Is a Skill / ዝም ማለት ክህሎት ነው",
        english: "**The Hardest Action**\nThe most difficult action for most traders is **doing nothing**. Once a trade is placed, monitoring every tick increases anxiety and leads to bad decisions.\n\n**Hands-Off Rule**\nSet your trade, set your alerts, and walk away. Let probability play out.",
        amharic: "**በጣም ከባድ ስራ**\nለአብዛኛውን ነጋዴ ከባድ ስራ **ዝም ማለት** ነው። ንግድ ከከፈቱ በኋላ እያንዳንዱን እንቅስቃሴ መከታተል ጭንቀትን ይጨምራል፤ ስህተት ያሰራል\n\n**የማይነካ ህግ**\nትዕዛዝ ከሰጡ በኋላ ይተዉት። ገበያው ስራውን ይስራ።",
        visualType: "M9_HANDS_OFF_MODE"
      },
      {
        subtitle: "Lesson 9.4 — Partial Profits & Trailing Stops / ከፊል ትርፍ እና ተከታታይ ስቶፕ",
        english: "**Tools, Not Upgrades**\n- **Partial Profit**: Closing part of the position to secure gains. Reduces anxiety but also reduces maximum profit.\n- **Trailing Stop**: Moving SL to break-even or profit to protect gains. Must follow market structure (e.g. move SL only after a new Higher Low forms).",
        amharic: "**መሳሪያዎች**\n- **ከፊል ትርፍ (Partial)**: የተወሰነውን ዘግቶ የተወሰነውን መተው። ጭንቀትን ይቀንሳል ግን ትርፍንም ይቀንሳል።\n- **Trailing Stop**: ስቶፕ ሎስን ወደ ትርፍ ቦታ ማንቀሳቀስ። ይህ መደረግ ያለበት ገበያው አዲስ መዋቅር ሲፈጥር ብቻ ነው።",
        visualType: "M9_TRAILING_STOP_VISUAL"
      },
      {
        subtitle: "Lesson 9.5 — Daily Limits & Session Control / የቀን ገደቦች",
        english: "**Limits Save Accounts**\nA strategy must define:\n- Max trades per day (e.g. 2).\n- Max loss per day (e.g. 2%).\n\n**Professional Rule**\nWhen limits are hit, trading stops immediately. No exceptions. Continuing to trade after hitting a limit is emotional loss chasing.",
        amharic: "**ገደብ አካውንትን ያድናል**\nስትራቴጂዎ ይህን መወሰን አለበት፡\n- በቀን ስንት ንግድ? (ለምሳሌ 2)።\n- የቀን ከፍተኛ ኪሳራ? (ለምሳሌ 2%)።\n\n**የባለሙያ ህግ**\nገደብ ከተነካ ንግድ ይቆማል። ምንም ምክንያት የለም። መቀጠል ስሜታዊነት ነው።",
        visualType: "M9_SESSION_LIMITS"
      },
      {
        subtitle: "Lesson 9.6 — Kill-Switch Rules / የማቆሚያ (Kill-Switch) ህጎች",
        english: "**Forced Pause**\nA kill-switch is a pre-defined rule to force a break. Common triggers:\n- 3 consecutive losses.\n- 5% drawdown in a week.\n- Feeling emotional/angry.\n\nIt protects you from yourself.",
        amharic: "**የግዴታ እረፍት**\nKill-switch ማለት እራስን ከገበያ የማስወጣት ህግ ነው።\n- 3 ተከታታይ ኪሳራ።\n- በሳምንት 5% ኪሳራ።\n- ስሜታዊ መሆን።\n\nይህ እርስዎን ከራስዎ ስሜት ይጠብቅዎታል።",
        visualType: "M9_KILL_SWITCH_SIM"
      },
      {
        subtitle: "Lesson 9.7 — Post-Session Review / የድህረ-ገበያ ግምገማ",
        english: "**Process Over Outcome**\nReview your trades to judge your **behavior**, not the money. Ask:\n- Did I follow my rules?\n- Was the entry valid?\n- Did I respect my stop loss?\n\nA losing trade with perfect execution is a \"Good Loss\". A winning trade with bad execution is a \"Bad Win\".",
        amharic: "**ሂደት ከውጤት ይበልጣል**\nንግድዎን ሲገመግሙ ባህሪዎን እንጂ ገንዘቡን አይዩ።\n- ህጌን አክብሬያለሁ?\n- መግቢያው ትክክል ነበር?\n- ስቶፕ ሎስ አክብሬያለሁ?\n\nህግ አክብረው የከሰሩት \"ጥሩ ኪሳራ\" ነው። ህግ ጥሰው ያገኙት \"መጥፎ ትርፍ\" ነው።",
        visualType: "M9_REVIEW_SCORECARD"
      },
      {
        subtitle: "Lesson 9.8 — Performance vs Identity / ውጤት እና ማንነት",
        english: "**Separation**\nYou are not your trade results. A loss does not mean you are stupid. A win does not mean you are a genius.\n\n**Think in Samples**\nJudge yourself over 20-50 trades, not one. One trade is random; a series of trades reveals your edge.",
        amharic: "**መለያየት**\nእርስዎ የንግድ ውጤትዎ አይደሉም። መክሰር ማለት ደደብ ነዎት ማለት አይደለም። ማሸነፍም ጂኒየስ አያደርግዎትም።\n\n**በስብስብ ያስቡ**\nእራስዎን በ 20 ወይም 50 ንግዶች ድምር እንጂ በአንድ ንግድ አይመዝኑ። አንዱ በዘፈቀደ ነው፤ ስብስቡ ግን ብቃትዎን ያሳያል።",
        visualType: "M9_IDENTITY_SEPARATION"
      }
    ],
    quiz: [
      { id: 91, question: "What is a 'Forbidden Action' after entering a trade?", questionAmharic: "ወደ ንግድ ከገቡ በኋላ 'የተከለከለ ተግባር' የቱ ነው?", options: ["Doing nothing", "Moving Stop Loss further away to avoid a hit", "Taking partial profit as planned", "Closing at target"], optionsAmharic: ["ምንም አለማድረግ", " እንዳይነካ ብሎ ስቶፕ ሎስን ማራቅ", "በታቀደው መሰረት ከፊል ትርፍ መውሰድ", "በታቀደው ቦታ መዝጋት"], correctIndex: 1 },
      { id: 92, question: "What is the purpose of a 'Kill Switch'?", questionAmharic: "'Kill Switch' (የማቆሚያ ህግ) ጥቅሙ ምንድነው?", options: ["To double your profit", "To force a break and stop emotional bleeding", "To execute trades faster", "To analyze news"], optionsAmharic: ["ትርፍን በእጥፍ ለመጨመር", "እረፍት ለማድረግ እና ስሜታዊ ኪሳራን ለማስቆም", "ንግድን በፍጥነት ለመፈፀም", "ዜና ለመተንተን"], correctIndex: 1 },
      { id: 93, question: "How should you judge a trading session?", questionAmharic: "የግብይት ጊዜዎን (Session) እንዴት መገምገም አለብዎት?", options: ["By how much money you made", "By how fast you clicked", "By whether you followed your rules strictly", "By how exciting it was"], optionsAmharic: ["ምን ያህል ገንዘብ እንዳገኙ በማየት", "ምን ያህል በፍጥነት እንደነኩ", "ህግዎን ምን ያህል እንዳከበሩ በማየት", "ምን ያህል አስደሳች እንደነበር"], correctIndex: 2 }
    ],
    flashcards: [
      { id: 91, front: "Kill Switch", frontAmharic: "Kill Switch", back: "A predefined rule that forces you to stop trading for the day/week to prevent emotional damage.", backAmharic: "ስሜታዊ ጉዳትን ለመከላከል ሲባል ንግድን በግዴታ የሚያስቆም ህግ።" },
      { id: 92, front: "Trailing Stop", frontAmharic: "Trailing Stop", back: "Moving your Stop Loss in the direction of profit to lock in gains without increasing risk.", backAmharic: "ያገኙትን ትርፍ ለመጠበቅ ስቶፕ ሎስን ወደ ትርፍ አቅጣጫ ማንቀሳቀስ።" },
      { id: 93, front: "Execution", frontAmharic: "Execution", back: "The act of entering and managing trades according to your plan, without hesitation or deviation.", backAmharic: "ያለ ማመንታት እና ያለ ስህተት በታቀደው መሰረት ንግድን የመፈፀም ብቃት።" }
    ]
  },
  // --- MODULE 10: TRADING PSYCHOLOGY ---
  {
    id: 10,
    title: "Module 10: Trading Psychology (Practical)",
    titleAmharic: "ክፍለ ትምህርት 10፡ የግብይት ስነ-ልቦና (ተግባራዊ)",
    content: [
      {
        subtitle: "Lesson 10.1 — Fear vs Greed Cycles / ፍርሃት እና ስግብግብነት",
        english: "**The Emotion Loop**\nTraders cycle through Hope, FOMO, Greed, Fear, and Regret. This is normal. The problem is not feeling them, but **acting on them**.\n\n**Action**\nDesign your system so emotions cannot influence decisions. If you feel fear, check your risk size. If you feel greed, check your targets.",
        amharic: "**የስሜት ዑደት**\nተስፋ፣ ፍርሃት፣ ስግብግብነት እና ፀፀት የነጋዴ ዑደት ናቸው። ችግሩ ስሜቱ መፈጠሩ ሳይሆን በስሜቱ ላይ ተመስርቶ መወሰኑ ነው።\n\n**መፍትሄ**\nስሜት ውሳኔን እንዳይቆጣጠር ስርዓት ይንደፉ። ፍርሃት ከተሰማዎት የሎት መጠንዎን ይቀንሱ።",
        visualType: "M10_EMOTION_CYCLE"
      },
      {
        subtitle: "Lesson 10.2 — Revenge Trading / የበቀል ንግድ",
        english: "**The Danger**\nRevenge trading happens when a loss creates urgency to 'get it back'. It bypasses all rules and compounds losses.\n\n**Prevention**\nMandatory cooldown period after any loss. Walk away from the screen for 15 minutes.",
        amharic: "**አደጋው**\nየበቀል ንግድ (Revenge Trading) ማለት የከሰሩትን በፍጥነት ለመመለስ የሚደረግ ጥድፊያ ነው። ይህ ህግን ያስጥሳል፤ ኪሳራን ያበዛል።\n\n**መከላከያ**\nከኪሳራ በኋላ የግዴታ እረፍት ያድርጉ።",
        visualType: "M10_REVENGE_TRADING"
      },
      {
        subtitle: "Lesson 10.3 — Overtrading / ከመጠን በላይ መገበያየት",
        english: "**Quality vs Quantity**\nOvertrading is trading without an edge or out of boredom. If your strategy gives 1-2 trades a day, that is a design feature, not a flaw.\n\n**Rule**\nMore trades do not equal more money. More trades equal more risk and more fees.",
        amharic: "**ጥራት vs ብዛት**\nከመጠን በላይ መገበያየት (Overtrading) ማለት ያለ በቂ ምክንያት ወይም በድብርት መነገድ ነው። ስትራቴጂዎ በቀን 1-2 ንግድ ብቻ የሚሰጥ ከሆነ፣ ያ ትክክለኛ ዲዛይን ነው።\n\n**ህግ**\nብዙ ንግድ ማለት ብዙ ገንዘብ ማለት አይደለም።",
        visualType: "M10_OVERTRADING_VISUAL"
      },
      {
        subtitle: "Lesson 10.4 — Rule-Breaking Patterns / ህግን መጣስ",
        english: "**Why We Break Rules**\nRules are broken when discomfort rises or when we attach our self-worth to the outcome.\n\n**Solution**\nRule-breaking is a system failure, not just willpower. If you constantly move stops, use a hard stop that you cannot move.",
        amharic: "**ለምን ህግ እንጥሳለን?**\nህግ የሚጣሰው ምቾት ሲነሳ ወይም ውጤቱን ከማንነታችን ጋር ስናገናኘው ነው።\n\n**መፍትሄ**\nህግ መጣስ የስርዓት ችግር ነው። ሁልጊዜ ስቶፕ ሎስ የሚያንቀሳቅሱ ከሆነ፣ የማይነካ ስቶፕ ሎስ ይጠቀሙ።",
        visualType: "M10_RULE_BREAKING"
      }
    ],
    quiz: [
      { id: 101, question: "What is 'Revenge Trading'?", questionAmharic: "'የበቀል ንግድ' (Revenge Trading) ምንድነው?", options: ["Trading based on a valid signal", "Trading impulsively to recover a loss", "Trading with a small lot size", "Trading news events"], optionsAmharic: ["በትክክለኛ ምልክት መነገድ", "ኪሳራን ለመመለስ በግፊት መነገድ", "በትንሽ ሎት መነገድ", "ዜና መነገድ"], correctIndex: 1 },
      { id: 102, question: "What is the main cause of Overtrading?", questionAmharic: "ከመጠን በላይ ለመገበያየት (Overtrading) ዋና ምክንያት ምንድነው?", options: ["High volatility", "Boredom and lack of patience", "A good strategy", "Low spread"], optionsAmharic: ["ከፍተኛ የገበያ እንቅስቃሴ", "ድብርት እና ትዕግስት ማጣት", "ጥሩ ስትራቴጂ", "ዝቅተኛ ስፕሬድ"], correctIndex: 1 }
    ],
    flashcards: [
      { id: 101, front: "FOMO", frontAmharic: "FOMO", back: "Fear Of Missing Out - Entering a trade late because you see price moving.", backAmharic: "ዋጋ ሲንቀሳቀስ አይቶ የመቅረት ፍርሃት።" },
      { id: 102, front: "Discipline", frontAmharic: "Discipline", back: "The ability to follow your rules even when it is uncomfortable.", backAmharic: "ምቾት ባይሰጥም ህግን የመከተል ችሎታ።" }
    ]
  },
  // --- MODULE 11: JOURNALING ---
  {
    id: 11,
    title: "Module 11: Journaling & Performance Tracking",
    titleAmharic: "ክፍለ ትምህርት 11፡ መዝገብ እና የውጤት ክትትል",
    content: [
      {
        subtitle: "Lesson 11.1 — What to Journal / ምን መመዝገብ አለበት?",
        english: "**Data Logs, Not Diaries**\nJournaling is about collecting data to find your edge. Record: Date, Setup, Entry/Exit Price, Risk, Outcome (R), and Rule Adherence.\n\n**Avoid**\nDo not write long emotional stories. Keep it objective.",
        amharic: "**መረጃ እንጂ ተረት አይደለም**\nጆርናል ማለት መረጃ መሰብሰቢያ ነው። ቀን፣ ምክንያት፣ መግቢያ/መውጫ ዋጋ፣ ሪስክ፣ እና ውጤት ይመዝግቡ። ስሜታዊ ታሪኮችን ያስወግዱ።",
        visualType: "M11_JOURNAL_TEMPLATE"
      },
      {
        subtitle: "Lesson 11.2 — Metrics That Matter / ወሳኝ መለኪያዎች",
        english: "**Core Metrics**\n- **Win Rate**: How often you win.\n- **Risk:Reward (Average R)**: How much you win vs lose.\n- **Expectancy**: The mathematical value of your system over time.\n\n**Ignore**: Dollar profit in the beginning. Focus on R-multiples.",
        amharic: "**ዋና መለኪያዎች**\n- **Win Rate**: የማሸነፍ ድግግሞሽ።\n- **Risk:Reward**: የትርፍ እና ኪሳራ መጠን።\n- **Expectancy**: የስርዓትዎ የረጅም ጊዜ አዋጭነት።\n\nበመጀመሪያ የገንዘብ መጠንን ሳይሆን የ R-እጥፍን (R-multiple) ይመልከቱ።",
        visualType: "M11_METRICS_PRIORITY"
      },
      {
        subtitle: "Lesson 11.3 — Weekly Reviews / የሳምንት ግምገማ",
        english: "**The Loop**\nReview your trades every weekend. Look for patterns: Are you losing on Mondays? Are you breaking rules after a win? This is where growth happens.",
        amharic: "**የግምገማ ዑደት**\nበየሳምንቱ መጨረሻ ንግድዎን ይገምግሙ። ንድፎችን ይፈልጉ፡ ሰኞ ሰኞ ይከስራሉ? ካሸነፉ በኋላ ህግ ይጥሳሉ? እድገት የሚመጣው እዚህ ነው።",
        visualType: "M11_WEEKLY_REVIEW"
      }
    ],
    quiz: [
      { id: 111, question: "What is the most important metric for long-term success?", questionAmharic: "ለረጅም ጊዜ ስኬት ወሳኝ የሆነው መለኪያ የቱ ነው?", options: ["Win Rate only", "Expectancy", "Number of trades", "Highest profit in one trade"], optionsAmharic: ["የማሸነፍ ድግግሞሽ ብቻ", "Expectancy (አዋጭነት)", "የንግድ ብዛት", "አንድ ትልቅ ትርፍ"], correctIndex: 1 },
      { id: 112, question: "What should NOT be in your journal?", questionAmharic: "በጆርናል ውስጥ ምን መግባት የለበትም?", options: ["Entry/Exit prices", "Emotional stories and self-criticism", "Risk Amount", "Date and Time"], optionsAmharic: ["መግቢያ/መውጫ ዋጋ", "ስሜታዊ ታሪኮች እና ራስን መውቀስ", "የአደጋ መጠን", "ቀን እና ሰዓት"], correctIndex: 1 }
    ],
    flashcards: [
      { id: 111, front: "Expectancy", frontAmharic: "Expectancy", back: "The average amount you can expect to win (or lose) per trade over the long run.", backAmharic: "በረጅም ጊዜ ሂደት በአንድ ንግድ አማካይ ትርፍ።" },
      { id: 112, front: "Review", frontAmharic: "Review", back: "Analyzing past trades to identify mistakes and improve future performance.", backAmharic: "ስህተትን ለማረም ያለፉ ንግዶችን መመርመር።" }
    ]
  },
  // --- MODULE 12: ADVANCED MARKET CONCEPTS ---
  {
    id: 12,
    title: "Module 12: Advanced Market Concepts",
    titleAmharic: "ክፍለ ትምህርት 12፡ የላቀ የገበያ ጽንሰ-ሀሳቦች",
    content: [
      {
        subtitle: "Lesson 12.1 — Multi-Timeframe Alignment / የብዝሃ-ታይምፍሬም ጥምረት",
        english: "**The Top-Down Approach**\nAlign your entry with the Higher Timeframe (HTF) bias. If Daily is Bullish, ignore 15m Sell signals. Trade in the direction of the heavy flow.",
        amharic: "**ከላይ-ወደ-ታች እይታ**\nመግቢያዎን ከትልቁ ታይም ፍሬም (HTF) አቅጣጫ ጋር ያስተካክሉ። ዴይሊ (Daily) ወደ ላይ ከሆነ፣ የ 15 ደቂቃ የመሸጥ ምልክቶችን ችላ ይበሉ።",
        visualType: "M12_MULTI_TIMEFRAME"
      },
      {
        subtitle: "Lesson 12.2 — Correlations / የገበያ ትስስር",
        english: "**Inter-Market Analysis**\nAssets are connected. \n- **DXY up** usually means **EURUSD down** and **Gold down**.\n- **Risk On** (Stocks up) usually means **JPY down**.\nUse these correlations to confirm your bias.",
        amharic: "**የገበያ ትስስር**\nንብረቶች ይገናኛሉ።\n- **DXY (ዶላር) ሲጨምር**፣ **EURUSD እና ወርቅ ይቀንሳሉ**።\n- **አክሲዮኖች ሲጨምሩ**፣ **የጃፓን ዬን (JPY)** ይዳከማል።",
        visualType: "M12_CORRELATIONS"
      }
    ],
    quiz: [
      { id: 121, question: "If DXY (Dollar Index) is rallying strongly, what should you expect for EURUSD?", questionAmharic: "DXY (የዶላር ኢንዴክስ) በኃይል ቢጨምር፣ በ EURUSD ላይ ምን ይጠብቃሉ?", options: ["EURUSD will likely rally", "EURUSD will likely drop", "No correlation", "EURUSD will stop moving"], optionsAmharic: ["EURUSD ይጨምራል", "EURUSD ይቀንሳል", "ግንኙነት የላቸውም", "EURUSD ይቆማል"], correctIndex: 1 }
    ],
    flashcards: [
      { id: 121, front: "Correlation", frontAmharic: "Correlation", back: "The statistical relationship between two assets (e.g. Gold and USD move inversely).", backAmharic: "በሁለት ንብረቶች መካከል ያለው ግንኙነት (ምሳሌ፡ ወርቅ እና ዶላር ተቃራኒ ናቸው)።" }
    ]
  },
  // --- MODULE 13: ADVANCED RISK ---
  {
    id: 13,
    title: "Module 13: Advanced Risk & Capital Management",
    titleAmharic: "ክፍለ ትምህርት 13፡ የላቀ የአደጋ እና ካፒታል አስተዳደር",
    content: [
      {
        subtitle: "Lesson 13.1 — The Equity Curve / የካፒታል እድገት መስመር",
        english: "**Smooth Growth**\nYour equity curve should look like a staircase, not a rollercoaster. Consistent small wins and small losses lead to compounding.",
        amharic: "**ቀጣይነት ያለው እድገት**\nየካፒታል እድገትዎ እንደ ደረጃ መሆን አለበት እንጂ እንደ ሮለር ኮስተር መውጣትና መውረድ የለበትም። ትናንሽ ኪሳራዎች እና ትናንሽ ትርፎች ወደ ትልቅ ውጤት ይመራሉ::",
        visualType: "M13_EQUITY_CURVE"
      },
      {
        subtitle: "Lesson 13.2 — Scaling Plan / የማሳደግ እቅድ",
        english: "**Earn the Right**\nDo not increase your risk just because you feel confident. Increase risk only when you have built a 'buffer' of profits.",
        amharic: "**መብቱን ያግኙ**\nበራስ መተማመን ስላለዎት ብቻ ሪስክ አይጨምሩ። ሪስክ መጨመር ያለብዎት ከትርፍ ላይ ነው።",
        visualType: "M13_SCALING_PLAN"
      }
    ],
    quiz: [
      { id: 131, question: "What should a healthy equity curve look like?", questionAmharic: "ጤናማ የካፒታል እድገት ምን ይመስላል?", options: ["Volatile ups and downs", "Steady upward trend like a staircase", "Flat line", "Straight vertical line"], optionsAmharic: ["በጣም የሚዋዥቅ", "ቀስ በቀስ የሚያድግ ደረጃ", "ቀጥ ያለ መስመር", "በአንድ ጊዜ የሚወጣ"], correctIndex: 1 }
    ],
    flashcards: [
      { id: 131, front: "Equity Curve", frontAmharic: "Equity Curve", back: "A graphical representation of the change in your account balance over time.", backAmharic: "የአካውንትዎ የገንዘብ መጠን በጊዜ ሂደት የሚያሳየው ለውጥ።" }
    ]
  },
  // --- MODULE 14: THE PLAYBOOK ---
  {
    id: 14,
    title: "Module 14: The Playbook",
    titleAmharic: "ክፍለ ትምህርት 14፡ የንግድ መመሪያ (Playbook)",
    content: [
      {
        subtitle: "Lesson 14.1 — The Checklist / ማረጋገጫ ዝርዝር",
        english: "**No Tick, No Trade**\nYour playbook is a checklist. Before every trade, you must tick every box. If one condition is missing, you do not click the button.",
        amharic: "**ካልተሟላ አይነግዱ**\nየንግድ መመሪያዎ እንደ ማረጋገጫ ዝርዝር ነው። ሁሉም ሳጥኖች ካልተሞሉ፣ ንግዱን አይክፈቱ።",
        visualType: "M14_PLAYBOOK_CHECKLIST"
      }
    ],
    quiz: [
      { id: 141, question: "What should you do if a trade meets 4 out of 5 criteria?", questionAmharic: "አንድ ንግድ ከ 5 መስፈርቶች 4ቱን ብቻ ቢያሟላ ምን ማድረግ አለብዎት?", options: ["Take the trade anyway", "Reduce risk and take it", "Skip the trade", "Ask a friend"], optionsAmharic: ["ዝም ብሎ መውሰድ", "ሪስክ ቀንሶ መውሰድ", "ንግዱን መተው", "ጓደኛ መጠየቅ"], correctIndex: 2 }
    ],
    flashcards: [
      { id: 141, front: "Playbook", frontAmharic: "Playbook", back: "A collection of your best setups and the rules for trading them.", backAmharic: "የእርስዎ ምርጥ የንግድ አይነቶች እና ህጎች ስብስብ።" }
    ]
  },
  // --- MODULE 15: BACKTESTING ---
  {
    id: 15,
    title: "Module 15: Backtesting Mastery",
    titleAmharic: "ክፍለ ትምህርት 15፡ የኋላ ታሪክ ሙከራ (Backtesting)",
    content: [
      {
        subtitle: "Lesson 15.1 — Why Backtest? / ለምን እንሞክራለን?",
        english: "**Confidence Builder**\nBacktesting proves that your edge works. When you lose in live trading, you won't panic because your data says you will win in the long run.",
        amharic: "**በራስ መተማመን**\nBacktesting ስትራቴጂዎ እንደሚሰራ ያረጋግጣል። በእውነተኛ ንግድ ሲከስሩ አይደናገጡም ምክንያቱም መረጃዎ ያረጋጋዎታል።",
        visualType: "M15_BACKTEST_RESULTS"
      }
    ],
    quiz: [
      { id: 151, question: "What is the main purpose of backtesting?", questionAmharic: "የኋላ ሙከራ (Backtesting) ዋና ጥቅሙ ምንድነው?", options: ["To predict tomorrow's price", "To build statistical confidence in your edge", "To waste time", "To avoid trading live"], optionsAmharic: ["የነገን ዋጋ ለመተንበይ", "በስትራቴጂዎ ላይ በራስ መተማመን ለመገንባት", "ጊዜ ለማጥፋት", "እውነተኛ ንግድን ለመሸሽ"], correctIndex: 1 }
    ],
    flashcards: [
      { id: 151, front: "Sample Size", frontAmharic: "Sample Size", back: "The number of trades in your test data. Larger is better.", backAmharic: "የተሞከሩ ንግዶች ብዛት። በበዛ ቁጥር የተሻለ ነው።" }
    ]
  },
  // --- MODULE 16: IDENTITY ---
  {
    id: 16,
    title: "Module 16: Trader Identity",
    titleAmharic: "ክፍለ ትምህርት 16፡ የነጋዴ ማንነት",
    content: [
      {
        subtitle: "Lesson 16.1 — Identity Shift / የማንነት ለውጥ",
        english: "**Who Are You?**\nShift your identity from 'Someone trying to get rich' to 'A Professional Risk Manager'. Your job is not to predict; it is to protect.",
        amharic: "**እርስዎ ማን ነዎት?**\nማንነትዎን ከ 'ሀብታም ለመሆን የሚሞክር' ወደ 'የአደጋ አስተዳዳሪ' ይቀይሩ። ስራዎ መተንበይ ሳይሆን መጠበቅ ነው።",
        visualType: "M16_IDENTITY_PYRAMID"
      }
    ],
    quiz: [
      { id: 161, question: "What is the true job of a trader?", questionAmharic: "የነጋዴ ትክክለኛ ስራ ምንድነው?", options: ["To be right", "To predict the future", "To manage risk", "To never lose"], optionsAmharic: ["ልክ መሆን", "ወደፊትን መተንበይ", "አደጋን ማስተዳደር", "በጭራሽ አለመክሰር"], correctIndex: 2 }
    ],
    flashcards: [
      { id: 161, front: "Risk Manager", frontAmharic: "Risk Manager", back: "The professional identity of a successful trader.", backAmharic: "የስኬታማ ነጋዴ ትክክለኛ መጠሪያ።" }
    ]
  },
  // --- MODULE 17: CAPITAL SCALING ---
  {
    id: 17,
    title: "Module 17: Capital Scaling",
    titleAmharic: "ክፍለ ትምህርት 17፡ የካፒታል እድገት",
    content: [
      {
        subtitle: "Lesson 17.1 — The Path to Pro / ወደ ባለሙያነት የሚወስደው መንገድ",
        english: "**The Steps**\n1. Demo (Prove the concept).\n2. Small Live Account (Prove emotional control).\n3. Scale Up (Add capital slowly).\nDo not skip steps.",
        amharic: "**ደረጃዎቹ**\n1. ዴሞ (ሀሳቡን ማረጋገጥ)።\n2. ትንሽ እውነተኛ አካውንት (ስሜትን መቆጣጠር)።\n3. ማሳደግ (ካፒታል ቀስ በቀስ መጨመር)። ደረጃ አይዝለሉ።",
        visualType: "M17_CAPITAL_SCALING"
      }
    ],
    quiz: [
      { id: 171, question: "When should you move from Demo to Live?", questionAmharic: "ከዴሞ ወደ እውነተኛ አካውንት መቼ መሸጋገር አለብዎት?", options: ["After 1 lucky trade", "When you double the demo account", "After consistent profitability and rule following", "Immediately"], optionsAmharic: ["አንድ እድለኛ ንግድ በኋላ", "ዴሞውን እጥፍ ሲያደርጉ", "ወጥነት ያለው ትርፍ እና ህግ ማክበር ሲታይ", "ወዲያውኑ"], correctIndex: 2 }
    ],
    flashcards: [
      { id: 171, front: "Funded Account", frontAmharic: "Funded Account", back: "Trading with a firm's capital after passing an evaluation.", backAmharic: "ፈተና ካለፉ በኋላ በተቋም ገንዘብ መነገድ።" }
    ]
  }
];
