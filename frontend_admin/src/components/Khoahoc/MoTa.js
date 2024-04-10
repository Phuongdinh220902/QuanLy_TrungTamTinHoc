import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    deleteMoTa
} from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';

const MoTa = (props) => {
    const { maKH } = useParams();
    const { maND } = useParams();
    const [moTaKhoaHoc, setMoTaKhoaHoc] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectID, setselectID] = useState(null);

    useEffect(() => {
        fetchData();
    }, [maKH]);
    console.log(maKH, 'maKH')

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:2209/api/v1/layMoTaKH/${maKH}`);
            setMoTaKhoaHoc(response.data.ND);
            console.log(response.data.ND);
        } catch (error) {
            console.error('Lỗi khi gọi API: ', error);
        }
    };


    const handleDelete = async () => {
        try {
            await deleteMoTa(selectID);
            console.log(maND)
            setShowModal(false);
            toast.success("Xoá mô tả thành công");

            fetchData();
            console.log("Xoá mô tả thành công!");
        } catch (error) {
            toast.error("Lỗi khi xoá mô tả")
            console.error("Lỗi khi xóa mô tả:", error);
        }
    };

    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Mô Tả Khoá Học</h2>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                    <button className="btn btn-info mx-2" >
                        <Link to={`/themnoidungkhoahoc/${maKH}`} style={{ textDecoration: 'none', color: 'white' }}>
                            Thêm mô tả khoá học
                        </Link>
                    </button>
                </div>

                <div className="listDV">
                    <div className="table-container" style={{ marginTop: '30px' }}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="table-item">STT</th>
                                    <th className="table-item">Tiêu Đề</th>
                                    <th className="table-item"> </th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {moTaKhoaHoc.map((item, index) => (
                                    <tr key={index} className="tableRow">
                                        <td className="table-item col-right">{index + 1}</td>
                                        <td className="">{item.tieude}</td>

                                        <td className="table-item">
                                            <Link to={`/chinhsuamota/${item.maND}?maKH=${maKH}`}>
                                                <button className="btn btn-warning mx-2">
                                                    Cập nhật
                                                </button>
                                            </Link>

                                            <button className="btn btn-danger "
                                                onClick={() => { setselectID(item.maND); setShowModal(true) }}
                                            >Xoá</button>
                                        </td>
                                    </tr>
                                ))}
                                {moTaKhoaHoc.length === 0 && (
                                    <tr className="tablenone">
                                        <td className="tablenone" colSpan="4">Không có mô tả khoá học!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                className="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xoá mô tả này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MoTa;
