import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPen
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const maHV = localStorage.getItem('maHV');
    const [registeredCourses, setRegisteredCourses] = useState([]);
    // const [tenHinhAnhHV, setTenHinhAnhHV] = useState("");
    const { maCaThi } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Gọi API để lấy thông tin cá nhân của người dùng với maHV từ params
                const responseProfile = await axios.get(`http://localhost:2209/api/v1/layTrangCaNhanHV/${maHV}`);
                // const userProfile = responseProfile.data.TCN[0];
                // if (userProfile) {
                //     setTenHinhAnhHV(userProfile.tenHV);
                // }
                setUserProfile(responseProfile.data.TCN[0]);

                // Gọi API để lấy danh sách các khóa học đã đăng ký của người dùng
                const responseCourses = await axios.get(`http://localhost:2209/api/v1/layKhoaHocDaDK/${maHV}`);
                setRegisteredCourses(responseCourses.data.KH);
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };
        fetchUserProfile();
    }, [maHV]);

    const styles = `
    .gradient-custom {
 background-image: linear-gradient(-90deg,  #689eb8,#f8f8f8);
}

        .text-center1 {
    text-align: center !important;
}


    
    `;

    const [caThiData, setCaThiData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = async () => {
        setShowModal(!showModal);
        if (!showModal) {
            await fetchCaThiData();
        }
    };
    const [ngaythi, setNgayThi] = useState('');
    const [ngayhethan, setNgayHetHan] = useState('');
    // Function to fetch exam data from the API
    const fetchCaThiData = async () => {
        try {
            const response = await axios.get(`http://localhost:2209/api/v1/layCaThiDK`);
            setCaThiData(response.data.DSCT);
            setNgayThi(response.data.DSCT[0].ngaythi)
            setNgayHetHan(response.data.DSCT[0].ngayhethan)
        } catch (error) {
            console.error('Error fetching exam data:', error);
        }
    };

    const handleDangKy = async (maCaThi) => {
        try {
            console.log(maHV)
            const response = await axios.post('http://localhost:2209/api/v1/kiemtraDK', { maHV });

            // Kiểm tra kết quả trả về từ API
            if (response.data && response.data.thiSinhResults && response.data.thiSinhResults !== '0') {
                navigate(`/dangkythi/${maCaThi}`);
            } else {
                const caThiThoigian = response.data.ThongTinCaThi[0].thoigian;
                alert(`Bạn đã đăng ký ${caThiThoigian}`);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi gọi API kiểm tra đăng ký:', error);
            alert('Đã xảy ra lỗi khi kiểm tra đăng ký');
        }
    };



    return (
        <>
            <style>{styles}</style>
            <section style={{ marginTop: "31px", marginBottom: '28px' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center1 text-white"
                                        style={{ borderTopLeftRadius: "0.5rem", borderBottomLeftRadius: "0.5rem" }}>
                                        <div className="user-avatar">
                                            {/* {userProfile && userProfile.gioitinh === 1 ? (
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" className="img-fluid my-5" style={{ width: "80px" }} />

                                            ) : (
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                                            )} */}
                                            <img src={`http://localhost:2209/images/${userProfile && userProfile.tenHinhAnhHV}`} className="img-fluid my-5" style={{ width: "90px", borderRadius: '50%', height: '90px' }} />

                                        </div>

                                        <h4>{userProfile && userProfile.tenHV}</h4>
                                        <h5>{userProfile && userProfile.email}</h5>
                                        <Link to='/chinhsuahoso' style={{ color: 'white' }}>
                                            <FontAwesomeIcon icon={faUserPen} />
                                        </Link>

                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h4>Thông tin cá nhân</h4>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Ngày sinh</h6>
                                                    <div className="text-muted">
                                                        <h5>{userProfile && userProfile.ngaysinh}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Số điện thoại</h6>
                                                    <p className="text-muted">{userProfile && userProfile.sdt}</p>
                                                </div>
                                            </div>


                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Nơi sinh</h6>
                                                    <p className="text-muted">{userProfile && userProfile.noisinh}</p>
                                                </div>
                                                {userProfile && (
                                                    <div className="col-6 mb-3">
                                                        <h6>Giới tính</h6>
                                                        <p className="text-muted">
                                                            {userProfile.gioitinh === 0
                                                                ? "Nữ"
                                                                : userProfile.gioitinh === 1
                                                                    ? "Nam"
                                                                    : "Khác"}
                                                        </p>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="container mt-3" style={{ maxWidth: '600px', height: '290px', overflow: 'auto' }}>
                                    <h2>Các khoá học</h2>
                                    <div className="list-group" style={{ maxWidth: '520px' }}>

                                        {registeredCourses.map((course, index) => (
                                            <div key={index}>
                                                {/* Your existing code */}
                                                <button className="list-group-item list-group-item-action" style={{ display: 'flex', alignItems: 'center' }}>
                                                    {/* Hiển thị hình ảnh khóa học */}
                                                    <Link to={`/lophoccuaban/${course.maLopHoc}`} style={{ marginRight: '20px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.75)', borderRadius: '10px' }}>
                                                        <img src={`http://localhost:2209/images/${course.tenHinhAnhKH}`} alt={course.tenKH} style={{ width: '100px', height: 'auto', borderRadius: '10px' }} />
                                                    </Link>

                                                    {/* Hiển thị thông tin khóa học */}
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ marginBottom: '5px' }}>
                                                            <Link to={`/lophoccuaban/${course.maLopHoc}`} style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>
                                                                {course.tenKH}
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link to={`/lophoccuaban/${course.maLopHoc}`} className="mb-1" style={{ fontSize: '16px', color: 'black' }}>
                                                                Lớp: {course.tenLopHoc}
                                                            </Link>
                                                        </div>
                                                        {course.tenKH === 'Ứng dụng CNTT cơ bản' && (
                                                            <button className="btn btn-primary" onClick={() => toggleModal()}>
                                                                Đăng ký thi
                                                            </button>
                                                        )}
                                                    </div>
                                                </button>
                                            </div>
                                        ))}



                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>

            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton style={{ backgroundColor: '#0082c8', color: 'white' }}>
                    <Modal.Title>Lịch Thi</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '16px' }}>
                    {/* Check if caThiData is empty */}
                    {caThiData.length === 0 ? (
                        <p style={{ textAlign: 'center', fontSize: '18px' }}>Hiện tại chưa có lịch thi</p>
                    ) : (
                        <>
                            {/* Display exam data here */}
                            <p style={{ marginBottom: '15px', fontSize: '18px', marginLeft: '10px' }}>Ngày thi:
                                <span style={{ backgroundColor: 'yellow', padding: '5px', borderRadius: '5px', color: 'red' }}>{ngaythi}
                                </span>
                            </p>
                            <p style={{ marginBottom: '15px', fontSize: '18px', marginLeft: '10px' }}>Ngày hết hạn:
                                <span style={{ backgroundColor: 'yellow', padding: '5px', borderRadius: '5px', color: 'red' }}>{ngayhethan}
                                </span>
                            </p>
                            {caThiData.map((caThi, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', borderTop: '1px solid #ccc' }}>
                                    <p style={{ marginRight: '10px' }}>Thời gian: {caThi.thoigian}</p>
                                    <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                                        <button className="btn btn-primary" onClick={() => handleDangKy(caThi.maCaThi)}>Đăng ký</button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    );
};

export default ProfilePage;
