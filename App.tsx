
import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { auth } from './lib/firebase.ts';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import * as dbService from './lib/services.ts';
import { courseData as initialCourseData } from './data.ts';
import { UserProgress, User, Chapter, GlobalUserData, JournalEntry, AppSnapshot } from './types.ts';
import { Navigation } from './components/Navigation.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { ChapterContent } from './components/ChapterContent.tsx';
import { QuizView } from './components/QuizView.tsx';
import { FlashcardView } from './components/FlashcardView.tsx';
import { TradingSimulator } from './components/TradingSimulator.tsx';
import { PatternTrainer } from './components/PatternTrainer.tsx';
import { FundamentalTrainer } from './components/FundamentalTrainer.tsx';
import { PriceActionGame } from './components/PriceActionGame.tsx';
import { EconomicCalendar } from './components/EconomicCalendar.tsx';
import { MindsetHub } from './components/MindsetHub.tsx';
import { TradingJournal } from './components/TradingJournal.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { Auth } from './components/Auth.tsx';
import { PaymentScreen } from './components/PaymentScreen.tsx';
import { AiMentor } from './components/AiMentor.tsx';
import { CommunityForum } from './components/CommunityForum.tsx';
import { Menu, LogOut, Type, Globe, Loader2, WifiOff } from 'lucide-react';

