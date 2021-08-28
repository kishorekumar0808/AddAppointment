import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    treatMeantList: [],
    name: '',
    dateInput: '',
    isFilterActive: false,
  }

  onActiveFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  submitForm = event => {
    event.preventDefault()
    const {name, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newTreatMeant = {
      id: v4(),
      title: name,
      date: formattedDate,
      isLiked: false,
    }

    this.setState(prevState => ({
      treatMeantList: [...prevState.treatMeantList, newTreatMeant],
      name: '',
      dateInput: '',
    }))
  }

  toggleButton = id => {
    this.setState(prevState => ({
      treatMeantList: prevState.treatMeantList.map(eachTreat => {
        if (id === eachTreat.id) {
          return {...eachTreat, isLiked: !eachTreat.isLiked}
        }
        return eachTreat
      }),
    }))
  }

  onChangeTitle = event => {
    this.setState({name: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  getAllFilteredItems = () => {
    const {treatMeantList, isFilterActive} = this.state
    if (isFilterActive) {
      return treatMeantList.filter(
        eachStarItem => eachStarItem.isLiked === true,
      )
    }
    return treatMeantList
  }

  render() {
    const {name, dateInput} = this.state
    const treatMeantList = this.getAllFilteredItems()
    return (
      <div className="bg-container">
        <div className="cart-Container">
          <div className="form-container">
            <div className="styling-container">
              <h1>Add Appointment</h1>
              <form onSubmit={this.submitForm}>
                <label htmlFor="textInput" className="title">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  id="textInput"
                  placeholder="Title"
                  className="titleInput"
                  value={name}
                  onChange={this.onChangeTitle}
                />
                <br />

                <label htmlFor="dateElement" className="date">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  id="dateElement"
                  placeholder="dd/mm/yy"
                  className="dateInput"
                  value={dateInput}
                  onChange={this.onChangeDate}
                />
                <br />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="list-items-container">
            <h1>Appointments</h1>
            <button
              type="submit"
              className="stared-button"
              onClick={this.onActiveFilter}
            >
              Starred
            </button>
          </div>
          <ul className="list-items">
            {treatMeantList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointItems={eachItem}
                toggleButton={this.toggleButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
