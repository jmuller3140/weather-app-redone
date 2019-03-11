import React from 'react';

const WeatherDetailComponent = (props) => {
  const { main, weather, clouds, wind, dateLocalText } = props.hour
  //props.rain and props.snow will not work in javascript due to a numeric value in its variable name
  //will keep in to see if there is a way to change in the future
  const pictureSrc = 'http://openweathermap.org/img/w/' + weather[0].icon + '.png';
  const date = new Date(dateLocalText);
  let hour = date.getHours(date);
  if (parseInt(hour, 10) >= 12) {
    if (parseInt(hour, 10) !== 12) {
      hour = parseInt(hour, 10) - 12
    }
    hour = hour.toString() + " PM";
  } else if (parseInt(hour, 10) < 1) {
    hour = "12 AM";
  }
  else {
    hour = hour.toString() + " AM";
  }
  return (
    <tr>
      <td className='col text-center align-middle d-flex flex-column'>
        <img src={pictureSrc} alt='weather-icon' width='50px' height='50px' />
        {hour}
      </td>
      <td className='col-2 text-center align-middle'>{weather[0].description}</td>
      <td className='col-2 text-center align-middle'>{main.temp}&#176;</td>
      <td className='col-2 text-center align-middle'>{main.pressure} hPa</td>
      <td className='col-2 text-center align-middle'>{main.humidity}%</td>
      <td className='col-2 text-center align-middle'>{clouds.all}%</td>
      <td className='col-2 text-center align-middle'>{wind.speed} MPH</td>
    </tr>
  )
}
export default WeatherDetailComponent