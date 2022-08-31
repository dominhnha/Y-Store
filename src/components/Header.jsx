import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Logo from '../assets/images/logo_heyyou.png'
import { Link } from 'react-router-dom'
import Icon from './Icon'
const Header = props => {
  const navBar = [
    {
      title: 'Trang chủ',
      path: '/',
    },
    {
      title: 'Shop',
      path: '/shop',
    }
    ,{
      title:'giới thiệu',
      path: '/review',
    }
  ]

  const DomHeader  = useRef(null);
  // active navber menu 
  const activeNavbar = ()=>{
      DomHeader.current.classList.toggle('active');
  }
  //add even scroll in window 
  // useEffect(() => {
  //     window.addEventListener("scroll", () => {
  //         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
  //           DomHeader.current.classList.add('shrink')
  //         } else {
  //           DomHeader.current.classList.remove('shrink')
  //         }
  //     })
  //     return () => {
  //         window.removeEventListener("scroll")
  //     };
  // }, []);
  
  return (
    <header className='header' ref={DomHeader}>
        <div className="container">
            <div className="header__list">
                <div className="header__logo">
                  <Link to="/">
                    <img src={Logo} className="header__logo__img" alt="logo" />
                  </Link>
                </div>
                <nav className="header__nav">
                    {
                      navBar.map((item, index) => {
                        return (
                          <div className="header__nav__item" key={index}>
                              <Link to={item.path}>{item.title}</Link>
                          </div>
                        )
                      })
                    }
                    <i onClick={()=>activeNavbar()} className='header__nav__icon bx bx-chevron-left' ></i>
                </nav>
                <ul className="header__user">
                    <li className="header__user__item">
                        <Icon
                          icon={"bx bx-search"}
                          path={"/search"}
                          describe={"Search"}
                        />
                    </li>
                    <li className="header__user__item">
                        <Icon
                          icon={"bx bxs-heart"}
                          path={"/heart"}
                          describe={"Heart"}
                        />
                    </li>
                    <li className="header__user__item">
                        <Icon
                          icon={"bx bx-cart-alt"}
                          path={"/search"}
                          describe={"Cart"}
                          quantity={3}
                        />
                    </li>
                    <li className="header__user__item">
                        <Icon
                          icon={"bx bx-user"} 
                          path={"/account/login"}
                          describe={"login"}
                        />
                    </li>
                    
                </ul>
              <i onClick={()=>activeNavbar()} className='header__mobile bx bx-menu-alt-right'></i>
            </div>
        </div>
    </header>
  )
}

Header.propTypes = {}

export default Header