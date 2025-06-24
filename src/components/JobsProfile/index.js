import Loader from 'react-loader-spinner'
import './index.css'

const apiConstantResult = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const JobsProfile = props => {
  const {profileDetails, apiStatusProfile, onRetryProfile} = props
  const {name, profileImageUrl, shortBio} = profileDetails

  const onClickRetry = () => {
    onRetryProfile()
  }

  const successProfile = () => (
    <div className="jobsPage-profile-container">
      <img
        alt="profile"
        className="jobsPage-profile-img"
        src={profileImageUrl}
      />

      <h1 className="jobsPage-profile-name">{name}</h1>
      <p className="jobsPage-profile-details">{shortBio}</p>
    </div>
  )

  const failureProfile = () => (
    <div className="jobsPage-failure-profile-container">
      <button onClick={onClickRetry} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  const progressProfile = () => (
    <div className="loader-container-profile" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  switch (apiStatusProfile) {
    case apiConstantResult.success:
      return successProfile()
    case apiConstantResult.failure:
      return failureProfile()
    case apiConstantResult.inProgress:
      return progressProfile()
    default:
      return null
  }
}

export default JobsProfile
