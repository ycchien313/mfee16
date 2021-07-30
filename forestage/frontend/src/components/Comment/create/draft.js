import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

export default class TextEditor extends Component {
  constructor(props) {
    // console.log(props)
    // const { insertArticle, setInsertArticle } = props
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      message: '',
      // insertArticle: insertArticle,
    }

    this.onEditorStateChange = this.onEditorStateChange.bind(this)
  }
  onEditorStateChange(editorState, message) {
    this.setState(
      {
        editorState,
        message: draftToHtml(
          convertToRaw(editorState.getCurrentContent())
        ),
      },
      () => {
        // let newArticle = { ...insertArticle }
        // newArticle.content = this.state.message
        // setInsertArticle(newArticle)
        console.log(this.state.message)
        // let newObj = { ...this.insertArticle }
        // newObj.content = this.state.message
        // this.setInsertArticle(newObj)
      }
    )
  }

  render() {
    const { editorState } = this.state
    return (
      <Editor
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'textAlign',
            'history',
            'colorPicker',
            'image',
          ],
          inline: {
            options: ['bold', 'italic', 'underline'],
            bold: { className: 'demo-option-custom' },
            italic: { className: 'demo-option-custom' },
            underline: { className: 'demo-option-custom' },
            strikethrough: { className: 'demo-option-custom' },
            monospace: { className: 'demo-option-custom' },
            superscript: { className: 'demo-option-custom' },
            subscript: { className: 'demo-option-custom' },
          },
          blockType: {
            className: 'demo-option-custom-wide',
            dropdownClassName: 'demo-dropdown-custom',
          },
          fontSize: {
            className: 'demo-option-custom-medium',
            options: [16, 20, 24],
          },
          colorPicker: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            colors: [
              'rgb(97,189,109)',
              'rgb(26,188,156)',
              'rgb(84,172,210)',
              'rgb(44,130,201)',
              'rgb(147,101,184)',
              'rgb(71,85,119)',
              'rgb(204,204,204)',
              'rgb(65,168,95)',
              'rgb(0,168,133)',
              'rgb(61,142,185)',
              'rgb(41,105,176)',
              'rgb(85,57,130)',
              'rgb(40,50,78)',
              'rgb(0,0,0)',
              'rgb(247,218,100)',
              'rgb(251,160,38)',
              'rgb(235,107,86)',
              'rgb(226,80,65)',
              'rgb(163,143,132)',
              'rgb(239,239,239)',
              'rgb(255,255,255)',
              'rgb(250,197,28)',
              'rgb(243,121,52)',
              'rgb(209,72,65)',
              'rgb(255, 155, 113)',
              'rgb(232, 72, 85)',
              'rgb(124,112,107)',
              'rgb(209,213,216)',
            ],
          },
          image: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: undefined,
            previewImage: false,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: 'auto',
              width: 'auto',
            },
          },
        }}
        initialEditorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}
