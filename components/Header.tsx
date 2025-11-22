import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/20">
            CT
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">CodeTutor AI</h1>
            <p className="text-xs text-slate-400">Your Personal Code Assistant</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm text-slate-400">
          <span>Powered by Gemini 2.5 Flash</span>
        </div>
      </div>
    </header>
  );
};