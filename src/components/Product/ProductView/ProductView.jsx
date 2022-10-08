import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './ProductView.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'

import { AppGetProductById } from '../../../api/Database/Product/Product';
import { uuidv4 } from '@firebase/util';
import ButtonQuantity from '../../Button/ButtonQuantity/ButtonQuantity'
import Button from '../../Button/Button/Button';
import { AppAddUserProductDatabase, AppGetUserToDatabase } from '../../../api/Authencation/Authencation';

import { useCallback } from 'react';
import { AuthContext } from '../../../contexts/AuthContextProvider';
import { AUTH__LOGIN } from '../../../reducers/type';


const ProductView = props => {
  // getUser 
  const {Authur,dispatch} = useContext(AuthContext);
  
  const [Product,setProduct] = useState("");
  const [IndexImg,setIndexImg] = useState("");
  const [IndexSize,setIndexSize] = useState("");
  const [IndexColor,setIndexColor] = useState("");
  const [quantity,setQuantity] = useState(1);

  const [title,setTitle] =  useState();
  const [size,setSize] = useState();

  const [loadMore,setLoadMore] = useState(false);

  // get Slug by Url 
  const {slug} = useParams();

  //  fectProduct is databased 
  useEffect(()=>{
    const getProduct = async()=>{
      const data =  await AppGetProductById(slug);
      console.log("data",data.size[0]);
      await setProduct(data);
      await setIndexImg(data.Img1);
      await setIndexSize(data.size[0])
      await setIndexColor(data.color[0])
    }
    getProduct();
  },[])
  //Slider Product

const handleActiveImg = (img)=>{
  setIndexImg(img);
}
const handleActiveSize = (size)=>{
  setIndexSize(size);
}
const handleActiveColor = (color)=>{
  setIndexColor(color);
}
const styleColorbox = (color)=>{
  return {
  backgroundColor:`${color}`,
  }
} 
// quantity
const decrease = (e)=>{
  e.preventDefault() 
  setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
}
const increase = (e)=>{
  e.preventDefault() 
  setQuantity(quantity + 1)
}
const handleAddToCart =  useCallback(
  async(Pid,Color,Size) => {
    try{
      if(Authur != "noLogin"){
          await AppAddUserProductDatabase(Authur.uid,{
            ProductID:Pid,
            quatity:quantity,
            color:Color,
            size:Size,
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
      }
    }catch(e){
      console.log(e)
    }
  },
  [],
)





  console.log("product",Product);
  return (
    <section className='ProductView'>
      <div className="container ProductView__container ">
        <div className="ProductView__modal">
          <div className="ProductView__Slider">
            <div className="ProductView__Slider__list">
              {
                Product && Product.Img1 &&
                <div className={`ProductView__Slider__item ${Product.Img1 == IndexImg ?"active" :""}`} onClick={()=>handleActiveImg(Product.Img1)}>
                  <img src={Product.Img1} alt="" />
                </div>
              }
              {
                Product && Product.Img2 &&
                <div className={`ProductView__Slider__item ${Product.Img2 == IndexImg ?"active" :""}`} onClick={()=>handleActiveImg(Product.Img2)}>
                  <img src={Product.Img2} alt="" />
                </div>
              } 
            </div>
            <div className="ProductView__Slider__view">
                {
                  Product && 
                    <img src={IndexImg} alt="" />
                }
              
            </div>
          </div>
          <div className="ProductView__Info">
                
                {
                  Product && Product.title 
                  ?<h1 className="ProductView__title">{Product.title}</h1>
                  :<h1 className="ProductView__title">XXXXXXX</h1>
                }
                
                {
                  
                  Product && Product.Type
                  ?<p className="ProductView__Type">Type  {Product.Type}</p>
                  :<p className="ProductView__Type">XXXXXXX</p>
                }
                {
                  Product && Product.price
                  ?<p className="ProductView__price">
                      sale
                       <span>{Product.price}$</span>
                    </p>
                  :<p className="ProductView__price">XXXXXXX</p>
                }
                <div className="ProductView__list__size">
                <p className="ProductView__list__title">Size</p>
                  {
                    Product && Product.size && Product.size.map((item)=>{
                      return (
                        <div
                        className={`ProductView__button__size ${item == IndexSize ? "activer" : ""}`}
                        onClick={()=>handleActiveSize(item)}
                          key={`Size__${uuidv4()}`}
                        >
                            {item}
                        </div>
                      )
                    })  
                    
                  } 
                </div>
                <div className="ProductView__list__color" >
                  <p className="ProductView__list__title">Color</p>
                    {
                    Product && Product.color.map((item, index)=>{
                      return(
                          <div className={`product__card__color ProductView__color ${item == IndexColor ? "activer" :""}`}
                          style={styleColorbox(item)} 
                          key={`${uuidv4()}`}
                          onClick={()=>handleActiveColor(item)}
                          >
                          </div>
                      )
                    })
                  }
                </div>
                <div className="ProductView__quantity">
                <p className="ProductView__list__title ProductView__quantity--title ">Quantity</p>
                  <ButtonQuantity
                    number={quantity}
                    decrease={decrease}
                    increase={increase}
                  />
                </div>
                <div className="ProductView__wapper">
                  <Button onClick={()=>handleAddToCart(`${slug}`,IndexColor,IndexSize)}>Thêm vào giỏ</Button>
                  <Button >Mua ngay</Button> 
                </div>
          </div>

        </div>
        <div className="ProductView__bottom">
          <div className="ProductView__bottom__title">Giới thiệu sản phẩm</div>
          <p className={`ProductView__desc ${ loadMore==true ? "activer" : ""}`}>
                  { Product && `${Product.desc}`}
          </p>
          <div className="ProductView__loadMore">
          {
            loadMore 
            ? <Button onClick={()=>setLoadMore(false)} >Rút gọn</Button> 
            : <Button onClick={()=>setLoadMore(true)}>Xem Thêm</Button>
          }
          </div>
          
           
        </div>
      </div>
      
    </section>
  )
}

ProductView.propTypes = {}

export default ProductView