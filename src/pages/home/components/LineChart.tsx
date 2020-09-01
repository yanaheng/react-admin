import React from 'react';
import { Row, Col, Card } from 'antd';
import {
  Chart,
  Axis,
  Geom,
  Tooltip,
  Legend,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from '../index.less';
import { dataLine } from '../data';
const ds = new DataSet();

// 折线图数据
const dvLine = ds.createView().source(dataLine);
dvLine.transform({
  type: 'fold',
  fields: ['series1', 'series2'],
  key: 'key',
  value: 'value',
});
const colsLine = {
  month: {
    range: [0, 1],
  },
};

const LineChart: React.FC = () => {
  return (
    <Row>
      <Col span={24}>
        <Card className={styles.cardContainer}>
          <Chart
            height={400}
            padding={[10, 10, 50, 20]}
            data={dvLine}
            scale={colsLine}
            autoFit
          >
            <Legend />
            <Axis name="month" />
            <Axis name="value" />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom
              type="line"
              position="month*value"
              size={2}
              color={'key'}
              shape={'hv'}
            />
          </Chart>
        </Card>
      </Col>
    </Row>
  )
}

export default LineChart