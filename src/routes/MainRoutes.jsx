import React from 'react'
import PropTypes from 'prop-types'
import { Route, Router, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import Product from '../pages/Product'



import SiginIn  from '../components/Authur/pages/SiginIn/SiginIn'
import SiginUp from '../components/Authur/pages/SiginUp/SiginUp'
import Profile from '../components/Authur/pages/Profile/Profile'

const Test = () => {
  console.log('Testing Account Components')
  return (
    <div className="div">
      oke
    </div>
  )
}
const MainRoutes = props => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/product' element={<Product />} />

      {/* <Route exact path='/account' element={<Test />} /> */}
      
      <Route exact path='account' >
        <Route exact index  element={<Test />} />
        <Route exact path='login' element={<SiginIn />}></Route>
        <Route exact path='SiginUp' element={<SiginUp />}></Route>
        <Route exact path='profile' element={<Profile />}></Route>
      </Route>
      {/* tinh nang dang phat trien  */}
      {/* <Route path='/account/login' element={<Login/>}/> */}
    </Routes>
  )
}

MainRoutes.propTypes = {}

export default MainRoutes