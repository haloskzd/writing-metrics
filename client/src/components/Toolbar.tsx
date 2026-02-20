import { ScanText, Hash, Eye, Italic, Ruler, Repeat, Ghost, List } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { togglePanel, toggleViewMode } from '../store/editorSlice'
import type { RootState } from '../store/index'

export default function Toolbar() {
  const dispatch = useDispatch()
  const viewMode = useSelector((state: RootState) => state.editor.viewMode)
  const visiblePanels = useSelector((state: RootState) => state.editor.visiblePanels)

  const btn = (active: boolean) => `toolbar-btn${active ? ' toolbar-btn--active' : ''}`

  return (
    <div className="toolbar">
      <button
        className={btn(visiblePanels.wordFrequency)}
        title="Word Frequency"
        aria-label="Word Frequency"
        aria-pressed={visiblePanels.wordFrequency}
        onClick={() => dispatch(togglePanel('wordFrequency'))}
      >
        <ScanText size={22} />
      </button>
      <button
        className={btn(visiblePanels.fillerFrequency)}
        title="Filler Words"
        aria-label="Filler Words"
        aria-pressed={visiblePanels.fillerFrequency}
        onClick={() => dispatch(togglePanel('fillerFrequency'))}
      >
        <Hash size={22} />
      </button>
      <button
        className={btn(visiblePanels.filterWordFrequency)}
        title="Filter Words"
        aria-label="Filter Words"
        aria-pressed={visiblePanels.filterWordFrequency}
        onClick={() => dispatch(togglePanel('filterWordFrequency'))}
      >
        <Eye size={22} />
      </button>
      <button
        className={btn(visiblePanels.adverbFrequency)}
        title="Adverbs"
        aria-label="Adverbs"
        aria-pressed={visiblePanels.adverbFrequency}
        onClick={() => dispatch(togglePanel('adverbFrequency'))}
      >
        <Italic size={22} />
      </button>
      <button
        className={btn(visiblePanels.passiveVoiceFrequency)}
        title="Passive Voice"
        aria-label="Passive Voice"
        aria-pressed={visiblePanels.passiveVoiceFrequency}
        onClick={() => dispatch(togglePanel('passiveVoiceFrequency'))}
      >
        <Ghost size={22} />
      </button>
      <button
        className={btn(visiblePanels.repeatedPhraseFrequency)}
        title="Repeated Phrases"
        aria-label="Repeated Phrases"
        aria-pressed={visiblePanels.repeatedPhraseFrequency}
        onClick={() => dispatch(togglePanel('repeatedPhraseFrequency'))}
      >
        <Repeat size={22} />
      </button>
      <button
        className={btn(visiblePanels.sentenceLengthFrequency)}
        title="Sentence Lengths"
        aria-label="Sentence Lengths"
        aria-pressed={visiblePanels.sentenceLengthFrequency}
        onClick={() => dispatch(togglePanel('sentenceLengthFrequency'))}
      >
        <Ruler size={22} />
      </button>
      <button
        className={btn(viewMode === 'text')}
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
