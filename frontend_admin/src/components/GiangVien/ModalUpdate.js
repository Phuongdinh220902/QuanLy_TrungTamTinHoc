// import React, { useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import {
//     faFileImport,
//     faUserPlus,
//     // faMagnifyingGlass,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//     laydsgv
// } from "../../services/apiService";
// import axios from "axios"
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ModalUpdateGV = (props) => {
//     const [show, setShow] = useState(false);
//     const [tenGV, setTen] = useState('');
//     const [email, setEmail] = useState('');
//     const [sdt, setSdt] = useState('');
//     const [ngaysinh, setNgaysinh] = useState('');

//     const [gioitinh, setGioitinh] = useState('Nữ');
//     const [image, setImage] = useState('');
//     const [previewImage, setPreviewImage] = useState('');

//     const handleClose = () => {
//         setShow(false)
//         setTen("");
//         setEmail("");
//         setSdt("");
//         setNgaysinh("");
//         setGioitinh("Nam");
//         setImage("");
//         setPreviewImage("");
//     }
//     const handleShow = () => setShow(true);

//     const handleUpLoadImage = (event) => {
//         if (event.target && event.target.files && event.target.files[0]) {
//             setPreviewImage(URL.createObjectURL(event.target.files[0]));
//             setImage(event.target.files[0]);
//         }
//     };

//     const validateEmail = (email) => {
//         return String(email)
//             .toLowerCase()
//             .match(
//                 /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//             );
//     };

//     const handleSave = async () => {
//         const isValidEmail = validateEmail(email);

//         if (!isValidEmail) {
//             // alert('Email sai')
//             toast.error('Email không hợp lệ');
//             return;
//         }
//         const formData = new FormData();
//         formData.append('tenGV', tenGV);
//         formData.append('email', email);
//         formData.append('sdt', sdt);
//         formData.append('ngaysinh', ngaysinh);
//         // Ánh xạ giới tính từ frontend sang backend
//         const gioitinhValue = gioitinh === 'Nam' ? 1 : 0;
//         formData.append('gioitinh', gioitinhValue);

//         // formData.append('file', image);
//         formData.append('file', image, image.name);
//         let res = await axios.post('http://localhost:2209/api/v1/themgv', formData);
//         console.log("check", res.data)
//         if (res.data && res.data.EC === 0) {
//             toast.success(res.data.EM);
//             handleClose();
//         }

//         if (res.data && res.data.EC !== 0) {
//             toast.error(res.data.EM);
//         }
//     }

//     return (
//         <>
//             <Button variant="primary" onClick={handleShow} className="btn-lg bt-create">
//                 <FontAwesomeIcon icon={faUserPlus} /> Thêm
//             </Button>

//             <Button variant="primary" onClick={handleShow} className="btn-lg bt-sreach">
//                 <FontAwesomeIcon icon={faUserPlus} /> Tìm
//             </Button>

//             <Modal show={show} onHide={handleClose}
//                 size="xl"
//                 backdrop='static'
//                 className="modal-add">
// <Modal.Header closeButton>
//     <Modal.Title>Thêm mới giảng viên</Modal.Title>
// </Modal.Header>
// <Modal.Body>
//     <form className="row g-3">
//         <div className="col-12">
//             <label className="form-label">Tên Giảng Viên</label>
//             <input type="text" className="form-control" value={tenGV}
//                 onChange={(event) => setTen(event.target.value)} />
//         </div>
//         <div className="col-12">
//             <label className="form-label">Email</label>
//             <input type="email" className="form-control" value={email}
//                 onChange={(event) => setEmail(event.target.value)} />
//         </div>
//         <div className="col-12">
//             <label className="form-label">Số điện thoại</label>
//             <input type="text" className="form-control" value={sdt}
//                 onChange={(event) => setSdt(event.target.value)} />
//         </div>
//         <div className="col-12">
//             <label className="form-label">Ngày sinh</label>
//             <input type="date" className="form-control" value={ngaysinh}
//                 onChange={(event) => setNgaysinh(event.target.value)} />
//         </div>
//         <div className="col-md-4">
//             <label className="form-label">Giới Tính</label>
//             <select className="form-select"
//                 onChange={(event) => setGioitinh(event.target.value)}>
//                 <option value="Nam">Nam</option>
//                 <option value="Nữ">Nữ</option>
//             </select>
//         </div>

//         <div className="col-md-12">
//             <label className="form-label label-upload" htmlFor="labelUpload">
//                 <FontAwesomeIcon icon={faFileImport} /> Tải ảnh lên </label>
//             <input type="file" id="labelUpload" hidden
//                 onChange={(event) => handleUpLoadImage(event)} />
//         </div>

//         <div className="col-md-12 img-preview">
//             {previewImage ?
//                 <img src={previewImage} />
//                 :
//                 <span>preview</span>
//             }
//         </div>
//     </form>
// </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Đóng
//                     </Button>
//                     <Button variant="primary" onClick={() => handleSave()}>
//                         Lưu
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default ModalUpdateGV;

import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
// import ToastProvider from "../ToastContainer";
import { format } from "date-fns";


const ModalUpdateGV = ({ show, handleClose, selectedGiangVien, onUpdate }) => {
    const [tenGV, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [gioitinh, setGioitinh] = useState('Nam');
    // Các biến khác nếu có
    console.log(selectedGiangVien)
    useEffect(() => {
        if (selectedGiangVien) {
            setTen(selectedGiangVien.tenGV);
            setEmail(selectedGiangVien.email);
            setSdt(selectedGiangVien.sdt);
            // setNgaysinh(selectedGiangVien.ngaysinh);
            setGioitinh(selectedGiangVien.gioitinh === 1 ? 'Nam' : 'Nữ');
            // Cài đặt các biến khác nếu có
        }
    }, [selectedGiangVien]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('tenHV', tenGV);
            formData.append('email', email);
            formData.append('sdt', sdt);
            // formData.append('ngaysinh', ngaysinh);

            // Ánh xạ giới tính từ frontend sang backend
            const gioitinhValue = gioitinh === 'Nam' ? 1 : 0;
            formData.append('gioitinh', gioitinhValue);
            // formData.append('noisinh', noisinh);
            for (const value of formData.values()) {
                console.log(value);
            }

            let mdata = {
                maGV: selectedGiangVien.maGV,
                tenGV: tenGV,
                email: email,
                sdt: sdt,
                gioitinh: gioitinhValue,
            }
            console.log(mdata)
            await axios.post('http://localhost:2209/api/v1/updateGV', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            toast.success('Update thành công');
            handleClose();
        }
        catch (error) {
            console.error("Lỗi khi gọi API cập nhật giảng viên:", error.message);
            toast.error("Đã xảy ra lỗi khi cập nhật giảng viên");
        }
    };


    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" backdrop='static' className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa giảng viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên Giảng Viên</label>
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

export default ModalUpdateGV;
