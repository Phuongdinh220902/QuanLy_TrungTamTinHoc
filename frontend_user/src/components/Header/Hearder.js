import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import logoImage from '../../images/logoctu.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from 'react-bootstrap';
import {
    faHouse, faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import namImg from '../../images/nam.jpg';
import nuImg from '../../images/nu.jpg';
import { Link } from "react-router-dom";

const Header = () => {
    const [dsKH, setDsKH] = useState([]);
    const [user, setUser] = useState(null);
    const [dsAnh, setDsAnh] = useState([]);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    useEffect(() => {
        const fetchHinhAnh = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/layHinhAnhTrangChu');
                setDsAnh(response.data.HA);
                console.log(response.data.HA);
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };
        fetchHinhAnh();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/layTrangChu');
                setDsKH(response.data.dsKH);
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };
        // Kiểm tra nếu đã đăng nhập trước đó (tức là có thông tin người dùng trong Local Storage), thì cập nhật state user
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }

        fetchData();
    }, []);

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showLogout, setShowLogout] = useState(false);
    const handleClose = () => setShow(false);


    const handleShow = (e, course) => {
        e.preventDefault();
        setShow(true);
        setSelectedCourse(course);
    };

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMouseOver = () => {
        setMenuOpen(true);
    };

    const handleMouseLeave = () => {
        setMenuOpen(false);
        setSelectedCourse(null);
    };



    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const DangNhap = () => {
        navigate('/dangnhap');
    };

    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <>
            <div className="container hidden-xs" style={{ position: 'relative' }}>
                <div className="logo clearfix">
                    <a href="/" title="Responsive Slide Menus">
                        <img src={logoImage} alt="" />
                    </a>
                </div>
                <div className="searchdestop">
                    <div className="icon" >
                        <i className="shopping-cart"></i>
                        <span style={{ margin: '0 2px 0 0' }}></span>
                    </div>
                    <div className="user-info">
                        {user && (
                            <div className="user-info-container">
                                <div className="user-info">
                                    <img src={user.gioitinh === 1 ? namImg : nuImg} alt={user.gioitinh === 1 ? 'Nam' : 'Nữ'} />
                                    <Link to='/trangcanhan' className="user-name" style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>
                                        {user.tenHV}

                                    </Link>&nbsp;
                                    &nbsp;<Link to="/" onClick={handleLogout} style={{ fontSize: '16px', color: 'black' }}>
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                    </Link>
                                </div>
                            </div>
                        )}
                        {!user && (
                            <Button variant="primary mx-2" onClick={DangNhap}>Đăng nhập</Button>
                        )}
                    </div>

                </div>
            </div>
            <Navbar expand="lg" className="header-menu">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" >
                            <NavLink to='/' className='nav-link text-white' style={{ marginLeft: '30px' }}>
                                <FontAwesomeIcon icon={faHouse} />
                            </NavLink>
                            <NavLink className='nav-link text-white' style={{ marginLeft: '30px' }}>
                                <div className="menu-wrapper">
                                    <div
                                        className="menu text-white"
                                        onMouseOver={handleMouseOver}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        Chương trình đào tạo
                                        {isMenuOpen && (
                                            <div className="submenu text-dark">
                                                <ul>
                                                    {dsKH.map((khoaHoc) => (
                                                        <li key={khoaHoc.maKH} onMouseOver={(e) => handleShow(e, khoaHoc)}>
                                                            <Link to={`/khoahoc/${khoaHoc.maKH}`} style={{ color: 'black' }}>{khoaHoc.tenKH}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        )}
                                    </div>
                                </div>

                            </NavLink>
                            <NavLink to='/tintuc' className='nav-link text-white' style={{ marginLeft: '30px' }}>Tin tức</NavLink>
                            <NavLink to='/thanhtoan' className='nav-link text-white' style={{ marginLeft: '30px' }}>Hướng dẫn thanh toán</NavLink>
                            <NavLink to='/lienhe' className='nav-link text-white' style={{ marginLeft: '30px' }}>Liên hệ</NavLink>
                            <NavLink to='/tracuuketqua' className='nav-link text-white' style={{ marginLeft: '30px' }}>Tra cứu kết quả thi</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <Carousel className="custom-carousel" interval={3000} controls={false} indicators onSelect={handleSelect}>
                {dsAnh.map((anh, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={`http://localhost:2209/images/${anh.tenHinhAnhQC}`}
                            alt=""
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

        </>

    );
}


export default Header;