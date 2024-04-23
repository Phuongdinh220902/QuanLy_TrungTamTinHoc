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
    faBell,
    faCalendarDays
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Image from '../../images/img_backtoschool.jpg';
import Image1 from '../../images/img_clr.jpg';
import Image2 from '../../images/img_code.jpg';
import moment from 'moment';


const NhapDiem = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [classes, setClasses] = useState([]);
    const [data, setData] = useState([]);
    const [tenGV, setTenGV] = useState("");
    // const { maGV } = useParams();
    const maGV = localStorage.getItem('maGV');
    const [tenHA, setTenHA] = useState("");
    const [randomImage, setRandomImage] = useState('');
    const images = [Image, Image1, Image2];
    const [selectedClass, setSelectedClass] = useState(null);
    const [nhapdiem, setNhapDiem] = useState([]);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layLopHocGiaoVien/${maLopHoc}`);
                setLopHoc(response.data.LopHoc);
                console.log(response, 'lh')
                setRandomImage(getRandomImage());

                const responseHV = await axios.get(`http://localhost:2209/api/v1/NhapDiem/${maLopHoc}`);
                setNhapDiem(responseHV.data.Diem);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [maLopHoc]);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('giangvien');
        // setUser(null);
        navigate('/');
    };
    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const updatedDiem = [...nhapdiem]; // Tạo một bản sao của mảng nhapdiem
        updatedDiem[index].diem = value; // Cập nhật giá trị điểm trong mảng sao chép
        setNhapDiem(updatedDiem); // Cập nhật mảng nhapdiem với giá trị mới
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
                {/* Sidebar */}
                <Sidebar collapsed={collapsed} >
                    <Menu >
                        <Link to={'/giangvien'} style={{ color: 'black' }}>
                            <MenuItem >
                                <FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '10px' }} />
                                Màn hình chính
                            </MenuItem>
                        </Link>

                        <SubMenu defaultOpen label={<span><FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />Lớp học</span>}>
                            {data.map((item, index) => (
                                <MenuItem key={index} className={selectedClass === item.maLopHoc ? 'highlighted-class' : ''} onClick={() => setSelectedClass(item.maLopHoc)}>
                                    <Link to={`/lophocgv/${item.maLopHoc}`} style={{ color: 'black' }}>
                                        {item.tenLopHoc}
                                    </Link>
                                </MenuItem>
                            ))}
                        </SubMenu>

                        <MenuItem >
                            <Link to={`/chinhsua`} style={{ color: 'black' }}>
                                <FontAwesomeIcon icon={faGears} style={{ marginRight: '10px', color: 'black' }} />
                                Chỉnh sửa
                            </Link>
                        </MenuItem>

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

                {/* Right Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div style={{ padding: '15px', marginBottom: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}>
                        <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0, marginLeft: '25px', fontSize: '16px' }}>
                            <li style={{ marginRight: '20px' }}>
                                <Link to={`/lophocgv/${maLopHoc}`} className="highlighted-link1" style={{ color: 'black' }}>
                                    Bảng tin
                                </Link>
                            </li>
                            <li>
                                <Link to={`/moinguoi/${maLopHoc}`} className="highlighted-link1" style={{ color: 'black' }}>
                                    Mọi người
                                </Link>
                            </li>
                            <li>
                                <Link to={`/nhapdiem/${maLopHoc}`} className="highlighted-link" >
                                    Nhập điểm
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div style={{ padding: '15px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã số học viên</th>
                                    <th>Tên học viên</th>
                                    <th>Điểm</th> {/* Cột cuối cùng */}
                                </tr>
                            </thead>
                            <tbody>
                                {nhapdiem.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.mshv}</td>
                                        <td>{item.tenHV}</td>

                                        <td><input type="text" value={item.diem} onChange={(e) => handleInputChange(e, index)} /></td> {/* Ô input */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                </div>

            </div>
        </div>

    );
};

export default NhapDiem;
