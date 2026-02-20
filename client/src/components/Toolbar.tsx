import { ScanText, Hash, Eye, Italic, Ruler, Repeat, List } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { processText, processFillers, processFilterWords, processAdverbs, processSentenceLengths, processRepeatedPhrases, toggleViewMode } from '../store/editorSlice'
import type { RootState } from '../store/index'

export default function Toolbar() {
  const dispatch = useDispatch()
  const viewMode = useSelector((state: RootState) => state.editor.viewMode)

  return (
    <div className="toolbar">
      <button
        className="toolbar-btn"
        title="Process Text"
        aria-label="Process Text"
        onClick={() => dispatch(processText())}
      >
        <ScanText size={22} />
      </button>
      <button
        className="toolbar-btn"
        title="Analyze Filler Words"
        aria-label="Analyze Filler Words"
        onClick={() => dispatch(processFillers())}
      >
        <Hash size={22} />
      </button>
      <button
        className="toolbar-btn"
        title="Analyze Filter Words"
        aria-label="Analyze Filter Words"
        onClick={() => dispatch(processFilterWords())}
      >
        <Eye size={22} />
      </button>
      <button
        className="toolbar-btn"
        title="Analyze Adverbs"
        aria-label="Analyze Adverbs"
        onClick={() => dispatch(processAdverbs())}
      >
        <Italic size={22} />
      </button>
      <button
        className="toolbar-btn"
        title="Analyze Repeated Phrases"
        aria-label="Analyze Repeated Phrases"
        onClick={() => dispatch(processRepeatedPhrases())}
      >
        <Repeat size={22} />
      </button>
      <button
        className="toolbar-btn"
        title="Analyze Sentence Lengths"
        aria-label="Analyze Sentence Lengths"
        onClick={() => dispatch(processSentenceLengths())}
      >
        <Ruler size={22} />
      </button>
      <button
        className={`toolbar-btn${viewMode === 'text' ? ' toolbar-btn--active' : ''}`}
        title="Toggle Text View"
        aria-label="Toggle Text View"
        aria-pressed={viewMode === 'text'}
        onClick={() => dispatch(toggleViewMode())}
      >
        <List size={22} />
      </button>
    </div>
  )
}
