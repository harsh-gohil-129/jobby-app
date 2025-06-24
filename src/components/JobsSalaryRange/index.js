import './index.css'

const JobsSalaryRange = props => {
  const {salaryRangeDetails, changeSalaryRange} = props
  const {label, salaryRangeId} = salaryRangeDetails

  const onChangeSalaryRange = () => {
    changeSalaryRange(salaryRangeId)
  }

  return (
    <li className="jobsPage-filter-salary-item">
      <input
        onChange={onChangeSalaryRange}
        name="salary"
        id={salaryRangeId}
        className="jobsPage-filter-salary-input"
        type="radio"
        value={salaryRangeId}
      />
      <label className="jobsPage-filter-salary-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default JobsSalaryRange
