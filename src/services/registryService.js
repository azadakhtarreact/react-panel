import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASEURL

export const registryListService = ({ token }) => axios.get(`${baseUrl}/registry`, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})

export const registrySearchListService = ({ searchValue, token }) => axios.get(`${baseUrl}/registry?q=${searchValue}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})

export const addRegistryService = ({ token }, input) => axios.post(
    `${baseUrl}/registry`, input,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            // Accept: 'multipart/form-data'
            Accept: 'application/json'
        }
    }
)

export const registryDelete = ({ id, token }) => axios.delete(
    `${baseUrl}/registry/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }
)