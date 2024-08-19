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
import { userUpdateProfile, userGetProfile } from '../../../services/authService'

const UpdatePage = () => {
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const { id } = useParams()
    const [myFile, setFile] = useState({});
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate()
    const token = getToken()
    const [formValue, setFromValue] = useState('');

    const formValidation = yup.object().shape({
        name: yup.string().required('Please enter name'),
        email: yup.string().email().required('Please enter email'),
        phoneNumber: yup.string().min(10).required('Please enter phone number'),
    })

    // ** Hooks
    const {
        reset,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formValidation)
    })
    if (formValue.name) {
        setValue('name', formValue.name)
        setValue('email', formValue.email)
        setValue('phoneNumber', formValue.phoneNumber)
    }

    const handleUpdateData = async (data, e) => {
        setLoading(true)
        // const formData = new FormData()
        // if (myFile.name) {
        //     formData.append('image', myFile)
        // }

        const input = {
            name: data?.name,
            email: data?.email,
            phoneNumber: data?.phoneNumber,
            id: formValue?.id
        }
        const result = await userUpdateProfile({ token }, input)
        if (result?.data?.name) {
            setLoading(false)
            reset()
            dispatch(setProfileAgain({ isRefresh: true }))
            toast.success('Profile updated successfully')
            navigate('/');
        } else {
            setLoading(false)
            // toast.success("Profile updated successfully" )
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

    // const selectImage = async (event) => {
    //     const myData = event.target.files[0]
    //     const fileName = event.target.files[0].name;
    //     console.log(myData)
    //     setFile(myData)
    //     setFileName(fileName)
    // }

    const renderFilePreview = () => {
        // myFile.type.startsWith('image')
        if (myFile.name) {
            return <img className='rounded' alt={myFile.name} src={URL.createObjectURL(myFile)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = () => {
        // const uploadedFiles = myFile
        // const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFile(null)
    }
    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const getSingleData = async () => {
        const result = await userGetProfile({ id, token });
        if (result?.data?.name) {
            setLoading(false);
            setFromValue(result?.data)
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true)
        getSingleData()
        const timeoutId = setTimeout(() => 3000)
        return function cleanup() {
            clearTimeout(timeoutId)
        }
    }, [])

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
                        <CardTitle tag='h4'>Update Profile</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md='6' sm='12' className='mb-1'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='name'>
                                            Name
                                        </Label>
                                        <Controller
                                            id='name'
                                            name='name'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <Input className="" {...field} placeholder='Name' invalid={errors.name && true} />}
                                        />
                                        {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                                    </div>
                                </Col>
                                <Col md='6' sm='12' className='mb-1'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='email'>
                                            Email
                                        </Label>
                                        <Controller
                                            id='email'
                                            name='email'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <Input className="" {...field} placeholder='Email' invalid={errors.email && true} />}
                                        />
                                        {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                                    </div>
                                </Col>
                                <Col md='6' sm='12' className='mb-1'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='phoneNumber'>
                                            Phone Number
                                        </Label>
                                        <Controller
                                            id='phoneNumber'
                                            name='phoneNumber'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <Input className="" {...field} placeholder='Phone Number' invalid={errors.phoneNumber && true} />}
                                        />
                                        {errors.phoneNumber && <FormFeedback>{errors.phoneNumber.message}</FormFeedback>}
                                    </div>
                                </Col>
                                {/* <Col md='6' sm='12' className='mb-1'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='image'>
                                            Image
                                        </Label>
                                        <Controller
                                            id='image'
                                            name='image'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <Input label="Select Photo" type="file" name="image" accept="image/png, image/jpg, image/jpeg" {...field} placeholder='Upload Image' invalid={errors.image && true } onChange={selectImage} /> }
                                        />
                                        {errors.image && <FormFeedback>{errors.image.message}</FormFeedback>}
                                        <div style={{ marginTop: 0 }}>
                                            <Input label="Select Photo" type="file" name="file" accept="image/png, image/jpg, image/jpeg" onChange={selectImage} />
                                        </div>
                                    </div>
                                </Col>
                                <Col md='12' sm='12' className='mb-4'>
                                    <h4>Selected Image</h4>
                                    {myFile.name ? (
                                        <ListGroup className='my-2'>
                                            <ListGroupItem key={`${myFile.name}`} className='d-flex align-items-center justify-content-between'>
                                                <div className='file-details d-flex align-items-center'>
                                                    <div className='file-preview me-1'>{renderFilePreview()}</div>
                                                    <div>
                                                        <p className='file-name mb-0'>{myFile.name}</p>
                                                        <p className='file-size mb-0'>{renderFileSize(myFile.size)}</p>
                                                    </div>
                                                </div>
                                                <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile()}>
                                                    <X size={14} />
                                                </Button>
                                            </ListGroupItem>
                                        </ListGroup>
                                    ) : (
                                        <div className="logoImage">
                                            <img width="100" src={`${formValue.photo}`} />
                                        </div>
                                    )}

                                </Col> */}
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
