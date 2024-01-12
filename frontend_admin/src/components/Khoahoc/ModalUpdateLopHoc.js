import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
// import ToastProvider from "../ToastContainer";
import { format } from "date-fns";


const ModalUpdateLopHoc = ({ show, handleClose, selectedLH, onUpdate }) => {
    const [tenLopHoc, setTenLopHoc] = useState('');
    const [maGV, setmaGV] = useState('');

    // Các biến khác nếu có
    console.log(selectedLH)
    useEffect(() => {
        if (selectedLH) {
            setTenLopHoc(selectedLH.tenLopHoc);
            setmaGV(selectedLH.maGV);
        }
    }, [selectedLH]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('tenLopHoc', tenLopHoc);
            formData.append('maGV', maGV);

            for (const value of formData.values()) {
                console.log(value);
            }

            let mdata = {
                maLopHoc: selectedLH.maLopHoc,
                tenLopHoc: tenLopHoc,
                maGV: maGV,
            }
            console.log(mdata)
            await axios.post('http://localhost:2209/api/v1/updateLH', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

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
                    <Modal.Title>Chỉnh sửa lơp</Modal.Title>
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
                            <input type="text" className="form-control" value={maGV}
                                onChange={(event) => setmaGV(event.target.value)} />
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

export default ModalUpdateLopHoc;
