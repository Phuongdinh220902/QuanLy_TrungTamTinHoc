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
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import ModalUpdateLopHoc from "./ModalUpdateLopHoc";
import { Link } from "react-router-dom";
import ModalCreateLH from "./ModalCreateLopHoc";
import axios from "axios";

const LopHoc = (props) => {
    const [DSLopHoc, setListLopHoc] = useState([]);
    const { maKH } = useParams();
    const { maLopHoc } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectedLH, setselectedLH] = useState(null);
    const [showModalUpdateLopHoc, setshowModalUpdateLopHoc] = useState(false);
    const [selectID, setselectID] = useState(null);

    let [tukhoa, setTuKhoa] = useState("")

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchDSLopHoc();
    }, [currentPage, tukhoa]);


    const handleOpenModalUpdate = (lh) => {
        try {
            setselectedLH(lh);
            setshowModalUpdateLopHoc(true);
        }
        catch (err) {
            console.log(err)
        }

    };

    const handleDelete = async () => {
        try {
            await deleteLH(selectID);
            console.log(maLopHoc)
            setShowModal(false);
            toast.success("Xoá lớp học thành công");

            fetchDSLopHoc();
            console.log("Xoá lớp học thành công!");
        } catch (error) {
            toast.error("Lỗi khi xoá lớp học")
            console.error("Lỗi khi xóa lớp học:", error);
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

    const fetchDSLopHoc = async () => {
        try {
            let tukhoa_ = localStorage.getItem("tukhoa")
            let res = await laydsLopHoc(maKH, currentPage, tukhoa_);
            console.log(res);

            if (res.status === 200) {
                setListLopHoc(res.data.dataCD);
                const newCheckboxStates = res.data.dataCD.map((item) => item.hoan_thanh === 1);
                setCheckboxStates(newCheckboxStates);
                setNewState(newCheckboxStates);
            } else {
                console.error("Lỗi khi gọi API:", res.statusText);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error.message);
        }
    };
    const handleSearch = async () => {
        if (tukhoa === "" || !tukhoa) {
            tukhoa = "null"
        }
        localStorage.setItem("tukhoa", tukhoa)
        await fetchDSLopHoc();
    };
    const [showModalCreateLH, setShowModalCreateLH] = useState(false);

    const handleShowModalCreateLH = () => {
        setShowModalCreateLH(true);
    };
    const handleCloseModalLH = () => {
        setShowModalCreateLH(false);
    };

    const [checkboxStates, setCheckboxStates] = useState([]);

    const [newState, setNewState] = useState([]);

    useEffect(() => {
        if (DSLopHoc.length > 0) {
            const initialCheckboxStates = DSLopHoc.map((item) => item.hoan_thanh === 1);
            setCheckboxStates(initialCheckboxStates);
            setNewState(initialCheckboxStates); // Khởi tạo trạng thái mới ban đầu
        }
    }, [DSLopHoc]);


    const handleCheckboxChange = async (maDSHV, isChecked, index) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);

        const newNewState = [...newState];
        newNewState[index] = !newNewState[index]; // Cập nhật trạng thái mới
        setNewState(newNewState);

        const dataToSave = DSLopHoc.map((item, index) => ({
            maLopHoc: item.maLopHoc, // Replace with the actual property name
            isChecked: newNewState[index],
        }));

        try {
            const response = await axios.post('http://localhost:2209/api/v1/SaveCheckboxStatesLopHoc', {
                maLopHoc: maLopHoc,
                isChecked: dataToSave,
            });

            if (response.status === 200) {
                toast.success('Cập nhật trạng thái thành công')
            } else {
                toast.error('Cập nhật trạng thái thất bại')
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu API:', error);
        }
    };

    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Danh Sách Lớp Học</h2>

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
                            <button className="formatButton addButton" onClick={handleShowModalCreateLH}>
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
                                    <th className="table-item">STT</th>
                                    <th className="table-item ">Tên lớp học</th>
                                    <th className="table-item ">Tên giảng viên</th>
                                    <th className="table-item ">Ngày bắt đầu</th>
                                    <th className="table-item ">Lịch học</th>
                                    <th className="table-item ">Đã hoàn thành</th>
                                    <th className="table-item ">  </th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {DSLopHoc &&
                                    DSLopHoc.length > 0 &&
                                    DSLopHoc.map((item, index) => {
                                        return (
                                            <tr key={`table-doanvien-${index}`} className="tableRow">
                                                <td className="table-item col-right">{index + 1}</td>
                                                <td className="">{item.tenLopHoc}</td>
                                                <td className="">{item.tenGV}</td>
                                                <td className="table-item">{item.ngay_batdau}
                                                </td>
                                                <td className="">{item.thoigian}</td>
                                                <td className="col-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={checkboxStates[index]}
                                                        onChange={() => handleCheckboxChange(item.maLopHoc, checkboxStates[index], index)}
                                                    />
                                                </td>

                                                <td className="table-item">
                                                    <button className="btn btn-info">
                                                        <Link to={`/dshocvien/${item.maLopHoc}`} className="navlink linkStyle">
                                                            Xem
                                                        </Link>
                                                    </button>

                                                    <button className="btn btn-warning mx-2" onClick={() => handleOpenModalUpdate(item)}>
                                                        Cập nhật
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => { setselectID(item.maLopHoc); setShowModal(true) }}
                                                    >Xoá</button>

                                                </td>
                                            </tr>
                                        );
                                    })}
                                {DSLopHoc && DSLopHoc.length === 0 && (
                                    <tr className="tablenone">
                                        <td className="tablenone">Không có lớp học nào!</td>
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

            <ModalUpdateLopHoc
                show={showModalUpdateLopHoc}
                handleClose={() => setshowModalUpdateLopHoc(false)}
                selectedLH={selectedLH}
                onUpdate={fetchDSLopHoc}
            />

            <ModalCreateLH
                show={showModalCreateLH}
                handleCloseModalLH={handleCloseModalLH}
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
            </Modal>
        </>
    );
};




export default LopHoc;