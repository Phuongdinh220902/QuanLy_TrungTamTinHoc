import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    faPenToSquare,
    faUserPlus,
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { Link } from "react-router-dom";
// function GioiThieuMonHoc() {
//     const [gioiThieu, setGioiThieu] = useState("");
//     const { maKH } = useParams();
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`/api/v1/chitietkhoahoc/${maKH}`);
//                 setGioiThieu(response.data.TCKH); // Lưu trữ dữ liệu từ API vào state
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }, []); // Gọi API khi component được render (mảng dependencies rỗng)

//     return (
//         <div className="container nganh-khoang-cach" id="GioiThieuMonHoc">
//             <div className="col-md-9 khoang-cach-5">
//                 <div className="col-md-4 khoang-cach-5 mon-hoc-image" style={{ textAlign: "center" }}>
//                     <img src="/data/images/mon-hoc/do-hoa/Chuyen-vien-Do-hoa-web-273x164.jpg" />
//                 </div>
//                 <div className="col-md-8 khoang-cach-5">
//                     <h1 className="nganh-tieu-de">
//                         <img src="/data/images/he-thong/new-ribbon.png" alt="Môn học mới" />
//                         <div>{gioiThieu}</div> {/* Hiển thị dữ liệu từ state */}
//                     </h1>
//                 </div>
//             </div>
//         </div>
//     );
// }



const KhoaHoc = ({ match }) => {
    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const { maKH } = useParams();
    const [khoaHoc, setKhoaHoc] = useState(null);
    const [lopHoc, setLopHoc] = useState([]);
    const [gioiThieu, setGioiThieu] = useState("");
    const [hinhAnh, setHinhAnh] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseKhoaHoc = await axios.get(`http://localhost:2209/api/v1/layKhoaHoc/${maKH}`);
                const { TCKH } = responseKhoaHoc.data;
                setKhoaHoc(TCKH[0]); // Lấy thông tin của khoá học đầu tiên

                const responseLopHoc = await axios.get(`http://localhost:2209/api/v1/layLopHoc/${maKH}`);
                const { LH } = responseLopHoc.data;
                setLopHoc(LH);

                const responseGioiThieu = await axios.get(`http://localhost:2209/api/v1/layGioiThieuKhoaHoc/${maKH}`);
                const { chitiet, tenHinhAnhKH } = responseGioiThieu.data.TCKH[0];
                if (chitiet) {
                    setGioiThieu(chitiet); // Lưu trữ nội dung từ API vào state
                }
                if (tenHinhAnhKH) {
                    setHinhAnh(tenHinhAnhKH); // Lưu trữ tên hình ảnh từ API vào state
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ API: ', error);
            }
        };

        fetchData();
    }, [maKH]);
    if (!khoaHoc) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container nganh-khoang-cach" id="GioiThieuMonHoc">
                <div className="col-md-9 khoang-cach-5">
                    <div className="col-md-4 khoang-cach-5 mon-hoc-image" style={{ textAlign: "center" }}>
                        <img
                            src={

                                `http://localhost:2209/images/${hinhAnh}`
                            }
                            alt=""
                        />
                    </div>
                    <div className="col-md-8 khoang-cach-5">
                        <h1 className="nganh-tieu-de">
                            <div> {khoaHoc.tenKH}</div>
                        </h1>
                        <div className="nganh-noi-dung">
                            <div dangerouslySetInnerHTML={{ __html: gioiThieu }}></div> {/* Hiển thị nội dung từ state */}
                        </div>
                    </div>
                </div>
            </div>


            <div className="khoa-hoc-container1">
                {/* <h2 className="khoa-hoc-title">Thông Tin Khoá Học</h2>
                <div className="khoa-hoc-details">
                    <h3></h3>
                    <p>Học phí: {formatCurrency(khoaHoc.hocphisaukhigiam)}đ</p>
                    <p>Số giờ: {khoaHoc.so_gio} giờ</p>
                    <p>Mô tả: {khoaHoc.mota}</p>
                    <p>Môn học: {khoaHoc.monhoc}</p>
                    
                </div>  */}
                <h2 className="lop-hoc-title">Danh sách lớp học</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên lớp học</th>
                            <th>Thời gian</th>
                            <th>Giáo viên</th>
                            <th>Ngày bắt đầu</th>
                            <th>Địa điểm</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {lopHoc.map((lop, index) => (
                            <tr key={lop.maLopHoc}>
                                <td>{index + 1}</td>
                                <td>{lop.tenLopHoc}</td>
                                <td>{lop.thoigian}</td>
                                <td>{lop.tenGV}</td>
                                <td>{lop.ngay_batdau}</td>
                                <td>{lop.diadiem}</td>
                                <td>
                                    <button className="button-dk"> Đăng ký</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};


export default KhoaHoc;


