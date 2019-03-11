import React from 'react'
import { shallow } from 'enzyme'
import { default as WeatherDetailComponent } from './weatherDetail'
describe('>> DailyWeather Component', () => {
  it('should render DailyWeatherComponent', () => {
    const props = { hour: { main: {}, weather: [{ icon: '' }], clouds: '', wind: '', dateLocalText: '' } }
    const wrapper = shallow(<WeatherDetailComponent {...props} />)
    expect(wrapper.find('td').length).toEqual(7)
  })
})