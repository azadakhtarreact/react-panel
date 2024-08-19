
import axios from "axios"

// Auth-Services
import { removeUserSession } from "../utility/AuthService"

const baseUrl = process.env.REACT_APP_API_BASEURL

// const getToken = localStorage.getItem('auth')
// const myToken = getToken?.token

export const loginService = (input) => axios.post(`${baseUrl}/login`,
input,
{
    headers: {
        Accept: 'application/json',
        // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
})

export const logoutService = (navigate) => {
    removeUserSession()
    navigate('/login')
}

export const logoutServiceAdmin = ({ token }) => axios.get(`${baseUrl}/logout`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    })

export const userGetProfile = ({ token }) => axios.get(`${baseUrl}/profile`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    })

export const userUpdateProfile = ({ token }, input) => axios.post(`${baseUrl}/profile`, input,

    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    })

export const userGetCurrentPassword = ({ token }) => axios.get(`${baseUrl}/admin/auth/profile`, {},
    {

        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }

)

export const userUpdatePassword = ({ token }, formData) => axios.post(`${baseUrl}/admin/auth/change-password`, formData,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'multipart/form-data',
        }
    }
)

export const userListService = ({ countPerPage, page, token }) => axios.get(`${baseUrl}/admin/customer/list?paginate=1&page=${page}&perPage=${countPerPage}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})

export const userSearchService = ({ search, countPerPage, token }) => axios.get(`${baseUrl}/admin/customer/list?keyword=${search}&paginate=1&&perPage=${countPerPage}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})

export const userStatusUpdateService = ({ id, token }) => axios.post(
    `${baseUrl}/admin/customer/status/${id}`,
    {},
    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }
)

export default { loginService, userListService, userUpdateProfile, userUpdatePassword, userGetProfile, userGetCurrentPassword }