// ** React Imports
import { Navigate } from "react-router-dom"
import { useContext, Suspense } from "react"

// ** Context Imports
import { AbilityContext } from "@src/utility/context/Can"

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars 
  const ability = useContext(AbilityContext)
  const userToken = JSON.parse(localStorage.getItem("auth"))
  const userAccess = JSON.parse(localStorage.getItem('userDataAuth'))
  // const userToken = () => JSON.parse(localStorage.getItem("auth"))
  // const user = JSON.parse(localStorage.getItem("userData"))

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = false

    if (route.meta) {
      action = route.meta.action // subMenu
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    } 
    if (!userToken) {
      return <Navigate to="/login" /> // doChange
    } 
    if (userToken && restrictedRoute) {
      return <Navigate to="/" />
    }
    // if (userToken && restrictedRoute && user.role === "client") {
    //   return <Navigate to="/access-control" />
    // }
    // if (userToken && !ability.can(action || "read", resource)) {
    //   // return <Navigate to="/misc/not-authorized" replace />
    //   return <Navigate to="/login" />
    // }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
