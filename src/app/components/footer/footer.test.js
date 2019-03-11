import React from 'react'
import { default as FooterComponent } from './footer'
import { shallow } from 'enzyme'

describe('>>> Footer Component Test', () => {
  it('Footer Component should render', () => {
    const wrapper = shallow(<FooterComponent />)
    expect(wrapper.find('h5').length).toEqual(1)
  })
})