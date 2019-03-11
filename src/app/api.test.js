import React from 'react'
import axios from 'axios'
import * as API from './api'

jest.mock('axios')

describe('testing API', () => {
  let result
  beforeEach(() => {
    result = { data: '' }
    axios.get.mockReturnValue(Promise.resolve(result))
  })
  describe('fetchWeather', () => {
    it('should call fetchWeather', () => {
      const spy = jest.spyOn(axios, 'get')
      const payload = { cityId: '', unit: '' }
      API.fetchWeather(payload)
      expect(spy).toBeCalledWith(process.env.REACT_APP_URL_OWM_FIVE + `?id=${payload.cityId}&APPID=${process.env.REACT_APP_OWM_APPID}&units=${payload.unit}`)
    })
  })
  describe('fetchTimezone', () => {
    it('should call fetchTimezone', () => {
      const payload = { lat: '', lon: '' }
      const spy = jest.spyOn(axios, 'get')
      API.fetchTimezone(payload)
      expect(spy).toBeCalledWith(process.env.REACT_APP_URL_TIMEZONEDB + `?key=${process.env.REACT_APP_TIMEZONEDB_APPID}&by=position&lat=${payload.lat}&lng=${payload.lon}&format=json`)
    })
  })
})