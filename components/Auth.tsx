
import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, TrendingUp, ArrowRight, Loader2, ShieldCheck, GraduationCap, AlertTriangle, WifiOff, Bug, Zap } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase.ts';
import { createUserProfile, getUserProfile } from '../lib/services.ts';
import { User } from '../types.ts';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [view, setView] = useState<'student' | 'admin'>('student');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const activateDemoMode = () => {
    setLoading(true);
    setError(null);
    
    // Check for hardcoded admin
    const isHardcodedAdmin = formData.email === 'abelasrat0@gmail.com';

    // Create a mock user for offline/demo access
    const mockUser: User = {
      id: 'demo-user-123',
      name: formData.name || 'Demo Trader',
      identifier: formData.email || 'demo@example.com',
      method: 'email',
      role: view === 'admin' || isHardcodedAdmin ? 'admin' : 'user',
      isPaid: true // Always paid in demo mode to show features
    };
    
    // Store in local storage to simulate persistence
    localStorage.setItem('trade_user', JSON.stringify(mockUser));
    
    console.log("Offline Demo Mode Activated");
    
    // Simulate delay for realism then login
    setTimeout(() => {
        onLogin(mockUser);
    }, 800);
  };

  const handleTestConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Debug: Attempting to create test user (test@forex.com)...");
      // Use a random email to avoid collision in repeated tests
      const testEmail = `test${Date.now()}@forex.com`;
      const userCredential = await createUserWithEmailAndPassword(auth, testEmail, "password123");
      console.log("Debug: Success!", userCredential.user);
      alert(`Connection Successful! User '${testEmail}' created.`);
      
      const newUser: User = {
          id: userCredential.user.uid,
          name: "Test User",
          identifier: testEmail,
          method: 'email',
          role: 'user',
          isPaid: false 
      };
      await createUserProfile(newUser);

    } catch (err: any) {
      console.error("Debug: Test Failed", err);
      // Auto-fallback check
      if (err.code?.includes('api-key') || err.message?.includes('api-key')) {
         setError("API Key Invalid. Please use Offline Mode.");
         return;
      }

      if (err.code === 'auth/email-already-in-use') {
        alert("Connection Successful! (Email already exists, meaning Firebase is reachable)");
      } else {
        setError(`Connection Failed: ${err.message}. Try Offline Mode.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let firebaseUser;
      
      // Check if API Key is configured in the app instance
      if (!auth.app.options.apiKey) {
        throw new Error("auth/api-key-not-valid");
      }

      if (isLogin) {
        // Login Logic
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        firebaseUser = userCredential.user;
        
        // Fetch profile immediately
        const profile = await getUserProfile(firebaseUser.uid);
        
        // Hardcoded Admin Check
        const isHardcodedAdmin = firebaseUser.email === 'abelasrat0@gmail.com';

        if (profile) {
            // Requirement: "for login take directly to courses"
            // We force isPaid to true for the session if they have a valid profile, 
            // assuming returning users have settled up or we want to bypass payment for now.
            // Override role if it matches hardcoded admin
            onLogin({ 
                ...profile, 
                role: isHardcodedAdmin ? 'admin' : profile.role,
                isPaid: true 
            });
        } else {
            // Check localStorage cache first before defaulting
            const cached = localStorage.getItem('trade_user');
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed.id === firebaseUser.uid) {
                    onLogin({ 
                        ...parsed, 
                        role: isHardcodedAdmin ? 'admin' : parsed.role,
                        isPaid: true 
                    });
                    return;
                }
            }

            // Fallback if profile read fails
            onLogin({
                id: firebaseUser.uid,
                name: firebaseUser.displayName || 'Trader',
                identifier: firebaseUser.email || '',
                method: 'email',
                role: isHardcodedAdmin ? 'admin' : 'user',
                isPaid: true // Bypass payment on login per requirement
            });
        }
      } else {
        // Sign Up Logic
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        firebaseUser = userCredential.user;
        
        // Hardcoded Admin Check
        const isHardcodedAdmin = formData.email === 'abelasrat0@gmail.com';

        // Requirement: "payment process should only occur when we signup"
        const role = view === 'admin' || isHardcodedAdmin ? 'admin' : 'user';
        const newUser: User = {
          id: firebaseUser.uid,
          name: formData.name || 'Trader',
          identifier: formData.email || '',
          method: 'email',
          role: role,
          // If admin, paid is true. If user, paid is FALSE to trigger Payment Screen.
          isPaid: role === 'admin' ? true : false 
        };
        
        await createUserProfile(newUser);
        onLogin(newUser); // This will trigger the Payment Screen in App.tsx because isPaid is false (unless admin)
      }
      
    } catch (err: any) {
      console.error("Auth Error:", err);
      let msg = "Authentication failed.";
      
      const errCode = err.code || '';
      const errMessage = err.message || '';
      
      // Handle specific Firebase errors
      if (
        errCode.includes('api-key') || 
        errMessage.includes('api-key') || 
        errMessage.includes('valid-api-key') ||
        errCode === 'auth/invalid-credential' || 
        errCode === 'auth/configuration-not-found'
      ) {
        console.warn("Firebase configuration issue detected. Suggesting Offline Mode.");
        msg = "Authentication Error: Invalid Credentials or API Key. Please use Offline Demo Mode.";
      } else if (errCode === 'auth/invalid-email') {
        msg = "Invalid email address format.";
      } else if (errCode === 'auth/user-not-found') {
        msg = "User not found. Please Sign Up.";
      } else if (errCode === 'auth/wrong-password') {
        msg = "Incorrect password.";
      } else if (errCode === 'auth/email-already-in-use') {
        msg = "Email already registered.";
      } else if (errCode === 'auth/weak-password') {
        msg = "Password should be at least 6 characters.";
      } else if (errCode === 'auth/network-request-failed') {
        msg = "Network error. Please check connection.";
      }
      
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-trade-dark p-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-trade-dark to-black">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-xl mb-4 rotate-3 transition-colors duration-500 ${view === 'admin' ? 'bg-rose-600 shadow-rose-900/40' : 'bg-trade-primary shadow-blue-900/40'}`}>
            {view === 'admin' ? <ShieldCheck size={32} className="text-white" /> : <TrendingUp size={32} className="text-white" />}
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Forex Mastery</h1>
          <p className="text-trade-muted font-serif italic text-sm">
            {view === 'admin' ? 'System Administration Console' : 'የፎሬክስ ማስተር አካዳሚ'}
          </p>
        </div>

        <div className="bg-trade-card/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
          {/* Portal Switcher */}
          <div className="flex bg-slate-900/50 p-1 rounded-xl mb-8 border border-slate-800">
            <button
              type="button"
              onClick={() => setView('student')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${
                view === 'student' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <GraduationCap size={14} /> Student
            </button>
            <button
              type="button"
              onClick={() => setView('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${
                view === 'admin' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <ShieldCheck size={14} /> Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field - Only for Student Sign Up */}
            {view === 'student' && !isLogin && (
              <div className="space-y-2 animate-fade-in">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-trade-primary/50 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                {view === 'admin' ? 'Admin ID / Email' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  required
                  placeholder={view === 'admin' ? "admin@forexmastery.com" : "email@example.com"}
                  className={`w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 transition-all ${
                    view === 'admin' ? 'focus:ring-rose-500/50' : 'focus:ring-trade-primary/50'
                  }`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase">
                  {view === 'admin' ? 'Access Key' : 'Password'}
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className={`w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 transition-all ${
                    view === 'admin' ? 'focus:ring-rose-500/50' : 'focus:ring-trade-primary/50'
                  }`}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <div className="flex flex-col gap-3 bg-rose-900/20 border border-rose-500/20 p-4 rounded-xl text-rose-300 text-xs font-bold animate-fade-in">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
                <button 
                  type="button"
                  onClick={activateDemoMode}
                  className="bg-rose-500 hover:bg-rose-400 text-white py-2 px-4 rounded-lg text-xs font-black uppercase tracking-widest transition-colors w-full flex items-center justify-center gap-2"
                >
                  <WifiOff size={14} /> Enter Offline Mode
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed ${
                view === 'admin' 
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-900/20' 
                  : 'bg-trade-primary hover:bg-blue-600 shadow-blue-900/20'
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {view === 'admin' ? 'Access Console' : (isLogin ? 'Sign In' : 'Create Account')}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3">
             <button 
                type="button" 
                onClick={activateDemoMode}
                disabled={loading}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-slate-700"
             >
                <Zap size={14} className="text-yellow-400" />
                Use Offline Demo Mode
             </button>
             
             <button type="button" onClick={handleTestConnection} className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1 uppercase tracking-widest transition-colors">
               <Bug size={12} /> Test Firebase Connection
             </button>
          </div>

          {view === 'student' && (
            <div className="mt-6 pt-6 border-t border-slate-800 text-center">
              <p className="text-slate-400 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-trade-primary font-bold hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          )}
          
          {view === 'admin' && (
            <div className="mt-6 pt-6 border-t border-slate-800 text-center">
              <p className="text-slate-500 text-xs font-mono">
                Authorized Personnel Only. <br/>All access attempts are logged.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
