import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuenMK = () => {
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
            max-width: 400px; /* Điều chỉnh kích thước tối đa của form */
            margin: auto; /* Để căn giữa form */
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex; /* Sử dụng flexbox để căn giữa phần tử */
            flex-direction: column; /* Hiển thị phần tử theo chiều dọc */
            align-items: center; /* Căn giữa các phần tử theo trục ngang */
            height: 280px;
        }

        input[type="text"] {
            width: calc(100% - 20px); /* Để input rộng hơn để không bị lệch ra ngoài */
            padding: 10px;
            margin-bottom: 15px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px; /* Kích thước font cho input */
        }



        button {
            width: auto; /* Đặt chiều rộng của nút tự động theo nội dung */
            padding: 10px 20px; /* Điều chỉnh khoảng cách bên trong nút */
            background-color: #0F7771;
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
        h2, h3 {
            margin: 0 0 10px; 
        }
        h3{
            color: black;
            font-size: 16px;
            padding: 14px;
        }
        h2{
            font-size: 30px;
        }
    `;

    return (
        <>
            <style>{style}</style>
            <div id="space"></div>
            <form id="forgetform" style={{ 'marginTop': '200px' }}>
                <h2>Quên mật khẩu?</h2>
                <h3> Điền vào email gắn với tài khoản của bạn để nhận mật khẩu mới</h3>
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

export default QuenMK;
