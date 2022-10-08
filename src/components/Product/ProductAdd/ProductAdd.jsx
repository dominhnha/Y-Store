import React, { useState } from 'react'
import PropTypes from 'prop-types'
import "./ProductAdd.scss"
import { useCallback } from 'react';
import { AppUploadAvatarToDatabase } from '../../../api/Authencation/AuthencationStore';
import { async } from '@firebase/util';
import { AppcreateProduct } from '../../../api/Database/Product/Product';
import ListProduct from '../../../assets/ListProduct'
const ProductAdd = props => {
  // id
  // Title
  // img 1
  // img 2
  // quantity
  // price 
  // size 
  // color
  // trademark  
  //described 
    const [Title,setTitle] =  useState("");
    const [quantity,setQuantity] = useState(100);
    const [Img1,setImg1] = useState(null);
    const [Img2,setImg2] = useState(null);
    const [price,setprice] = useState(100);
    const [type,setType] = useState(null);
    const [size,setSize] = useState(["l","Xl","XXl"]);
    const [color,setColor] = useState(["black","blue","white"])
    const [desc,setDesc] = useState("Sự hiện diện của những chiếc áo thun basic cổ tròn trong tủ đồ của bạn chính là chìa khóa giúp cho bạn có thêm nhiều outfit thú vị mà lại không cần đến quá nhiều món đồ. Áo thun nữ cotton cổ tròn basic chính là vũ khí tiện dụng cho các chị em trong trang phục hàng ngày!<br><br><br>Thiết kế đơn giản, form dáng tiện lợi của áo thun PPN4502. Tại sao chỉ với 1 chiếc áo thun nữ basic mà bạn có thể phối với 10 bộ độ khác nhau? Câu trả lời nằm ở chính sự đơn giản của chúng. Càng đơn giản, bạn lại càng dễ mix & match với những món đồ khác nhau.Áo thun nữ PPM4502 có thiết kế cổ tròn đơn giản, nhẹ nhàng tôn da. Tay cáo, form áo cũng không hề cầu kỳ, rất dễ mặc với nhiều thân hình khác nhau. Đặc biệt hơn, màu sắc của chiếc áo phông nữ cổ tròn này cũng rất nhã nhặn, trung tính, trơn màu. Sự tối giản từ thiết kế, đường may đến bảng màu giúp các chị em không cần đắn đo quá nhiều khi lựa chọn. Chất liệu cotton 95% được xử lý nghiêm ngặt, quy trình và công nghệ hiện đại nên mang tới cho chiếc áo sự thoải mái, mềm mại, thoáng mát ngay khi chạm vào. Cùng với đó, áo thun nữ cotton cổ tròn Yody có khả năng thâm shuts mồ hôi rất tốt nên người mặc không bị cảm giác bí bách, dính dính trên da khi đổ mồ hôi vào mùa hè. Bên cạnh đó, sản phẩm cũng chưa 5% spandex - loại sợi giúp co giãn, đàn hồi hiệu quả thích hợp mặc tới nhiều môi trường, ngay cả khi vận động <br><br><br> Sự hiện diện của những chiếc áo thun basic cổ tròn trong tủ đồ của bạn chính là chìa khóa giúp cho bạn có thêm nhiều outfit thú vị mà lại không cần đến quá nhiều món đồ. Áo thun nữ cotton cổ tròn basic chính là vũ khí tiện dụng cho các chị em trong trang phục hàng ngày!<br><br><br>Thiết kế đơn giản, form dáng tiện lợi của áo thun PPN4502. Tại sao chỉ với 1 chiếc áo thun nữ basic mà bạn có thể phối với 10 bộ độ khác nhau? Câu trả lời nằm ở chính sự đơn giản của chúng. Càng đơn giản, bạn lại càng dễ mix & match với những món đồ khác nhau.Áo thun nữ PPM4502 có thiết kế cổ tròn đơn giản, nhẹ nhàng tôn da. Tay cáo, form áo cũng không hề cầu kỳ, rất dễ mặc với nhiều thân hình khác nhau. Đặc biệt hơn, màu sắc của chiếc áo phông nữ cổ tròn này cũng rất nhã nhặn, trung tính, trơn màu. Sự tối giản từ thiết kế, đường may đến bảng màu giúp các chị em không cần đắn đo quá nhiều khi lựa chọn. Chất liệu cotton 95% được xử lý nghiêm ngặt, quy trình và công nghệ hiện đại nên mang tới cho chiếc áo sự thoải mái, mềm mại, thoáng mát ngay khi chạm vào. Cùng với đó, áo thun nữ cotton cổ tròn Yody có khả năng thâm shuts mồ hôi rất tốt nên người mặc không bị cảm giác bí bách, dính dính trên da khi đổ mồ hôi vào mùa hè. Bên cạnh đó, sản phẩm cũng chưa 5% spandex - loại sợi giúp co giãn, đàn hồi hiệu quả thích hợp mặc tới nhiều môi trường, ngay cả khi vận động")
    const InitProduct = ()=>{
      setTitle("");
      setImg1(null);
      setImg2(null);
    }
    const AddProduct = async(e)=>{
      //e.preventDefault();
      try{

        // ListProduct.map(async (item,index)=>{
        //   console.log(item.Img1.name);
          // const PrePImg1 = await  AppUploadAvatarToDatabase(item.Img1);
          // const PrePImg2 = await  AppUploadAvatarToDatabase(item.Img2);
          // const CurPImg1 = PrePImg1 ? PrePImg1 :"https://wall.vn/wp-content/uploads/2019/11/hinh-meo-de-thuong-66-768x512.jpg";
          // const CurPImg2 = PrePImg2 ? PrePImg2 :"https://wall.vn/wp-content/uploads/2019/11/hinh-meo-de-thuong-66-768x512.jpg";
          // const initProduct = await AppcreateProduct(item.title,item.quantity,item.price,item.color,CurPImg1,CurPImg2,item.desc,item.Type,item.size);
        //   console.log(index,item);
        // })
        console.log("name img" ,Img1.name)
        const PreImg1 = await  AppUploadAvatarToDatabase(Img1);
        const PreImg2 = await  AppUploadAvatarToDatabase(Img2);
        
        const CurImg1 = PreImg1 ? PreImg1 :"https://wall.vn/wp-content/uploads/2019/11/hinh-meo-de-thuong-66-768x512.jpg";
        const CurImg2 = PreImg2 ? PreImg1 :"https://wall.vn/wp-content/uploads/2019/11/hinh-meo-de-thuong-66-768x512.jpg";
        const initProduct = await AppcreateProduct(Title,quantity,price,color,CurImg1,CurImg2,desc,type,size);
        console.log(initProduct);
        InitProduct();
      }catch(e){
        console.log(e);
      }
    } 
  return (
    <div className="product">
        <div className="container">
          <div className="product__from">
          <h2 className="product__header">Add Product</h2>
              <div className="product__group">
                <label className={`product__title `}>Title</label>
                <input 
                  type="text" 
                  className={`product__input`}
                  onChange={(e)=>{setTitle(e.target.value)}}
                  value={Title}
                />
              </div>
              <div className="product__group">
                <label className={`product__title `}>Type</label>
                <input 
                  type="text" 
                  className={`product__input`}
                  onChange={(e)=>{setType(e.target.value)}}
                  value={type}
                />
              </div>
              <div className="product__group">
                <label className={`product__title `}>Img1</label>
                <input 
                  type="file" 
                  className={`product__input`}
                  onChange={(e)=>setImg1(e.target.files[0])}
                />
              </div>
              <div className="product__group">
                <label className={`product__title `}>Img2</label>
                <input 
                  type="file" 
                  className={`product__input`}
                  onChange={(e)=>setImg2(e.target.files[0])}
                />
              </div>
              <div className="product__submit">
                  <button 
                  className="product__submit__button"
                  onClick={(e)=>AddProduct(e)}
                  > submit</button>
              </div>
          </div>    
        </div>
    </div>
  )
}

ProductAdd.propTypes = {}

export default ProductAdd