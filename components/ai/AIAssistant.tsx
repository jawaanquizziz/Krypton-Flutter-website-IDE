'use client';

import { useState } from 'react';
import { useAIStore } from '@/stores/ai-store';
import { MOCK_AI_PROVIDERS } from '@/lib/mock-data';
import type { AIActionType, AIMessage } from '@/lib/types';
import { Bot, Send, Check, X, ChevronDown, FileCode, Loader2 } from 'lucide-react';

const ACTIONS: { id: AIActionType; label: string }[] = [
  { id: 'generate', label: 'Generate' },
  { id: 'edit', label: 'Edit' },
  { id: 'explain', label: 'Explain' },
  { id: 'debug', label: 'Debug' },
  { id: 'refactor', label: 'Refactor' },
  { id: 'review', label: 'Review' },
];

const WORKFLOW_STAGES = [
  'Understanding request',
  'Planning changes',
  'Files to modify',
  'Generated changes',
  'Review changes',
];

function ModelSelector() {
  const { selectedProviderId, selectedModel, setProvider, setModel } = useAIStore();
  const [open, setOpen] = useState(false);
  const currentProvider = MOCK_AI_PROVIDERS.find((p) => p.id === selectedProviderId);

  return (
    <div style={{ position: 'relative' }}>
      <button
        id="ai-model-selector"
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 8px', borderRadius: 6,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)', fontSize: 11,
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <span>{selectedModel.name}</span>
        <ChevronDown size={10} />
      </button>

      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 8, zIndex: 100, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
          {MOCK_AI_PROVIDERS.map((provider) => (
            <div key={provider.id}>
              <div style={{ padding: '6px 10px 2px', fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {provider.name}
                {provider.status === 'not_connected' && (
                  <span style={{ marginLeft: 6, color: 'var(--error)', fontWeight: 400 }}>· Not connected</span>
                )}
              </div>
              {provider.models.map((model) => (
                <div
                  key={model.id}
                  onClick={() => { setModel(model); setProvider(provider.id); setOpen(false); }}
                  style={{
                    padding: '6px 12px',
                    fontSize: 12,
                    color: selectedModel.id === model.id ? 'var(--accent)' : provider.status === 'not_connected' ? 'var(--text-muted)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    opacity: provider.status === 'not_connected' ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  {model.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StageIndicator({ stage }: { stage: number }) {
  return (
    <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {WORKFLOW_STAGES.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
            background: i < stage ? 'var(--success-subtle)' : i === stage ? 'var(--accent-subtle)' : 'var(--bg-elevated)',
            border: `1px solid ${i < stage ? 'var(--success)' : i === stage ? 'var(--accent)' : 'var(--border)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {i < stage ? <Check size={10} color="var(--success)" /> : i === stage ? <Loader2 size={10} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} /> : null}
          </div>
          <span style={{ fontSize: 12, color: i <= stage ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
        </div>
      ))}
    </div>
  );
}

export function AIAssistant() {
  const { messages, currentAction, setAction, addMessage, contextFiles, isGenerating, setIsGenerating } = useAIStore();
  const [input, setInput] = useState('');
  const [generatingStage, setGeneratingStage] = useState(0);
  const [pendingChanges, setPendingChanges] = useState<{ file: string; desc: string }[] | null>(null);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    addMessage({ role: 'user', content: input, contextFiles });
    setInput('');
    setIsGenerating(true);
    setGeneratingStage(0);
    setPendingChanges(null);

    // Simulate workflow stages (frontend only — not real AI)
    let stage = 0;
    const interval = setInterval(() => {
      stage += 1;
      setGeneratingStage(stage);
      if (stage >= WORKFLOW_STAGES.length - 1) {
        clearInterval(interval);
        setIsGenerating(false);
        setPendingChanges([
          { file: 'lib/home.dart', desc: 'Added attendance dashboard widget' },
          { file: 'lib/widgets/student_card.dart', desc: 'Created StudentCard component' },
        ]);
        addMessage({
          role: 'assistant',
          content: 'I\'ve generated the changes for your student attendance dashboard. Review and apply them below.',
          contextFiles,
        });
      }
    }, 800);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-panel)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bot size={14} color="var(--accent)" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>AI Assistant</span>
          </div>
          <ModelSelector />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              id={`ai-action-${a.id}`}
              onClick={() => setAction(a.id)}
              style={{
                padding: '3px 8px', borderRadius: 5,
                border: `1px solid ${currentAction === a.id ? 'var(--accent)' : 'var(--border)'}`,
                background: currentAction === a.id ? 'var(--accent-subtle)' : 'none',
                color: currentAction === a.id ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: 11, cursor: 'pointer', fontWeight: 500,
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Context files */}
      <div style={{ padding: '6px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Context</div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {contextFiles.map((f) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '2px 6px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 4 }}>
              <FileCode size={10} color="var(--accent)" />
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)' }}>{f.split('/').pop()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflow: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.length === 0 && !isGenerating && (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)' }}>
            <Bot size={24} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.3 }} />
            <p style={{ fontSize: 12, lineHeight: 1.6 }}>Describe what you want to build or ask about your Flutter code.</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, opacity: 0.6 }}>Connect an AI provider in Settings to enable generation.</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', opacity: 0.5, marginTop: 2 }}>Try: &ldquo;Create a student attendance dashboard&rdquo;</p>
          </div>
        )}

        {messages.map((msg: AIMessage) => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '88%',
              padding: '8px 10px',
              borderRadius: msg.role === 'user' ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
              background: msg.role === 'user' ? 'var(--accent-subtle)' : 'var(--bg-elevated)',
              border: `1px solid ${msg.role === 'user' ? 'var(--accent-border)' : 'var(--border)'}`,
              fontSize: 12,
              color: 'var(--text-primary)',
              lineHeight: 1.55,
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div style={{ padding: '4px 0' }}>
            <StageIndicator stage={generatingStage} />
          </div>
        )}

        {pendingChanges && (
          <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ padding: '8px 10px', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>
              Generated changes · {pendingChanges.length} files
            </div>
            {pendingChanges.map((change) => (
              <div key={change.file} style={{ padding: '7px 10px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileCode size={12} color="var(--accent)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-primary)' }}>{change.file}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{change.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, padding: 10 }}>
              <button
                id="ai-apply-changes"
                onClick={() => setPendingChanges(null)}
                style={{ flex: 1, padding: '6px 0', background: 'var(--accent)', border: 'none', borderRadius: 6, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
              >
                <Check size={12} /> Apply Changes
              </button>
              <button
                id="ai-reject-changes"
                onClick={() => setPendingChanges(null)}
                style={{ flex: 1, padding: '6px 0', background: 'none', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
              >
                <X size={12} /> Reject
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{ padding: '8px 10px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
          <textarea
            id="ai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`${currentAction.charAt(0).toUpperCase() + currentAction.slice(1)} Flutter code...`}
            rows={2}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e as unknown as React.FormEvent); } }}
            style={{
              flex: 1,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 7,
              color: 'var(--text-primary)',
              fontSize: 12,
              padding: '7px 10px',
              outline: 'none',
              resize: 'none',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.5,
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--border-focus)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
          <button
            type="submit"
            id="ai-send"
            disabled={!input.trim() || isGenerating}
            style={{
              width: 32, height: 32,
              borderRadius: 7,
              background: input.trim() && !isGenerating ? 'var(--accent)' : 'var(--bg-elevated)',
              border: 'none',
              color: input.trim() && !isGenerating ? '#fff' : 'var(--text-muted)',
              cursor: input.trim() && !isGenerating ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Send size={13} />
          </button>
        </div>
        <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
          Shift+Enter for new line · Connect provider in Settings
        </p>
      </form>
    </div>
  );
}
