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
    faHouse
} from "@fortawesome/free-solid-svg-icons";
import logoImage5 from '../../images/291-data-excel.png';
import logoImage1 from '../../images/291-mos-word.png';
import logoImage2 from '../../images/291-tin-hoc-van-phong.png';
import logoImage3 from '../../images/291-ud-cntt-co-ban.png';

function MyCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel className="custom-carousel" interval={4000} controls={false} indicators onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={logoImage5}
                    alt=""
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={logoImage1}
                    alt=""
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={logoImage2}
                    alt=""
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={logoImage3}
                    alt=""
                />
            </Carousel.Item>
        </Carousel>
    );
};

const Header = () => {
    const [dsKH, setDsKH] = useState([]);
    const [user, setUser] = useState(null);
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
    // const confirmLogout = () => {
    //     navigate('/');
    // };

    const confirmLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };


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
                    {/* <input type="text" placeholder="Tìm kiếm" className="noi-dung-tim" /> */}
                    {/* <span className="glyphicon glyphicon-search nut-tim" aria-hidden="true"></span> */}
                    {/* <div className="user-info">
                        {user && (
                            <div
                                onMouseOver={() => setShowLogout(true)}
                                onMouseLeave={() => setShowLogout(false)}
                            >
                                Xin chào, {user.tenHV} 
                                {showLogout && (
                                    <Button variant="link" onClick={handleLogout}>Đăng xuất</Button>
                                )}
                            </div>
                        )}
                        {!user && (
                            <>
                                <Button variant="primary mx-2" onClick={DangNhap}>Đăng nhập</Button>
                                <Button variant="secondary">Đăng ký</Button>
                            </>
                        )}
                    </div> */}

                    <div className="user-info">
                        {user && (
                            <div className="user-name">
                                {user.tenHV}
                            </div>
                        )}
                        {user && (
                            <div className="logout-button">
                                <Button variant="link" onClick={handleLogout}>Đăng xuất</Button>
                            </div>
                        )}
                        {!user && (
                            <>
                                <Button variant="primary mx-2" onClick={DangNhap}>Đăng nhập</Button>
                                {/* <Button variant="secondary">Đăng ký</Button> */}
                            </>
                        )}
                    </div>
                    {/* {user ? (
                        <div className="user-info">
                            Xin chào, {user.tenHV}
                        </div>
                    ) : (
                        <>
                            <Button variant="primary mx-2" onClick={DangNhap}>Đăng nhập</Button>
                            <Button variant="secondary">Đăng ký</Button>
                        </>
                    )} */}
                    {/* <Button variant="primary mx-2" onClick={DangNhap}>Đăng nhập</Button>

                    <Button variant="secondary">Đăng ký</Button> */}
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
                            <NavLink to='/ctdt' className='nav-link text-white' style={{ marginLeft: '30px' }}>

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
                                                            {khoaHoc.tenKH}
                                                            {selectedCourse === khoaHoc && (
                                                                <ul>
                                                                    {khoaHoc.dsLH.map((lopHoc) => (
                                                                        <li key={lopHoc.maLopHoc}>{lopHoc.tenLopHoc}</li>
                                                                    ))}
                                                                </ul>
                                                            )}
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

            <MyCarousel />
        </>

    );
}


export default Header;