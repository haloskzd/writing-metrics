import { ScanText, Hash, Eye, List } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { processText, processFillers, processFilterWords, toggleViewMode } from '../store/editorSlice'
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
