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
                            <NavLink to='/anhgioithieu' className='nav-link'>Ảnh Quảng Cáo</NavLink>
                            <NavLink to='/thongtindiemthi' className='nav-link'>Thông Tin Điểm Thi</NavLink>
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