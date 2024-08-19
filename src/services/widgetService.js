import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASEURL

export const widgetListService = ({ token }) => axios.get(`${baseUrl}/clouds`, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})

export const widgetSearchListService = ({ searchValue, token }) => axios.get(`${baseUrl}/clouds?q=${searchValue}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})

export const addWidgetService = ({ token }, input) => axios.post(
    `${baseUrl}/clouds`, input,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            // Accept: 'multipart/form-data'
            Accept: 'application/json'
        }
    }
)

export const widgetDelete = ({ id, token }) => axios.delete(
    `${baseUrl}/clouds/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }
)