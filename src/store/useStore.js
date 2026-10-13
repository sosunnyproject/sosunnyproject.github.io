import { create } from 'zustand'

export const useStore = create((set) => ({
  hoveredCategory: null,
  setHoveredCategory: (slug) => set({ hoveredCategory: slug }),
  // 현재 스토리 비트: 'intro' | STORY_STOPS 인덱스 | 'outro' | null (climbRoute.beatAt)
  beat: 'intro',
  setBeat: (beat) => set({ beat }),
}))
