import React from 'react'
import { WeatherDetailComponent } from '../weather'
import * as Utils from './utils'
import { shallow } from 'enzyme'
import * as API from './api'

jest.mock('../weather')
jest.mock('./api')

describe('Utils File', () => {
  describe('weatherGenerator', () => {
    it('should call fetchWeather api', () => {
      const payload = {}
      const spy = jest.spyOn(API, 'fetchWeather')
      const weatherGen = Utils.weatherGenerator(payload)
      weatherGen.next()
      expect(spy).toBeCalled()
    })
    it('should call fetchTimezone api', () => {
      const payload = {}
      const payload2 = { city: { coord: {} } }
      const spy = jest.spyOn(API, 'fetchTimezone')
      const weatherGen = Utils.weatherGenerator(payload)
      weatherGen.next()
      weatherGen.next(payload2)
      expect(spy).toBeCalled()
    })

  })
  xdescribe('runWeatherGenerator', () => {
    xit('should create generator', () => {
      const payload = { cityId: 1270260, unit: 'imperial' }
      const obj = {}
      const spy = jest.spyOn(Utils, 'weatherGenerator')
      Utils.runWeatherGenerator(payload, obj)
      expect(spy).toBeCalled()
      //payload, obj, gen, data
    })

  })
  xdescribe('getWeeklyForcast', () => {
    xit('should call getTimezoneHourlyData and getConvertedWeeklyData', () => {
      const props = { timezone: '', rawWeeklyWeatherData: {} }
      const functions = { getTimezoneHourlyData: jest.fn(), getConvertedWeeklyData: jest.fn() }
      const spy = jest.spyOn(functions, 'getTimezoneHourlyData')
      const spy2 = jest.spyOn(functions, 'getConvertedWeeklyData')
      Utils.getWeeklyForcast(props)
      expect(spy).toBeCalled()
      expect(spy2).toBeCalled()
    })
  })
  describe('getTimezoneHourlyData', () => {
    it('should return converted timezone information for every hourly instance', () => {
      const timezone = 'Asia/Vladivostok'
      const rawWeeklyWeatherData = { list: [{ dt: 1552003200 }] }
      expect(Utils.getTimezoneHourlyData(timezone, rawWeeklyWeatherData).length).toEqual(1)
    })
  })
  describe('getConvertedWeeklyData', () => {
    it('should return array separating the days', () => {
      const hourlyInstance = { weather: [{ icon: '', description: '' }], main: { temp_max: 1, temp_min: 1 } }
      const weeklydata = [{ dayString: 'Fri Mar 08 2019', convertedHour: 1, hourlyInstance }, { dayString: 'Fri Mar 08 2019', convertedHour: 4, hourlyInstance }, { dayString: 'Sat Mar 09 2019', convertedHour: 7, hourlyInstance }]
      expect(Utils.getConvertedWeeklyData(weeklydata).length).toEqual(2)
    })
  })
  describe('getWeatherDetailDisplay', () => {
    it('should return jsx of detailed weather information for the day', () => {
      const hours = [1, 2, 3]
      const wrapper = shallow(Utils.getWeatherDetailDisplay(hours))
      expect(wrapper.find(WeatherDetailComponent).length).toEqual(3)
    })
  })
  describe('cityLookup', () => {
    it('should return array of matching strings (up to 5)', () => {
      const input = 'new'
      const cityArray = [{ name: 'New Jeans' }, { name: 'New Jersey' }, { name: 'New York' }, { name: 'New Phone' }, { name: 'New Things' }, { name: 'Newwww' }]
      expect(Utils.cityLookup(input, cityArray).length).toEqual(5)
    })
  })

})