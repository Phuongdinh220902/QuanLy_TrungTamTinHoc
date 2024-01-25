

// function submitData() {
//     const formData = {
//         tenSV: document.getElementById('tenSV').value,
//         mssv: document.getElementById('mssv').value,
//         email: document.getElementById('emailsv').value,
//         password: document.getElementById('passwordsv').value,
//         nganh_hoc: document.getElementById('nganh_hoc').value,
//     };

//     axios.post('http://localhost:2209/api/v1/registersv', formData)
//         .then(response => {
//             console.log('Dữ liệu đã được gửi thành công!', response);
//             // Xử lý thêm logic ở đây nếu cần
//             alert("Đăng ký tài khoản thành công!")
//             window.location.href = "homesv.html";
//         })
//         .catch(error => {
//             console.error('Lỗi khi gửi dữ liệu:', error);
//         });
// }

// const DangNhap = (props) => {
//     const [showPassword, setShowPassword] = useState(false);

//     const [formdata, setFormdata] = useState({
//         email: "",
//         password: "",
//     });

//     const navigate = useNavigate();



//     const [isRightPanelActive, setIsRightPanelActive] = useState(false);

//     const handleSignUpClick = () => {
//         console.log('hihi')
//         setIsRightPanelActive(true);
//     };

//     const handleSignInClick = () => {
//         setIsRightPanelActive(false);

//     };
//     // const styles = `
//     // @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
//     //     * {
//     //         box-sizing: border-box;
//     //     }

//     //     body {
//     //         background: #f6f5f7;
//     //         display: flex;
//     //         justify-content: center;
//     //         align-items: center;
//     //         flex-direction: column;
//     //         font-family: 'Montserrat', sans-serif;
//     //         height: 100vh;
//     //         margin: -20px 0 50px;
//     //     }

//     //     h1 {
//     //         font-weight: bold;
//     //         margin: 0;
//     //     }

//     //     h2 {
//     //         text-align: center;
//     //     }

//     //     p {
//     //         font-size: 14px;
//     //         font-weight: 100;
//     //         line-height: 20px;
//     //         letter-spacing: 0.5px;
//     //         margin: 20px 0 30px;
//     //     }

//     //     span {
//     //         font-size: 12px;
//     //     }

//     //     a {
//     //         color: #333;
//     //         font-size: 14px;
//     //         text-decoration: none;
//     //         margin: 15px 0;
//     //     }

//     //     button {
//     //         border-radius: 20px;
//     //         border: 1px solid white;
//     //         background-color: #0F7771;
//     //         color: #FFFFFF;
//     //         font-size: 12px;
//     //         font-weight: bold;
//     //         padding: 12px 45px;
//     //         letter-spacing: 1px;
//     //         text-transform: uppercase;
//     //         transition: transform 80ms ease-in;
//     //     }

//     //     button:active {
//     //         transform: scale(0.95);
//     //     }

//     //     button:focus {
//     //         outline: none;
//     //     }

//     //     button.ghost {
//     //         background-color: transparent;
//     //         background-color: #0F7771;
//     //     }

//     //     form {
//     //         background-color: #FFFFFF;
//     //         display: flex;
//     //         align-items: center;
//     //         justify-content: center;
//     //         flex-direction: column;
//     //         padding: 0 50px;
//     //         height: 100%;
//     //         text-align: center;
//     //     }

//     //     input {
//     //         background-color: #eee;
//     //         border: none;
//     //         padding: 12px 15px;
//     //         margin: 8px 0;
//     //         width: 100%;
//     //     }

//     //     .container {
//     //         background-color: #fff;
//     //         border-radius: 10px;
//     //         box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
//     //             0 10px 10px rgba(0, 0, 0, 0.22);
//     //         position: relative;
//     //         overflow: hidden;
//     //         width: 768px;
//     //         max-width: 100%;
//     //         min-height: 480px;
//     //     }

