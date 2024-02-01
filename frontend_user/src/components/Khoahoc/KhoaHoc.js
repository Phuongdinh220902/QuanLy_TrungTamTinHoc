import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    faPenToSquare,
    faUserPlus,
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {
    laydskh, deleteKH
} from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import ModalUpdateKH from "./ModalUpdateKH";
import ModalCreateKH from "./ModalCreateKH";
import { Link } from "react-router-dom";

// const KhoaHoc = (props) => {
//     const [DSKhoaHoc, setListKhoaHoc] = useState([]);
//     const { maKH } = useParams();
//     const [showModal, setShowModal] = useState(false);
//     const [selectID, setselectID] = useState(null);
//     const [selectedKH, setselectedKH] = useState(null);
//     const [showModalUpdateKH, setshowModalUpdateKH] = useState(false);

//     let [tukhoa, setTuKhoa] = useState("")

//     const handleOpenModalUpdate = (kh) => {
//         setselectedKH(kh);
//         setshowModalUpdateKH(true);
//     };

//     const [showModalCreateKH, setShowModalCreateKH] = useState(false);

//     const handleShowModalCreateKH = () => {
//         setShowModalCreateKH(true);
//     };

//     const handleCloseModalKH = () => {
//         setShowModalCreateKH(false);
//     };

//     const handleDelete = async () => {
//         try {
//             await deleteKH(selectID);
//             console.log(maKH)
//             setShowModal(false);
//             toast.success("Xoá khoá học thành công");

//             fetchDSKhoaHoc();
//             console.log("Xoá khoá học thành công!");
//         } catch (error) {
//             toast.error("Lỗi khi xoá khoá học")
//             console.error("Lỗi khi xóa khoá học:", error);
//         }
//     };

