import React from 'react';
import lienhe from '../../images/anh-linehe.png'; // Đường dẫn đến ảnh của bạn

const ContactInfo = () => {
    return (
        <div className="contact-info">
            <h2>Trung Tâm Điện Tử & Tin Học - Bộ phận Đào tạo</h2>
            <p>Văn phòng đào tạo chứng chỉ - Khu II – Trường CNTT&TT (Khu Hiệu Bộ cũ) – ĐHCT</p>
            <p>ĐT: (84) 0292.3735 898</p>
            <div className="contact-person">
                <h3>Giám đốc Trung tâm</h3>
                <p>Thầy Trần Minh Tân</p>
                <p>Email: tmtan@ctu.edu.vn</p>
                <p>Điện thoại: 0982 88 90 90</p>
            </div>
            <div className="contact-person">
                <h3>Phó Giám đốc Trung tâm</h3>
                <p>Thầy Phan Huy Cường</p>
                <p>Email: phcuong@cit.ctu.edu.vn</p>
            </div>
            <div className="contact-person">
                <h3>Chuyên viên văn phòng Trung tâm</h3>
                <p>Cô Lê Ngọc Giàu, email: lngiau@cit.ctu.edu.vn</p>
                <p>Cô Võ Thị Út, email: vtut@cit.ctu.edu.vn</p>
                <p>Cô Phan Thị Yến Nhi, email: ptynhi@cit.ctu.edu.vn</p>
            </div>
            <img src={lienhe} alt="Avatar" className="contact-avatar" /> {/* Chèn ảnh vào */}
        </div>
    );
};

export default ContactInfo;

