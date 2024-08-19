import Cookies from 'js-cookie'

// save the token and user into the Cookies and expired in 1 day
// const tomorrow = new Date();
// tomorrow.setDate(today.getDate() + 1);

export const setUserSession = (token, user, reFreshToken) => {
    Cookies.set('user', JSON.stringify(user))
    Cookies.set('token', JSON.stringify(token), { expires: 1 })
    Cookies.set('reFreshToken', JSON.stringify(reFreshToken))
}

export const getToken = () => {
    const token = Cookies.get('token')
    if (token) return JSON.parse(token)
    return null
}
export const getReFreshToken = () => {
    const reFreshToken = Cookies.get('reFreshToken')
    if (reFreshToken) return JSON.parse(reFreshToken)
    return null
}

// remove the token and user from the Cookies
export const removeUserSession = () => {
    Cookies.remove('token')
    Cookies.remove('user')
    Cookies.remove('reFreshToken')
}

// update user session
// export const updateUserSession = (user) => {
//     Cookies.remove('user')
//     Cookies.set('user', JSON.stringify(user), { expires: 7 })
// }

// return the user data from the Cookies
export const getUser = () => {
    const userStr = Cookies.get('user')
    if (userStr) return JSON.parse(userStr)
    return null
}

// return the token from the Cookies
// export const getToken = () =>  Cookies.get('token') || null;

// here we re storing re fresh token in place of token
export const updateUserSession = (reFreshToken) => {
    Cookies.set('token', JSON.stringify(reFreshToken))
}

// save the temporary token into the Cookies and expired in 7 days
export const setTemporarySession = (token) => {
    Cookies.set('temporary_session', JSON.stringify(token), { expires: 7 })
}

// return the token from the Cookies
export const getTemporarySession = () => {
    const TemporaryStr = Cookies.get('temporary_session')
    if (TemporaryStr) return JSON.parse(TemporaryStr)
    return null
}

// remove the temporary token
export const removeTemporarySession = () => {
    Cookies.remove('temporary_session')
}