'use client';

import { useState, useRef, useEffect } from 'react';
import { MOCK_TERMINAL_LINES } from '@/lib/mock-data';
import type { TerminalLine } from '@/lib/types';
import { Plus, X, ChevronDown, Trash2, Copy } from 'lucide-react';

const COLORS: Record<TerminalLine['type'], string> = {
  command: '#3d8ef8',
  output: '#c9d1d9',
  error: '#f85149',
  info: '#3fb950',
};

const SUGGESTION_COMMANDS = [
  'flutter pub get',
  'flutter analyze',
  'flutter build web',
  'flutter clean',
  'dart format .',
];

export function TerminalPanel() {
  const [lines, setLines] = useState<TerminalLine[]>(MOCK_TERMINAL_LINES);
  const [input, setInput] = useState('');
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  function handleCommand(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    const newLines: TerminalLine[] = [
      ...lines,
      { id: `cmd-${Date.now()}`, content: `$ ${cmd}`, type: 'command', timestamp: new Date() },
      {
        id: `out-${Date.now()}`,
        content: '⚠ Command execution is not yet connected to the build service. This is a frontend preview.',
        type: 'info',
        timestamp: new Date(),
      },
    ];
    setLines(newLines);
    setCmdHistory((h) => [cmd, ...h]);
    setInput('');
    setHistoryIdx(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = historyIdx + 1;
      if (idx < cmdHistory.length) {
        setHistoryIdx(idx);
        setInput(cmdHistory[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        setHistoryIdx(historyIdx - 1);
        setInput(cmdHistory[historyIdx - 1]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = SUGGESTION_COMMANDS.find((c) => c.startsWith(input));
      if (match) setInput(match);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0c0f' }}>
      {/* Terminal header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px', borderBottom: '1px solid var(--border)', flexShrink: 0, gap: 4 }}>
        {/* Tab */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 10px', background: 'var(--bg-elevated)', borderRadius: '4px 4px 0 0', fontSize: 12, color: 'var(--text-secondary)', border: '1px solid var(--border)', borderBottom: 'none' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>bash</span>
          <X size={10} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
        </div>
        <button style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: 4 }}>
          <Plus size={12} />
        </button>
        <div style={{ flex: 1 }} />
        <button onClick={() => setLines([])} title="Clear" style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: 4 }}>
          <Trash2 size={11} />
        </button>
        <button title="Copy" style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: 4 }}>
          <Copy size={11} />
        </button>
        <ChevronDown size={13} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
      </div>

      {/* Output */}
      <div
        style={{ flex: 1, overflow: 'auto', padding: '8px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.65 }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div key={line.id} style={{ color: COLORS[line.type], whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {line.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center', padding: '4px 16px 8px', gap: 8, flexShrink: 0 }}>
        <span style={{ color: '#3d8ef8', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, flexShrink: 0 }}>$</span>
        <input
          id="terminal-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="flutter pub get"
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#c9d1d9',
            fontSize: 12,
            fontFamily: 'JetBrains Mono, monospace',
            caretColor: '#3d8ef8',
          }}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
      </form>
    </div>
  );
}
