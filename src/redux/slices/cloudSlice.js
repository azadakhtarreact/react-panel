import { createSlice } from "@reduxjs/toolkit"
 
export const cloudSlice = createSlice({
    name: "cloudRisk",
    initialState: {
        cspmList: [],
        cwppList: [],
        registryList: [],
        isFreshData: false,
    },
    reducers: {
        setCspmList: (state, action) => {
            state.cspmList = action.payload
        },
        setCwppList: (state, action) => {
            state.cwppList = action.payload
        },
        setRegistryList: (state, action) => {
            state.registryList = action.payload
        },
        setFreshList: (state, action) => {
            state.isFreshData = action.payload
        },

    }
})

export const {
    setFreshList,
    setCspmList,
    setCwppList,
    setRegistryList,
} = cloudSlice.actions


export const selectCspmList = (state) => state.cloudRisk.cspmList
export const selectCwppList = (state) => state.cloudRisk.cwppList
export const selectRegistryList = (state) => state.cloudRisk.registryList
export const selectFreshData = (state) => state.cloudRisk.isFreshData

export default cloudSlice.reducer
