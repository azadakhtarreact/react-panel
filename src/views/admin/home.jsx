// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Container, Col, Button, Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import { Delete } from 'react-feather'

import AddWidget from '././dashboard/addWdiget'
import CloudRisk from '././dashboard/cloud-risk-chart'

const HomePage = () => {

    return (
        <>
            <Container>
                {/* <Row className='mb-2'>
                    <Col md='6'>
                        <h3>CSPM Executive Dashboard</h3>
                    </Col>
                    <Col md='6' >
                        <div className="float-end">
                            <AddWidget />
                        </div>

                    </Col>
                </Row> */}

                <Row>
                    <Col md='6' sm='12'>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <strong><h6 className='dark mb-0'>Cloud Risk Management</h6></strong>
                                    {/* <div className="d-flex align-items-center justify-content-between">
                                        <div className="div">
                                            <strong><h6 className='dark mb-0'>Cloud Risk Management</h6></strong>
                                        </div>
                                        <div className="div float-end">
                                            <Delete className='cursor-pointer' size={15} onClick={() => handleDeleteModal(item)} />
                                        </div>
                                    </div> */}
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CloudRisk />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HomePage
