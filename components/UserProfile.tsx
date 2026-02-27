
import React, { useState, useEffect } from 'react';
import { User, UserProgress, Chapter } from '../types.ts';
import { 
  User as UserIcon, Mail, Save, Edit2, Camera, Trophy, 
  BookOpen, Star, Settings, LogOut, Shield, Bell, Lock,
  ChevronRight, Zap, Target, ShieldCheck
} from 'lucide-react';
import * as dbService from '../lib/services.ts';

interface UserProfileProps {
  user: User;
  progress: UserProgress;
  chapters: Chapter[];
  onUpdateUser: (updatedUser: User) => void;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, progress, chapters, onUpdateUser, onLogout }) => {
  // Defensive check
  if (!user) return <div className="p-8 text-white flex items-center justify-center h-64"><p>Loading Profile...</p></div>;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    identifier: user.identifier || ''
  });
  const [stats, setStats] = useState({ xp: 0, streak: 0 });

  // Sync state with props in case parent updates
  useEffect(() => {
    setFormData({
        name: user.name || '',
        identifier: user.identifier || ''
    });
  }, [user]);

  useEffect(() => {
    if (user?.id) {
        dbService.getGameStats(user.id).then(data => {
            if (data) setStats(data);
        }).catch(err => console.warn("Stats load error", err));
    }
  }, [user?.id]);

  const handleSave = async () => {
    if (!user) return;
    const updatedUser = { ...user, name: formData.name, identifier: formData.identifier };
    onUpdateUser(updatedUser);
    try {
        await dbService.updateUserProfileData(user.id, { name: formData.name, identifier: formData.identifier });
    } catch (e) {
        console.error("Profile update failed", e);
    }
    setIsEditing(false);
  };

  // Safe Calculations
  const completedCount = progress?.completedChapters?.length || 0;
  const totalChapters = chapters?.length || 0;
  const progressPercent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;
  
  const quizScores: number[] = progress?.quizScores ? Object.values(progress.quizScores) : [];
  const avgScore = quizScores.length > 0 
    ? Math.round(quizScores.reduce((a: number, b: number) => a + b, 0) / (quizScores.length * 3) * 100)
    : 0;

  // Level Calc
  const xpSafe = stats?.xp || 0;
  const level = Math.floor(xpSafe / 100) + 1;
  const xpProgress = xpSafe % 100;
  const streakSafe = stats?.streak || 0;

  // Initial Avatar Fallback
  const avatarChar = (formData.name && formData.name.length > 0) 
    ? formData.name.charAt(0).toUpperCase() 
    : 'T';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in p-2 md:p-4 pb-20">
      
      {/* Header Profile Card */}
      <div className="bg-trade-card border border-slate-800 rounded-[40px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-900/50 to-purple-900/50"></div>
        <div className="absolute top-4 right-6 flex gap-3">
           {!isEditing ? (
             <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-slate-700 transition-all">
               <Edit2 size={14} /> Edit Profile
             </button>
           ) : (
             <button onClick={handleSave} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all">
               <Save size={14} /> Save Changes
             </button>
           )}
        </div>

        <div className="relative flex flex-col md:flex-row items-end md:items-center gap-8 mt-12">
           <div className="relative group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-slate-900 border-4 border-trade-card flex items-center justify-center text-indigo-500 shadow-2xl">
                 <span className="text-4xl md:text-5xl font-black">
                    {avatarChar}
                 </span>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-trade-primary text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              )}
           </div>
           
           <div className="flex-1 space-y-4 w-full">
              <div>
                 {isEditing ? (
                   <div className="space-y-4 max-w-md">
                     <div>
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Display Name</label>
                       <input 
                         className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                         value={formData.name}
                         onChange={e => setFormData({...formData, name: e.target.value})}
                       />
                     </div>
                     <div>
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Account Email</label>
                       <input 
                         className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                         value={formData.identifier}
                         onChange={e => setFormData({...formData, identifier: e.target.value})}
                       />
                     </div>
                   </div>
                 ) : (
                   <>
                     <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1">
                        {formData.name || 'Trader'}
                     </h1>
                     <p className="text-slate-400 font-medium flex items-center gap-2">
                       <Mail size={16} className="text-slate-500" /> {formData.identifier}
                     </p>
                   </>
                 )}
              </div>
              
              {!isEditing && (
                <div className="flex flex-wrap gap-3">
                   <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                     <ShieldCheck size={14} /> {user.isPaid ? 'Premium Access' : 'Free Plan'}
                   </div>
                   <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                     <Trophy size={14} /> Level {level} Trader
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Progress & Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Course Progress */}
         <div className="bg-trade-card border border-slate-800 rounded-[32px] p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                 <BookOpen className="text-blue-500" size={20} /> Academy Progress
               </h3>
               <span className="text-2xl font-black text-white">{progressPercent}%</span>
            </div>
            
            <div className="space-y-6">
               <div>
                  <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                     <span>Modules Completed</span>
                     <span>{completedCount} / {totalChapters}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                     <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
                     <Target size={24} className="text-purple-500 mb-2" />
                     <span className="text-2xl font-black text-white">{avgScore}%</span>
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Avg Quiz Score</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
                     <Zap size={24} className="text-yellow-500 mb-2" />
                     <span className="text-2xl font-black text-white">{streakSafe}</span>
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Day Streak</span>
                  </div>
               </div>
            </div>
         </div>

         {/* XP Leveling */}
         <div className="bg-trade-card border border-slate-800 rounded-[32px] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
               <Star size={140} />
            </div>
            
            <h3 className="text-lg font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
               <Trophy className="text-yellow-500" size={20} /> Trader Rank
            </h3>

            <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 rounded-full bg-slate-900 border-4 border-yellow-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                  <span className="text-3xl font-black text-yellow-500">{level}</span>
               </div>
               <div>
                  <p className="text-sm font-bold text-slate-300 uppercase tracking-wide">Current XP</p>
                  <p className="text-3xl font-black text-white tracking-tighter">{xpSafe} <span className="text-lg text-slate-600">/ {(level) * 100}</span></p>
               </div>
            </div>

            <div>
               <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  <span>Progress to Level {level + 1}</span>
                  <span>{100 - xpProgress} XP Remaining</span>
               </div>
               <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-600 transition-all duration-1000 relative overflow-hidden" style={{ width: `${xpProgress}%` }}>
                     <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Settings & Danger Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-trade-card border border-slate-800 rounded-[32px] p-8 shadow-xl">
            <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
               <Settings className="text-slate-400" size={20} /> Account Settings
            </h3>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500"><Bell size={20} /></div>
                     <div>
                        <p className="font-bold text-white text-sm">Email Notifications</p>
                        <p className="text-[10px] text-slate-500">Receive weekly performance reports</p>
                     </div>
                  </div>
                  <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer border border-slate-700">
                     <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full"></div>
                  </div>
               </div>

               <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500"><Shield size={20} /></div>
                     <div>
                        <p className="font-bold text-white text-sm">Public Profile</p>
                        <p className="text-[10px] text-slate-500">Allow other traders to see your rank</p>
                     </div>
                  </div>
                  <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer shadow-lg shadow-emerald-500/20">
                     <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
               </div>
               
               <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800 opacity-50">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500"><Lock size={20} /></div>
                     <div>
                        <p className="font-bold text-white text-sm">Change Password</p>
                        <p className="text-[10px] text-slate-500">Managed via Auth Provider</p>
                     </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-600" />
               </div>
            </div>
         </div>

         <div className="bg-trade-card border border-slate-800 rounded-[32px] p-8 shadow-xl flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mb-4 border border-rose-500/20">
               <LogOut size={32} />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">Sign Out</h3>
            <p className="text-xs text-slate-500 mb-6 max-w-[200px]">Securely log out of your account on this device.</p>
            <button 
               onClick={onLogout}
               className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-rose-900/20 transition-all active:scale-95"
            >
               Log Out
            </button>
         </div>
      </div>
    </div>
  );
};