//     //     .form-container {
//     //         position: absolute;
//     //         top: 0;
//     //         height: 100%;
//     //         transition: all 0.6s ease-in-out;
//     //     }

//     //     .sign-in-container {
//     //         left: 0;
//     //         width: 50%;
//     //         z-index: 2;
//     //     }

//     //     .container.right-panel-active .sign-in-container {
//     //         transform: translateX(100%);
//     //     }

//     //     .sign-up-container {
//     //         left: 0;
//     //         width: 50%;
//     //         opacity: 0;
//     //         z-index: 1;
//     //     }

//     //     .container.right-panel-active .sign-up-container {
//     //         transform: translateX(100%);
//     //         opacity: 1;
//     //         z-index: 5;
//     //         animation: show 0.6s;
//     //     }

//     //     @keyframes show {

//     //         0%,
//     //         49.99% {
//     //             opacity: 0;
//     //             z-index: 1;
//     //         }

//     //         50%,
//     //         100% {
//     //             opacity: 1;
//     //             z-index: 5;
//     //         }
//     //     }

//     //     .overlay-container {
//     //         position: absolute;
//     //         top: 0;
//     //         left: 50%;
//     //         width: 50%;
//     //         height: 100%;
//     //         overflow: hidden;
//     //         transition: transform 0.6s ease-in-out;
//     //         z-index: 100;
//     //     }

//     //     .container.right-panel-active .overlay-container {
//     //         transform: translateX(-100%);
//     //     }

//     //     .overlay {
//     //         background: #F2FFFE;
//     //         background: -webkit-linear-gradient(to right, #F2FFFE, #F2FFFE);
//     //         background: linear-gradient(to right, #F2FFFE, #F2FFFE);
//     //         background-repeat: no-repeat;
//     //         background-size: cover;
//     //         background-position: 0 0;
//     //         color: #FFFFFF;
//     //         position: relative;
//     //         left: -100%;
//     //         height: 100%;
//     //         width: 200%;
//     //         transform: translateX(0);
//     //         transition: transform 0.6s ease-in-out;
//     //     }

//     //     .container.right-panel-active .overlay {
//     //         transform: translateX(50%);
//     //     }

//     //     .overlay-panel {
//     //         position: absolute;
//     //         display: flex;
//     //         align-items: center;
//     //         justify-content: center;
//     //         flex-direction: column;
//     //         padding: 0 40px;
//     //         text-align: center;
//     //         top: 0;
//     //         height: 100%;
//     //         width: 50%;
//     //         transform: translateX(0);
//     //         transition: transform 0.6s ease-in-out;
//     //         color: black
//     //     }

//     //     .overlay-left {
//     //         transform: translateX(-20%);
//     //     }

//     //     .container.right-panel-active .overlay-left {
//     //         transform: translateX(0);
//     //     }

//     //     .overlay-right {
//     //         right: 0;
//     //         transform: translateX(0);
//     //     }

//     //     .container.right-panel-active .overlay-right {
//     //         transform: translateX(20%);
//     //     }

//     //     .social-container {
//     //         margin: 20px 0;
//     //     }

//     //     .social-container a {
//     //         border: 1px solid #DDDDDD;
//     //         border-radius: 50%;
//     //         display: inline-flex;
//     //         justify-content: center;
//     //         align-items: center;
//     //         margin: 0 5px;
//     //         height: 40px;
//     //         width: 40px;
//     //     }

//     //     footer {
//     //         background-color: #222;
//     //         color: #fff;
//     //         font-size: 14px;
//     //         bottom: 0;
//     //         position: fixed;
//     //         left: 0;
//     //         right: 0;
//     //         text-align: center;
//     //         z-index: 999;
//     //     }

//     //     footer p {
//     //         margin: 10px 0;
//     //     }

//     //     footer i {
//     //         color: red;
//     //     }

//     //     footer a {
//     //         color: #3c97bf;
//     //         text-decoration: none;
//     //     }
//     // `;

