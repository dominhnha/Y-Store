import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../../Firebase__config";
import SiginFrom from '../../components/SiginUpFrom/SiginUpFrom'
import '../SiginUp/SiginUp.scss'
const SiginUp = props => {

  const handleSubmit =  useCallback(async (email,pass)=>{
            try{
                //  check valuedation of gamil 
                const user =await createUserWithEmailAndPassword(auth,email,pass);
            } catch(e){
                console.log(e);
            }
    })
  return (
    <section className="login">
        <div className="container">
            <div className="login__form">
              <h1 className="login__title">Sign up</h1>
              <SiginFrom
                handleSubmit={handleSubmit}
              />
            </div>
        </div>
    </section>
  )
}

SiginUp.propTypes = {}

export default SiginUp