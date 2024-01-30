import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileImport,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const ModalCreateGV = ({ show, handleCloseModalHAQC, onUpdate }) => {
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [showModalCreateGV, setShowModalCreateGV] = useState(false);

    const handleClose = () => {
        setShowModalCreateGV(false);
        setImage("");
        setPreviewImage("");
        handleCloseModalHAQC();
    }
    const handleShow = () => setModalOpen(true);

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const handleSave = async () => {

        if (!(image instanceof Blob)) {
            toast.error("Vui lòng tải file ảnh");
        }

        const formData = new FormData();
        if (image instanceof Blob) {
            formData.append("file", image, image.name);
        }
        let res = await axios.post('http://localhost:2209/api/v1/themHAQC', formData);
        if (res.data && res.data.EC === 0) {
            toast.success(res.data.EM);
            onUpdate();
            handleClose();
        }

        if (res.data && res.data.EC !== 0) {
            toast.error("Lỗi khi thêm ảnh");
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}
                size="xl"
                backdrop='static'
                className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới hình ảnh quảng cáo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <FontAwesomeIcon icon={faFileImport} /> Tải ảnh lên </label>
                            <input type="file" id="labelUpload" hidden
                                onChange={(event) => handleUpLoadImage(event)} />
                        </div>

                        <div className="col-md-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>preview</span>
                            }
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

export default ModalCreateGV;