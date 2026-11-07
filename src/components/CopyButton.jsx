import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function CopyButton({ text, label = 'Copy', className = '', iconOnly = false }) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useCMS();

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast(`Copied "${text}" to clipboard!`, 'info');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy to clipboard', 'error');
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      title={label}
      aria-label={copied ? 'Copied to clipboard' : label}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
        copied
          ? 'bg-bamboo-500 text-white'
          : 'bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700 border border-zinc-700/50'
      } ${className}`}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
      {!iconOnly && <span>{copied ? 'Copied!' : label}</span>}
    </button>
  );
}
