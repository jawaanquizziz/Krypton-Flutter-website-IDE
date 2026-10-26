'use client';

import { useIDEStore } from '@/stores/ide-store';
import type { FileNode } from '@/lib/types';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';
import { Plus, RefreshCw } from 'lucide-react';

function getFileIcon(name: string, language?: string): string {
  if (name.endsWith('.dart')) return '🎯';
  if (name.endsWith('.yaml') || name.endsWith('.yml')) return '⚙️';
  if (name.endsWith('.md')) return '📝';
  if (name.endsWith('.json')) return '{}';
  return '📄';
}

function FileNodeItem({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const { expandedDirs, toggleDir, openFile, activeTabId, tabs } = useIDEStore();
  const isExpanded = expandedDirs.has(node.path);
  const isActive = node.type === 'file' && tabs.find((t) => t.path === node.path && t.id === activeTabId);

  function handleClick() {
    if (node.type === 'directory') {
      toggleDir(node.path);
    } else {
      openFile(node);
    }
  }

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: `3px 8px 3px ${8 + depth * 12}px`,
          cursor: 'pointer',
          fontSize: 12,
          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
          background: isActive ? 'var(--accent-subtle)' : 'none',
          userSelect: 'none',
        }}
        onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'; }}
        onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'none'; }}
      >
        {node.type === 'directory' ? (
          <>
            {isExpanded ? <ChevronDown size={12} style={{ flexShrink: 0 }} /> : <ChevronRight size={12} style={{ flexShrink: 0 }} />}
            {isExpanded ? <FolderOpen size={13} color="#e8a87c" style={{ flexShrink: 0 }} /> : <Folder size={13} color="#e8a87c" style={{ flexShrink: 0 }} />}
          </>
        ) : (
          <>
            <span style={{ width: 12, flexShrink: 0 }} />
            <span style={{ fontSize: 11, flexShrink: 0 }}>{getFileIcon(node.name, node.language)}</span>
          </>
        )}
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono, monospace' }}>
          {node.name}
        </span>
      </div>

      {node.type === 'directory' && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileNodeItem key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer() {
  const { fileTree, activeProject } = useIDEStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 8px 4px 12px', flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Explorer</span>
        <div style={{ display: 'flex', gap: 2 }}>
          {[{ icon: Plus, label: 'New File' }, { icon: RefreshCw, label: 'Refresh' }].map(({ icon: Icon, label }) => (
            <button key={label} title={label} style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: 4 }}>
              <Icon size={12} />
            </button>
          ))}
        </div>
      </div>

      {/* Project root label */}
      <div style={{ padding: '4px 12px 2px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {activeProject?.name ?? 'project'}
      </div>

      {/* File tree */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {fileTree.map((node) => (
          <FileNodeItem key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
