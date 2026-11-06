import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function CurrencySwitcher({ className = '' }) {
  const { currency, setCurrency, showToast } = useCMS();

  const handleSelect = (cur) => {
    setCurrency(cur);
    showToast(`Currency switched to ${cur === 'TZS' ? 'Tanzanian Shilling (TZS)' : 'US Dollar (USD)'}`, 'info');
  };

  return (
    <div className={`inline-flex items-center p-1 rounded-full bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 shadow-sm ${className}`} role="group" aria-label="Currency Selector">
      <button
        type="button"
        onClick={() => handleSelect('USD')}
        className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
          currency === 'USD'
            ? 'bg-bamboo-500 text-white shadow-sm'
            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
        }`}
      >
        USD ($)
      </button>
      <button
        type="button"
        onClick={() => handleSelect('TZS')}
        className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
          currency === 'TZS'
            ? 'bg-bamboo-500 text-white shadow-sm'
            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
        }`}
      >
        TZS (TSh)
      </button>
    </div>
  );
}
