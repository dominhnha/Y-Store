import React from 'react'
import PropTypes from 'prop-types'
import { Route, Router, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import Product from '../pages/Product'


// lazy loading
const SiginIn = React.lazy(() => import('../components/Authur/pages/SiginIn/SiginIn'));
const SiginUp  = React.lazy(() => import('../components/Authur/pages/SiginUp/SiginUp'));
const Profile = React.lazy(() => import('../components/Authur/pages/Profile/Profile'));
const InfoProfile = React.lazy(() => import('../components/Authur/components/ProfileInfo/ProfileInfo'));
const ProfileCart = React.lazy(() => import('../components/Authur/components/ProfileCart/ProfileCart'));
const ProfileAddress = React.lazy(() => import('../components/Authur/components/ProfileAddress/ProfileAddress'));
const ProductAdd = React.lazy(() => import('../components/Product/ProductAdd/ProductAdd'));
const ProductView = React.lazy(() => import('../components/Product/ProductView/ProductView'));
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
      {/* <Route exact path='/product' element={<Product />} /> */}
      {/* ----------------------product---------------------  */}
      <Route exact path='product'>
          <Route exact index element={<Test />}></Route>
          <Route exact path='add' element={<ProductAdd/>}></Route>
          <Route exact path=':slug' element={<ProductView/>}></Route>
      </Route>
      <Route exact path='account' >
        {/*---------------------- login-----------------------  */}
        <Route exact index  element={<Test />} />
        <Route exact path='login' element={<SiginIn />}></Route>
        <Route exact path='SiginUp' element={<SiginUp />}></Route>
        {/* ----------------------profile--------------------- */}
        <Route exact path='profile' element={<Profile />}>
          <Route exact index element={<InfoProfile />}></Route>
          <Route exact path='cart' element={<ProfileCart />}></Route>
          <Route exact path='address' element={<ProfileAddress />}></Route>
        </Route>
      </Route>
    </Routes>
  )
}

MainRoutes.propTypes = {}

export default MainRoutes