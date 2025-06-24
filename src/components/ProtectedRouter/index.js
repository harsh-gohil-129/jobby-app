import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRouter = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (!jwtToken) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRouter
