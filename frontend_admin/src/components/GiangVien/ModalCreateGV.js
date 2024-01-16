import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileImport,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const ModalCreateGV = ({ show, handleCloseModalGV, onUpdate }) => {
    const [tenGV, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');

    const [gioitinh, setGioitinh] = useState('Nữ');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [showModalCreateGV, setShowModalCreateGV] = useState(false);

    const handleClose = () => {
        setShowModalCreateGV(false);
        setTen("");
        setEmail("");
        setSdt("");
        setNgaysinh("");
        setGioitinh("Nam");
        setImage("");
        setPreviewImage("");
        handleCloseModalGV();
    }
    const handleShow = () => setModalOpen(true);

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
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

    const normalizetenGV = (tenGV) => {
        // Loại bỏ khoảng trắng dư thừa ở đầu và cuối chuỗi
        tenGV = tenGV.trim();
        // Thay thế nhiều khoảng trắng ở giữa chuỗi bằng một khoảng trắng
        tenGV = tenGV.replace(/\s+/g, ' ');
        console.log(tenGV)
        return tenGV;
    };


    const handleSave = async () => {
        const isValidEmail = validateEmail(email);
        const isValidPhone = validatePhoneNumber(sdt);
        const ngaySinhDate = new Date(ngaysinh);
        const today = new Date();
        const ageDifferenceInMilliseconds = today - ngaySinhDate;
        const ageDifferenceInYears = ageDifferenceInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);

        const normalizedtenGV = normalizetenGV(tenGV);

        if (!tenGV.trim() || !email || !sdt || !ngaysinh || !gioitinh) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }
        // Kiểm tra tên có ít nhất 2 cụm từ
        const words = tenGV.trim().split(/\s+/);
        if (words.length < 2) {
            toast.error('Tên phải có ít nhất 2 cụm từ.');
            return;
        }

        if (!/^[^\d!@#$%^&*()_+={}\[\]:;<>,?~\\/`"\|]*$/.test(tenGV)) {
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
        const formData = new FormData();
        console.log(gioitinh)
        formData.append('tenGV', normalizedtenGV);
        formData.append('email', email);
        formData.append('sdt', sdt);
        formData.append('ngaysinh', ngaysinh);
        // Ánh xạ giới tính từ frontend sang backend
        const gioitinhValue = gioitinh == 'Nam' ? 1 : 0;
        formData.append('gioitinh', gioitinhValue);

        // formData.append('file', image);
        formData.append('file', image, image.name);
        let res = await axios.post('http://localhost:2209/api/v1/themgv', formData);
        console.log("check", res.data)
        if (res.data && res.data.EC === 0) {
            toast.success(res.data.EM);
            onUpdate();
            handleClose();
        }

        if (res.data && res.data.EC !== 0) {
            toast.error(res.data.EM);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}
                size="xl"
                backdrop='static'
                className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới giảng viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên giảng viên</label>
                            <input type="text" className="form-control" value={tenGV}
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
                        <div className="col-md-4">
                            <label className="form-label">Giới Tính</label>
                            <select className="form-select"
                                onChange={(event) => setGioitinh(event.target.value)}>
                                <option value="Nữ">Nữ</option>
                                <option value="Nam">Nam</option>

                            </select>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <FontAwesomeIcon icon={faFileImport} /> Tải ảnh lên </label>
                            <input type="file" id="labelUpload" hidden
                                onChange={(event) => handleUpLoadImage(event)} />
                        </div>

                        <div className="col-md-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>preview</span>
                            }
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

export default ModalCreateGV;