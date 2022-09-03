import React, { useCallback, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import auth from "../../../../Firebase__config";

import "./SiginIn.scss"
import SiginInFrom from '../../components/SiginInFrom/SiginInFrom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {  onAuthStateChanged, getAuth } from "firebase/auth";
import {AuthContext} from '../../../../contexts/AuthContextProvider';
import {AUTH__LOGIN} from '../../../../reducers/type'
const SiginIn = props => {
    const {Authur,dispatch}  = useContext(AuthContext)
    const handleSubmit =  useCallback(async (email,pass)=>{
        try{
            //  check valuedation of gamil 
            const user =await signInWithEmailAndPassword(auth,email,pass)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch({
                    type:AUTH__LOGIN,
                    payload:{
                      user:{
                        uid:user.uid,
                        email:user.email,
                        name:user.displayName?user.displayName:"Hi you",
                        photo__url:user.photo__url?user.photoURL:"https://images.pexels.com/photos/2527491/pexels-photo-2527491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                        phoneNumber:user.phoneNumber?user.phoneNumber:"",
                      }
                    }
                  })
                  console.log("new",Authur);
              });
            
            // ---------------------
           
        } catch(e){
            console.log(e);
        }
    })
    onAuthStateChanged(auth, (currentUser) => {
        console.log("auth state changed",currentUser);
    })
    return (
    <section className="SiginIn">
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