import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,

    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <div className="jobsPage-jobDetails-similar-item">
      <div className="jobsPage-jobDetails-similar-head">
        <img
          className="jobsPage-jobDetails-similar-logo"
          alt="similar job company logo"
          src={companyLogoUrl}
        />

        <div className="jobsPage-jobDetails-similar-role-star">
          <h1 className="jobsPage-jobDetails-similar-role">{title}</h1>
          <div className="jobsPage-jobDetails-similar-star-container">
            <BsStarFill className="jobsPage-jobDetails-similar-star" />
            <p className="jobsPage-jobDetails-similar-role">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="jobsPage-jobDetails-similar-title">Description</h1>
      <p className="jobsPage-jobDetails-similar-description">
        {jobDescription}
      </p>

      <div className="jobsPage-jobDetails-similar-location-types">
        <div className="jobsPage-jobDetails-similar-location">
          <IoLocationSharp className="jobsPage-jobDetails-similar-icons" />
          <p className="jobsPage-jobDetails-similar-icons-types">{location}</p>
        </div>

        <div className="jobsPage-jobDetails-similar-location">
          <BsBriefcaseFill className="jobsPage-jobDetails-similar-icons" />
          <p className="jobsPage-jobDetails-similar-icons-types">
            {employmentType}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobs
