
import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faHouseChimney,
    faGraduationCap,
    faRightFromBracket,
    faBars,
    faGears,
    faFileImport
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ChinhSua = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState([]);
    const [tenGV, setTenGV] = useState("");
    const [newTenGV, setNewTenGV] = useState("");
    const maGV = localStorage.getItem('maGV');
    const [tenHA, setTenHA] = useState("");
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [gioitinh, setGioitinh] = useState('');
    const [mota, setMoTa] = useState('');
    const [kinhnghiem, setKinhNghiem] = useState('');
    const [gioithieu, setGioiThieu] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image, setImage] = useState('');

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/api/v1/layLopHocGV/${maGV}}`);
                setData(response.data.KH);
                console.log(maGV, 'ok')
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const userData = JSON.parse(localStorage.getItem('giangvien'));
        if (userData) {
            setTenGV(userData.tenGV);
            setTenHA(userData.tenHA);
            setNewTenGV(userData.tenGV)
        }
        fetchData()

    }, [maGV]);


    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('giangvien');
        navigate('/');
    };


    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log(maGV)

                const response = await axios.get(`http://localhost:2209/api/v1/layTrangCaNhanGV/${maGV}`);
                const userProfileData = response.data.TCN[0];
                if (userProfileData) {
                    setNewTenGV(userProfileData.tenGV);
                    setEmail(userProfileData.email);
                    setSdt(userProfileData.sdt);
                    setNgaysinh(userProfileData.ngaysinh);
                    setGioiThieu(userProfileData.gioithieu);
                    setMoTa(userProfileData.mota);
                    setGioitinh(userProfileData.gioitinh == 1 ? 'Nam' : 'Nữ');
                    setKinhNghiem(userProfileData.kinhnghiem);
                }
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

    const normalizetenGV = (newTenGV) => {
        newTenGV = newTenGV.trim();
        newTenGV = newTenGV.replace(/\s+/g, ' ');
        console.log(newTenGV)
        return newTenGV;
    };


    const handleUpdateProfile = async () => {
        // console.log(userProfile)

        const isValidPhone = validatePhoneNumber(sdt);

        // Kiểm tra tên có ít nhất 2 cụm từ
        const words = newTenGV.trim().split(/\s+/);
        if (words.length < 2) {
            toast.error('Tên phải có ít nhất 2 cụm từ.');
            return;
        }

        if (!/^[^\d!@#$%^&*()_+={}\[\]:;<>,?~\\/`"\|]*$/.test(tenGV)) {
            toast.error('Tên không được chứa các kí tự đặc biệt');
            return;
        }

        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Email không hợp lệ');
            return;
        }
        if (!isValidPhone) {
            toast.error('Số điện thoại không hợp lệ');
            return;
        }

        // Kiểm tra giới tính
        if (gioitinh !== '0' && gioitinh !== '1') {
            toast.error('Giới tính không hợp lệ');
            return;
        }
        else {
            const convertedNgaysinh = convertDateFormat(ngaysinh);
            const normalizedtenGV = normalizetenGV(newTenGV);


            // Gửi dữ liệu đã chuyển đổi lên server
            // const response = await axios.post(`http://localhost:2209/api/v1/updateGiangVien`, { ...userProfile, tenGV: normalizedtenGV, ngaysinh: convertedNgaysinh });
            // console.log(response.data);
            // toast.success('Cập nhật thành công');
            try {
                var isImage = false;
                const formData = new FormData();
                formData.append('maGV', maGV);
                formData.append('tenGV', normalizedtenGV);
                formData.append('email', email);
                formData.append('sdt', sdt);
                // Ánh xạ giới tính từ frontend sang backend
                const gioitinhValue = gioitinh == 'Nam' ? 1 : 0;
                formData.append('gioitinh', gioitinhValue);
                formData.append('ngaysinh', convertedNgaysinh);
                formData.append('mota', mota);
                formData.append('gioithieu', gioithieu);
                formData.append('kinhnghiem', kinhnghiem);
                if (image instanceof Blob) {
                    formData.append("file", image, image.name);
                    isImage = true;
                }
                for (const value of formData.values()) {
                    console.log(value);
                }

                let res = await axios.post('http://localhost:2209/api/v1/updateGiangVien', formData);
                console.log(res)
                if (isImage) {
                    const userData = JSON.parse(localStorage.getItem('giangvien'));
                    userData.tenHA = res.data.tenHA;
                    console.log(userData)
                    localStorage.setItem('giangvien', JSON.stringify(userData));
                }

                if (res.data.tenGV) {
                    // Cập nhật giá trị mới trong localStorage
                    const userData = JSON.parse(localStorage.getItem('giangvien'));
                    if (userData) {
                        userData.tenGV = res.data.tenGV;
                        localStorage.setItem('giangvien', JSON.stringify(userData));
                    }

                    // Cập nhật giá trị mới trong React state
                    setTenGV(res.data.tenGV);
                }

                toast.success('Cập nhật thành công');

                window.location.reload()
            }
            catch (error) {
                console.error("Lỗi khi gọi API cập nhật giảng viên:", error.message);
                toast.error("Đã xảy ra lỗi khi cập nhật giảng viên");
            }


        }

    };

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
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
        <div>
            <style>{styles}</style>
            <header style={{
                backgroundColor: 'white',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ccc',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                height: '70px'
            }}>
                <FontAwesomeIcon icon={faBars} onClick={handleToggleSidebar} style={{ cursor: 'pointer' }} />
                <div className="user-info-container" style={{ display: 'flex', alignItems: 'center' }}>


                    <img src={`http://localhost:2209/images/${tenHA}`} alt="Avatar" style={{ width: '50px', height: '50px', marginRight: '10px' }} /> {/* Hiển thị hình ảnh */}
                    <h3>{tenGV}</h3>

                </div>
            </header>


            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', minHeight: '100vh' }}>
                {/* Sidebar */}
                <Sidebar collapsed={collapsed}>
                    <Menu>
                        <Link to={'/giangvien'} style={{ color: 'black' }}>
                            <MenuItem >
                                <FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '10px' }} />
                                Màn hình chính
                            </MenuItem>
                        </Link>
                        <SubMenu defaultOpen label={<span><FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px' }} />Lớp học</span>}>
                            {data.map((item, index) => (
                                <MenuItem key={index} >
                                    <Link to={`/lophocgv/${item.maLopHoc}`} style={{ color: 'black' }}>
                                        {item.tenLopHoc}
                                    </Link>
                                </MenuItem>
                            ))}
                        </SubMenu>


                        <MenuItem >
                            <FontAwesomeIcon icon={faGears} style={{ marginRight: '10px' }} />
                            Cài đặt
                        </MenuItem>

                        <Link to="/" onClick={handleLogout} style={{ color: 'black' }}>
                            <MenuItem >
                                <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '10px' }} />
                                Thoát
                            </MenuItem>
                        </Link>

                    </Menu>
                </Sidebar>


                <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gridGap: '40px', marginTop: '30px' }}>
                    <div className="container" style={{ marginTop: '45px' }}>
                        <div className="row gutters">
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="account-settings">
                                            <div className="user-profile">
                                                <div className="">
                                                    <img src={previewImage ? previewImage : `http://localhost:2209/images/${tenHA}`}
                                                        className="img-fluid my-3" style={{ width: "200px" }} />
                                                </div>

                                                <div className="col-md-12" style={{ marginTop: "30px" }}>
                                                    <label className="form-label label-upload" htmlFor="labelUpload">
                                                        <FontAwesomeIcon icon={faFileImport} /> Thay đổi ảnh </label>
                                                    <input type="file" id="labelUpload" hidden
                                                        onChange={(event) => handleUpLoadImage(event)} />
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
                                                    <input type="text" className="form-control" value={newTenGV}
                                                        onChange={(event) => setNewTenGV(event.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email" className="form-control" id="eMail" placeholder="Enter email" value={email}
                                                        onChange={(event) => setEmail(event.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Số điện thoại</label>
                                                    <input type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" value={sdt}
                                                        onChange={(event) => setSdt(event.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="website">Ngày sinh</label>
                                                    <input type="text" className="form-control" id="website" placeholder="Website url" value={ngaysinh}
                                                        onChange={(event) => setNgaysinh(event.target.value)} />
                                                </div>
                                            </div>

                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="gender">Giới tính</label>
                                                    <select className="form-control" id="gender" value={gioitinh}
                                                        onChange={(event) => setGioitinh(event.target.value)}>
                                                        <option value="">Chọn giới tính</option>
                                                        <option value="0">Nữ</option>
                                                        <option value="1">Nam</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label >Mô tả</label>
                                                    <input type="text" className="form-control" id="phone" placeholder="Nhập mô tả" value={mota}
                                                        onChange={(event) => setMoTa(event.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label >Giới thiệu</label>
                                                    <input type="text" className="form-control" id="phone" placeholder="Nhập giới thiệu" value={gioithieu}
                                                        onChange={(event) => setGioiThieu(event.target.value)} />
                                                </div>
                                            </div>

                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label >Kinh nghiệm</label>
                                                    <input type="text" className="form-control" id="phone" placeholder="Nhập kinh nghiệm" value={kinhnghiem}
                                                        onChange={(event) => setKinhNghiem(event.target.value)} />
                                                </div>
                                            </div>



                                        </div>
                                        <div className="row gutters">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div className="text-right">
                                                    <Link to='/giangvien'>
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
            </div>
        </div>

    );
};

export default ChinhSua;

