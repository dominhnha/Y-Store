import React from 'react'
import PropTypes from 'prop-types'

const Emailinput = props => {
    const setValue = props.setValue ? props.setValue : undefined;
    const value = props.value ? props.value :'';
    const type = props.type ? props.type : "text";
    const placeholder = props.placeholder ? props.placeholder : undefined;
    //const erroMessage = props.erroMessage ? true : false; 
  return (
    <div className="from__group">
        <input
        type={type}
        value={value}  
        onChange={event => setValue(event.target.value)}
        className="input"
        placeholder={placeholder}
        />  
    </div>
        
  )
}

Emailinput.propTypes = {

}

export default Emailinput