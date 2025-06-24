import './index.css'

const JobsTypes = props => {
  const {jobsTypesDetails, onChangeTypes} = props
  const {label, employmentTypeId} = jobsTypesDetails

  const onChangeTypesId = () => {
    onChangeTypes(employmentTypeId)
  }

  return (
    <li className="jobsPage-filter-employment-item">
      <input
        onChange={onChangeTypesId}
        id={employmentTypeId}
        className="jobsPage-filter-employment-input"
        type="checkbox"
        value={employmentTypeId}
      />
      <label
        className="jobsPage-filter-employment-label"
        htmlFor={employmentTypeId}
      >
        {label}
      </label>
    </li>
  )
}
export default JobsTypes
