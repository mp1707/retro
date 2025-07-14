import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types for retro data
export type RetroCard = {
  id: string;
  content: string;
  category: 'good' | 'bad' | 'change';
  topic?: string;
};

export type ActionItem = {
  id: string;
  content: string;
  topic: string;
};

export type RetroStep = 'icebreaker' | 'lastRetro' | 'realRetro' | 'topics' | 'checkout';

// Define the state shape
export interface RetroState {
  // Navigation state
  currentStep: RetroStep;
  
  // Step data
  icebreakerResponse: string;
  lastRetroActionItems: ActionItem[]; // For display only - mock data
  retroCards: RetroCard[];
  votes: { [topic: string]: number };
  availableVotes: number;
  actionItems: ActionItem[];
  
  // Actions
  setStep: (step: RetroStep) => void;
  setIcebreakerResponse: (response: string) => void;
  addRetroCard: (card: Omit<RetroCard, 'id'>) => void;
  updateRetroCard: (id: string, updates: Partial<RetroCard>) => void;
  removeRetroCard: (id: string) => void;
  addTopicsToCards: (topic: string) => void;
  voteForTopic: (topic: string) => void;
  addActionItem: (item: Omit<ActionItem, 'id'>) => void;
  removeActionItem: (id: string) => void;
  resetStore: () => void;
}

// Helper function to generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Initial state
const initialState = {
  currentStep: 'icebreaker' as RetroStep,
  icebreakerResponse: '',
  lastRetroActionItems: [
    {
      id: 'mock-1',
      content: 'Improve our daily standup structure',
      topic: 'Communication'
    },
    {
      id: 'mock-2', 
      content: 'Set up automated testing pipeline',
      topic: 'Development'
    }
  ],
  retroCards: [],
  votes: {},
  availableVotes: 3,
  actionItems: [],
};

// Create the store with persist middleware
export const useRetroStore = create<RetroState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setStep: (step: RetroStep) => set({ currentStep: step }),
      
      setIcebreakerResponse: (response: string) => 
        set({ icebreakerResponse: response }),
      
      addRetroCard: (card: Omit<RetroCard, 'id'>) => 
        set((state) => ({
          retroCards: [...state.retroCards, { ...card, id: generateId() }]
        })),
      
      updateRetroCard: (id: string, updates: Partial<RetroCard>) =>
        set((state) => ({
          retroCards: state.retroCards.map((card) =>
            card.id === id ? { ...card, ...updates } : card
          )
        })),
      
      removeRetroCard: (id: string) =>
        set((state) => ({
          retroCards: state.retroCards.filter((card) => card.id !== id)
        })),
      
      addTopicsToCards: (topic: string) =>
        set((state) => ({
          retroCards: state.retroCards.map((card) => ({
            ...card,
            topic
          }))
        })),
      
      voteForTopic: (topic: string) =>
        set((state) => {
          if (state.availableVotes > 0) {
            return {
              votes: {
                ...state.votes,
                [topic]: (state.votes[topic] || 0) + 1
              },
              availableVotes: state.availableVotes - 1
            };
          }
          return state;
        }),
      
      addActionItem: (item: Omit<ActionItem, 'id'>) =>
        set((state) => ({
          actionItems: [...state.actionItems, { ...item, id: generateId() }]
        })),
      
      removeActionItem: (id: string) =>
        set((state) => ({
          actionItems: state.actionItems.filter((item) => item.id !== id)
        })),
      
      resetStore: () => set(initialState),
    }),
    {
      name: 'retro-storage',
      // Only persist essential data, not UI state
      partialize: (state) => ({
        currentStep: state.currentStep,
        icebreakerResponse: state.icebreakerResponse,
        retroCards: state.retroCards,
        votes: state.votes,
        availableVotes: state.availableVotes,
        actionItems: state.actionItems,
      }),
    }
  )
);

// Helper hooks for common operations
export const useCurrentStep = () => useRetroStore((state) => state.currentStep);
export const useRetroCards = () => useRetroStore((state) => state.retroCards);
export const useActionItems = () => useRetroStore((state) => state.actionItems);
export const useVotes = () => useRetroStore((state) => ({
  votes: state.votes,
  availableVotes: state.availableVotes
}));