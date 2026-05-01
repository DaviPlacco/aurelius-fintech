import { create } from 'zustand';

export interface PreviewDocument {
  name: string;
  type: string;
  size: string;
  [key: string]: string | number | boolean | undefined | null; // Permitir outras props se necessário, mas todas compatíveis com ReactNode
}

interface AppState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Document filters
  docFilter: string;
  setDocFilter: (filter: string) => void;
  docSearch: string;
  setDocSearch: (search: string) => void;
  
  // Modals
  isPreviewerOpen: boolean;
  previewDoc: PreviewDocument | null;
  openPreviewer: (doc: PreviewDocument) => void;
  closePreviewer: () => void;
  
  // Toasts
  toasts: { id: string; message: string; type: 'success' | 'info' }[];
  addToast: (message: string, type?: 'success' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  activeTab: 'Dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  docFilter: 'All Files',
  setDocFilter: (filter) => set({ docFilter: filter }),
  docSearch: '',
  setDocSearch: (search) => set({ docSearch: search }),
  
  isPreviewerOpen: false,
  previewDoc: null,
  openPreviewer: (doc) => set({ isPreviewerOpen: true, previewDoc: doc }),
  closePreviewer: () => set({ isPreviewerOpen: false, previewDoc: null }),
  
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id),
  })),
}));
