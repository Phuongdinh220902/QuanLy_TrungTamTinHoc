import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logoImage1 from '../../images/lien-he-tu-van-ghi-danh.png';
import logoImage2 from '../../images/ban-do.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const TrangChuGV = () => {
    const [danhSachGiaoVien, setDanhSachGiaoVien] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách giáo viên
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/layTrangChuGiangVien');
                setDanhSachGiaoVien(response.data.TCGV);
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="giang-vien-container">
                <div className="container">
                    <div style={{ "overflow": 'visible' }}>
                        <div className="col">
                            <div className="section-title" style={{ "marginBottom": "30px" }}>
                                <h2 className="tieu-de-muc">
                                    <span>Đội ngũ Giảng viên</span>

                                </h2>
                                <p>Những chuyên gia giàu kinh nghiệm thực tế và chuyên nghiệp</p>
                            </div>
                        </div>
                    </div>
                    <div className="row giang-vien-items">
                        {danhSachGiaoVien.map((giaoVien) => (
                            <div key={giaoVien.maGV} className="col-lg-3 col-md-6 col-sm-6 giang-vien-col">
                                <div className="giang-vien-item">
                                    <div className={`gv-image img-hover-zoom gv${giaoVien.maHA}`}>
                                        <a href={`/giao-vien~${giaoVien.maGV}`}>
                                            <img src={`http://localhost:2209/images/${giaoVien.tenHA}`}
                                                alt={giaoVien.tenGV} />
                                        </a>
                                    </div>
                                    <div className="gv-body">
                                        <div className="giang-vien-title">
                                            <a href={`/giao-vien~${giaoVien.maGV}`}>{giaoVien.tenGV}</a>
                                        </div>
                                        {/* <div className="giang-vien-subtitle">{giaoVien.tenHA}</div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div id="lien-he" className="container lien-he">
                <div className="col1">
                    <div className="co-so">
                        <div className="tieu-de">
                            <img src={logoImage1} alt="" />&nbsp;Liên hệ
                            ghi danh
                        </div>
                        <div className="noi-dung">
                            <FontAwesomeIcon icon={faLocationDot} />&nbsp;
                            Khu II, Đ.3 Tháng 2, Ninh Kiều, Cần Thơ<br />
                            Điện thoại: 0999999999 - Fax: 38324466<br />
                            Giờ làm việc: từ 07h30 - 17h00
                            <ul>
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
                                </li>

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
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
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
        </>
    );
};

export default TrangChuGV;
