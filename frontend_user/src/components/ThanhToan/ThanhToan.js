import React from 'react';
import lienhe from '../../images/anh-linehe.png'; // Đường dẫn đến ảnh của bạn
import logoImage2 from '../../images/ban-do.png';
const ThanhToan = () => {
    return (
        <>
            <div className="tin-chi-tiet">
                <div className="container" style={{ minHeight: "calc(100vh - 420px)" }}>
                    <div id="fb-root" className=" fb_reset"><div style={{ position: 'absolute', top: '-10000px', width: '0px', height: "0px" }}><div></div></div></div>
                    <div className="col-md-9" khoang-cach-5="">

                        <h1 className="tieu-de-bai-viet-chi-tiet">Hướng dẫn thanh toán học phí</h1><div className="noi-dung-bai-viet-chi-tiet" style={{ marginTop: '20px' }}>
                            <div style={{ margin: ' 10px 0', display: "flex" }}>

                                <div className="fb-like fb_iframe_widget" >
                                    <span style={{ verticalAlign: 'bottom', width: '150px', height: "28px" }}>
                                    </span></div></div><div>
                                Để thanh toán học phí khóa học tại Trung Tâm Tin Học Đại Học Cần Thơ, bạn thanh toán trực tiếp tại Trung Tâm Tin Học Đại Học Cần Thơ</div>

                            <div>
                                &nbsp;</div>
                            <div>
                                <strong>Thanh toán trực tiếp tại Phòng ghi danh của Trung Tâm Tin Học</strong></div>
                            <ul>
                                <li>
                                    Địa chỉ: Khu II, Đ.3 Tháng 2, Ninh Kiều, Cần Thơ</li>

                            </ul>
                            <ul>
                                <li>
                                    Thời gian làm việc:</li>
                            </ul>
                            <div style={{ marginLeft: "40px" }}>
                                <li>
                                    Từ Thứ 2 đến Thứ&nbsp;6
                                    <ul>
                                        <li>
                                            Sáng: &nbsp;07h30 → 11h30
                                        </li>
                                        <li>
                                            Chiều: 13h00 → 19h00
                                        </li>
                                    </ul>
                                </li></div>
                            <div style={{ marginLeft: "40px" }}>
                                <li>
                                    Thứ 7 -&nbsp;Chủ nhật
                                    <ul>
                                        <li>
                                            Sáng: &nbsp;07h30 → 11h30
                                        </li>
                                        <li>
                                            Chiều: 13h00 → 17h00
                                        </li>
                                    </ul>
                                </li></div>
                            <div>
                                &nbsp;</div>


                            <div style={{ marginLeft: '140px', textAlign: "center" }}>

                                <div id="lien-he" className="container lien-he">

                                    <div className="col2">
                                        <div className="co-so">
                                            <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%E1%BA%A7n+Th%C6%A1/@10.029797,105.771426,15z/data=!4m6!3m5!1s0x31a0895a51d60719:0x9d76b0035f6d53d0!8m2!3d10.0299337!4d105.7706153!16s%2Fm%2F02r6wmy?hl=vi&entry=ttu"
                                                target="_blank" className="link-ban-do">
                                                <div className="img-hover-zoom img-hover-zoom--point-zoom hidden-xs">
                                                    <img src={logoImage2} alt=""
                                                        className="img-responsive ban-do" />
                                                </div>
                                                <img src={logoImage2} alt=""
                                                    className="img-responsive ban-do-mobile" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* <img alt="" src="/data/images/tin-tuc/tin-tuc-chung-trung-tam/CSC-GHIDANH-NVC.jpg" style="width: 800px; height: 532px;" /> */}
                            </div>
                            <div style={{ marginLeft: '40px', textAlign: "center" }}>
                                &nbsp;</div>
                            <div style={{ marginLeft: '40px', textAlign: "center" }}>
                                <em>Khu II, Đ.3 Tháng 2, Ninh Kiều, Cần Thơ</em></div>
                            <div style={{ marginLeft: '40px', textAlign: "center" }}>
                                &nbsp;</div>
                            <div style={{ marginLeft: '40px', textAlign: "center" }}>
                                &nbsp;</div>

                        </div>
                        <div className="tags-container">

                        </div>

                    </div>

                    <div className="col-md-3 hidden-sm hidden-xs">
                        <div className="sidebar">
                            <p>
                                <a href="https://csc.edu.vn/dang-ky">
                                    {/* <img alt="" src="/data/images/quang-cao/lap-trinh-csdl/dang-ki-online-lap-trinh-ung-dung-k293.png" style="width: 280px; height: 300px;" /> */}
                                </a></p>



                        </div>
                    </div>

                </div>






            </div>


        </>
    );
};

export default ThanhToan;

