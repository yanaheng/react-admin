import React, { useState } from 'react';
import { Card } from 'antd';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils'
import 'braft-editor/dist/index.css';

const BraftEditorCom: React.FC = () => {

  const initState = BraftEditor.createEditorState(null)

  const [editorState, setEditorState] = useState(initState);

  // 编辑器内容改变时存储至editorState中
  const handleEditorChange = (editorState: any) => {
    setEditorState(editorState);
  };

  // 生成预览页面
  const buildPreviewHtml = () => {
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${editorState ? editorState.toHTML() : ''}</div>
        </body>
      </html>
    `

  }

  // 点击“预览”，打开新标签页，填入预览内容
  const preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close()
    }
    window.previewWindow = window.open()
    window.previewWindow.document.write(buildPreviewHtml())
    window.previewWindow.document.close()
  }

  //  点击“插入字符串”，使用ContentUtils在外部修改编辑器内容
  const insertHello = () => {
    // 只有用受控组件的方式使用编辑器，才能使用ContentUtils
    // 若用受控组件的方式，必须使用BraftEditor.createEditorState()来创建初始editorState
    setEditorState( ContentUtils.insertText(editorState, '你好啊！'))
  }

  return (
    <Card>
      <BraftEditor 
      extendControls={[
        {
          key: 'insert-button',
          type: 'button',
          text: '插入字符串',
          onClick: insertHello
        },
        {
          key: 'preview-button', // 扩展内容需指定唯一key
          type: 'button',
          text: '预览',
          onClick: preview
        }
      ]}
      contentStyle={{ height: 600 }} 
      value={editorState} 
      onChange={handleEditorChange} />
    </Card>
  );
};

export default BraftEditorCom