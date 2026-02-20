import { useSelector } from 'react-redux'
import './App.css'
import Editor from './components/Editor'
import Toolbar from './components/Toolbar'
import FrequencyPanel from './components/FrequencyPanel'
import type { RootState } from './store/index'

function App() {
  const wordFrequency = useSelector((state: RootState) => state.editor.wordFrequency)
  const fillerFrequency = useSelector((state: RootState) => state.editor.fillerFrequency)
  const filterWordFrequency = useSelector((state: RootState) => state.editor.filterWordFrequency)

  return (
    <div className="app">
      <h1>Writing Metrics</h1>
      <div className="main">
        <div className="editor-container">
          <Editor />
        </div>
        <Toolbar />
      </div>
      <FrequencyPanel title="Word Frequency" data={wordFrequency} barClass="bar" />
      <FrequencyPanel title="Filler Word Frequency" data={fillerFrequency} barClass="bar bar--filler" />
      <FrequencyPanel title="Filter Word Frequency" data={filterWordFrequency} barClass="bar bar--filter" />
    </div>
  )
}

export default App
