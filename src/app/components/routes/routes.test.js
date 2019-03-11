import React from 'react'
import { default as RoutesComponent } from './routes'
import { Route } from 'react-router-dom'
import { shallow } from 'enzyme'

describe('>>> Routes Component Test', () => {
  it('Routes Component should render', () => {
    const wrapper = shallow(<RoutesComponent />)
    expect(wrapper.find(Route).length).toEqual(1)
  })
})