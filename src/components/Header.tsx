'use client';

import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { MarketTicker } from './MarketTicker';
import { OmniSearch } from './OmniSearch';
import { NotificationMenu, UserMenu } from './HeaderMenus';
import type { MarketIndex } from '@/data/mockData';

/**
 * HEADER COMPONENT
 * ────────────────
 * UX DECISION: Composed of ultra-functional segments: 
 * Live Tickers (Interactive), Omni-Search (Power Navigation), 
 * and Personalized Actions (Menus).
 *
 * Sticky with backdrop-blur to maintain context without blocking vertical real estate.
 */

interface HeaderProps {
  marketIndices: MarketIndex[];
  onMenuToggle?: () => void;
}

export default function Header({ marketIndices, onMenuToggle }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border-subtle bg-surface-primary/80 backdrop-blur-xl sticky top-0 z-30 transition-colors duration-300">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        
        {/* Left Side: Mobile Menu + Market Strip */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden md:flex items-center gap-4">
            {marketIndices.map((index, i) => (
              <motion.div
                key={index.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <MarketTicker index={index} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Search + Notifications + Profile */}
        <div className="flex items-center gap-4">
          <OmniSearch />
          
          <div className="flex items-center gap-1 h-8 w-[1px] bg-border-subtle mx-2" />

          <NotificationMenu />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
