import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faPhone
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        // <>
        //     <div className="footer">
        //         <div className="container" style={{ minHeight: '30px' }}>
        //             <div className="col-md-10">
        //                 <div>
        //                     <div id="nhom3cs" style={{ paddingTop: '15px', fontSize: '18px', overflow: 'hidden' }}>
        //                         <div className="col-md-4 nhomcs">
        //                             <div className="tencs">
        //                                 <b>Địa chỉ:</b>
        //                             </div>
        //                             <div>
        //                                 <span className="glyphicon glyphicon-map-marker" style={{ width: "16px" }}></span>
        //                                 Khu II, Đường 3/2, Phường Xuân Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ
        //                             </div>
        //                             <div>
        //                                 <span className="glyphicon glyphicon-phone-alt" style={{ width: "16px" }}></span>
        //                                 +84292 3832 663
        //                             </div>
        //                             {/* <iframe
        //                                 title="Vị trí Google Maps"
        //                                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841454377583!2d105.7680350095201!3d10.029938972479655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1705760737056!5m2!1svi!2s"
        //                                 width="400" height="300"
        //                                 style={{ "border": 0, "borderRadius": "10px" }}
        //                                 allowFullScreen=""
        //                                 loading="lazy"
        //                                 referrerPolicy="no-referrer-when-downgrade"
        //                             ></iframe> */}

        //                         </div>
        //                         <div className="col-md-4 nhomcs">
        //                             <div className="tencs">
        //                                 <b>Cơ sở:</b>
        //                             </div>
        //                             <div>
        //                                 <span className="glyphicon glyphicon-map-marker" style={{ width: "16px" }}>&nbsp;</span>
        //                                 21-23 Nguyễn Biểu, P1, Quận 5, Tp HCM
        //                             </div>
        //                             <div>
        //                                 <span className="glyphicon glyphicon-phone-alt" style={{ width: "16px" }}>&nbsp;</span>
        //                                 (028) 38 351 056 (số m &aacute;y nh &aacute;nh 222)
        //                             </div>
        //                         </div>
        //                         <div className="col-md-4 nhomcs">
        //                             <div className="tencs">
        //                                 <b>Thông tin liên hệ </b>
        //                             </div>
        //                             <div>
        //                                 <span className="glyphicon glyphicon-ok" style={{ width: "16px" }}>&nbsp;</span>
        //                                 <a href="http://csc.edu.vn/tin-tuc/tin-tuc-trung-tam-tin-hoc/Chinh-sach-chung-va-dieu-khoan-4088"
        //                                     style={{ color: "#FFF" }}>Điều khoản dịch vụ</a>
        //                             </div>
        //                             <div>
        //                                 <span className="glyphicon glyphicon-ok" style={{ width: "16px" }}>&nbsp;</span>
        //                                 <a href="http://csc.edu.vn/tin-tuc/tin-tuc-trung-tam-tin-hoc/Chinh-sach-bao-mat-thong-tin-4091"
        //                                     style={{ color: "#FFF" }}>Ch &iacute;nh s &aacute;ch bảo mật</a>
        //                             </div>
        //                             <div>
        //                                 <span className="glyphicon glyphicon-registration-mark"
        //                                     style={{ width: "16px" }}>&nbsp;</span>
        //                                 <FontAwesomeIcon icon={faEnvelope} />&nbsp;
        //                                 Email: webmaster@cit.ctu.edu.vn
        //                             </div>
        //                             <div>
        //                                 <span className="glyphicon glyphicon-registration-mark"
        //                                     style={{ width: "16px" }}>&nbsp;</span>
        //                                 <FontAwesomeIcon icon={faPhone} />&nbsp;
        //                                 Số điện thoại: 0982 88 90 90
        //                             </div>
        //                         </div>
        //                     </div>
        //                     {/* <div style={{ color: '#FFF', fontStyle: "italic", fontSize: '14px', padding: '10px 0 15px' }}>
        //                         Copyright &copy;Trung T &acirc;m Tin Học Trường Đại học khoa học Tự nhi &ecirc;n</div> */}
        //                 </div>
        //             </div>
        //             <div style={{ clear: 'both' }}></div>
        //         </div>
        //     </div>
        // </>

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
                    {/* <div className="col-md-2" style={{ "textAlign": "center", "padding": "15px" }}>
                        <a href='https://www.facebook.com/Trungtamtinhockhtn' title='Liên kết với chúng tôi'
                            target='_blank'>
                            <img src='/data/images/trang-chu/facebook.png' />
                        </a>
                        <a href='http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=46248'
                            title='Đã thông báo' target='_blank'>
                            <img src='/data/images/trang-chu/da_thong_bao.png' style={{ 'marginTop': '10px' }} />
                        </a>
                    </div> */}
                    <div style={{ "clear": "both" }}></div>
                </div>
            </div>
        </>
    );

}

export default Footer;
