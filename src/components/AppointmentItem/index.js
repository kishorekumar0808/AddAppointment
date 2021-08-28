import './index.css'

const AppointmentItem = props => {
  const {appointItems, toggleButton} = props
  const {id, title, date, isLiked} = appointItems
  const starImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const toggleImage = () => {
    toggleButton(id)
  }

  return (
    <li className="list-Item">
      <div className="sub-list">
        <p className="treatment">{title}</p>
        <button
          type="button"
          testId="star"
          className="toggle-button"
          onClick={toggleImage}
        >
          <img src={starImage} alt="star" className="star-image" />
        </button>
      </div>
      <p className="timing">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
