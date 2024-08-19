// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// ** Third Party Components
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { X, FileText } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Custom Components
import { getToken } from '../../../utility/AuthService'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Label,
    Button,
    CardBody,
    CardTitle,
    CardHeader,
    FormFeedback,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Toast,
    Spinner,
    UncontrolledButtonDropdown,
    ListGroupItem,
    ListGroup
} from 'reactstrap'

// Redux-Settings
import {
    setProfileAgain,
    selectProfileAgain,
} from '../../../redux/slices/auth.Slice'

// API-Service
import { userUpdatePassword, userGetProfile } from '../../../services/authService'

const UpdatePage = () => {
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const token = getToken()
    const [formValue, setFromValue] = useState('');

    const formValidation = yup.object().shape({
        oldPassword: yup.string().required('Please enter password'),
        password: yup.string().min(6).required('Please enter password'),
        password_confirmation: yup.string().min(6).required('Please enter confirm password').oneOf([yup.ref(`password`), null], 'Password not matched'),
    })

    // ** Hooks
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(formValidation) })

    const handleUpdateData = async (data, e) => {
        console.log('input', data)
        setLoading(true)
        const formData = new FormData()
        formData.append('old_password', data?.oldPassword)
        formData.append('password', data?.password)
        formData.append('password_confirmation', data?.password_confirmation)
        // formData.append('_method', 'PUT')

        console.log(formData)
        const result = await userUpdatePassword({ token }, formData).catch((error) => {
            setLoading(false)
            console.log('MyError', error.response.data.message)
            toast.success(error.response.data.message)
        });
        if (result?.data?.status) {
            setLoading(false)
            reset()
            dispatch(setProfileAgain({ isRefresh: true }))
            toast.success('Password updated successfully')
            navigate('/admin/dashboard');
        } else {
            setLoading(false)
            toast.success(result?.data?.message)
        }
        return false
    }

    const onSubmit = data => {
        if (Object.values(data).every(field => field.length > 0)) {
            handleUpdateData(data)
        } else {
            // console.log('validation Error')
        }
    }

    const handleBack = () => {
        history.back()
    }

    if (isLoading) {
        return (
            <>
                <Fragment>
                    <Card>
                        <div className='parent'>
                            <div className='myHeight'>
                                <Spinner color='success' />
                            </div>
                        </div>
                    </Card>
                </Fragment>
            </>
        )
    }

    return (
        <>
            <Fragment>
                <Card>
                    <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start'>
                        <CardTitle tag='h4'>Update Password</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md='6' sm='12' className='mb-1'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='oldPassword'>
                                            Old Password
                                        </Label>
                                        <Controller
                                            id='oldPassword'
                                            name='oldPassword'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <InputPasswordToggle className="" {...field} placeholder='Old Password' invalid={errors.oldPassword && true} />}
                                        />
                                        {errors.oldPassword && <FormFeedback>{errors.oldPassword.message}</FormFeedback>}
                                    </div>
                                </Col>

                                <Col md='6' sm='12' className='mb-1'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='password'>
                                            Password
                                        </Label>
                                        <Controller
                                            id='password'
                                            name='password'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <InputPasswordToggle className="" {...field} placeholder='Password' invalid={errors.password && true} />}
                                        />
                                        {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                                    </div>
                                </Col>
                                <Col md='6' sm='12' className='mb-1'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='ConfirmPassword'>
                                            Confirm Password
                                        </Label>
                                        <Controller
                                            id='ConfirmPassword'
                                            name='password_confirmation'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <InputPasswordToggle id='confirm-password' className="" {...field} placeholder='Confirm Password' invalid={errors.password_confirmation && true} />}
                                        />
                                        {errors.password_confirmation && <FormFeedback>{errors.password_confirmation.message}</FormFeedback>}
                                    </div>
                                </Col>

                                <Col sm='12'>
                                    <div className='d-flex'>
                                        <Button className='me-1' color='dark' onClick={handleBack}>
                                            Cancel
                                        </Button>
                                        <Button className='me-1' color='success' type='submit'>
                                            {isLoading ? <Spinner color='light' size='sm' /> : 'Save'}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Fragment>
        </>

    )
}
export default UpdatePage
