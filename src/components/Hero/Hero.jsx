import React from 'react'
import PropTypes from 'prop-types'
import "./Hero.scss"


import Video from '../../assets/Hero2.mp4'
const Hero = props => {
  return (
    <div className="Hero">
        <video src={Video} type="video/mp4"  muted autoPlay={"autoplay"} loop className='Hero__video'> 
        </video>
        <div className="Hero__Title">
            <div className="glitch" data-text="HEYYOU">HEYYOU</div>
            <div className="glow">HEYYOU</div>
            <p className="subtitle">HEYYOU DEVELOPER</p>
        </div>
    </div>
  )
}

Hero.propTypes = {}

export default Hero