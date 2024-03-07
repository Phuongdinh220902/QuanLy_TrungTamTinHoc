import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';

const ModalCaThi = ({ isOpen, closeModal, caThiInfo }) => {


    return (
        <div>
            <Modal show={isOpen} onHide={closeModal} size="xl" backdrop='static' className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật lớp học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Thông tin ca thi</h2>
                    {caThiInfo && (
                        <div>
                            <p>Thời gian: {caThiInfo.thoigian}</p>
                            <p>Ngày thi: {caThiInfo.ngaythi}</p>
                            <p>Trạng thái: {caThiInfo.trang_thai}</p>
                        </div>
                    )}
                    <button onClick={closeModal}>Đóng</button>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );

};

export default ModalCaThi;
