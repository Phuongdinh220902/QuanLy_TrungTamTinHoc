import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
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
import ModalCreateGV from "./ModalCreateGV";



const GiangVien = (props) => {
    const [DSGiangVien, setListGiangVien] = useState([]);
    const [showModalUpdateGV, setShowModalUpdateGV] = useState(false);
    const [selectedGiangVien, setSelectedGiangVien] = useState(null);
    const [deleteGiangVienId, setDeleteGiangVienId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    let [tukhoa, setTuKhoa] = useState("")

    const [showModalCreateGV, setShowModalCreateGV] = useState(false);

    const handleShowModalCreateGV = () => {
        setShowModalCreateGV(true);
    };

    const handleCloseModalGV = () => {
        setShowModalCreateGV(false);
    };

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
                            <button className="formatButton addButton" onClick={handleShowModalCreateGV}>
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
                                    <th className="table-item ">STT</th>
                                    <th className="table-item">Tên giảng viên</th>
                                    <th className="table-item">Ngày sinh</th>
                                    <th className="table-item">Giới tính</th>
                                    <th className="table-item">Email</th>
                                    <th className="table-item">Số điện thoại</th>
                                    <th className="table-item">Ảnh</th>
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
                                                    {item.ngaysinh}
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
                                                <td className="col-center">
                                                    <img
                                                        className="anh"
                                                        src={

                                                            `http://localhost:2209/images/${item.tenHA}`
                                                        }
                                                        alt=""
                                                    />
                                                </td>
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
                    onUpdate={fetchDSGiangVien}
                />

                <ModalCreateGV
                    show={showModalCreateGV}
                    handleCloseModalGV={handleCloseModalGV}
                    onUpdate={fetchDSGiangVien}
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