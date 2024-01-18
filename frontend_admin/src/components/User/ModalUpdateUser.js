import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
import { format } from "date-fns";


const ModalUpdateUser = ({ show, handleClose, selectedUser, onUpdate }) => {
    const [tenHV, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('02/02/2000');
    const [gioitinh, setGioitinh] = useState('Nam');
    const [noisinh, setNoisinh] = useState('');
    const newns = format(new Date(ngaysinh), "dd/MM/yyyy");

    console.log(selectedUser)
    useEffect(() => {
        if (selectedUser) {
            setTen(selectedUser.tenHV);
            setEmail(selectedUser.email);
            setSdt(selectedUser.sdt);
            setNgaysinh(selectedUser.ngaysinh);
            setGioitinh(selectedUser.gioitinh == 1 ? 'Nam' : 'Nữ');
            setNoisinh(selectedUser.noisinh);
        }
    }, [selectedUser]);

    const handleUpdate = async () => {
        const formattedNgaySinh = format(new Date(ngaysinh), 'yyyy-MM-dd');

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
            tenHV = tenHV.trim();
            tenHV = tenHV.replace(/\s+/g, ' ');
            console.log(tenHV)
            return tenHV;
        };

        const normalizeNoisinhHV = (noisinh) => {
            noisinh = noisinh.trim();
            noisinh = noisinh.replace(/\s+/g, ' ');
            console.log(noisinh)
            return noisinh;
        };

        const isValidEmail = validateEmail(email);
        const isValidPhone = validatePhoneNumber(sdt);

        const normalizedTenHV = normalizeTenHV(tenHV);
        const normalizedNoisinhHV = normalizeNoisinhHV(noisinh);

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

        try {
            const formData = new FormData();
            formData.append('tenHV', normalizedTenHV);
            formData.append('email', email);
            formData.append('sdt', sdt);
            formData.append('ngaysinh', formattedNgaySinh);
            // Ánh xạ giới tính từ frontend sang backend
            const gioitinhValue = gioitinh == 'Nam' ? 1 : 0;
            formData.append('gioitinh', gioitinhValue);
            formData.append('noisinh', normalizedNoisinhHV);
            for (const value of formData.values()) {
                console.log(value);
            }

            let mdata = {
                maHV: selectedUser.maHV,
                tenHV: normalizedTenHV,
                email: email,
                sdt: sdt,
                ngaysinh: formattedNgaySinh,
                gioitinh: gioitinhValue,
                noisinh: normalizedNoisinhHV,
            }
            console.log(mdata)
            await axios.post('http://localhost:2209/api/v1/updateHV', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            toast.success('Update người dùng thành công');
            onUpdate();
            handleClose();
        }
        catch (error) {
            console.error("Lỗi khi gọi API cập nhật học viên:", error.message);
            toast.error("Đã xảy ra lỗi khi cập nhật học viên");
        }
    };


    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" backdrop='static' className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa học viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên Học Viên</label>
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
                            <input type="text" className="form-control" value={newns}
                                onChange={(event) => setNgaysinh(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Giới Tính</label>
                            <select className="form-select"
                                onChange={(event) => setGioitinh(event.target.value)}>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Nơi sinh</label>
                            <input type="text" className="form-control" value={noisinh}
                                onChange={(event) => setNoisinh(event.target.value)} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdate()}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <ToastProvider /> */}
        </div>

    );

};

export default ModalUpdateUser;
