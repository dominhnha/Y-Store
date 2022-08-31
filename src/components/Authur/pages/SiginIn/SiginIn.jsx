import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import auth from "../../../../Firebase__config";

import "./SiginIn.scss"
import SiginInFrom from '../../components/SiginInFrom/SiginInFrom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {  onAuthStateChanged, getAuth } from "firebase/auth";
const SiginIn = props => {
    const handleSubmit =  useCallback(async (email,pass)=>{
        try{
            //  check valuedation of gamil 
            const user =await signInWithEmailAndPassword(auth,email,pass)
            
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
                <h1 className="SiginIn__title">Sigin up</h1>
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