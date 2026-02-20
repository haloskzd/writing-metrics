import { useSelector } from 'react-redux'
import type { RootState } from '../store/index'

export default function FillerFrequency() {
  const fillerFrequency = useSelector((state: RootState) => state.editor.fillerFrequency)

  if (fillerFrequency.length === 0) return null

  const maxCount = fillerFrequency[0].count

  return (
    <div className="results">
      <h2 className="results-title">Filler Word Frequency</h2>
      <div className="results-list">
        {fillerFrequency.map(({ word, count }) => (
          <div key={word} className="bar-row">
            <span className="bar-label">{word}</span>
            <div className="bar-track">
              <div
                className="bar bar--filler"
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
