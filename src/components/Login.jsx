import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import FromGrop from './InputFrom/FromGrop'
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase__config"

import {useLocation,matchPath, useMatch} from 'react-router-dom'
const Login = props => {
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emaiPass, setPassError] = useState("");
    const handleSubmit =  useCallback(async ()=>{
            try{
                //  check valuedation of gamil 
                if (/^([A-Za-z0-9_\-\.])+\@([gmail|GMAIL])+\.(com)$/.test(email)) {
                    // Valid  gmail id.
                    const user =await createUserWithEmailAndPassword(auth,email,pass);
                    console.log(" Invalid email or password");
                }else{
                    console.log(" erro Invalid email or password");
                }
            } catch(e){
                console.log(e);
            }
        
    })
    const localtion = useLocation();
    //const {math} = useMatch();
    //console.log(math);
    console.log(localtion);
  return (
     <main>
        <section className="login">
            
            <div className="container">
                <h1 className="login__title">
                Đăng nhập
                </h1>
                <form className="login__from">
                    <div className="login__from__group">
                        <FromGrop
                            setValue={setEmail}
                            type={"email"}
                            value={email}  
                            placeholder={"dominhnhat.dlc@gmail.com"}        
                        />
                        <FromGrop
                            setValue={setPass}
                            type={"password"}
                            value={pass}  
                            placeholder={"password"}    
                        />
                        <div className="login__from__btn" onClick={()=>handleSubmit()}>
                            Đăng Kí
                        </div>
                    </div>
                    {/* <div className="login__from__group">
                        <Emailinput
                            Email={email}
                            setEmail={setEmail}        
                        />
                    </div> */}
                </form>
                
            </div>
        </section>
     </main>
  )
}

Login.propTypes = {}

export default Login