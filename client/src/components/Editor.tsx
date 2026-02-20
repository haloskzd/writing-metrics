import { useDispatch, useSelector } from 'react-redux'
import { setText } from '../store/editorSlice'
import type { RootState } from '../store/index'

export default function Editor() {
  const dispatch = useDispatch()
  const text = useSelector((state: RootState) => state.editor.text)

  return (
    <textarea
      className="editor"
      value={text}
      onChange={(e) => dispatch(setText(e.target.value))}
      placeholder="Paste or type your text here…"
    />
  )
}
