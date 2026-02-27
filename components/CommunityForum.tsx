
import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, User, Clock, ThumbsUp, PlusCircle, 
  Search, Filter, ArrowLeft, Send, MoreHorizontal 
} from 'lucide-react';
import { ForumPost, ForumReply, User as UserType } from '../types.ts';

const MOCK_POSTS: ForumPost[] = [
  {
    id: '1',
    authorId: 'admin',
    authorName: 'System Coach',
    title: 'Welcome to the Community! Read First.',
    content: 'This is a space for professional discourse. Please keep discussions respectful and focused on trading growth. No signal selling allowed.',
    category: 'General',
    timestamp: Date.now() - 100000000,
    likes: 42,
    replies: []
  },
  {
    id: '2',
    authorId: 'user1',
    authorName: 'Sarah T.',
    title: 'Struggling with Module 6 (Market Structure)',
    content: 'I understand Higher Highs, but I keep getting confused when the timeframe changes. How do you guys filter out the noise on the 15m chart vs 4H?',
    category: 'Technical',
    timestamp: Date.now() - 3600000,
    likes: 5,
    replies: [
      {
        id: 'r1',
        authorId: 'user2',
        authorName: 'Mike Trader',
        content: 'Stick to the 4H for direction. Only use 15m for entry confirmation. If 4H is bullish, ignore 15m bearish breaks unless they are huge.',
        timestamp: Date.now() - 1800000,
        likes: 3
      }
    ]
  }
];

interface CommunityForumProps {
  currentUser: UserType;
}

export const CommunityForum: React.FC<CommunityForumProps> = ({ currentUser }) => {
  const [view, setView] = useState<'list' | 'detail' | 'create'>('list');
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  
  // Create Post State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('General');

  // Reply State
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const savedPosts = localStorage.getItem('trade_forum_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(MOCK_POSTS);
      localStorage.setItem('trade_forum_posts', JSON.stringify(MOCK_POSTS));
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('trade_forum_posts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const post: ForumPost = {
      id: Date.now().toString(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      title: newTitle,
      content: newContent,
      category: newCategory,
      timestamp: Date.now(),
      likes: 0,
      replies: []
    };

    setPosts([post, ...posts]);
    setView('list');
    setNewTitle('');
    setNewContent('');
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPostId || !replyContent.trim()) return;

    const reply: ForumReply = {
      id: Date.now().toString(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      content: replyContent,
      timestamp: Date.now(),
      likes: 0
    };

    setPosts(prev => prev.map(p => {
      if (p.id === selectedPostId) {
        return { ...p, replies: [...p.replies, reply] };
      }
      return p;
    }));
    setReplyContent('');
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor((Date.now() - ms) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const selectedPost = posts.find(p => p.id === selectedPostId);

  const filteredPosts = posts.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.content.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in p-2 md:p-4 pb-20">
      
      {/* Header */}
      {view === 'list' && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/80 p-6 rounded-[32px] border border-slate-800 shadow-xl backdrop-blur-md">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <MessageSquare className="text-indigo-500" /> Trader's Hub
            </h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Community Knowledge Base</p>
          </div>
          <button 
            onClick={() => setView('create')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-900/20 transition-all active:scale-95"
          >
            <PlusCircle size={16} /> Ask Question
          </button>
        </div>
      )}

      {view === 'list' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text"
                placeholder="Search discussions..."
                className="w-full bg-trade-card border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex bg-trade-card p-1.5 rounded-2xl border border-slate-800 overflow-x-auto">
              {['All', 'Strategy', 'Psychology', 'Technical', 'General'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${
                    filter === cat ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div 
                  key={post.id}
                  onClick={() => { setSelectedPostId(post.id); setView('detail'); }}
                  className="bg-trade-card border border-slate-800 p-6 rounded-[24px] hover:border-indigo-500/30 hover:bg-slate-800/30 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 font-black text-xs border border-slate-700">
                        {post.authorName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{post.authorName}</h4>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock size={10} /> {formatTime(post.timestamp)}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[9px] font-black uppercase text-slate-400 tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">{post.content}</p>
                  
                  <div className="flex items-center gap-6 border-t border-slate-800/50 pt-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                      <MessageSquare size={16} className="text-indigo-500" />
                      {post.replies.length} Replies
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                      <ThumbsUp size={16} className="text-emerald-500" />
                      {post.likes} Likes
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-trade-card rounded-[32px] border border-slate-800 border-dashed">
                <MessageSquare size={48} className="mx-auto text-slate-700 mb-4" />
                <p className="text-slate-500 font-bold">No discussions found. Start one!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Post View */}
      {view === 'create' && (
        <div className="max-w-3xl mx-auto animate-scale-up">
          <button onClick={() => setView('list')} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
            <ArrowLeft size={16} /> Back to Forum
          </button>
          
          <div className="bg-trade-card border border-slate-800 rounded-[32px] p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Start a Discussion</h2>
            <form onSubmit={handleCreatePost} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Title</label>
                <input 
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="What's on your mind?"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                <div className="flex flex-wrap gap-2">
                  {['General', 'Strategy', 'Psychology', 'Technical'].map((cat: any) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        newCategory === cat 
                          ? 'bg-indigo-500 border-indigo-500 text-white' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Content</label>
                <textarea 
                  required
                  rows={6}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all leading-relaxed"
                  placeholder="Provide details about your question or topic..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-900/20 transition-all">
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail View */}
      {view === 'detail' && selectedPost && (
        <div className="animate-slide-up">
          <button onClick={() => setView('list')} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
            <ArrowLeft size={16} /> Back to Forum
          </button>

          <div className="bg-trade-card border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl mb-6">
            <div className="p-8 border-b border-slate-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-500/20">
                  {selectedPost.authorName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedPost.authorName}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500">
                    <span>{formatTime(selectedPost.timestamp)}</span>
                    <span>•</span>
                    <span className="text-indigo-400">{selectedPost.category}</span>
                  </div>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight">{selectedPost.title}</h1>
              <div className="text-slate-300 leading-loose text-sm whitespace-pre-wrap">{selectedPost.content}</div>
            </div>
            
            <div className="bg-slate-900/50 px-8 py-4 flex items-center justify-between">
               <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                 <ThumbsUp size={18} /> <span className="text-xs font-bold">{selectedPost.likes} Likes</span>
               </button>
               <button className="text-slate-500 hover:text-white transition-colors">
                 <MoreHorizontal size={20} />
               </button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest ml-2">Replies ({selectedPost.replies.length})</h3>
            
            {selectedPost.replies.map(reply => (
              <div key={reply.id} className="bg-trade-card border border-slate-800 p-6 rounded-[24px] flex gap-4 animate-fade-in">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs shrink-0 border border-slate-700">
                  {reply.authorName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-white">{reply.authorName}</span>
                    <span className="text-[10px] font-bold text-slate-600">{formatTime(reply.timestamp)}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{reply.content}</p>
                </div>
              </div>
            ))}

            <div className="bg-trade-card border border-slate-800 p-6 rounded-[24px] sticky bottom-4 shadow-2xl">
              <form onSubmit={handleReply} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="flex-1 relative">
                  <input 
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                    placeholder="Add a reply..."
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}
                  />
                  <button 
                    type="submit"
                    disabled={!replyContent.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:bg-slate-700 text-white rounded-lg transition-all"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
