import './App.css'
import Editor from './components/Editor'
import Toolbar from './components/Toolbar'
import WordFrequency from './components/WordFrequency'
import FillerFrequency from './components/FillerFrequency'

function App() {
  return (
    <div className="app">
      <h1>Writing Metrics</h1>
      <div className="main">
        <div className="editor-container">
          <Editor />
        </div>
        <Toolbar />
      </div>
      <WordFrequency />
      <FillerFrequency />
    </div>
  )
}

export default App
