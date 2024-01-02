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
    // faDownload,
    // faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

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
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand >Trung tâm tin học</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/giangvien' className='nav-link'>Giảng Viên</NavLink>
                        <NavLink to='/user' className='nav-link'>Người Dùng</NavLink>
                        {/* <Nav.Link href="#home">Giảng Viên</Nav.Link>
                        <Nav.Link href="#link">Người Dùng</Nav.Link> */}
                        {/* <Nav.Link href="#link"></Nav.Link> */}
                        <NavDropdown title="Khoá Học" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Ứng Dụng CNTT Cơ Bản</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Ứng Dụng CNTT Nâng Cao</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">MOS</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Lập Trình Căn Bản</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.5">Kiểm Thử Phần Mềm</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.6">Lập Trình Python</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavLink to="/" className="nav-link" onClick={handleShow}>
                            <FontAwesomeIcon icon={faRightFromBracket} /> Đăng Xuất</NavLink>
                    </Nav>
                </Navbar.Collapse>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={confirmLogout}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Navbar>

    );
}

export default Header;