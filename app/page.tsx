'use client';

import Link from 'next/link';
import { useState } from 'react';
import { KryptonLogo } from '@/components/ui/krypton-logo';
import { Menu, X, Play, ArrowRight, Terminal, Code2, Layers, Zap, GitBranch, Cpu } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Templates', href: '/templates' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
  { label: 'Community', href: '#community' },
];

const FEATURES = [
  {
    icon: Code2,
    title: 'Monaco Editor',
    description: 'Full-featured Dart/Flutter editor with syntax highlighting, autocomplete, and error detection.',
  },
  {
    icon: Terminal,
    title: 'Integrated Terminal',
    description: 'Run flutter pub get, analyze, and build commands directly from your browser.',
  },
  {
    icon: Layers,
    title: 'Live Preview',
    description: 'See your Flutter UI rendered in real time across mobile, tablet, and desktop targets.',
  },
  {
    icon: Zap,
    title: 'AI Assistant',
    description: 'Connect Claude, GPT, or Gemini to generate, explain, and refactor your Flutter code.',
  },
  {
    icon: GitBranch,
    title: 'Project Management',
    description: 'Organize multiple Flutter projects with version tracking and template starters.',
  },
  {
    icon: Cpu,
    title: 'No Setup Required',
    description: 'No Flutter SDK, Dart SDK, Android Studio, or emulator. Just open a browser and build.',
  },
];

