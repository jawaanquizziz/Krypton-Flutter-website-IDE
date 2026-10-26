'use client';

import Link from 'next/link';
import { useIDEStore } from '@/stores/ide-store';
import { KryptonLogo } from '@/components/ui/krypton-logo';
import {
  Play, Square, ChevronDown, Monitor, Tablet, Smartphone, Eye, Share2, User,
  Bot, LayoutGrid, Terminal,
} from 'lucide-react';
import { useState } from 'react';
import type { DeviceTarget } from '@/lib/types';

const DEVICE_OPTIONS: { id: DeviceTarget; icon: React.ElementType; label: string }[] = [
  { id: 'mobile', icon: Smartphone, label: 'Mobile' },
  { id: 'tablet', icon: Tablet, label: 'Tablet' },
  { id: 'desktop', icon: Monitor, label: 'Desktop' },
];

export function IDETopBar() {
  const { activeProject, runStatus, setRunStatus, deviceTarget, setDeviceTarget, togglePreview, toggleTerminal, toggleAI, showPreview, showTerminal, showAI } = useIDEStore();
  const [deviceDropdown, setDeviceDropdown] = useState(false);
  const [projectDropdown, setProjectDropdown] = useState(false);

  const DeviceIcon = DEVICE_OPTIONS.find((d) => d.id === deviceTarget)?.icon ?? Smartphone;

  function handleRun() {
    if (runStatus === 'idle') {
      setRunStatus('running');
    } else {
      setRunStatus('idle');
    }
  }

  return (
    <header style={{
      height: 40,
      background: 'var(--bg-base)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      gap: 4,
      flexShrink: 0,
      userSelect: 'none',
    }}>
      {/* Logo */}
      <Link href="/dashboard" style={{ display: 'flex', padding: '0 8px', textDecoration: 'none', flexShrink: 0 }}>
        <KryptonLogo size={18} />
      </Link>

      <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 4px' }} />

      {/* Project switcher */}
      <div style={{ position: 'relative' }}>
        <button
          id="topbar-project-switcher"
          onClick={() => setProjectDropdown(!projectDropdown)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 6,
            background: 'none', border: 'none',
            color: 'var(--text-primary)', fontSize: 13, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
        >
          {activeProject?.name ?? 'No project'}
          <ChevronDown size={12} color="var(--text-muted)" />
        </button>
        {projectDropdown && (
          <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 8, minWidth: 180, zIndex: 100, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
            <div style={{ padding: '4px 10px 4px', borderBottom: '1px solid var(--border)', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Projects</div>
            {['student_app', 'attendance_system', 'portfolio_app', 'notes_app'].map((p) => (
              <div key={p} onClick={() => setProjectDropdown(false)} style={{ padding: '8px 12px', fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >{p}</div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      {/* Center actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Run / Stop */}
        <button
          id="topbar-run"
          onClick={handleRun}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 12px', borderRadius: 6,
            background: runStatus === 'running' ? 'var(--error-subtle)' : 'var(--accent)',
            border: 'none',
            color: '#fff', fontSize: 12, fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {runStatus === 'running' ? <><Square size={12} /> Stop</> : <><Play size={12} /> Run</>}
        </button>

        {/* Device selector */}
        <div style={{ position: 'relative' }}>
          <button
            id="topbar-device"
            onClick={() => setDeviceDropdown(!deviceDropdown)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 6, background: 'none', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
          >
            <DeviceIcon size={13} /> <ChevronDown size={11} />
          </button>
          {deviceDropdown && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
              {DEVICE_OPTIONS.map(({ id, icon: Icon, label }) => (
                <div key={id} onClick={() => { setDeviceTarget(id); setDeviceDropdown(false); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', fontSize: 13, color: deviceTarget === id ? 'var(--accent)' : 'var(--text-secondary)', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  <Icon size={14} /> {label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TopBarIconBtn id="topbar-preview" icon={Eye} label="Preview" active={showPreview} onClick={togglePreview} />
        <TopBarIconBtn id="topbar-terminal" icon={Terminal} label="Terminal" active={showTerminal} onClick={toggleTerminal} />
        <TopBarIconBtn id="topbar-ai" icon={Bot} label="AI" active={showAI} onClick={toggleAI} />
        <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 4px' }} />
        <TopBarIconBtn id="topbar-share" icon={Share2} label="Share" onClick={() => {}} />
        <button id="topbar-account" style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', border: 'none', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>JS</button>
      </div>
    </header>
  );
}

function TopBarIconBtn({ id, icon: Icon, label, active, onClick }: { id: string; icon: React.ElementType; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      id={id}
      title={label}
      onClick={onClick}
      style={{
        width: 30, height: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 6,
        background: active ? 'var(--bg-elevated)' : 'none',
        border: 'none',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = active ? 'var(--bg-elevated)' : 'none')}
    >
      <Icon size={15} />
    </button>
  );
}
