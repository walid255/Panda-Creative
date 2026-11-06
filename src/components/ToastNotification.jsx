import React from 'react';
import { useCMS } from '../context/CMSContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastNotification() {
  const { toasts, removeToast } = useCMS();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-2xl backdrop-blur-md border text-sm transition-all duration-300 animate-slide-up ${
              isSuccess
                ? 'bg-[#0c0d0f]/95 text-white border-bamboo-500/50 shadow-bamboo-500/10'
                : isError
                ? 'bg-red-950/95 text-white border-red-500/50 shadow-red-500/10'
                : 'bg-zinc-900/95 text-zinc-100 border-zinc-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-bamboo-400 shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-bamboo-400 shrink-0" />}
              <span className="font-medium text-xs sm:text-sm">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
