// ─── Core Domain Types ───────────────────────────────────────────────────────

export type ProjectStatus = 'idle' | 'running' | 'building' | 'error';
export type FlutterVersion = '3.22.0' | '3.19.6' | '3.16.9';
export type DeviceTarget = 'mobile' | 'tablet' | 'desktop' | 'web';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  flutterVersion: FlutterVersion;
  status: ProjectStatus;
  lastModified: Date;
  createdAt: Date;
  ownerId: string;
  templateId?: string;
}

export interface FileNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'directory';
  language?: string;
  children?: FileNode[];
  content?: string;
  size?: number;
  updatedAt?: Date;
}

export interface EditorTab {
  id: string;
  fileId: string;
  path: string;
  name: string;
  isDirty: boolean;
  language: string;
}

export interface Workspace {
  projectId: string;
  openTabs: EditorTab[];
  activeTabId: string | null;
  fileTree: FileNode[];
}

export interface Build {
  id: string;
  projectId: string;
  status: 'queued' | 'running' | 'success' | 'failed';
  startedAt: Date;
  completedAt?: Date;
  logs: string[];
  target: DeviceTarget;
}

export interface TerminalSession {
  id: string;
  projectId: string;
  name: string;
  isActive: boolean;
  output: TerminalLine[];
}

export interface TerminalLine {
  id: string;
  content: string;
  type: 'command' | 'output' | 'error' | 'info';
  timestamp: Date;
}

// ─── AI Types ────────────────────────────────────────────────────────────────

export type AIProviderId = 'claude' | 'openai' | 'gemini';
export type AIProviderStatus = 'not_connected' | 'connected' | 'error';

export interface AIProvider {
  id: AIProviderId;
  name: string;
  status: AIProviderStatus;
  models: AIModel[];
}

export interface AIModel {
  id: string;
  name: string;
  providerId: AIProviderId;
  contextWindow: number;
}

export type AIActionType = 'generate' | 'edit' | 'explain' | 'debug' | 'refactor' | 'review';

export type AIResponseStage =
  | 'understanding'
  | 'planning'
  | 'modifying_files'
  | 'generated'
  | 'review';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  stage?: AIResponseStage;
  contextFiles?: string[];
  codeChanges?: CodeChange[];
}

export interface CodeChange {
  filePath: string;
  before: string;
  after: string;
  description: string;
}

// ─── Template Types ───────────────────────────────────────────────────────────

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'blank' | 'starter' | 'feature';
  flutterVersion: FlutterVersion;
  tags: string[];
}

// ─── Settings Types ───────────────────────────────────────────────────────────

export type ColorTheme = 'krypton-dark' | 'krypton-darker';
export type FontSize = 12 | 13 | 14 | 15 | 16;
export type TabSize = 2 | 4;

export interface EditorPreferences {
  fontSize: FontSize;
  tabSize: TabSize;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
  formatOnSave: boolean;
}

export interface AppearancePreferences {
  theme: ColorTheme;
  density: 'compact' | 'comfortable';
}

export interface UserSettings {
  editor: EditorPreferences;
  appearance: AppearancePreferences;
  defaultFlutterVersion: FlutterVersion;
  telemetry: boolean;
}

// ─── Future API Boundaries ────────────────────────────────────────────────────

/**
 * These interfaces describe future API contracts.
 * They are NOT implemented yet — connect to real backend services later.
 */

export interface AuthAPI {
  signInWithGoogle: () => Promise<User>;
  signInWithEmail: (email: string) => Promise<{ requiresOtp: boolean }>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
}

export interface ProjectsAPI {
  list: () => Promise<Project[]>;
  create: (opts: { name: string; templateId?: string }) => Promise<Project>;
  get: (id: string) => Promise<Project>;
  delete: (id: string) => Promise<void>;
}

export interface FileStorageAPI {
  readFile: (projectId: string, path: string) => Promise<string>;
  writeFile: (projectId: string, path: string, content: string) => Promise<void>;
  listFiles: (projectId: string) => Promise<FileNode[]>;
}

export interface AIGatewayAPI {
  chat: (messages: AIMessage[], model: AIModel) => AsyncIterable<string>;
  applyChanges: (projectId: string, changes: CodeChange[]) => Promise<void>;
}

export interface BuildServiceAPI {
  start: (projectId: string, target: DeviceTarget) => Promise<Build>;
  stop: (buildId: string) => Promise<void>;
  getLogs: (buildId: string) => AsyncIterable<string>;
}

export interface TerminalServiceAPI {
  createSession: (projectId: string) => Promise<TerminalSession>;
  sendInput: (sessionId: string, input: string) => Promise<void>;
  getOutput: (sessionId: string) => AsyncIterable<string>;
}
