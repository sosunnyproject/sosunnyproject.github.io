import { create } from 'zustand'

export const useStore = create((set) => ({
  hoveredCategory: null,
  setHoveredCategory: (slug) => set({ hoveredCategory: slug }),
}))
