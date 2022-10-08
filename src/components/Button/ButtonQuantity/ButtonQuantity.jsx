import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import "./ButtonQuantity.scss";
import { useRef } from 'react';

const ButtonQuantity = props => {
    const number = props.number ? props.number : 1;
    const decrease = props.decrease ? props.decrease : undefined;
    const increase = props.increase ? props.increase : undefined; 
    //preventDefault
    const refButtonQuantity = useRef(null);
    console.log(refButtonQuantity)
  return (
    <div className='ButtonQuantity' ref={refButtonQuantity}>
        <div className="ButtonQuantity__decrease " onClick={(e)=>decrease(e)}>
            <i className='bx bx-checkbox-minus'></i>
        </div>
        <div className="ButtonQuantity__content ">
                 {number}   
        </div>
        <div className="ButtonQuantity__increase " onClick={(e)=>increase(e)}>
            <i className='bx bx-message-square-add'></i>
        </div>
    </div>
  )
}

ButtonQuantity.propTypes = {
    number: PropTypes.number.isRequired,
    decrease: PropTypes.func.isRequired,
    increase: PropTypes.func.isRequired,
}

export default ButtonQuantity