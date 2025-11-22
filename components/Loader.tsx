import React, { useEffect, useState } from 'react';

export const Loader: React.FC = () => {
  const [message, setMessage] = useState("Reading code...");
  
  useEffect(() => {
    const messages = [
      "Reading code...",
      "Identifying language...",
      "Analyzing logic...",
      "Checking for bugs...",
      "Generating improvements...",
      "Writing explanation..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setMessage(messages[i]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-slate-300 font-medium animate-pulse">{message}</p>
    </div>
  );
};