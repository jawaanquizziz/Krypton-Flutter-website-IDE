'use client';

import Link from 'next/link';
import { MOCK_TEMPLATES } from '@/lib/mock-data';
import type { Template } from '@/lib/types';
import { KryptonLogo } from '@/components/ui/krypton-logo';
import { Square, Zap, GraduationCap, LayoutDashboard, NotebookPen, ShieldCheck, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';

const ICON_MAP: Record<string, React.ElementType> = {
  Square, Zap, GraduationCap, LayoutDashboard, NotebookPen, ShieldCheck,
};

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'blank', label: 'Blank' },
  { id: 'starter', label: 'Starter' },
  { id: 'feature', label: 'Feature' },
];

function TemplateCard({ template }: { template: Template }) {
  const Icon = ICON_MAP[template.icon] ?? Square;
  return (
    <div style={{
      background: 'var(--bg-panel)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      transition: 'border-color 150ms',
    }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div style={{ width: 40, height: 40, borderRadius: 9, background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={18} color="var(--accent)" />
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{template.name}</h3>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{template.description}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
        {template.tags.map((tag) => (
          <span key={tag} style={{ fontSize: 11, padding: '2px 7px', borderRadius: 4, background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>{tag}</span>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}>Flutter {template.flutterVersion}</span>
        <Link href="/new-project" id={`use-template-${template.id}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '6px 12px',
          background: 'var(--accent)',
          color: '#fff',
          textDecoration: 'none',
          fontSize: 12,
          fontWeight: 600,
          borderRadius: 6,
        }}>
          Use Template <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = MOCK_TEMPLATES.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || t.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <header style={{ borderBottom: '1px solid var(--border)', padding: '0 28px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <KryptonLogo size={22} />
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/dashboard" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/signin" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>Sign In</Link>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Templates</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Start your Flutter project with a curated template. All templates use Flutter 3.22 and Material 3.</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              id="templates-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              style={{ width: '100%', padding: '7px 10px 7px 30px', background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 7, color: 'var(--text-primary)', fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {CATEGORIES.map((c) => (
              <button key={c.id} id={`category-${c.id}`} onClick={() => setCategory(c.id)} style={{ padding: '6px 14px', borderRadius: 7, border: `1px solid ${category === c.id ? 'var(--accent)' : 'var(--border)'}`, background: category === c.id ? 'var(--accent-subtle)' : 'none', color: category === c.id ? 'var(--accent)' : 'var(--text-secondary)', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filtered.map((t) => <TemplateCard key={t.id} template={t} />)}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: 14 }}>No templates match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
