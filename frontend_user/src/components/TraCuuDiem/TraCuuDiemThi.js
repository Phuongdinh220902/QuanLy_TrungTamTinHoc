
// import axios from "axios"
// import 'react-toastify/dist/ReactToastify.css';
// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faMagnifyingGlass
// } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

// const TraCuuDiemThi = () => {
//     const [noiDungBaiViet, setNoiDungBaiViet] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:2209/api/v1/layThongTinDiemThi`);
//                 const { ND } = response.data;
//                 if (ND && ND.length > 0 && ND[0].noidung) {
//                     setNoiDungBaiViet(ND[0].noidung);
//                 }
//             } catch (error) {
//                 console.error('Lỗi khi gọi API: ', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div class="container nganh-khoang-cach" style={{ "minHeight": "calc(100vh - 346px);" }}>
//             <div class="col-md-12 khoang-cach-5" style={{ 'background-color': '#EFEFEF', border: '1px solid #CCC', borderRadius: '5px', marginBottom: "10px" }}>
//                 <h1 style={{ 'textAlign': 'center', color: '#0082c8', fontSize: '24px', fontWeight: '500', margin: "40px 0px" }}>TRA CỨU THÔNG TIN ĐIỂM THI</h1>
//                 <div class="col-xs-12 col-md-8 col-md-offset-2" style={{ marginBottom: '30px' }}>
//                     <div class="form-group">
//                         <label class="control-label col-sm-4" style={{ paddingRight: '0', textAlign: 'right', paddingTop: "8px" }}>Căn cước công dân: </label>
//                         <div class="col-sm-8">
//                             <input type="text" class="form-control tieuchi" placeholder="Căn cước công dân" style={{ "width": '80%', 'display': 'inline' }} id="Th_Tieu_chi" name="Th_Tieu_chi" onkeydown="keyPress(event)" />
//                             <button type="button" class="btn btn-default" onclick="tra_cuu_diem()" style={{ fontSize: '20px', 'backgroundColor': '#0082c8', color: '#FFF', borderColor: '#0082c8', marginLeft: "5px" }}>
//                                 <FontAwesomeIcon icon={faMagnifyingGlass} />
//                             </button>
//                         </div>
//                     </div>
//                     <div class="form-group" id="chonngay" style={{ display: 'none', paddingTop: '5px', clear: "both" }}>
//                         <label class="control-label col-sm-4" for="Th_Ngay_sinh" style={{ paddingRight: '0', textAlign: 'right', paddingTop: "8px" }}>Ngày sinh: </label>
//                         <div class="col-sm-8">

//                             <input type="text" class="form-control ngaysinh" placeholder="Ngày/Tháng/Năm hoặc Năm sinh" style={{ width: "80%" }} id="Th_Ngay_sinh" name="Th_Ngay_sinh" onkeydown="keyPress(event)" />
//                         </div>
//                     </div>

//                 </div>
//                 <div style={{ clear: 'both', height: '10px' }}></div>
//             </div>
//             <div id="Khung_thong_tin">
//                 <div id="ctl00_cphBody_NoiDungTrai" className="col-md-9 khoang-cach-5" style={{ paddingLeft: 0 }}>
//                     <div className="col-md-12 khoang-cach-5">
//                         <div className="noi-dung">
//                             <p className="tieu-de-nho" style={{ display: 'none' }}><span className="glyphicon glyphicon-time"></span> ngày 03-11-2021</p>

