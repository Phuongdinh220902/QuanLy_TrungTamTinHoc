import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faHouseChimney,
    faGraduationCap,
    faRightFromBracket,
    faBars,
    faGears
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const ThongBaoLopHocChiTietHV = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState([]);
    const [thongbao, setThongBao] = useState([]);
    const [thongBao, setThongBaoCT] = useState(null);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const { maLopHoc } = useParams();
    const { maTB } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {

                const responseTB = await axios.get(`http://localhost:2209/api/v1/layThongBaoLopHoc/${maLopHoc}`);
                console.log(responseTB)
                setThongBao(responseTB.data.TB);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [maLopHoc]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseTBCT = await axios.get(`http://localhost:2209/api/v1/layThongBaoLopHocChiTiet/${maTB}`);
                setThongBaoCT(responseTBCT.data.TBCT[0]); // Lấy thông báo đầu tiên từ mảng kết quả
            } catch (error) {
                console.error('Error fetching thong bao:', error);
            }
        };

        fetchData();
    }, [maTB]);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('giangvien');
        // setUser(null);
        navigate('/');
    };

    const formatDate = (dateTimeString) => {
        // Tạo đối tượng Date từ chuỗi datetime
        const dateTime = new Date(dateTimeString);

        // Trích xuất ngày, tháng và năm từ đối tượng Date
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0, nên cần cộng thêm 1
        const year = dateTime.getFullYear();

        // Định dạng lại ngày theo yêu cầu "dd-mm-yyyy"
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };


    return (
        <div>
            <div className='centered-divtb' >
                <div>
                    {thongBao ? (
                        <div>
                            <div style={{ borderBottom: '2px solid rgb(25, 103, 210)', paddingBottom: '10px' }}>
                                <div style={{ color: 'rgb(25, 103, 210)', fontSize: '35px' }}>
                                    {thongBao.tieude_thongbao}</div>
                                <p>{thongBao.tenGV} {formatDate(thongBao.ngaydang)}</p>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: thongBao.noidung_thongbao }}></div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>


        </div>

    );
};

export default ThongBaoLopHocChiTietHV;
