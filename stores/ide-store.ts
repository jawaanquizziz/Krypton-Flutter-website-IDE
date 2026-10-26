import { create } from 'zustand';
import type {
  Project,
  FileNode,
  EditorTab,
  DeviceTarget,
  ProjectStatus,
} from '../lib/types';
import { MOCK_FILE_TREE, MOCK_FILE_CONTENTS, MOCK_PROJECTS } from '../lib/mock-data';

interface IDEState {
  // Project
  activeProject: Project | null;
  setActiveProject: (project: Project) => void;

  // File explorer
  fileTree: FileNode[];
  expandedDirs: Set<string>;
  toggleDir: (path: string) => void;

  // Editor tabs
  tabs: EditorTab[];
  activeTabId: string | null;
  openFile: (node: FileNode) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  getActiveContent: () => string;
  updateTabContent: (tabId: string, content: string) => void;
  fileContents: Record<string, string>;

  // Panel visibility
  showPreview: boolean;
  showTerminal: boolean;
  showAI: boolean;
  togglePreview: () => void;
  toggleTerminal: () => void;
  toggleAI: () => void;

  // Activity bar
  activeActivity: 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | null;
  setActiveActivity: (activity: IDEState['activeActivity']) => void;

  // Device selector
  deviceTarget: DeviceTarget;
  setDeviceTarget: (target: DeviceTarget) => void;

  // Run state
  runStatus: ProjectStatus;
  setRunStatus: (status: ProjectStatus) => void;
}

export const useIDEStore = create<IDEState>((set, get) => ({
  // Project
  activeProject: MOCK_PROJECTS[0],
  setActiveProject: (project) => set({ activeProject: project }),

  // File explorer
  fileTree: MOCK_FILE_TREE,
  expandedDirs: new Set(['lib', 'lib/widgets', 'lib/services', 'assets']),
  toggleDir: (path) =>
    set((state) => {
      const next = new Set(state.expandedDirs);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return { expandedDirs: next };
    }),

  // Editor
  tabs: [
    {
      id: 'tab-main',
      fileId: 'lib/main.dart',
      path: 'lib/main.dart',
      name: 'main.dart',
      isDirty: false,
      language: 'dart',
    },
    {
      id: 'tab-home',
      fileId: 'lib/home.dart',
      path: 'lib/home.dart',
      name: 'home.dart',
      isDirty: false,
      language: 'dart',
    },
    {
      id: 'tab-pubspec',
      fileId: 'pubspec.yaml',
      path: 'pubspec.yaml',
      name: 'pubspec.yaml',
      isDirty: false,
      language: 'yaml',
    },
  ],
  activeTabId: 'tab-main',
  fileContents: { ...MOCK_FILE_CONTENTS },

  openFile: (node) => {
    const state = get();
    const existing = state.tabs.find((t) => t.path === node.path);
    if (existing) {
      set({ activeTabId: existing.id });
      return;
    }
    const newTab: EditorTab = {
      id: `tab-${Date.now()}`,
      fileId: node.id,
      path: node.path,
      name: node.name,
      isDirty: false,
      language: node.language ?? 'plaintext',
    };
    set((state) => ({
      tabs: [...state.tabs, newTab],
      activeTabId: newTab.id,
    }));
  },

  closeTab: (tabId) =>
    set((state) => {
      const idx = state.tabs.findIndex((t) => t.id === tabId);
      const newTabs = state.tabs.filter((t) => t.id !== tabId);
      let newActive = state.activeTabId;
      if (state.activeTabId === tabId) {
        if (newTabs.length > 0) {
          newActive = newTabs[Math.max(0, idx - 1)].id;
        } else {
          newActive = null;
        }
      }
      return { tabs: newTabs, activeTabId: newActive };
    }),

  setActiveTab: (tabId) => set({ activeTabId: tabId }),

  getActiveContent: () => {
    const state = get();
    const tab = state.tabs.find((t) => t.id === state.activeTabId);
    if (!tab) return '';
    return state.fileContents[tab.path] ?? '';
  },

  updateTabContent: (tabId, content) =>
    set((state) => {
      const tab = state.tabs.find((t) => t.id === tabId);
      if (!tab) return {};
      return {
        fileContents: { ...state.fileContents, [tab.path]: content },
        tabs: state.tabs.map((t) =>
          t.id === tabId ? { ...t, isDirty: true } : t
        ),
      };
    }),

  // Panels
  showPreview: true,
  showTerminal: true,
  showAI: false,
  togglePreview: () => set((s) => ({ showPreview: !s.showPreview })),
  toggleTerminal: () => set((s) => ({ showTerminal: !s.showTerminal })),
  toggleAI: () => set((s) => ({ showAI: !s.showAI })),

  // Activity
  activeActivity: 'explorer',
  setActiveActivity: (activity) =>
    set((state) => ({
      activeActivity: state.activeActivity === activity ? null : activity,
    })),

  // Device
  deviceTarget: 'mobile',
  setDeviceTarget: (target) => set({ deviceTarget: target }),

  // Run
  runStatus: 'idle',
  setRunStatus: (status) => set({ runStatus: status }),
}));
