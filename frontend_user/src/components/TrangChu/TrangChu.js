import React, { useState, useEffect } from 'react';

import KhoaHoc from './TrangChuKhoaHoc'
import DichVu from './TrangChuDichVu'
import TrangChuGV from './TrangChuGiangVien'
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

function MyCarousel() {
    const [dsAnh, setDsAnh] = useState([]);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    useEffect(() => {
        const fetchHinhAnh = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/layHinhAnhTrangChu');
                setDsAnh(response.data.HA);
                console.log(response.data.HA);
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };
        fetchHinhAnh();
    }, []);

    return (
        <Carousel className="custom-carousel" interval={3000} controls={false} indicators onSelect={handleSelect}>
            {dsAnh.map((anh, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:2209/images/${anh.tenHinhAnhQC}`}
                        alt=""
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};


const TrangChu = () => {
    return (
        <div>
            <MyCarousel />
            <KhoaHoc />
            <DichVu />
            <TrangChuGV />
        </div>
    );
}

export default TrangChu;


