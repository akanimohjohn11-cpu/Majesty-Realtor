'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, ArrowRight, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react';
import BrandLogo from '@/components/brand/BrandLogo';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Incorrect security password. Access denied.');
      }

      // Store in localStorage as persistent client session (ideal for iframe & browser restrictions)
      if (typeof window !== 'undefined') {
        try {
          if (data.token) {
            localStorage.setItem('majesty_admin_session', data.token);
          }
          if (data.user) {
            localStorage.setItem('majesty_admin_user', JSON.stringify(data.user));
          }
        } catch {}

        // Also set document.cookie directly on the client to guarantee it is set in the browser jar
        if (data.token) {
          document.cookie = `majesty_admin_session=${encodeURIComponent(
            data.token
          )}; path=/; max-age=604800; SameSite=None; Secure`;
        }

        // Full browser navigation to guarantee cookies & storage are flushed
        window.location.href = '/admin/overview';
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D4A36] via-[#0F5B41] to-[#1E332B] flex flex-col justify-center items-center p-6 text-[#FAF9F6]">
      <div className="w-full max-w-md">
        {/* Brand Kicker with Logo Insignia */}
        <div className="flex flex-col items-center mb-8">
          <BrandLogo href="/" size="lg" variant="light" />
          <p className="text-xs text-[#DFBE6C] mt-3 font-semibold tracking-wide uppercase">
            Private Executive Administration Desk
          </p>
        </div>

        {/* Password-Only Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-[#1E332B] border border-[#DFBE6C]/30 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/15 flex items-center justify-center text-[#0D4A36] mb-5 mx-auto">
            <KeyRound className="w-6 h-6 text-[#D4AF37]" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-[#0D4A36]">Admin Dashboard Login</h2>
            <p className="text-xs text-[#5B6F66] mt-1">
              Enter the authorized security password to manage property inventory, viewing requests, and inbound leads.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-pwd" className="block text-xs font-semibold text-[#1E332B] mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#5B6F66] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="admin-pwd"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security password..."
                  className="w-full text-xs pl-10 pr-10 py-3 rounded-xl border border-[#0D4A36]/20 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 bg-[#FAF9F6]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#5B6F66] hover:text-[#0D4A36]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0D4A36] hover:bg-[#093527] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>{loading ? 'Verifying Password...' : 'Unlock Admin Dashboard'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DFBE6C]" />
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-[#DFBE6C] hover:text-white transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
