import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    faPenToSquare,
    faUserPlus,
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass,
    faEye
} from "@fortawesome/free-solid-svg-icons";
import {
    laydskh, deleteKH
} from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import ModalUpdateKH from "./ModalUpdateKH";
import { Link } from "react-router-dom";

function ThemKH() {
    const [show, setShow] = useState(false);
    const [tenKH, setTen] = useState('');
    const [hocphi, sethocphi] = useState('');
    const [mota, setmota] = useState('');
    const [monhoc, setmonhoc] = useState('');
    const [so_gio, setso_gio] = useState('');

    const handleClose = () => {
        setShow(false)
        setTen("");
        sethocphi("");
        setmota("");
        setmonhoc("");
        setso_gio("");
    }
    const handleShow = () => setShow(true);


    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('tenKH', tenKH);
            formData.append('hocphi', hocphi);
            formData.append('mota', mota);
            formData.append('monhoc', monhoc);
            formData.append('so_gio', so_gio);
            for (const value of formData.values()) {
                console.log(value);
            }

            let mdata = {
                tenKH: tenKH,
                hocphi: hocphi,
                mota: mota,
                monhoc: monhoc,
                so_gio: so_gio
            }
            console.log(mdata)
            await axios.post('http://localhost:2209/api/v1/themKH', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            toast.success('Thêm thành công');
            handleClose();
        }
        catch (error) {
            console.error("Lỗi khi gọi API thêm giảng viên:", error.message);
            toast.error("Đã xảy ra lỗi khi thêm giảng viên");
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="btn-lg bt-create">
                <FontAwesomeIcon icon={faUserPlus} /> Thêm
            </Button>

            <Modal show={show} onHide={handleClose}
                size="xl"
                backdrop='static'
                className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới khoá học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên khoá học</label>
                            <input type="text" className="form-control" value={tenKH}
                                onChange={(event) => setTen(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Học phí</label>
                            <input type="hocphi" className="form-control" value={hocphi}
                                onChange={(event) => sethocphi(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Mô tả</label>
                            <input type="text" className="form-control" value={mota}
                                onChange={(event) => setmota(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Môn học</label>
                            <input type="text" className="form-control" value={monhoc}
                                onChange={(event) => setmonhoc(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Số giờ</label>
                            <input type="text" className="form-control" value={so_gio}
                                onChange={(event) => setso_gio(event.target.value)} />
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

const KhoaHoc = (props) => {
    const [DSKhoaHoc, setListKhoaHoc] = useState([]);
    const { maKH } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectID, setselectID] = useState(null);
    const [selectedKH, setselectedKH] = useState(null);
    const [showModalUpdateKH, setshowModalUpdateKH] = useState(false);

    let [tukhoa, setTuKhoa] = useState("")

    const handleOpenModalUpdate = (kh) => {
        setselectedKH(kh);
        setshowModalUpdateKH(true);
    };

    const handleDelete = async () => {
        try {
            await deleteKH(selectID);
            console.log(maKH)
            // await axios.post(`http://localhost:2209/api/v1/deleteHV/${maKH}`);
            setShowModal(false);
            toast.success("Xoá khoá học thành công");

            fetchDSKhoaHoc();
            console.log("Xoá khoá học thành công!");
        } catch (error) {
            toast.error("Lỗi khi xoá khoá học")
            console.error("Lỗi khi xóa khoá học:", error);
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
        fetchDSKhoaHoc();
    }, [currentPage, tukhoa]);


    const fetchDSKhoaHoc = async () => {
        try {
            let tukhoa_ = localStorage.getItem("tukhoa")
            let res = await laydskh(currentPage, tukhoa_);
            console.log(res);

            if (res.status === 200) {
                setListKhoaHoc(res.data.dataCD);
                setListKhoaHoc(res.data.dataCD);
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
        await fetchDSKhoaHoc();
    };

    // const fetchDSHV = async () => {
    //     try {
    //         let res = await laydshv();
    //         if (res.status === 200) {
    //             // setListKhoa(res.data.DSKhoa); // Cập nhật state với danh sách khóa học
    //             const khoaData = res.data.dataCV;

    //             // Kiểm tra nếu khoaData là mảng trước khi cập nhật state
    //             if (Array.isArray(khoaData)) {
    //                 setListChucVu(khoaData);
    //             } else {
    //                 console.error("Dữ liệu khóa không hợp lệ:", khoaData);
    //             }
    //         } else {
    //             console.error("Lỗi khi gọi API:", res.statusText);
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi gọi API:", error.message);
    //     }
    // };

    // const handleSearch = async () => {
    //     try {
    //         const trimmedMSSV = searchData.MSSV.trim().toLowerCase();
    //         const trimmedHoTen = searchData.HoTen.trim().toLowerCase();

    //         let res = await searchDoanVien({
    //             ...searchData,
    //             MSSV: trimmedMSSV,
    //             HoTen: trimmedHoTen,
    //         }); // Assuming you have implemented the search API

    //         console.log(res);
    //         if (res.status === 200) {
    //             setListDoanVien(res.data.dataCD);
    //         } else {
    //             console.error("Lỗi khi tìm kiếm:", res.statusText);
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi tìm kiếm:", error.message);
    //     }
    // };

    // const exportToExcel = () => {
    //     // Tạo một mảng chứa dữ liệu bạn muốn xuất
    //     const dataToExport = DSDoanVien.map((item) => {
    //         return {
    //             "Mã Chi Đoàn": item.MaLop,
    //             "Tên Chi Đoàn": item.TenLop,
    //             Khóa: item.Khoa,
    //             MSSV: item.MSSV,
    //             HoTen: item.HoTen,
    //             hocphi: item.hocphi,
    //             SoDT: item.SoDT,
    //             GioiTinh:
    //                 item.GioiTinh === 0 ? "Nữ" : item.GioiTinh === 1 ? "Nam" : "Khác",
    //             QueQuan: item.QueQuan,
    //             DanToc: item.TenDanToc,
    //             TonGiao: item.TenTonGiao,
    //             monhoc: format(new Date(item.monhoc), "dd/MM/yyyy"),
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

    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Danh Sách Khoá Học</h2>

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

                            <ThemKH />
                        </div>
                    </div>
                </div>

                <div className="listDV">
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="table-item ">STT</th>
                                    <th className="table-item ">Tên Khoá Học</th>
                                    <th className="table-item ">Học Phí</th>
                                    {/* <th className="table-item ">Mô tả</th> */}
                                    <th className="table-item ">Môn Học</th>
                                    {/* <th className="table-item ">Số giờ</th> */}
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {DSKhoaHoc &&
                                    DSKhoaHoc.length > 0 &&
                                    DSKhoaHoc.map((item, index) => {
                                        return (
                                            <tr key={`table-doanvien-${index}`} className="tableRow">
                                                <td className="table-item col-right">{index + 1}</td>
                                                <td className="">{item.tenKH}</td>
                                                <td className="">{item.hocphi ? item.hocphi : 0}</td>
                                                {/* <td className="table-item">{item.mota}</td> */}
                                                <td className="">{item.monhoc}</td>
                                                {/* <td className="table-item">{item.so_gio}</td> */}


                                                <td className="table-item">
                                                    <button className="btn btn-warning mx-2" onClick={() => handleOpenModalUpdate(item)}>
                                                        <FontAwesomeIcon icon={faPenToSquare} /> Chỉnh sửa
                                                    </button>
                                                    <button className="btn btn-danger mx-2" onClick={() => { setselectID(item.maKH); setShowModal(true) }}
                                                    >Xoá</button>

                                                    <button className="btn btn-info">
                                                        <Link to={`/lophoc/${item.maKH}`} className="navlink linkStyle">
                                                            Xem
                                                        </Link>
                                                    </button>
                                                </td>

                                            </tr>
                                        );
                                    })}
                                {DSKhoaHoc && DSKhoaHoc.length === 0 && (
                                    <tr className="tablenone">
                                        <td className="tablenone">Không có khoá học nào!</td>
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
                <ModalUpdateKH
                    show={showModalUpdateKH}
                    handleClose={() => setshowModalUpdateKH(false)}
                    selectedKH={selectedKH}
                    onUpdate={fetchDSKhoaHoc} // Callback to refresh the list after updating
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
                    Bạn có chắc chắn muốn xoá khoá học này không?
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

export default KhoaHoc;