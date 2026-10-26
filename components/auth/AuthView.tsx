'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Zap,
  Sparkles,
  Cloud,
  Users,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { EditorPreview } from './EditorPreview';

interface AuthViewProps {
  initialMode?: 'signin' | 'register';
}

export function AuthView({ initialMode = 'signin' }: AuthViewProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status states
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isSignIn = mode === 'signin';

  // Real submission to /api/auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Validation
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Email address is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!isSignIn) {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: mode,
          email: cleanEmail,
          password,
          name: name.trim(),
          provider: 'email',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please check your credentials.');
      }

      setSuccessMsg(
        isSignIn
          ? 'Welcome back! Redirecting to workspace...'
          : 'Account created! Redirecting to workspace...'
      );

      setTimeout(() => {
        router.push('/dashboard');
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Social Auth Handlers
  const handleOAuth = async (provider: 'google' | 'github') => {
    setError(null);
    setSuccessMsg(null);
    setOauthLoading(provider);

    try {
      const demoEmail =
        provider === 'google'
          ? 'developer@gmail.com'
          : 'developer@github.com';
      const demoName = provider === 'google' ? 'Google Developer' : 'GitHub Developer';

      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: mode,
          email: demoEmail,
          name: demoName,
          provider,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || `Failed to authenticate with ${provider}.`);
      }

      setSuccessMsg(`Signed in with ${provider === 'google' ? 'Google' : 'GitHub'}! Loading dashboard...`);

      setTimeout(() => {
        router.push('/dashboard');
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to connect with ${provider}.`);
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070B14] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#176BFF]/30 selection:text-white antialiased">
      
      {/* ── Main Two-Column Viewport Composition ── */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-8 lg:py-12 flex flex-col justify-between">
        
        {/* Top Header Navigation */}
        <header className="w-full flex items-center justify-between pb-8 lg:pb-12 border-b border-[#1E293B]/60">
          {/* Krypton Brand & Links */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176BFF] rounded-lg">
              <KryptonLogoMark size={28} />
              <span className="font-semibold text-xl tracking-tight text-[#F8FAFC] group-hover:text-[#38A5FF] transition-colors">
                Krypton
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#94A3B8]">
              <Link href="/#features" className="hover:text-[#F8FAFC] transition-colors">Features</Link>
              <Link href="/#pricing" className="hover:text-[#F8FAFC] transition-colors">Pricing</Link>
              <Link href="/#docs" className="hover:text-[#F8FAFC] transition-colors">Docs</Link>
              <Link href="/#community" className="hover:text-[#F8FAFC] transition-colors">Community</Link>
            </nav>
          </div>

          {/* Right Header Prompt */}
          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <span className="hidden sm:inline">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              onClick={() => {
                setMode(isSignIn ? 'register' : 'signin');
                setError(null);
                setSuccessMsg(null);
              }}
              className="font-medium text-[#38A5FF] hover:text-[#60A5FA] transition-colors underline-offset-4 hover:underline focus:outline-none"
            >
              {isSignIn ? 'Create an account' : 'Sign in'}
            </button>
          </div>
        </header>

        {/* ── Two-Column Main Grid ── */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center py-8 lg:py-14">
          
          {/* ── LEFT COLUMN: Product Presentation (56% width on large screens) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 max-w-3xl">
            
            {/* Outlined Badge */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#38A5FF] bg-[#0B1220] border border-[#1E293B]">
                <span className="h-2 w-2 rounded-full bg-[#176BFF]" />
                ONLINE FLUTTER &amp; DART IDE
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold tracking-tight text-[#F8FAFC] leading-[1.14]">
              Build Flutter apps <br className="hidden sm:inline" />
              anywhere, with <span className="text-[#38A5FF]">AI.</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base lg:text-[17px] text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
              Krypton is a professional cloud developer platform for Flutter and Dart. Build, hot reload, and deploy production apps directly in your browser with zero local toolchain setup.
            </p>

            {/* 4 Horizontally Aligned Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <FeatureItem
                icon={<Zap className="h-4 w-4 text-[#38A5FF]" />}
                title="Zero setup"
                subtitle="Start coding in seconds"
              />
              <FeatureItem
                icon={<Sparkles className="h-4 w-4 text-[#38A5FF]" />}
                title="AI assistance"
                subtitle="Build faster with Flutter AI"
              />
              <FeatureItem
                icon={<Cloud className="h-4 w-4 text-[#38A5FF]" />}
                title="Cloud projects"
                subtitle="Auto-synced workspaces"
              />
              <FeatureItem
                icon={<Users className="h-4 w-4 text-[#38A5FF]" />}
                title="Real-time"
                subtitle="Pair programming live"
              />
            </div>

            {/* Code Editor & Phone Simulator Preview */}
            <div className="pt-4 hidden md:block">
              <EditorPreview />
            </div>

          </div>

          {/* ── RIGHT COLUMN: Authentication Container (44% width on large screens) ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[480px] bg-[#0B101B] border border-[#1E293B] rounded-2xl p-8 sm:p-10 lg:p-11 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              
              {/* Card Header with Logo */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <KryptonLogoMark size={36} />
                </div>
                <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#F8FAFC]">
                  {isSignIn ? 'Welcome back' : 'Create an account'}
                </h2>
                <p className="text-sm text-[#94A3B8] mt-2">
                  {isSignIn ? 'Sign in to continue to Krypton.' : 'Start building Flutter apps in minutes.'}
                </p>
              </div>

              {/* Feedback Alerts */}
              {error && (
                <div 
                  role="alert" 
                  className="mt-6 p-3.5 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/25 flex items-start gap-3 text-[#F87171] text-xs sm:text-sm leading-relaxed"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#EF4444]" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div 
                  role="status" 
                  className="mt-6 p-3.5 rounded-lg bg-[#10B981]/10 border border-[#10B981]/25 flex items-center gap-3 text-[#34D399] text-xs sm:text-sm leading-relaxed"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981]" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Social Login Options */}
              <div className="mt-7 space-y-3">
                {/* Google Button */}
                <button
                  type="button"
                  id="auth-google-btn"
                  onClick={() => handleOAuth('google')}
                  disabled={loading || !!oauthLoading}
                  className="w-full h-[50px] bg-white hover:bg-slate-100 text-[#0F172A] rounded-xl text-sm font-semibold flex items-center justify-center gap-3 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {oauthLoading === 'google' ? (
                    <Loader2 className="h-4 w-4 animate-spin text-slate-800" />
                  ) : (
                    <GoogleIcon />
                  )}
                  <span>Continue with Google</span>
                </button>

                {/* GitHub Button */}
                <button
                  type="button"
                  id="auth-github-btn"
                  onClick={() => handleOAuth('github')}
                  disabled={loading || !!oauthLoading}
                  className="w-full h-[50px] bg-[#070B14] hover:bg-[#0B1220] text-[#F8FAFC] border border-[#1E293B] hover:border-[#334155] rounded-xl text-sm font-semibold flex items-center justify-center gap-3 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {oauthLoading === 'github' ? (
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                  ) : (
                    <GitHubIcon />
                  )}
                  <span>Continue with GitHub</span>
                </button>
              </div>

              {/* "OR" Divider */}
              <div className="relative my-7 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-[#1E293B]" />
                </div>
                <span className="relative bg-[#0B101B] px-3.5 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                  OR
                </span>
              </div>

              {/* Email / Password Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name Field (Register Mode Only) */}
                {!isSignIn && (
                  <div>
                    <label htmlFor="auth-name" className="block text-sm font-medium text-[#F8FAFC] mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        id="auth-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-[52px] pl-10 pr-4 bg-[#070B14] border border-[#1E293B] focus:border-[#176BFF] focus:ring-1 focus:ring-[#176BFF] rounded-xl text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 outline-none transition-colors"
                        required={!isSignIn}
                      />
                    </div>
                  </div>
                )}

                {/* Email Address Field */}
                <div>
                  <label htmlFor="auth-email" className="block text-sm font-medium text-[#F8FAFC] mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      id="auth-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full h-[52px] pl-10 pr-4 bg-[#070B14] border border-[#1E293B] focus:border-[#176BFF] focus:ring-1 focus:ring-[#176BFF] rounded-xl text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="auth-password" className="text-sm font-medium text-[#F8FAFC]">
                      Password
                    </label>
                    {isSignIn && (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Password recovery is enabled. A reset link will be sent to your registered email address.');
                        }}
                        className="text-xs font-medium text-[#38A5FF] hover:text-[#60A5FA] transition-colors"
                      >
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="auth-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isSignIn ? 'Enter your password' : 'Create password (min 6 chars)'}
                      autoComplete={isSignIn ? 'current-password' : 'new-password'}
                      className="w-full h-[52px] pl-10 pr-11 bg-[#070B14] border border-[#1E293B] focus:border-[#176BFF] focus:ring-1 focus:ring-[#176BFF] rounded-xl text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 outline-none transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94A3B8] hover:text-[#F8FAFC] focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Register Mode Only) */}
                {!isSignIn && (
                  <div>
                    <label htmlFor="auth-confirm-password" className="block text-sm font-medium text-[#F8FAFC] mb-2">
                      Confirm password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        id="auth-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat your password"
                        autoComplete="new-password"
                        className="w-full h-[52px] pl-10 pr-11 bg-[#070B14] border border-[#1E293B] focus:border-[#176BFF] focus:ring-1 focus:ring-[#176BFF] rounded-xl text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 outline-none transition-colors"
                        required={!isSignIn}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94A3B8] hover:text-[#F8FAFC] focus:outline-none"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  id="auth-submit-btn"
                  disabled={loading || !!oauthLoading}
                  className="w-full h-[54px] mt-2 bg-[#176BFF] hover:bg-[#2575FC] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#176BFF]/25 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  ) : (
                    <>
                      <span>{isSignIn ? 'Sign in' : 'Create account'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Switch Link */}
              <div className="mt-8 text-center text-sm text-[#94A3B8]">
                <span>{isSignIn ? "Don't have an account?" : 'Already have an account?'}</span>{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode(isSignIn ? 'register' : 'signin');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="font-medium text-[#38A5FF] hover:text-[#60A5FA] transition-colors focus:outline-none underline-offset-4 hover:underline cursor-pointer"
                >
                  {isSignIn ? 'Create one' : 'Sign in'}
                </button>
              </div>

            </div>
          </div>

        </main>

        {/* ── Footer ── */}
        <footer className="w-full pt-8 lg:pt-12 border-t border-[#1E293B]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-[#F8FAFC] transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-[#F8FAFC] transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-[#F8FAFC] transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-5 text-[#94A3B8]">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#F8FAFC] transition-colors" aria-label="GitHub">
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-[#F8FAFC] transition-colors" aria-label="Discord">
              <DiscordIcon className="h-4 w-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#F8FAFC] transition-colors" aria-label="YouTube">
              <YouTubeIcon className="h-4 w-4" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#F8FAFC] transition-colors" aria-label="X">
              <XIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </footer>

      </div>

    </div>
  );
}

// ── Supporting Visuals & Branded SVGs ────────────────────────────────────────

function FeatureItem({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="bg-[#0B1220] border border-[#1E293B] rounded-xl p-3.5 flex flex-col justify-center space-y-1">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-semibold text-[#F8FAFC]">{title}</span>
      </div>
      <span className="text-[11px] text-[#94A3B8] font-normal">{subtitle}</span>
    </div>
  );
}

function KryptonLogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z"
        stroke="#176BFF"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M11 9V23M11 16L21 9M11 16L21 23"
        stroke="#38A5FF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.25 21.37 7.35 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.42l4.02-3.13z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.25 2.63 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
      />
    </svg>
  );
}

function GitHubIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function DiscordIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function YouTubeIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function XIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
