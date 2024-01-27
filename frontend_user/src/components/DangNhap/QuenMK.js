import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KhoaHoc = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLayMK = () => {
        axios.post('http://localhost:2209/api/v1/getMaXacNhan', { email })
            .then(response => {
                if (response.status === 200) {
                    alert("Gửi mật khẩu mới thành công");
                    navigate('/dangnhap');
                } else {
                    alert("Gửi mật khẩu mới thất bại");
                }
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi:', error);
            });
    };

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const style = `
        #forgetform {
            width: 300px; /* Điều chỉnh kích thước của form */
            margin: auto; /* Để căn giữa form */
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        label {
            display: block;
            margin-bottom: 10px;
        }

        input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }

        #error-container {
            margin-top: 10px;
        }

    `;

    return (
        <>
            <style>{style}</style>
            <div id="space"></div>
            <form id="forgetform">
                <label >Quên Mật Khẩu</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    required
                />

                <div id="error-container" className="hidden" style={{ "color": "red" }}></div>

                <button type="button" id="loginButton" onClick={handleLayMK}>Gửi Mật Khẩu Mới</button>
            </form>
        </>
    );
};

export default KhoaHoc;