//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     const changePage = (newPage) => {
//         setCurrentPage(newPage);
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             // Chỉ tăng currentPage nếu không phải là trang cuối cùng
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     // Hàm xử lý khi nhấn nút sang trái
//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             // Chỉ giảm currentPage nếu không phải là trang đầu tiên
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     useEffect(() => {
//         fetchDSKhoaHoc();
//     }, [currentPage, tukhoa]);


//     const fetchDSKhoaHoc = async () => {
//         try {
//             let tukhoa_ = localStorage.getItem("tukhoa")
//             let res = await laydskh(currentPage, tukhoa_);
//             console.log(res);

//             if (res.status === 200) {
//                 setListKhoaHoc(res.data.dataCD);
//                 setListKhoaHoc(res.data.dataCD);
//             } else {
//                 // Xử lý trường hợp lỗi
//                 console.error("Lỗi khi gọi API:", res.statusText);
//             }
//         } catch (error) {
//             console.error("Lỗi khi gọi API:", error.message);
//         }
//     };

//     const handleSearch = async () => {
//         if (tukhoa == "" || !tukhoa) {
//             tukhoa = "null"
//         }
//         localStorage.setItem("tukhoa", tukhoa)
//         await fetchDSKhoaHoc();
//     };
//     const formatCurrency = (value) => {
//         return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//     };


//     // const exportToExcel = () => {
//     //     // Tạo một mảng chứa dữ liệu bạn muốn xuất
//     //     const dataToExport = DSDoanVien.map((item) => {
//     //         return {
//     //             "Mã Chi Đoàn": item.MaLop,
//     //             "Tên Chi Đoàn": item.TenLop,
//     //             Khóa: item.Khoa,
//     //             MSSV: item.MSSV,
//     //             HoTen: item.HoTen,
//     //             hocphi: item.hocphi,
//     //             SoDT: item.SoDT,
//     //             GioiTinh:
//     //                 item.GioiTinh === 0 ? "Nữ" : item.GioiTinh === 1 ? "Nam" : "Khác",
//     //             QueQuan: item.QueQuan,
//     //             DanToc: item.TenDanToc,
//     //             TonGiao: item.TenTonGiao,
//     //             monhoc: format(new Date(item.monhoc), "dd/MM/yyyy"),
//     //             NgayVaoDoan: format(new Date(item.NgayVaoDoan), "dd/MM/yyyy"),
//     //             "Trạng thái": item.ttLop === 1 ? "Đang hoạt động" : "Đã tốt nghiệp",
//     //         };
//     //     });

//     //     // Tạo một đối tượng Workbook từ mảng dữ liệu
//     //     const ws = XLSX.utils.json_to_sheet(dataToExport);
//     //     const wb = XLSX.utils.book_new();
//     //     XLSX.utils.book_append_sheet(wb, ws, "DanhSachDoanVien");

//     //     // Xuất file Excel
//     //     XLSX.writeFile(wb, "DanhSachDoanVien.xlsx");
//     // };

//     return (
//         <>
//             <div className="container-fluid app__content">
//                 <h2 className="text-center">Danh Sách Khoá Học</h2>

//                 <div className="search">
//                     <div className="searchHV">
//                         <div className="">
//                             <div className="searchHV-input">
//                                 <input
//                                     placeholder="Nhập giá trị tìm kiếm"
//                                     type="text"
//                                     value={tukhoa}
//                                     onChange={(e) => setTuKhoa(e.target.value)}
//                                 />
//                             </div>
//                             <button className="formatButton" onClick={handleSearch}>
//                                 <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm
//                             </button>
//                             <button className="formatButton addButton" onClick={handleShowModalCreateKH}>
//                                 Thêm
//                             </button>

//                         </div>
//                     </div>
//                 </div>

//                 <div className="listDV">
//                     <div className="table-container">
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th className="table-item ">STT</th>
//                                     <th className="table-item ">Tên khoá học</th>
//                                     <th className="table-item ">Học phí</th>
//                                     <th className="table-item ">Môn học</th>
//                                     <th className="table-item ">Số giờ</th>
//                                     <th> </th>
//                                 </tr>
//                             </thead>
//                             <tbody id="myTable">
//                                 {DSKhoaHoc &&
//                                     DSKhoaHoc.length > 0 &&
//                                     DSKhoaHoc.map((item, index) => {
//                                         return (
//                                             <tr key={`table-doanvien-${index}`} className="tableRow">
//                                                 <td className="table-item col-right">{index + 1}</td>
//                                                 <td className="">{item.tenKH}</td>
//                                                 {/* <td className="col-right">{item.hocphi ? item.hocphi : 0}</td> */}
//                                                 <td className="col-right">{formatCurrency(item.hocphi ? item.hocphi : 0)}</td>
//                                                 <td className="">{item.monhoc}</td>
//                                                 <td className="">{item.so_gio}</td>


//                                                 <td className="table-item">
//                                                     <button className="btn btn-info">
//                                                         <Link to={`/lophoc/${item.maKH}`} className="navlink linkStyle">
//                                                             Xem
//                                                         </Link>
//                                                     </button>
//                                                     <button className="btn btn-warning mx-2" onClick={() => handleOpenModalUpdate(item)}>
//                                                         Cập nhật
//                                                     </button>
//                                                     <button className="btn btn-danger " onClick={() => { setselectID(item.maKH); setShowModal(true) }}
//                                                     >Xoá</button>
//                                                 </td>

//                                             </tr>
//                                         );
//                                     })}
//                                 {DSKhoaHoc && DSKhoaHoc.length === 0 && (
//                                     <tr className="tablenone">
//                                         <td className="tablenone">Không có khoá học nào!</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>

//                         <div className="pagination">
//                             <button className="btn-footer" onClick={handlePrevPage}>
//                                 <FontAwesomeIcon icon={faChevronLeft} />
//                             </button>

//                             {Array.from({ length: totalPages }, (_, index) => (
//                                 <div className="footer" key={index}>
//                                     <button
//                                         className={`btn-footer ${currentPage === index + 1 ? "active" : ""
//                                             }`}
//                                         onClick={() => changePage(index + 1)}
//                                     >
//                                         {index + 1}
//                                     </button>
//                                 </div>
//                             ))}

//                             <button className="btn-footer" onClick={handleNextPage}>
//                                 <FontAwesomeIcon icon={faChevronRight} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <ModalUpdateKH
//                     show={showModalUpdateKH}
//                     handleClose={() => setshowModalUpdateKH(false)}
//                     selectedKH={selectedKH}
//                     onUpdate={fetchDSKhoaHoc}
//                 />

//                 <ModalCreateKH
//                     show={showModalCreateKH}
//                     handleCloseModalKH={handleCloseModalKH}
//                     onUpdate={fetchDSKhoaHoc}
//                 />

//                 <ToastContainer
//                     position="top-right"
//                     autoClose={5000}
//                     hideProgressBar={false}
//                     newestOnTop={false}
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                     theme="light"
//                 />
//             </div>
//             <Modal
//                 show={showModal}
//                 onHide={() => setShowModal(false)}
//                 className="custom-modal"
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Xác nhận xoá</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     Bạn có chắc chắn muốn xoá khoá học này không?
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Hủy
//                     </Button>
//                     <Button variant="danger" onClick={() => handleDelete()}>
//                         Xoá
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };



const KhoaHoc = ({ match }) => {
    const [khoaHoc, setKhoaHoc] = useState(null);
    // const maKH = match.params.maKH;
    const { maKH } = useParams();
    const [lopHoc, setLopHoc] = useState([]);
    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseKhoaHoc = await axios.get(`http://localhost:2209/api/v1/layKhoaHoc/${maKH}`);
                const { TCKH } = responseKhoaHoc.data;
                setKhoaHoc(TCKH[0]); // Giả sử chỉ lấy thông tin của khoá học đầu tiên

                const responseLopHoc = await axios.get(`http://localhost:2209/api/v1/layLopHoc/${maKH}`);
                const { LH } = responseLopHoc.data;
                setLopHoc(LH);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ API: ', error);
            }
        };

        fetchData();
    }, [maKH]);

    if (!khoaHoc) {
        return <div>Loading...</div>;
    }

    return (
        <>

            <div className="khoa-hoc-container1">
                <h2 className="khoa-hoc-title">Thông Tin Khoá Học</h2>
                <div className="khoa-hoc-details">
                    <h3></h3>
                    <p>Học phí: {formatCurrency(khoaHoc.hocphisaukhigiam)}đ</p>
                    <p>Số giờ: {khoaHoc.so_gio} giờ</p>
                    <p>Mô tả: {khoaHoc.mota}</p>
                    <p>Môn học: {khoaHoc.monhoc}</p>
                    {/* Thêm các thông tin khác về khoá học nếu cần */}
                </div>
                <h2 className="lop-hoc-title">Danh sách lớp học</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên lớp học</th>
                            <th>Thời gian</th>
                            <th>Giáo viên</th>
                            <th>Ngày bắt đầu</th>
                            <th>Địa điểm</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {lopHoc.map((lop, index) => (
                            <tr key={lop.maLopHoc}>
                                <td>{index + 1}</td>
                                <td>{lop.tenLopHoc}</td>
                                <td>{lop.thoigian}</td>
                                <td>{lop.tenGV}</td>
                                <td>{lop.ngay_batdau}</td>
                                <td>{lop.diadiem}</td>
                                <td>
                                    <button className="button-dk"> Đăng ký</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};


export default KhoaHoc;


