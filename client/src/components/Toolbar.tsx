import { ScanText, Hash } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { processText, processFillers } from '../store/editorSlice'

export default function Toolbar() {
  const dispatch = useDispatch()

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
    </div>
  )
}
