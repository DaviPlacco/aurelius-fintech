'use client';

/**
 * SETTINGS PAGE
 * ─────────────
 * UX DECISION: Settings use a sectioned form layout with clear visual
 * separation between groups. Each section is independently collapsible
 * on mobile for reduced scroll depth.
 *
 * Toggle switches follow iOS design patterns for instant recognition.
 * Destructive actions (delete account) are visually isolated with red accents.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Bell, Shield, Globe, Moon, Sun,
  Smartphone, Mail, Lock, Eye, EyeOff,
  ChevronRight, Check,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import DashboardLayout from '@/components/DashboardLayout';

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
        enabled ? 'bg-champagne' : 'bg-surface-elevated'
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
      />
    </button>
  );
}

export default function SettingsPage() {
  const { theme: appearance, setTheme: setAppearance } = useTheme();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketAlerts: true,
    transactionAlerts: true,
    weeklyReport: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    biometric: true,
    sessionTimeout: '30',
  });

  return (
    <DashboardLayout>
      <div className="mb-6 lg:mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-text-primary">
          Settings
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Manage your account preferences and security
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-champagne" />
            <h2 className="font-display text-lg font-semibold text-text-primary">Profile</h2>
          </div>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-subtle">
            <div className="w-16 h-16 rounded-full gradient-champagne flex items-center justify-center ring-4 ring-champagne/20">
              <span className="text-xl font-bold text-zinc-900">VP</span>
            </div>
            <div>
              <p className="text-base font-semibold text-text-primary">Victor Pahlevi</p>
              <p className="text-sm text-text-muted">victor.pahlevi@aurelius.com</p>
              <p className="text-xs text-champagne mt-0.5">Ultra Private Tier</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Full Name', value: 'Victor Pahlevi', type: 'text' },
              { label: 'Email', value: 'victor.pahlevi@aurelius.com', type: 'email' },
              { label: 'Phone', value: '+351 912 345 678', type: 'tel' },
              { label: 'Preferred Currency', value: 'USD ($)', type: 'select' },
            ].map((field) => (
              <div key={field.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-text-secondary">{field.label}</p>
                  <p className="text-sm text-text-primary">{field.value}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Moon className="w-5 h-5 text-champagne" />
            <h2 className="font-display text-lg font-semibold text-text-primary">Appearance</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { key: 'dark', label: 'Dark', icon: Moon },
              { key: 'light', label: 'Light', icon: Sun },
              { key: 'system', label: 'System', icon: Globe },
            ].map((theme) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.key}
                  onClick={() => setAppearance(theme.key as 'dark' | 'light' | 'system')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    appearance === theme.key
                      ? 'border-champagne/40 bg-champagne/5 text-champagne'
                      : 'border-border-subtle text-text-muted hover:border-border-active'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{theme.label}</span>
                  {appearance === theme.key && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-champagne" />
            <h2 className="font-display text-lg font-semibold text-text-primary">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email', icon: Mail },
              { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications', icon: Bell },
              { key: 'sms', label: 'SMS Alerts', desc: 'Critical alerts via SMS', icon: Smartphone },
              { key: 'marketAlerts', label: 'Market Alerts', desc: 'Significant market movements', icon: Globe },
              { key: 'transactionAlerts', label: 'Transaction Alerts', desc: 'Every transaction notification', icon: Check },
              { key: 'weeklyReport', label: 'Weekly Report', desc: 'Portfolio summary every Monday', icon: Mail },
            ].map((item) => {
              const Icon = item.icon;
              const key = item.key as keyof typeof notifications;
              return (
                <div key={item.key} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-text-muted" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{item.label}</p>
                      <p className="text-xs text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                  <Toggle
                    enabled={notifications[key]}
                    onChange={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-champagne" />
            <h2 className="font-display text-lg font-semibold text-text-primary">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-text-muted" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Two-Factor Authentication</p>
                  <p className="text-xs text-text-muted">Require 2FA for all logins</p>
                </div>
              </div>
              <Toggle
                enabled={security.twoFactor}
                onChange={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                {security.biometric ? <Eye className="w-4 h-4 text-text-muted" /> : <EyeOff className="w-4 h-4 text-text-muted" />}
                <div>
                  <p className="text-sm font-medium text-text-primary">Biometric Login</p>
                  <p className="text-xs text-text-muted">Face ID / Touch ID authentication</p>
                </div>
              </div>
              <Toggle
                enabled={security.biometric}
                onChange={() => setSecurity({ ...security, biometric: !security.biometric })}
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-text-muted" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Session Timeout</p>
                  <p className="text-xs text-text-muted">Auto-lock after inactivity</p>
                </div>
              </div>
              <select
                value={security.sessionTimeout}
                onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                className="bg-surface-elevated text-text-primary text-xs px-3 py-1.5 rounded-lg border border-border-subtle outline-none"
              >
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 border-red-500/20"
        >
          <h2 className="font-display text-lg font-semibold text-negative mb-2">Danger Zone</h2>
          <p className="text-xs text-text-muted mb-4">
            These actions are irreversible. Please proceed with caution.
          </p>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium rounded-lg border border-negative/30 text-negative hover:bg-negative/10 transition-colors">
              Export All Data
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-lg border border-negative/30 text-negative hover:bg-negative/10 transition-colors">
              Close Account
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
