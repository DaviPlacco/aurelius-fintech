'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, User, Settings, Shield, LogOut, 
  CreditCard, ChevronDown, CheckCircle2 
} from 'lucide-react';

/**
 * HEADER MENUS
 * ────────────
 * UX DECISION: Notification and Profile menus use staggered entry 
 * animations to guide the user's eye through the list of actions.
 */

export function NotificationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-[18px] h-[18px]" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-champagne rounded-full ring-2 ring-surface-primary" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 glass z-50 overflow-hidden glow-subtle rounded-xl"
            >
              <div className="p-4 border-b border-border-subtle bg-surface-elevated/30">
                <p className="text-sm font-semibold text-text-primary font-display">Notifications</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {[
                  { title: 'Investment Executed', desc: 'S&P 500 ETF purchase confirmed', time: '2m ago', icon: CheckCircle2, color: 'text-positive' },
                  { title: 'New Document', desc: 'Annual Tax Report 2025 is ready', time: '1h ago', icon: Shield, color: 'text-champagne' },
                  { title: 'Security Alert', desc: 'New login from Lisbon, Portugal', time: '4h ago', icon: Bell, color: 'text-negative' },
                ].map((item, i) => (
                  <div key={i} className="p-4 hover:bg-surface-elevated/50 transition-colors cursor-pointer border-b border-border-subtle last:border-0">
                    <div className="flex gap-3">
                      <item.icon className={`w-4 h-4 mt-0.5 ${item.color}`} />
                      <div>
                        <p className="text-xs font-medium text-text-primary">{item.title}</p>
                        <p className="text-[11px] text-text-muted mt-0.5">{item.desc}</p>
                        <p className="text-[10px] text-text-muted mt-1">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-surface-elevated/30 text-center border-t border-border-subtle">
                <button className="text-[11px] text-champagne font-medium hover:underline">
                  View all activity
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-full border border-border-subtle hover:border-border-active cursor-pointer transition-all bg-surface-primary/50 group"
        aria-label="User profile"
      >
        <div className="hidden sm:block text-right">
          <p className="text-xs font-medium text-text-primary leading-tight group-hover:text-champagne transition-colors">
            Victor P.
          </p>
          <p className="text-[10px] text-champagne leading-tight">
            Ultra Private
          </p>
        </div>
        <div className="w-8 h-8 rounded-full gradient-champagne flex items-center justify-center ring-2 ring-champagne/20 overflow-hidden">
           <span className="text-xs font-bold text-zinc-900">VP</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-56 glass z-50 glow-subtle rounded-xl overflow-hidden"
            >
              <div className="p-4 border-b border-border-subtle bg-surface-elevated/30">
                <p className="text-xs font-medium text-text-primary">Victor Pahlevi</p>
                <p className="text-[10px] text-text-muted mt-0.5">ID: ARL-77291-P</p>
              </div>
              <div className="p-2">
                {[
                  { label: 'Private Profile', icon: User, href: '#' },
                  { label: 'Vault Access', icon: Shield, href: '#' },
                  { label: 'Portfolio Cards', icon: CreditCard, href: '#' },
                  { label: 'Account Settings', icon: Settings, href: '/settings' },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 w-full px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-colors text-left"
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-border-subtle bg-surface-elevated/30">
                <button className="flex items-center gap-3 w-full px-3 py-2 text-xs text-negative hover:bg-negative/5 rounded-lg transition-colors text-left">
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
