import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
import { format, parse } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileImport
} from "@fortawesome/free-solid-svg-icons";

const ModalUpdateGV = ({ show, handleClose, selectedHinhAnh, onUpdate }) => {
    const [maHinhAnhQC, setmaHinhAnhQC] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');


    useEffect(() => {
        if (selectedHinhAnh) {
            setmaHinhAnhQC(selectedHinhAnh.maHinhAnhQC);
            setImage(selectedHinhAnh.tenHinhAnhQC);
        }
    }, [selectedHinhAnh]);

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('maHinhAnhQC', maHinhAnhQC);
            console.log(maHinhAnhQC)
            if (image instanceof Blob) {
                formData.append("file", image, image.name);
            }
            for (const value of formData.values()) {
                console.log(value);
            }

            let res = await axios.post('http://localhost:2209/api/v1/updateHAQC', formData);
            toast.success('Update thành công');
            onUpdate();
            handleClose();
        }
        catch (error) {
            console.error("Lỗi khi gọi API cập nhật hình ảnh:", error.message);
            toast.error("Đã xảy ra lỗi khi cập nhật hình ảnh");
        }
    }


    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" backdrop='static' className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật hình ảnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">

                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <FontAwesomeIcon icon={faFileImport} /> Thay đổi ảnh </label>
                            <input type="file" id="labelUpload" hidden
                                onChange={(event) => handleUpLoadImage(event)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            <img
                                className="avatar_img"
                                src={
                                    previewImage ||
                                    (selectedHinhAnh && selectedHinhAnh.tenHinhAnhQC
                                        ? `http://localhost:2209/images/${selectedHinhAnh.tenHinhAnhQC}`
                                        : '')
                                }
                                alt=""
                            />
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

export default ModalUpdateGV;
