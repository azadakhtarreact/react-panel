import React, { useState, useEffect, Fragment } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, Routes, Route, useNavigate, Redirect } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Custom Components
import * as Icons from 'react-feather'
import Avatar from '@components/avatar'
import toast from 'react-hot-toast'

import { Row, Col, CardTitle, CardText, Form, Label, Input, Button, FormFeedback, Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import { useDispatch } from "react-redux"
import PropTypes from 'prop-types'
import { Check } from 'react-feather'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Utility-Service
import { getToken, setUserSession, removeUserSession } from '../../../utility/AuthService'

// Redux and Services Setting
import { loginService } from '../../../services/authService'
import { setLoginDetails } from '../../../redux/slices/auth.Slice'

const LoginModule = () => {
    const { skin } = useSkin()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = getToken()
    const [isLoading, setLoading] = useState(false)
    const getData = {
        token: 'tGzv3JOkF0XG5Qx2TlKWIA',
        user: {
            name: 'Azad Akhtar',
            email: 'azadakhtar@gmail.co',
            phoneNumber: '+918340272471',
            id: '1',
            role: 'admin',
            type: 'admin',
        }

    }

    useEffect(() => {
        if (token) {
            // toast.success('Event Added')
            navigate('/')
        } else {
            // removeUserSession()
            // localStorage.clear()
        }
    })

    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default

    const LoginValidation = yup.object().shape({
        email: yup.string().email().required('Please enter email'),
        password: yup.string().required('Please enter password')
    })

    // ** Hooks
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(LoginValidation) })

    const handleLogin = async (data, e) => {
        // e.preventDefault();
        setLoading(true)
        const input = {
            email: data?.email,
            password: data?.password
        }
        const result = await loginService(input).catch((error) => {
            setLoading(false)
        });
        console.log('login', result?.data)

        if (result?.data?.email === 'azadakhtar@gmail.com' && result?.data?.password === 'azad@12345') {
            console.log('kkk', result?.data)
            if (result?.data) {
                reset()
                setLoading(false)
                // const getData = result?.data
                if (getData?.token && getData?.user?.type === 'admin') {
                    setLoading(false)
                    toast(() => (
                        <div className='d-flex'>
                            <div className='me-1'>
                                <Avatar size='sm' color='success' icon={<Icons.Check size={12} />} />
                            </div>
                            <div className='d-flex flex-column'>
                                <h6 className='toast-title'>Login successfully</h6>
                            </div>
                        </div>
                    ))
                    setUserSession(getData?.token, getData?.user, getData?.token)
                    dispatch(setLoginDetails(getData?.user))
                    const initiate = [{ action: "manage", subject: "all" }]
                    localStorage.setItem('userDataAuth', JSON.stringify({ ability: initiate }))
                    localStorage.setItem('auth', JSON.stringify(getData?.token))
                    localStorage.setItem('userData', JSON.stringify(getData?.user))
                    navigate('/')

                } else {
                    toast.success(result.data.errorMessage)
                    setLoading(false)
                    // ErrorToast(result)
                }
            } else {
                toast.success(result.data.errorMessage)
                setLoading(false)
            }
        } else {
            toast(() => (
                <div className='d-flex'>
                    <div className='me-1'>
                        <Avatar size='sm' color='danger' icon={<Icons.Crosshair size={12} />} />
                    </div>
                    <div className='d-flex flex-column'>
                        <h6 className='toast-title'>Invalid email or password</h6>
                    </div>
                </div>
            ))
            setLoading(false)
        }
        return false
    }
    const onSubmit = data => {
        if (Object.values(data).every(field => field.length > 0)) {
            handleLogin(data)
        }
    }

    return (
        <div className='auth-wrapper auth-cover'>
            <Row className='auth-inner m-0'>
                <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                    {/* <svg viewBox='0 0 139 95' version='1.1' height='28'>
                        <defs>
                            <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                                <stop stopColor='#000000' offset='0%'></stop>
                                <stop stopColor='#FFFFFF' offset='100%'></stop>
                            </linearGradient>
                            <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                                <stop stopColor='#FFFFFF' offset='100%'></stop>
                            </linearGradient>
                        </defs>
                        <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                            <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                                <g id='Group' transform='translate(400.000000, 178.000000)'>
                                    <path
                                        d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                                        id='Path'
                                        className='text-primary'
                                        style={{ fill: 'currentColor' }}
                                    ></path>
                                    <path
                                        d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                                        id='Path'
                                        fill='url(#linearGradient-1)'
                                        opacity='0.2'
                                    ></path>
                                    <polygon
                                        id='Path-2'
                                        fill='#000000'
                                        opacity='0.049999997'
                                        points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                                    ></polygon>
                                    <polygon
                                        id='Path-2'
                                        fill='#000000'
                                        opacity='0.099999994'
                                        points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                                    ></polygon>
                                    <polygon
                                        id='Path-3'
                                        fill='url(#linearGradient-2)'
                                        opacity='0.099999994'
                                        points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                                    ></polygon>
                                </g>
                            </g>
                        </g>
                    </svg> */}
                    <h2 className='brand-text text-primary ms-1'>CNAPP</h2>
                </Link>
                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <img className='img-fluid' src={source} alt='Login Cover' />
                    </div>
                </Col>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                        <CardTitle tag='h2' className='fw-bold mb-1'>
                            Welcome to CNAPP Dashboard
                        </CardTitle>
                        {/* <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText> */}
                        <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-1'>
                                <Label className='form-label' for='email'>
                                    Email
                                </Label>
                                <Controller
                                    id='email'
                                    name='email'
                                    defaultValue='azadakhtar@gmail.com'
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} type='email' placeholder='bruce.wayne@email.com' invalid={errors.email && true} />
                                    )}
                                />
                                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                            </div>
                            <div className='mb-1'>
                                <Label className='form-label' for='password'>
                                    Password
                                </Label>
                                <Controller
                                    id='password'
                                    name='password'
                                    defaultValue='azad@12345'
                                    control={control}
                                    render={({ field }) => (
                                        <InputPasswordToggle {...field} placeholder='Password' invalid={errors.password && true} />
                                    )}
                                />
                                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                            </div>
                            {/* <div className='mb-1'>
                                <Label className='form-label' for='login-email'>
                                    Email
                                </Label>
                                <Input type='email'
                                    id='login-email'
                                    placeholder='john@example.com'
                                    autoFocus
                                    {...form.getInputProps('email',
                                        { required: true })} />
                            </div>
                            <div className='mb-1'>
                                <div className='d-flex justify-content-between'>
                                    <Label className='form-label' for='login-password'>
                                        Password
                                    </Label>
                                    <Link to='/pages/forgot-password-cover'>
                                        <small>Forgot Password?</small>
                                    </Link>
                                </div>
                                <InputPasswordToggle
                                    className='input-group-merge'
                                    id='login-password'
                                    autoComplete="on"
                                    required
                                    {...form.getInputProps('password', {
                                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                                    })}
                                />
                            </div> */}
                            <div className='form-check mb-1'>
                                <Input type='checkbox' id='remember-me' />
                                <Label className='form-check-label' for='remember-me'>
                                    Remember Me
                                </Label>
                            </div>
                            <Button color='primary' type="submit">
                                {isLoading ? <Spinner color='light' size='sm' /> : 'Login'}
                            </Button>
                        </Form>
                        {/* <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/pages/register-cover'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div> */}
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default LoginModule
