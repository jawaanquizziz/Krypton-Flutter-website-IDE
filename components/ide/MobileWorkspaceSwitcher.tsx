'use client';

import { useState } from 'react';
import { FolderOpen, Code2, Eye, Bot, Terminal } from 'lucide-react';

type MobilePanel = 'files' | 'code' | 'preview' | 'ai' | 'terminal';

const TABS: { id: MobilePanel; icon: React.ElementType; label: string }[] = [
  { id: 'files', icon: FolderOpen, label: 'Files' },
  { id: 'code', icon: Code2, label: 'Code' },
  { id: 'preview', icon: Eye, label: 'Preview' },
  { id: 'ai', icon: Bot, label: 'AI' },
  { id: 'terminal', icon: Terminal, label: 'Terminal' },
];

export function MobileWorkspaceSwitcher() {
  const [active, setActive] = useState<MobilePanel>('code');

  return (
    <>
      {/* Only visible on mobile via CSS */}
      <style>{`
        .mobile-workspace-switcher {
          display: none;
        }
        @media (max-width: 767px) {
          .mobile-workspace-switcher {
            display: flex;
          }
        }
      `}</style>
      <nav
        className="mobile-workspace-switcher"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          background: 'var(--bg-panel)',
          borderTop: '1px solid var(--border)',
          alignItems: 'stretch',
          zIndex: 200,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {TABS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            id={`mobile-tab-${id}`}
            onClick={() => setActive(id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              borderTop: `2px solid ${active === id ? 'var(--accent)' : 'transparent'}`,
              color: active === id ? 'var(--accent)' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px 0',
              fontSize: 10,
              fontWeight: 500,
              minWidth: 44,
              minHeight: 44,
            }}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
