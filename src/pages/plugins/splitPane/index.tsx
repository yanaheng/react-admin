import React, { useState } from 'react';
import { Card, Input, Button, Row, Col } from 'antd';
import {ArrowRightOutlined } from '@ant-design/icons'
import SplitPane from 'react-split-pane';
import styles from './index.less';
const { TextArea } = Input;

export default () => {

  const initHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>
    <style>
    P{
      font-size: 20px;
      color: #ffafbd;
    }
    </style>
  </head>
  <body>
    <p>来修改代码试试吧~</P>
  </body>
  </html>
  `

  const [editHtml, setEditHtml] = useState(initHtml)

  const changeHtml = ({ target: { value } }) => {
    setEditHtml(value);
  };

  return (
    <Card
      className={styles.container}
      bodyStyle={{ height: '100%', padding: 0 }}
    >
      <SplitPane split="vertical" minSize={500}>
        <div className={styles.leftPart}>
          <p className={styles.actTip}>请在右侧查看运行结果<ArrowRightOutlined style={{paddingLeft: 10}} /></p>
          <TextArea value={editHtml} onChange={changeHtml} className={styles.actArea} />
        </div>
        <SplitPane split="horizontal" minSize={500}>
          <div className={styles.rightTopPart}>
            <iframe name="htmlRender" height="100%" width="100%" srcDoc={editHtml} />
          </div>
          <div className={styles.rightBottomPart} />
        </SplitPane>
      </SplitPane>
    </Card >
  );
};
