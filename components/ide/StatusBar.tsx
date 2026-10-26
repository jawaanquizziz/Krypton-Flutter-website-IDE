'use client';

import { useIDEStore } from '@/stores/ide-store';
import { GitBranch, AlertCircle, CheckCircle, Cpu, Wifi } from 'lucide-react';

export function StatusBar() {
  const { activeProject, runStatus, deviceTarget, tabs, activeTabId } = useIDEStore();
  const activeTab = tabs.find((t) => t.id === activeTabId);

  return (
    <div style={{
      height: 24,
      background: 'var(--bg-base)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px',
      gap: 0,
      fontSize: 11,
      color: 'var(--text-muted)',
      flexShrink: 0,
      userSelect: 'none',
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <GitBranch size={11} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>main</span>
        </div>

        {runStatus === 'running' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--success)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', animation: 'pulse 2s infinite' }} />
            Flutter running · {deviceTarget}
          </div>
        )}

        {runStatus === 'building' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--warning)' }}>
            <Cpu size={11} />
            Building...
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CheckCircle size={11} color="var(--success)" />
          No issues
        </div>

        {activeTab && (
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{activeTab.language}</span>
        )}

        <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Flutter {activeProject?.flutterVersion ?? '3.22.0'}</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Wifi size={11} />
          <span>Frontend only</span>
        </div>
      </div>
    </div>
  );
}
