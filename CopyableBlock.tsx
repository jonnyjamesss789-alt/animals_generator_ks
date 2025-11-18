import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyableBlockProps {
  title?: string;
  content: string;
  isPrompt?: boolean;
}

const CopyableBlock: React.FC<CopyableBlockProps> = ({ title, content, isPrompt = false }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(content).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }, [content]);

  if (isPrompt) {
      return (
        <div className="p-3 bg-slate-700/50 rounded-md flex justify-between items-start gap-4">
            <p className="text-slate-300 flex-grow text-sm">{content}</p>
            <button
                onClick={copyToClipboard}
                className="p-2 text-slate-400 hover:text-white transition-colors duration-200 flex-shrink-0"
                aria-label="Copy prompt"
            >
                {hasCopied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
            </button>
        </div>
      )
  }

  return (
    <div>
      {title && 
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-md font-semibold text-cyan-200">{title}</h4>
        </div>
      }
      <div className="relative group">
        <pre className="p-3 bg-slate-700/50 rounded-md text-slate-300 text-sm whitespace-pre-wrap font-sans">{content}</pre>
        <button 
            onClick={copyToClipboard} 
            className="absolute top-2 right-2 p-2 bg-slate-600/50 rounded-md text-slate-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            aria-label="Copy content"
        >
          {hasCopied ? <Check size={16} className="text-green-400"/> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};

export default CopyableBlock;
