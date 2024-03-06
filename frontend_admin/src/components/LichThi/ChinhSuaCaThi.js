import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';

const ModalUpdateCaThi = ({ show, handleClose, selectedCT, onUpdate }) => {
    const [thoigian, setthoigian] = useState('');
    const [slDaDK, setslDaDK] = useState('');
    const [slToiDa, setslToiDa] = useState('');

    useEffect(() => {
        if (selectedCT) {
            setthoigian(selectedCT.thoigian);
            setslToiDa(selectedCT.slToiDa);
            setslDaDK(selectedCT.slDaDK);
        }
    }, [selectedCT]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('thoigian', thoigian);
            formData.append('slDaDK', slDaDK);
            formData.append('slToiDa', slToiDa);

            let mdata = {
                maCaThi: selectedCT.maCaThi,
                thoigian: thoigian,
                slDaDK: slDaDK,
                slToiDa: slToiDa,
            }
            await axios.post('http://localhost:2209/api/v1/updateCaThi', mdata, {
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
                    <Modal.Title>Cập nhật lớp học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Thời gian</label>
                            <input type="text" className="form-control" value={thoigian}
                                onChange={(event) => setthoigian(event.target.value)} />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Số lượng đã đăng ký</label>
                            <input type="text" className="form-control" value={slDaDK}
                                onChange={(event) => setslDaDK(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Số lượng tối đa</label>
                            <input type="text" className="form-control" value={slToiDa}
                                onChange={(event) => setslToiDa(event.target.value)} />
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

export default ModalUpdateCaThi;
