import React from 'react';
import { Card } from 'antd';
import SplitPane from 'react-split-pane';
import styles from './index.less';

export default () => {
  return (
    <Card
      className={styles.container}
      bodyStyle={{ height: '100%', padding: 0 }}
    >
      <SplitPane split="vertical" minSize={200}>
        <div className={styles.leftPart} />
        <SplitPane split="horizontal" minSize={200}>
          <div className={styles.rightTopPart}>试着拖拽一下分界线吧～</div>
          <div className={styles.rightBottomPart} />
        </SplitPane>
      </SplitPane>
    </Card>
  );
};
