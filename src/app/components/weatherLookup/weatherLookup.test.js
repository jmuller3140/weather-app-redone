import React from 'react'
import { default as WeatherLookupComponent } from './weatherLookup'
import { LoadingSpinnerComponent } from '../loading'
import { shallow, mount } from 'enzyme'
import * as Utils from '../../utils'

jest.mock('../../utils')
jest.mock('../../../weather')
describe('>>> WeatherLookupComponent Test', () => {
  let props
  beforeEach(() => {
    props = { displayModal: jest.fn() }

  })
  it('WeatherLookupComponent should render', () => {
    const wrapper = shallow(<WeatherLookupComponent />)
    expect(wrapper.find('form').length).toEqual(1)
  })

  describe('onSubmitListener', () => {
    it('should call runWeatherGenerator', () => {
      const wrapper = shallow(<WeatherLookupComponent />)
      const e = { preventDefault: jest.fn() }
      const spy = jest.spyOn(Utils, 'runWeatherGenerator')
      wrapper.instance().onSubmitListener(e)
      expect(spy).toBeCalled()
    })
  })
  describe('onChange', () => {
    it('should change value based on input', () => {
      const wrapper = shallow(<WeatherLookupComponent />)
      const e = { preventDefault: jest.fn(), target: { value: 'hi' } }
      Utils.cityLookup.mockReturnValue([{}])
      wrapper.instance().onChange(e)
      expect(wrapper.state('input')).toEqual('hi')
    })
    it('should change dropDown and showDropdown based on input', () => {
      const wrapper = mount(<WeatherLookupComponent />)
      const e = { preventDefault: jest.fn(), target: { value: 'new york' } }
      Utils.cityLookup.mockReturnValue([{}, {}])
      wrapper.instance().onChange(e)
      expect(wrapper.state('input')).toEqual('new york')
      expect(wrapper.state('dropDown').length).toEqual(2)
    })
  })

  describe('onClick', () => {
    it('should change cityId, input, and showDropdown', () => {
      const wrapper = shallow(<WeatherLookupComponent />)
      const item = { id: '1', name: 'New York' }
      wrapper.instance().onClick(item)
      expect(wrapper.state('cityId')).toEqual('1')
      expect(wrapper.state('input')).toEqual('New York')
      expect(wrapper.state('showDropdown')).toEqual(false)
    })
  })

  describe('onClickWeatherDetailDisplay', () => {
    it('should call displayModal and getWeatherDetailDisplay', () => {
      const wrapper = mount(<WeatherLookupComponent {...props} />)
      const e = { preventDefault: jest.fn() }
      const hours = {}
      const dayString = ''
      const spy = jest.spyOn(props, 'displayModal')
      const spy2 = jest.spyOn(Utils, 'getWeatherDetailDisplay')
      wrapper.instance().onClickWeatherDetailDisplay(e, hours, dayString)
      expect(spy).toBeCalled()
      expect(spy2).toBeCalled()
    })
  })

  describe('loading Spinner', () => {
    it('should render loading spinner if isLoading is true', () => {
      const wrapper = mount(<WeatherLookupComponent {...props} />)
      wrapper.setState({ isLoading: true })
      expect(wrapper.find(LoadingSpinnerComponent).length).toEqual(1)
      wrapper.setState({ isLoading: false })
      expect(wrapper.find(LoadingSpinnerComponent).length).toEqual(0)
    })
  })
})