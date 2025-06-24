import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Navbar = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="navbar-container">
      <div className="navbar-responsive">
        <Link className="navbar-page-logo-link" to="/">
          <img
            className="navbar-page-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>

        <ul className="navbar-icon-list">
          <li className="navbar-icon-item">
            <Link to="/">
              <button type="button" className="navbar-icon-btn">
                <AiFillHome className="navbar-icon" />
              </button>
            </Link>
          </li>

          <li className="navbar-icon-item">
            <Link to="/jobs">
              <button type="button" className="navbar-icon-btn">
                <BsBriefcaseFill className="navbar-icon" />
              </button>
            </Link>
          </li>

          <li className="navbar-icon-item">
            <button
              onClick={onClickLogout}
              type="button"
              className="navbar-icon-btn"
            >
              <FiLogOut className="navbar-icon" />
            </button>
          </li>
        </ul>

        <ul className="navbar-lg-list">
          <li className="navbar-lg-item">
            <Link className="navbar-item-link" to="/">
              Home
            </Link>
          </li>
          <li className="navbar-lg-item">
            <Link className="navbar-item-link" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>

        <button onClick={onClickLogout} className="logout-lg-btn" type="button">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Navbar)
