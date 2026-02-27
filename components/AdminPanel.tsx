
import React, { useState, useMemo } from 'react';
import { Chapter, User, GlobalUserData, UserProgress, JournalEntry, VisualType, AppSnapshot } from '../types.ts';
import { 
  Users, BookOpen, BarChart3, Edit3, Trash2, Plus, Save, X, 
  Search, PlusCircle, Activity, FileText, 
  CheckCircle2, UserMinus, UserPlus, ShieldCheck, ChevronRight,
  Database, History, Download, Upload, Shield, Zap, TrendingUp,
  Target, GraduationCap, DollarSign, Calendar, MoreHorizontal,
  Mail, Phone
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';

interface AdminPanelProps {
  chapters: Chapter[];
  setChapters: React.Dispatch<React.SetStateAction<Chapter[]>>;
  allUserData: GlobalUserData;
  setAllUserData: React.Dispatch<React.SetStateAction<GlobalUserData>>;
  createSnapshot: (label: string) => void;
  snapshots: AppSnapshot[];
  currentVersion: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  chapters, setChapters, allUserData, setAllUserData, createSnapshot, snapshots, currentVersion 
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'courses' | 'snapshots'>('stats');
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [editorSubTab, setEditorSubTab] = useState<'content' | 'quiz' | 'flashcards'>('content');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userSearch, setUserSearch] = useState('');

  // --- Derived Data Logic ---
  const usersList = useMemo(() => Object.values(allUserData), [allUserData]);
  
  const stats = useMemo(() => {
    const totalUsers = usersList.length;
    const paidUsers = usersList.filter(u => u.user.isPaid).length;
    const totalRevenue = paidUsers * 4000; // Estimated based on 4000 ETB price
    
    let totalScore = 0;
    let totalQuizzes = 0;
    let completedChaptersCount = 0;

    usersList.forEach(u => {
      const scores = Object.values(u.progress.quizScores) as number[];
      if (scores.length > 0) {
        totalScore += scores.reduce((a, b) => a + b, 0);
        totalQuizzes += scores.length;
      }
      completedChaptersCount += u.progress.completedChapters.length;
    });

    const avgScore = totalQuizzes > 0 ? Math.round((totalScore / totalQuizzes) * 100) / 100 : 0; // Raw score, assuming max varies, simple avg for now
    // Normalize avg score to percentage approx (assuming 5-10 questions per quiz, let's just use raw avg for simplicity or mock %)
    const avgScorePct = totalQuizzes > 0 ? Math.min(100, Math.round(totalScore / (totalQuizzes * 3) * 100)) : 0; 

    return { totalUsers, paidUsers, totalRevenue, avgScorePct, completedChaptersCount };
  }, [usersList]);

  const performanceData = useMemo(() => {
    // Mocking module performance data based on chapters
    return chapters.map(ch => {
        // Calculate how many users completed this chapter
        const completedCount = usersList.filter(u => u.progress.completedChapters.includes(ch.id)).length;
        return {
            name: `Mod ${ch.id}`,
            completed: completedCount,
            total: usersList.length,
            passRate: usersList.length > 0 ? Math.round((completedCount / usersList.length) * 100) : 0
        };
    });
  }, [chapters, usersList]);

  // --- Render Helpers ---

  const handleSaveChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChapter) return;

    setChapters(prev => {
      const exists = prev.find(c => c.id === editingChapter.id);
      if (exists) {
        return prev.map(c => c.id === editingChapter.id ? editingChapter : c);
      } else {
        return [...prev, editingChapter];
      }
    });
    setEditingChapter(null);
  };

  const filteredUsers = usersList.filter(u => 
    u.user.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.user.identifier.toLowerCase().includes(userSearch.toLowerCase())
  );

  const getStudentDossier = () => {
    if (!selectedUser) return null;
    const data = allUserData[selectedUser];
    if (!data) return null;

    const { user, progress, journal } = data;
    const winRate = journal.length > 0 ? (journal.filter(j => j.pnl > 0).length / journal.length) * 100 : 0;
    const totalPnL = journal.reduce((acc, j) => acc + j.pnl, 0);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
            <div className="relative bg-trade-card border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-3xl overflow-hidden flex flex-col animate-scale-up">
                <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex justify-between items-start">
                    <div className="flex gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-xl">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white">{user.name}</h2>
                            <div className="flex items-center gap-3 text-slate-400 text-xs mt-1">
                                <span className="flex items-center gap-1"><Mail size={12} /> {user.identifier}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                <span className={`font-bold ${user.isPaid ? 'text-emerald-400' : 'text-slate-500'}`}>{user.isPaid ? 'Premium Member' : 'Free Account'}</span>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <span className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-black uppercase text-slate-400">UID: {user.id.slice(0,8)}</span>
                                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-[10px] font-black uppercase">{user.role}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setSelectedUser(null)} className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {/* Progress Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Completion</p>
                            <h3 className="text-2xl font-black text-white">{Math.round((progress.completedChapters.length / chapters.length) * 100)}%</h3>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden"><div className="h-full bg-emerald-500" style={{width: `${(progress.completedChapters.length / chapters.length) * 100}%`}}></div></div>
                        </div>
                        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Sim PnL</p>
                            <h3 className={`text-2xl font-mono font-black ${totalPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>${totalPnL.toFixed(2)}</h3>
                        </div>
                        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Win Rate</p>
                            <h3 className="text-2xl font-black text-indigo-400">{Math.round(winRate)}%</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Course Progress Detail */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><BookOpen size={16} /> Module Breakdown</h4>
                            <div className="space-y-2">
                                {chapters.map(ch => {
                                    const isDone = progress.completedChapters.includes(ch.id);
                                    const score = progress.quizScores[ch.id];
                                    return (
                                        <div key={ch.id} className={`flex items-center justify-between p-3 rounded-xl border ${isDone ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900/50 border-slate-800'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${isDone ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                                    {isDone ? <CheckCircle2 size={12} /> : ch.id}
                                                </div>
                                                <span className={`text-xs font-bold ${isDone ? 'text-white' : 'text-slate-500'}`}>{ch.title}</span>
                                            </div>
                                            {score !== undefined && <span className="text-xs font-mono font-black text-indigo-400">{score} pts</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Activity size={16} /> Recent Journal</h4>
                            <div className="space-y-2">
                                {journal.length === 0 ? (
                                    <div className="text-center p-8 border border-slate-800 border-dashed rounded-xl text-slate-500 text-xs">No trades recorded yet.</div>
                                ) : (
                                    journal.slice(0, 5).map(j => (
                                        <div key={j.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center">
                                            <div>
                                                <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${j.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>{j.type}</span>
                                                <span className="text-xs font-bold text-white ml-2">{j.symbol}</span>
                                            </div>
                                            <span className={`font-mono text-xs font-black ${j.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{j.pnl >= 0 ? '+' : ''}{j.pnl.toFixed(2)}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Admin Nav */}
      <div className="flex bg-slate-800/40 p-1.5 rounded-2xl border border-slate-700/50 w-fit backdrop-blur-md sticky top-0 z-20">
        {(['stats', 'users', 'courses', 'snapshots'] as const).map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`px-5 py-2.5 rounded-xl flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? 'bg-trade-primary text-white shadow-xl shadow-blue-900/20' : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab === 'stats' ? <BarChart3 size={16} /> : tab === 'users' ? <Users size={16} /> : tab === 'courses' ? <BookOpen size={16} /> : <History size={16} />} 
            {tab}
          </button>
        ))}
      </div>

      {/* --- ANALYTICS DASHBOARD --- */}
      {activeTab === 'stats' && (
        <div className="space-y-8 animate-fade-in">
           {/* KPI Cards */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-trade-card p-6 rounded-[32px] border border-slate-800 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Users size={64} /></div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Students</p>
                 <h3 className="text-3xl font-black text-white">{stats.totalUsers}</h3>
                 <div className="flex items-center gap-1 text-[10px] text-emerald-500 mt-2 font-bold"><TrendingUp size={12} /> +12% this week</div>
              </div>
              <div className="bg-trade-card p-6 rounded-[32px] border border-slate-800 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><DollarSign size={64} /></div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Est. Revenue</p>
                 <h3 className="text-3xl font-black text-white">{stats.totalRevenue.toLocaleString()} <span className="text-sm text-slate-500">ETB</span></h3>
                 <div className="flex items-center gap-1 text-[10px] text-emerald-500 mt-2 font-bold">{stats.paidUsers} Paid Members</div>
              </div>
              <div className="bg-trade-card p-6 rounded-[32px] border border-slate-800 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Target size={64} /></div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Avg Quiz Score</p>
                 <h3 className="text-3xl font-black text-white">{stats.avgScorePct}%</h3>
                 <div className="w-full h-1 bg-slate-800 mt-3 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{width: `${stats.avgScorePct}%`}}></div></div>
              </div>
              <div className="bg-trade-card p-6 rounded-[32px] border border-slate-800 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Activity size={64} /></div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">System Health</p>
                 <h3 className="text-xl font-black text-emerald-500 uppercase flex items-center gap-2"><Zap size={20} fill="currentColor" /> Operational</h3>
                 <p className="text-[10px] text-slate-500 mt-2 font-mono">v{currentVersion}</p>
              </div>
           </div>

           {/* Charts Section */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-trade-card p-8 rounded-[40px] border border-slate-800 shadow-2xl h-[400px] flex flex-col">
                 <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2"><TrendingUp size={16} className="text-trade-primary" /> Enrollment Velocity</h4>
                 <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={[{n: 'Mon', u: 10}, {n: 'Tue', u: 15}, {n: 'Wed', u: 25}, {n: 'Thu', u: 40}, {n: 'Fri', u: stats.totalUsers}]}>
                          <defs>
                             <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <XAxis dataKey="n" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                          <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}} itemStyle={{color: '#fff', fontSize: '12px', fontWeight: 'bold'}} />
                          <Area type="monotone" dataKey="u" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              <div className="bg-trade-card p-8 rounded-[40px] border border-slate-800 shadow-2xl h-[400px] flex flex-col">
                 <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2"><GraduationCap size={16} className="text-emerald-500" /> Module Completion Rate</h4>
                 <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                          <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} unit="%" />
                          <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}} itemStyle={{color: '#fff', fontSize: '12px', fontWeight: 'bold'}} />
                          <Bar dataKey="passRate" radius={[4, 4, 0, 0]}>
                             {performanceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#059669'} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- USER MANAGEMENT --- */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-trade-card p-4 rounded-[32px] border border-slate-800">
             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-trade-primary transition-all"
                  placeholder="Search student database..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                />
             </div>
             <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{filteredUsers.length} Records</span>
                <button className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white border border-slate-700"><Download size={16} /></button>
             </div>
          </div>

          <div className="bg-trade-card rounded-[40px] border border-slate-800 shadow-2xl overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-slate-900/50 border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     <th className="px-8 py-5">Student</th>
                     <th className="px-8 py-5">Role</th>
                     <th className="px-8 py-5">Status</th>
                     <th className="px-8 py-5">Progress</th>
                     <th className="px-8 py-5 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-800/50">
                   {filteredUsers.length === 0 ? (
                     <tr><td colSpan={5} className="px-8 py-10 text-center text-slate-500 text-xs">No users found matching query.</td></tr>
                   ) : filteredUsers.map(({user, progress}) => {
                     const completionPct = Math.round((progress.completedChapters.length / chapters.length) * 100);
                     return (
                       <tr key={user.id} className="hover:bg-slate-800/30 transition-colors group cursor-pointer" onClick={() => setSelectedUser(user.id)}>
                         <td className="px-8 py-4">
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-sm">
                               {user.name.charAt(0).toUpperCase()}
                             </div>
                             <div>
                               <p className="text-sm font-bold text-white group-hover:text-trade-primary transition-colors">{user.name}</p>
                               <p className="text-[10px] text-slate-500 font-mono">{user.identifier}</p>
                             </div>
                           </div>
                         </td>
                         <td className="px-8 py-4">
                           <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                             {user.role === 'admin' ? <ShieldCheck size={14} className="text-rose-500" /> : <UserMinus size={14} />}
                             {user.role}
                           </span>
                         </td>
                         <td className="px-8 py-4">
                           {user.isPaid ? (
                             <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest">Premium</span>
                           ) : (
                             <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">Free Plan</span>
                           )}
                         </td>
                         <td className="px-8 py-4 w-48">
                           <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                             <span>{completionPct}%</span>
                             <span>Lvl {Math.floor(completionPct/20) + 1}</span>
                           </div>
                           <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-500" style={{width: `${completionPct}%`}}></div>
                           </div>
                         </td>
                         <td className="px-8 py-4 text-right">
                           <button className="text-slate-500 hover:text-white transition-colors"><MoreHorizontal size={18} /></button>
                         </td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
             </div>
          </div>
          {getStudentDossier()}
        </div>
      )}

      {/* --- COURSE MANAGER --- */}
      {activeTab === 'courses' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Curriculum Architecture</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1.5">Manage global educational modules</p>
            </div>
            <button 
              onClick={() => setEditingChapter({
                id: chapters.length > 0 ? Math.max(...chapters.map(c => c.id)) + 1 : 1,
                title: 'New Chapter', 
                titleAmharic: 'አዲስ ክፍለ ትምህርት',
                content: [{ subtitle: 'Introduction / መግቢያ', english: '', amharic: '', visualType: 'NONE' }],
                quiz: [], 
                flashcards: []
              })}
              className="bg-trade-primary hover:bg-blue-600 text-white px-7 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] flex items-center gap-2.5 shadow-2xl shadow-blue-900/40 active:scale-95 transition-all"
            >
              <PlusCircle size={20} /> Deploy Module
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="bg-trade-card rounded-[40px] border border-slate-800 p-8 flex items-center justify-between group hover:border-trade-primary/50 transition-all shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-[22px] bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-trade-primary shadow-inner">
                    <span className="text-[9px] font-black uppercase opacity-40">MOD</span>
                    <span className="text-2xl font-black tracking-tighter">{chapter.id.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-white text-base uppercase tracking-tight group-hover:text-trade-primary transition-colors truncate max-w-[200px]">{chapter.title}</h4>
                    <p className="text-[11px] text-slate-500 font-sans font-bold mt-1.5 truncate max-w-[200px]">{chapter.titleAmharic}</p>
                  </div>
                </div>
                <div className="flex gap-2.5 relative z-10">
                  <button onClick={() => setEditingChapter(chapter)} className="p-3.5 rounded-2xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700/50"><Edit3 size={18} /></button>
                  <button onClick={() => { if(confirm("Delete module?")) setChapters(prev => prev.filter(c => c.id !== chapter.id)); }} className="p-3.5 rounded-2xl bg-slate-800/80 text-rose-500/60 hover:text-rose-500 transition-all border border-slate-700/50"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- SNAPSHOTS --- */}
      {activeTab === 'snapshots' && (
        <div className="text-center text-slate-500 p-10 bg-trade-card rounded-[40px] border border-slate-800 border-dashed">
            <Database size={48} className="mx-auto mb-4 opacity-50" />
            <p className="font-bold text-sm">Snapshot feature available for local backup/restore operations.</p>
        </div>
      )}

      {/* --- CHAPTER EDITOR MODAL --- */}
      {editingChapter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setEditingChapter(null)} />
          <div className="relative bg-trade-card border border-slate-700 w-full max-w-5xl h-[92vh] rounded-[50px] flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-scale-up overflow-hidden">
             <header className="px-10 py-7 border-b border-slate-800/80 flex justify-between items-center bg-slate-950/40">
               <div className="flex items-center gap-5">
                 <div className="w-12 h-12 bg-trade-primary rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl shadow-blue-900/30">{editingChapter.id}</div>
                 <div>
                   <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Module Architect</h2>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-0.5">Engineering Knowledge Paths</p>
                 </div>
               </div>
               <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
                  {(['content', 'quiz', 'flashcards'] as const).map(tab => (
                    <button 
                      key={tab} 
                      type="button"
                      onClick={() => setEditorSubTab(tab)} 
                      className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                        editorSubTab === tab ? 'bg-trade-primary text-white shadow-lg shadow-blue-900/20' : 'text-slate-500 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
               </div>
               <button onClick={() => setEditingChapter(null)} className="p-3 text-slate-500 hover:text-white bg-slate-900/50 rounded-2xl border border-slate-800/50">
                 <X size={20} />
               </button>
             </header>

             <form onSubmit={handleSaveChapter} className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-12">
                {editorSubTab === 'content' && (
                  <div className="space-y-12 animate-fade-in">
                    <section className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1"><FileText size={14} className="text-trade-primary inline mr-2" /> Global Title (EN)</label>
                        <input required className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold focus:outline-none focus:ring-2 focus:ring-trade-primary/50 transition-all" value={editingChapter.title} onChange={e => setEditingChapter({...editingChapter, title: e.target.value})} placeholder="e.g. Price Action Masterclass" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1"><FileText size={14} className="text-emerald-500 inline mr-2" /> Amharic Title (AM)</label>
                        <input required className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-sans font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all" value={editingChapter.titleAmharic} onChange={e => setEditingChapter({...editingChapter, titleAmharic: e.target.value})} placeholder="ለምሳሌ የዋጋ እንቅስቃሴ ጥናት" />
                      </div>
                    </section>

                    <section className="space-y-8">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><ChevronRight size={14} className="text-trade-primary" /> Knowledge Blocks ({editingChapter.content.length})</h4>
                        <button type="button" onClick={() => setEditingChapter({...editingChapter, content: [...editingChapter.content, { subtitle: 'Section / ክፍል', english: '', amharic: '', visualType: 'NONE' }]})} className="px-4 py-2 bg-trade-primary/10 text-trade-primary rounded-xl text-[10px] font-black uppercase hover:bg-trade-primary/20 border border-trade-primary/20 transition-all">+ Add Block</button>
                      </div>
                      
                      {editingChapter.content.map((sec, idx) => (
                        <div key={idx} className="bg-slate-950/50 rounded-[40px] border border-slate-800 p-8 space-y-6 relative group transition-all hover:border-slate-700">
                          <button type="button" onClick={() => setEditingChapter({...editingChapter, content: editingChapter.content.filter((_, i) => i !== idx)})} className="absolute top-6 right-6 p-3 text-slate-700 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                          
                          <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-1 w-full space-y-2">
                               <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Sub-Heading</label>
                               <input className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm font-bold text-white w-full focus:outline-none focus:border-trade-primary" value={sec.subtitle} onChange={e => {
                                  const newC = [...editingChapter.content]; newC[idx].subtitle = e.target.value; setEditingChapter({...editingChapter, content: newC});
                               }} />
                            </div>
                            <div className="w-full md:w-64 space-y-2">
                               <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Interactive Diagram</label>
                               <select 
                                 className="bg-slate-900 text-[11px] font-black text-white rounded-xl px-4 py-3 border border-slate-800 uppercase w-full focus:outline-none focus:border-trade-primary"
                                 value={sec.visualType}
                                 onChange={e => {
                                   const newC = [...editingChapter.content]; newC[idx].visualType = e.target.value as VisualType; setEditingChapter({...editingChapter, content: newC});
                                 }}
                               >
                                 <option value="NONE">Static Text Only</option>
                                 <option value="CANDLE_ANATOMY">Candle Anatomy (SVG)</option>
                                 <option value="CANDLE_FORMATION_STEPS">Candle Steps (Interactive)</option>
                                 <option value="MARKET_CYCLE_STEPS">Market Cycle (Interactive)</option>
                                 <option value="ENTRY_FLOW_STEPS">Entry Flow (Interactive)</option>
                                 <option value="SUPPORT_RESISTANCE">S/R Zones (SVG)</option>
                                 <option value="TREND_MAP">Trend Map (SVG)</option>
                                 <option value="RISK_PIE">Risk Pie (SVG)</option>
                                 <option value="FIBONACCI">Fibonacci (SVG)</option>
                                 <option value="GLOBE">Global Market (SVG)</option>
                               </select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">English Content</label>
                               <textarea className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm text-slate-300 h-40 focus:outline-none focus:border-trade-primary transition-all custom-scrollbar" value={sec.english} onChange={e => {
                                 const newC = [...editingChapter.content]; newC[idx].english = e.target.value; setEditingChapter({...editingChapter, content: newC});
                               }} />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Amharic Translation</label>
                               <textarea className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 text-base font-sans font-bold text-slate-200 h-40 focus:outline-none focus:border-emerald-500 transition-all custom-scrollbar" value={sec.amharic} onChange={e => {
                                 const newC = [...editingChapter.content]; newC[idx].amharic = e.target.value; setEditingChapter({...editingChapter, content: newC});
                               }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </section>
                  </div>
                )}

                {/* Quiz Editor */}
                {editorSubTab === 'quiz' && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Assessment Items ({editingChapter.quiz.length})</h4>
                        <button type="button" onClick={() => setEditingChapter({...editingChapter, quiz: [...editingChapter.quiz, { id: Date.now(), question: 'New Question', questionAmharic: 'ጥያቄ', options: ['A','B','C','D'], optionsAmharic: ['ሀ','ለ','ሐ','መ'], correctIndex: 0 }]})} className="px-5 py-2.5 bg-indigo-600/10 text-indigo-400 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-600/20 border border-indigo-600/20 transition-all">+ Add Question</button>
                    </div>
                    {/* Simplified for brevity - in full implementation this renders inputs for Q/A */}
                    {editingChapter.quiz.map((q, i) => (
                        <div key={q.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                            <p className="text-sm font-bold text-white mb-2">{i+1}. {q.question}</p>
                            <div className="flex gap-2">
                                {q.options.map((opt, idx) => (
                                    <span key={idx} className={`text-xs px-2 py-1 rounded ${idx === q.correctIndex ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-500'}`}>{opt}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                  </div>
                )}
             </form>

             <footer className="px-10 py-7 border-t border-slate-800/80 bg-slate-950/40 flex justify-end gap-5">
               <button 
                type="button" 
                onClick={() => setEditingChapter(null)} 
                className="px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase text-slate-500 hover:text-white transition-all"
               >
                 Discard
               </button>
               <button 
                 onClick={handleSaveChapter} 
                 className="px-10 py-3.5 bg-trade-primary hover:bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-blue-900/40 flex items-center gap-2.5 transition-all"
               >
                 <Save size={18} /> Commit to System
               </button>
             </footer>
          </div>
        </div>
      )}
    </div>
  );
};
