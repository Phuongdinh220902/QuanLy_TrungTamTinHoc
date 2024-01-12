import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import * as XLSX from "xlsx";
import { format } from "date-fns";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    faPenToSquare,
    faFileImport,
    faUserPlus,
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
    laydsgv
} from "../../services/apiService";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalUpdateGV from "./ModalUpdate";
import ModalDelete from "./ModalDelete";

function Example() {
    const [show, setShow] = useState(false);
    const [tenGV, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');

    const [gioitinh, setGioitinh] = useState('Nữ');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const handleClose = () => {
        setShow(false)
        setTen("");
        setEmail("");
        setSdt("");
        setNgaysinh("");
        setGioitinh("Nam");
        setImage("");
        setPreviewImage("");
    }
    const handleShow = () => setShow(true);

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSave = async () => {
        const isValidEmail = validateEmail(email);

        if (!isValidEmail) {
            // alert('Email sai')
            toast.error('Email không hợp lệ');
            return;
        }
        const formData = new FormData();
        formData.append('tenGV', tenGV);
        formData.append('email', email);
        formData.append('sdt', sdt);
        formData.append('ngaysinh', ngaysinh);
        // Ánh xạ giới tính từ frontend sang backend
        const gioitinhValue = gioitinh === 'Nam' ? 1 : 0;
        formData.append('gioitinh', gioitinhValue);

        // formData.append('file', image);
        formData.append('file', image, image.name);
        let res = await axios.post('http://localhost:2209/api/v1/themgv', formData);
        console.log("check", res.data)
        if (res.data && res.data.EC === 0) {
            toast.success(res.data.EM);
            handleClose();
        }

        if (res.data && res.data.EC !== 0) {
            toast.error(res.data.EM);
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="btn-lg bt-create">
                <FontAwesomeIcon icon={faUserPlus} /> Thêm
            </Button>

            {/* <Button variant="primary" onClick={handleShow} className="btn-lg bt-sreach">
                <FontAwesomeIcon icon={faUserPlus} /> Tìm
            </Button> */}

            <Modal show={show} onHide={handleClose}
                size="xl"
                backdrop='static'
                className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới giảng viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên Giảng Viên</label>
                            <input type="text" className="form-control" value={tenGV}
                                onChange={(event) => setTen(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email}
                                onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Số điện thoại</label>
                            <input type="text" className="form-control" value={sdt}
                                onChange={(event) => setSdt(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Ngày sinh</label>
                            <input type="date" className="form-control" value={ngaysinh}
                                onChange={(event) => setNgaysinh(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Giới Tính</label>
                            <select className="form-select"
                                onChange={(event) => setGioitinh(event.target.value)}>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
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




const GiangVien = (props) => {
    const [DSGiangVien, setListGiangVien] = useState([]);
    const [showModalUpdateGV, setShowModalUpdateGV] = useState(false);
    const [selectedGiangVien, setSelectedGiangVien] = useState(null);
    const [deleteGiangVienId, setDeleteGiangVienId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    let [tukhoa, setTuKhoa] = useState("")

    const handleDelete = (maGV) => {
        setDeleteGiangVienId(maGV);
    };

    const handleOpenModalUpdate = (giangVien) => {
        setSelectedGiangVien(giangVien);
        setShowModalUpdateGV(true);
    };


    const handleConfirmDelete = async () => {
        try {
            console.log(deleteGiangVienId)

            await axios.post(`http://localhost:2209/api/v1/deleteGV/${deleteGiangVienId}`);
            toast.success("Xoá giảng viên thành công");
            setDeleteGiangVienId(null);
            fetchDSGiangVien();
        } catch (error) {
            console.error("Lỗi khi gọi API xoá giảng viên:", error.message);
            toast.error("Đã xảy ra lỗi khi xoá giảng viên");
        }
    };


    useEffect(() => {
        fetchDSGiangVien();
    }, [currentPage, tukhoa]);

    const fetchDSGiangVien = async () => {
        try {
            let tukhoa_ = localStorage.getItem("tukhoa")
            let res = await laydsgv(currentPage, tukhoa_);
            console.log(res);

            if (res.status === 200) {
                setListGiangVien(res.data.dataCD);
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

    // const exportToExcel = () => {
    //     // Tạo một mảng chứa dữ liệu bạn muốn xuất
    //     const dataToExport = DSDoanVien.map((item) => {
    //         return {
    //             "Mã Chi Đoàn": item.MaLop,
    //             "Tên Chi Đoàn": item.TenLop,
    //             Khóa: item.Khoa,
    //             MSSV: item.MSSV,
    //             HoTen: item.HoTen,
    //             Email: item.Email,
    //             SoDT: item.SoDT,
    //             GioiTinh:
    //                 item.GioiTinh === 0 ? "Nữ" : item.GioiTinh === 1 ? "Nam" : "Khác",
    //             QueQuan: item.QueQuan,
    //             DanToc: item.TenDanToc,
    //             TonGiao: item.TenTonGiao,
    //             NgaySinh: format(new Date(item.NgaySinh), "dd/MM/yyyy"),
    //             NgayVaoDoan: format(new Date(item.NgayVaoDoan), "dd/MM/yyyy"),
    //             "Trạng thái": item.ttLop === 1 ? "Đang hoạt động" : "Đã tốt nghiệp",
    //         };
    //     });

    //     // Tạo một đối tượng Workbook từ mảng dữ liệu
    //     const ws = XLSX.utils.json_to_sheet(dataToExport);
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, "DanhSachDoanVien");

    //     // Xuất file Excel
    //     XLSX.writeFile(wb, "DanhSachDoanVien.xlsx");
    // };

    const handleSearch = async () => {
        if (tukhoa == "" || !tukhoa) {
            tukhoa = "null"
        }
        localStorage.setItem("tukhoa", tukhoa)
        await fetchDSGiangVien();
    };
    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Danh Sách Giảng Viên</h2>

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

                            <Example />
                        </div>
                    </div>
                </div>

                <div className="listDV">
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="table-item ">STT</th>
                                    <th className="table-item">Tên Giảng Viên</th>
                                    <th className="table-item">Ngày sinh</th>
                                    <th className="table-item">Giới tính</th>
                                    <th className="table-item">Email</th>
                                    <th className="table-item">Số điện thoại</th>
                                    <th className="table-item"> </th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {DSGiangVien &&
                                    DSGiangVien.length > 0 &&
                                    DSGiangVien.map((item, index) => {
                                        return (
                                            <tr key={`table-doanvien-${index}`} className="tableRow">
                                                <td className="col-center">{index + 1}</td>
                                                <td className="">{item.tenGV}</td>
                                                <td className=" col-center">
                                                    {format(new Date(item.ngaysinh), "dd/MM/yyyy")}
                                                </td>
                                                <td className="">
                                                    {item.gioitinh === 0
                                                        ? "Nữ"
                                                        : item.gioitinh === 1
                                                            ? "Nam"
                                                            : "Khác"}
                                                </td>
                                                <td className="">{item.email}</td>
                                                <td className="">{item.sdt}</td>

                                                <td className="table-item">
                                                    <button className="btn btn-warning mx-2"
                                                        onClick={() => handleOpenModalUpdate(item)}>
                                                        Cập nhật
                                                    </button>
                                                    <button className="btn btn-danger"
                                                        onClick={() => handleDelete(item.maGV)}
                                                    >Xoá</button>
                                                </td>

                                            </tr>
                                        );
                                    })}
                                {DSGiangVien && DSGiangVien.length === 0 && (
                                    <tr className="tablenone">
                                        <td className="tablenone">Không có giảng viên nào!</td>
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
                <ModalUpdateGV
                    show={showModalUpdateGV}
                    handleClose={() => setShowModalUpdateGV(false)}
                    selectedGiangVien={selectedGiangVien}
                    onUpdate={fetchDSGiangVien} // Callback to refresh the list after updating
                />
                <ModalDelete
                    show={deleteGiangVienId !== null}
                    handleClose={() => setDeleteGiangVienId(null)}
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

export default GiangVien;