import React, { Fragment } from 'react'
import { HeaderComponent } from '../header'
import { WeatherLookupComponent } from '../weatherLookup'
import { FooterComponent } from '../footer'
import { ModalComponent } from '../../../modal'


export default class AppComponent extends React.Component {
  constructor() {
    super()
    this.state = { showModal: false, values: [], header: '' }
    this.displayModal = this.displayModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  displayModal(values, header) {
    this.setState({ showModal: true, values, header })
  }
  hideModal(e) {
    e.preventDefault()
    this.setState({ showModal: false })
  }
  render() {
    const { showModal, values, header } = this.state
    return (
      <Fragment>
        <HeaderComponent />
        <WeatherLookupComponent displayModal={this.displayModal} hideModal={this.hideModal} />
        <FooterComponent />
        {(showModal && values.length !== 0) && (
          <ModalComponent values={values} hideModal={this.hideModal} header={header} />
        )}
      </Fragment>

    )
  }

}