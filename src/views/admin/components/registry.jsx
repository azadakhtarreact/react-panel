// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    Card, CardHeader, CardBody, CardTitle, Progress, Row, Col, Button, Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import { Delete } from 'react-feather'
import toast from 'react-hot-toast'

import AddWidget from './AddRegistryWidget'
import ImageRisk from '../dashboard/image-risk'
import CloudRisk from '../dashboard/cloud-risk-chart'
import CloudAccount from '../dashboard/cloud-account-chart'
import NoGraph from '../../../assets/images/dashboard/no-graph.png'
// import RemoveWidgetPage from './removeRegistryWidget'

// Utility-Service
import { getToken } from '../../../utility/AuthService'

import { setFreshList, selectFreshData, setRegistryList, selectRegistryList, } from '../../../redux/slices/cloudSlice'
import { registryListService, registryDelete } from '../../../services/registryService'
const RegistryPage = () => {
    const dispatch = useDispatch()
    const token = getToken()
    const [isLoading, setLoading] = useState(false)
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState({})
    const registryList = useSelector(selectRegistryList)
    const checkFreshData = useSelector(selectFreshData)
    // console.log('azad', registryList)

    const fetchData = async () => {
        const result = await registryListService({ token });
        if (result) {
            setLoading(false)
            dispatch(setRegistryList(result?.data))
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

    // const displayDataWithCheck = (item) => {
    //     if (item?.id) {
    //         return <ImageRisk itemData={item} />
    //     } else if (item?.type === 'risk') {
    //         return (<CloudRisk />)
    //     } else {
    //         return (
    //             <>
    //                 <div className="area-block" style={{}}>
    //                     {item?.text ? <>
    //                         <p className='mb-0'>
    //                             <img height='40' src={NoGraph} alt="" />
    //                         </p>
    //                         <p><strong>{item?.text}</strong></p>
    //                     </> : <div className="div">
    //                         <p className='mb-0'>
    //                             <img height='40' src={NoGraph} alt="" />
    //                         </p>
    //                         <p className='mb-0'>
    //                             <span><strong>No Graph Data Available!</strong></span>
    //                         </p>
    //                     </div>}
    //                 </div>
    //             </>
    //         )
    //     }
    // }

    const handleDeleteModal = (item) => {
        // <RemoveWidgetPage registryList={registryList} itemData={item} />
        setDeleteId(item?.id)
        setIsDeleteModal(true)
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
            const result = await registryDelete({
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

    return (
        <>
            <Row>
                <p className='text-dark'><b>Registry Scan</b></p>
                {registryList?.length > 0 ? registryList.map((item, index) => {
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
                                                        {/* <RemoveWidgetPage itemData={item} /> */}
                                                        <Delete className='cursor-pointer' size={15} onClick={() => handleDeleteModal(item)} />
                                                    </div>
                                                </div>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="my-card-same-height">
                                                <p className='text-dark'><span><b>{item?.issue_count}</b></span> Total Vulnerabilities </p>
                                                <Progress
                                                    className="my-2"
                                                    multi
                                                >
                                                    <Progress
                                                        bar
                                                        className="critical"
                                                        value={item?.critical}
                                                    >
                                                        
                                                    </Progress>
                                                    <Progress
                                                        bar
                                                        className="high"
                                                        value={item?.high}
                                                    >
                                                        
                                                    </Progress>
                                                    <Progress
                                                        bar
                                                        className="warning"
                                                        value={item?.warning}
                                                    >
                                                        
                                                    </Progress>
                                                    <Progress
                                                        bar
                                                        className="normal"
                                                        value={item?.normal}
                                                    >
                                                        
                                                    </Progress>
                                                    <Progress
                                                        bar
                                                        className="save"
                                                        value={item?.save}
                                                    >
                                                    
                                                    </Progress>
                                                </Progress>
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

export default RegistryPage
