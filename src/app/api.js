import axios from 'axios'

export const fetchWeather = ({ cityId, unit }) => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_URL_OWM_FIVE + `?id=${cityId}&APPID=${process.env.REACT_APP_OWM_APPID}&units=${unit}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
        return error
      })
  })
}

export const fetchTimezone = ({ lat, lon }) => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_URL_TIMEZONEDB + `?key=${process.env.REACT_APP_TIMEZONEDB_APPID}&by=position&lat=${lat}&lng=${lon}&format=json`)
      .then(response => {
        console.log(response.data)
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}