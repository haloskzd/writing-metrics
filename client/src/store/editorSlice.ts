import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { extractWordFrequency, extractFillerFrequency, extractFilterWordFrequency, extractAdverbFrequency, WordCount } from '../utils/textAnalysis'

export interface EditorState {
  text: string
  wordFrequency: WordCount[]
  fillerFrequency: WordCount[]
  filterWordFrequency: WordCount[]
  adverbFrequency: WordCount[]
  viewMode: 'chart' | 'text'
}

const initialState: EditorState = {
  text: '',
  wordFrequency: [],
  fillerFrequency: [],
  filterWordFrequency: [],
  adverbFrequency: [],
  viewMode: 'chart',
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
    processText: (state) => {
      state.wordFrequency = extractWordFrequency(state.text)
    },
    processFillers: (state) => {
      state.fillerFrequency = extractFillerFrequency(state.text)
    },
    processFilterWords: (state) => {
      state.filterWordFrequency = extractFilterWordFrequency(state.text)
    },
    processAdverbs: (state) => {
      state.adverbFrequency = extractAdverbFrequency(state.text)
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'chart' ? 'text' : 'chart'
    },
  },
})

export const { setText, processText, processFillers, processFilterWords, processAdverbs, toggleViewMode } = editorSlice.actions
export default editorSlice.reducer
