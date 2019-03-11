import React from 'react'
import { shallow } from 'enzyme'
import { default as DailyWeatherComponent } from './dailyWeather'
describe('>> DailyWeather Component', () => {
  it('should render DailyWeatherComponent', () => {
    const props = { day: { dayString: '', maxTemp: '', minTemp: '', hours: {}, weatherIcon: '', weatherDescription: '' } }
    const wrapper = shallow(<DailyWeatherComponent {...props} />)
    expect(wrapper.find('div').length).toEqual(6)
  })
})