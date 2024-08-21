import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASEURL

export const cspmListService = ({ token }) => axios.get(`${baseUrl}/cspm`, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})

export const cspmSearchListService = ({ searchValue, token }) => axios.get(`${baseUrl}/cspm?q=${searchValue}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})

export const addCspmService = ({ token }, input) => axios.post(
    `${baseUrl}/cspm`, input,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            // Accept: 'multipart/form-data'
            Accept: 'application/json'
        }
    }
)

export const cspmDelete = ({ id, token }) => axios.delete(
    `${baseUrl}/cspm/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }
)
export const statusChangeService = ({ token}, input) => axios.patch(
    `${baseUrl}/cspm`, input,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }
)