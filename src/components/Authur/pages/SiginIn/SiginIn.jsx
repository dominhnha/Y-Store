import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import auth from "../../../../Firebase__config";

import "./SiginIn.scss"
import SiginInFrom from '../../components/SiginInFrom/SiginInFrom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {  onAuthStateChanged, getAuth } from "firebase/auth";
import {AuthContext} from '../../../../contexts/AuthContextProvider';
import {AUTH__LOGIN} from '../../../../reducers/type'
import { AppGetUserToDatabase, AppsignInWithEmailAndPasswor } from '../../../../api/Authencation/Authencation';
import Loading from '../../../Loading/Loading';
const SiginIn = props => {
    const {Authur,dispatch}  = useContext(AuthContext)
    const [isLoading,setIsloading] = useState(false);
    const handleSubmit =  useCallback(async (email,pass)=>{
        try{
            setIsloading(true);
            const user = await AppsignInWithEmailAndPasswor(email, pass);
            const UserInfo = await AppGetUserToDatabase(user.uid);
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
                console.log(UserInfo)     
            } 
        } catch(e){
            console.log(e);
        }finally{
            setIsloading(false);
        }
    })
    onAuthStateChanged(auth, (currentUser) => {
        console.log("auth state changed",currentUser);
    })
    return (
    <section className="SiginIn">
         {
            isLoading && <Loading/>
        }
        <div className="conatiner"> 
            <div className="SiginIn__form">
                <h1 className="SiginIn__title">Sign In</h1>
                <SiginInFrom
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    </section>
  )
}

SiginIn.propTypes = {}

export default SiginIn