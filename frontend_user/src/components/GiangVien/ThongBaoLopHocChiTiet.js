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
import Image from '../../images/logominhhoa.png';

const ThongBaoLopHocChiTiet = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [classes, setClasses] = useState([]);
    const [data, setData] = useState([]);
    const [thongbao, setThongBao] = useState([]);
    const [thongBao, setThongBaoCT] = useState(null);
    const [File, setFile] = useState([]);
    const [tenGV, setTenGV] = useState("");
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

    const { maLopHoc } = useParams();
    const { maTB } = useParams();
    console.log(maTB, 'matb')
    const [lopHoc, setLopHoc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layLopHocGiaoVien/${maLopHoc}`);
                setLopHoc(response.data.LopHoc);

                const responseTB = await axios.get(`http://localhost:2209/api/v1/layThongBaoLopHoc/${maLopHoc}`);
                // console.log(responseTB)

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
                setThongBaoCT(responseTBCT.data.TBCT[0]);

                const responseFile = await axios.get(`http://localhost:2209/api/v1/layFile/${maTB}`);
                setFile(responseFile.data.File);

            } catch (error) {
                console.error('Error fetching thong bao:', error);
            }
        };

        fetchData();
    }, [maTB]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseFile = await axios.get(`http://localhost:2209/api/v1/layFile/${maTB}`);
                setFile(responseFile.data.File);


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
                                <MenuItem key={index}>
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

                <div className='centered-divtb' >
                    <div>
                        {thongBao ? (
                            <div>
                                <div style={{ borderBottom: '2px solid rgb(25, 103, 210)', paddingBottom: '10px' }}>
                                    <div style={{ color: 'rgb(25, 103, 210)', fontSize: '35px' }}>
                                        {thongBao.tieude_thongbao}</div>
                                    <p>{thongBao.tenGV} {formatDate(thongBao.ngaydang)}</p>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: thongBao.noidung_thongbao }} style={{ marginBottom: '20px' }}></div>

                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    {File.length > 0 && (
                        <div>
                            <ul>
                                {File.map((file, index) => (
                                    <li key={index}>
                                        <Link to={`/preview/${file.tenFile}`} target="_blank" style={{ color: 'black' }}>
                                            <div className="file-container" style={{ marginTop: '10px' }}>
                                                <img src={Image} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                                {file.tenFile}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>

    );
};

export default ThongBaoLopHocChiTiet;
