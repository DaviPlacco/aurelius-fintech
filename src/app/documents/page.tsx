'use client';

/**
 * DOCUMENTS PAGE
 * ──────────────
 * UX DECISION: Document vault uses a clean list layout with category
 * grouping. Documents are organized by type (Legal, Tax, Reports, Contracts)
 * with file-type badges and quick download actions.
 *
 * For UHNW clients, document management is critical for compliance,
 * tax optimization, and estate planning.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Download, Eye, Search, Folder,
  File, Shield, Receipt, Scale, Clock,
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

type Category = 'all' | 'legal' | 'tax' | 'reports' | 'contracts';

const documents = [
  { id: 1, name: 'Q1 2026 Portfolio Report', category: 'reports', type: 'PDF', size: '2.4 MB', date: '2026-04-01', icon: FileText, status: 'new' },
  { id: 2, name: 'Annual Tax Statement 2025', category: 'tax', type: 'PDF', size: '1.8 MB', date: '2026-03-15', icon: Receipt, status: 'signed' },
  { id: 3, name: 'Investment Policy Statement', category: 'legal', type: 'PDF', size: '540 KB', date: '2026-01-10', icon: Shield, status: 'active' },
  { id: 4, name: 'Lisboa Prime Tower — Purchase Agreement', category: 'contracts', type: 'PDF', size: '4.1 MB', date: '2024-03-15', icon: Scale, status: 'signed' },
  { id: 5, name: 'Risk Assessment Report', category: 'reports', type: 'PDF', size: '1.2 MB', date: '2026-04-15', icon: FileText, status: 'new' },
  { id: 6, name: 'Estate Planning — Trust Structure', category: 'legal', type: 'PDF', size: '3.2 MB', date: '2025-11-20', icon: Shield, status: 'active' },
  { id: 7, name: 'Capital Gains Tax Estimate 2026', category: 'tax', type: 'XLSX', size: '780 KB', date: '2026-04-10', icon: Receipt, status: 'draft' },
  { id: 8, name: 'Blackstone Fund IV — Subscription Agreement', category: 'contracts', type: 'PDF', size: '5.6 MB', date: '2026-04-25', icon: Scale, status: 'pending' },
  { id: 9, name: 'KYC/AML Verification', category: 'legal', type: 'PDF', size: '920 KB', date: '2025-06-01', icon: Shield, status: 'active' },
  { id: 10, name: 'Monthly Performance — March 2026', category: 'reports', type: 'PDF', size: '1.5 MB', date: '2026-04-05', icon: FileText, status: 'new' },
];

const statusColors: Record<string, string> = {
  new: 'text-champagne bg-champagne/10',
  signed: 'text-positive bg-positive/10',
  active: 'text-blue-400 bg-blue-400/10',
  draft: 'text-text-muted bg-surface-elevated',
  pending: 'text-amber-400 bg-amber-400/10',
};

const categories: { key: Category; label: string; icon: React.ElementType }[] = [
  { key: 'all', label: 'All Files', icon: Folder },
  { key: 'reports', label: 'Reports', icon: FileText },
  { key: 'tax', label: 'Tax', icon: Receipt },
  { key: 'legal', label: 'Legal', icon: Shield },
  { key: 'contracts', label: 'Contracts', icon: Scale },
];

import { useStore } from '@/store/useStore';

export default function DocumentsPage() {
  const { docFilter, setDocFilter, docSearch, setDocSearch, openPreviewer, addToast } = useStore();

  const filtered = documents.filter((doc) => {
    if (docFilter !== 'All Files' && doc.category.toLowerCase() !== docFilter.toLowerCase()) return false;
    if (docSearch && !doc.name.toLowerCase().includes(docSearch.toLowerCase())) return false;
    return true;
  });

  const handleDownload = (docName: string) => {
    addToast(`Download initiated: ${docName}`, 'success');
  };

  return (
    <DashboardLayout>
      <div className="mb-6 lg:mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-text-primary">
          Documents
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Secure document vault — legal, tax, and financial reports
        </p>
      </div>

      {/* Category Tabs + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-1 bg-surface-card rounded-lg p-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => setDocFilter(cat.label)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  docFilter === cat.label
                    ? 'text-champagne bg-champagne/10 shadow-[0_0_15px_rgba(217,160,91,0.1)]'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border-subtle bg-surface-card/50 flex-1 w-full sm:w-auto sm:max-w-xs focus-within:border-champagne/50 transition-all">
          <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
          <input
            type="text"
            placeholder="Search documents..."
            value={docSearch}
            onChange={(e) => setDocSearch(e.target.value)}
            className="bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none w-full"
          />
        </div>
      </div>

      {/* Document List */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="divide-y divide-border-subtle">
          <AnimatePresence mode="popLayout">
            {filtered.map((doc) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-4 px-4 lg:px-6 py-4 hover:bg-surface-elevated/20 transition-colors group relative overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-elevated flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-text-muted" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-text-muted">{doc.type}</span>
                      <span className="text-[11px] text-text-muted">·</span>
                      <span className="text-[11px] text-text-muted">{doc.size}</span>
                      <span className="text-[11px] text-text-muted">·</span>
                      <span className="text-[11px] text-text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusColors[doc.status]}`}>
                      {doc.status}
                    </span>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openPreviewer(doc)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors" 
                        title="Preview"
                      >
                        <Eye className="w-4 h-4 text-text-muted hover:text-champagne transition-colors" />
                      </button>
                      <button 
                        onClick={() => handleDownload(doc.name)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors" 
                        title="Download"
                      >
                        <Download className="w-4 h-4 text-text-muted hover:text-positive transition-colors" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
              <File className="w-8 h-8 mb-3 opacity-30" />
              <p className="text-sm">No documents found</p>
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
