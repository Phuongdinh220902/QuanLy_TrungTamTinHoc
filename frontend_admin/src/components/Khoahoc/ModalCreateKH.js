import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
    faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from "axios";

const ThemKH = ({ show, handleCloseModalKH, onUpdate }) => {
    const [tenKH, setTen] = useState('');
    const [hocphi, sethocphi] = useState('');
    const [mota, setmota] = useState('');
    const [monhoc, setmonhoc] = useState('');
    const [so_gio, setso_gio] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [showModalCreateKH, setShowModalCreateKH] = useState(false);

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const handleClose = () => {
        setShowModalCreateKH(false);
        setTen("");
        sethocphi("");
        setmota("");
        setmonhoc("");
        setso_gio("");
        setImage("");
        setPreviewImage("");
        handleCloseModalKH();
    }

    const handleShow = () => setModalOpen(true);

    const normalizeTenKH = (tenKH) => {
        // Loại bỏ khoảng trắng dư thừa ở đầu và cuối chuỗi
        tenKH = tenKH.trim();
        // Thay thế nhiều khoảng trắng ở giữa chuỗi bằng một khoảng trắng
        tenKH = tenKH.replace(/\s+/g, ' ');
        console.log(tenKH)
        return tenKH;
    };

    const normalizeMoTa = (mota) => {
        // Loại bỏ khoảng trắng dư thừa ở đầu và cuối chuỗi
        mota = mota.trim();
        // Thay thế nhiều khoảng trắng ở giữa chuỗi bằng một khoảng trắng
        mota = mota.replace(/\s+/g, ' ');
        console.log(mota)
        return mota;
    };


    const handleSave = async () => {
        const normalizedTenKH = normalizeTenKH(tenKH);
        const normalizedMoTa = normalizeMoTa(mota);
        try {
            const formData = new FormData();
            formData.append('tenKH', normalizedTenKH);
            formData.append('hocphi', hocphi);
            formData.append('mota', normalizedMoTa);
            formData.append('monhoc', monhoc);
            formData.append('so_gio', so_gio);
            formData.append('file', image, image.name);
            for (const value of formData.values()) {
                console.log(value);
            }

            let res = await axios.post('http://localhost:2209/api/v1/themKH', formData);
            if (res.data && res.data.EC === 0) {
                toast.success('Thêm thành công');
                onUpdate();
                handleClose();
            }

            if (res.data && res.data.EC !== 0) {
                toast.error(res.data.EM);
            }
            // onUpdate();
            // toast.success('Thêm thành công');
            // handleClose();
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
                            <label className="form-label">Tên khoá học</label>
                            <input type="text" className="form-control" value={tenKH}
                                onChange={(event) => setTen(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Học phí</label>
                            <input type="hocphi" className="form-control" value={hocphi}
                                onChange={(event) => sethocphi(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Mô tả</label>
                            <input type="text" className="form-control" value={mota}
                                onChange={(event) => setmota(event.target.value)} />
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

export default ThemKH;