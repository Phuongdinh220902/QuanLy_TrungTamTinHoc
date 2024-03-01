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
import Image from '../../images/img_backtoschool.jpg';
import Image1 from '../../images/img_clr.jpg';
import Image2 from '../../images/img_code.jpg';

const NguoiDung = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [classes, setClasses] = useState([]);
    const [data, setData] = useState([]);
    const [thongbao, setThongBao] = useState([]);
    const [tenGV, setTenGV] = useState("");
    const maGV = localStorage.getItem('maGV');
    const [tenHA, setTenHA] = useState("");
    const [randomImage, setRandomImage] = useState('');
    const images = [Image, Image1, Image2];
    const [currentMaLopHoc, setCurrentMaLopHoc] = useState('');


    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };


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

    const { maLopHoc } = useParams();
    const [lopHoc, setLopHoc] = useState([]);
    const [giangVien, setGiangVien] = useState([]);
    const [hocVien, setHocVien] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layLopHocGiaoVien/${maLopHoc}`);
                setLopHoc(response.data.LopHoc);
                setRandomImage(getRandomImage());


                const responseTB = await axios.get(`http://localhost:2209/api/v1/layThongBaoLopHoc/${maLopHoc}`);
                console.log(responseTB)
                setThongBao(responseTB.data.TB);

                const responseND = await axios.get(`http://localhost:2209/api/v1/layNguoiDung/${maLopHoc}`);
                // setNguoiDung(responseND.data.MN);

                const { MN } = responseND.data;

                // Tách danh sách thành giáo viên và học viên
                const gv = [];
                const hv = [];
                MN.forEach((nguoi) => {
                    if (nguoi.maGV) {
                        gv.push(nguoi);
                    } if (nguoi.maHV) {
                        hv.push(nguoi);
                    }
                });

                setGiangVien(gv);
                setHocVien(hv);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [maLopHoc]);

    useEffect(() => {
        setCurrentMaLopHoc(maLopHoc);
    }, [maLopHoc]);


    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('giangvien');
        navigate('/');
    };

    const formatDate = (dateTimeString) => {
        // Tạo đối tượng Date từ chuỗi datetime
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();

        // Định dạng lại ngày theo yêu cầu "dd-mm-yyyy"
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };


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

                <Sidebar collapsed={collapsed}>
                    <Menu>
                        <MenuItem >
                            <FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '10px' }} />
                            Màn hình chính
                        </MenuItem>
                        <SubMenu defaultOpen label={<span><FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />Lớp học</span>}>
                            {data.map((item, index) => (
                                <MenuItem key={index} className={currentMaLopHoc === item.maLopHoc ? 'highlighted-menu-item' : ''}>
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

                {/* Right Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div style={{ padding: '15px', marginBottom: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}>
                        <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0, marginLeft: '25px', fontSize: '16px' }}>
                            <li style={{ marginRight: '20px', marginLeft: '17px' }}>
                                <Link to={`/lophocgv/${maLopHoc}`} style={{ color: 'black' }}>
                                    Bảng tin
                                </Link>
                            </li>
                            <li >
                                <Link to={`/moinguoi/${maLopHoc}`} className="highlighted-link" > Mọi người</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Content */}

                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>


                        <div className='centered-div-nd'>
                            <div style={{ marginBottom: '70px' }}>
                                <h2 className='gv'>Giáo viên</h2>
                                {giangVien.map((gv, index) => (
                                    <div className='user-info-container' key={index} style={{ marginLeft: '20px', marginBottom: '25px' }}>
                                        <img src={`http://localhost:2209/images/${gv.tenHA}`} alt="Avatar" style={{ width: '40px', height: '40px' }} />
                                        <p style={{ fontSize: '14px', marginTop: '10px' }}> {gv.tenGV}</p>
                                    </div>
                                ))}
                            </div>

                            <div >
                                <h2 className='gv'>Bạn học</h2>
                                {hocVien.map((hv, index) => (
                                    <div className='user-info-container' key={index} style={{ marginLeft: '20px', marginBottom: '25px' }}>
                                        <img src={`http://localhost:2209/images/${hv.tenHinhAnhHV}`} alt="Avatar" style={{ width: '40px', height: '40px' }} />
                                        <p style={{ fontSize: '14px', marginTop: '10px' }}> {hv.tenHV}</p>
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default NguoiDung;
