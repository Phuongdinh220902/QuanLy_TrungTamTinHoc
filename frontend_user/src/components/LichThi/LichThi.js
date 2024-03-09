
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import TT from '../../images/THÔNG BÁO LỊCH THI UDCNTT.png';

const LichThi = () => {
    const [noiDungBaiViet, setNoiDungBaiViet] = useState('');
    const [caThi, setcaThi] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layThongTinLTTSTD`);
                const { ND } = response.data;
                if (ND && ND.length > 0 && ND[0].noidung) {
                    setNoiDungBaiViet(ND[0].noidung);
                }

                const responsecaThi = await axios.get(`http://localhost:2209/api/v1/laydsCaThiND`);
                const { CT } = responsecaThi.data;
                setcaThi(CT);

            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container nganh-khoang-cach" style={{ "minHeight": "calc(100vh - 346px)", marginTop: '10px' }}>

            <h1 className="tieu-de-bai-viet-chi-tiet">Thông báo lịch thi tự do Chứng chỉ Ứng dụng CNTT Cơ bản </h1>

            <div id="Khung_thong_tin">
                <div style={{ textAlign: "center", marginBottom: '20px' }}>
                    <img src={TT} style={{ width: '868px', height: '434px' }} />
                </div>

                <div id="ctl00_cphBody_NoiDungTrai" className="col-md-9 khoang-cach-5" style={{ paddingLeft: 0, marginBottom: '20px' }}>
                    <div className="col-md-12 khoang-cach-5">
                        <div className="noi-dung">
                            <p className="tieu-de-nho" style={{ display: 'none' }}><span className="glyphicon glyphicon-time"></span> ngày 03-11-2021</p>

                            <div dangerouslySetInnerHTML={{ __html: noiDungBaiViet }} style={{ fontSize: '16px' }} />
                        </div>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-center">STT</th>
                            <th className="col-center">Ca thi</th>
                            <th className="col-center"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {caThi && caThi.map((lop, index) => (
                            <tr key={lop.macaThi}>
                                <td className="col-center">{index + 1}</td>
                                <td>{lop.thoigian}</td>
                                <td>
                                    <button className="button-dk"> Đăng ký</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>


        </div>
    );
};


export default LichThi;


