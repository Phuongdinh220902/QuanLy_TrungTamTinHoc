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
    faBoxOpen
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const TCGiangVien = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [classes, setClasses] = useState([]);
    const [data, setData] = useState([]);
    const [tenGV, setTenGV] = useState("");
    // const { maGV } = useParams();
    const maGV = localStorage.getItem('maGV');
    const [tenHA, setTenHA] = useState("");

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layLopHocGV/${maGV}}`);
                setData(response.data.KH);
                console.log(maGV, 'ok')
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


    return (
        <div>
            <header style={{
                backgroundColor: 'white',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between', // Để căn giữa và icon và các phần tử khác
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
                        <MenuItem >
                            <FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '10px' }} />
                            Màn hình chính
                        </MenuItem>
                        <SubMenu defaultOpen label={<span><FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />Lớp học</span>}>
                            {data.map((item, index) => (
                                <MenuItem key={index}>
                                    <Link to={`/lophocgv/${item.maLopHoc}`}>
                                        {item.tenLopHoc}
                                    </Link>
                                </MenuItem>
                            ))}
                        </SubMenu>


                        <MenuItem >
                            <FontAwesomeIcon icon={faGears} style={{ marginRight: '10px' }} />
                            Cài đặt
                        </MenuItem>

                        <Link to="/" onClick={handleLogout} style={{ color: 'black' }}>
                            <MenuItem >
                                <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '10px' }} />
                                Thoát
                            </MenuItem>
                        </Link>

                    </Menu>
                </Sidebar>


                <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gridGap: '40px', marginLeft: '50px', marginTop: '30px' }}>
                    {data.map((item, index) => (
                        <div key={index} className="class-for-image-container" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', textAlign: 'center', height: '260px' }}>
                            <img src={`http://localhost:2209/images/${item.tenHinhAnhKH}`} className="class-for-image" />
                            <Link to={`/lophocgv/${item.maLopHoc}`}>
                                <h3>{item.tenLopHoc}</h3>
                            </Link>
                            <p>{item.tenGV}</p>
                        </div>

                    ))}
                </div>
            </div>
        </div>

    );
};

export default TCGiangVien;
