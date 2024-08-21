// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {Row, Col} from 'reactstrap'

// Utility-Service
import { getToken } from '../../../utility/AuthService'
import CSPM from '../components/cspm'
import CWPP from '../components/cwpp'
import Registry from '../components/registry'
import AddWidget from '../components/AddCspmWidget'


const Dashboard = () => {
  const dispatch = useDispatch()
  const token = getToken()

  return (
    <>
    <Row className='mb-2'>
        <Col>
          <h5>CNAPP Dashboard</h5>
        </Col>
        <Col>
          <div className="float-end">
            <AddWidget />
          </div>
        </Col>
      </Row>

      <Row>
      <CSPM />
      </Row>
      <Row>
        <CWPP />
      </Row>
      <Row>
        <Registry />
      </Row>
    </>
  )
}

export default Dashboard
