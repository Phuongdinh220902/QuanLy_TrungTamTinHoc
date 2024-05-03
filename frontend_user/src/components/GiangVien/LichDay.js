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
    faGears,
    faCalendarDays
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import Button from 'react-bootstrap/Button';

const LichDay = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [classes, setClasses] = useState([]);
    const [data, setData] = useState([]);
    const [tenGV, setTenGV] = useState("");
    // const { maGV } = useParams();
    const maGV = localStorage.getItem('maGV');
    const [tenHA, setTenHA] = useState("");
    const [lichday, setLichDay] = useState([]);



    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layLopHocGV/${maGV}}`);
                setData(response.data.KH);
                console.log(maGV, 'ok')

                const responseLichDay = await axios.get(`http://localhost:2209/api/v1/layLichDay/${maGV}}`);
                setLichDay(responseLichDay.data.DSLD);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const userData = JSON.parse(localStorage.getItem('giangvien'));
        if (userData) {
            setTenGV(userData.tenGV);
            setTenHA(userData.tenHA);
        }
        fetchData()
    }, [maGV]);


    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('giangvien');
        navigate('/');
    };

    const exportToExcel = async () => {
        {
            const dataToExport = lichday.map((item) => {
                return {
                    "Lớp học": item.tenLopHoc,
                    "Ngày bắt đầu": item.ngay_batdau,
                    "Thời gian": item.thoigian,
                    "Phòng": item.diadiem,
                };
            });

            const ws = XLSX.utils.json_to_sheet(dataToExport);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "LichGiangDay");

            XLSX.writeFile(wb, "LichGiangDay.xlsx");
        };
    }


    return (
        <div>
            <header style={{
                backgroundColor: 'white',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ccc',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                height: '70px'
            }}>
                <FontAwesomeIcon icon={faBars} onClick={handleToggleSidebar} style={{ cursor: 'pointer' }} />
                <div className="user-info-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={`http://localhost:2209/images/${tenHA}`} alt="Avatar" style={{ width: '50px', height: '50px', marginRight: '10px' }} /> {/* Hiển thị hình ảnh */}
                    <h3>{tenGV}</h3>

                </div>
            </header>


            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', minHeight: '100vh' }}>
                {/* Sidebar */}
                <Sidebar collapsed={collapsed}>
                    <Menu>
                        <Link to={'/giangvien'} style={{ color: 'black' }}>
                            <MenuItem >
                                <FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '10px' }} />
                                Màn hình chính
                            </MenuItem>
                        </Link>
                        <SubMenu defaultOpen label={<span><FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />Lớp học</span>}>
                            {data.map((item, index) => (
                                <MenuItem key={index} >
                                    <Link to={`/lophocgv/${item.maLopHoc}`} style={{ color: 'black' }}>
                                        {item.tenLopHoc}
                                    </Link>
                                </MenuItem>
                            ))}
                        </SubMenu>

                        <Link to='/chinhsua' style={{ color: 'black' }}>
                            <MenuItem >
                                <FontAwesomeIcon icon={faGears} style={{ marginRight: '10px' }} />
                                Chỉnh sửa
                            </MenuItem>
                        </Link>

                        <Link to="/lichday" style={{ color: 'black' }}>
                            <MenuItem >
                                <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '10px' }} />
                                Lịch Dạy
                            </MenuItem>
                        </Link>

                        <Link to="/" onClick={handleLogout} style={{ color: 'black' }}>
                            <MenuItem >
                                <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '10px' }} />
                                Thoát
                            </MenuItem>
                        </Link>

                    </Menu>
                </Sidebar>
                {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}> */}
                <div style={{ marginTop: '20px' }}>
                    <div className="d-flex justify-content-end" >
                        <Button variant="primary mx-2" onClick={exportToExcel} style={{ marginRight: '50px' }}> Tải xuống </Button>
                    </div>

                    <table className="table" style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '100px' }}>
                        {lichday && lichday.length > 0 && (
                            <thead>
                                <tr>
                                    <th>Lớp học</th>
                                    <th>Thời gian</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Phòng</th>
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {lichday && lichday.length > 0 ? (
                                lichday.map((lop, index) => (
                                    <tr key={index}>
                                        <td>{lop.tenLopHoc}</td>
                                        <td>{lop.thoigian}</td>
                                        <td>{lop.ngay_batdau}</td>
                                        <td>{lop.diadiem}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td style={{ border: 'none', color: '#FD6504' }}>Chưa có lịch dạy</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>

    );
};

export default LichDay;
