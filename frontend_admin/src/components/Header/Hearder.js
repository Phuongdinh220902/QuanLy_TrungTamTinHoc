import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import logo from '../../images/hackeradmin.png'
const Header = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const confirmLogout = () => {
        navigate('/');
    };
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    };



    return (
        <>
            <style>
                {`
          .dropdown-toggle::after {
            display: none !important;
          }
        `}
            </style>

            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand >Trung tâm tin học</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to='/giangvien' className='nav-link'>Giảng Viên</NavLink>
                            <NavLink to='/user' className='nav-link'>Học Viên</NavLink>
                            <NavLink to='/khoahoc' className='nav-link'>Khoá Học</NavLink>
                            {/* <Nav>
                            <NavDropdown title="Khoá Học" id="basic-nav-dropdown">
                                <NavLink to='/khoahoc/cnttcoban' className='nav-link'>Ứng Dụng CNTT Cơ Bản</NavLink>
                                <NavLink to='/khoahoc/cnttnangcao' className='nav-link'>Ứng Dụng CNTT Nâng Cao</NavLink>
                                <NavLink to='/khoahoc/mos' className='nav-link'>MOS</NavLink>
                                <NavLink to='/khoahoc/tester' className='nav-link'>Kiểm Thử Phần Mềm</NavLink>
                                <NavLink to='/khoahoc/ltpython' className='nav-link'>Lập Trình Python</NavLink>
                                <NavDropdown.Item href="#action/3.1">Ứng Dụng CNTT Cơ Bản</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Ứng Dụng CNTT Nâng Cao</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">MOS</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">Lập Trình Căn Bản</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.5">Kiểm Thử Phần Mềm</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.6">Lập Trình Python</NavDropdown.Item>
                            </NavDropdown>
                        </Nav> */}

                        </Nav>


                        <Nav>
                            <img className='logo' src={logo} />
                            <NavDropdown title={<span className="admin-title">Admin</span>} id="basic-nav-dropdown">

                                <NavLink to="/" className="nav-link" onClick={handleShow}>
                                    <FontAwesomeIcon icon={faRightFromBracket} /> Đăng Xuất</NavLink>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Đăng Xuất</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có chắc muốn đăng xuất không?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={confirmLogout}>
                                OK
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;