//     // return (
//     //     <div className="app-background">
//     //         <div className="">
//     //             <div className="login">
//     //                 <div>
//     //                     <h3>
//     //                         TRUNG TÂM TIN HỌC
//     //                     </h3>
//     //                 </div>

//     //                 <div className="login-container">

//     //                     <form className="login-form" onSubmit={handleSubmit}>
//     //                         {/* <h5 className="form-heading login-heading">
//     //                             Thông tin đăng nhập
//     //                         </h5> */}
//     //                         <p> </p>

//     //                         <div className="input-box">
//     //                             {/* <span className="icon">
//     //                                 <FontAwesomeIcon icon={faEnvelope} />
//     //                             </span> */}
//     //                             <input
//     //                                 className="login-sodt"
//     //                                 type="text"
//     //                                 name="email"
//     //                                 value={formdata.email}
//     //                                 onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
//     //                                 required
//     //                             />
//     //                             <label>Email</label>
//     //                         </div>
//     //                         <div className="input-box">
//     //                             <span className="icon">
//     //                                 <FontAwesomeIcon
//     //                                     icon={showPassword ? faEye : faEyeSlash}
//     //                                     onClick={() => setShowPassword(!showPassword)}
//     //                                 />
//     //                             </span>
//     //                             <input
//     //                                 className="login-pass"
//     //                                 name="password"
//     //                                 type={showPassword ? "text" : "password"}
//     //                                 value={formdata.password}
//     //                                 onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
//     //                                 required
//     //                             />
//     //                             <label>Password</label>
//     //                         </div>

//     //                         {/* <a className="login-qmk">Quên mật khẩu?</a> */}
//     //                         <button
//     //                             type="submit"
//     //                             className="btn-submit-login"
//     //                         // onClick={handleLogin(email, password)}
//     //                         >
//     //                             Đăng nhập
//     //                         </button>
//     //                     </form>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     </div>
//     // );
//     return (
//         <>
//             <style>{styles}</style>
//             <div className="container" id="container">
//                 <div className="form-container sign-up-container">
//                     <form action="#">
//                         <h1>Đăng Ký Tài Khoản</h1>
//                         <input type="text" id="tenSV" placeholder="Họ Tên" />
//                         <input type="text" id="mssv" placeholder="Mã Số Sinh Viên" />
//                         <input type="email" id="emailsv" placeholder="Email" />
//                         <input type="password" id="passwordsv" placeholder="Password" />
//                         <input type="text" id="nganh_hoc" placeholder="Ngành Học" />

//                         <button type="button" id="registerButton" onClick={submitData}>Đăng Ký</button>
//                     </form>
//                 </div>
//                 <div className="form-container sign-in-container">
//                     <form onSubmit={handleSubmit}>
//                         <h1>Đăng Nhập</h1>
//                         <input
//                             // className="login-sodt"
//                             placeholder="Email"
//                             type="text"
//                             name="email"
//                             value={formdata.email}
//                             onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
//                             required
//                         />
//                         <input
//                             // className="login-pass"
//                             placeholder="Password"
//                             name="password"
//                             type={showPassword ? "text" : "password"}
//                             value={formdata.password}
//                             onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
//                             required
//                         />
//                         {/* <input type="password" id="password" name="password" placeholder="Password" /> */}
//                         <a href="forgetpw.html">Forgot your password?</a>
//                         <button
//                             type="submit"
//                             className="loginButton"
//                         // onClick={handleLogin(email, password)}
//                         >
//                             Đăng nhập
//                         </button>
//                         {/* <button type="button" id="loginButton">Đăng Nhập</button> */}
//                     </form>
//                 </div>

//                 <div className="overlay-container">
//                     <div className={`overlay ${isRightPanelActive ? 'right-panel-active' : ''}`}>
//                         <div className="overlay-panel overlay-left">
//                             <h1>Chào mừng bạn đến với chúng tôi</h1>
//                             <p>Nhập thông tin cá nhân để đăng ký tài khoản</p>
//                             <button className="ghost" onClick={handleSignInClick}>Đăng Nhập</button>
//                         </div>
//                         <div className="overlay-panel overlay-right">
//                             <h1>Chào mừng bạn trở lại!</h1>
//                             <p> </p>
//                             <button className="ghost" onClick={handleSignUpClick}>Đăng Ký</button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </>
//     )

