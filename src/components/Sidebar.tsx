'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  ArrowLeftRight,
  BarChart3,
  Building2,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
} from 'lucide-react';

/**
 * SIDEBAR COMPONENT
 * ─────────────────
 * UX DECISION: Collapsible sidebar (64px → 240px) to maximize the data-dense
 * dashboard area. Icons-only mode provides spatial memory for power users.
 *
 * Now with full mobile support via an overlay and animated transitions.
 */

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Briefcase,
  ArrowLeftRight,
  BarChart3,
  Building2,
  FileText,
  Settings,
};

interface NavItem {
  label: string;
  icon: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: 'LayoutDashboard', href: '/' },
  { label: 'Portfolio', icon: 'Briefcase', href: '/portfolio' },
  { label: 'Transactions', icon: 'ArrowLeftRight', href: '/transactions' },
  { label: 'Analytics', icon: 'BarChart3', href: '/analytics' },
  { label: 'Real Estate', icon: 'Building2', href: '/real-estate' },
  { label: 'Documents', icon: 'FileText', href: '/documents' },
  { label: 'Settings', icon: 'Settings', href: '/settings' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Handle window resize to determine mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarVariants = {
    open: { x: 0, width: 256 },
    closed: { x: -256, width: 256 },
    desktop: { x: 0, width: collapsed ? 72 : 256 }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={isMobile ? (isOpen ? 'open' : 'closed') : 'desktop'}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-border-subtle bg-surface-primary"
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border-subtle">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg gradient-champagne flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-zinc-900" strokeWidth={2.5} />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap"
                >
                  <p className="font-display text-sm font-bold tracking-wide text-text-primary">
                    AURELIUS
                  </p>
                  <p className="text-[10px] text-text-muted tracking-widest uppercase">
                    Private Equity
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Mobile Close Button */}
          {isMobile && (
            <button 
              onClick={onClose}
              className="p-2 text-text-muted hover:text-text-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => {
                  if (onClose && isMobile) onClose();
                }}
              >
                <motion.div
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-colors duration-200 group
                    ${isActive
                      ? 'text-champagne bg-champagne/8'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50'
                    }
                  `}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-champagne"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                  <AnimatePresence>
                    {(!collapsed || isMobile) && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Controls */}
        <div className="px-2 pb-4 space-y-1 border-t border-border-subtle pt-4">
          {/* Investor Profile (mini) */}
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full gradient-midnight flex items-center justify-center flex-shrink-0 ring-2 ring-champagne/30">
              <span className="text-xs font-bold text-white">VP</span>
            </div>
            <AnimatePresence>
              {(!collapsed || isMobile) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs font-medium text-text-primary truncate">
                    Victor Pahlevi
                  </p>
                  <p className="text-[10px] text-text-muted">Ultra Private</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout */}
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-text-muted hover:text-negative hover:bg-negative/5 transition-colors">
            <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
            <AnimatePresence>
              {(!collapsed || isMobile) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Collapse Toggle - Only show on desktop */}
          {!isMobile && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center justify-center w-full py-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated/50 transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </motion.aside>
    </>
  );
}
