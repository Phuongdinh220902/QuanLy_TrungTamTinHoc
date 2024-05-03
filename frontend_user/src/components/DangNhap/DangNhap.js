import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";

const DangKyDangNhap = () => {

    const [tenHV, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [noisinh, setNoisinh] = useState('');
    const [password, setPassword] = useState('');
    const [gioitinh, setGioitinh] = useState('');


    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // const response = await dangnhapnguoidung(formdata);
            const response = await axios.post("http://localhost:2209/api/v1/login", {
                email,
                password,
            });

            if (response.status === 200) {
                const decodedToken = jwtDecode(response.data.token);
                const userData = response.data;
                console.log(userData)

                setTimeout(() => {
                    if (decodedToken.role === "HocVien") {
                        navigate("/");
                        localStorage.setItem('user', JSON.stringify(userData));
                        localStorage.setItem('maHV', userData.maHV);
                        console.log(userData)

                    } else if (decodedToken.role === "GiangVien") {
                        navigate('/giangvien');
                        localStorage.setItem('giangvien', JSON.stringify(userData));
                        localStorage.setItem('maGV', userData.maGV);
                        console.log(userData, 'ok')
                    }
                }, 500);
            } else {
                toast.error('Thông tin đăng nhập không đúng')
            }


        } catch (error) {
            toast.error('Thông tin đăng nhập không đúng');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
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

    const normalizeTenHV = (tenHV) => {
        // Loại bỏ khoảng trắng dư thừa ở đầu và cuối chuỗi
        tenHV = tenHV.trim();
        // Thay thế nhiều khoảng trắng ở giữa chuỗi bằng một khoảng trắng
        tenHV = tenHV.replace(/\s+/g, ' ');
        console.log(tenHV)
        return tenHV;
    };

    const normalizeNoisinhHV = (noisinh) => {
        // Loại bỏ khoảng trắng dư thừa ở đầu và cuối chuỗi
        noisinh = noisinh.trim();

        // Thay thế nhiều khoảng trắng ở giữa chuỗi bằng một khoảng trắng
        noisinh = noisinh.replace(/\s+/g, ' ');
        console.log(noisinh)
        return noisinh;
    };

    const validatePassword = (password) => {
        // Kiểm tra độ dài
        if (password.length < 6) {
            return 'Mật khẩu phải chứa ít nhất 6 ký tự';
        }

        // Kiểm tra ký tự in hoa
        if (!/[A-Z]/.test(password)) {
            return 'Mật khẩu phải chứa ít nhất một ký tự in hoa';
        }

        // Kiểm tra ký tự thường
        if (!/[a-z]/.test(password)) {
            return 'Mật khẩu phải chứa ít nhất một ký tự thường';
        }

        // Kiểm tra số
        if (!/\d/.test(password)) {
            return 'Mật khẩu phải chứa ít nhất một số';
        }

        // Kiểm tra khoảng trắng
        if (/\s/.test(password)) {
            return 'Mật khẩu không được chứa khoảng trắng';
        }

        return null;
    }



    const handleSave = async () => {
        const isValidEmail = validateEmail(email);
        const isValidPhone = validatePhoneNumber(sdt);
        const normalizedNoisinhHV = normalizeNoisinhHV(noisinh);

        const ngaySinhDate = new Date(ngaysinh);
        const today = new Date();
        const ageDifferenceInMilliseconds = today - ngaySinhDate;
        const ageDifferenceInYears = ageDifferenceInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);

        const normalizedTenHV = normalizeTenHV(tenHV);

        // Kiểm tra mật khẩu
        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        if (!tenHV.trim() || !email || !sdt || !ngaysinh || !noisinh || !gioitinh) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }
        // Kiểm tra tên có ít nhất 2 cụm từ
        const words = tenHV.trim().split(/\s+/);
        if (words.length < 2) {
            toast.error('Tên phải có ít nhất 2 cụm từ.');
            return;
        }

        if (!/^[^\d!@#$%^&*()_+={}\[\]:;<>,?~\\/`"\|]*$/.test(tenHV)) {
            toast.error('Tên không được chứa các kí tự đặc biệt');
            return;
        }

        if (!isValidEmail) {
            toast.error('Email không hợp lệ');
            return;
        }
        if (!isValidPhone) {
            toast.error('Số điện thoại không hợp lệ');
            return;
        }

        if (ageDifferenceInYears < 18) {
            toast.error('Học viên phải có tuổi từ 16 trở lên');
            return;
        }
        console.log(password)

        try {
            const formData = new FormData();
            formData.append('tenHV', normalizedTenHV);
            formData.append('email', email);
            formData.append('sdt', sdt);
            formData.append('ngaysinh', ngaysinh);
            formData.append('password', password);
            // Ánh xạ giới tính từ frontend sang backend
            const gioitinhValue = gioitinh == 'Nam' ? 1 : 0;
            formData.append('gioitinh', gioitinhValue);
            formData.append('noisinh', normalizedNoisinhHV);

            for (const value of formData.values()) {
                console.log(value);
            }



            let mdata = {
                tenHV: normalizedTenHV,
                email: email,
                sdt: sdt,
                ngaysinh: ngaysinh,
                gioitinh: gioitinhValue,
                noisinh: normalizedNoisinhHV,
                password: password
            }

            const response = await axios.post('http://localhost:2209/api/v1/dangkyTKNguoiDung', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.status === 200) {
                toast.success('Đăng ký tài khoản thành công');
                setTimeout(() => {
                    navigate('/dangnhap');
                }, 3500);
                // navigate('/dangnhap', { replace: true });

                setTen('');
                setEmail('');
                setSdt('');
                setNgaysinh('');
                setNoisinh('');
                setPassword('');
                setGioitinh('');
                handleSignInClick()
            } else {
                console.log(response.status)
            }
        }
        catch (error) {
            console.error("Lỗi khi gọi API xoá giảng viên:", error.message);
            toast.error("Đã xảy ra lỗi khi xoá giảng viên");
        }
    }

    const handleSignUpClick = () => {
        const container = document.getElementById('container');
        container.classList.add('right-panel-active');
    };

    const handleSignInClick = () => {
        const container = document.getElementById('container');
        container.classList.remove('right-panel-active');
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToastClose = () => {
        navigate('/dangnhap');
    };


    const styles = `
        @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
            * {
                box-sizing: border-box;
            }

            body {
                background: #f6f5f7;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                font-family: 'Montserrat', sans-serif;
                height: 100vh;
                margin: -20px 0 50px;
            }

            h1 {
                font-weight: bold;
                margin: 0;
            }

            h2 {
                text-align: center;
            }

            p {
                font-size: 14px;
                font-weight: 100;
                line-height: 20px;
                letter-spacing: 0.5px;
                margin: 20px 0 30px;
            }

            span {
                font-size: 12px;
            }

            a {
                color: #333;
                font-size: 14px;
                text-decoration: none;
                margin: 15px 0;
            }

            button {
                border-radius: 20px;
                border: 1px solid white;
                background-color: #0F7771;
                color: #FFFFFF;
                font-size: 12px;
                font-weight: bold;
                padding: 12px 45px;
                letter-spacing: 1px;
                text-transform: uppercase;
                transition: transform 80ms ease-in;
                margin-top: 10px;
            }

            button:active {
                transform: scale(0.95);
            }

            button:focus {
                outline: none;
            }
            .form-select {
                font-size:1rem;
            }

            button.ghost {
                background-color: transparent;
                background-color: #0F7771;
            }

            form {
                background-color: #FFFFFF;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 0 50px;
                height: 100%;
                text-align: center;
            }

            input {
                background-color: #eee;
                border: none;
                padding: 12px 15px;
                margin: 8px 0;
                width: 100%;
            }

            .container {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
                    0 10px 10px rgba(0, 0, 0, 0.22);
                position: relative;
                overflow: hidden;
                width: 768px;
                max-width: 100%;
                min-height: 480px;
            }

            .form-container {
                position: absolute;
                top: 0;
                height: 100%;
                transition: all 0.6s ease-in-out;
            }

            .sign-in-container {
                left: 0;
                width: 50%;
                z-index: 2;
            }

            .container.right-panel-active .sign-in-container {
                transform: translateX(100%);
            }

            .sign-up-container {
                left: 0;
                width: 50%;
                opacity: 0;
                z-index: 1;
            }

            .container.right-panel-active .sign-up-container {
                transform: translateX(100%);
                opacity: 1;
                z-index: 5;
                animation: show 0.6s;
            }

            @keyframes show {

                0%,
                49.99% {
                    opacity: 0;
                    z-index: 1;
                }

                50%,
                100% {
                    opacity: 1;
                    z-index: 5;
                }
            }

            .overlay-container {
                position: absolute;
                top: 0;
                left: 50%;
                width: 50%;
                height: 100%;
                overflow: hidden;
                transition: transform 0.6s ease-in-out;
                z-index: 100;
            }

            .container.right-panel-active .overlay-container {
                transform: translateX(-100%);
            }

            .overlay {
                background: #F2FFFE;
                background: -webkit-linear-gradient(to right, #F2FFFE, #F2FFFE);
                background: linear-gradient(to right, #F2FFFE, #F2FFFE);
                background-repeat: no-repeat;
                background-size: cover;
                background-position: 0 0;
                color: #FFFFFF;
                position: relative;
                left: -100%;
                height: 100%;
                width: 200%;
                transform: translateX(0);
                transition: transform 0.6s ease-in-out;
            }

            .container.right-panel-active .overlay {
                transform: translateX(50%);
            }

            .overlay-panel {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 0 40px;
                text-align: center;
                top: 0;
                height: 100%;
                width: 50%;
                transform: translateX(0);
                transition: transform 0.6s ease-in-out;
                color: black
            }

            .overlay-left {
                transform: translateX(-20%);
            }

            .container.right-panel-active .overlay-left {
                transform: translateX(0);
            }

            .overlay-right {
                right: 0;
                transform: translateX(0);
            }

            .container.right-panel-active .overlay-right {
                transform: translateX(20%);
            }

            .social-container {
                margin: 20px 0;
            }

            .social-container a {
                border: 1px solid #DDDDDD;
                border-radius: 50%;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                margin: 0 5px;
                height: 40px;
                width: 40px;
            }

            footer {
                background-color: #222;
                color: #fff;
                font-size: 14px;
                bottom: 0;
                position: fixed;
                left: 0;
                right: 0;
                text-align: center;
                z-index: 999;
            }

            footer p {
                margin: 10px 0;
            }

            footer i {
                color: red;
            }

            footer a {
                color: #3c97bf;
                text-decoration: none;
            }


            .input-container {
                position: relative;
                display: flex;
                align-items: center; /* Căn giữa theo trục dọc */
            }

            .form-control {
                padding-right: 35px; /* Để tạo chỗ cho icon */
            }

            .password-toggle {
                position: absolute;
                right: 5px;
                background: none;
                border: none;
                cursor: pointer;
            }

            .eye-icon {
                color: black; /* Màu đen cho icon */
                font-size:16px;
            }


        `;

    return (
        <>
            <style>{styles}</style>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form >
                        <h1>Đăng Ký</h1>
                        <input type="text" placeholder="Họ Tên" className="form-control" value={tenHV}
                            onChange={(event) => setTen(event.target.value)} />

                        <input type="email" placeholder="Email" className="form-control" value={email}
                            onChange={(event) => setEmail(event.target.value)} />

                        <input type={showPassword ? "text" : "password"}
                            placeholder="Password" className="form-control" value={password}

                            onChange={(event) => setPassword(event.target.value)} />

                        <input type="text" placeholder="Số điện thoại" className="form-control" value={sdt}
                            onChange={(event) => setSdt(event.target.value)} />

                        <input type="date" className="form-control" value={ngaysinh}
                            onChange={(event) => setNgaysinh(event.target.value)} />

                        <input type="text" placeholder="Nơi sinh" className="form-control" value={noisinh}
                            onChange={(event) => setNoisinh(event.target.value)} />

                        <select className="form-select"
                            onChange={(event) => setGioitinh(event.target.value)}>
                            <option disabled selected hidden>Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>

                        {/* <button type="submit" id="registerButton">Đăng Ký</button> */}
                        <button type="button" id="registerButton" onClick={handleSave}>Đăng Ký</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Đăng Nhập</h1>
                        <input
                            placeholder="Email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {/* Thêm icon để thay đổi trạng thái mật khẩu */}
                        <button onClick={handleTogglePassword} type="button" className="password-toggle">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>

                        {/* <input type="password" id="password" name="password" placeholder="Password" /> */}
                        <Link to="/quenmk">
                            Forgot your password?
                        </Link>

                        <button
                            type="submit"
                            className="loginButton"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Chào mừng bạn đến với chúng tôi</h1>
                            <p>Nhập thông tin cá nhân để đăng ký tài khoản</p>
                            <button className="ghost" id="signIn" onClick={handleSignInClick}>Đăng Nhập</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Chào mừng bạn trở lại!</h1>
                            <p> </p>
                            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Đăng Ký</button>
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
                    onClose={handleToastClose}
                />
            </div>
        </>
    );
}

export default DangKyDangNhap;




