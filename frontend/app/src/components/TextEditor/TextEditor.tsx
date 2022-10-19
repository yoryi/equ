import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import { EditorState } from "draft-js"
import React from "react"
import { CirclePicker, ColorResult } from "react-color"
import { Editor } from "react-draft-wysiwyg"

interface TextEditorProps {
  editorState: EditorState
  setEditorState: (editorState: EditorState) => void
  colorPicker?: boolean
  defaultState?: EditorState
  error?: string
}

const TextEditor: React.FC<TextEditorProps> = ({
  editorState,
  setEditorState,
  colorPicker,
  defaultState,
  error,
}) => {
  const Picker = (props: any) => {
    const onChangeComplete = (color: ColorResult) => {
      props.onChange(`color`, color.hex)
    }

    return (
      <div
        className={`active-${
          props.currentState.color && props.currentState.color.substring(1)
        }`}
        style={{ margin: `auto` }}
      >
        <CirclePicker
          colors={[
            `#005DCC`,
            `#00AC58`,
            `#C90DA0`,
            `#EBAD00`,
            `#C91C0D`,
            `#1F242B`,
          ]}
          color={props.currentState.color}
          onChangeComplete={onChangeComplete}
        />
      </div>
    )
  }

  return (
    <div className={`${error ? `rte-error` : ``} text-field`}>
      <Editor
        editorState={editorState}
        defaultEditorState={defaultState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onChange={() => setEditorState}
        onEditorStateChange={(editorState) => setEditorState(editorState)}
        toolbar={{
          options: colorPicker ? [`colorPicker`] : [],
          colorPicker: { component: colorPicker ? Picker : null },
        }}
      />
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default TextEditor
