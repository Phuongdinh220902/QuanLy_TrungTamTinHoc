import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {
    layLichThi, deleteLichThi
} from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import ModalUpdate from "./ChinhSuaLichThi";
import ModalThemLT from "./ThemLichThi";

import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const LichThi = (props) => {
    const [DSLichThi, setListLichThi] = useState([]);
    const { maLichThi } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectID, setselectID] = useState(null);
    const [selectedLT, setselectedLT] = useState(null);
    const [showModalUpdate, setshowModalUpdate] = useState(false);
    const [showModal1, setShowModal1] = useState(false);

    let [tukhoa, setTuKhoa] = useState("")

    const handleOpenModalUpdate = (LT) => {
        setselectedLT(LT);
        setshowModalUpdate(true);
    };

    const [showModalCreateKH, setShowModalCreateKH] = useState(false);

    const handleShowModalCreateCT = () => {
        setShowModalCreateKH(true);
    };

    const navigate = useNavigate();

    const handleCloseModalLT = () => {
        setShowModalCreateKH(false);
    };

    const handleDelete = async () => {
        try {
            await deleteLichThi(selectID);
            console.log(maLichThi)
            setShowModal(false);
            toast.success("Xoá lịch thi thành công");

            fetchDSLichThi();
            console.log("Xoá lịch thi thành công!");
        } catch (error) {
            toast.error("Lỗi khi xoá lịch thi")
            console.error("Lỗi khi xóa lịch thi:", error);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const changePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            // Chỉ tăng currentPage nếu không phải là trang cuối cùng
            setCurrentPage(currentPage + 1);
        }
    };

    // Hàm xử lý khi nhấn nút sang trái
    const handlePrevPage = () => {
        if (currentPage > 1) {
            // Chỉ giảm currentPage nếu không phải là trang đầu tiên
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        fetchDSLichThi();
    }, [currentPage, tukhoa]);


    const fetchDSLichThi = async () => {
        try {
            let tukhoa_ = localStorage.getItem("tukhoa")
            let res = await layLichThi(currentPage, tukhoa_);
            console.log(res);

            if (res.status === 200) {
                setListLichThi(res.data.dataCD);
                setTotalPages(res.data.totalPages);
            } else {
                // Xử lý trường hợp lỗi
                console.error("Lỗi khi gọi API:", res.statusText);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error.message);
        }
    };

    const handleSearch = async () => {
        if (tukhoa == "" || !tukhoa) {
            tukhoa = "null"
        }
        localStorage.setItem("tukhoa", tukhoa)
        await fetchDSLichThi();
    };

    // sfjsdf
    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const [selectedmaLichThi, setSelectedmaLichThi] = useState(null);

    const handleAddDetails = (maLichThi) => {
        setSelectedmaLichThi(maLichThi);
        setShowModal1(true);
    };


    const handleChangeStatus = async (maLichThi, currentStatus) => {
        const newStatus = currentStatus === 0 ? 1 : 0; // Chuyển đổi giữa 0 và 1
        try {
            await axios.post(`http://localhost:2209/api/v1/updateTrangThaiLichThi/${maLichThi}`, { batdau: newStatus });
            const updatedDSLichThi = DSLichThi.map(item => {
                if (item.maLichThi === maLichThi) {
                    return { ...item, batdau: newStatus };
                }
                return item;
            });
            toast.success('Cập nhật trạng thái thành công');
            setListLichThi(updatedDSLichThi);

            fetchDSLichThi();
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
        }
    };





    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Danh Sách Lịch Thi</h2>

                <div className="search">
                    <div className="searchHV">
                        <div className="">
                            <div className="searchHV-input">
                                <input
                                    placeholder="Nhập giá trị tìm kiếm"
                                    type="text"
                                    value={tukhoa}
                                    onChange={(e) => setTuKhoa(e.target.value)}
                                />
                            </div>
                            <button className="formatButton" onClick={handleSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm
                            </button>
                            <button className="formatButton addButton" onClick={handleShowModalCreateCT}>
                                Thêm
                            </button>


                        </div>
                    </div>
                </div>

                <div className="listDV">
                    <div className="table-container1">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="table-item ">STT</th>
                                    <th className="table-item ">Ngày thi</th>
                                    <th className="table-item ">Ngày hết hạn</th>
                                    <th className="table-item ">Lệ phí</th>
                                    <th className="table-item ">Trạng thái</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {DSLichThi &&
                                    DSLichThi.length > 0 &&
                                    DSLichThi.map((item, index) => {
                                        return (
                                            <tr key={`table-${index}`} className="tableRow">
                                                <td className="table-item col-right">{index + 1}</td>
                                                <td className="col-center">{item.ngaythi}</td>
                                                <td className="col-center">{item.ngayhethan}</td>
                                                <td className="col-right">{formatCurrency(item.hocphi)}đ</td>
                                                <td className="col-center">
                                                    {/* Nếu trạng thái là "Đang mở" */}
                                                    {item.batdau === 1 ? (
                                                        <button className="btn btn-success" onClick={() => handleChangeStatus(item.maLichThi, item.batdau)}>
                                                            Đang mở
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-danger" onClick={() => handleChangeStatus(item.maLichThi, item.batdau)}>
                                                            Đã đóng
                                                        </button>
                                                    )}

                                                </td>
                                                <td className="table-item">
                                                    <button className="btn btn-info mx-2">
                                                        <Link to={`/cathi/${item.maLichThi}`} className="navlink linkStyle">
                                                            Xem ca thi
                                                        </Link>
                                                    </button>

                                                    <button className="btn btn-warning" onClick={() => handleOpenModalUpdate(item)}>
                                                        Cập nhật
                                                    </button>
                                                    <button className="btn btn-danger mx-2" onClick={() => { setselectID(item.maLichThi); setShowModal(true) }}
                                                    >Xoá</button>

                                                </td>

                                            </tr>
                                        );
                                    })}
                                {DSLichThi && DSLichThi.length === 0 && (
                                    <tr className="tablenone">
                                        <td className="tablenone">Không có lịch thi nào!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="pagination">
                            <button className="btn-footer" onClick={handlePrevPage}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <div className="footer" key={index}>
                                    <button
                                        className={`btn-footer ${currentPage === index + 1 ? "active" : ""
                                            }`}
                                        onClick={() => changePage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </div>
                            ))}

                            <button className="btn-footer" onClick={handleNextPage}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </div>
                </div>
                <ModalUpdate
                    show={showModalUpdate}
                    handleClose={() => setshowModalUpdate(false)}
                    selectedLT={selectedLT}
                    onUpdate={fetchDSLichThi}
                />

                <ModalThemLT
                    show={showModalCreateKH}
                    handleCloseModalLT={handleCloseModalLT}
                    onUpdate={fetchDSLichThi}
                />

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
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                className="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xoá lịch thi này không?
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

export default LichThi;