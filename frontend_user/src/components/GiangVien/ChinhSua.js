import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

const ChinhSua = () => {
    const [userProfile, setUserProfile] = useState(null);
    const maGV = localStorage.getItem('maGV');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    // Hàm mở modal
    const handleOpenPasswordModal = () => {
        console.log('ok')
        setShowPasswordModal(true);
    };

    // Hàm đóng modal
    const handleClosePasswordModal = () => {
        setShowPasswordModal(false);
    };
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log(maGV)

                const response = await axios.get(`http://localhost:2209/api/v1/layTrangCaNhanGV/${maGV}`);
                setUserProfile(response.data.TCN[0]);
                console.log(response.data.TCN[0])
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };
        fetchUserProfile();
    }, [maGV]);

    // Hàm chuyển đổi định dạng ngày tháng từ dd/mm/yyyy sang yyyy-mm-dd
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

    const normalizetenGV = (tenGV) => {
        tenGV = tenGV.trim();
        tenGV = tenGV.replace(/\s+/g, ' ');
        console.log(tenGV)
        return tenGV;
    };


    const handleUpdateProfile = async () => {
        console.log(userProfile)
        try {
            const isValidPhone = validatePhoneNumber(userProfile.sdt);

            // Kiểm tra tên có ít nhất 2 cụm từ
            const words = userProfile.tenGV.trim().split(/\s+/);
            if (words.length < 2) {
                toast.error('Tên phải có ít nhất 2 cụm từ.');
                return;
            }

            if (!/^[^\d!@#$%^&*()_+={}\[\]:;<>,?~\\/`"\|]*$/.test(userProfile.tenGV)) {
                toast.error('Tên không được chứa các kí tự đặc biệt');
                return;
            }

            const isValidEmail = validateEmail(userProfile.email);
            if (!isValidEmail) {
                toast.error('Email không hợp lệ');
                return;
            }
            if (!isValidPhone) {
                toast.error('Số điện thoại không hợp lệ');
                return;
            }

            // Kiểm tra giới tính
            if (userProfile.gioitinh !== '0' && userProfile.gioitinh !== '1') {
                toast.error('Giới tính không hợp lệ');
                return;
            }

            const convertedNgaysinh = convertDateFormat(userProfile.ngaysinh);
            const normalizedtenGV = normalizetenGV(userProfile.tenGV);
            // Gửi dữ liệu đã chuyển đổi lên server
            const response = await axios.post(`http://localhost:2209/api/v1/updateGiangVien`, { ...userProfile, tenGV: normalizedtenGV, ngaysinh: convertedNgaysinh });
            console.log(response.data);
            toast.success('Cập nhật thành công');
            // Thực hiện các hành động cần thiết khi cập nhật thành công
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
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
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            {userProfile && userProfile.gioitinh === 1 ? (
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" className="img-fluid my-5" style={{ width: "80px" }} />

                                            ) : (
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                                            )}
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Họ và Tên</label>
                                            <input type="text" className="form-control" id="fullName" placeholder="Enter name" value={userProfile ? userProfile.tenGV : ''} onChange={(e) => setUserProfile({ ...userProfile, tenGV: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail">Email</label>
                                            <input type="email" className="form-control" id="eMail" placeholder="Enter email" value={userProfile ? userProfile.email : ''} onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Số điện thoại</label>
                                            <input type="text" className="form-control" id="phone" placeholder="Enter số điện thoại" value={userProfile ? userProfile.sdt : ''} onChange={(e) => setUserProfile({ ...userProfile, sdt: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="website">Ngày sinh</label>
                                            <input type="text" className="form-control" id="website" placeholder="Website url" value={userProfile ? userProfile.ngaysinh : ''} onChange={(e) => setUserProfile({ ...userProfile, ngaysinh: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="gender">Giới tính</label>
                                            <select className="form-control" id="gender" value={userProfile ? userProfile.gioitinh : ''} onChange={(e) => setUserProfile({ ...userProfile, gioitinh: e.target.value })}>
                                                <option value="">Chọn giới tính</option>
                                                <option value="0">Nữ</option>
                                                <option value="1">Nam</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label >Mô tả</label>
                                            <input type="text" className="form-control" id="phone" placeholder="Nhập mô tả" value={userProfile ? userProfile.mota : ''} onChange={(e) => setUserProfile({ ...userProfile, mota: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label >Giới thiệu</label>
                                            <input type="text" className="form-control" id="phone" placeholder="Nhập giới thiệu" value={userProfile ? userProfile.gioithieu : ''} onChange={(e) => setUserProfile({ ...userProfile, gioithieu: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label >Kinh nghiệm</label>
                                            <input type="text" className="form-control" id="phone" placeholder="Nhập kinh nghiệm" value={userProfile ? userProfile.kinhnghiem : ''} onChange={(e) => setUserProfile({ ...userProfile, kinhnghiem: e.target.value })} />
                                        </div>
                                    </div>

                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <Link to='/trangcanhan'>
                                                <button type="button" className="btn btn-secondary" >
                                                    Huỷ
                                                </button>
                                            </Link>

                                            &nbsp;<button type="button" id="submit" name="submit" className="btn btn-primary" onClick={handleUpdateProfile}>Cập nhật</button>&nbsp;
                                            <Link to='/doimk'>
                                                <button type="button" className="btn btn-primary" >
                                                    Đổi mật khẩu
                                                </button>
                                            </Link>
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
        </>
    );
};

export default ChinhSua;
