import { describe, it, expect } from 'vitest'
import reducer, { setText, processText, processFillers, toggleViewMode } from './editorSlice'
import type { WordCount } from '../utils/textAnalysis'

const initialState = {
  text: '',
  wordFrequency: [] as WordCount[],
  fillerFrequency: [] as WordCount[],
  viewMode: 'chart' as const,
}

describe('editorSlice', () => {
  describe('setText', () => {
    it('updates text', () => {
      const state = reducer(initialState, setText('hello world'))
      expect(state.text).toBe('hello world')
    })

    it('overwrites previous text', () => {
      const after1 = reducer(initialState, setText('first'))
      const after2 = reducer(after1, setText('second'))
      expect(after2.text).toBe('second')
    })
  })

  describe('processText', () => {
    it('populates wordFrequency from state.text', () => {
      const withText = reducer(initialState, setText('cat cat dog'))
      const state = reducer(withText, processText())
      expect(state.wordFrequency[0]).toEqual({ word: 'cat', count: 2 })
      expect(state.wordFrequency[1]).toEqual({ word: 'dog', count: 1 })
    })

    it('filters stop words out of wordFrequency', () => {
      const withText = reducer(initialState, setText('the cat sat on the mat'))
      const state = reducer(withText, processText())
      const words = state.wordFrequency.map((w) => w.word)
      expect(words).not.toContain('the')
      expect(words).toContain('cat')
    })

    it('sets wordFrequency to empty when text is blank', () => {
      const state = reducer(initialState, processText())
      expect(state.wordFrequency).toEqual([])
    })
  })

  describe('processFillers', () => {
    it('populates fillerFrequency with stop words', () => {
      const withText = reducer(initialState, setText('the cat and the dog'))
      const state = reducer(withText, processFillers())
      const words = state.fillerFrequency.map((w) => w.word)
      expect(words).toContain('the')
      expect(words).toContain('and')
      expect(words).not.toContain('cat')
      expect(words).not.toContain('dog')
    })

    it('sets fillerFrequency to empty when text is blank', () => {
      const state = reducer(initialState, processFillers())
      expect(state.fillerFrequency).toEqual([])
    })
  })

  describe('toggleViewMode', () => {
    it('switches from chart to text', () => {
      const state = reducer(initialState, toggleViewMode())
      expect(state.viewMode).toBe('text')
    })

    it('switches from text back to chart', () => {
      const after1 = reducer(initialState, toggleViewMode())
      const after2 = reducer(after1, toggleViewMode())
      expect(after2.viewMode).toBe('chart')
    })
  })
})
