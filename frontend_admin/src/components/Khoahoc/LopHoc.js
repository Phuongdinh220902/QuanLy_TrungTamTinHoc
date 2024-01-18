import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    faPenToSquare,
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
import { format } from "date-fns";
import { Link } from "react-router-dom";

// function ThemKH() {
//     const [show, setShow] = useState(false);
//     const [tenKH, setTen] = useState('');
//     const [hocphi, sethocphi] = useState('');
//     const [mota, setmota] = useState('');
//     const [monhoc, setmonhoc] = useState('');
//     const [so_gio, setso_gio] = useState('');

//     const handleClose = () => {
//         setShow(false)
//         setTen("");
//         sethocphi("");
//         setmota("");
//         setmonhoc("");
//         setso_gio("");
//     }
//     const handleShow = () => setShow(true);


//     const handleSave = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('tenKH', tenKH);
//             formData.append('hocphi', hocphi);
//             formData.append('mota', mota);
//             formData.append('monhoc', monhoc);
//             formData.append('so_gio', so_gio);
//             for (const value of formData.values()) {
//                 console.log(value);
//             }

//             let mdata = {
//                 tenKH: tenKH,
//                 hocphi: hocphi,
//                 mota: mota,
//                 monhoc: monhoc,
//                 so_gio: so_gio
//             }
//             console.log(mdata)
//             await axios.post('http://localhost:2209/api/v1/themKH', mdata, {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//             });

//             toast.success('Thêm thành công');
//             handleClose();
//         }
//         catch (error) {
//             console.error("Lỗi khi gọi API thêm giảng viên:", error.message);
//             toast.error("Đã xảy ra lỗi khi thêm giảng viên");
//         }
//     }

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
//                     <Modal.Title>Thêm mới khoá học</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form className="row g-3">
//                         <div className="col-12">
//                             <label className="form-label">Tên Khoá Học</label>
//                             <input type="text" className="form-control" value={tenKH}
//                                 onChange={(event) => setTen(event.target.value)} />
//                         </div>
//                         <div className="col-12">
//                             <label className="form-label">hocphi</label>
//                             <input type="hocphi" className="form-control" value={hocphi}
//                                 onChange={(event) => sethocphi(event.target.value)} />
//                         </div>
//                         <div className="col-12">
//                             <label className="form-label">Mô tả</label>
//                             <input type="text" className="form-control" value={mota}
//                                 onChange={(event) => setmota(event.target.value)} />
//                         </div>
//                         <div className="col-12">
//                             <label className="form-label">Môn học</label>
//                             <input type="text" className="form-control" value={monhoc}
//                                 onChange={(event) => setmonhoc(event.target.value)} />
//                         </div>
//                         <div className="col-12">
//                             <label className="form-label">Số giờ</label>
//                             <input type="text" className="form-control" value={so_gio}
//                                 onChange={(event) => setso_gio(event.target.value)} />
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
                                                <td className="table-item">
                                                    {format(new Date(item.ngay_batdau), "dd/MM/yyyy")}
                                                </td>
                                                <td className="">{item.thoigian}</td>

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

// const LopHoc = (props) => {
//     const [DSLopHoc, setListLopHoc] = useState([]);
//     const { maKH } = useParams();

//     useEffect(() => {
//         fetchDSLopHoc();
//     }, []);

//     const fetchDSLopHoc = async () => {
//         try {
//             let res = await laymotKH(maKH);
//             console.log(res);

//             if (res.status === 200) {
//                 setListLopHoc(res.data.dataCD);
//             } else {
//                 console.error("Lỗi khi gọi API:", res.statusText);
//             }
//         } catch (error) {
//             console.error("Lỗi khi gọi API:", error.message);
//         }
//     };

//     return (
//         <>
//             <div className="container-fluid app__content">
//                 <h2 className="text-center">Danh Sách Lớp Học</h2>

//                 <div className="listDV">
//                     <div className="table-container">
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th className="table-item ">STT</th>
//                                     <th className="table-item ">Tên Lớp Học</th>
//                                 </tr>
//                             </thead>
//                             <tbody id="myTable">
//                                 {DSLopHoc.map((item, index) => (
//                                     <tr key={`table-lophoc-${index}`} className="tableRow">
//                                         <td className="table-item col-right">{index + 1}</td>
//                                         <td className="table-item">{item.tenLopHoc}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };



export default LopHoc;