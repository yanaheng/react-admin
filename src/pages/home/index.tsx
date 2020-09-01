import React from 'react';
import { Statistic, Row, Col, Card } from 'antd';
import QRCode from 'qrcode.react';
import LineChart from './components/LineChart';
import RadarChart from './components/RadarChart';
import BarChart from './components/BarChart';
import styles from './index.less';

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      {/* 统计数值 */}
      <Row gutter={32}>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            className={styles.statistic}
            title="Active Users"
            value={112893}
            precision={2}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            className={styles.statistic}
            title="Messages"
            value={112893}
            precision={2}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            className={styles.statistic}
            title="Purchases"
            value={112893}
            precision={2}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic
            className={styles.statistic}
            title="Shoppings"
            value={112893}
            precision={2}
          />
        </Col>
      </Row>
      {/* 折线图 */}
      <LineChart />
      {/* 雷达图 */}
      <RadarChart />
      {/* 柱状图 */}
      <BarChart />
      {/* 二维码 */}
      <Card>
        <QRCode
          value='https://github.com/zpao/qrcode.react'// 生成二维码的内容
          size={300} // 二维码的大小
          fgColor="#000000" // 二维码的颜色
        />
      </Card>
    </div>
  );
};

export default Home;