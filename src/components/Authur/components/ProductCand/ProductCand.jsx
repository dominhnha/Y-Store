import React,{useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import "./ProductCand.scss"
import { useRef } from 'react';
import { useCallback } from 'react';
import { async } from '@firebase/util';
import ButtonQuantity from '../../../Button/ButtonQuantity/ButtonQuantity';
import Button from '../../../Button/Button/Button';
import { AppDeleteUserProductDatabase, AppGetUserToDatabase, AppUpdataUserProductDatabase } from '../../../../api/Authencation/Authencation';
import { AuthContext } from '../../../../contexts/AuthContextProvider';
import {AUTH__LOGIN} from '../../../../reducers/type'

const ProductCand = props => {
    const product = props.product ? props.product : null;
    const checked = props.checked ? props.checked : false;
   
    const {Authur,dispatch}  = useContext(AuthContext)
    const [quantity,setQuantity] = useState(null);
    const [changeActive,setchangeActive] = useState(false);
    // function
    //-----------------quantity-----------------
    const decrease = (e)=>{
      e.preventDefault() 
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    }
    const increase = (e)=>{
      e.preventDefault() 
      setQuantity(quantity + 1)
    }
    // set Quantity 
    useEffect(()=>{
      const indexQuantity = product.quatity ? product.quatity : 0;
      setQuantity(indexQuantity);
    },[])


    //---------------- changeProduct--------------------
    const ActiveChangeProduct = async(e)=>{
      e.preventDefault() 
      setchangeActive(true)
    }
    //---------------- saveProduct--------------------
    const ActiveSaveProduct = async(e,Quantity)=>{
      e.preventDefault() 
      try{
          setchangeActive(false)
          await AppUpdataUserProductDatabase(Authur.uid,product.idCart,{
            ProductID:product.id,
            color:product.color,  
            quatity:Quantity,
            size:product.size,
          })
          const UserInfo = await AppGetUserToDatabase(Authur.uid);
          dispatch({
            type:AUTH__LOGIN,
            payload:{
                user:{
                    uid:Authur.uid,
                    UserInfo
                }
            }
          })
          console.log(UserInfo)   
      }catch (err) {
        console.log(err)
      }
    }
     //----------------const RemoveProduct--------------------
    const handleRemove = async(e)=>{
      e.preventDefault();
      await AppDeleteUserProductDatabase(Authur.uid,product.idCart);
      const UserInfo = await AppGetUserToDatabase(Authur.uid);
      dispatch({
        type:AUTH__LOGIN,
        payload:{
            user:{
                uid:Authur.uid,
                UserInfo
            }
        }
    })   
    }
  return (
    <label className='ProductCand' 
     onClick={props.onClick ? props.onClick : null} 
    >
      <div className="ProductCand__checkbox">
        <input 
            type="checkbox"  
            className="ProductCand__input" 
            checked={checked}
            onChange={props.onChange ? props.onChange : null}
          />
      </div>
      <div className="ProductCand__body">
        <div className="ProductCand__img">
          <img src={product.Img2} alt="Img Products" />
        </div>
        <div className="ProductCand__info">
          <div className="ProductCand__top">
            <p className="ProductCand__id">{product.id}</p>
            <h2 className="ProductCand__title">{product.title}</h2>
          </div>
          <div className="ProductCand__bottom">
            <p>{product.price}$/1</p>
          </div>
        </div>
        <div className="ProductCand__Quantity">         
          <div className="ProductCand__Quantity__wapper">
            {
               changeActive ==  false 
               ? 
                <div className='ProductCand__Quantity__view'>{quantity}</div>
               : 
               <ButtonQuantity
                number={quantity}
                decrease={decrease}
                increase={increase}
              />
             }
            
            
          </div>
          <div className="ProductCand__button">
            {
              changeActive ==  false 
              ? 
                <Button
                onClick={(e)=> ActiveChangeProduct(e)}
                >
                  chỉnh sửa
                </Button>
              : 
                <Button
                onClick={(e)=> ActiveSaveProduct(e,quantity)}
                >
                  Lưu
                </Button>
            }
            

          </div>
        </div>

      </div>
      <div className="ProductCand__delete"
        onClick={
          product != undefined 
          ? (e)=>handleRemove(e)
          : undefined
        }
      >
        <button 
          className='ProductCand__delete__btn'>
          <i className='bx bx-trash'></i>
        </button>
      </div>
       
        
    </label>
  )
}

ProductCand.propTypes = {}

export default ProductCand