import React from 'react'
import ReactDOM from 'react-dom'
import { Editor, EditorState } from 'draft-js'
import '../../../node_modules/draft-js/dist/Draft.css'

function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  )

  return <Editor editorState={editorState} onChange={setEditorState} />
}

ReactDOM.render(<MyEditor />, document.getElementById('container'))

export default MyEditor
