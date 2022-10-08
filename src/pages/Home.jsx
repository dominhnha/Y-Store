import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Hero from '../components/Hero/Hero';
import Grid from '../components/Grid/Grid';
import Helmet from '../components/Helmet/Helmet';
import Section, { SectionBody, SectionTitle } from '../components/Section/Section';
import { useEffect } from 'react';

import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { AppGetAllProduct, AppGetLimitProduct } from '../api/Database/Product/Product';
import { AppAddUserProductDatabase, AppDeleteUserProductDatabase, AppGetUserToDatabase } from '../api/Authencation/Authencation';

const ProducCard = React.lazy(() => import('../components/Product/ProductCard/ProducCard'));

function Home(props) {
  const [ProductsBestSale,setProductsBestSale]  = useState([])
  const [Products,setProducts]  = useState([])
  //  get Product Best sale 
  useEffect(()=>{
    
    const getProductLimit = async()=>{
      const data =  await AppGetLimitProduct(17)
      setProducts(data);
    }
    getProductLimit()
  },[])
  //get user
  // const [User,setUser] = useState()
  // useEffect(()=>{
  //   try{
  //     const getUser = async()=>{
  //       const data =await AppDeleteUserProductDatabase('CKkFVefhzoUx3QOVVx76bg0bbMj1','-ND3qpcAyjlaqZ-BTX_z');
       
  //     }
  //     getUser();
      
  //   }catch(err){
  //     console.log(err);
  //   }
  // }
  // ,[])
  // console.log("is user",User);

   //  get Product Best sale 

  useEffect(()=>{
   
    const getProductLimit = async()=>{
      const data =  await AppGetLimitProduct(8)
      setProductsBestSale(data);
  
    }
    getProductLimit()
  },[])
 
  
  return (
    <Helmet title={"Home"}>
     
      <div className='Home__page'>
      {/* hero */}
      <Hero/>
      {/* product best salse */}
      <Section>
        <SectionTitle>
          Sản phẩm bán chạy
        </SectionTitle>
        <SectionBody>
          <div className="container">
            <Grid
              col={4}
              mdCol={2}
              smCol={2}
              gap={10}
            >
              {
                ProductsBestSale && ProductsBestSale.map((item,index)=>{
                  return(
                    <ProducCard
                      key={`bestSale__${index}`}
                      id = {`${item.id}`}
                      img01 = {`${item.Product.Img1}`}
                      img02 = {`${item.Product.Img2}`}
                      name = {`${item.Product.title}`}
                      price = {Number(item.Product.price)}
                      color = {item.Product.color}
                    ></ProducCard>
                  )
                })
              }
              
          
             
            </Grid>
          </div>
        </SectionBody>
      </Section>

      {/* product hight view  */}
      <Section>
        <SectionTitle>
          Sản phẩm nổi bật
        </SectionTitle>
        <SectionBody>
          <div className="container">
            <Grid
              col={4}
              mdCol={2}
              smCol={2}
              gap={10}
            >
              {
                Products && Products.map((item,index)=>{
                  return(
                    <ProducCard
                      key={`Producs__${index}`}
                      id = {`${item.id}`}
                      img01 = {`${item.Product.Img1}`}
                      img02 = {`${item.Product.Img2}`}
                      name = {`${item.Product.title}`}
                      price = {Number(item.Product.price)}
                      color = {item.Product.color}
                    ></ProducCard>
                  )
                })
              }
              
          
             
            </Grid>
          </div>
        </SectionBody>
      </Section>
        
      </div>
    </Helmet>
    
  )
}

Home.propTypes = {}

export default Home
