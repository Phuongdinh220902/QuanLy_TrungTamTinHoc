import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {
    laydsLopHoc, deleteLH
} from "../../services/apiService";
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import ModalUpdateLopHoc from "./ModalUpdateLopHoc";
import { Link } from "react-router-dom";
import ModalCreateLH from "./ModalCreateLopHoc";

const LopHoc = (props) => {
    const { maKH } = useParams();
    const { maLopHoc } = useParams();

    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Mô Tả Khoá Học</h2>

                <div className="listDV">
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="table-item">STT</th>
                                    <th className="table-item">Tiêu Đề</th>
                                    <th className="table-item"> </th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                <tr className="tableRow">
                                    <td className="table-item col-right">1</td>
                                    <td className="">Mô tả</td>
                                    <td className="table-item">
                                        <button className="btn btn-info ">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Xem
                                            </Link>
                                        </button>
                                        <Link to={`/themchitiet/${maKH}`}>
                                            <button className="btn btn-info mx-2">
                                                Thêm
                                            </button>
                                        </Link>
                                        <button className="btn btn-warning">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Cập nhật
                                            </Link>
                                        </button>

                                    </td>
                                </tr>
                                <tr className="tableRow">
                                    <td className="table-item col-right">2</td>
                                    <td className="">Chương trình học</td>
                                    <td className="table-item">

                                        <button className="btn btn-info">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Xem
                                            </Link>
                                        </button>
                                        <button className="btn btn-info mx-2">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Thêm
                                            </Link>
                                        </button>
                                        <button className="btn btn-warning">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Cập nhật
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="tableRow">
                                    <td className="table-item col-right">3</td>
                                    <td className="">Kết quả đạt được</td>
                                    <td className="table-item">
                                        <button className="btn btn-info">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Xem
                                            </Link>
                                        </button>
                                        <button className="btn btn-info mx-2">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Thêm
                                            </Link>
                                        </button>
                                        <button className="btn btn-warning">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Cập nhật
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="tableRow">
                                    <td className="table-item col-right">4</td>
                                    <td className="">Ngày bắt đầu</td>
                                    <td className="table-item">
                                        <button className="btn btn-info">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Xem
                                            </Link>
                                        </button>
                                        <button className="btn btn-info mx-2">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Thêm
                                            </Link>
                                        </button>
                                        <button className="btn btn-warning">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Cập nhật
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="tableRow">
                                    <td className="table-item col-right">5</td>
                                    <td className="">Lịch học</td>
                                    <td className="table-item">
                                        <button className="btn btn-info ">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Xem
                                            </Link>
                                        </button>
                                        <button className="btn btn-info mx-2">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Thêm
                                            </Link>
                                        </button>
                                        <button className="btn btn-warning">
                                            <Link to={`/dshocvien/${maLopHoc}`} className="navlink linkStyle">
                                                Cập nhật
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>

            {/* <ModalUpdateLopHoc
                show={showModalUpdateLopHoc}
                handleClose={() => setshowModalUpdateLopHoc(false)}
                selectedLH={selectedLH}
                onUpdate={fetchDSLopHoc}
            />

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                className="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xoá lớp học này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
};



export default LopHoc;