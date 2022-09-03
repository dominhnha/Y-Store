import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import MainRoutes from '../routes/MainRoutes'

import Header from '../components/Header'
import Footer from '../components/Footer'
const Layout = props => {
  return (
    <BrowserRouter>
        {/*  thêm cái components header ở đây thì nó load ko gồi kết luôn  */}
        <Header/>
            <main>
                <MainRoutes/>
            </main>
        <Footer/>
    </BrowserRouter>
  )
}

Layout.propTypes = {}

export default Layout
