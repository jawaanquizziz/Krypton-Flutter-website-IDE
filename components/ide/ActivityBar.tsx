'use client';

import { useIDEStore } from '@/stores/ide-store';
import { FolderSearch, Search, GitBranch, Bug, Puzzle, Settings } from 'lucide-react';
import Link from 'next/link';

const ACTIVITIES = [
  { id: 'explorer' as const, icon: FolderSearch, label: 'Explorer' },
  { id: 'search' as const, icon: Search, label: 'Search' },
  { id: 'git' as const, icon: GitBranch, label: 'Source Control' },
  { id: 'debug' as const, icon: Bug, label: 'Run & Debug' },
  { id: 'extensions' as const, icon: Puzzle, label: 'Extensions' },
];

export function ActivityBar() {
  const { activeActivity, setActiveActivity } = useIDEStore();

  return (
    <aside style={{
      width: 48,
      background: 'var(--bg-base)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 4,
      flexShrink: 0,
    }}>
      {ACTIVITIES.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          id={`activity-${id}`}
          title={label}
          onClick={() => setActiveActivity(id)}
          style={{
            width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 7,
            margin: '2px 0',
            background: activeActivity === id ? 'var(--bg-elevated)' : 'none',
            border: 'none',
            borderLeft: `2px solid ${activeActivity === id ? 'var(--accent)' : 'transparent'}`,
            color: activeActivity === id ? 'var(--text-primary)' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { if (activeActivity !== id) e.currentTarget.style.color = 'var(--text-secondary)'; }}
          onMouseLeave={(e) => { if (activeActivity !== id) e.currentTarget.style.color = 'var(--text-muted)'; }}
        >
          <Icon size={18} />
        </button>
      ))}

      <div style={{ flex: 1 }} />

      <Link href="/settings" title="Settings" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', marginBottom: 4, borderRadius: 7, textDecoration: 'none' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <Settings size={18} />
      </Link>
    </aside>
  );
}
