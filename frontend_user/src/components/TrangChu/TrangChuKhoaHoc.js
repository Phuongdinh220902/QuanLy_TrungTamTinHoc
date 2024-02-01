import React, { useState, useEffect } from "react";
import CTĐT from '../../images/chuong-trinh-dao-tao-icon.png';
// eslint-disable-next-line
import "../../css/bootstrap.css"
import "../../css/t3h.css"
import "../../css/color-theme.css"
import "../../css/home.css"
import "../../css/home2.css"
import "../../css/t3h.nganh.css"
import axios from 'axios';
import { Link } from "react-router-dom";

const KhoaHoc = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/layTrangChuKhoaHoc');
                const data = response.data.TCKH;
                setCourses(data);
                console.log(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ API: ', error);
            }
        };

        fetchData();
    }, []);

    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className="khoa-hoc-container">
            <div className="section-title">
                <h2 className="tieu-de-muc" style={{ marginTop: '0' }}>
                    <img src={CTĐT} alt="CTĐT" />
                    <span>Chương trình Đào tạo</span>
                </h2>
            </div>
            <div className="wpb_column vc_column_container vc_col-sm-12">
                <div className="tranning-inner">
                    <div className="wpb_wrapper">
                        <div className="tranning-list" data-offset="1" data-template="courses/grid">
                            <div className="tranning-list-grid" data-pages="11">
                                {courses.map(course => (
                                    <div className="tranning-single" key={course.maKH} scrolls="true" scrolls-duration="500">
                                        <div className="tranning-single-inner">
                                            <div className="border-overlay"></div>
                                            <div className="tranning-single-inner-image">
                                                <Link to={`/khoahoc/${course.maKH}`} className="heading-font" data-preview={`Xem nội dung khóa học ${course.tenKH}`}>
                                                    <div className="tranning-single-inner-image-container">
                                                        <div className="tranning_lazy_image">
                                                            <img
                                                                className="ls-is-cached lazyloaded"
                                                                src={

                                                                    `http://localhost:2209/images/${course.tenHinhAnhKH}`
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="tranning-single-inner-info">
                                                <div className="tranning-single-title">
                                                    {/* <a href={`/do-hoa-da-truyen-thong/${course.tenKH}_${course.maKH}`}> */}
                                                    <Link to={`/khoahoc/${course.maKH}`}>
                                                        <h5>{course.tenKH}</h5>
                                                    </Link>

                                                    {/* </a> */}
                                                </div>
                                                <div className="tranning-single-meta">
                                                    <div className="duration">{`${course.so_gio} giờ`}</div>
                                                    <div className="prices pl-25">
                                                        {course.hocphisaukhigiam ? (
                                                            <>
                                                                <div className="prices pl-10">
                                                                    <div className="price old-gach">{`${formatCurrency(course.hocphi)}đ`}</div>
                                                                    <div className="price-special">
                                                                        <a className="uu-dai" href={`/khoahoc/${course.maKH}`}>
                                                                            {`${formatCurrency(course.hocphisaukhigiam)}đ`}
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                            </>
                                                        ) : (
                                                            <>

                                                                <div className="prices pl-10">
                                                                    <div className="price old">{`${formatCurrency(course.hocphi)}đ`}</div>
                                                                    <div className="price-special">
                                                                        <a className="uu-dai" href={`/khoahoc/${course.maKH}`}>
                                                                            Ưu đãi chi tiết
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className="tranning-all-courses text-center">

                                <a href='/tatcakhoahoc' className='btn btn-default' target='_blank'>Xem tất cả
                                    các khóa học</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default KhoaHoc;