'use client';

import dynamic from 'next/dynamic';
import { useIDEStore } from '@/stores/ide-store';
import { IDETopBar } from '@/components/ide/IDETopBar';
import { ActivityBar } from '@/components/ide/ActivityBar';
import { FileExplorer } from '@/components/ide/FileExplorer';
import { EditorTabs } from '@/components/ide/EditorTabs';
import { PreviewPanel } from '@/components/ide/PreviewPanel';
import { TerminalPanel } from '@/components/ide/TerminalPanel';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { StatusBar } from '@/components/ide/StatusBar';
import { MobileWorkspaceSwitcher } from '@/components/ide/MobileWorkspaceSwitcher';

// Dynamically import CodeEditor to avoid SSR issues with Monaco
const CodeEditor = dynamic(() => import('@/components/ide/CodeEditor').then(m => m.CodeEditor), {
  ssr: false,
  loading: () => (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1117', color: 'var(--text-muted)', fontSize: 13 }}>
      Loading editor...
    </div>
  ),
});

export default function IDEPage() {
  const { showPreview, showTerminal, showAI, activeActivity } = useIDEStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg-base)' }}>
      {/* Top bar */}
      <IDETopBar />

      {/* Main IDE area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Activity bar */}
        <ActivityBar />

        {/* Sidebar (explorer / other panels) */}
        {activeActivity && (
          <div style={{
            width: 240,
            background: 'var(--bg-panel)',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            overflow: 'hidden',
          }}>
            {activeActivity === 'explorer' && <FileExplorer />}
            {activeActivity === 'search' && <SearchPanel />}
            {activeActivity === 'git' && <GitPanel />}
            {activeActivity === 'debug' && <DebugPanel />}
            {activeActivity === 'extensions' && <ExtensionsPanel />}
          </div>
        )}

        {/* Editor + Preview column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          {/* Editor + Preview row */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Editor */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
              <EditorTabs />
              <CodeEditor />
            </div>

            {/* Preview */}
            {showPreview && (
              <div style={{ width: 320, borderLeft: '1px solid var(--border)', flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <PreviewPanel />
              </div>
            )}

            {/* AI Assistant */}
            {showAI && (
              <div style={{ width: 340, borderLeft: '1px solid var(--border)', flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <AIAssistant />
              </div>
            )}
          </div>

          {/* Terminal */}
          {showTerminal && (
            <div style={{ height: 200, borderTop: '1px solid var(--border)', flexShrink: 0 }}>
              <TerminalPanel />
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <StatusBar />

      {/* Mobile workspace switcher (hidden on desktop via media query) */}
      <MobileWorkspaceSwitcher />
    </div>
  );
}

// Placeholder panels for sidebar views
function SearchPanel() {
  return (
    <div style={{ padding: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Search</div>
      <input placeholder="Search files..." style={{ width: '100%', padding: '6px 8px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 12, outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }} />
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 16, textAlign: 'center' }}>Search across files — full-text search will be connected to the file service.</p>
    </div>
  );
}

function GitPanel() {
  return (
    <div style={{ padding: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Source Control</div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        <div style={{ padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ color: 'var(--warning)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>M</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>lib/main.dart</span>
        </div>
        <div style={{ padding: '8px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ color: 'var(--success)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>A</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>lib/home.dart</span>
        </div>
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 16 }}>Git integration will be connected to the version control service.</p>
    </div>
  );
}

function DebugPanel() {
  return (
    <div style={{ padding: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Run & Debug</div>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>Debug session management will be connected to the Flutter build service. Use the Run button in the top bar to start.</p>
    </div>
  );
}

function ExtensionsPanel() {
  return (
    <div style={{ padding: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Extensions</div>
      {['Dart Language Support', 'Flutter Widget Snippets', 'Pubspec Assist'].map((ext) => (
        <div key={ext} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{ext}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Extension marketplace coming soon</div>
        </div>
      ))}
    </div>
  );
}
