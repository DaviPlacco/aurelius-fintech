'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';


/**
 * OMNI-SEARCH COMPONENT
 * ────────────────────
 * UX DECISION: Keyboard-first navigation (CMD+K) is a staple of professional 
 * software (Linear, Raycast). It empowers power users to navigate large datasets 
 * without taking hands off the keyboard.
 *
 * DESIGN: Uses a subtle glow on focus to guide visual attention.
 */

export function OmniSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className={`
        relative flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300
        ${isFocused 
          ? 'border-champagne/60 bg-surface-card shadow-[0_0_20px_rgba(201,169,110,0.1)]' 
          : 'border-border-subtle bg-surface-card/50 hover:border-border-active'
        }
      `}
    >
      <Search className={`w-3.5 h-3.5 transition-colors ${isFocused ? 'text-champagne' : 'text-text-muted'}`} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search portfolio, docs..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="bg-transparent border-none outline-none text-xs text-text-primary placeholder:text-text-muted w-40 md:w-56"
        aria-label="Omni Search"
      />
      <kbd className="hidden sm:flex items-center gap-1 text-[10px] bg-surface-elevated px-1.5 py-0.5 rounded font-mono text-text-muted border border-border-subtle">
        <span className="text-xs">⌘</span>K
      </kbd>
    </div>
  );
}
