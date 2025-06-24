import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const HomePage = props => {
  const onClickGetJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <>
      <Navbar />
      <div className="homePage-container">
        <div className="homePage-responsive">
          <div className="homePage-text-content">
            <h1 className="homePage-heading">
              Find The Job That Fits Your Life
            </h1>
            <p className="homePage-description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>

            <Link to="/jobs">
              <button
                onClick={onClickGetJobs}
                className="homePage-btn"
                type="button"
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
