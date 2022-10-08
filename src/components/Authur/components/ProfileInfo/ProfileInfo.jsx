import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import './ProfileInfo.scss'

import { useState } from 'react'
import { AuthContext } from '../../../../contexts/AuthContextProvider';
import {AUTH__LOGIN} from '../../../../reducers/type'
import {updateProfile,getAuth,updatePhoneNumber, RecaptchaVerifier, PhoneAuthProvider} from 'firebase/auth'
import { AppGetUserToDatabase, AppUpdataUserToDatabase } from '../../../../api/Authencation/Authencation'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { getStorage } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from '../../../../Firebase__config'
import { AppUploadAvatarToDatabase } from '../../../../api/Authencation/AuthencationStore'
const ProfileInfo = props => {
    const auth = getAuth();
    // const Storage = getStorage();
  //const imageToBase64 = require('image-to-base64');

    const {Authur,dispatch}  = useContext(AuthContext);
    const [isActive,setIsActive] = useState(false);
    const {email, numberPhone ,address,username} = Authur.UserInfo.profile;
    //----------------- from--------------------
    const [Femail,setEmail] = useState(email?email:"Không tồn tại");
    const [Fname,setName] = useState(username?username:"");
    const [FnumberPhone,setNumberPhone] = useState(numberPhone?numberPhone:"");
    const [Faddress,setAddress] = useState(address?address:"");
    const [Avatar,setAvatar] = useState(null)
    // -----------------fuction------------------------
    const handleSubmit = async(e)=>{
      try{
        //  upload img database
        const PreImg = await  AppUploadAvatarToDatabase(Avatar);
        const CurImg = PreImg ? PreImg :"https://wall.vn/wp-content/uploads/2019/11/hinh-meo-de-thuong-66-768x512.jpg";

        //upload user Database
        const user = await  AppUpdataUserToDatabase(Authur.uid,Fname,Femail,Faddress,FnumberPhone,CurImg);

        //upload user app
        const UserInfo = await AppGetUserToDatabase(Authur.uid);
            if(user){
                dispatch({
                    type:AUTH__LOGIN,
                    payload:{
                        user:{
                            uid:user.uid,
                            UserInfo
                        }
                    }
                })   
            }
        //await updatePhoneNumber()
      }catch(e){
       console.error(e);   
      }
      await setIsActive(false)
      console.log("phone ",FnumberPhone);
    }
    const handleEdit = async(e)=>{
      await setIsActive(true)
    }

    return (
        <div className='ProfileInfo'>
        <div className="ProfileInfo__wapper">
          <h2 className="ProfileInfo__header">Thông tin tài khoản</h2>
          {
            isActive == false 
            ? <button 
                className="ProfileInfo__Button"
                onClick={ (e)=> handleEdit(e)}
              > 
                  chỉnh sửa
              </button>
            :<button 
              className="ProfileInfo__Button"
              onClick={ (e)=> handleSubmit (e)}
              >
                  lưu
              </button>
          }
          
        </div>
        <ul className="ProfileInfo__list">
            <li className="ProfileInfo__cand">
                <label className={`ProfileInfo__title `}>Email:</label>
                <input 
                  type="text" 
                  className={`ProfileInfo__input ${isActive==true ? 'active' : ''}`}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  value={Femail}
                  disabled={isActive==true ? false : true}
                  
                />
            </li>
            <li className="ProfileInfo__cand">
                <label className={`ProfileInfo__title `}>Name:</label>
                <input 
                  type="text" 
                  className={`ProfileInfo__input ${isActive==true ? 'active' : ''}`}
                  onChange={(e)=>{setName(e.target.value)}}
                  value={Fname}
                  disabled={isActive==true ? false : true}
                  
                />
            </li>
            <li className="ProfileInfo__cand">
                <label className="ProfileInfo__title">NumberPhone:</label>
                <input 
                  type="text" 
                  className={`ProfileInfo__input ${isActive==true ? 'active' : ''}`}
                  onChange={(e)=>{setNumberPhone(e.target.value)}}
                  value={FnumberPhone}
                  disabled={isActive==true ? false : true}
                />
            </li>
            <li className="ProfileInfo__cand">
                <label className="ProfileInfo__title">Address:</label>
                <input 
                  type="text" 
                  className={`ProfileInfo__input ${isActive==true ? 'active' : ''}`}
                  onChange={(e)=>{setAddress(e.target.value)}}
                  value={Faddress}
                  disabled={isActive==true ? false : true}
                />
            </li>
            <li className="ProfileInfo__cand">
                <label className="ProfileInfo__title">Avatar:</label>
                <input 
                  type="file" 
                  className={`ProfileInfo__input ${isActive==true ? 'active' : ''}`}
                  onChange={(e)=>setAvatar(e.target.files[0])}
                  //value={Avatar}
                  disabled={isActive==true ? false : true}
                />
                
            </li>
        </ul>
        {

          Avatar != "" && <img src={Avatar} alt="" /> 
        }
    </div>
  )
}

ProfileInfo.propTypes = {}

export default ProfileInfo