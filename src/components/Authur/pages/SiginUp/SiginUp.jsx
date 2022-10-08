import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../../Firebase__config";
import SiginFrom from '../../components/SiginUpFrom/SiginUpFrom'
import {AppcreateUserWithEmailAndPassword, AppWriteUserToDatabase} from '../../../../api/Authencation/Authencation';
import '../SiginUp/SiginUp.scss'
import Loading from '../../../Loading/Loading';
const SiginUp = props => {
  const [isLoading,setIsloading] = useState(false);
  const handleSubmit =  useCallback(async (email,pass)=>{
            try{
                setIsloading(true);
                //  check valuedation of gamil 
                const user =await AppcreateUserWithEmailAndPassword (email ,pass);
                await AppWriteUserToDatabase(user.uid,user.email);
                console.log(user);
            } catch(e){
                console.log(e);
            } finally{
              setIsloading(false);
          }
    })
  return (
    <section className="login">
        {
            isLoading && <Loading/>
        }
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