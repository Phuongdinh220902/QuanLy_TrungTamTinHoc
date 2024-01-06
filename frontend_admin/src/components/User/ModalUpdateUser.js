import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
// import ToastProvider from "../ToastContainer";
import { format } from "date-fns";


const ModalUpdateUser = ({ show, handleClose, selectedUser, onUpdate }) => {
    const [tenHV, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    // const [ngaysinh, setNgaysinh] = useState('');
    const [gioitinh, setGioitinh] = useState('Nam');
    const [noisinh, setNoisinh] = useState('');
    // Các biến khác nếu có
    console.log(selectedUser)
    useEffect(() => {
        if (selectedUser) {
            setTen(selectedUser.tenHV);
            setEmail(selectedUser.email);
            setSdt(selectedUser.sdt);
            // setNgaysinh(selectedUser.ngaysinh);
            setGioitinh(selectedUser.gioitinh === 1 ? 'Nam' : 'Nữ');
            setNoisinh(selectedUser.noisinh);
        }
    }, [selectedUser]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('tenHV', tenHV);
            formData.append('email', email);
            formData.append('sdt', sdt);
            // formData.append('ngaysinh', ngaysinh);

            // Ánh xạ giới tính từ frontend sang backend
            const gioitinhValue = gioitinh === 'Nam' ? 1 : 0;
            formData.append('gioitinh', gioitinhValue);
            formData.append('noisinh', noisinh);
            // formData.append('noisinh', noisinh);
            for (const value of formData.values()) {
                console.log(value);
            }

            let mdata = {
                maHV: selectedUser.maHV,
                tenHV: tenHV,
                email: email,
                sdt: sdt,
                gioitinh: gioitinhValue,
                noisinh: noisinh,
            }
            console.log(mdata)
            await axios.post('http://localhost:2209/api/v1/updateHV', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            toast.success('Update người dùng thành công');
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
                        {/* <div className="col-12">
                            <label className="form-label" >Ngày sinh</label>
                            <input type="text" className="form-control" value={format(new Date(ngaysinh), 'dd-MM-yyyy')}
                                onChange={(event) => setNgaysinh(event.target.value)}
                            />
                        </div> */}
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
