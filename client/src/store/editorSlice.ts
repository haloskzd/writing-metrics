import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { extractWordFrequency, extractFillerFrequency, WordCount } from '../utils/textAnalysis'

interface EditorState {
  text: string
  wordFrequency: WordCount[]
  fillerFrequency: WordCount[]
}

const initialState: EditorState = {
  text: '',
  wordFrequency: [],
  fillerFrequency: [],
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
  },
})

export const { setText, processText, processFillers } = editorSlice.actions
export default editorSlice.reducer
