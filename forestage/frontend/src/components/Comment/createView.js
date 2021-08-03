import htmlToDraft from 'html-to-draftjs'

setMessageToEditorSate(message) {
    const contentBlock = htmlToDraft(message)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      )
      this.setState({
        editorState: EditorState.createWithContent(contentState),
      })
    }
  }
  <div dangerouslySetInnerHTML={{__html: this.state.message}}></div>