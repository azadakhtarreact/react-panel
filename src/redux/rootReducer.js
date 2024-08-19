// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import auth from './slices/auth.Slice'
import cloudRisk from "./slices/cloudSlice"


const rootReducer = {
    navbar,
    layout,
    auth,
    cloudRisk,

}

export default rootReducer
