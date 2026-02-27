
import React, { useState } from 'react';
import { Flashcard } from '../types.ts';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface FlashcardViewProps {
  cards: Flashcard[];
  langMode: 'english' | 'amharic';
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({ cards, langMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Safety Check
  if (!cards || cards.length === 0) {
     return (
      <div className="bg-trade-card p-10 rounded-[32px] border border-slate-700 text-center flex flex-col items-center justify-center opacity-60 min-h-[300px]">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 mb-6 border border-slate-700">
          <RotateCcw size={32} />
        </div>
         <h3 className="text-lg font-black text-white uppercase tracking-tight">
          {langMode === 'amharic' ? 'ካርዶች የሉም' : 'No Flashcards'}
        </h3>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">
           {langMode === 'amharic' ? 'ለዚህ ክፍል የመለማመጃ ካርዶች አልተዘጋጁም' : 'Memory aids pending deployment'}
        </p>
      </div>
     );
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const currentCard = cards[currentIndex];
  const frontText = langMode === 'amharic' ? currentCard.frontAmharic : currentCard.front;
  const backText = langMode === 'amharic' ? currentCard.backAmharic : currentCard.back;

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative w-full max-w-md h-72 cursor-pointer perspective-1000 group"
        onClick={handleFlip}
      >
        <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-trade-card to-slate-800 border border-trade-primary/30 rounded-[32px] p-8 flex flex-col items-center justify-center text-center shadow-xl">
            <span className="text-[9px] font-black text-trade-primary uppercase tracking-[0.4em] mb-4">
              {langMode === 'amharic' ? 'ቃል' : 'Flashcard Term'}
            </span>
            <h3 className={`text-2xl md:text-3xl font-black text-white uppercase tracking-tight ${langMode === 'amharic' ? 'font-sans normal-case tracking-normal' : ''}`}>{frontText}</h3>
            <div className="absolute bottom-6 text-[9px] font-black text-slate-500 flex items-center gap-2 uppercase tracking-widest">
              <RotateCcw size={12} /> {langMode === 'amharic' ? 'ለመገልበጥ ንካ' : 'Click to Reveal'}
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-trade-primary to-blue-800 border border-white/10 rounded-[32px] p-8 flex flex-col items-center justify-center text-center shadow-xl">
             <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.4em] mb-4">
               {langMode === 'amharic' ? 'ትርጉም' : 'Market Definition'}
             </span>
            <p className={`text-lg md:text-xl text-white font-bold leading-relaxed ${langMode === 'amharic' ? 'font-sans' : ''}`}>{backText}</p>
          </div>
          
        </div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button 
          onClick={handlePrev}
          className="p-3 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all border border-slate-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-slate-500 font-mono font-bold text-xs uppercase tracking-widest">
          {currentIndex + 1} <span className="text-slate-700 mx-1">/</span> {cards.length}
        </span>
        <button 
          onClick={handleNext}
          className="p-3 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all border border-slate-700 active:scale-95"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