const APP_VERSION = "3.1.0-MASTERY";

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [currentChapterId, setCurrentChapterId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'quiz' | 'flashcards'>('content');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [langMode, setLangMode] = useState<'english' | 'amharic'>('english');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [progress, setProgress] = useState<UserProgress>({ completedChapters: [], quizScores: {} });
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [allUserData, setAllUserData] = useState<GlobalUserData>({});
  const [snapshots, setSnapshots] = useState<AppSnapshot[]>([]);
  const [offlineMode, setOfflineMode] = useState(false);

  // Initialize Data: Auth Listener & Firebase Data
  useEffect(() => {
    // Load static/admin data locally for now (Chapters)
    const storedChapters = localStorage.getItem('trade_chapters');
    if (storedChapters) {
      setChapters(JSON.parse(storedChapters));
    } else {
      setChapters(initialCourseData);
    }

    // Attempt to load user from localStorage first (for offline mode persistence)
    const localUser = localStorage.getItem('trade_user');
    if (localUser) {
      setCurrentUser(JSON.parse(localUser));
      setOfflineMode(true);
      setLoading(false);
    }

    // Modular Auth Listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setOfflineMode(false);
        try {
          // Fetch user profile from Firestore
          const userProfile = await dbService.getUserProfile(firebaseUser.uid);
          
          if (userProfile) {
            setCurrentUser(userProfile);
            localStorage.setItem('trade_user', JSON.stringify(userProfile)); // Sync to local
            
            // Fetch User Data in parallel
            const [fetchedProgress, fetchedJournal] = await Promise.all([
              dbService.getUserProgress(firebaseUser.uid),
              dbService.getJournalEntries(firebaseUser.uid)
            ]);

            setProgress(fetchedProgress);
            setJournal(fetchedJournal);
          } else {
            // Profile missing (Race Condition), construct temporary user from Auth data
            console.warn("Profile not found in DB yet. Creating temporary session.");
            const tempUser: User = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || 'Trader',
                identifier: firebaseUser.email || '',
                method: 'email',
                role: 'user',
                isPaid: false
            };
            setCurrentUser(tempUser);
            // Don't save temp user to local storage to force refetch on next load
          }
        } catch (error) {
          console.error("Error fetching user data from Firebase:", error);
          // Fallback to local if Firebase fetch fails but we have a user
          setOfflineMode(true);
        }
      } else {
        // Only clear if we are not in forced offline mode
        if (!localStorage.getItem('trade_user')) {
          setCurrentUser(null);
          setProgress({ completedChapters: [], quizScores: {} });
          setJournal([]);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Effect to load local data if in Offline Mode
  useEffect(() => {
    if (offlineMode && currentUser) {
      const savedProgress = localStorage.getItem(`trade_progress_${currentUser.id}`);
      if (savedProgress) setProgress(JSON.parse(savedProgress));

      const savedJournal = localStorage.getItem(`trade_journal_${currentUser.id}`);
      if (savedJournal) setJournal(JSON.parse(savedJournal));
    }
  }, [offlineMode, currentUser]);

  const handleManualLogin = (user: User) => {
    setCurrentUser(user);
    setOfflineMode(true);
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
    localStorage.removeItem('trade_user');
    setCurrentUser(null);
    setOfflineMode(false);
  };

  const handleUpdateProgress = async (newScore: number, chapterId: number) => {
    if (!currentUser) return;

    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    const totalQuestions = chapter.quiz.length;
    const percentage = totalQuestions > 0 ? (newScore / totalQuestions) * 100 : 0;
    const isPassing = percentage >= 70;

    const newProgress = { ...progress };
    
    // Update Logic locally
    if (isPassing && !newProgress.completedChapters.includes(chapterId)) {
      newProgress.completedChapters = [...newProgress.completedChapters, chapterId];
    }
    newProgress.quizScores = {
      ...newProgress.quizScores,
      [chapterId]: Math.max(newProgress.quizScores[chapterId] || 0, newScore)
    };

    // Update State
    setProgress(newProgress);

    if (offlineMode) {
      localStorage.setItem(`trade_progress_${currentUser.id}`, JSON.stringify(newProgress));
    } else {
      await dbService.saveUserProgress(currentUser.id, newProgress);
    }
  };

  const handleAddJournalEntry = async (entry: JournalEntry) => {
    if (!currentUser) return;
    setJournal([entry, ...journal]);
    
    if (offlineMode) {
      const updatedJournal = [entry, ...journal];
      localStorage.setItem(`trade_journal_${currentUser.id}`, JSON.stringify(updatedJournal));
    } else {
      await dbService.saveJournalEntry(currentUser.id, entry);
    }
  };

  const handlePaymentSuccess = async () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, isPaid: true };
      setCurrentUser(updatedUser);
      if (offlineMode) {
        localStorage.setItem('trade_user', JSON.stringify(updatedUser));
      } else {
        await dbService.updateUserPaymentStatus(currentUser.id);
      }
    }
  };

  const createSnapshot = (label: string) => {
    // Keep snapshots local for Admin specifically
    const snap: AppSnapshot = {
      timestamp: Date.now(),
      version: APP_VERSION,
      label,
      data: { chapters, allUserData }
    };
    const newSnaps = [snap, ...snapshots];
    setSnapshots(newSnaps);
    localStorage.setItem('trade_snapshots', JSON.stringify(newSnaps));
  };

  const handleNavigate = (view: string, chapterId?: number) => {
    setCurrentView(view);
    if (chapterId) {
      setCurrentChapterId(chapterId);
      setActiveTab('content');
    }
    setIsSidebarOpen(false);
  };

  if (loading) return <div className="h-screen bg-trade-dark flex items-center justify-center text-trade-primary"><Loader2 className="animate-spin" size={48} /></div>;
  
  if (!currentUser) return <Auth onLogin={handleManualLogin} />;
  
  if (!currentUser.isPaid && currentUser.role !== 'admin') {
    return (
      <PaymentScreen 
        userName={currentUser.name} 
        onPaymentSuccess={handlePaymentSuccess} 
      />
    );
  }

  const currentChapter = currentChapterId ? chapters.find(c => c.id === currentChapterId) : null;

  return (
    <HashRouter>
      <div className="flex h-screen bg-trade-dark overflow-hidden font-sans">
        <Navigation 
          chapters={chapters} 
          currentChapterId={currentChapterId} 
          currentView={currentView} 
          onNavigate={handleNavigate} 
          progress={progress} 
          currentUser={currentUser} 
          isOpen={isSidebarOpen} 
          onCloseMobile={() => setIsSidebarOpen(false)} 
        />

        <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
          <header className="h-16 border-b border-slate-700 bg-trade-card/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 z-20 shrink-0">
            <div className="flex items-center gap-4 min-w-0">
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-700 text-slate-300 lg:hidden">
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-3 min-w-0">
                <h2 className="font-semibold text-white truncate text-lg uppercase tracking-widest">
                  {currentView}
                </h2>
                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
                  {offlineMode ? (
                    <div className="flex items-center gap-2 text-rose-400">
                      <WifiOff size={14} />
                      <span className="text-[10px] font-black uppercase tracking-wider">OFFLINE MODE</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter">{APP_VERSION}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400">
              <LogOut size={18} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="mx-auto max-w-5xl pb-24 space-y-8">
              {currentView === 'dashboard' && (
                <Dashboard progress={progress} chapters={chapters} onStartChapter={(id) => handleNavigate('chapter', id)} />
              )}
              {currentView === 'simulator' && <TradingSimulator onAddJournal={handleAddJournalEntry} />} 
              {currentView === 'game' && <PriceActionGame />}
              {currentView === 'forum' && <CommunityForum currentUser={currentUser} />}
              {currentView === 'trainer' && <PatternTrainer currentUser={currentUser} />}
              {currentView === 'fundamental' && <FundamentalTrainer />}
              {currentView === 'calendar' && <EconomicCalendar />}
              {currentView === 'mindset' && <MindsetHub />}
              {currentView === 'journal' && <TradingJournal entries={journal} />}
              {currentView === 'mentor' && <AiMentor journal={journal} progress={progress} chapters={chapters} />}
              
              {currentView === 'admin' && currentUser.role === 'admin' && (
                <AdminPanel 
                  chapters={chapters} 
                  setChapters={setChapters} 
                  allUserData={allUserData} 
                  setAllUserData={setAllUserData} 
                  createSnapshot={createSnapshot} 
                  snapshots={snapshots}
                  currentVersion={APP_VERSION}
                />
              )}
              {currentView === 'chapter' && currentChapter && (
                <div className="animate-fade-in space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex bg-slate-800 p-1 rounded-xl w-fit border border-slate-700">
                      {['content', 'quiz', 'flashcards'].map(t => (
                        <button 
                          key={t} 
                          onClick={() => setActiveTab(t as any)} 
                          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === t ? 'bg-trade-primary text-white' : 'text-slate-400'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-700 flex self-start">
                      <button
                        onClick={() => setLangMode('english')}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all flex items-center gap-2 uppercase tracking-widest ${
                          langMode === 'english' ? 'bg-trade-primary text-white shadow-lg' : 'text-slate-500 hover:text-white'
                        }`}
                      >
                        <Type size={14} /> English
                      </button>
                      <button
                        onClick={() => setLangMode('amharic')}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all flex items-center gap-2 font-sans uppercase tracking-widest ${
                          langMode === 'amharic' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
                        }`}
                      >
                        <Globe size={14} /> Amharic
                      </button>
                    </div>
                  </div>
                  
                  {activeTab === 'content' && (
                    <ChapterContent 
                      chapter={currentChapter} 
                      langMode={langMode} 
                      onAction={(tab) => setActiveTab(tab)}
                      isCompleted={progress.completedChapters.includes(currentChapter.id)}
                    />
                  )}
                  {activeTab === 'quiz' && <QuizView langMode={langMode} questions={currentChapter.quiz} onComplete={(s) => handleUpdateProgress(s, currentChapter.id)} />}
                  {activeTab === 'flashcards' && <FlashcardView langMode={langMode} cards={currentChapter.flashcards} />}
                </div>
              )}
            </div>
          </div>

          <footer className="h-10 bg-slate-950 border-t border-slate-800 flex items-center overflow-hidden shrink-0 z-30">
             <div className="animate-ticker whitespace-nowrap flex items-center gap-12 px-6">
                {[
                  { p: 'XAU/USD', v: '2742.45', d: '+1.2%' },
                  { p: 'EUR/USD', v: '1.08542', d: '-0.3%' },
                  { p: 'GBP/USD', v: '1.26410', d: '+0.1%' },
                  { p: 'USD/JPY', v: '149.230', d: '+0.4%' },
                  { p: 'BTC/USD', v: '98432.10', d: '+2.1%' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-[10px] font-bold">
                    <span className="text-slate-500">{item.p}</span>
                    <span className="text-white">{item.v}</span>
                    <span className="text-emerald-500">{item.d}</span>
                  </div>
                ))}
             </div>
          </footer>
        </main>
      </div>
      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-ticker { animation: ticker 40s linear infinite; }
      `}</style>
    </HashRouter>
  );
};

export default App;
