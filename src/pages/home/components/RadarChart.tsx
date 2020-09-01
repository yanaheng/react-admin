import React from 'react';
import { Row, Col, Card } from 'antd';
import {
  Chart,
  Axis,
  Tooltip,
  Point,
  Line,
  Area,
  Coordinate,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from '../index.less';
import { dataRadar } from '../data';
const ds = new DataSet();

// 雷达图数据
const dvRadar = ds.createView().source(dataRadar);
dvRadar.transform({
  type: 'fold',
  fields: ['a', 'b'], // 展开字段集
  key: 'user', // key字段
  value: 'score', // value字段
});
const newDataRadar = dvRadar.rows;
const axisConfigRadar = {
  label: {
    offset: 25,
  },
  tickLine: {
    length: 20,
  },
};

const RadarChart: React.FC = () => {
  return (
    <Row>
      <Col span={24}>
        <Card className={styles.cardContainer}>
          <Chart
            height={400}
            data={newDataRadar}
            autoFit
            scale={{
              score: {
                min: 0,
                max: 90,
              },
            }}
            interactions={['legend-highlight']}
          >
            <Coordinate type="polar" radius={0.8} />
            <Tooltip
              shared={true} // 合并数据项
              follow={true} // tooltip 跟随鼠标
              showCrosshairs={true} // 展示 crosshairs
              crosshairs={{
                // 配置 crosshairs 样式
                type: 'xy', // crosshairs 类型
                line: {
                  // crosshairs 线样式
                  style: {
                    stroke: '#565656',
                    lineDash: [4],
                  },
                },
              }}
            />
            <Point position="item*score" color="user" shape="circle" />
            <Line position="item*score" color="user" size="2" />
            <Area position="item*score" color="user" />
            <Axis name="item" {...axisConfigRadar} />
          </Chart>
        </Card>
      </Col>
    </Row>
  )
}

export default RadarChart