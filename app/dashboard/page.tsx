'use client';

import Link from 'next/link';
import { useState } from 'react';
import { KryptonLogo } from '@/components/ui/krypton-logo';
import { MOCK_PROJECTS } from '@/lib/mock-data';
import type { Project } from '@/lib/types';
import {
  LayoutGrid,
  List,
  Plus,
  Search,
  Settings,
  Layers,
  Bot,
  FolderOpen,
  MoreHorizontal,
  Clock,
  GitBranch,
  Play,
  ChevronRight,
} from 'lucide-react';

type ViewMode = 'grid' | 'list';

function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const SIDEBAR_ITEMS = [
  { icon: FolderOpen, label: 'Projects', href: '/dashboard', active: true },
  { icon: Layers, label: 'Templates', href: '/templates' },
  { icon: Bot, label: 'AI Assistant', href: '/ide' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href="/ide"
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 16,
          cursor: 'pointer',
          transition: 'border-color 150ms',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6,
            background: 'var(--accent-subtle)',
            border: '1px solid var(--accent-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 14 }}>📦</span>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2, borderRadius: 4 }}
          >
            <MoreHorizontal size={14} />
          </button>
        </div>

        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-primary)' }}>
          {project.name}
        </h3>
        {project.description && (
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
            {project.description}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, background: 'var(--bg-elevated)', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              {project.flutterVersion}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 11 }}>
            <Clock size={11} />
            {timeAgo(project.lastModified)}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <Link href="/ide" style={{ display: 'block', textDecoration: 'none' }}>
      <div
        style={{
          display: 'flex', alignItems: 'center',
          padding: '10px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          gap: 12,
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
      >
        <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>📦</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-primary)' }}>{project.name}</div>
          {project.description && <div style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.description}</div>}
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', width: 80, textAlign: 'right' }}>{project.flutterVersion}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 12, width: 80, justifyContent: 'flex-end' }}>
          <Clock size={11} />{timeAgo(project.lastModified)}
        </div>
        <ChevronRight size={14} color="var(--text-muted)" />
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');

  const filtered = MOCK_PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-base)', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220,
        background: 'var(--bg-panel)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)' }}>
          <KryptonLogo size={22} />
        </div>

        <nav style={{ flex: 1, padding: '8px 8px' }}>
          {SIDEBAR_ITEMS.map(({ icon: Icon, label, href, active }) => (
            <Link key={label} href={href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6, textDecoration: 'none', marginBottom: 2, background: active ? 'var(--bg-active)' : 'none', color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
              <Icon size={16} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ padding: 12, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#fff' }}>JS</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Jawaan Santh</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Free plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <div style={{ padding: '20px 28px 0', borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 2 }}>Projects</h1>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{MOCK_PROJECTS.length} projects</p>
            </div>
            <Link href="/new-project" id="dashboard-new-project" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 14px',
              background: 'var(--accent)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 7,
            }}>
              <Plus size={14} /> New Project
            </Link>
          </div>

          {/* Search + view toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 16 }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
              <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                id="dashboard-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                style={{
                  width: '100%',
                  padding: '7px 10px 7px 30px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 7,
                  color: 'var(--text-primary)',
                  fontSize: 13,
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 7, overflow: 'hidden' }}>
              {(['grid', 'list'] as ViewMode[]).map((mode) => {
                const Icon = mode === 'grid' ? LayoutGrid : List;
                return (
                  <button key={mode} id={`view-${mode}`} onClick={() => setViewMode(mode)} style={{ padding: '6px 10px', background: viewMode === mode ? 'var(--bg-elevated)' : 'none', border: 'none', color: viewMode === mode ? 'var(--text-primary)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Icon size={14} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Projects */}
        <div style={{ padding: 28, flex: 1 }}>
          {/* Recent */}
          <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <GitBranch size={13} color="var(--text-muted)" />
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Recent</span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <FolderOpen size={32} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }} />
              <p style={{ fontSize: 14 }}>No projects found</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, marginTop: 12 }}>
              {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
              {/* New project card */}
              <Link href="/new-project" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'none', border: '1px dashed var(--border)', borderRadius: 8, padding: 16, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 120, color: 'var(--text-muted)', transition: 'border-color 150ms, color 150ms' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-border)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                >
                  <Plus size={20} />
                  <span style={{ fontSize: 13, fontWeight: 500 }}>New Project</span>
                </div>
              </Link>
            </div>
          ) : (
            <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', marginTop: 12 }}>
              <div style={{ display: 'flex', padding: '8px 16px', background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)' }}>
                <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Name</span>
                <span style={{ width: 80, fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>Flutter</span>
                <span style={{ width: 80, fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>Modified</span>
                <span style={{ width: 20 }} />
              </div>
              {filtered.map((p) => <ProjectRow key={p.id} project={p} />)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
