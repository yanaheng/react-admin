import React from 'react';
import { Statistic, Row, Col, Card } from 'antd';
import {
  Chart,
  Axis,
  Geom,
  Tooltip,
  Legend,
  Point,
  Line,
  Area,
  Coordinate,
  G2,
  Coord,
  Label,
  View,
  Guide,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from './index.less';
import { dataLine, dataRadar, dataBar } from './data';
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

export default () => {
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
      {/* 雷达图 */}
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
      {/* 柱状图 */}
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
    </div>
  );
};
