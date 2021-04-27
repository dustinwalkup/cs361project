import React from 'react'
import Map from '../components/Map'
import { Col, Row } from 'react-bootstrap'

const HomeScreen = () => {
  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>Button</h3>
        </Col>
        <Col sm={6}>
          <Map />
        </Col>
      </Row>
    </>
  )
}

export default HomeScreen
