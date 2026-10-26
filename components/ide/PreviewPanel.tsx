'use client';

import { useIDEStore } from '@/stores/ide-store';
import { Smartphone, Tablet, Monitor, RefreshCw, ExternalLink, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';
import type { DeviceTarget } from '@/lib/types';

const DEVICE_CONFIG: Record<DeviceTarget, { width: number; height: number; label: string }> = {
  mobile: { width: 375, height: 667, label: 'iPhone SE' },
  tablet: { width: 768, height: 1024, label: 'iPad' },
  desktop: { width: 1280, height: 800, label: 'Desktop' },
  web: { width: 1280, height: 800, label: 'Web' },
};

const DEVICE_ICONS: Record<DeviceTarget, React.ElementType> = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
  web: Monitor,
};

// Mock Flutter UI for the preview
function MockFlutterUI({ device }: { device: DeviceTarget }) {
  const isMobile = device === 'mobile' || device === 'tablet';

  return (
    <div style={{ width: '100%', height: '100%', background: '#1a1a2e', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      {/* App bar */}
      <div style={{ background: '#162040', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontSize: isMobile ? 14 : 16, fontWeight: 600, color: '#e8eaed' }}>Student Dashboard</span>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3d8ef8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>JS</div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: isMobile ? 12 : 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[{ label: 'Attendance', value: '94%', color: '#3fb950' }, { label: 'GPA', value: '3.8', color: '#3d8ef8' }].map((s) => (
            <div key={s.label} style={{ background: '#21262d', borderRadius: 10, padding: isMobile ? 10 : 14 }}>
              <div style={{ fontSize: 10, color: '#8b919e', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Today's classes */}
        <div style={{ background: '#21262d', borderRadius: 10, padding: isMobile ? 10 : 14, flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#8b919e', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Today&apos;s Classes</div>
          {['Mathematics', 'Physics', 'Computer Science'].map((cls, i) => (
            <div key={cls} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? '#3fb950' : i === 1 ? '#3d8ef8' : '#d29922', flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: isMobile ? 11 : 12, color: '#c9d1d9' }}>{cls}</div>
              <div style={{ fontSize: 10, color: '#545c6b' }}>{['09:00', '11:30', '14:00'][i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav (mobile only) */}
      {isMobile && (
        <div style={{ background: '#162040', display: 'flex', borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          {['📋 Attendance', '📊 Grades', '👤 Profile'].map((item, i) => (
            <div key={item} style={{ flex: 1, padding: '10px 0', textAlign: 'center', fontSize: 10, color: i === 0 ? '#3d8ef8' : '#545c6b' }}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PreviewPanel() {
  const { deviceTarget, setDeviceTarget, runStatus } = useIDEStore();
  const [scale, setScale] = useState(0.6);
  const config = DEVICE_CONFIG[deviceTarget];
  const DeviceIcon = DEVICE_ICONS[deviceTarget];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-panel-alt)', overflow: 'hidden' }}>
      {/* Panel header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Preview</span>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: runStatus === 'running' ? 'var(--success)' : 'var(--text-muted)' }} />
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          <button title="Zoom out" onClick={() => setScale((s) => Math.max(0.3, s - 0.1))} style={iconBtnStyle}><ZoomOut size={12} /></button>
          <button title="Zoom in" onClick={() => setScale((s) => Math.min(1, s + 0.1))} style={iconBtnStyle}><ZoomIn size={12} /></button>
          <button title="Refresh" style={iconBtnStyle}><RefreshCw size={12} /></button>
        </div>
      </div>

      {/* Device selector */}
      <div style={{ display: 'flex', padding: '6px 8px', gap: 4, borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        {(['mobile', 'tablet', 'desktop'] as DeviceTarget[]).map((d) => {
          const Icon = DEVICE_ICONS[d];
          return (
            <button key={d} id={`preview-${d}`} onClick={() => setDeviceTarget(d)} title={DEVICE_CONFIG[d].label} style={{ ...iconBtnStyle, background: deviceTarget === d ? 'var(--bg-elevated)' : 'none', color: deviceTarget === d ? 'var(--text-primary)' : 'var(--text-muted)', padding: '4px 8px', borderRadius: 5 }}>
              <Icon size={13} />
            </button>
          );
        })}
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4, alignSelf: 'center' }}>{config.label}</span>
      </div>

      {/* Preview area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 16 }}>
        {runStatus !== 'running' ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 24, marginBottom: 8, opacity: 0.3 }}>▶</div>
            <p style={{ fontSize: 12, lineHeight: 1.6 }}>Press Run to start the Flutter preview</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, opacity: 0.6 }}>Preview will connect to the build service</p>
          </div>
        ) : (
          <div style={{
            width: config.width * scale,
            height: config.height * scale,
            border: '2px solid var(--border)',
            borderRadius: deviceTarget === 'mobile' ? 16 * scale : deviceTarget === 'tablet' ? 12 * scale : 8 * scale,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            position: 'relative',
          }}>
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: config.width, height: config.height }}>
              <MockFlutterUI device={deviceTarget} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const iconBtnStyle: React.CSSProperties = {
  width: 24, height: 24,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'none', border: 'none',
  color: 'var(--text-muted)', cursor: 'pointer', borderRadius: 4,
};
