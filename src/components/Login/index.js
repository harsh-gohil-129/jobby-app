import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    isErrorShow: false,
    errorMsg: '',
    username: '',
    password: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isErrorShow: true, errorMsg})
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {isErrorShow, username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="responsive-login">
          <div className="login-page-card">
            <img
              className="login-page-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />

            <form onSubmit={this.onSubmitLogin} className="login-page-form">
              <label htmlFor="userNameInputId" className="login-page-label">
                USERNAME
              </label>
              <input
                value={username}
                onChange={this.onChangeUsername}
                id="userNameInputId"
                placeholder="Username"
                className="login-page-input"
                type="text"
              />

              <label htmlFor="passwordInputId" className="login-page-label">
                PASSWORD
              </label>
              <input
                onChange={this.onChangePassword}
                value={password}
                id="passwordInputId"
                placeholder="Password"
                className="login-page-input"
                type="password"
              />

              <button className="login-page-button" type="submit">
                Login
              </button>
              {isErrorShow && <p className="login-error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
