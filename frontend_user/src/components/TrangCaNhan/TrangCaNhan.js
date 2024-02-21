import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const maHV = localStorage.getItem('maHV');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log(maHV)
                // Gọi API để lấy thông tin cá nhân của người dùng với maHV từ params
                const response = await axios.get(`http://localhost:2209/api/v1/layTrangCaNhanHV/${maHV}`);
                setUserProfile(response.data.TCN[0]);
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };
        fetchUserProfile();
    }, [maHV]);

    return (
        <div className="profile-container" style={{ marginTop: '30px' }}>
            <h1>Thông tin cá nhân</h1>
            {userProfile ? (
                <div className="profile-info">
                    <p><strong className="profile-label">Tên:</strong> {userProfile.tenHV}</p>
                    <p><strong className="profile-label">Số điện thoại:</strong> {userProfile.sdt}</p>
                    <p><strong className="profile-label">Email:</strong> {userProfile.email}</p>
                    <p><strong className="profile-label">Nơi sinh:</strong> {userProfile.noisinh}</p>
                    <p><strong className="profile-label">Ngày sinh:</strong> {userProfile.ngaysinh}</p>
                    <p><strong className="profile-label">Giới tính:</strong> {userProfile.gioi_tinh === 1 ? "Nam" : "Nữ"}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfilePage;
