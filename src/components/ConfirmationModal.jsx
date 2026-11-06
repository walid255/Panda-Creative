import React from 'react';
import { useCMS } from '../context/CMSContext';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmationModal() {
  const { confirmModal, closeConfirmation } = useCMS();

  if (!confirmModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md p-6 bg-[#121316] text-white border border-zinc-800 rounded-2xl shadow-2xl animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={closeConfirmation}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full shrink-0 ${confirmModal.isDanger ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-bamboo-500/10 text-bamboo-400 border border-bamboo-500/20'}`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-white mb-2">
              {confirmModal.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              {confirmModal.message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80">
          <button
            type="button"
            onClick={closeConfirmation}
            className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
          >
            {confirmModal.cancelText}
          </button>
          <button
            type="button"
            onClick={confirmModal.onConfirm}
            className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all shadow-lg active:scale-95 ${
              confirmModal.isDanger
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
                : 'bg-bamboo-500 hover:bg-bamboo-400 text-white shadow-bamboo-500/30'
            }`}
          >
            {confirmModal.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
