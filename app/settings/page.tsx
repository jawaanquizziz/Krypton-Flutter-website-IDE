'use client';

import Link from 'next/link';
import { useState } from 'react';
import { KryptonLogo } from '@/components/ui/krypton-logo';
import { MOCK_AI_PROVIDERS } from '@/lib/mock-data';
import type { AIProviderId, EditorPreferences, AppearancePreferences } from '@/lib/types';
import { ArrowLeft, User, Bot, Sliders, Monitor, Keyboard, Plug } from 'lucide-react';

type SettingsTab = 'account' | 'ai' | 'editor' | 'appearance' | 'shortcuts' | 'connections';

const TABS: { id: SettingsTab; icon: React.ElementType; label: string }[] = [
  { id: 'account', icon: User, label: 'Account' },
  { id: 'ai', icon: Bot, label: 'AI Models' },
  { id: 'editor', icon: Sliders, label: 'Editor' },
  { id: 'appearance', icon: Monitor, label: 'Appearance' },
  { id: 'shortcuts', icon: Keyboard, label: 'Shortcuts' },
  { id: 'connections', icon: Plug, label: 'Connected Accounts' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('ai');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-base)' }}>
      {/* Top bar */}
      <header style={{ borderBottom: '1px solid var(--border)', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13 }}>
            <ArrowLeft size={14} /> Back
          </Link>
          <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
          <KryptonLogo size={20} />
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside style={{ width: 240, borderRight: '1px solid var(--border)', background: 'var(--bg-panel)', padding: '24px 16px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, paddingLeft: 8 }}>Settings</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {TABS.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                id={`settings-tab-${id}`}
                onClick={() => setActiveTab(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px',
                  borderRadius: 6,
                  background: activeTab === id ? 'var(--bg-active)' : 'none',
                  border: 'none',
                  color: activeTab === id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: 13, fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
          <div style={{ maxWidth: 640 }}>
            {activeTab === 'account' && <AccountSettings />}
            {activeTab === 'ai' && <AIModelsSettings />}
            {activeTab === 'editor' && <EditorSettings />}
            {activeTab === 'appearance' && <AppearanceSettings />}
            {activeTab === 'shortcuts' && <ShortcutSettings />}
            {activeTab === 'connections' && <ConnectionSettings />}
          </div>
        </main>
      </div>
    </div>
  );
}

function AccountSettings() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Account</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32 }}>Manage your Krypton account details and subscription.</p>

      <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#fff' }}>JS</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Jawaan Santh</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>jawaan@example.com</div>
          </div>
        </div>
        <button style={{ padding: '8px 16px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Edit Profile</button>
      </div>

      <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Plan</h3>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>You are currently on the Free plan.</p>
        <button disabled style={{ padding: '8px 16px', background: 'var(--accent)', border: 'none', borderRadius: 6, color: '#fff', fontSize: 13, fontWeight: 600, opacity: 0.5, cursor: 'not-allowed' }}>Upgrade to Pro</button>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>Billing integration coming soon.</p>
      </div>
    </div>
  );
}

function AIModelsSettings() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>AI Models</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32 }}>Connect your API keys to enable the AI assistant. Keys are stored locally in your browser.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {MOCK_AI_PROVIDERS.map((provider) => (
          <div key={provider.id} style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600 }}>{provider.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                  {provider.models.map(m => m.name).join(', ')}
                </p>
              </div>
              <span style={{ fontSize: 11, padding: '4px 8px', borderRadius: 4, background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                Not connected
              </span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                type="password"
                placeholder="API Key"
                disabled
                style={{ flex: 1, padding: '8px 12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)', fontSize: 13, outline: 'none' }}
              />
              <button disabled style={{ padding: '8px 16px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, cursor: 'not-allowed' }}>Save</button>
            </div>
            {provider.id === 'gemini' && (
              <p style={{ fontSize: 11, color: 'var(--warning)', marginTop: 8 }}>
                Logging in with Google does not automatically grant access to Gemini API or paid AI subscriptions. You must provide a separate API key.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EditorSettings() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Editor</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32 }}>Customize your Monaco editor preferences.</p>
      
      <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 24 }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Editor settings integration coming soon.</p>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Appearance</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32 }}>Customize the look and feel of Krypton.</p>
      
      <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 24 }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Appearance settings integration coming soon. Krypton currently defaults to dark mode.</p>
      </div>
    </div>
  );
}

function ShortcutSettings() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Shortcuts</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32 }}>Keyboard shortcuts for faster development.</p>
      
      <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 24 }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Keyboard shortcut customization coming soon.</p>
      </div>
    </div>
  );
}

function ConnectionSettings() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Connected Accounts</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32 }}>Connect external services like GitHub.</p>
      
      <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>GitHub</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Connect to sync repositories and commit code.</p>
          </div>
          <button disabled style={{ padding: '8px 16px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, cursor: 'not-allowed' }}>Connect</button>
        </div>
      </div>
    </div>
  );
}
