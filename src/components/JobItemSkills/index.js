import './index.css'

const JobItemSkills = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails

  return (
    <li className="skills-item">
      <img alt={name} className="skills-image" src={imageUrl} />
      <p className="skills-name">{name}</p>
    </li>
  )
}

export default JobItemSkills
