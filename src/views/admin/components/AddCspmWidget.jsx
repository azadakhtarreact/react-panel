
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

import { Plus } from 'react-feather'
import {
    Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row,
    Col,
    Form,
    Input,
    Label,
    Toast,
    FormFeedback,
    Spinner
} from 'reactstrap'

import { setFreshList } from '../../../redux/slices/cloudSlice'
import { addCspmService } from '../../../services/cspmService'

const AddWidgetPage = () => {
    const dispatch = useDispatch()
    // const catList = useSelector(selectCategoryList)
    const token = getToken()
    const [isLoading, setLoading] = useState(false)
    const [canvasOpen, setCanvasOpen] = useState(false)
    const [canvasScroll, setCanvasScroll] = useState(false)
    const [canvasBackdrop, setCanvasBackdrop] = useState(true)

    const formValidation = yup.object().shape({
        widgetName: yup.string().required('Please enter widget name'),
        widgetText: yup.string().required('Please enter widget text'),
        // widgetCategory: yup.string().required('Please enter widget category'),
    })

    // ** Hooks
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm(
        { mode: 'onChange', resolver: yupResolver(formValidation) },
        { defaultValues: { widgetName: '', widgetText: ''} },
    )

    const toggleCanvasScroll = () => {
        setCanvasScroll(true)
        setCanvasOpen(!canvasOpen)
        reset()
    }

    const toggleCanvasBackdrop = () => {
        setCanvasBackdrop(false)
        setCanvasOpen(!canvasOpen)
    }

    const cancelledWidget = () => {
        toggleCanvasScroll()
        // setCanvasOpen(!canvasOpen)
        reset()
    }

    const handleCreateData = async (data, e) => {
        setLoading(true)
        const input = {
            name: data?.widgetName,
            text: data?.widgetText,
            is_active: true
            // category: data?.widgetCategory,
        }
        const result = await addCspmService({ token }, input).catch((error) => {
            setLoading(false)
            toast.success(error.response.data.message)
        });
        // console.log('result', result)

        if (result) {
            setLoading(false)
            reset({ widgetName: '', widgetText: '' })
            toast.success('Widget added successfully')
            dispatch(setFreshList(true))
            toggleCanvasBackdrop()

        } else {
            setLoading(false)
            // toast.success(result?.data?.errorMessage)
        }
        return false

    }

    const onSubmit = data => {
        if (Object.values(data).every(field => field.length > 0)) {
            handleCreateData(data)
        } else {
            console.log('error')
        }
    }

    return (
        <div>
            <div>
                <button className='custom-add-button' onClick={toggleCanvasScroll}>
                <Plus size={15} /> Add Widget
                </button>

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
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md='12' sm='12' className=''>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='name'>
                                                Widget Name
                                            </Label>
                                            <Controller
                                                id='name'
                                                name='widgetName'
                                                defaultValue=''
                                                control={control}
                                                render={({ field }) => <Input autoComplete='off' className="myCapitalized" {...field} placeholder='Widget Name' invalid={errors.widgetName && true} />}
                                            />
                                            {errors.widgetName && <FormFeedback>{errors.widgetName.message}</FormFeedback>}
                                        </div>
                                    </Col>

                                    <Col md='12' sm='12' className=''>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='name'>
                                                Widget Text
                                            </Label>
                                            <Controller
                                                id='name'
                                                name='widgetText'
                                                defaultValue=''
                                                control={control}
                                                render={({ field }) => <Input autoComplete='off' className="myCapitalized" {...field} placeholder='Widget Text' invalid={errors.widgetText && true} />}
                                            />
                                            {errors.widgetText && <FormFeedback>{errors.widgetText.message}</FormFeedback>}
                                        </div>
                                    </Col>
                                    {/* <Col md='12' sm='12' className=''>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='name'>
                                                Widget Category
                                            </Label>
                                            <Controller
                                                id='name'
                                                name='widgetCategory'
                                                defaultValue=''
                                                control={control}
                                                render={({ field }) => <Input autoComplete='off' className="myCapitalized" {...field} placeholder='Widget Category' invalid={errors.widgetCategory && true} />}
                                            />
                                            {errors.widgetCategory && <FormFeedback>{errors.widgetCategory.message}</FormFeedback>}
                                        </div>
                                    </Col> */}
                                </Row>

                                <div className="" style={{ height: '100vh' }}>
                                    <Row>

                                        <Col xs={12} className='text-right pt-50 pos'>
                                            <Button
                                                color='secondary'
                                                className='me-1'
                                                onClick={()=> cancelledWidget()}
                                            // onClick={() => {
                                            //     setShow(!show)
                                            //     reset()
                                            // }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type='submit' color='primary'>
                                                {isLoading ? <Spinner color='light' size='sm' /> : 'Confirm'}
                                            </Button>

                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </>
                    </OffcanvasBody>
                </Offcanvas>
            </div>
        </div>
    )
}

export default AddWidgetPage
