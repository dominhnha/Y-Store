import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Logo from '../assets/images/logo_heyyou.png'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import {useNavigate} from 'react-router-dom'
import {AUTH__LOGIN} from '../reducers/type'
import {AuthContext} from '../contexts/AuthContextProvider';
import auth from '../Firebase__config'
import Avatar from './Avatar/Avatar'

import { getDatabase } from 'firebase/database'

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
  // load auth
  const {Authur} = useContext(AuthContext);
  const [quantity,setQuantity] = useState(0);


  useEffect(() => {
    const handleQuantity = ()=>{
      if(Authur == "noLogin"){
        setQuantity(0);
      }else if (Authur.UserInfo.product.cart ==null || Authur.UserInfo.product.cart == undefined){
        setQuantity(0);
      }else{
        setQuantity(Object.values(Authur.UserInfo.product.cart).length)
      }
    }
    handleQuantity();
  
  }, [Authur])
  
  console.log('load auth',Authur);

  

 
  const database = getDatabase();
  // console.log('database',auth.currentUser.uid);
 
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
                              <Link onClick={()=>activeNavbar()} to={item.path}>{item.title}</Link>
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
                          path={"/shop"}
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
                          path={Authur !== "noLogin" ? "/account/profile/cart" : "account/login"}
                          describe={"Cart"}
                          quantity={quantity}
                        />
                    </li>
                    {
                      Authur !== "noLogin"
                       ?<Avatar
                          img={`${Authur.UserInfo.profile.profile_picture}`}
                          describe={`${Authur.UserInfo.profile.username}`}
                          path={"account/profile"}
                       />
                       :
                       <li className="header__user__item">
                        <Icon
                          icon={"bx bx-user"} 
                          path={"/account/login"}
                          describe={"login"}
                        />
                      </li> 
                    }
                    
                    
                </ul>
              <i onClick={()=>activeNavbar()} className='header__mobile bx bx-menu-alt-right'></i>
            </div>
        </div>
    </header>
  )
}

Header.propTypes = {}

export default Header