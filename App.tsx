import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeCode } from './services/geminiService';
import { AnalysisResponse } from './types';
import { Loader } from './components/Loader';

export default function App() {
  const [code, setCode] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!code.trim()) {
      setError("Please enter or upload some code first.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeCode(code);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [code]);

  const handleReset = useCallback(() => {
    setCode('');
    setAnalysis(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          
          {/* Left Column: Input */}
          <div className="flex flex-col space-y-4 h-full">
             <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-1 shadow-xl backdrop-blur-sm">
                <InputArea 
                  code={code} 
                  onChange={setCode} 
                  disabled={isAnalyzing} 
                />
             </div>
             
             {error && (
               <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm animate-pulse">
                 ⚠️ {error}
               </div>
             )}

             <div className="sticky bottom-6 z-10">
               <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !code.trim()}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 transform active:scale-[0.98]
                  ${isAnalyzing 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-brand-500/25 hover:shadow-brand-500/40'
                  }
                `}
               >
                 {isAnalyzing ? (
                   <span className="flex items-center justify-center gap-2">
                     Analyzing...
                   </span>
                 ) : (
                   "Analyze Code"
                 )}
               </button>
             </div>
          </div>

          {/* Right Column: Output */}
          <div className="flex flex-col h-full min-h-[500px]">
            {isAnalyzing ? (
              <div className="flex-grow flex items-center justify-center bg-slate-800/30 rounded-xl border border-slate-700/50">
                <Loader />
              </div>
            ) : analysis ? (
              <div className="animate-fadeIn">
                <AnalysisResult analysis={analysis} onReset={handleReset} />
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-slate-500 bg-slate-800/20 rounded-xl border border-slate-700/30 border-dashed p-12 text-center">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <h3 className="text-xl font-semibold text-slate-400 mb-2">Ready to Tutor</h3>
                <p className="max-w-sm text-sm">Paste your code snippet or upload a file on the left to get a beginner-friendly analysis.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}