// Fake IDE preview code
const PREVIEW_CODE = `import 'package:flutter/material.dart';

void main() => runApp(const StudentApp());

class StudentApp extends StatelessWidget {
  const StudentApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Student App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF3D8EF8),
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}`;

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* ── Nav ── */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(14,15,17,0.92)',
        backdropFilter: 'blur(12px)',
      }}>
        <nav style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <KryptonLogo size={24} />

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} style={{
                padding: '6px 12px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 6,
                transition: 'color 120ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/signin" style={{
              padding: '6px 14px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 6,
              border: '1px solid var(--border)',
            }}>
              Sign In
            </Link>
            <Link
              href="/signin"
              id="nav-get-started"
              style={{
                padding: '6px 14px',
                background: 'var(--accent)',
                color: '#fff',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 6,
                transition: 'background-color 150ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Get Started
            </Link>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: 8 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{ borderTop: '1px solid var(--border)', padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} style={{ padding: '10px 12px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, borderRadius: 6 }}>
                {l.label}
              </Link>
            ))}
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '8px 0' }} />
            <Link href="/signin" style={{ padding: '10px 12px', color: 'var(--text-primary)', textDecoration: 'none', fontSize: 14 }}>Sign In</Link>
            <Link href="/signin" style={{ padding: '10px 12px', background: 'var(--accent)', color: '#fff', textDecoration: 'none', fontSize: 14, borderRadius: 6, fontWeight: 600 }}>Get Started</Link>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 0' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '4px 12px', borderRadius: 20,
            border: '1px solid var(--accent-border)',
            background: 'var(--accent-subtle)',
            fontSize: 12, fontWeight: 500, color: 'var(--accent)',
            marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            Flutter & Dart · Browser-native
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            marginBottom: 20,
          }}>
            Build Flutter apps<br />from your browser.
          </h1>

          <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 36 }}>
            Krypton is a professional cloud IDE for Flutter and Dart development.
            No local setup. No SDK installation. Just open a browser and start building.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/signin"
              id="hero-get-started"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: 'var(--accent)',
                color: '#fff',
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 600,
                borderRadius: 8,
                transition: 'background-color 150ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Get Started <ArrowRight size={16} />
            </Link>
            <Link href="/ide" id="hero-view-demo" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px',
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: 15,
              fontWeight: 500,
              borderRadius: 8,
              border: '1px solid var(--border)',
            }}>
              <Play size={14} /> View Demo
            </Link>
          </div>
        </div>

        {/* ── IDE Preview ── */}
        <div style={{
          border: '1px solid var(--border)',
          borderRadius: 12,
          overflow: 'hidden',
          background: 'var(--bg-panel)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          maxWidth: 1100,
          margin: '0 auto',
        }}>
          {/* Window chrome */}
          <div style={{ padding: '10px 16px', background: 'var(--bg-base)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f85149' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#d29922' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#3fb950' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <KryptonLogo size={16} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>student_app — Krypton</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--success-subtle)', color: 'var(--success)', fontWeight: 500 }}>Flutter 3.22.0</span>
            </div>
          </div>

          {/* IDE body */}
          <div style={{ display: 'flex', height: 420 }}>
            {/* Activity bar */}
            <div style={{ width: 48, background: 'var(--bg-base)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 4 }}>
              {['📁', '🔍', '⎇', '🐛', '🧩'].map((icon, i) => (
                <div key={i} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: i === 0 ? 'var(--bg-elevated)' : 'none', fontSize: 14, cursor: 'pointer' }}>{icon}</div>
              ))}
            </div>

            {/* File tree */}
            <div style={{ width: 180, background: 'var(--bg-panel)', borderRight: '1px solid var(--border)', padding: '8px 0', fontSize: 12, overflow: 'hidden' }}>
              <div style={{ padding: '4px 12px', color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Explorer</div>
              {['📂 lib', '  📄 main.dart', '  📄 home.dart', '  📂 widgets', '📄 pubspec.yaml', '📄 README.md'].map((f, i) => (
                <div key={i} style={{ padding: '3px 12px', color: i === 1 ? 'var(--accent)' : 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer', background: i === 1 ? 'var(--accent-subtle)' : 'none' }}>{f}</div>
              ))}
            </div>

            {/* Editor */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-base)' }}>
                {['main.dart', 'home.dart'].map((tab, i) => (
                  <div key={tab} style={{ padding: '8px 16px', fontSize: 12, color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)', borderRight: '1px solid var(--border)', borderBottom: i === 0 ? '2px solid var(--accent)' : 'none', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace' }}>{tab}</div>
                ))}
              </div>
              {/* Code */}
              <div style={{ flex: 1, padding: '12px 0', overflow: 'hidden', background: '#0d1117' }}>
                <pre style={{ margin: 0, padding: '0 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.7, color: '#c9d1d9', overflow: 'hidden' }}>
                  {PREVIEW_CODE.split('\n').slice(0, 18).map((line, i) => (
                    <div key={i} style={{ display: 'flex', gap: 16 }}>
                      <span style={{ color: '#3a3f4b', minWidth: 24, textAlign: 'right', userSelect: 'none' }}>{i + 1}</span>
                      <span dangerouslySetInnerHTML={{ __html: highlightDart(line) }} />
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            {/* Preview panel */}
            <div style={{ width: 200, borderLeft: '1px solid var(--border)', background: 'var(--bg-panel-alt)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Preview · Mobile</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                <div style={{ width: 110, height: 220, border: '2px solid var(--border)', borderRadius: 16, background: '#1a1a2e', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 32, background: '#162040', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                    <span style={{ fontSize: 9, color: '#3d8ef8', fontFamily: 'JetBrains Mono, monospace' }}>Student App</span>
                  </div>
                  {['Attendance', 'Grades', 'Profile'].map((s, i) => (
                    <div key={s} style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ width: i === 0 ? '80%' : i === 1 ? '60%' : '45%', height: 6, borderRadius: 3, background: i === 0 ? '#3d8ef8' : 'rgba(255,255,255,0.15)' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div style={{ height: 80, background: '#0a0c0f', borderTop: '1px solid var(--border)', padding: '8px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
            <div style={{ color: '#3fb950' }}>$ flutter analyze</div>
            <div style={{ color: 'var(--text-muted)' }}>Analyzing student_app...</div>
            <div style={{ color: '#3fb950' }}>No issues found! (ran in 2.3s)</div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="product" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Everything a Flutter developer needs
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
            A complete development environment running entirely in your browser.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <div key={title} style={{ padding: 28, background: 'var(--bg-panel)', borderRight: (i + 1) % 3 === 0 ? 'none' : '1px solid var(--border)', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Icon size={16} color="var(--accent)" />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderTop: '1px solid var(--border)', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
          Ready to start building?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 32, maxWidth: 420, margin: '0 auto 32px' }}>
          Create your first Flutter project in seconds — no installation required.
        </p>
        <Link
          href="/signin"
          id="cta-get-started"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '13px 28px',
            background: 'var(--accent)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: 15,
            fontWeight: 600,
            borderRadius: 8,
            transition: 'background-color 150ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
        >
          Get Started — it&apos;s free <ArrowRight size={16} />
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <KryptonLogo size={20} />
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>© 2026 Krypton. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Docs', 'Status'].map((l) => (
              <a key={l} href="#" style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// Minimal Dart syntax highlighter for the preview
function highlightDart(line: string): string {
  const keywords = ['import', 'void', 'main', 'class', 'extends', 'const', 'return', 'final', 'override', 'Widget', 'BuildContext', 'StatelessWidget', 'MaterialApp', 'ThemeData', 'ColorScheme'];
  let result = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  keywords.forEach((kw) => {
    result = result.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span style="color:#ff7b72">${kw}</span>`);
  });
  result = result.replace(/'([^']*)'/g, `<span style="color:#a5d6ff">'$1'</span>`);
  result = result.replace(/\/\/(.*)/g, `<span style="color:#545c6b">//$1</span>`);
  result = result.replace(/\b(0xFF\w+)\b/g, `<span style="color:#79c0ff">$1</span>`);
  return result;
}
