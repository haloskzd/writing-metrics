import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import editorReducer from '../store/editorSlice'
import FrequencyPanel from './FrequencyPanel'
import type { WordCount } from '../utils/textAnalysis'

function makeStore(viewMode: 'chart' | 'text' = 'chart') {
  return configureStore({
    reducer: { editor: editorReducer },
    preloadedState: {
      editor: { text: '', wordFrequency: [], fillerFrequency: [], viewMode },
    },
  })
}

const sampleData: WordCount[] = [
  { word: 'apple', count: 10 },
  { word: 'banana', count: 5 },
  { word: 'cherry', count: 2 },
]

function renderPanel(data: WordCount[], viewMode: 'chart' | 'text' = 'chart') {
  const store = makeStore(viewMode)
  return render(
    <Provider store={store}>
      <FrequencyPanel title="Test Panel" data={data} barClass="bar" />
    </Provider>,
  )
}

describe('FrequencyPanel', () => {
  it('renders nothing when data is empty', () => {
    const { container } = renderPanel([])
    expect(container.firstChild).toBeNull()
  })

  it('renders the title', () => {
    renderPanel(sampleData)
    expect(screen.getByText('Test Panel')).toBeTruthy()
  })

  it('renders a row for each word in chart mode', () => {
    renderPanel(sampleData)
    expect(screen.getByText('apple')).toBeTruthy()
    expect(screen.getByText('banana')).toBeTruthy()
    expect(screen.getByText('cherry')).toBeTruthy()
  })

  it('renders count labels in chart mode', () => {
    renderPanel(sampleData)
    expect(screen.getByText('10')).toBeTruthy()
    expect(screen.getByText('5')).toBeTruthy()
    expect(screen.getByText('2')).toBeTruthy()
  })

  it('top word bar has 100% width', () => {
    const { container } = renderPanel(sampleData)
    const bars = container.querySelectorAll('.bar')
    expect((bars[0] as HTMLElement).style.width).toBe('100%')
  })

  it('subsequent bars scale relative to the top word', () => {
    const { container } = renderPanel(sampleData)
    const bars = container.querySelectorAll('.bar')
    // banana = 5/10 = 50%, cherry = 2/10 = 20%
    expect((bars[1] as HTMLElement).style.width).toBe('50%')
    expect((bars[2] as HTMLElement).style.width).toBe('20%')
  })

  it('renders a textarea in text mode', () => {
    renderPanel(sampleData, 'text')
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeTruthy()
  })

  it('textarea contains word: count lines in text mode', () => {
    renderPanel(sampleData, 'text')
    const textarea = screen.getByRole<HTMLTextAreaElement>('textbox')
    expect(textarea.value).toBe('apple: 10\nbanana: 5\ncherry: 2')
  })

  it('does not render bar rows in text mode', () => {
    const { container } = renderPanel(sampleData, 'text')
    expect(container.querySelectorAll('.bar-row')).toHaveLength(0)
  })
})
