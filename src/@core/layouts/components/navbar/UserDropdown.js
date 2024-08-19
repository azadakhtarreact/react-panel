// ** React Imports
import React, { Fragment, useState, forwardRef, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
// left drop

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Lock,
  Power
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap"

// ** Custom Components
import * as Icons from 'react-feather'
import Avatar from '@components/avatar'
import toast from 'react-hot-toast'
// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg"

// API-Services
import { logoutService, userGetProfile } from '../../../../services/authService'
import { removeUserSession, getToken } from '../../../../utility/AuthService'

// Redux-Settings
import {
  setProfileAgain,
  selectProfileAgain,
} from '../../../../redux/slices/auth.Slice'

const UserDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = getToken()
  const [formValue, setFromValue] = useState('');
  const dataFresh = useSelector(selectProfileAgain)
  const user = JSON.parse(localStorage.getItem("userData"))

  const handleProfileRoute = () => {
    navigate(`/admin/profile/update/${user?.id}`)
  }
  const handlePasswordRoute = () => {
    navigate(`/admin/password/update`)
  }
  const handleLogOut = () => {
    toast(() => (
      <div className='d-flex'>
        <div className='me-1'>
          <Avatar size='sm' color='success' icon={<Icons.Check size={12} />} />
        </div>
        <div className='d-flex flex-column'>
          <h6 className='toast-title'>Logout successfully</h6>
          {/* <span role='img' aria-label='toast-text'>
            {icon}
          </span> */}
        </div>
      </div>
    ))
    logoutService(navigate)
    removeUserSession()
    localStorage.clear()
    // navigate('/'); 
  }

  const getSingleData = async () => {
    const result = await userGetProfile({ token }).catch((error) => {
      // const expireToken = error.response.data.message
      // console.log('MyError', expireToken)
      // if (expireToken === 'Unauthorized or Token expired') {
      //   toast.success('Session Expired')
      //   logoutService(navigate)
      //   removeUserSession()
      //   localStorage.clear()
      // }
    });
    if (result?.data?.name) {
      setFromValue(result?.data)
      dispatch(setProfileAgain({ isRefresh: false }))
    }
  };

  // useEffect(() => {  Unauthorized or Token expired
  //   console.log('Before again call')
  //   if (dataFresh) {  // dataFresh mean true (its boolean)
  //     console.log('again call')
  //     getSingleData()
  //   }
  // }, [])

  useEffect(() => {
    getSingleData()
    // if (dataFresh) { 
    //   console.log('again call')
    //   getSingleData()
    // }
    const timeoutId = setTimeout(() => 3000)
    return function cleanup() {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold"> {formValue?.name ? formValue?.name : 'Admin'}</span>
          <span className="user-status">Admin</span>
        </div>
        {formValue.photo ? <Avatar
          img={formValue.photo}
          imgHeight="40"
          imgWidth="40"
          status="online"
        /> : <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />}
      </DropdownToggle>
      <DropdownMenu end>
       <DropdownItem onClick={handleProfileRoute}>
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
         {/* 
        <DropdownItem onClick={handlePasswordRoute}>
          <Lock size={14} className="me-75" />
          <span className="align-middle">Password Change</span>
        </DropdownItem> */}

        {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <Mail size={14} className="me-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <CheckSquare size={14} className="me-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <MessageSquare size={14} className="me-75" />
          <span className="align-middle">Chats</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem
          tag={Link}
          to="/pages/"
          onClick={(e) => e.preventDefault()}
        >
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <CreditCard size={14} className="me-75" />
          <span className="align-middle">Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <HelpCircle size={14} className="me-75" />
          <span className="align-middle">FAQ</span>
        </DropdownItem> */}
        <DropdownItem onClick={handleLogOut}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
