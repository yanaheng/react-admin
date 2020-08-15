import React, {useState} from 'react'
import Editor from 'for-editor'

export default () => {
  const [editorValue, setEditor] = useState('');

  const changeEditor = val => {
    setEditor(val)
  }

  return (
    <div>
      <Editor value={editorValue} onChange={changeEditor} />
    </div>
  )
}