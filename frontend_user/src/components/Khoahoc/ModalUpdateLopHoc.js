import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
import { format } from "date-fns";


const ModalUpdateLopHoc = ({ show, handleClose, selectedLH, onUpdate }) => {
    const [tenLopHoc, setTenLopHoc] = useState('');
    const [maGV, setmaGV] = useState('');
    const [thoigian, setThoiGian] = useState('');
    const [diadiem, setDiaDiem] = useState('');
    const [ngay_batdau, setNgayBatDau] = useState('02/02/2002');
    const [dsGV, setDsGV] = useState([]);
    const newns = format(new Date(ngay_batdau), "dd/MM/yyyy");

    console.log(selectedLH);

    useEffect(() => {
        const fetchDSGV = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/DSGiangVien');
                setDsGV(response.data.dsGV);
            } catch (error) {
                console.error("Lỗi khi gọi API danh sách giảng viên:", error.message);
            }
        };

        fetchDSGV();
    }, []);

    useEffect(() => {
        if (selectedLH) {
            setTenLopHoc(selectedLH.tenLopHoc);
            setmaGV(selectedLH.maGV);
            setThoiGian(selectedLH.thoigian);
            setDiaDiem(selectedLH.diadiem);
            setNgayBatDau(selectedLH.ngay_batdau);
        }
    }, [selectedLH]);



    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('tenLopHoc', tenLopHoc);
            formData.append('maGV', maGV);
            formData.append('thoigian', thoigian);
            formData.append('diadiem', diadiem);
            const formattedNgayBatDau = format(new Date(ngay_batdau), 'yyyy-MM-dd');
            formData.append('ngay_batdau', formattedNgayBatDau);

            let mdata = {
                maLopHoc: selectedLH.maLopHoc,
                tenLopHoc: tenLopHoc,
                maGV: maGV,
                thoigian: thoigian,
                diadiem: diadiem,
                ngay_batdau: formattedNgayBatDau,
            }
            await axios.post('http://localhost:2209/api/v1/updateLH', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            onUpdate();
            toast.success('Update thành công');
            handleClose();
        }
        catch (error) {
            console.error("Lỗi khi gọi API cập nhật lớp học:", error.message);
            toast.error("Đã xảy ra lỗi khi cập nhật lớp học");
        }
    };



    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" backdrop='static' className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa lớp học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên Lớp Học</label>
                            <input type="text" className="form-control" value={tenLopHoc}
                                onChange={(event) => setTenLopHoc(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Giảng Viên</label>
                            <select className="form-select" value={maGV} onChange={(event) => setmaGV(event.target.value)}>
                                <option value="">Chọn giảng viên</option>
                                {dsGV.map((gv) => (
                                    <option key={gv.maGV} value={gv.maGV}>
                                        {gv.tenGV}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Thời gian</label>
                            <input type="text" className="form-control" value={thoigian}
                                onChange={(event) => setThoiGian(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Địa điểm</label>
                            <input type="text" className="form-control" value={diadiem}
                                onChange={(event) => setDiaDiem(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Ngày bắt đầu</label>
                            <input type="text" className="form-control" value={newns}
                                onChange={(event) => setNgayBatDau(event.target.value)} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdate()}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );

};

export default ModalUpdateLopHoc;
