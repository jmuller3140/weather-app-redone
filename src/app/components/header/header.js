import React from 'react'
import logo from '../../../assets/imgs/cloud.png'
const HeaderComponent = () => (
  <div className='d-flex align-items-center justify-content-start mb-5 border-bottom border-light'>
    <h1 className='pl-5'><img src={logo} alt='cloud logo' className='pr-5' height='200px' width='250px' />The Weather App</h1>
  </div>
)

export default HeaderComponent