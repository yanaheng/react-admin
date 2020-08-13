import React, { Fragment } from 'react';
import { Card, Row, Col } from 'antd';
import Taichi from './components/Taichi';
import CubicImages from './components/CubicImages';
import Earth from './components/Earth';

export default () => {
  return (
    <Fragment>
      <Row gutter={32} style={{ marginBottom: 10 }}>
        <Col span={12}>
          <Taichi />
        </Col>
        <Col span={12}>
          <CubicImages />
        </Col>
      </Row>
      <Row gutter={32} style={{ marginBottom: 10 }}>
        <Col span={24}>
          <Earth />
        </Col>
      </Row>
    </Fragment>
  );
};