// };
// export default DangNhap;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dangnhapnguoidung } from "../../services/apiService";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faEyeSlash,
//     faEye
// } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const DangKyDangNhap = () => {
    const [formData, setFormData] = useState({
        tenSV: '',
        mssv: '',
        email: '',
        password: '',
        nganh_hoc: ''
    });
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
        try {
            const response = await dangnhapnguoidung(formdata);

            if (response.status === 200) {
                // Chuyển hướng đến trang sau khi đăng nhập thành công
                navigate('/');
                const userData = response.data; // Dữ liệu người dùng từ phản hồi API
                localStorage.setItem('user', JSON.stringify(userData));
                console.log(userData)
            } else {
                // Xử lý đăng nhập không thành công
                console.log("Đăng nhập không thành công");
            }

        } catch (error) {
            // Xử lý lỗi từ phía client hoặc server
            console.error("Lỗi trong quá trình đăng nhập:", error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const submitData = () => {
        axios.post('http://localhost:2209/api/v1/registersv', formData)
            .then(response => {
                console.log('Dữ liệu đã được gửi thành công!', response);
                // Xử lý thêm logic ở đây nếu cần
                alert("Đăng ký tài khoản thành công!")
                // Chuyển hướng tùy thuộc vào logic của bạn
            })
            .catch(error => {
                console.error('Lỗi khi gửi dữ liệu:', error);
            });
    };

    const handleSignUpClick = () => {
        const container = document.getElementById('container');
        container.classList.add('right-panel-active');
    };

    const handleSignInClick = () => {
        const container = document.getElementById('container');
        container.classList.remove('right-panel-active');
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
            }

            button:active {
                transform: scale(0.95);
            }

            button:focus {
                outline: none;
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
        `;

    return (
        <>
            <style>{styles}</style>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={submitData}>
                        <h1>Đăng Ký Tài Khoản</h1>
                        <input type="text" id="tenSV" placeholder="Họ Tên" onChange={handleChange} value={formData.tenSV} />
                        <input type="text" id="mssv" placeholder="Mã Số Sinh Viên" onChange={handleChange} value={formData.mssv} />
                        <input type="email" id="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                        <input type="password" id="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                        <input type="text" id="nganh_hoc" placeholder="Ngành Học" onChange={handleChange} value={formData.nganh_hoc} />

                        {/* <button type="submit" id="registerButton">Đăng Ký</button> */}
                        <button type="button" id="registerButton" onClick={submitData}>Đăng Ký</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Đăng Nhập</h1>
                        <input
                            // className="login-sodt"
                            placeholder="Email"
                            type="text"
                            name="email"
                            value={formdata.email}
                            onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
                            required
                        />
                        <input
                            // className="login-pass"
                            placeholder="Password"
                            name="password"
                            // type={showPassword ? "text" : "password"}
                            value={formdata.password}
                            onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
                            required
                        />
                        {/* <input type="password" id="password" name="password" placeholder="Password" /> */}
                        <a href="forgetpw.html">Forgot your password?</a>
                        <button
                            type="submit"
                            className="loginButton"
                        // onClick={handleLogin(email, password)}
                        >
                            Đăng nhập
                        </button>
                        {/* <button type="button" id="loginButton">Đăng Nhập</button> */}
                    </form>
                    {/* <form>
                        <h1>Đăng Nhập</h1>
                        <input type="email" id="email" name="email" placeholder="Email" />
                        <input type="password" id="password" name="password" placeholder="Password" />
                        <a href="forgetpw.html">Forgot your password?</a>
                        <button type="button" id="loginButton">Đăng Nhập</button>
                    </form> */}
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
            </div>
        </>
    );
}

export default DangKyDangNhap;




