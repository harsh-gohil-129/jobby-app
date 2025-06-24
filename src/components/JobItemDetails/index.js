import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import {IoLocationSharp} from 'react-icons/io5'
import Navbar from '../Navbar'
import JobItemSkills from '../JobItemSkills'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiConstantResult = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {
      lifeAtCompany: {},
    },
    skills: [],
    similarJobs: [],
    apiStatus: apiConstantResult.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiConstantResult.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, option)

    if (response.ok === true) {
      const data = await response.json()
      const raw = data.job_details

      const modifiedData = {
        companyLogoUrl: raw.company_logo_url,
        companyWebsiteUrl: raw.company_website_url,
        employmentType: raw.employment_type,
        id: raw.id,
        jobDescription: raw.job_description,
        lifeAtCompany: {
          description: raw.life_at_company.description,
          imageUrl: raw.life_at_company.image_url,
        },
        location: raw.location,
        packagePerAnnum: raw.package_per_annum,
        rating: raw.rating,
        title: raw.title,
      }

      const skills = raw.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const similarJobs = data.similar_jobs.map(eachSimilarJob => ({
        companyLogoUrl: eachSimilarJob.company_logo_url,
        employmentType: eachSimilarJob.employment_type,
        jobDescription: eachSimilarJob.job_description,
        id: eachSimilarJob.id,
        location: eachSimilarJob.location,
        rating: eachSimilarJob.rating,
        title: eachSimilarJob.title,
      }))

      this.setState({
        jobDetails: modifiedData,
        skills,
        similarJobs,
        apiStatus: apiConstantResult.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstantResult.failure,
      })
    }
  }

  onRetryJobsDetails = () => {
    this.getJobItemDetails()
  }

  renderOnFailureJobDetails = () => (
    <>
      <Navbar />
      <div className="jobDetails-container">
        <div className="jobDetails-responsive">
          <div className="jobDetailsFailed-container">
            <img
              className="jobDetailsFailed-img"
              alt="failure view"
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            />
            <h1 className="jobDetailsFailed-heading">
              Oops! Something Went Wrong
            </h1>
            <p className="jobDetailsFailed-description">
              We cannot seem to find the page you are looking for.
            </p>
            <button
              onClick={this.onRetryJobsDetails}
              className="jobDetailsFailed-retry-btn"
              type="button"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </>
  )

  renderOnProgressJobDetails = () => (
    <>
      <Navbar />
      <div className="jobDetails-container">
        <div className="jobDetails-responsive">
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        </div>
      </div>
    </>
  )

  renderOnSuccessJobDetails = () => {
    const {jobDetails, skills, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,

      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <>
        <Navbar />
        <div className="jobDetails-container">
          <div className="jobDetails-responsive">
            <div className="jobDetails-jobsCard-item">
              <div className="jobDetails-card-head">
                <img
                  className="jobDetails-card-logo"
                  alt="job details company logo"
                  src={companyLogoUrl}
                />

                <div className="jobDetails-card-role-star">
                  <h1 className="jobDetails-card-role">{title}</h1>
                  <div className="jobDetails-card-star-container">
                    <BsStarFill className="jobDetails-card-star" />
                    <p className="jobDetails-card-role">{rating}</p>
                  </div>
                </div>
              </div>

              <div className="jobDetails-card-location-package">
                <div className="jobDetails-card-location-types">
                  <div className="jobDetails-card-location">
                    <IoLocationSharp className="jobDetails-card-icons" />
                    <p className="jobDetails-card-icons-types">{location}</p>
                  </div>

                  <div className="jobDetails-card-location">
                    <BsBriefcaseFill className="jobDetails-card-icons" />
                    <p className="jobDetails-card-icons-types">
                      {employmentType}
                    </p>
                  </div>
                </div>

                <p className="jobDetails-card-package">{packagePerAnnum}</p>
              </div>

              <hr className="jobDetails-devider" />

              <div className="jobDetails-card-title-link">
                <h1 className="jobDetails-card-title">Description</h1>

                <a
                  target="_blank"
                  href={companyWebsiteUrl}
                  className="jobDetails-card-link"
                  rel="noopener noreferrer"
                >
                  Visit
                  <FiExternalLink className="jobDetails-card-external-icon" />
                </a>
              </div>
              <p className="jobDetails-card-description">{jobDescription}</p>

              <div className="jobDetails-card-skills-container">
                <h1 className="jobDetails-card-skills-heading">Skills</h1>
                <ul className="jobDetails-card-skills-list">
                  {skills.map(eachSkills => (
                    <JobItemSkills
                      key={eachSkills.name}
                      skillDetails={eachSkills}
                    />
                  ))}
                </ul>
              </div>

              <div>
                <h1 className="jobDetails-card-lifeStyle-heading">
                  Life at Company
                </h1>

                <div className="jobDetails-card-lifeStyle-context">
                  <p className="jobDetails-card-lifeStyle-description">
                    {lifeAtCompany.description}
                  </p>
                  <img
                    className="jobDetails-card-lifeStyle-image"
                    alt="life at company"
                    src={lifeAtCompany.imageUrl}
                  />
                </div>
              </div>
            </div>

            <div className="jobDetails-card-similar-jobs-container">
              <h1 className="jobDetails-card-similar-jobs-heading">
                Similar Jobs
              </h1>

              <ul className="jobDetails-card-similar-jobs-list">
                {similarJobs.map(eachSimilar => (
                  <SimilarJobs
                    key={eachSimilar.id}
                    similarJobDetails={eachSimilar}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantResult.success:
        return this.renderOnSuccessJobDetails()
      case apiConstantResult.failure:
        return this.renderOnFailureJobDetails()
      case apiConstantResult.inProgress:
        return this.renderOnProgressJobDetails()
      default:
        return null
    }
  }
}

export default JobItemDetails
