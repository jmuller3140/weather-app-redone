import React from 'react'
import { shallow } from 'enzyme'
import { default as ModalComponent } from './modal'
describe('>> Modal Component', () => {
  it('should render modal', () => {
    const props = { hideModal: jest.fn(), values: {}, header: '' }
    const wrapper = shallow(<ModalComponent {...props} />)
    expect(wrapper.find('div.modal.confirm').length).toEqual(1)
  })
})