import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from "axios";
import { useParams } from "react-router-dom";

const ThemKH = ({ show, handleCloseModalLH, onUpdate }) => {
    const [tenLopHoc, setTenLopHoc] = useState('');
    const [maGV, setmaGV] = useState('');
    const { maKH } = useParams();
    const [thoigian, setThoiGian] = useState('');
    const [diadiem, setDiaDiem] = useState('');
    const [slHVToiDa, setslHVToiDa] = useState('');
    const [hanDK, sethanDK] = useState('');
    const [ngay_batdau, setNgayBatDau] = useState('');
    const [dsGV, setDsGV] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [showModalCreateLH, setShowModalCreateLH] = useState(false);

    const handleClose = () => {
        setShowModalCreateLH(false);
        setTenLopHoc("");
        setThoiGian("");
        setDiaDiem("");
        setslHVToiDa("");
        sethanDK("");
        setNgayBatDau("");
        handleCloseModalLH();
    }

    const handleShow = () => setModalOpen(true);

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

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('tenLopHoc', tenLopHoc);
            formData.append('ngay_batdau', ngay_batdau);
            formData.append('diadiem', diadiem);
            formData.append('thoigian', thoigian);
            formData.append('hanDK', hanDK);
            formData.append('maGV', maGV);
            formData.append('maKH', maKH);
            formData.append('slHVToiDa', slHVToiDa);
            for (const value of formData.values()) {
                console.log(value);
            }

            let mdata = {
                tenLopHoc: tenLopHoc,
                ngay_batdau: ngay_batdau,
                diadiem: diadiem,
                thoigian: thoigian,
                maGV: maGV,
                hanDK: hanDK,
                slHVToiDa: slHVToiDa,
                maKH: maKH,
            }
            console.log(mdata)
            await axios.post('http://localhost:2209/api/v1/themLopHoc', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            onUpdate();
            toast.success('Thêm thành công');
            handleClose();
        }
        catch (error) {
            console.error("Lỗi khi gọi API thêm giảng viên:", error.message);
            toast.error("Đã xảy ra lỗi khi thêm giảng viên");
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}
                size="xl"
                backdrop='static'
                className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới khoá học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên lớp học</label>
                            <input type="text" className="form-control" value={tenLopHoc}
                                onChange={(event) => setTenLopHoc(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Ngày khai giảng</label>
                            <input type="date" className="form-control" value={ngay_batdau}
                                onChange={(event) => setNgayBatDau(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Địa điểm</label>
                            <input type="text" className="form-control" value={diadiem}
                                onChange={(event) => setDiaDiem(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Thời gian</label>
                            <input type="text" className="form-control" value={thoigian}
                                onChange={(event) => setThoiGian(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Số lượng học viên</label>
                            <input type="number" className="form-control" value={slHVToiDa}
                                onChange={(event) => setslHVToiDa(event.target.value)} />
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
                            <label className="form-label">Hạn đăng ký</label>
                            <input type="date" className="form-control" value={hanDK}
                                onChange={(event) => sethanDK(event.target.value)} />
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ThemKH;