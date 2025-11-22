import React, { useRef } from 'react';

interface InputAreaProps {
  code: string;
  onChange: (val: string) => void;
  disabled: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ code, onChange, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        onChange(text);
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be selected again if needed
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/50 rounded-t-xl">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Input Code</h2>
        <div className="flex gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-md transition-colors border border-slate-700 disabled:opacity-50"
          >
            Upload File
          </button>
          <button
            onClick={() => onChange('')}
            disabled={disabled || !code}
            className="text-xs text-slate-400 hover:text-red-400 px-3 py-1.5 transition-colors disabled:opacity-50"
          >
            Clear
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.cs,.html,.css,.json,.txt,.rb,.php,.go,.rs,.swift"
        />
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="// Paste your code here or upload a file..."
        className="flex-grow w-full bg-slate-900 text-slate-200 font-mono text-sm p-4 focus:outline-none focus:ring-2 focus:ring-brand-500/50 rounded-b-xl resize-none leading-relaxed"
        spellCheck={false}
      />
    </div>
  );
};