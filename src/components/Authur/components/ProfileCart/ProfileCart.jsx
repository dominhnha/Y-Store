import React, { useCallback, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import "./ProfileCart.scss"
import ProductCand from '../ProductCand/ProductCand'
import { useEffect } from 'react'
import { AuthContext } from '../../../../contexts/AuthContextProvider'
import { AppGetProductById } from '../../../../api/Database/Product/Product'
import { v4 } from "uuid";


const ProfileCart = props => {
  const [Product,setProduct] = useState([]);
  const [ProductChecked,setProductChecked] = useState([]);


  const {Authur} = useContext(AuthContext);
  //get product in id API firebase
  const getProductByID = async(pid)=>{
    return await AppGetProductById(`${pid}`);
  }
  // --------------------------Get Product Api--------------------------//
  const handleMapData = (ListCartUser)=>{
    
    return ListCartUser.map(async(item)=>{
      // getProduct bu API
      //console.log("i",item)
      const curItem = await getProductByID(item.ProductID)
      // contructor Product 
      return  await  {
        idCart:item.idCart,
        id:item.ProductID,
        Img1:curItem.Img1,
        Img2:curItem.Img2,
        color:item.color,
        size:item.size,
        quatity:item.quatity,
        title:curItem.title,
        price:curItem.price,
      }
    })
  }
  // get product by Authur cart
  useEffect(()=>{
    const getProductByUser = async ()=>{
      try{
        if(Authur !== "noLogin" ){
          console.log("this",Authur)
          const ListCartUser = Object.entries(Authur.UserInfo.product.cart);
        
          console.log("ListCartUser",ListCartUser);
          const IndexListCartUser = ListCartUser.map(item=>{
            const infoProduct = Object.freeze(item[1]);
            return {
              idCart:item[0],
              ProductID:item[1].ProductID,
              color:item[1].color,  
              quatity:item[1].quatity,
              size:item[1].size,
            }
          })
          console.log("IndexListCartUser",IndexListCartUser)
          const ListProduct = await Promise.all(handleMapData(IndexListCartUser))
          return setProduct(ListProduct)
        }
      }catch(e){
        console.log(e)
        setProduct([])
      }
    }
    getProductByUser();
  },[Authur])

  // --------------------------Product event--------------------------//
  // handle active checked 
  const  handleActiveChecked = useCallback(
    (ID,Arr)=>{
   
      if(Arr.includes(ID) == false){
        setProductChecked([...Arr,ID]);
       
      }
    }
  ,[]) 

  const handleRemoveChecked = useCallback(
    (ID,Arr)=>{
      
      const newProductChecked = Arr.filter(item=>{  
        return item !== ID;
      })
      console.log("Arr",Arr)
      console.log("Arr",newProductChecked)
      setProductChecked(newProductChecked);
    }
    ,[]) 
    
    const handleChecked =  useCallback((checked,ID,Arr)=>{
      if(checked == false){
        console.log("active")
        handleActiveChecked(ID,Arr);
        
      }else{
        console.log("remove")
        handleRemoveChecked(ID,Arr);
      }
    },[])

 
    
  console.log("Product Cart",Product);
  console.log("ProductChecked",ProductChecked);
  return (
    <div className='ProfileCard'>
      <div className="ProfileCard__wapper">
        <h2 className="ProfileCard__header">Giỏ hàng</h2>
        <div className="ProfileCard__list">
          {
            Product.length > 0 && Product.map(item=>{
             
              let Itemchecked = ProductChecked.includes(item.id) ? true : false
              return (
                <ProductCand
                  key={`${v4()}`}
                  product={item}
                  checked={Itemchecked}
                  onChange ={()=>handleChecked(Itemchecked,item.id,ProductChecked)}
                  
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

ProfileCart.propTypes = {}

export default ProfileCart