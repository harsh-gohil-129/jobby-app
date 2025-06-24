import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {Link} from 'react-router-dom'

import './index.css'

const JobsItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <li className="jobsPage-jobsCard-item">
      <Link className="jobsPage-jobsCard-item-link" to={`/jobs/${id}`}>
        <div className="jobsPage-card-head">
          <img
            className="jobsPage-card-logo"
            alt="company logo"
            src={companyLogoUrl}
          />

          <div className="jobsPage-card-role-star">
            <h1 className="jobsPage-card-role">{title}</h1>
            <div className="jobsPage-card-star-container">
              <BsStarFill className="jobsPage-card-star" />
              <p className="jobsPage-card-role">{rating}</p>
            </div>
          </div>
        </div>

        <div className="jobsPage-card-location-package">
          <div className="jobsPage-card-location-types">
            <div className="jobsPage-card-location">
              <IoLocationSharp className="jobsPage-card-icons" />
              <p className="jobsPage-card-icons-types">{location}</p>
            </div>

            <div className="jobsPage-card-location">
              <BsBriefcaseFill className="jobsPage-card-icons" />
              <p className="jobsPage-card-icons-types">{employmentType}</p>
            </div>
          </div>

          <p className="jobsPage-card-package">{packagePerAnnum}</p>
        </div>

        <hr className="jobsPage-devider" />

        <h1 className="jobsPage-card-title">Description</h1>
        <p className="jobsPage-card-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobsItem
