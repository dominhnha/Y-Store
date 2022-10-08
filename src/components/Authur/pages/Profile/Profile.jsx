import React, { useContext ,useCallback  } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import "./Profile.scss"
import Icon from '../../../Icon';

import { AuthContext } from '../../../../contexts/AuthContextProvider';
import {AUTH__LOGOUT} from '../../../../reducers/type'
import Avatar from '../../../Avatar/Avatar';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import { AppsignOut } from '../../../../api/Authencation/Authencation';
import Loading from '../../../Loading/Loading';
import { useState } from 'react';

const Profile = props => {
    const {Authur,dispatch}  = useContext(AuthContext)
    const [isLoading,setIsloading] = useState(false);
    const auth = getAuth();
    const history = useNavigate();
    console.log("isAuthenticated",Authur);
    const SideBar = [
        {
            title:"User",
            path:"/account/profile",
            icon:"bx bx-user",
        },
        {
            title:"Cart",
            path:"/account/profile/cart",
            icon:"bx bx-cart",
        },
        {
            title:"address",
            path:"/account/profile/address",
            icon:"bx bxs-map",
        },
        {
            title:"logout",
            path:"/",
            icon:"bx bx-log-out",
        },

    ]
    // ------logout current user--------------
    const handleLogout = useCallback(async()=>{
        try{
            setIsloading(true);
            const user = await AppsignOut();
            if(user){
                
                dispatch({
                    type:AUTH__LOGOUT,
                    }
                )
                history("/");
            }
        }catch(error){

        }finally{
            setIsloading(false);
            
        }
        
    },[])
  return (
    <div className='Profile'>
        {
            isLoading && <Loading/>
        }
        
        <div className="container Profile__container">
            <ul className="Profile__Sidebar">
                <li className="Profile__Sidebar__header">
                    <Avatar
                        path={"/account/profile"}
                        img={`${Authur.UserInfo.profile.profile_picture}`}
                    />

                    <div className="Profile__Sidebar__waper">
                        <h2 className="Profile__Sidebar__name">{Authur.UserInfo.profile.username}</h2>
                        <p className="Profile__Sidebar__emai">{Authur.UserInfo.profile.email}</p>
                    </div>
                </li>
                {
                    SideBar.map((item, index)=>{
                        return(
                            <Link 
                                to={`${item.path}`} 
                                className="Profile__Sidebar__cand" 
                                onClick={ item.title == "logout" ? ()=>handleLogout() : ""}
                                key={index}
                            >
                                <Icon
                                    icon={`${item.icon}`} 
                                    path={`${item.path}`}
                                />
                                <p className="Profile__Sidebar__title">{item.title}</p>
                            </Link>
                        )
                    })
                }
            </ul>
            <div className="Profile__content">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile