import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';

const Them = ({ show, handleCloseModal, onUpdate }) => {
    const [tenHV, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [noisinh, setNoisinh] = useState('');
    const [gioitinh, setGioitinh] = useState('Nữ');


    const [modalOpen, setModalOpen] = useState(false);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const handleClose = () => {
        setShowModalCreateUser(false);
        setTen("");
        setEmail("");
        setSdt("");
        setNgaysinh("");
        setGioitinh("Nữ");
        setNoisinh("");

        handleCloseModal();
    };
    const handleShow = () => {
        setModalOpen(true);
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePhoneNumber = (sdt) => {
        return String(sdt).match(/^(09|08|02|03|07|05)[0-9]{8}$/);
    };

    const normalizeTenHV = (tenHV) => {
        // Loại bỏ khoảng trắng dư thừa ở đầu và cuối chuỗi
        tenHV = tenHV.trim();
        // Thay thế nhiều khoảng trắng ở giữa chuỗi bằng một khoảng trắng
        tenHV = tenHV.replace(/\s+/g, ' ');
        console.log(tenHV)
        return tenHV;
    };
    const normalizeNoisinhHV = (noisinh) => {
        // Loại bỏ khoảng trắng dư thừa ở đầu và cuối chuỗi
        noisinh = noisinh.trim();

        // Thay thế nhiều khoảng trắng ở giữa chuỗi bằng một khoảng trắng
        noisinh = noisinh.replace(/\s+/g, ' ');
        console.log(noisinh)
        return noisinh;
    };

    const handleSave = async () => {
        const isValidEmail = validateEmail(email);
        const isValidPhone = validatePhoneNumber(sdt);
        const normalizedNoisinhHV = normalizeNoisinhHV(noisinh);

        const ngaySinhDate = new Date(ngaysinh);
        const today = new Date();
        const ageDifferenceInMilliseconds = today - ngaySinhDate;
        const ageDifferenceInYears = ageDifferenceInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);

        const normalizedTenHV = normalizeTenHV(tenHV);

        if (!tenHV.trim() || !email || !sdt || !ngaysinh || !noisinh || !gioitinh) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }
        // Kiểm tra tên có ít nhất 2 cụm từ
        const words = tenHV.trim().split(/\s+/);
        if (words.length < 2) {
            toast.error('Tên phải có ít nhất 2 cụm từ.');
            return;
        }

        if (!/^[^\d!@#$%^&*()_+={}\[\]:;<>,?~\\/`"\|]*$/.test(tenHV)) {
            toast.error('Tên không được chứa các kí tự đặc biệt');
            return;
        }

        if (!isValidEmail) {
            toast.error('Email không hợp lệ');
            return;
        }
        if (!isValidPhone) {
            toast.error('Số điện thoại không hợp lệ');
            return;
        }

        if (ageDifferenceInYears < 18) {
            toast.error('Học viên phải có tuổi từ 16 trở lên');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('tenHV', normalizedTenHV);
            formData.append('email', email);
            formData.append('sdt', sdt);
            formData.append('ngaysinh', ngaysinh);

            // Ánh xạ giới tính từ frontend sang backend
            const gioitinhValue = gioitinh == 'Nam' ? 1 : 0;
            formData.append('gioitinh', gioitinhValue);
            formData.append('noisinh', normalizedNoisinhHV);

            for (const value of formData.values()) {
                console.log(value);
            }

            let mdata = {
                tenHV: normalizedTenHV,
                email: email,
                sdt: sdt,
                ngaysinh: ngaysinh,
                gioitinh: gioitinhValue,
                noisinh: normalizedNoisinhHV,
            }

            await axios.post('http://localhost:2209/api/v1/themHV', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            toast.success('Thêm thành công');
            onUpdate();
            handleClose();
        }
        catch (error) {
            console.error("Lỗi khi gọi API xoá giảng viên:", error.message);
            toast.error("Đã xảy ra lỗi khi xoá giảng viên");
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}
                size="xl"
                backdrop='static'
                className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới học viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên học viên</label>
                            <input type="text" className="form-control" value={tenHV}
                                onChange={(event) => setTen(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email}
                                onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Số điện thoại</label>
                            <input type="text" className="form-control" value={sdt}
                                onChange={(event) => setSdt(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Ngày sinh</label>
                            <input type="date" className="form-control" value={ngaysinh}
                                onChange={(event) => setNgaysinh(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Nơi sinh</label>
                            <input type="text" className="form-control" value={noisinh}
                                onChange={(event) => setNoisinh(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Giới tính</label>
                            <select className="form-select"
                                onChange={(event) => setGioitinh(event.target.value)}>
                                <option value="Nữ">Nữ</option>
                                <option value="Nam">Nam</option>

                            </select>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Them;
