'use client';

import Link from 'next/link';
import { useState } from 'react';
import { KryptonLogo } from '@/components/ui/krypton-logo';
import { MOCK_TEMPLATES } from '@/lib/mock-data';
import type { Template } from '@/lib/types';
import { ArrowLeft, Square, Zap, GraduationCap, LayoutDashboard, NotebookPen, ShieldCheck, ArrowRight, Check } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Square,
  Zap,
  GraduationCap,
  LayoutDashboard,
  NotebookPen,
  ShieldCheck,
};

function TemplateCard({ template, selected, onSelect }: { template: Template; selected: boolean; onSelect: () => void }) {
  const Icon = ICON_MAP[template.icon] ?? Square;

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      id={`template-${template.id}`}
      style={{
        padding: 20,
        border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 8,
        cursor: 'pointer',
        background: selected ? 'var(--accent-subtle)' : 'var(--bg-panel)',
        position: 'relative',
        transition: 'border-color 150ms, background 150ms',
      }}
      onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-border)'; }}
      onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
    >
      {selected && (
        <div style={{ position: 'absolute', top: 10, right: 10, width: 18, height: 18, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={10} color="#fff" />
        </div>
      )}

      <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
        <Icon size={17} color="var(--accent)" />
      </div>
      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{template.name}</h3>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>{template.description}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 4, background: 'var(--bg-elevated)', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>Flutter</span>
        <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 4, background: 'var(--bg-elevated)', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>Dart</span>
        <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 4, background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>{template.flutterVersion}</span>
      </div>
    </div>
  );
}

export default function NewProjectPage() {
  const [projectName, setProjectName] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('tpl-blank');
  const [flutterVersion, setFlutterVersion] = useState('3.22.0');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Top bar */}
      <header style={{ borderBottom: '1px solid var(--border)', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13 }}>
            <ArrowLeft size={14} /> Back
          </Link>
          <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
          <KryptonLogo size={20} />
        </div>
      </header>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>New Project</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 36 }}>Choose a template and configure your Flutter project.</p>

        {/* Project name */}
        <div style={{ marginBottom: 32 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>Project name</label>
          <input
            id="new-project-name"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value.replace(/\s+/g, '_').toLowerCase())}
            placeholder="my_flutter_app"
            style={{
              width: '100%', maxWidth: 360,
              padding: '9px 12px',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--text-primary)',
              fontSize: 14,
              fontFamily: 'JetBrains Mono, monospace',
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--border-focus)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Use snake_case — no spaces or uppercase letters.</p>
        </div>

        {/* Flutter version */}
        <div style={{ marginBottom: 32 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>Flutter version</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['3.22.0', '3.19.6', '3.16.9'] as const).map((v) => (
              <button
                key={v}
                id={`version-${v}`}
                onClick={() => setFlutterVersion(v)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 7,
                  border: `1px solid ${flutterVersion === v ? 'var(--accent)' : 'var(--border)'}`,
                  background: flutterVersion === v ? 'var(--accent-subtle)' : 'var(--bg-panel)',
                  color: flutterVersion === v ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: 13,
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Templates */}
        <div style={{ marginBottom: 40 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>Template</label>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>These templates are not yet backed by a server — selection will be connected to the build service later.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {MOCK_TEMPLATES.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                selected={selectedTemplateId === t.id}
                onSelect={() => setSelectedTemplateId(t.id)}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/ide" id="create-project-btn" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 22px',
            background: projectName ? 'var(--accent)' : 'var(--bg-elevated)',
            color: projectName ? '#fff' : 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
            borderRadius: 8,
            pointerEvents: projectName ? 'auto' : 'none',
          }}>
            Create Project <ArrowRight size={14} />
          </Link>
          <Link href="/dashboard" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>Cancel</Link>
        </div>
      </div>
    </div>
  );
}
