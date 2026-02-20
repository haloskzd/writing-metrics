import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { extractWordFrequency, extractFillerFrequency, WordCount } from '../utils/textAnalysis'

interface EditorState {
  text: string
  wordFrequency: WordCount[]
  fillerFrequency: WordCount[]
  viewMode: 'chart' | 'text'
}

const initialState: EditorState = {
  text: '',
  wordFrequency: [],
  fillerFrequency: [],
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
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'chart' ? 'text' : 'chart'
    },
  },
})

export const { setText, processText, processFillers, toggleViewMode } = editorSlice.actions
export default editorSlice.reducer
