import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {
            name: 'Azad Akhtar',
        },
        userProfile: null,
        isRefresh: false
    }, 
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        setLoginDetails: (state, action) => {
            state.user = action.payload
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload
        },
        setProfileAgain: (state, action) => {
            state.isRefresh = action.payload
        }
    }
})

export const {
    login,
    logout,
    setLoginDetails,
    setUserProfile,
    setProfileAgain,
    userProfile
} = authSlice.actions

export const selectUser = (state) => state.auth
export const selectProfileAgain = (state) => state.auth.isRefresh

export default authSlice.reducer
