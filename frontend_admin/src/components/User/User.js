
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import * as XLSX from "xlsx";
import { format } from "date-fns";
import {
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass,
    // faDownload,
} from "@fortawesome/free-solid-svg-icons";
import {
    laydshv, deleteHV
} from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from 'react-toastify';
import ModalUpdateUser from "./ModalUpdateUser";
import ModalCreateUser from "./ModalCreateUser";

// function Them() {
//     const [show, setShow] = useState(false);
//     const [tenHV, setTen] = useState('');
//     const [email, setEmail] = useState('');
//     const [sdt, setSdt] = useState('');
//     const [ngaysinh, setNgaysinh] = useState('');
//     const [noisinh, setNoisinh] = useState('');
//     const [gioitinh, setGioitinh] = useState('Nữ');

//     const handleClose = () => {
//         setShow(false)
//         setTen("");
//         setEmail("");
//         setSdt("");
//         setNgaysinh("");
//         setGioitinh("Nam");
//         setNoisinh("");
//     }
//     const handleShow = () => setShow(true);

//     const validateEmail = (email) => {
//         return String(email)
//             .toLowerCase()
//             .match(
//                 /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//             );
//     };

//     const validatePhoneNumber = (sdt) => {
//         return String(sdt).match(/^0[0-9]{9}$/);
//     };


//     const handleInputChange = (e) => {
//         const inputValue = e.target.value;
//         setSdt(inputValue);
//         validatePhoneNumber(inputValue);
//     };


//     const handleSave = async () => {
//         const isValidEmail = validateEmail(email);
//         const isValidPhone = validatePhoneNumber(sdt);

//         if (!isValidEmail) {
//             toast.error('Email không hợp lệ');
//             return;
//         }
//         if (!isValidPhone) {
//             toast.error('Số điện thoại không hợp lệ');
//             return;
//         }
//         try {
//             const formData = new FormData();
//             formData.append('tenHV', tenHV);
//             formData.append('email', email);
//             formData.append('sdt', sdt);
//             formData.append('ngaysinh', ngaysinh);

//             // Ánh xạ giới tính từ frontend sang backend
//             const gioitinhValue = gioitinh === 'Nam' ? 1 : 0;
//             formData.append('gioitinh', gioitinhValue);
//             formData.append('noisinh', noisinh);
//             for (const value of formData.values()) {
//                 console.log(value);
//             }

//             let mdata = {
//                 tenHV: tenHV,
//                 email: email,
//                 sdt: sdt,
//                 ngaysinh: ngaysinh,
//                 gioitinh: gioitinhValue,
//                 noisinh: noisinh
//             }
//             console.log(mdata)
//             await axios.post('http://localhost:2209/api/v1/themHV', mdata, {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//             });


//             toast.success('Thêm thành công');
//             fetchDSHocVien();
//             handleClose();
//         }
//         catch (error) {
//             console.error("Lỗi khi gọi API xoá giảng viên:", error.message);
//             toast.error("Đã xảy ra lỗi khi xoá giảng viên");
//         }
//     }
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [DSHocVien, setListHocVien] = useState([]);

//     const fetchDSHocVien = async () => {
//         try {

//             let tukhoa_ = localStorage.getItem("tukhoa")
//             let res = await laydshv(currentPage, tukhoa_);

//             if (res.status === 200) {
//                 setListHocVien(res.data.dataCD);
//                 setTotalPages(res.data.totalPages);
//             } else {
//                 // Xử lý trường hợp lỗi
//                 console.error("Lỗi khi gọi API:", res.statusText);
//             }
//         } catch (error) {
//             console.error("Lỗi khi gọi API:", error.message);
//         }
//     };

//     return (
//         <>
//             <Button variant="primary" onClick={handleShow} className="btn-lg bt-create">
//                 <FontAwesomeIcon icon={faUserPlus} /> Thêm
//             </Button>

//             <Modal show={show} onHide={handleClose}
//                 size="xl"
//                 backdrop='static'
//                 className="modal-add">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Thêm mới học viên</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form className="row g-3">
//                         <div className="col-12">
//                             <label className="form-label">Tên Học Viên</label>
//                             <input type="text" className="form-control" value={tenHV}
//                                 onChange={(event) => setTen(event.target.value)} />
//                         </div>
//                         <div className="col-12">
//                             <label className="form-label">Email</label>
//                             <input type="email" className="form-control" value={email}
//                                 onChange={(event) => setEmail(event.target.value)} />
//                         </div>
//                         <div className="col-12">
//                             <label className="form-label">Số điện thoại</label>
//                             <input type="text" className="form-control" value={sdt}
//                                 onChange={(event) => setSdt(event.target.value)} />
//                         </div>
//                         <div className="col-12">
//                             <label className="form-label">Ngày sinh</label>
//                             <input type="date" className="form-control" value={ngaysinh}
//                                 onChange={(event) => setNgaysinh(event.target.value)} />
//                         </div>
//                         <div className="col-12">
//                             <label className="form-label">Nơi sinh</label>
//                             <input type="text" className="form-control" value={noisinh}
//                                 onChange={(event) => setNoisinh(event.target.value)} />
//                         </div>
//                         <div className="col-md-4">
//                             <label className="form-label">Giới Tính</label>
//                             <select className="form-select"
//                                 onChange={(event) => setGioitinh(event.target.value)}>
//                                 <option value="Nam">Nam</option>
//                                 <option value="Nữ">Nữ</option>
//                             </select>
//                         </div>

//                     </form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Đóng
//                     </Button>
//                     <Button variant="primary" onClick={() => handleSave()}>
//                         Lưu
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }


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
                                                <td className="">{item.hocphi ? item.hocphi : 0}</td>


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