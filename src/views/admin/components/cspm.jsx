// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    Card, CardHeader, CardBody, CardTitle, Label, Input, Row, Col, Button, Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import { Delete } from 'react-feather'
import toast from 'react-hot-toast'

import AddWidget from './AddCspmWidget'
import CloudRisk from '../dashboard/cloud-risk-chart'
import CloudAccount from '../dashboard/cloud-account-chart'
import NoGraph from '../../../assets/images/dashboard/no-graph.png'
import RemoveWidgetPage from './removeCspmWidget'

// Utility-Service
import { getToken } from '../../../utility/AuthService'

import { setFreshList, selectFreshData, setCspmList, selectCspmList, } from '../../../redux/slices/cloudSlice'
import { cspmListService, cspmDelete, cspmSearchListService } from '../../../services/cspmService'
const cspmPage = () => {
    const dispatch = useDispatch()
    const token = getToken()
    const [isLoading, setLoading] = useState(false)
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState({})
    const cspmList = useSelector(selectCspmList)
    const checkFreshData = useSelector(selectFreshData)
    // console.log('azad', cspmList)

    const fetchData = async () => {
        const result = await cspmListService({ token });
        if (result) {
            setLoading(false)
            dispatch(setCspmList(result?.data))
            dispatch(setFreshList(false))
        } else {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (checkFreshData === true) {
            fetchData()
        }

    }, [checkFreshData])

    useEffect(() => {
        setLoading(false)
        fetchData()
        const timeoutId = setTimeout(() => 3000)
        return function cleanup() {
            clearTimeout(timeoutId)
        }
    }, [])

    const displayDataWithCheck = (item) => {
        if (item?.type === 'account') {
            return (<CloudAccount />)
        } else if (item?.type === 'risk') {
            return (<CloudRisk />)
        } else {
            return (
                <>
                    <div className="area-block" style={{}}>
                        {item?.text ? <>
                            <p className='mb-0'>
                                <img height='40' src={NoGraph} alt="" />
                            </p>
                            <p><strong>{item?.text}</strong></p>
                        </> : <div className="div">
                            <p className='mb-0'>
                                <img height='40' src={NoGraph} alt="" />
                            </p>
                            <p className='mb-0'>
                                <span><strong>No Graph Data Available!</strong></span>
                            </p>
                        </div>}
                    </div>
                </>
            )
        }
    }

    const handleDeleteModal = (item) => {
        <RemoveWidgetPage cspmList={cspmList} itemData={item} />
        // setDeleteId(item?.id)
        // setIsDeleteModal(true)
    }

    const handleCancel = () => {
        setIsDeleteModal(false)
        setDeleteId(0)
    }


    const handleDeleteWidget = async () => {
        if (deleteId === 1 || deleteId === 2) {
            toast.success("You can't delete this widget")
            setIsDeleteModal(false)
        } else {
            const result = await cspmDelete({
                id: deleteId,
                token
            })
            if (result?.data) {
                toast.success("Widget Deleted Successfully")
                dispatch(setFreshList(true))
                setIsDeleteModal(false)
                setDeleteId(0)
                fetchData()
            }
        }
    }

    const searchData = async (searchKey) => {
        // console.log('key', searchKey)
        const result = await cspmSearchListService({ searchValue: searchKey, token });
        if (result?.data) {
            setLoading(false)
            dispatch(setCspmList(result?.data))
        } else {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        searchData(e.target.value);
    }

    return (
        <>
            <Row>
                <Row className=''>
                    <Col>
                        <p className='text-dark'><b>CSPM Executive Dashboard</b></p>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-end'>
                        <div className="float-end">
                            {/* <Label className='me-1' for='search-input'>
                                Search
                            </Label> */}
                            <Input
                                className='dataTable-filter mb-50'
                                type='text'
                                placeholder='Search widget'
                                bsSize='sm'
                                id='search-input'
                                onChange={(e) => handleSearch(e)}
                            />
                        </div>

                    </Col>
                </Row>

                {cspmList?.length > 0 ? cspmList.map((item, index) => {
                    if (item?.is_active) {
                        return (
                            <>
                                <Col xl='4' lg='6' md='6' sm='6' key={item?.id} >
                                    <Card>
                                        <CardHeader className='p-1'>
                                            <CardTitle style={{ width: '100%' }}>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="div">
                                                        <strong><h6 className='dark mb-0 myCapitalized'>{item?.name ? item?.name : 'NA'}</h6></strong>
                                                    </div>
                                                    <div className="div">
                                                        {/* onClick={() => handleDeleteWidget(item)} */}
                                                        <RemoveWidgetPage itemData={item} />
                                                    </div>
                                                </div>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="my-card-same-height">
                                                {displayDataWithCheck(item)}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </>
                        )
                    }
                }) : <p>No Widget</p>}
                <Col xl='4' lg='6' md='6' sm='6'>
                    <Card>
                        <CardBody>
                            <div className="my-card-same-height">
                                <div className="area-block" style={{}}>
                                    <div className="div">
                                        <AddWidget />
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Modal isOpen={isDeleteModal} toggle={() => setIsDeleteModal(!isDeleteModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setIsDeleteModal(!isDeleteModal)}>Delete Widget</ModalHeader>
                <ModalBody>
                    <h5>Are you sure, you want to delete this?</h5>
                </ModalBody>
                <ModalFooter>
                    <Button className='ms-2' color='primary' onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button color='danger' onClick={() => handleDeleteWidget(!isDeleteModal)}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default cspmPage
