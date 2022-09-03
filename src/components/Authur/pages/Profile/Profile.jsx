import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import "./Profile.scss"
import Icon from '../../../Icon';
import { AuthContext } from '../../../../contexts/AuthContextProvider';
import Avatar from '../../../Avatar/Avatar';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
const Profile = props => {
    const {Authur}  = useContext(AuthContext);
    const SwichComponent = (params = "")=>{
        switch(params){
            default: return <ProfileInfo/>
        }
    }
  return (
    <div className='Profile'>
        <div className="container Profile__container">
            <ul className="Profile__Sidebar">
                <li className="Profile__Sidebar__header">
                    <Avatar
                        path={"/account/profile"}
                        img={`${Authur.photo__url}`}
                    />

                    <div className="Profile__Sidebar__waper">
                        <h2 className="Profile__Sidebar__name">{Authur.name}</h2>
                        <p className="Profile__Sidebar__emai">{Authur.email}</p>
                    </div>
                </li>
                <div className="Profile__Sidebar__cand">
                    <Link to={"/account/profile"}>
                    {/* <Icon
                        icon={"bx bx-cart"} 
                        path={"/account/profile"}
                    /> */}
                    <p className="Profile__Sidebar__title">User</p>
                    </Link>
                    
                </div>
                
                <div className="Profile__Sidebar__cand">
                    <Icon
                        icon={"bx bxs-map"} 
                        path={"/account/Profile/map"}
                    />
                    <p className="Profile__Sidebar__title">Map</p>
                </div>
                <div className="Profile__Sidebar__cand">
                    <Icon
                        icon={"bx bx-log-out"} 
                        path={"/account/Profile/logout"}
                    />
                    <p className="Profile__Sidebar__title">logout</p>
                </div>
            </ul>
            <div className="Profile__content">
                { <Routes>
                    <Route path='account/profile' element={<ProfileInfo/>}>
                        {/* <Route exact index  /> */}
                        <Route exact path="cart" element={<h1>oke</h1>}></Route>
                        <Route exact path="logout" element={<h1>oke</h1>}></Route>
                    </Route>
                        
                    </Routes> 
                }
                {/* {
                    SwichComponent()
                } */}
            </div>
        </div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile