import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TrangChuGV = () => {
    const [danhSachGiaoVien, setDanhSachGiaoVien] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách giáo viên
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/layTrangChuGiangVien');
                // Lấy danh sách giáo viên từ response
                const danhSach = response.data.TCGV;
                // Nếu danh sách có ít hơn hoặc bằng 8 phần tử, không cần lọc ngẫu nhiên
                if (danhSach.length <= 8) {
                    setDanhSachGiaoVien(danhSach);
                } else {
                    // Nếu danh sách có hơn 8 phần tử, lấy ngẫu nhiên 8 phần tử
                    const randomIndexes = [];
                    while (randomIndexes.length < 8) {
                        const randomIndex = Math.floor(Math.random() * danhSach.length);
                        if (!randomIndexes.includes(randomIndex)) {
                            randomIndexes.push(randomIndex);
                        }
                    }
                    const randomGiaoVien = randomIndexes.map(index => danhSach[index]);
                    setDanhSachGiaoVien(randomGiaoVien);
                }
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
                                        <a href={`/thongtingiangvien/${giaoVien.maGV}`}>
                                            <img src={`http://localhost:2209/images/${giaoVien.tenHA}`}
                                                alt={giaoVien.tenGV} />
                                        </a>
                                    </div>
                                    <div className="gv-body">
                                        <div className="giang-vien-title">
                                            <a href={`/thongtingiangvien/${giaoVien.maGV}`}>{giaoVien.tenGV}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </>
    );
};

export default TrangChuGV;
