
// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// ** Third Party Components
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Utility-Service
import { getToken } from '../../../utility/AuthService'

import { Plus, Delete } from 'react-feather'
import {
    Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row,
    Col,
    Form,
    Input,
    Label,
    FormGroup,
    Toast,
    FormFeedback,
    Spinner
} from 'reactstrap'

import { setFreshList, selectFreshData, setCwppList, selectCwppList, } from '../../../redux/slices/cloudSlice'
import { statusChangeService, cwppDelete } from '../../../services/cwppService'

const RemoveWidgetPage = ({ itemData }) => {
    const dispatch = useDispatch()
    // const catList = useSelector(selectCategoryList)
    const token = getToken()
    const [isLoading, setLoading] = useState(false)
    const [canvasOpen, setCanvasOpen] = useState(false)
    const [canvasScroll, setCanvasScroll] = useState(false)
    const [canvasBackdrop, setCanvasBackdrop] = useState(true)
    const cwppList = useSelector(selectCwppList)

    const toggleCanvasScroll = () => {
        setCanvasScroll(true)
        setCanvasOpen(!canvasOpen)
    }

    const toggleCanvasBackdrop = () => {
        setCanvasBackdrop(false)
        setCanvasOpen(!canvasOpen)
    }

    const cancelledWidget = () => {
        toggleCanvasScroll()
        // setCanvasOpen(!canvasOpen)
    }
    
    const handleChangeToHide = async (e, item) => {
    const status_value = e?.target?.checked
    // console.log('PP', status_value, item?.id)
    if (item?.id === 1) {
        toast.success("You can't delete this widget")
    } else {
        const input = {
            id: item?.id,
            is_active: status_value
        }
        // statusChangeService
        const result = await cwppDelete({ id: item?.id, token}, input).catch((error) => {
            setLoading(false)
            // toast.success(error.response.data.message)
        });
        // console.log('result', result)
        if (result) {
            setLoading(false)
            toast.success('Widget removed successfully')
            dispatch(setFreshList(true))
            // toggleCanvasBackdrop()
    
        } else {
            setLoading(false)
            // toast.success(result?.data?.errorMessage)
        }
    }
    return false

    }

    return (
        <div>
            <div>
                <Delete className='cursor-pointer' size={15} onClick={toggleCanvasScroll} />
                <Offcanvas
                    scrollable={canvasScroll}
                    backdrop={canvasBackdrop}
                    direction='end'
                    className='addFormHeader'
                    isOpen={canvasOpen}
                    toggle={toggleCanvasScroll}
                >
                    <OffcanvasHeader className='addWidgetHeader' toggle={toggleCanvasScroll}>
                        Add Widget
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <>
                            <p>Personalise your dashboard by adding the following widget</p>
                            <Form>
                                <Row>
                                    {cwppList?.length > 0 ? cwppList.map((item, index) => (
                                        <Fragment>
                                            <Col md='12' sm='12' className='' key={item?.id}>
                                                <>
                                                   <div className="custom-checkbox">
                                                   <Input onChange={(e) => handleChangeToHide(e, item)} value={item?.is_active} type="checkbox" defaultChecked={item?.is_active} />
                                                   <Label >  &nbsp; &nbsp; {item?.name} </Label>
                                                   </div>
                                                </>
                                            </Col>
                                        </Fragment>
                                    )) : ''}

                                </Row>
                            </Form>
                        </>
                    </OffcanvasBody>
                </Offcanvas>
            </div>
        </div>
    )
}

export default RemoveWidgetPage
