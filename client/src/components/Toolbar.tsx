import { ScanText, Hash, List } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { processText, processFillers, toggleViewMode } from '../store/editorSlice'
import type { RootState } from '../store/index'

export default function Toolbar() {
  const dispatch = useDispatch()
  const viewMode = useSelector((state: RootState) => state.editor.viewMode)

  return (
    <div className="toolbar">
      <button
        className="toolbar-btn"
        title="Process Text"
        onClick={() => dispatch(processText())}
      >
        <ScanText size={22} />
      </button>
      <button
        className="toolbar-btn"
        title="Analyze Filler Words"
        onClick={() => dispatch(processFillers())}
      >
        <Hash size={22} />
      </button>
      <button
        className={`toolbar-btn${viewMode === 'text' ? ' toolbar-btn--active' : ''}`}
        title="Toggle Text View"
        onClick={() => dispatch(toggleViewMode())}
      >
        <List size={22} />
      </button>
    </div>
  )
}
