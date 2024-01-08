import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
// import ToastProvider from "../ToastContainer";


const ModalUpdateKH = ({ show, handleClose, selectedKH, onUpdate }) => {
    const [tenKH, setTen] = useState('');
    const [mota, setmota] = useState('');
    const [hocphi, sethocphi] = useState('');
    const [monhoc, setmonhoc] = useState('');
    const [so_gio, setso_gio] = useState('');
    // Các biến khác nếu có
    console.log(selectedKH)
    useEffect(() => {
        if (selectedKH) {
            setTen(selectedKH.tenKH);
            setmota(selectedKH.mota);
            sethocphi(selectedKH.hocphi);
            setmonhoc(selectedKH.monhoc);
            setso_gio(selectedKH.so_gio);
        }
    }, [selectedKH]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('tenKH', tenKH);
            formData.append('mota', mota);
            formData.append('hocphi', hocphi);
            formData.append('monhoc', monhoc);
            formData.append('so_gio', so_gio);
            // formData.append('so_gio', so_gio);
            for (const value of formData.values()) {
                console.log(value);
            }

            let mdata = {
                maKH: selectedKH.maKH,
                tenKH: tenKH,
                mota: mota,
                hocphi: hocphi,
                monhoc: monhoc,
                so_gio: so_gio,
            }
            console.log(mdata)
            await axios.post('http://localhost:2209/api/v1/updateKH', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            toast.success('Update người dùng thành công');
            onUpdate();
            handleClose();
        }
        catch (error) {
            console.error("Lỗi khi gọi API cập nhật học viên:", error.message);
            toast.error("Đã xảy ra lỗi khi cập nhật học viên");
        }
    };


    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" backdrop='static' className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa khoá học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên Khoá Học</label>
                            <input type="text" className="form-control" value={tenKH}
                                onChange={(event) => setTen(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Mô tả</label>
                            <input type="mota" className="form-control" value={mota}
                                onChange={(event) => setmota(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Học Phí</label>
                            <input type="text" className="form-control" value={hocphi}
                                onChange={(event) => sethocphi(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Môn học</label>
                            <input type="text" className="form-control" value={monhoc}
                                onChange={(event) => setmonhoc(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Số giờ</label>
                            <input type="text" className="form-control" value={so_gio}
                                onChange={(event) => setso_gio(event.target.value)} />
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

            {/* <ToastProvider /> */}
        </div>

    );

};

export default ModalUpdateKH;
