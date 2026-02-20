import { useSelector } from 'react-redux'
import type { RootState } from '../store/index'

export default function WordFrequency() {
  const wordFrequency = useSelector((state: RootState) => state.editor.wordFrequency)

  if (wordFrequency.length === 0) return null

  const maxCount = wordFrequency[0].count

  return (
    <div className="results">
      <h2 className="results-title">Word Frequency</h2>
      <div className="results-list">
        {wordFrequency.map(({ word, count }) => (
          <div key={word} className="bar-row">
            <span className="bar-label">{word}</span>
            <div className="bar-track">
              <div
                className="bar"
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
