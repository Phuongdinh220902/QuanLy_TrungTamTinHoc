import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';

const ModalUpdate = ({ show, handleClose, selectedLT, onUpdate }) => {
    const [maLichThi, setmaLichThi] = useState('');
    const [ngaythi, setNgayThi] = useState('');

    // Các biến khác nếu có
    console.log(selectedLT)
    useEffect(() => {
        if (selectedLT) {
            setmaLichThi(selectedLT.maLichThi);
            setNgayThi(selectedLT.ngaythi);
        }
    }, [selectedLT]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('ngaythi', ngaythi);
            console.log(selectedLT.maLichThi);


            let mdata = {
                maLichThi: selectedLT.maLichThi,
                ngaythi: ngaythi,
            }
            await axios.post('http://localhost:2209/api/v1/updateLichThi', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            toast.success('Update lịch thi thành công');
            onUpdate();
            handleClose();
        }
        catch (error) {
            console.error("Lỗi khi gọi API cập nhật lịch thi:", error.message);
            toast.error("Đã xảy ra lỗi khi cập nhật lịch thi");
        }
    };


    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" backdrop='static' className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa lịch thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Ngày thi (Nhập : dd/mm/yyyy)</label>
                            <input type="text" className="form-control" value={ngaythi}
                                onChange={(event) => setNgayThi(event.target.value)} />
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

export default ModalUpdate;
