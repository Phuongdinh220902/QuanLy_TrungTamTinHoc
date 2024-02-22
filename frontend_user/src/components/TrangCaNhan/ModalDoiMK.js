import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEyeSlash, faEye
} from "@fortawesome/free-solid-svg-icons";
const DoiMK = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const maHV = localStorage.getItem('maHV');
    const handleChangePassword = async () => {
        try {
            const response = await axios.post(`http://localhost:2209/api/v1/doiMatKhau`, {
                maHV: maHV,
                oldPassword: password,
                newPassword: newPassword
            });
            alert(response.data.message); // Hiển thị thông báo từ phản hồi API
            navigate('/trangcanhan'); // Ví dụ: chuyển hướng đến trang hồ sơ người dùng
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error.response.data.message);
            setError(error.response.data.message);
        }
    };

    const handleCancel = () => {

        navigate('/trangcanhan');
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const style = `
        #forgetform {
            max-width: 400px; /* Điều chỉnh kích thước tối đa của form */
            margin: auto; /* Để căn giữa form */
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
            display: flex; /* Sử dụng flexbox để căn giữa phần tử */
            flex-direction: column; /* Hiển thị phần tử theo chiều dọc */
            align-items: center; /* Căn giữa các phần tử theo trục ngang */
            height: 400px;
        }

         input[type="password"], input[type="text"] {
            width: 250px;
            padding: 10px;
            margin-bottom: 10px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px; /* Kích thước font cho input */
            position: relative;
        }

        .show-hide-password {
            cursor: pointer;
            font-size: 16px;
            color: #0082c8;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
        }



        button {
            width: auto; /* Đặt chiều rộng của nút tự động theo nội dung */
            padding: 10px 20px; /* Điều chỉnh khoảng cách bên trong nút */
            background-color: #0082c8;
            color: #FFFFFF;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px; /* Kích thước font cho button */
            margin-top: 15px;
        }

        button:hover {
            background-color: #0056b3;
        }

        #error-container {
            margin-top: 10px;
            font-size: 16px; /* Kích thước font cho error container */
        }

        h3{
            color: black;
            font-size: 16px;
            padding: 10px;
        }
        h2{
            font-size: 30px;
        }

        .password-container {
            position: relative;
        }

        .show-hide-password i {
            position: absolute;
            top: 50%;
            right: 5px;
            transform: translateY(-50%);
        }
    `;

    return (
        <>
            <style>{style}</style>
            <div id="space"></div>
            <form id="forgetform" style={{ 'marginTop': '40px', 'marginBottom': '30px' }}>
                <h2>Đổi mật khẩu?</h2>
                <h3> Mật khẩu cũ</h3>
                <input
                    type={showPassword ? "text" : "password"}
                    id="username"
                    name="oldPassword"
                    placeholder="Nhập mật khẩu cũ"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <h3> Mật khẩu mới</h3>
                <div style={{ position: 'relative', width: '250px' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <span className="show-hide-password" onClick={toggleShowPassword}>
                        {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </span>
                </div>

                <div id="error-container" style={{ "color": "red" }}>{error}</div>
                <div>
                    <button type="button" onClick={handleCancel}>Huỷ</button>&nbsp;
                    <button type="button" onClick={handleChangePassword}>Lưu</button>
                </div>

            </form>
        </>
    );
};

export default DoiMK;
