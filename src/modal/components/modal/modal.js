import React from 'react'
import './modal.scss'

const ModalComponent = ({ hideModal, values, header }) => {

  return (
    <div className="modal confirm" tabIndex="-1" role="dialog" onClick={hideModal}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className='modal-header d-flex justifiy-content-center'>
            <h1>{header}</h1>
          </div>
          <div className='modal-body'>
            <div>
              {values}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalComponent