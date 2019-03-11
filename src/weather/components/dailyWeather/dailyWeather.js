import React from 'react'

export default class DailyWeatherComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isHover: false }
  }
  onHover(e, bool) {
    e.preventDefault()
    this.setState({ isHover: bool })
  }
  render() {
    const { dayString, maxTemp, minTemp, hours, weatherIcon, weatherDescription } = this.props.day
    const { onClick } = this.props
    const pictureSrc = 'http://openweathermap.org/img/w/' + weatherIcon + '.png'
    const day = dayString.slice(0, 3)
    const bgColor = this.state.isHover ? 'bg-warning' : ''
    return (
      <div onClick={e => { onClick(e, hours, dayString) }} onMouseOver={e => this.onHover.call(this, e, true)} onMouseLeave={e => this.onHover.call(this, e, false)}
        className={`text-center moon-light border-radius-sm p-5 m-2 ${bgColor}`} >
        <div>{day}</div>
        <img src={pictureSrc} alt="weather-img" />
        <div>{weatherDescription}</div>
        <div >
          <div className='moon-light'>{maxTemp}&#176;</div>
          <div className='moon-light'>{minTemp}&#176;</div>
        </div>
      </div >
    )
  }
}