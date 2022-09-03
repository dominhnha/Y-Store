import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useReducer } from 'react'
import {AuthReducer } from '../reducers/AuthReducer'
export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [Authur,dispatch] = useReducer(AuthReducer,"noLogin");
   
    // const toggleAuther = (value)=>{
    //     setAuthur(value);
    // }
    const AuthurContextData = {
        Authur,
        dispatch,
    }
        
    
  return (  
    <AuthContext.Provider value={AuthurContextData}>
        {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {}

export default  AuthContextProvider;