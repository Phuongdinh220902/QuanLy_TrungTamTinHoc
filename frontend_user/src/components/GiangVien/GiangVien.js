import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import {
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
    laydsgv
} from "../../services/apiService";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalUpdateGV from "./ModalUpdate";
import ModalDelete from "./ModalDelete";
import ModalCreateGV from "./ModalCreateGV";

import logoImage3 from '../../images/nam.jpg';


// const GiangVien = () => {
//     return (
//         <div className="wrapper">

//             <div className="container hidden-xs">
//                 <ol className="breadcrumb duong-dan">
//                     <li><a href="/">Trang chủ</a></li>
//                     <li><a href="#">Giáo viên</a></li>
//                 </ol>
//             </div>

//             <div className="container nganh-khoang-cach">
//                 <div id="vitri"></div>
//                 <div className="col-md-12 khoang-cach-5">
//                     <h1 className="nganh-tieu-de-giao-vien">ĐỘI NGŨ GIẢNG VIÊN</h1>
//                     <p id="sologan" className="nganh-slogan-giao-vien">Tất cả Giáo viên Trung tâm Tin học là những chuyên gia giàu kinh nghiệm thực tế và chuyên nghiệp</p>

//                     <div className="khung-giao-vien-chon">
//                         <div className="row nganh-khoang-cach-0">
//                             <div className="col-md-12 nganh-khoang-cach-0">
//                                 <img src={logoImage3} id="hinhgvView" className="thumbnail" />
//                                 <div className="nganh-gioi-thieu-giao-vien">
//                                     <div id="gioithieugv" className="gioi-thieu"><h1>Giảng viên: Tô Trần Hồ Giảng</h1></div>
//                                     <div id="noidunggv" className="mo-ta"><p>
//                                         Thầy Tô Trần Hồ Giảng hiện có hơn 20 năm giảng dạy và làm việc tại Trung Tâm Tin Học ĐH KHTN.</p>
//                                         <p>
//                                             Thầy đang đảm nhiệm chuyên môn ngành Tin Học Ứng Dụng</p>
//                                         <p>
//                                             Kinh nghiệm giảng dạy Ứng dụng CNTT cơ bản, ứng dụng CNTT nâng cao, chuyên đề Xử lý dữ liệu Excel, Chuyên đề VBA, Chuyên đề Phân tích dữ liệu Excel,...tại Trung Tâm và các đơn vị ban ngành, cơ quan nhà nước, các doanh nghiệp tư nhân,...</p>
//                                         <p>
//                                             &nbsp;</p>
//                                         <p>
//                                             &nbsp;</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* <div className="khung-giao-vien">
//                         <div className="row nganh-khoang-cach-0"><div id="GV74" onClick="DocGV(74)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                             <img src="/data/images/giao-vien/tin-hoc-van-phong/thud-To-Ho-Giang.png" alt="Tô Trần Hồ Giảng" className="thumbnail" />
//                             <p className="nganh-ten-giao-vien">Tô Trần Hồ Giảng</p>
//                         </div><div id="GV73" onClick="DocGV(73)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                                 <img src="/data/images/giao-vien/do-hoa/Do-hoa-Doan-Van-Cuong.png" alt="Cường Đoàn" className="thumbnail" />
//                                 <p className="nganh-ten-giao-vien">Cường Đoàn</p>
//                             </div><div id="GV72" onClick="DocGV(72)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                                 <img src="/data/images/giao-vien/lap-trinh-va-csdl/Vu-Dinh-Ai-1.png" alt="Vũ Đình Ái" className="thumbnail" />
//                                 <p className="nganh-ten-giao-vien">Vũ Đình Ái</p>
//                             </div><div id="GV71" onClick="DocGV(71)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                             </div></div>
//                     </div> */}
//                 </div>
//                 <div className="col-md-3 hidden-sm hidden-xs khoang-cach-5">
//                     <div className="sidebar">

//                     </div>
//                 </div>
//             </div>
//             <div style={{ "height": "10px" }}></div>
//         </div>
//     );
// };

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Sử dụng useParams để lấy maGV từ URL

const GiangVien = () => {
    const { maGV } = useParams(); // Lấy maGV từ URL
    const [giangVien, setGiangVien] = useState(null); // Dùng để lưu trữ dữ liệu từ API

    useEffect(() => {
        // Gọi API để lấy dữ liệu giảng viên khi component được render
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
        <div className="wrapper">

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


