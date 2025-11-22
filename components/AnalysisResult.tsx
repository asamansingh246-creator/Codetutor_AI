import React, { useState } from 'react';
import { AnalysisResponse } from '../types';
import { Card } from './Card';

interface AnalysisResultProps {
  analysis: AnalysisResponse;
  onReset: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, onReset }) => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'improved'>('analysis');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis.improvedCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Summary Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-brand-900/50 text-brand-300 border border-brand-500/30 mb-2">
              {analysis.language}
            </span>
            <span className="inline-block ml-2 px-2 py-1 rounded text-xs font-bold bg-purple-900/50 text-purple-300 border border-purple-500/30 mb-2">
              {analysis.studentSummary.difficulty}
            </span>
            <h2 className="text-2xl font-bold text-white mb-2">Analysis Complete</h2>
            <p className="text-slate-300">{analysis.purpose}</p>
          </div>
          <button 
            onClick={onReset}
            className="text-slate-400 hover:text-white transition-colors text-sm underline decoration-slate-600 hover:decoration-white underline-offset-4"
          >
            Start Over
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-800/50 p-1 rounded-lg border border-slate-700 w-fit">
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'analysis'
              ? 'bg-slate-700 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Explanation & Review
        </button>
        <button
          onClick={() => setActiveTab('improved')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'improved'
              ? 'bg-slate-700 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Improved Code
        </button>
      </div>

      {activeTab === 'analysis' ? (
        <div className="space-y-6 animate-fadeIn">
          
          <Card title="Step-by-Step Explanation" icon="📝">
            <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
              {analysis.stepByStep}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card title="How to Use" icon="🚀">
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-wrap">
                  {analysis.usage}
                </div>
             </Card>
             <Card title="Critique & Improvements" icon="🔍">
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-wrap">
                  {analysis.critique}
                </div>
             </Card>
          </div>

          <Card title="Student Summary" icon="🎓" highlight>
            <div className="space-y-4">
                <p className="text-lg font-medium text-slate-100">
                    {analysis.studentSummary.summaryText}
                </p>
                
                <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Concepts</h4>
                    <div className="flex flex-wrap gap-2">
                        {analysis.studentSummary.keyConcepts.map((concept, idx) => (
                            <span key={idx} className="px-2 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded text-xs">
                                {concept}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="pt-2 border-t border-slate-700/50">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Next Steps</h4>
                    <p className="text-sm text-slate-400">{analysis.studentSummary.nextSteps}</p>
                </div>
            </div>
          </Card>

        </div>
      ) : (
        <div className="animate-fadeIn h-full">
          <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
               <span className="text-xs font-mono text-slate-400">Improved Version</span>
               <button
                 onClick={handleCopy}
                 className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded transition-colors flex items-center gap-2"
               >
                 {copySuccess ? (
                    <>
                        <span className="text-green-400">✓</span> Copied
                    </>
                 ) : (
                    <>
                        <span>Copy Code</span>
                    </>
                 )}
               </button>
            </div>
            <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-blue-100">
              <code>{analysis.improvedCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};