//                             <div dangerouslySetInnerHTML={{ __html: noiDungBaiViet }} />
//                         </div>
//                     </div>
//                     <div style={{ clear: 'both' }}></div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default TraCuuDiemThi;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const TraCuuDiemThi = () => {
    const [noiDungBaiViet, setNoiDungBaiViet] = useState('');
    const [cccd, setCccd] = useState('');
    const [ketQua, setKetQua] = useState(null);
    const [showNoiDungBaiViet, setShowNoiDungBaiViet] = useState(true); // Hiển thị nội dung mặc định

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layThongTinDiemThi`);
                const { ND } = response.data;
                if (ND && ND.length > 0 && ND[0].noidung) {
                    setNoiDungBaiViet(ND[0].noidung);
                }
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };

        fetchData();
    }, []);

    const traCuuDiem = async () => {
        try {
            const responseKQ = await axios.post('http://localhost:2209/api/v1/TimDiem', { cccd });
            setKetQua(responseKQ.data.KQ[0]);
            setShowNoiDungBaiViet(false); // Ẩn nội dung khi tìm kiếm
        } catch (error) {
            console.error('Lỗi khi gọi API tra cứu điểm: ', error);
            // Xử lý lỗi ở đây
        }
    };

    const handleInputChange = (event) => {
        setCccd(event.target.value);
    };

    return (
        <div className="container nganh-khoang-cach" style={{ minHeight: "calc(100vh - 346px);" }}>
            <div className="col-md-12 khoang-cach-5" style={{ backgroundColor: '#EFEFEF', border: '1px solid #CCC', borderRadius: '5px', marginBottom: "10px" }}>
                <h1 style={{ textAlign: 'center', color: '#0082c8', fontSize: '24px', fontWeight: '500', margin: "40px 0px" }}>TRA CỨU THÔNG TIN ĐIỂM THI</h1>
                <div className="col-xs-12 col-md-8 col-md-offset-2" style={{ marginBottom: '30px' }}>
                    <div className="form-group">
                        <label className="control-label col-sm-4" style={{ paddingRight: '0', textAlign: 'right', paddingTop: "8px" }}>Căn cước công dân: </label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control tieuchi" placeholder="Căn cước công dân" style={{ width: '80%', display: 'inline' }} id="Th_Tieu_chi" name="Th_Tieu_chi" onChange={handleInputChange} />
                            <button type="button" className="btn btn-default" onClick={traCuuDiem} style={{ fontSize: '20px', backgroundColor: '#0082c8', color: '#FFF', borderColor: '#0082c8', marginLeft: "5px" }}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showNoiDungBaiViet && (
                <div dangerouslySetInnerHTML={{ __html: noiDungBaiViet }} />
            )}
            <div id="Khung_thong_tin">
                <div id="ctl00_cphBody_NoiDungTrai" className="col-md-9 khoang-cach-5" style={{ paddingLeft: 0 }}>
                    <div className="col-md-12 khoang-cach-5">
                        <div className="noi-dung">
                            <p className="tieu-de-nho" style={{ display: 'none' }}><span className="glyphicon glyphicon-time"></span> ngày 03-11-2021</p>
                            {ketQua ? (

                                <div className="table-container" style={{ textAlign: 'center', marginTop: '18px', marginBottom: '18px' }}>
                                    <table className="table" style={{ margin: 'auto', width: '60%' }}>
                                        <tbody>
                                            <tr>
                                                <td>Thời gian thi: Ngày</td>
                                                <td>{ketQua.ngaythi}</td>
                                            </tr>
                                            <tr>
                                                <td>Ca thi</td>
                                                <td>{ketQua.thoigian}</td>
                                            </tr>
                                            <tr>
                                                <td>Điểm lý thuyết:</td>
                                                <td>{ketQua.diemLT}</td>
                                            </tr>
                                            <tr>
                                                <td>Điểm thực hành:</td>
                                                <td>{ketQua.diemTH}</td>
                                            </tr>
                                            <tr>
                                                <td>Tổng điểm:</td>
                                                <td>{ketQua.tongdiem}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                            ) : cccd !== '' && ( // Kiểm tra nếu đã nhập giá trị tra cứu
                                <p style={{ color: 'red', textAlign: 'center', fontSize: '16px' }}>Không có kết quả nào thoả tiêu chí tra cứu</p>
                            )}
                        </div>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                </div>
            </div>
        </div>
    );
};

export default TraCuuDiemThi;






