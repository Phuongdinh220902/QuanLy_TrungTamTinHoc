
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GiangVien = () => {
    const { maGV } = useParams();
    const [giangVien, setGiangVien] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layGiangVien/${maGV}`);
                setGiangVien(response.data.TCGV);
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };

        fetchData();
    }, [maGV]);

    if (!giangVien) {
        return <div>Loading...</div>;
    }
    return (
        <div className="wrapper" style={{ "backgroundColor": "white" }}>

            <div className="container hidden-xs">
                <ol className="breadcrumb duong-dan">
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="#">Giáo viên</a></li>
                </ol>

                <div className="container nganh-khoang-cach">
                    <div id="vitri"></div>
                    <div className="col-md-12 khoang-cach-5">
                        <h1 className="nganh-tieu-de-giao-vien">ĐỘI NGŨ GIẢNG VIÊN</h1>
                        <p id="sologan" className="nganh-slogan-giao-vien">Tất cả Giáo viên Trung tâm Tin học là những chuyên gia giàu kinh nghiệm thực tế và chuyên nghiệp</p>

                        <div className="khung-giao-vien-chon">
                            <div className="row nganh-khoang-cach-0">
                                <div className="col-md-12 nganh-khoang-cach-0">
                                    <img src={`http://localhost:2209/images/${giangVien[0].tenHA}`} alt={giangVien[0].tenGV} className="thumbnail" />
                                    <div className="nganh-gioi-thieu-giao-vien">
                                        <div id="gioithieugv" className="gioi-thieu">
                                            <h1>Giảng viên: {giangVien[0].tenGV}</h1>
                                        </div>
                                        <div id="noidunggv" className="mo-ta">
                                            <p>{giangVien[0].gioithieu}</p>
                                        </div>
                                        <div id="noidunggv" className="mo-ta">
                                            <p>{giangVien[0].mota}</p>
                                        </div>
                                        <div id="noidunggv" className="mo-ta">
                                            <p>{giangVien[0].kinhnghiem}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 hidden-sm hidden-xs khoang-cach-5">
                        <div className="sidebar"></div>
                    </div>
                </div>

            </div>

        </div>
    );
};


export default GiangVien;


