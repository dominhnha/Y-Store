import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { uuidv4 } from '@firebase/util';
import "./ProductCard.scss"
const ProducCard = props => {
    const id =  props.id ? props.id :"404";
    const img01 = props.img01 ? props.img01 : null;
    const img02 = props.img02 ? props.img02 : null;
    const name = props.name ? props.name : "ERROR";
    const price = props.price ? props.price : "0000";
    const color = props.color ? props.color :[];
   

    const styleColorbox = (color)=>{
        return {
        width: "15px",
        height: "15px",
        borderRadius: "50%",
        backgroundColor:`${color}`,
        boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" ,
        }
    } 
  return (
    <Link to={`product/${id}`} className="product__card">
        <div className="product__card__image">
            <img src={img01} alt="Heyyou__product" className='product__card__01' />
            <img src={img02} alt="Heyyou__product" className='product__card__02'/>
        </div>
        <div className="product__card__body">
            <h3 className="product__card__name">{name}</h3>
            <h3 className="product__card__price">{ `${price}$`}</h3>
            <div className='product__card__wapper' >
            {
                color && color.map((item, index)=>{
                    return(
                        <div className="product__card__color"
                        style={styleColorbox(item)} 
                        key={`${uuidv4()}`}>
                        </div>
                    )
                })
                
            }   
            </div>
        </div>
        
       
    </Link>
  )
}

ProducCard.propTypes = {
    id: PropTypes.string.isRequired,
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.array,
}

export default ProducCard