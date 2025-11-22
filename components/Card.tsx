import React from 'react';

interface CardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  highlight?: boolean;
}

export const Card: React.FC<CardProps> = ({ title, icon, children, highlight }) => {
  return (
    <div className={`
      rounded-xl border p-6 shadow-lg transition-all hover:shadow-xl
      ${highlight 
        ? 'bg-gradient-to-b from-indigo-900/20 to-slate-900 border-indigo-500/30' 
        : 'bg-slate-800/40 border-slate-700/60'
      }
    `}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      <div className="text-slate-300">
        {children}
      </div>
    </div>
  );
};