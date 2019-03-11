import React from 'react'
import { fetchWeather, fetchTimezone } from './api'
import moment from 'moment-timezone'
import { WeatherDetailComponent } from '../weather'

export function* weatherGenerator(payload) {
  try {
    const weeklyWeather = yield fetchWeather(payload)
    const timezoneData = yield fetchTimezone(weeklyWeather.city.coord)
    return { timezone: timezoneData.zoneName, rawWeeklyWeatherData: weeklyWeather }
  } catch (e) {
    return e
  }
}

export const runWeatherGenerator = (payload, obj, gen, data) => {
  if (!gen) {
    gen = weatherGenerator(payload)
    obj.setState({ isLoading: true })
  }
  let result
  if (!data) {
    result = gen.next()
  } else {
    result = gen.next(data)
  }
  if (!result.value.timezone) {
    result.value.then(function (d) {
      runWeatherGenerator(payload, obj, gen, d)
    })
  } else {
    obj.setState({ weeklyWeatherData: getWeeklyForcast(result.value), isLoading: false })
  }
}

export const getWeeklyForcast = ({ timezone, rawWeeklyWeatherData }) => {
  const weeklyData = getTimezoneHourlyData(timezone, rawWeeklyWeatherData)
  const weeklyConvertedData = getConvertedWeeklyData(weeklyData)
  return weeklyConvertedData
}

export const getTimezoneHourlyData = (timezone, rawWeeklyWeatherData) => {
  const result = []
  rawWeeklyWeatherData.list.forEach(item => {
    const utcDate = moment.unix(item.dt).utc()
    const dayString = utcDate.tz(timezone).toString().slice(0, 15)
    const convertedHour = utcDate.tz(timezone).hour()
    item.dateLocalText = utcDate.tz(timezone).format('YYYY-MM-DD HH:mm').toString()
    result.push({ utcDate, dayString, convertedHour, hourlyInstance: item })
  })
  return result
}

export const getConvertedWeeklyData = (weeklyData) => {
  let weeklyConvertedData = []
  let dayArray = []
  let previousDayString = ''
  let max_temp = 0
  let min_temp = 0
  let weatherIcon = ''
  let weatherDescription = ''
  weeklyData.forEach((instance, idx) => {
    const { dayString, convertedHour, hourlyInstance } = instance
    try {
      if (convertedHour === 11 || convertedHour === 12 || convertedHour === 13 || (previousDayString === '' && convertedHour > 13)) {
        weatherIcon = hourlyInstance.weather[0].icon;
        weatherDescription = hourlyInstance.weather[0].description;
      }
      if (previousDayString === '') {
        previousDayString = dayString
        max_temp = hourlyInstance.main.temp_max
        min_temp = hourlyInstance.main.temp_min
        dayArray.push(hourlyInstance)
      }
      if (dayString !== previousDayString) {
        weeklyConvertedData.push({ hours: dayArray, maxTemp: max_temp, minTemp: min_temp, dayString: previousDayString, weatherIcon, weatherDescription })
        dayArray = []
        max_temp = hourlyInstance.main.temp_max
        min_temp = hourlyInstance.main.temp_min
        dayArray.push(hourlyInstance)
      } else {
        if (max_temp < hourlyInstance.main.temp_max) max_temp = hourlyInstance.main.temp_max
        if (min_temp > hourlyInstance.main.temp_min) min_temp = hourlyInstance.main.temp_min
        dayArray.push(hourlyInstance)
      }
      previousDayString = dayString
      if (idx === weeklyData.length - 1) weeklyConvertedData.push({ hours: dayArray, maxTemp: max_temp, minTemp: min_temp, dayString: previousDayString, weatherIcon, weatherDescription })
    }
    catch (e) {
      console.log(e)
    }
  })
  return weeklyConvertedData
}

export const getWeatherDetailDisplay = (hours) => {
  const details = hours.map((hour, idx) => <WeatherDetailComponent key={idx} hour={hour} />)
  return (
    <table className='table'>
      <thead>
        <tr>
          <th className='text-center col pr-4'>Time</th>
          <th className='text-center col-2 pr-5'>Description</th>
          <th className='text-center col-2 pr-5'>Temp</th>
          <th className='text-center col-2 pr-5 '>Pressure</th>
          <th className='text-center col-2 pr-5'>Humidity</th>
          <th className='text-center col-2 pr-5'>Cloudiness</th>
          <th className='text-center col-2 pr-5'>Wind Speed</th>
        </tr>
      </thead>
      <tbody>
        {details}
      </tbody>
    </table>
  )
}

export const cityLookup = (input, cityArray) => {
  let count = 0
  return cityArray.filter(city => {
    const isMatch = city.name.toLowerCase().slice(0, input.length) === input.toLowerCase() && count < 5
    if (isMatch) count++
    return isMatch
  })
}

