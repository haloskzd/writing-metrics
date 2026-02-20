import { useSelector } from 'react-redux'
import type { RootState } from '../store/index'
import type { WordCount } from '../utils/textAnalysis'

interface FrequencyPanelProps {
  title: string
  data: WordCount[]
  barClass?: string
}

export default function FrequencyPanel({ title, data, barClass = 'bar' }: FrequencyPanelProps) {
  const viewMode = useSelector((state: RootState) => state.editor.viewMode)

  if (data.length === 0) return null

  if (viewMode === 'text') {
    const plain = data.map(({ word, count }) => `${word}: ${count}`).join('\n')
    return (
      <div className="results">
        <h2 className="results-title">{title}</h2>
        <textarea className="results-text" readOnly value={plain} />
      </div>
    )
  }

  const maxCount = data[0]?.count ?? 1

  return (
    <div className="results">
      <h2 className="results-title">{title}</h2>
      <div className="results-list">
        {data.map(({ word, count }) => (
          <div key={word} className="bar-row">
            <span className="bar-label">{word}</span>
            <div className="bar-track">
              <div
                className={barClass}
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
            <span className="bar-count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
