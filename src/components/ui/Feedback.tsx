'use client';

import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Info, Download } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-[999999] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl min-w-[300px]"
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-positive" />
            ) : (
              <Info className="w-5 h-5 text-champagne" />
            )}
            <p className="text-sm font-medium text-white flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-zinc-500" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function DocumentPreviewer() {
  const { isPreviewerOpen, previewDoc, closePreviewer } = useStore();

  return (
    <AnimatePresence>
      {isPreviewerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 lg:p-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-zinc-950 border border-white/10 rounded-3xl w-full max-w-5xl h-full flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-champagne" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{previewDoc?.name}</h3>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-widest">{previewDoc?.type} • {previewDoc?.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-all">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={closePreviewer}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-zinc-900/50 p-8 flex items-center justify-center relative">
              {/* Simulated Document Content */}
              <div className="w-full max-w-2xl aspect-[1/1.414] bg-white rounded shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-zinc-100 p-12 flex flex-col gap-6">
                  <div className="h-8 w-48 bg-zinc-300 rounded" />
                  <div className="h-4 w-full bg-zinc-200 rounded" />
                  <div className="h-4 w-full bg-zinc-200 rounded" />
                  <div className="h-4 w-3/4 bg-zinc-200 rounded" />
                  <div className="grid grid-cols-2 gap-4 mt-12">
                    <div className="h-32 bg-zinc-200 rounded" />
                    <div className="h-32 bg-zinc-200 rounded" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <p className="text-zinc-900 font-bold bg-white px-4 py-2 rounded-full shadow-lg">PREVIEW ONLY</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { FileText } from 'lucide-react';
