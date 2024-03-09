import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faPhone
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (

        <>
            <div className="footer">
                <div className="container" style={{ minHeight: "30px" }}>
                    <div className="col-md-10">
                        <div>
                            <div id="nhom3cs" style={{ "paddingTop": "15px", "fontSize": "13px", "overflow": "hidden" }}>
                                <div className="col-md-4 nhomcs">
                                    <div className="tencs">
                                        <b>Trụ sở chính:</b>
                                    </div>
                                    <div>
                                        <span className="glyphicon "
                                            style={{ "width": "16px" }}></span>
                                        <FontAwesomeIcon icon={faLocationDot} />&nbsp;
                                        Khu II, Đ.3 Tháng 2, Ninh Kiều, Cần Thơ
                                    </div>
                                    <div>
                                        <span className="glyphicon "
                                            style={{ "width": "16px" }}></span>
                                        <FontAwesomeIcon icon={faPhone} />&nbsp;
                                        0999999999
                                    </div>
                                </div>
                                <div className="col-md-4 nhomcs">
                                    <div className="tencs">
                                        <b>Cơ sở:</b>
                                    </div>
                                    <div>
                                        <span className="glyphicon "
                                            style={{ "width": "16px" }}></span>
                                        <FontAwesomeIcon icon={faLocationDot} />&nbsp;
                                        Số 01 Lý Tự Trọng, Q. Ninh Kiều, Tp. Cần Thơ
                                    </div>
                                    <div>
                                        <span className="glyphicon "
                                            style={{ "width": "16px" }}></span>
                                        <FontAwesomeIcon icon={faPhone} />&nbsp;
                                        0912121212
                                    </div>
                                </div>
                                <div className="col-md-4 nhomcs">
                                    <div className="tencs">
                                        <b>Chính sách và quy định chung</b>
                                    </div>
                                    <div>
                                        <span className="glyphicon" style={{ "width": "16px" }}>&nbsp;</span>
                                        <a href="http://csc.edu.vn/tin-tuc/tin-tuc-trung-tam-tin-hoc/Chinh-sach-chung-va-dieu-khoan-4088"
                                            style={{ color: "#FFF" }}>Điều khoản dịch vụ</a>
                                    </div>
                                    <div>
                                        <span className="glyphicon" style={{ "width": "16px" }}>&nbsp;</span>
                                        <a href="http://csc.edu.vn/tin-tuc/tin-tuc-trung-tam-tin-hoc/Chinh-sach-bao-mat-thong-tin-4091"
                                            style={{ color: "#FFF" }}>Chính sách bảo mật</a>
                                    </div>
                                    <div>
                                        <span className="glyphicon"
                                            style={{ "width": "16px" }}>&nbsp;</span>
                                        Số ĐKKD 4109000014 cấp ngày 31/08/2010
                                    </div>
                                </div>
                            </div>
                            <div style={{ "color": "#FFF", "fontStyle": "italic", "fontSize": "14px", "padding": "10px 0 15px" }}>
                                Copyright &copy;Trung Tâm Tin Học Trường Đại học Cần Thơ</div>
                        </div>
                    </div>
                    <div style={{ "clear": "both" }}></div>
                </div>
            </div>


        </>
    );

}

export default Footer;

