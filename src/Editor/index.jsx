import React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import './editor.scss';

class UEditor extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                editorState:EditorState.createEmpty(),
            };
    }


    componentWillReceiveProps(newProps) {
        console.log("属性改变");
        const contentBlock = htmlToDraft(newProps.content);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        if (contentBlock) {
            this.setState({
                editorState
            })
        }
    }

    componentDidMount() {
        console.log("渲染");

    }

    uploadImageCallBack(file) {
        console.log(file);
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
        //onChangeEditor是将富文本的内容传给content
        typeof this.props.onChangeEditor==="function" && this.props.onChangeEditor(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    render() {
        let {editorState} = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    localization={{locale: 'zh'}}
                    onEditorStateChange={this.onEditorStateChange.bind(this)}
                    toolbar={{
                        textAlign: {inDropdown: true},
                        link: {inDropdown: true},
                        image: {uploadCallback: this.uploadImageCallBack, alt: {present: true, mandatory: false}},
                    }}
                />
            </div>
        )
    }
}

export default UEditor;
