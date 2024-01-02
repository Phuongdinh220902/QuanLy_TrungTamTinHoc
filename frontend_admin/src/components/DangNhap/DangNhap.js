import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginadmin } from "../../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEyeSlash,
    faEye
} from "@fortawesome/free-solid-svg-icons";

const DangNhap = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    });


    // const [showPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await loginadmin(formdata);

            if (response.status === 200 && response.data.check === "1") {
                // Chuyển hướng đến trang sau khi đăng nhập thành công
                navigate('/user');
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

    return (
        <div className="app-background">
            <div className="">
                <div className="login">
                    <div>
                        <h3>
                            TRUNG TÂM TIN HỌC
                        </h3>
                    </div>

                    <div className="login-container">

                        <form className="login-form" onSubmit={handleSubmit}>
                            {/* <h5 className="form-heading login-heading">
                                Thông tin đăng nhập
                            </h5> */}
                            <p> </p>

                            <div className="input-box">
                                {/* <span className="icon">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span> */}
                                <input
                                    className="login-sodt"
                                    type="text"
                                    name="email"
                                    value={formdata.email}
                                    onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
                                    required
                                />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <span className="icon">
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </span>
                                <input
                                    className="login-pass"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formdata.password}
                                    onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
                                    required
                                />
                                <label>Password</label>
                            </div>

                            {/* <a className="login-qmk">Quên mật khẩu?</a> */}
                            <button
                                type="submit"
                                className="btn-submit-login"
                            // onClick={handleLogin(email, password)}
                            >
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DangNhap;