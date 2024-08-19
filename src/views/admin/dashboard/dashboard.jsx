// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Container, Col } from 'reactstrap'
import AddWidget from './addWdiget'
import CloudRisk from './cloud-risk-chart'
import CloudAccount from './cloud-account-chart'

// Utility-Service
import { getToken } from '../../../utility/AuthService'

import { setFreshList, setCategoryList, setWidgetList, selectWidgetList, selectCategoryList, selectFreshData } from '../../../redux/slices/cloudSlice'
import { widgetListService, widgetDelete } from '../../../services/widgetService'
const Dashboard = () => {
  const dispatch = useDispatch()
  const token = getToken()
  const [isLoading, setLoading] = useState(false)
  const widgetList = useSelector(selectCategoryList)

  const fetchData = async () => {
    const result = await widgetListService({ token });
    if (result) {
      setLoading(false)
      dispatch(setCategoryList(result?.data))
    } else {
      setLoading(false)
      if (result?.data?.data?.errorMessage === 'jwt malformed') {
        toast.success('Token has been expired')
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    setLoading(false)
    fetchData()
    const timeoutId = setTimeout(() => 3000)
    return function cleanup() {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      <Container>
        <Row className='mb-2'>

        {/* {widgetList?.length > 0 ? widgetList.map(item => ( )) : <p>No Widget</p>} */}
        
          <Col md='6'>
            <h3>CSPM Executive Dashboard</h3>
          </Col>
          <Col md='6' >
            <div className="float-end">
              <AddWidget />
            </div>

          </Col>
        </Row>
        <Row>
          <Col xl='4' md='6' sm=''>
            <Card>
              <CardHeader className='p-1'>
                <CardTitle><strong><h6 className='dark mb-0'>Cloud Accounts</h6></strong></CardTitle>
              </CardHeader>
              <CardBody>
                <CloudAccount />
              </CardBody>
            </Card>
          </Col>
          <Col xl='4' md='6' sm=''>
            <Card>
              <CardHeader className='p-1'>
                <CardTitle><strong><h6 className='dark mb-0'>Cloud Risk Management</h6></strong></CardTitle>
              </CardHeader>
              <CardBody>
                <CloudRisk />
              </CardBody>
            </Card>
          </Col>
          <Col xl='4' md='6' sm=''>
            <Card>
              <CardHeader>
                <CardTitle>Kick start your admin panel 🚀</CardTitle>
              </CardHeader>
              <CardBody>
                <h6>Welcome to Dashboard</h6>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
