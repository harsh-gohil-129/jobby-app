import {Route, Redirect, Switch} from 'react-router-dom'
import Login from './components/Login'
import HomePage from './components/HomePage'
import JobsPage from './components/JobsPage'
import ProtectedRouter from './components/ProtectedRouter'
import JobItemDetails from './components/JobItemDetails'
import PageNotFound from './components/PageNotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <ProtectedRouter exact path="/" component={HomePage} />
    <Route exact path="/login" component={Login} />
    <ProtectedRouter exact path="/jobs" component={JobsPage} />
    <ProtectedRouter exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/not-found" component={PageNotFound} />
    <Redirect to="/not-found" />
  </Switch>
)
export default App
