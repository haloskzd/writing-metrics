import { useSelector } from 'react-redux'
import './App.css'
import Editor from './components/Editor'
import Toolbar from './components/Toolbar'
import FrequencyPanel from './components/FrequencyPanel'
import type { RootState } from './store/index'

function App() {
  const text = useSelector((state: RootState) => state.editor.text)
  const wordFrequency = useSelector((state: RootState) => state.editor.wordFrequency)
  const fillerFrequency = useSelector((state: RootState) => state.editor.fillerFrequency)
  const filterWordFrequency = useSelector((state: RootState) => state.editor.filterWordFrequency)
  const adverbFrequency = useSelector((state: RootState) => state.editor.adverbFrequency)
  const sentenceLengthFrequency = useSelector((state: RootState) => state.editor.sentenceLengthFrequency)

  const wordCount = (text.match(/\S+/g) ?? []).length
  const countLabel = wordCount > 0 ? ` — ${wordCount} words` : ''

  return (
    <div className="app">
      <h1>Writing Metrics{countLabel}</h1>
      <div className="main">
        <div className="editor-container">
          <Editor />
        </div>
        <Toolbar />
      </div>
      <FrequencyPanel title="Word Frequency" data={wordFrequency} barClass="bar" />
      <FrequencyPanel title="Filler Word Frequency" data={fillerFrequency} barClass="bar bar--filler" />
      <FrequencyPanel title="Filter Word Frequency" data={filterWordFrequency} barClass="bar bar--filter" />
      <FrequencyPanel title="Adverb Frequency" data={adverbFrequency} barClass="bar bar--adverb" />
      <FrequencyPanel title="Sentence Length Distribution" data={sentenceLengthFrequency} barClass="bar bar--sentence" />
    </div>
  )
}

export default App
