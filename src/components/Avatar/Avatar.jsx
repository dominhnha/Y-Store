import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './Avatar.scss'
const Avatar = props => {
    const img = props.img ? props.img :"";
    const describe = props.describe ? props.describe : undefined;
    const path = props.path ? props.path : "/";
  return (
    <Link  to={`${path}`} className={"Avatar"}>
        <img src={img} alt={`${props.icon}`} />
        {
            describe && 
            <div className="Avatar__desc">
                {describe}
            </div>
        }
        
    </Link>
  )
}

Avatar.propTypes = {
    path: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    describe: PropTypes.string,
}

export default Avatar