
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LichThi = () => {
    const [noiDungBaiViet, setNoiDungBaiViet] = useState('');

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

    return (
        <div class="container nganh-khoang-cach" style={{ "minHeight": "calc(100vh - 346px);" }}>

            <div id="Khung_thong_tin">
                <div id="ctl00_cphBody_NoiDungTrai" className="col-md-9 khoang-cach-5" style={{ paddingLeft: 0 }}>
                    <div className="col-md-12 khoang-cach-5">
                        <div className="noi-dung">
                            <p className="tieu-de-nho" style={{ display: 'none' }}><span className="glyphicon glyphicon-time"></span> ngày 03-11-2021</p>

                            <div dangerouslySetInnerHTML={{ __html: noiDungBaiViet }} />
                        </div>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                </div>
            </div>
        </div>
    );
};


export default LichThi;


