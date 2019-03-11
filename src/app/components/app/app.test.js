import React from 'react'
import { default as AppComponent } from './app'
import { shallow, mount } from 'enzyme'
import { ModalComponent } from '../../../modal'

jest.mock('../../../modal')

describe('>>> App Component Test', () => {
  it('should render App Component', () => {
    const wrapper = shallow(<AppComponent />)
    expect(wrapper).toBeDefined()
  })

  describe('App Component method tests', () => {
    it('should displayModal and pass information to state', () => {
      const wrapper = mount(<AppComponent />)
      const values = []
      const header = ''
      wrapper.instance().displayModal(values, header)
      expect(wrapper.state('showModal')).toEqual(true)
      expect(wrapper.state('values')).toEqual(values)
      expect(wrapper.state('header')).toEqual(header)
    })
    it('should hideModal', () => {
      const wrapper = mount(<AppComponent />)
      const e = { preventDefault: jest.fn() }
      wrapper.instance().hideModal(e)
      expect(wrapper.state('showModal')).toEqual(false)
    })
  })
  describe('Testing conditional rendering of modal', () => {
    it('should diplay Modal', () => {
      const wrapper = shallow(<AppComponent />)
      expect(wrapper.find(ModalComponent).length).toEqual(0)
      wrapper.setState({ 'showModal': true })
      wrapper.setState({ 'values': [1, 2] })
      expect(wrapper.find(ModalComponent).length).toEqual(1)
    })
  })
})