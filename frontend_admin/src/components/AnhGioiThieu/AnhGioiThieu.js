import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
    layHinhAnhGioiThieu
} from "../../services/apiService";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalUpdateHAQC from "./ModalUpdateHAQC";
import ModalDelete from "./ModalDeleteHAQC";
import ModalCreateHAQC from "./ModalCreateHAQC";



const HinhAnh = (props) => {
    const [DSHinhAnh, setListHinhAnh] = useState([]);
    const [showModalUpdateHAQC, setShowModalUpdateHAQC] = useState(false);
    const [selectedHinhAnh, setSelectedHinhAnh] = useState(null);
    const [deleteHinhAnhId, setDeleteHinhAnhId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [showModalCreateHAQC, setShowModalCreateHAQC] = useState(false);

    const handleShowModalCreateHAQC = () => {
        setShowModalCreateHAQC(true);
    };

    const handleCloseModalHAQC = () => {
        setShowModalCreateHAQC(false);
    };

    const handleDelete = (maHinhAnhQC) => {
        setDeleteHinhAnhId(maHinhAnhQC);
    };

    const handleOpenModalUpdate = (HinhAnh) => {
        setSelectedHinhAnh(HinhAnh);
        setShowModalUpdateHAQC(true);
    };


    const handleConfirmDelete = async () => {
        try {
            console.log(deleteHinhAnhId)

            await axios.post(`http://localhost:2209/api/v1/deleteHAQC/${deleteHinhAnhId}`);
            toast.success("Xoá hình ảnh thành công");
            setDeleteHinhAnhId(null);
            fetchDSHinhAnh();
        } catch (error) {
            console.error("Lỗi khi gọi API xoá giảng viên:", error.message);
            toast.error("Đã xảy ra lỗi khi xoá giảng viên");
        }
    };


    useEffect(() => {
        fetchDSHinhAnh();
    }, [currentPage]);

    const fetchDSHinhAnh = async () => {
        try {
            let res = await layHinhAnhGioiThieu();
            console.log(res);

            if (res.status === 200) {
                setListHinhAnh(res.data.dataCD);
                setTotalPages(res.data.totalPages);
            } else {
                // Xử lý trường hợp lỗi
                console.error("Lỗi khi gọi API:", res.statusText);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error.message);
        }
    };

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

    return (
        <>
            <div className="container app__content">
                <h2 className="text-center">Danh Sách Hình Ảnh Quảng Cáo</h2>

                <div className="search">
                    <div className="searchHV">
                        <div className="">
                            <button className="formatButton addButton" onClick={handleShowModalCreateHAQC}>
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>

                <div className="listDV">
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="table-item-stt">STT</th>
                                    <th className="table-item-image">Ảnh</th>
                                    <th className="table-item-action"> </th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {DSHinhAnh &&
                                    DSHinhAnh.length > 0 &&
                                    DSHinhAnh.map((item, index) => {
                                        return (
                                            <tr key={`table-hinhanhquangcao-${index}`} className="tableRow">
                                                <td className="col-center table-item-stt">{index + 1}</td>
                                                <td className="col-center table-item-image">
                                                    <img
                                                        className="anhquangcao"
                                                        src={`http://localhost:2209/images/${item.tenHinhAnhQC}`}
                                                        alt=""
                                                    />
                                                </td>
                                                <td className="table-item-action">
                                                    <button className="btn btn-warning mx-2" onClick={() => handleOpenModalUpdate(item)}>
                                                        Cập nhật
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(item.maHinhAnhQC)}>
                                                        Xoá
                                                    </button>
                                                </td>
                                            </tr>

                                        );
                                    })}
                                {DSHinhAnh && DSHinhAnh.length === 0 && (
                                    <tr className="tablenone">
                                        <td className="tablenone">Không có hình ảnh nào!</td>
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
                <ModalUpdateHAQC
                    show={showModalUpdateHAQC}
                    handleClose={() => setShowModalUpdateHAQC(false)}
                    selectedHinhAnh={selectedHinhAnh}
                    onUpdate={fetchDSHinhAnh}
                />

                <ModalCreateHAQC
                    show={showModalCreateHAQC}
                    handleCloseModalHAQC={handleCloseModalHAQC}
                    onUpdate={fetchDSHinhAnh}
                />

                <ModalDelete
                    show={deleteHinhAnhId !== null}
                    handleClose={() => setDeleteHinhAnhId(null)}
                    handleConfirmDelete={handleConfirmDelete}
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
        </>
    );
};

export default HinhAnh;