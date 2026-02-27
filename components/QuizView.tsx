
import React, { useState } from 'react';
import { QuizQuestion } from '../types.ts';
import { CheckCircle, XCircle, RefreshCw, Trophy, Target, AlertCircle, XOctagon } from 'lucide-react';

interface QuizViewProps {
  questions: QuizQuestion[];
  langMode: 'english' | 'amharic';
  onComplete: (score: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ questions, langMode, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // CRITICAL FIX: Handle empty quiz data to prevent undefined property access
  if (!questions || questions.length === 0) {
    return (
      <div className="bg-trade-card p-10 md:p-14 rounded-[40px] border border-slate-700 text-center flex flex-col items-center justify-center opacity-60 min-h-[400px] animate-fade-in">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 mb-6 border border-slate-700">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
          {langMode === 'amharic' ? 'ለዚህ ክፍል ጥያቄዎች አልተዘጋጁም' : 'Assessment Unavailable'}
        </h3>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest max-w-xs leading-relaxed">
          {langMode === 'amharic' 
            ? 'እባክዎ ወደፊት ተመልሰው ይሞክሩ። አስተዳዳሪው ጥያቄዎችን እያዘጋጀ ነው።' 
            : 'This module is currently pending assessment generation. Please check back later.'}
        </p>
      </div>
    );
  }

  // Reset index if it goes out of bounds (e.g. data change)
  if (currentIndex >= questions.length) {
    setCurrentIndex(0);
    return null;
  }

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === questions[currentIndex].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      onComplete(score + (selectedOption === questions[currentIndex].correctIndex ? 1 : 0));
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="bg-trade-card p-10 md:p-14 rounded-[40px] border border-slate-700 text-center animate-scale-up shadow-3xl">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${passed ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
          {passed ? <Trophy size={40} /> : <XOctagon size={40} />}
        </div>
        <h3 className={`text-2xl font-black mb-2 uppercase tracking-tight ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
          {passed 
            ? (langMode === 'amharic' ? 'አልፈዋል!' : 'Assessment Passed') 
            : (langMode === 'amharic' ? 'አላለፉም' : 'Assessment Failed')}
        </h3>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
          {langMode === 'amharic' ? 'ውጤት (ማለፊያ 70%)' : 'Score (70% Required)'}
        </p>
        <div className={`text-7xl font-black mb-10 tabular-nums tracking-tighter ${passed ? 'text-white' : 'text-slate-400'}`}>
          {percentage}%
        </div>
        
        {passed ? (
          <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-8">
            {langMode === 'amharic' ? 'ቀጣዩን ክፍል መጀመር ይችላሉ።' : 'You have demonstrated mastery. Next module unlocked.'}
          </div>
        ) : (
          <div className="bg-rose-900/20 p-4 rounded-xl border border-rose-500/30 text-rose-300 text-xs font-bold mb-8">
            {langMode === 'amharic' ? 'እባክዎ እንደገና ይሞክሩ።' : 'Review the learning material and try again.'}
          </div>
        )}

        <button 
          onClick={handleRetry}
          className="flex items-center justify-center gap-3 mx-auto px-10 py-5 bg-white hover:bg-slate-200 text-slate-900 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95"
        >
          <RefreshCw size={16} />
          {langMode === 'amharic' ? 'እንደገና ሞክር' : 'Retake Assessment'}
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const questionText = langMode === 'amharic' ? currentQuestion.questionAmharic : currentQuestion.question;
  const optionsList = langMode === 'amharic' ? currentQuestion.optionsAmharic : currentQuestion.options;

  return (
    <div className="bg-trade-card p-8 md:p-10 rounded-[40px] border border-slate-700 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Target size={100} className="text-trade-primary" />
      </div>

      <div className="flex justify-between items-center mb-10 relative z-10">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Module Quiz</span>
          <span className="text-xs font-mono font-bold text-trade-primary">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="text-right flex flex-col">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Current Score</span>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
            {score} Correct
          </span>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className={`text-xl md:text-2xl font-black text-white mb-10 leading-tight tracking-tight uppercase ${langMode === 'amharic' ? 'font-sans normal-case tracking-normal' : ''}`}>
          {questionText}
        </h3>

        <div className="space-y-3">
          {optionsList.map((option, idx) => {
            let optionClass = "w-full p-5 rounded-2xl text-left border transition-all duration-300 flex justify-between items-center group ";
            
            if (isAnswered) {
              if (idx === currentQuestion.correctIndex) {
                optionClass += "bg-emerald-500/10 border-emerald-500 text-emerald-200";
              } else if (idx === selectedOption) {
                optionClass += "bg-rose-500/10 border-rose-500 text-rose-200";
              } else {
                optionClass += "bg-slate-900 border-slate-800 text-slate-600 opacity-50";
              }
            } else {
              optionClass += "bg-slate-900 border-slate-800 hover:border-trade-primary hover:bg-slate-800 text-slate-300";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={optionClass}
              >
                <span className={`text-[11px] font-black uppercase tracking-wide ${langMode === 'amharic' ? 'font-sans text-base normal-case tracking-normal font-bold' : ''}`}>
                  {option}
                </span>
                {isAnswered && idx === currentQuestion.correctIndex && <CheckCircle className="text-emerald-500 shrink-0" size={18} />}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && <XCircle className="text-rose-500 shrink-0" size={18} />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-10 flex justify-center animate-fade-in">
            <button
              onClick={handleNext}
              className="px-10 py-4 bg-white text-slate-900 rounded-2xl hover:bg-slate-200 transition-all font-black uppercase tracking-widest text-[10px] shadow-2xl active:scale-95"
            >
              {currentIndex < questions.length - 1 
                ? (langMode === 'amharic' ? 'የሚቀጥለው ጥያቄ' : 'Next Question') 
                : (langMode === 'amharic' ? 'ውጤት ይመልከቱ' : 'Finalize Result')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
