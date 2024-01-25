import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import logoImage from '../../images/291-data-excel.png';
import logoImage1 from '../../images/291-mos-word.png';
import logoImage2 from '../../images/291-tin-hoc-van-phong.png';
import logoImage3 from '../../images/291-ud-cntt-co-ban.png';
import KhoaHoc from './TrangChuKhoaHoc'
import DichVu from './TrangChuDichVu'
import TrangChuGV from './TrangChuGiangVien'


function MyCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel className="custom-carousel" interval={4000} controls={false} indicators onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={logoImage}
                    alt=""
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={logoImage1}
                    alt=""
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={logoImage2}
                    alt=""
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={logoImage3}
                    alt=""
                />
            </Carousel.Item>
        </Carousel>
    );
};


// function KhoaHoc() {
//     return (
//         <>
//             <div className="khoa-hoc-container">
//                 <div className="section-title">
//                     <h2 className="tieu-de-muc" style={{ "marginTop": "0" }}>
//                         <img src={CTĐT}
//                         />
//                         <span>Chương trình Đào tạo</span>
//                     </h2>
//                 </div>
//                 <div className="wpb_column vc_column_container vc_col-sm-12">
//                     <div className="tranning-inner">
//                         <div className="wpb_wrapper">
//                             <div className="tranning-list" data-offset="1" data-template="courses/grid">
//                                 <div className="form-group category-search visible-xs" style={{ "padding": "0" }}>
//                                     <div className="border-textbox styled-select">
//                                         <span style={{ "position": 'relative', 'display': 'block', 'direction': 'ltr' }}>
//                                             <select className='form-control ctdt-list'>
//                                                 <option value='1' defaultValue='selected'>Đồ họa</option>
//                                                 <option value='3'>Thiết kế Web - SEO</option>
//                                                 <option value='4'>Lập trình ứng dụng</option>
//                                                 <option value='5'>Lập trình Mobile</option>
//                                                 <option value='12'>Data Science</option>
//                                                 <option value='14'>Data Analysis</option>
//                                                 <option value='16'>DevOps Engineer</option>
//                                                 <option value='7'>Mạng máy tính</option>
//                                                 <option value='10'>Tin học văn phòng </option>
//                                                 <option value='11'>Tin học Quốc tế</option>
//                                                 <option value='6'>Kiểm thử phần mềm</option>
//                                             </select>
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className="tranning-list-terms heading-font hidden-xs">
//                                     <div className='tranning-list-term active do-hoa-da-truyen-thong' data-term='1'>Đồ
//                                         họa</div>
//                                     <div className='tranning-list-term thiet-ke-website' data-term='3'>Thiết kế Web -
//                                         SEO</div>
//                                     <div className='tranning-list-term lap-trinh-va-csdl' data-term='4'>Lập trình ứng
//                                         dụng</div>
//                                     <div className='tranning-list-term lap-trinh-di-dong' data-term='5'>Lập trình Mobile
//                                     </div>
//                                     <div className='tranning-list-term data-science-machine-learning' data-term='12'>
//                                         Data Science</div>
//                                     <div className='tranning-list-term data-analysis' data-term='14'>Data Analysis</div>
//                                     <div className='tranning-list-term devops-engineer' data-term='16'>DevOps Engineer
//                                     </div>
//                                     <div className='tranning-list-term mang-may-tinh' data-term='7'>Mạng máy tính</div>
//                                     <div className='tranning-list-term tin-hoc-van-phong' data-term='10'>Tin học văn
//                                         phòng </div>
//                                     <div className='tranning-list-term thvp-chuan-quoc-te-mos' data-term='11'>Tin học
//                                         Quốc tế</div>
//                                     <div className='tranning-list-term kiem-thu-phan-mem' data-term='6'>Kiểm thử phần
//                                         mềm</div>
//                                 </div>
//                                 <div className="tranning-list-grid" data-pages="11">
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <div className='new-trainning'></div>
//                                                 <a href='/do-hoa-da-truyen-thong/Chuyen-vien-thiet-ke-Do-hoa-va-Web_188'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/Chuyen-vien-Do-hoa-web-273x164.jpg'
//                                                             alt='' title='Chuyên viên Thiết kế Đồ hoạ & Web'
//                                                             src='/data/images/mon-hoc/do-hoa/Chuyen-vien-Do-hoa-web-273x164.jpg'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a
//                                                         href='/do-hoa-da-truyen-thong/Chuyen-vien-thiet-ke-Do-hoa-va-Web_188'>
//                                                         <h5>Chuyên viên Thiết kế Đồ hoạ & Web</h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>12 tháng</div>
//                                                     <div className='prices pl-25'>
//                                                         <div className='price old-gach'>26.000.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/Chuyen-vien-thiet-ke-Do-hoa-va-Web_188#lich-khai-giang'>20.000.000đ</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <a href='/do-hoa-da-truyen-thong/chuyen-vien-thiet-ke-do-hoa--noi-that_184'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/Chuyen-vien-Do-hoa-noi-that-273x164.jpg'
//                                                             alt=''
//                                                             title='Chuyên viên Thiết kế Đồ hoạ & Nội thất'
//                                                             src='/data/images/mon-hoc/do-hoa/Chuyen-vien-Do-hoa-noi-that-273x164.jpg'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a
//                                                         href='/do-hoa-da-truyen-thong/chuyen-vien-thiet-ke-do-hoa--noi-that_184'>
//                                                         <h5>Chuyên viên Thiết kế Đồ hoạ & Nội thất</h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>12 tháng</div>
//                                                     <div className='prices pl-25'>
//                                                         <div className='price old-gach'>26.600.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/chuyen-vien-thiet-ke-do-hoa--noi-that_184#lich-khai-giang'>20.450.000đ</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <a href='/do-hoa-da-truyen-thong/chuyen-vien-thiet-ke-do-hoa--motion-graphic_185'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/Chuyen-vien-Do-hoa-motion-273x164.PNG'
//                                                             alt=''
//                                                             title='Chuyên viên Thiết kế Đồ hoạ & Motion graphic'
//                                                             src='/data/images/mon-hoc/do-hoa/Chuyen-vien-Do-hoa-motion-273x164.PNG'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a
//                                                         href='/do-hoa-da-truyen-thong/chuyen-vien-thiet-ke-do-hoa--motion-graphic_185'>
//                                                         <h5>Chuyên viên Thiết kế Đồ hoạ & Motion graphic</h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>12 tháng</div>
//                                                     <div className='prices pl-25'>
//                                                         <div className='price old-gach'>28.200.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/chuyen-vien-thiet-ke-do-hoa--motion-graphic_185#lich-khai-giang'>21.700.000đ</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <a href='/do-hoa-da-truyen-thong/chuyen-vien-thiet-ke-do-hoa--digital-painting_186'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/Chuyen-vien-Do-hoa-painting-273x164.PNG'
//                                                             alt=''
//                                                             title='Chuyên viên Thiết kế Đồ hoạ & Digital painting'
//                                                             src='/data/images/mon-hoc/do-hoa/Chuyen-vien-Do-hoa-painting-273x164.PNG'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a
//                                                         href='/do-hoa-da-truyen-thong/chuyen-vien-thiet-ke-do-hoa--digital-painting_186'>
//                                                         <h5>Chuyên viên Thiết kế Đồ hoạ & Digital painting</h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>12 tháng</div>
//                                                     <div className='prices pl-25'>
//                                                         <div className='price old-gach'>29.200.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/chuyen-vien-thiet-ke-do-hoa--digital-painting_186#lich-khai-giang'>22.450.000đ</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <a href='/do-hoa-da-truyen-thong/ky-thuat-vien-thiet-ke-do-hoa-2d_67'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/KTV-2d-273x164.PNG'
//                                                             alt='' title='Kỹ thuật viên Thiết kế Đồ hoạ 2D'
//                                                             src='/data/images/mon-hoc/do-hoa/KTV-2d-273x164.PNG'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a
//                                                         href='/do-hoa-da-truyen-thong/ky-thuat-vien-thiet-ke-do-hoa-2d_67'>
//                                                         <h5>Kỹ thuật viên Thiết kế Đồ hoạ 2D</h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>3-5 tháng</div>
//                                                     <div className='prices pl-25'>
//                                                         <div className='price old-gach'>7.800.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/ky-thuat-vien-thiet-ke-do-hoa-2d_67#lich-khai-giang'>6.700.000đ</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <a href='/do-hoa-da-truyen-thong/Ky-Thuat-Vien-Thiet-Ke-Do-Hoa-Chuyen-Nghiep_216'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/KTV-Do-hoa-CHUYEN_NGHIEP-273x164.PNG'
//                                                             alt=''
//                                                             title='Kỹ thuật viên Thiết kế Đồ hoạ chuyên nghiệp'
//                                                             src='/data/images/mon-hoc/do-hoa/KTV-Do-hoa-CHUYEN_NGHIEP-273x164.PNG'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a
//                                                         href='/do-hoa-da-truyen-thong/Ky-Thuat-Vien-Thiet-Ke-Do-Hoa-Chuyen-Nghiep_216'>
//                                                         <h5>Kỹ thuật viên Thiết kế Đồ hoạ chuyên nghiệp</h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>10 tháng</div>
//                                                     <div className='prices pl-25'>
//                                                         <div className='price old-gach'>16.200.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/Ky-Thuat-Vien-Thiet-Ke-Do-Hoa-Chuyen-Nghiep_216#lich-khai-giang'>12.000.000đ</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <a href='/do-hoa-da-truyen-thong/Ky-thuat-vien-thiet-ke-he-thong-nhan-dang-thuong-hieu_61'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/KTV-Thiet-ke-Thuong-hieu-273x164.PNG'
//                                                             alt=''
//                                                             title='Kỹ thuật viên Thiết kế Hệ thống nhận dạng thương hiệu'
//                                                             src='/data/images/mon-hoc/do-hoa/KTV-Thiet-ke-Thuong-hieu-273x164.PNG'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a
//                                                         href='/do-hoa-da-truyen-thong/Ky-thuat-vien-thiet-ke-he-thong-nhan-dang-thuong-hieu_61'>
//                                                         <h5>Kỹ thuật viên Thiết kế Hệ thống nhận dạng thương hiệu
//                                                         </h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>5 tháng</div>
//                                                     <div className='prices pl-25'>
//                                                         <div className='price old-gach'>8.400.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/Ky-thuat-vien-thiet-ke-he-thong-nhan-dang-thuong-hieu_61#lich-khai-giang'>7.300.000đ</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <a href='/do-hoa-da-truyen-thong/ky-thuat-vien-digital-painting_202'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/KTV-Digipainting2-273x164.png'
//                                                             alt='' title='Kỹ thuật viên Digital Painting'
//                                                             src='/data/images/mon-hoc/do-hoa/KTV-Digipainting2-273x164.png'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a
//                                                         href='/do-hoa-da-truyen-thong/ky-thuat-vien-digital-painting_202'>
//                                                         <h5>Kỹ thuật viên Digital Painting</h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>5 tháng</div>
//                                                     <div className='prices pl-25'>
//                                                         <div className='price old-gach'>11.000.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/ky-thuat-vien-digital-painting_202#lich-khai-giang'>8.800.000đ</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <a href='/do-hoa-da-truyen-thong/ky-thuat-vien-thiet-ke-3d-noi-that_69'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/KTV-Noi-that-273x164.PNG'
//                                                             alt='' title='Kỹ thuật viên Thiết kế 3D Nội thất'
//                                                             src='/data/images/mon-hoc/do-hoa/KTV-Noi-that-273x164.PNG'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a
//                                                         href='/do-hoa-da-truyen-thong/ky-thuat-vien-thiet-ke-3d-noi-that_69'>
//                                                         <h5>Kỹ thuật viên Thiết kế 3D Nội thất</h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>5 tháng</div>
//                                                     <div className='prices pl-25'>
//                                                         <div className='price old-gach'>8.400.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/ky-thuat-vien-thiet-ke-3d-noi-that_69#lich-khai-giang'>7.300.000đ</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <a href='/do-hoa-da-truyen-thong/ky-thuat-vien-do-hoa-chuyen-dong-2d-motion-graphic-2d_72'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/KTV-Motion-273x164.PNG'
//                                                             alt=''
//                                                             title='Kỹ thuật viên Đồ hoạ Chuyển động 2D (Motion graphic 2D)'
//                                                             src='/data/images/mon-hoc/do-hoa/KTV-Motion-273x164.PNG'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a
//                                                         href='/do-hoa-da-truyen-thong/ky-thuat-vien-do-hoa-chuyen-dong-2d-motion-graphic-2d_72'>
//                                                         <h5>Kỹ thuật viên Đồ hoạ Chuyển động 2D (Motion graphic 2D)
//                                                         </h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>4 tháng</div>
//                                                     <div className='prices pl-25'>
//                                                         <div className='price old-gach'>10.000.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/ky-thuat-vien-do-hoa-chuyen-dong-2d-motion-graphic-2d_72#lich-khai-giang'>7.500.000đ</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <a href='/do-hoa-da-truyen-thong/Ky-nang-thiet-ke-Do-hoa_126'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/ky-nang-thiet-ke-273x164.PNG'
//                                                             alt='' title='Kỹ năng Thiết kế Đồ hoạ'
//                                                             src='/data/images/mon-hoc/do-hoa/ky-nang-thiet-ke-273x164.PNG'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a href='/do-hoa-da-truyen-thong/Ky-nang-thiet-ke-Do-hoa_126'>
//                                                         <h5>Kỹ năng Thiết kế Đồ hoạ</h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>3 tháng</div>
//                                                     <div className='prices pl-10'>
//                                                         <div className='price old'>3.800.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/Ky-nang-thiet-ke-Do-hoa_126#lich-khai-giang'>Ưu
//                                                                 đãi chi tiết</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='tranning-single' scrolls='true' scrolls-duration='500'>
//                                         <div className='tranning-single-inner'>
//                                             <div className='border-overlay'></div>
//                                             <div className='tranning-single-inner-image'>
//                                                 <div className='new-trainning'></div>
//                                                 <a href='/do-hoa-da-truyen-thong/ky-nang-thiet-ke-nang-cao_249'
//                                                     className='heading-font' data-preview='Xem nội dung khóa học'>
//                                                     <div className='tranning-single-inner-image-container'>
//                                                         <div className='tranning_lazy_image'>
//                                                             {/* <img className='ls-is-cached lazyloaded'
//                                                             data-src='/data/images/mon-hoc/do-hoa/thiet-ke-nang-cao.png'
//                                                             alt='' title='Kỹ năng Thiết kế Đồ Họa nâng cao'
//                                                             src='/data/images/mon-hoc/do-hoa/thiet-ke-nang-cao.png'> */}
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                             <div className='tranning-single-inner-info'>
//                                                 <div className='tranning-single-title'>
//                                                     <a href='/do-hoa-da-truyen-thong/ky-nang-thiet-ke-nang-cao_249'>
//                                                         <h5>Kỹ năng Thiết kế Đồ Họa nâng cao</h5>
//                                                     </a>
//                                                 </div>
//                                                 <div className='tranning-single-meta'>
//                                                     <div className='duration'>5 tuần</div>
//                                                     <div className='prices pl-10'>
//                                                         <div className='price old'>2.300.000đ</div>
//                                                         <div className='price-special'>
//                                                             <a className='uu-dai'
//                                                                 href='/do-hoa-da-truyen-thong/ky-nang-thiet-ke-nang-cao_249#lich-khai-giang'>Ưu
//                                                                 đãi chi tiết</a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="tranning-all-courses text-center">
//                                     <a href='/danh-sach-khoa-hoc' className='btn btn-default' target='_blank'>Xem tất cả
//                                         các khóa học</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

const TrangChu = () => {
    return (
        <div>
            <MyCarousel />
            <KhoaHoc />
            <DichVu />
            <TrangChuGV />
        </div>
    );
    // const [index, setIndex] = useState(0);

    // const handleSelect = (selectedIndex) => {
    //     setIndex(selectedIndex);
    // };

    // return (
    //     <Carousel className="custom-carousel" interval={4000} controls={false} indicators onSelect={handleSelect}>
    //         <Carousel.Item>
    //             <img
    //                 className="d-block w-100"
    //                 src={logoImage}
    //                 alt=""
    //             />
    //         </Carousel.Item>

    //         <Carousel.Item>
    //             <img
    //                 className="d-block w-100"
    //                 src={logoImage1}
    //                 alt=""
    //             />
    //         </Carousel.Item>

    //         <Carousel.Item>
    //             <img
    //                 className="d-block w-100"
    //                 src={logoImage2}
    //                 alt=""
    //             />
    //         </Carousel.Item>

    //         <Carousel.Item>
    //             <img
    //                 className="d-block w-100"
    //                 src={logoImage3}
    //                 alt=""
    //             />
    //         </Carousel.Item>
    //     </Carousel>
    // );
}

export default TrangChu;


