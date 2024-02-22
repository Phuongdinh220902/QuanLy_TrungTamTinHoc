
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import * as XLSX from "xlsx";
import { format } from "date-fns";
import {
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
    laydshv, deleteHV
} from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from 'react-toastify';
import ModalUpdateUser from "./ModalUpdateUser";
import ModalCreateUser from "./ModalCreateUser";


const User = (props) => {
    const [DSHocVien, setListHocVien] = useState([]);
    const { maHV } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectID, setselectID] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const handleShowModalCreate = () => {
        setShowModalCreateUser(true);
    };

    const handleCloseModal = () => {
        setShowModalCreateUser(false);
    };

    let [tukhoa, setTuKhoa] = useState("")

    const handleOpenModalUpdate = (user) => {
        setSelectedUser(user);
        setShowModalUpdateUser(true);
    };

    const handleDelete = async () => {
        try {
            await deleteHV(selectID);
            console.log(maHV)
            setShowModal(false);
            fetchDSHocVien();

            console.log("Xoá học viên thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa học viên:", error);
        }
    };

    useEffect(() => {
        fetchDSHocVien();
    }, [currentPage, tukhoa]);


    const fetchDSHocVien = async () => {
        try {

            let tukhoa_ = localStorage.getItem("tukhoa")
            let res = await laydshv(currentPage, tukhoa_);

            if (res.status === 200) {
                setListHocVien(res.data.dataCD);
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

    const handleSearch = async () => {
        if (tukhoa === "" || !tukhoa) {
            tukhoa = "null"
        }
        localStorage.setItem("tukhoa", tukhoa)
        await fetchDSHocVien();
    };

    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };


    /* Tải file */
    // const fileInputRef = useRef(null);

    // const handleButtonClick = () => {
    //     // Kích hoạt sự kiện click của thẻ input để mở hộp thoại chọn file
    //     fileInputRef.current.click();
    // };

    // const handleFileChange = async (event) => {

    //     try {
    //         const selectedFile = event.target.files[0];
    //         console.log("Selected File:", selectedFile);

    //         const formData = new FormData();
    //         formData.append("IDLop", IDLop)
    //         formData.append("file", selectedFile);

    //         // let res = await ThemDanhSachDoanVien(formData);
    //         console.log(formData)
    //         let res = await axios.post(
    //             "http://localhost:8080/api/ThemDoanVienExcel",
    //             formData
    //         );

    //         if (res.status === 200) {
    //             // Thêm thành công
    //             setSuccessMessage("Thêm thành công!");
    //             setShowModal(true);
    //             // Fetch updated data after successful addition
    //             fetchDSDoanVien();
    //         } else {
    //             // Xử lý trường hợp lỗi
    //             setErrorMessage("Thêm không thành công!");
    //             setShowModal(true);
    //         }
    //     } catch (error) {
    //         // Xử lý lỗi nếu có
    //         console.error("Lỗi khi tải file:", error.message);
    //         setErrorMessage("Lỗi khi tải file!");
    //         setShowModal(true);
    //     }
    // };

    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Danh Sách Học Viên</h2>
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
                            <button className="formatButton addButton" onClick={handleShowModalCreate}>
                                Thêm
                            </button>
                            {/* <Them /> */}
                        </div>
                    </div>

                </div>

                <div className="listDV">
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="table-item ">STT</th>
                                    <th className="table-item">Tên học viên</th>
                                    <th className="table-item ">Ngày sinh</th>
                                    <th className="table-item ">Giới tính</th>
                                    <th className="table-item ">Nơi sinh</th>
                                    <th className="table-item ">Email</th>
                                    <th className="table-item ">Số điện thoại</th>
                                    <th className="table-item ">Học phí</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {DSHocVien &&
                                    DSHocVien.length > 0 &&
                                    DSHocVien.map((item, index) => {
                                        return (
                                            <tr key={`table-doanvien-${index}`} className="tableRow">
                                                <td className="table-item col-right">{index + 1}</td>
                                                <td className="">{item.tenHV}</td>
                                                <td className="table-item">
                                                    {format(new Date(item.ngaysinh), "dd/MM/yyyy")}
                                                </td>
                                                <td className="">
                                                    {item.gioitinh === 0
                                                        ? "Nữ"
                                                        : item.gioitinh === 1
                                                            ? "Nam"
                                                            : "Khác"}
                                                </td>
                                                <td className="">{item.noisinh}</td>
                                                <td className="">{item.email}</td>
                                                <td className="">{item.sdt}</td>
                                                <td className="col-right">{formatCurrency(item.hocphi ? item.hocphi : 0)}</td>


                                                <td className="table-item">
                                                    <button className="btn btn-warning mx-2"
                                                        onClick={() => handleOpenModalUpdate(item)}>
                                                        Cập nhật
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => { setselectID(item.maHV); setShowModal(true) }}
                                                    >Xoá</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                {DSHocVien && DSHocVien.length === 0 && (
                                    <tr className="tablenone">
                                        <td className="tablenone">Không có đoàn viên nào!</td>
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
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    handleClose={() => setShowModalUpdateUser(false)}
                    selectedUser={selectedUser}
                    onUpdate={fetchDSHocVien}
                />

                <ModalCreateUser
                    show={showModalCreateUser}
                    handleCloseModal={handleCloseModal}
                    onUpdate={fetchDSHocVien}
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
                    Bạn có chắc chắn muốn xoá học viên này không?
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

export default User;