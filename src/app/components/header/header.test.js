import React from 'react'
import { default as HeaderComponent } from './header'
import { shallow } from 'enzyme'

describe('>>> Header Component Test', () => {
  it('Header Component should render', () => {
    const wrapper = shallow(<HeaderComponent />)
    expect(wrapper.find('h1').length).toEqual(1)
  })
})