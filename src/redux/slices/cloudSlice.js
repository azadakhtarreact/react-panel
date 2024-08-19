import { createSlice } from "@reduxjs/toolkit"

export const cloudSlice = createSlice({
    name: "cloudRisk",
    initialState: {
        categoryList: [],
        widget: {},
        isFreshData: false,
    }, 
    reducers: {
        setCategoryList: (state, action) => {
            state.categoryList = action.payload
        },
        setWidgetList: (state, action) => {
            state.widget = action.payload
        },
        setFreshList: (state, action) => {
            state.isFreshData = action.payload
        },
    }
})

export const {
    setCategoryList,
    setWidgetList,
    setFreshList,
} = cloudSlice.actions

export const selectCategoryList = (state) => state.cloudRisk.categoryList
export const selectWidgetList = (state) => state.cloudRisk.widget
export const selectFreshData = (state) => state.cloudRisk.isFreshData

export default cloudSlice.reducer
