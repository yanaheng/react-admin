import React from 'react';
import { Row, Col, Card } from 'antd';
import {
  Chart,
  Geom,
  Tooltip,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from '../index.less';
import { dataBar } from '../data';
const ds = new DataSet();

// 柱状图数据
const dvBar = ds.createView().source(dataBar);
dvBar
  .transform({
    type: 'fold',
    fields: [
      'level_s_amount',
      'level_a_amount',
      'level_b_amount',
      'level_c_amount',
      'level_s_gaap',
      'level_a_gaap',
      'level_b_gaap',
      'level_c_gaap',
    ],
    //   fields: ['time'],
    // 展开字段集
    key: 'key',
    // key字段
    value: 'value', // value字段
  })
  .transform({
    type: 'map',
    callback: (obj) => {
      if (obj.key.indexOf('amount') !== -1) {
        obj.type = '合同金额';
      } else if (obj.key.indexOf('gaap') !== -1) {
        obj.type = 'GAAP收入';
      }
      obj.level = obj.key.split('_')[1].toUpperCase() + '级';
      return obj;
    },
  });

const BarChart: React.FC = () => {
  return (
    <Row>
      <Col span={24}>
        <Card className={styles.cardContainer}>
          <Chart height={400} data={dvBar.rows} autoFit>
            <Tooltip shared />
            <Geom
              type="interval"
              position="time*value"
              color="level"
              tooltip={[
                'time*value*level*type',
                (time, value, level, type) => {
                  // array
                  return {
                    name: level,
                    value: type + ':' + value,
                  };
                },
              ]}
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
              adjust={[
                {
                  type: 'dodge',
                  dodgeBy: 'type', // 按照 type 字段进行分组
                  marginRatio: 0, // 分组中各个柱子之间不留空隙
                },
                {
                  type: 'stack',
                },
                {
                  type: 'stack',
                  dodgeBy: 'level',
                },
              ]}
            ></Geom>
          </Chart>
        </Card>
      </Col>
    </Row>
  )
}

export default BarChart