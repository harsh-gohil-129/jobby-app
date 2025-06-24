import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import JobsProfile from '../JobsProfile'
import JobsTypes from '../JobsTypes'
import JobsSalaryRange from '../JobsSalaryRange'
import JobsItem from '../JobsItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstantResult = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsPage extends Component {
  state = {
    jobsList: [],
    profileData: {},
    selectedTypesId: [],
    selectedSalaryRange: '',
    searchInput: '',
    apiStatus: apiConstantResult.initial,
    apiStatusProfile: apiConstantResult.initial,
  }

  componentDidMount() {
    this.getJobs()
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatusProfile: apiConstantResult.inProgress})
    const apiPUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const respones = await fetch(apiPUrl, options)

    if (respones.ok === true) {
      const profileData = await respones.json()

      const modifiedProfileData = {
        name: profileData.profile_details.name,
        profileImageUrl: profileData.profile_details.profile_image_url,
        shortBio: profileData.profile_details.short_bio,
      }

      this.setState({
        profileData: modifiedProfileData,
        apiStatusProfile: apiConstantResult.success,
      })
    } else {
      this.setState({
        apiStatusProfile: apiConstantResult.failure,
      })
    }
  }

  getJobs = async () => {
    this.setState({apiStatus: apiConstantResult.inProgress})
    const {selectedTypesId, selectedSalaryRange, searchInput} = this.state
    const queryEmployTypes = selectedTypesId.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${queryEmployTypes}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const respones = await fetch(apiUrl, options)

    if (respones.ok === true) {
      const data = await respones.json()
      const modifiedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsList: modifiedData,
        apiStatus: apiConstantResult.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstantResult.failure,
      })
    }
  }

  onChangeTypes = typesId => {
    const {selectedTypesId} = this.state

    if (!selectedTypesId.includes(typesId)) {
      this.setState(
        prevState => ({
          selectedTypesId: [...prevState.selectedTypesId, typesId],
        }),
        this.getJobs,
      )
    } else {
      const filteredSelectedTypesList = selectedTypesId.filter(
        ecachId => ecachId !== typesId,
      )
      this.setState({selectedTypesId: filteredSelectedTypesList}, this.getJobs)
    }
  }

  changeSalaryRange = salaryId => {
    this.setState({selectedSalaryRange: salaryId}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onRetry = () => {
    this.getJobs()
  }

  onRetryProfile = () => {
    this.getProfile()
  }

  renderOnProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderOnFailureJobs = () => (
    <div className="noJobFound-container">
      <img
        className="noJobFound-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="noJobFound-heading">Oops! Something Went Wrong</h1>
      <p className="noJobFound-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.onRetry} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderNoJobsFound = () => (
    <div className="noJobFound-container">
      <img
        className="noJobFound-img"
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="noJobFound-heading">No Jobs Found</h1>
      <p className="noJobFound-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderOnSuccessJobs = () => {
    const {jobsList} = this.state

    return jobsList.length > 0
      ? jobsList.map(eachJob => (
          <JobsItem key={eachJob.id} jobDetails={eachJob} />
        ))
      : this.renderNoJobsFound()
  }

  renderJobsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantResult.success:
        return this.renderOnSuccessJobs()
      case apiConstantResult.failure:
        return this.renderOnFailureJobs()
      case apiConstantResult.inProgress:
        return this.renderOnProgress()
      default:
        return null
    }
  }

  render() {
    const {profileData, searchInput, apiStatusProfile} = this.state

    return (
      <>
        <Navbar />
        <div className="jobsPage-container">
          <div className="jobsPage-responsive">
            <div className="jobsPage-sidebar-container">
              <div className="jobsPage-searchBox">
                <input
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                  className="jobsPage-searchBox-input"
                  placeholder="Search"
                  type="search"
                />

                <div className="jobsPage-searchBox-icon-container">
                  <button
                    data-testid="searchButton"
                    onClick={this.onClickSearch}
                    type="button"
                    className="jobsPage-searchBox-icon-btn"
                  >
                    <BsSearch className="jobsPage-searchBox-icon" />
                  </button>
                </div>
              </div>

              <JobsProfile
                onRetryProfile={this.onRetryProfile}
                apiStatusProfile={apiStatusProfile}
                profileDetails={profileData}
              />

              <hr className="jobsPage-devider" />

              <div>
                <h1 className="jobsPage-filter-title">Type of Employment</h1>

                <ul className="jobsPage-filter-list">
                  {employmentTypesList.map(eachTypes => (
                    <JobsTypes
                      key={eachTypes.employmentTypeId}
                      onChangeTypes={this.onChangeTypes}
                      jobsTypesDetails={eachTypes}
                    />
                  ))}
                </ul>
              </div>

              <hr className="jobsPage-devider" />

              <div>
                <h1 className="jobsPage-filter-title">Salary Range</h1>

                <ul className="jobsPage-filter-list">
                  {salaryRangesList.map(eachRange => (
                    <JobsSalaryRange
                      changeSalaryRange={this.changeSalaryRange}
                      key={eachRange.salaryRangeId}
                      salaryRangeDetails={eachRange}
                    />
                  ))}
                </ul>
              </div>
            </div>

            <ul className="jobsPage-jobsCard-list">
              <li className="jobsPage-lg-searchBox">
                <input
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                  className="jobsPage-searchBox-input"
                  placeholder="Search"
                  type="search"
                />

                <div className="jobsPage-searchBox-icon-container">
                  <button
                    data-testid="searchButton"
                    onClick={this.onClickSearch}
                    type="button"
                    className="jobsPage-searchBox-icon-btn"
                  >
                    <BsSearch className="jobsPage-searchBox-icon" />
                  </button>
                </div>
              </li>

              {this.renderJobsList()}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default JobsPage
