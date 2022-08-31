import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import { Link } from 'react-router-dom'
import Page from '../assets/images/page.jpg'
function Footer(props) {
  const navLink = [
    {
      title: 'Tìm kiếm',
      path:"/search",
    },
    {
      title: 'Giới thiệu',
      path:"/review",
    }
    ,{
      title: 'Chính sách đổi trả',
      path:"/review",
    },
    {
      title: 'Chính sách bảo mật',
      path:"/review",
    }
  ]
  return (
    <footer className='footer'>
      <div className="container">
        <Grid
          col={4}
          mdCol={2}
          smCol={1}
          gap={2}
        >
          <ul className="footer__cand">
              <h1 className="footer__title">heyyoustudiovn</h1>
              <p className="footer__desc">Heyyou! - Thương hiệu quốc dân</p>
              {/* <p className='footer__address'>
                  <p>- Bình Thạnh: 115-117 đường Võ Oanh, phường 25</p>
                  <p>
                      - Thủ Đức: 57 đường số 10, khu phố 4, phường Tam Bình
                  </p>
                  <p>
                      - Phú Nhuận: 182/13A Lê Văn Sỹ, Phường 10
                  </p>
                  <p>
                    TP Cần Thơ:
                      <p>
                      - Ninh Kiều: 110/5/2 hẻm 5 đường Nguyễn Việt Hồng, Phường An Phú
                      </p> 
                  </p>
              </p> */}
              <a href="" className='footer__contact'><i className='bx bxs-phone'></i> 1900 866632</a>
              <a href="" className='footer__contact'><i className='bx bxl-gmail' ></i> heyyoustudiovn@gmail.com</a>
          </ul>
          <div className="footer__cand">
            <h1 className="footer__title">Liên kết</h1>
            {
              navLink.map((item,index)=>{
                return(
                  <Link  to={`${item.path}`} key={index} className="footer__link">
                    {item.title}
                  </Link>
                )
              })
            }
          </div>
          <div className="footer__item">
            <h1 className="footer__title">Fanpage</h1>
            <img src={Page} alt="" className='footer__img'/>
          </div>
          <div className="footer__item">
            <h1 className="footer__title">Đăng ký nhận khuyến mãi</h1>
            <p className="footer__desc">
              Hãy là người đầu tiên nhận khuyến mãi lớn!
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  )
}

Footer.propTypes = {}

export default Footer
