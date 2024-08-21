import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASEURL

export const cwppListService = ({ token }) => axios.get(`${baseUrl}/cwpp`, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})

export const cwppSearchListService = ({ searchValue, token }) => axios.get(`${baseUrl}/cwpp?q=${searchValue}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})

export const addCwppService = ({ token }, input) => axios.post(
    `${baseUrl}/cwpp`, input,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            // Accept: 'multipart/form-data'
            Accept: 'application/json'
        }
    }
)

export const cwppDelete = ({ id, token }) => axios.delete(
    `${baseUrl}/cwpp/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }
)