'use client';

import Editor, { OnMount } from '@monaco-editor/react';
import { useIDEStore } from '@/stores/ide-store';
import { useCallback, useRef } from 'react';
import type { editor as MonacoEditor } from 'monaco-editor';

const LANGUAGE_MAP: Record<string, string> = {
  dart: 'dart',
  yaml: 'yaml',
  json: 'json',
  markdown: 'markdown',
  plaintext: 'plaintext',
};

export function CodeEditor() {
  const { tabs, activeTabId, getActiveContent, updateTabContent } = useIDEStore();
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const content = getActiveContent();
  const language = LANGUAGE_MAP[activeTab?.language ?? 'plaintext'] ?? 'plaintext';

  const handleMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

    // Register Dart as a language with basic config
    if (!monaco.languages.getLanguages().some((l: { id: string }) => l.id === 'dart')) {
      monaco.languages.register({ id: 'dart' });
      monaco.languages.setLanguageConfiguration('dart', {
        comments: { lineComment: '//', blockComment: ['/*', '*/'] },
        brackets: [['{', '}'], ['[', ']'], ['(', ')']],
        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: "'", close: "'", notIn: ['string'] },
          { open: '"', close: '"', notIn: ['string'] },
        ],
      });
      monaco.languages.setMonarchTokensProvider('dart', {
        keywords: ['abstract', 'as', 'assert', 'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'covariant', 'default', 'deferred', 'do', 'dynamic', 'else', 'enum', 'export', 'extends', 'extension', 'external', 'factory', 'false', 'final', 'finally', 'for', 'Function', 'get', 'hide', 'if', 'implements', 'import', 'in', 'interface', 'is', 'late', 'library', 'mixin', 'new', 'null', 'on', 'operator', 'part', 'required', 'rethrow', 'return', 'sealed', 'set', 'show', 'static', 'super', 'switch', 'sync', 'this', 'throw', 'true', 'try', 'typedef', 'var', 'void', 'while', 'with', 'yield'],
        types: ['bool', 'double', 'int', 'List', 'Map', 'Never', 'Null', 'num', 'Object', 'Set', 'String', 'Symbol'],
        tokenizer: {
          root: [
            [/[a-zA-Z_]\w*/, {
              cases: {
                '@keywords': 'keyword',
                '@types': 'type',
                '@default': 'identifier',
              },
            }],
            [/".*?"/, 'string'],
            [/'.*?'/, 'string'],
            [/\/\/.*/, 'comment'],
            [/\/\*/, 'comment', '@comment'],
            [/\d+\.?\d*/, 'number'],
          ],
          comment: [
            [/\*\//, 'comment', '@pop'],
            [/./, 'comment'],
          ],
        },
      });
    }

    // Theme matching Krypton design
    monaco.editor.defineTheme('krypton-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'ff7b72', fontStyle: 'bold' },
        { token: 'type', foreground: 'ffa657' },
        { token: 'string', foreground: 'a5d6ff' },
        { token: 'comment', foreground: '545c6b', fontStyle: 'italic' },
        { token: 'number', foreground: '79c0ff' },
        { token: 'identifier', foreground: 'c9d1d9' },
      ],
      colors: {
        'editor.background': '#0d1117',
        'editor.foreground': '#c9d1d9',
        'editor.lineHighlightBackground': '#161b22',
        'editor.selectionBackground': '#3d8ef840',
        'editorLineNumber.foreground': '#3a3f4b',
        'editorLineNumber.activeForeground': '#8b919e',
        'editorIndentGuide.background': '#21262d',
        'editorIndentGuide.activeBackground': '#2a2d35',
        'editor.findMatchBackground': '#3d8ef850',
        'editorBracketMatch.background': '#3d8ef830',
        'editorBracketMatch.border': '#3d8ef8',
        'scrollbarSlider.background': '#2a2d3560',
        'scrollbarSlider.hoverBackground': '#3a3f4b80',
      },
    });
    monaco.editor.setTheme('krypton-dark');
  }, []);

  function handleChange(value: string | undefined) {
    if (activeTabId && value !== undefined) {
      updateTabContent(activeTabId, value);
    }
  }

  if (!activeTab) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0d1117', gap: 12 }}>
        <span style={{ fontSize: 28, opacity: 0.2 }}>🎯</span>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Open a file to start editing</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflow: 'hidden' }}>
      <Editor
        height="100%"
        language={language}
        value={content}
        onMount={handleMount}
        onChange={handleChange}
        options={{
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          lineNumbers: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'off',
          tabSize: 2,
          renderLineHighlight: 'line',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          formatOnPaste: true,
          bracketPairColorization: { enabled: true },
          padding: { top: 8 },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
        theme="krypton-dark"
      />
    </div>
  );
}
