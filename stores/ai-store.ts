import { create } from 'zustand';
import type { AIModel, AIMessage, AIActionType, AIProviderId } from '../lib/types';
import { MOCK_AI_PROVIDERS } from '../lib/mock-data';

interface AIState {
  selectedProviderId: AIProviderId;
  selectedModel: AIModel;
  messages: AIMessage[];
  contextFiles: string[];
  isGenerating: boolean;
  currentAction: AIActionType;

  setProvider: (id: AIProviderId) => void;
  setModel: (model: AIModel) => void;
  setAction: (action: AIActionType) => void;
  addMessage: (msg: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  setContextFiles: (files: string[]) => void;
  setIsGenerating: (v: boolean) => void;
}

const defaultProvider = MOCK_AI_PROVIDERS[0];
const defaultModel = defaultProvider.models[0];

export const useAIStore = create<AIState>((set) => ({
  selectedProviderId: defaultProvider.id,
  selectedModel: defaultModel,
  messages: [],
  contextFiles: ['lib/main.dart', 'lib/home.dart', 'pubspec.yaml'],
  isGenerating: false,
  currentAction: 'generate',

  setProvider: (id) => {
    const provider = MOCK_AI_PROVIDERS.find((p) => p.id === id) ?? defaultProvider;
    set({ selectedProviderId: id, selectedModel: provider.models[0] });
  },
  setModel: (model) => set({ selectedModel: model }),
  setAction: (action) => set({ currentAction: action }),
  addMessage: (msg) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...msg, id: `msg-${Date.now()}`, timestamp: new Date() },
      ],
    })),
  clearMessages: () => set({ messages: [] }),
  setContextFiles: (files) => set({ contextFiles: files }),
  setIsGenerating: (v) => set({ isGenerating: v }),
}));
