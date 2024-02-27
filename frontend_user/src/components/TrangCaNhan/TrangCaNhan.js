import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPen
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const maHV = localStorage.getItem('maHV');
    const [registeredCourses, setRegisteredCourses] = useState([]);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Gọi API để lấy thông tin cá nhân của người dùng với maHV từ params
                const responseProfile = await axios.get(`http://localhost:2209/api/v1/layTrangCaNhanHV/${maHV}`);
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
                                            {userProfile && userProfile.gioitinh === 1 ? (
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />

                                            ) : (
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                                            )}
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
                                            <a href="/" className="list-group-item list-group-item-action" key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                                {/* Hiển thị hình ảnh khóa học */}
                                                <div style={{ marginRight: '20px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.75)', borderRadius: '10px' }}>
                                                    <img src={`http://localhost:2209/images/${course.tenHinhAnhKH}`} alt={course.tenKH} style={{ width: '100px', height: 'auto', borderRadius: '10px' }} />
                                                </div>

                                                {/* Hiển thị thông tin khóa học */}
                                                <div style={{ flex: 1 }}>
                                                    <h5 style={{ fontSize: '18px', fontWeight: 'bold' }}>{course.tenKH}</h5>
                                                    <p className="mb-1" style={{ fontSize: '16px' }}>Lớp: {course.tenLopHoc}</p>
                                                </div>
                                            </a>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </>
    );
};

export default ProfilePage;
