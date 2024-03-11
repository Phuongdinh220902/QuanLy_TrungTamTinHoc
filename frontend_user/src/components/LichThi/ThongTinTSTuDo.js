import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ThongTinTSTuDoDangKyThi = () => {
    const { maCaThi } = useParams();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        tenHV: '',
        email: '',
        sdt: '',
        ngaysinh: '',
        gioitinh: '',
        noisinh: '',
        dantoc: '',
        cccd: '',
        maCaThi: maCaThi
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleThem = async () => {
        try {
            const isValidPhone = validatePhoneNumber(formData.sdt);
            const isValidCCCD = validCCCD(formData.cccd);

            const words = formData.tenHV.trim().split(/\s+/);
            if (words.length < 2) {
                toast.error('Tên phải có ít nhất 2 cụm từ.');
                setShowModal(false);
                return;

            }

            if (!isValidCCCD) {
                toast.error('Mã số căn cước không hợp lệ');
                setShowModal(false);
                return;
            }

            if (!/^[^\d!@#$%^&*()_+={}\[\]:;<>,?~\\/`"\|]*$/.test(formData.tenHV)) {
                toast.error('Tên không được chứa các kí tự đặc biệt');
                setShowModal(false);
                return;
            }

            const isValidEmail = validateEmail(formData.email);
            if (!isValidEmail) {
                toast.error('Email không hợp lệ');
                setShowModal(false);
                return;
            }
            if (!isValidPhone) {
                toast.error('Số điện thoại không hợp lệ');
                setShowModal(false);
                return;
            }

            // Kiểm tra giới tính
            if (formData.gioitinh !== '0' && formData.gioitinh !== '1') {
                toast.error('Giới tính không hợp lệ');
                setShowModal(false);
                return;
            }

            const convertedNgaysinh = convertDateFormat(formData.ngaysinh);
            const normalizedtenHV = normalizetenHV(formData.tenHV);

            let requestData = {
                ...formData,
                tenHV: normalizedtenHV,
                ngaysinh: convertedNgaysinh

            };


            console.log(formData)
            const response = await axios.post('http://localhost:2209/api/v1/themHocVienDKThi', requestData);
            if (response.status === 200) {
                // Phản hồi thành công, hiển thị thông báo thành công
                toast.success("Bạn đã đăng ký lớp học thành công");
                setShowModal(false);
                setTimeout(() => {
                    navigate(`/thongbaolichthi`);
                }, 3000);

            } else {
                // Phản hồi có mã trạng thái 400, hiển thị thông báo lỗi từ phản hồi
                toast.error(response.data);
            }
        } catch (error) {
            if (error.response) {
                // Nếu server trả về mã trạng thái 400
                if (error.response.status === 400) {
                    const errorMessage = error.response.data;
                    // Hiển thị thông báo lỗi
                    toast.error(errorMessage);
                } else {
                    // Xử lý các trường hợp lỗi khác từ server
                    console.error("Lỗi khi thêm thông tin người dùng:", error);
                    toast.error("Lỗi khi thêm thông tin người dùng");
                }
            } else {
                // Xử lý các lỗi khác không phải từ server
                console.error("Lỗi khi thêm thông tin người dùng:", error);
                toast.error("Lỗi khi thêm thông tin người dùng");
            }
        }
        setShowModal(false);
    };


    const convertDateFormat = (dateString) => {
        const parts = dateString.split('-');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
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

    const validCCCD = (cccd) => {
        return String(cccd).match(/^(0)[0-9]{11}$/);
    };

    const normalizetenHV = (tenHV) => {
        tenHV = tenHV.trim();
        tenHV = tenHV.replace(/\s+/g, ' ');
        console.log(tenHV)
        return tenHV;
    };

    const styles = `
        .account-settings .user-profile {
            margin: 0 0 1rem 0;
            padding-bottom: 1rem;
            text-align: center;
        }
        .account-settings .user-profile .user-avatar {
            margin: 0 0 1rem 0;
        }
        .account-settings .user-profile .user-avatar img {
            width: 90px;
            height: 90px;
            -webkit-border-radius: 100px;
            -moz-border-radius: 100px;
            border-radius: 100px;
        }
        .account-settings .user-profile h5.user-name {
            margin: 0 0 1.5rem 0;
        }
        .account-settings .user-profile h6.user-email {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 400;
            color: #9fa8b9;
        }
        .account-settings .about {
            margin: 2rem 0 0 0;
            text-align: center;
        }
        .account-settings .about h5 {
            margin: 0 0 15px 0;
            color: #007ae1;
            font-size: 2.5rem;
        }
        .account-settings .about p {
            font-size: 0.825rem;
        }
        .form-control {
            border: 1px solid #cfd1d8;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            font-size: .825rem;
            background: #ffffff;
            color: #2e323c;
        }

        .card {
            background: #ffffff;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            border: 0;
            margin-bottom: 1rem;
        }
    
    `;


    return (
        <>
            <style>{styles}</style>

            <div className="container" style={{ marginTop: '45px' }}>
                <div className="row gutters">

                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 mx-auto">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Họ và Tên</label>
                                            <input type="text" className="form-control" id="fullName" placeholder="Nhập name" name="tenHV" value={formData.tenHV} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail">Email</label>
                                            <input type="email" className="form-control" id="eMail" placeholder="Nhập email" name="email" value={formData.email} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Số điện thoại</label>
                                            <input type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" name="sdt" value={formData.sdt} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="website">Ngày sinh</label>
                                            <input type="text" className="form-control" id="website" name="ngaysinh" placeholder="Nhập ngày sinh" value={formData.ngaysinh} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="Street">Nơi sinh</label>
                                            <input type="text" className="form-control" id="Street" name="noisinh" placeholder="Nhập nơi sinh" value={formData.noisinh} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="gender">Giới tính</label>
                                            <select className="form-control" id="gender" name="gioitinh" value={formData.gioitinh} onChange={handleChange}>
                                                <option value="">Chọn giới tính</option>
                                                <option value="0">Nữ</option>
                                                <option value="1">Nam</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="cccd">Căn cước công dân</label>
                                            <input type="text" className="form-control" id="cccd" placeholder="Nhập CCCD" name="cccd" value={formData.cccd} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="dantoc">Dân tộc</label>
                                            <input type="text" className="form-control" id="dantoc" placeholder="Nhập dân tộc" name="dantoc" value={formData.dantoc} onChange={handleChange} />
                                        </div>
                                    </div>

                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <Link to='/thongbaolichthi'>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => setShowModal(true)}
                                                >
                                                    Huỷ
                                                </button>
                                            </Link>

                                            &nbsp;<button type="button" id="submit" name="submit" className="btn btn-primary"
                                                onClick={() => setShowModal(true)} >Xác nhận đăng ký</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                className="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận đăng ký</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn cần chuẩn bị 02 ảnh 4x6 và 01 ảnh 3x4 + giấy CMND photo (công chứng) đến nộp cho Trung Tâm trước khi hết hạn đăng ký</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleThem}>
                        Đăng ký
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ThongTinTSTuDoDangKyThi;
