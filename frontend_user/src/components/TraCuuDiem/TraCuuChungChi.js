import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const TraCuuChungChi = () => {
    const [giatri, setGiaTri] = useState('');
    const [ketQua, setKetQua] = useState(null);
    const [daTraCuu, setDaTraCuu] = useState(false); // State để theo dõi xem đã tra cứu hay chưa

    const traCuuChungChi = async () => {
        try {
            const responseKQ = await axios.post('http://localhost:2209/api/v1/TraCuuChungChi', { giatri });
            setKetQua(responseKQ.data.KQ[0]);
            setDaTraCuu(true); // Đã tra cứu
        } catch (error) {
            console.error('Lỗi khi gọi API tra cứu chứng chỉ: ', error);
            // Xử lý lỗi ở đây
        }
    };

    // Sử dụng Number.prototype.toFixed()
    const diemLTFormatted = ketQua && ketQua.diemLT ? ketQua.diemLT.toFixed(2) : null;
    const diemTHFormatted = ketQua && ketQua.diemTH ? ketQua.diemTH.toFixed(2) : null;
    const ngayThiFormatted = ketQua && ketQua.ngaythi ? ketQua.ngaythi : null;
    const ngaySinhFormatted = ketQua && ketQua.ngaysinh ? ketQua.ngaysinh : null;
    const ngayCapFormatted = ketQua && ketQua.ngaycap ? ketQua.ngaycap : null;
    const hoTenFormatted = ketQua && ketQua.hoten ? ketQua.hoten : null;




    const handleInputChange = (event) => {
        setGiaTri(event.target.value);
    };

    return (
        <div className="container nganh-khoang-cach" style={{ minHeight: "calc(100vh - 346px)", marginTop: '10px' }}>
            <div className="col-md-12 khoang-cach-5" style={{ backgroundColor: '#EFEFEF', border: '1px solid #CCC', borderRadius: '5px', marginBottom: "10px" }}>
                <h1 style={{ textAlign: 'center', color: '#0082c8', fontSize: '24px', fontWeight: '500', margin: "40px 0px" }}>TRA CỨU CHỨNG CHỈ</h1>
                <div className="col-xs-12 col-md-8 col-md-offset-2" style={{ marginBottom: '30px' }}>
                    <div className="form-group">
                        <label className="control-label col-sm-4" style={{ paddingRight: '0', textAlign: 'right', paddingTop: "8px" }}>Số vào sổ/ Số hiệu: </label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control tieuchi" placeholder="Số vào sổ/ Số hiệu" style={{ width: '80%', display: 'inline' }} id="Th_Tieu_chi" name="Th_Tieu_chi" onChange={handleInputChange} />
                            <button type="button" className="btn btn-default" onClick={traCuuChungChi} style={{ fontSize: '20px', backgroundColor: '#0082c8', color: '#FFF', borderColor: '#0082c8', marginLeft: "5px" }}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="Khung_thong_tin">
                <div id="ctl00_cphBody_NoiDungTrai" className="col-md-9 khoang-cach-5" style={{ paddingLeft: 0, marginTop: '5px' }}>
                    <div className="col-md-12 khoang-cach-5">
                        <div className="noi-dung">
                            <p className="tieu-de-nho" style={{ display: 'none' }}><span className="glyphicon glyphicon-time"></span> ngày 03-11-2021</p>

                            {daTraCuu && ketQua ? ( // Kiểm tra nếu đã tra cứu và có kết quả
                                <div className="table-container" style={{ textAlign: 'center', marginTop: '15px', marginBottom: '15px' }}>
                                    <table className="table" style={{ margin: 'auto', width: '60%' }}>
                                        <tbody>
                                            <tr>
                                                <td>Họ tên</td>
                                                <td>{hoTenFormatted}</td>
                                            </tr>
                                            <tr>
                                                <td>Ngày sinh</td>
                                                <td>{ngaySinhFormatted}</td>
                                            </tr>
                                            <tr>
                                                <td>Thời gian thi:</td>
                                                <td>{ngayThiFormatted}</td>
                                            </tr>

                                            <tr>
                                                <td>Điểm lý thuyết:</td>
                                                <td>{diemLTFormatted}</td>
                                            </tr>
                                            <tr>
                                                <td>Điểm thực hành:</td>
                                                <td>{diemTHFormatted}</td>
                                            </tr>
                                            <tr>
                                                <td>Ngày cấp</td>
                                                <td>{ngayCapFormatted}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ) : daTraCuu && !ketQua ? ( // Kiểm tra nếu đã tra cứu nhưng không có kết quả
                                <p style={{ color: 'red', textAlign: 'center', fontSize: '16px' }}>Không có kết quả nào thoả tiêu chí tra cứu</p>
                            ) : null} {/* Đây là trường hợp mặc định khi chưa tra cứu */}
                        </div>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                </div>
            </div>
        </div>
    );
};

export default TraCuuChungChi;
