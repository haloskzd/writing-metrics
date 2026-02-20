import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { extractWordFrequency, extractFillerFrequency, extractFilterWordFrequency, extractAdverbFrequency, extractSentenceLengths, extractRepeatedPhrases, extractPassiveVoice, WordCount } from '../utils/textAnalysis'

export type PanelKey =
  | 'wordFrequency'
  | 'fillerFrequency'
  | 'filterWordFrequency'
  | 'adverbFrequency'
  | 'sentenceLengthFrequency'
  | 'repeatedPhraseFrequency'
  | 'passiveVoiceFrequency'

const extractors: Record<PanelKey, (text: string) => WordCount[]> = {
  wordFrequency:           extractWordFrequency,
  fillerFrequency:         extractFillerFrequency,
  filterWordFrequency:     extractFilterWordFrequency,
  adverbFrequency:         extractAdverbFrequency,
  sentenceLengthFrequency: extractSentenceLengths,
  repeatedPhraseFrequency: extractRepeatedPhrases,
  passiveVoiceFrequency:   extractPassiveVoice,
}

export interface EditorState {
  text: string
  wordFrequency: WordCount[]
  fillerFrequency: WordCount[]
  filterWordFrequency: WordCount[]
  adverbFrequency: WordCount[]
  sentenceLengthFrequency: WordCount[]
  repeatedPhraseFrequency: WordCount[]
  passiveVoiceFrequency: WordCount[]
  visiblePanels: Record<PanelKey, boolean>
  viewMode: 'chart' | 'text'
}

const initialState: EditorState = {
  text: '',
  wordFrequency: [],
  fillerFrequency: [],
  filterWordFrequency: [],
  adverbFrequency: [],
  sentenceLengthFrequency: [],
  repeatedPhraseFrequency: [],
  passiveVoiceFrequency: [],
  visiblePanels: {
    wordFrequency: false,
    fillerFrequency: false,
    filterWordFrequency: false,
    adverbFrequency: false,
    sentenceLengthFrequency: false,
    repeatedPhraseFrequency: false,
    passiveVoiceFrequency: false,
  },
  viewMode: 'chart',
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
    togglePanel: (state, action: PayloadAction<PanelKey>) => {
      const key = action.payload
      const isNowVisible = !state.visiblePanels[key]
      state.visiblePanels[key] = isNowVisible
      state[key] = isNowVisible ? extractors[key](state.text) : []
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'chart' ? 'text' : 'chart'
    },
  },
})

export const { setText, togglePanel, toggleViewMode } = editorSlice.actions
export default editorSlice.reducer
