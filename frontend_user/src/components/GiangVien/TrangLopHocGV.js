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
    faBell
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Image from '../../images/img_backtoschool.jpg';
import Image1 from '../../images/img_clr.jpg';
import Image2 from '../../images/img_code.jpg';
const TrangLopHocGV = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [classes, setClasses] = useState([]);
    const [data, setData] = useState([]);
    const [thongbao, setThongBao] = useState([]);
    const [tenGV, setTenGV] = useState("");
    // const { maGV } = useParams();
    const maGV = localStorage.getItem('maGV');
    const [tenHA, setTenHA] = useState("");
    const [randomImage, setRandomImage] = useState('');
    const images = [Image, Image1, Image2];
    const [selectedClass, setSelectedClass] = useState(null);
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


                const responseTB = await axios.get(`http://localhost:2209/api/v1/layThongBaoLopHoc/${maLopHoc}`);
                console.log(responseTB)
                setThongBao(responseTB.data.TB);

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
                                Cài đặt
                            </Link>
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
                            <li style={{ marginRight: '20px' }}>
                                <Link to={`/lophocgv/${maLopHoc}`} className="highlighted-link">
                                    Bảng tin
                                </Link>
                            </li>
                            <li>
                                <Link to={`/moinguoi/${maLopHoc}`} className="highlighted-link1" style={{ color: 'black' }}>
                                    Mọi người
                                </Link>
                            </li>
                        </ul>
                    </div>



                    {/* Content */}
                    <div>

                        <div style={{ marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: '0' }}>
                            <div style={{ position: 'relative', width: '80%', height: '250px', backgroundImage: `url(${randomImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: '0', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}></div>
                            <h1 style={{ textAlign: 'center', position: 'absolute', zIndex: '1', color: '#fff', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Lớp học {lopHoc.length > 0 && lopHoc[0].tenLopHoc}</h1>
                        </div>


                        <div className="centered-div user-info-container ">
                            <Link to={`/themthongbao/${maLopHoc}`}>
                                <img src={`http://localhost:2209/images/${tenHA}`} alt="Avatar" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                Đăng nội dung nào đó cho lớp học của bạn
                            </Link>
                        </div>

                        <div>
                            {thongbao ? (
                                thongbao.map((tb, index) => (
                                    <div className="centered-div1" key={index}>
                                        <Link to={`/chitietthongbao/${tb.maTB}`}>
                                            <div>
                                                <FontAwesomeIcon icon={faBell} className="icon" />
                                                <div>
                                                    <p style={{ marginLeft: '60px', fontSize: '0.875rem', fontWeight: '500', color: '#3c4043', fontFamily: "Google Sans, Roboto, Arial, sans-serif", letterSpacing: '.01785714em', lineHeight: '1.25rem' }}>{tb.tenGV} đã đăng một thông báo mới: {tb.tieude_thongbao}</p>
                                                    <p style={{ marginLeft: '60px', fontSize: '13px', opacity: 0.7, color: 'black' }}>{formatDate(tb.ngaydang)}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                ))
                            ) : (
                                <p>Không có thông báo nào.</p>
                            )}
                        </div>


                    </div>

                </div>

            </div>
        </div>

    );
};

export default TrangLopHocGV;
