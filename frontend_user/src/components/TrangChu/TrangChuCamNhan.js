

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import logoImage from '../../images/cam-nhan-hoc-vien-icon.png';
import logoImage1 from '../../images/lien-he-tu-van-ghi-danh.png';
import logoImage2 from '../../images/ban-do.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faQuoteLeft,

} from "@fortawesome/free-solid-svg-icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CamNhanHocVien = () => {
    const [camNhanList, setCamNhanList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/layTrangChuCamNhan');
                const shuffledCamNhans = response.data.CN.sort(() => 0.5 - Math.random()).slice(0, 9);
                setCamNhanList(shuffledCamNhans);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ API: ', error);
            }
        };

        fetchData();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div className="hoc-vien-container cam-nhan-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="section-title section-title-white lazy visible" style={{ marginBottom: "30px" }}>
                                <h2 className="tieu-de-muc">
                                    <img src={logoImage} alt="" />&nbsp;
                                    <span>Cảm nhận</span> của học viên
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 ftco-animate">

                            <Slider {...settings}>
                                {camNhanList.map((camNhan, index) => (
                                    <div key={index} className="item"  >
                                        <div className="cam-nhan-wrap text-center" style={{ marginRight: '10px', marginLeft: '10px' }}>
                                            <div className="user-img mb-5" style={{ backgroundImage: `url(${`http://localhost:2209/images/${camNhan.tenHinhAnhHV}`})` }}>
                                                <span className="quote d-flex align-items-center justify-content-center">
                                                    <FontAwesomeIcon icon={faQuoteLeft} style={{ fontSize: "15px", color: "white" }} />
                                                </span>
                                                {/* <img src={logoImage3} alt="" style={{ maxWidth: "100%", height: "auto" }} /> */}
                                            </div>
                                            <div className="item-text">
                                                <Link to='/camnhan'>
                                                    <p className="noi-dung-cam-nhan mb-5">
                                                        <a>{camNhan.noidung}</a>
                                                    </p>
                                                </Link>

                                                <p className="name"><a href={camNhan.link} >{camNhan.tenHV}</a></p>
                                                <span className="position">{camNhan.tenKH}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>


            <div id="lien-he" className="container lien-he">

                <div className="col1">
                    <div className="co-so">
                        <div className="tieu-de">
                            <img src={logoImage1} alt="" />&nbsp;Liên hệ
                            ghi danh
                        </div>
                        <div className="noi-dung">
                            <FontAwesomeIcon icon={faLocationDot} />&nbsp;
                            Khu II, Đ.3 Tháng 2, Ninh Kiều, Cần Thơ<br />
                            Điện thoại: 0999999999 - Fax: 38324466<br />
                            Giờ làm việc: từ 07h30 - 17h00
                            <ul>
                                <li>
                                    Từ Thứ 2 đến Thứ&nbsp;6
                                    <ul>
                                        <li>
                                            Sáng: &nbsp;07h30 → 11h30
                                        </li>
                                        <li>
                                            Chiều: 13h00 → 19h00
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    Thứ 7 -&nbsp;Chủ nhật
                                    <ul>
                                        <li>
                                            Sáng: &nbsp;07h30 → 11h30
                                        </li>
                                        <li>
                                            Chiều: 13h00 → 17h00
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col2">
                    <div className="co-so">
                        <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%E1%BA%A7n+Th%C6%A1/@10.029797,105.771426,15z/data=!4m6!3m5!1s0x31a0895a51d60719:0x9d76b0035f6d53d0!8m2!3d10.0299337!4d105.7706153!16s%2Fm%2F02r6wmy?hl=vi&entry=ttu"
                            target="_blank" className="link-ban-do">
                            <div className="img-hover-zoom img-hover-zoom--point-zoom hidden-xs">
                                <img src={logoImage2} alt=""
                                    className="img-responsive ban-do" />
                            </div>
                            <img src={logoImage2} alt=""
                                className="img-responsive ban-do-mobile" />
                        </a>
                    </div>
                </div>
            </div>


        </>
    );
};

export default CamNhanHocVien;
