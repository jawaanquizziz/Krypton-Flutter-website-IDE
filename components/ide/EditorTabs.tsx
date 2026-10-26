'use client';

import { useIDEStore } from '@/stores/ide-store';
import { X } from 'lucide-react';
import type { EditorTab } from '@/lib/types';

function getTabIcon(language: string): string {
  switch (language) {
    case 'dart': return '🎯';
    case 'yaml': return '⚙️';
    case 'markdown': return '📝';
    default: return '📄';
  }
}

export function EditorTabs() {
  const { tabs, activeTabId, setActiveTab, closeTab } = useIDEStore();

  if (tabs.length === 0) {
    return (
      <div style={{ height: 35, background: 'var(--bg-base)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>No files open</span>
      </div>
    );
  }

  return (
    <div style={{
      height: 35,
      background: 'var(--bg-base)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        {tabs.map((tab: EditorTab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0 12px',
                borderRight: '1px solid var(--border)',
                borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                background: isActive ? 'var(--bg-panel)' : 'none',
                cursor: 'pointer',
                flexShrink: 0,
                maxWidth: 180,
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={{ fontSize: 11 }}>{getTabIcon(tab.language)}</span>
              <span style={{
                fontSize: 12,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontWeight: isActive ? 500 : 400,
              }}>
                {tab.isDirty ? `● ${tab.name}` : tab.name}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
                style={{
                  width: 16, height: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'none', border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  borderRadius: 3,
                  flexShrink: 0,
                  padding: 0,
                }}
                onMouseEnter={(e) => { (e.currentTarget.style.background = 'var(--bg-hover)'); (e.currentTarget.style.color = 'var(--text-primary)'); }}
                onMouseLeave={(e) => { (e.currentTarget.style.background = 'none'); (e.currentTarget.style.color = 'var(--text-muted)'); }}
              >
                <X size={10} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Breadcrumbs */}
      {activeTabId && (
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {tabs.find((t) => t.id === activeTabId)?.path.split('/').map((part, i, arr) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: i === arr.length - 1 ? 'var(--text-secondary)' : 'var(--text-muted)' }}>{part}</span>
              {i < arr.length - 1 && <span style={{ margin: '0 2px', opacity: 0.4 }}>›</span>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
