
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import * as XLSX from "xlsx";
import { format } from "date-fns";
import {
    faPenToSquare,
    faUserPlus
    // faDownload,
    // faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
    laydshv, deleteHV
} from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import ModalUpdateUser from "./ModalUpdateUser";

function Them() {
    const [show, setShow] = useState(false);
    const [tenHV, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [noisinh, setNoisinh] = useState('');
    const [gioitinh, setGioitinh] = useState('Nữ');

    const handleClose = () => {
        setShow(false)
        setTen("");
        setEmail("");
        setSdt("");
        setNgaysinh("");
        setGioitinh("Nam");
        setNoisinh("");
    }
    const handleShow = () => setShow(true);

    // const validateEmail = (email) => {
    //     return String(email)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         );
    // };

    const handleSave = async () => {
        // const isValidEmail = validateEmail(email);

        // if (!isValidEmail) {
        //     // alert('Email sai')
        //     toast.error('Email không hợp lệ');
        //     return;
        // }
        try {
            const formData = new FormData();
            formData.append('tenHV', tenHV);
            formData.append('email', email);
            formData.append('sdt', sdt);
            formData.append('ngaysinh', ngaysinh);

            // Ánh xạ giới tính từ frontend sang backend
            const gioitinhValue = gioitinh === 'Nam' ? 1 : 0;
            formData.append('gioitinh', gioitinhValue);
            formData.append('noisinh', noisinh);
            for (const value of formData.values()) {
                console.log(value);
            }

            let mdata = {
                tenHV: tenHV,
                email: email,
                sdt: sdt,
                ngaysinh: ngaysinh,
                gioitinh: gioitinhValue,
                noisinh: noisinh
            }
            console.log(mdata)
            await axios.post('http://localhost:2209/api/v1/themHV', mdata, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });


            toast.success('Thêm thành công');
            handleClose();
        }
        catch (error) {
            console.error("Lỗi khi gọi API xoá giảng viên:", error.message);
            toast.error("Đã xảy ra lỗi khi xoá giảng viên");
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
                    <Modal.Title>Thêm mới học viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên Học Viên</label>
                            <input type="text" className="form-control" value={tenHV}
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
                        <div className="col-12">
                            <label className="form-label">Nơi sinh</label>
                            <input type="text" className="form-control" value={noisinh}
                                onChange={(event) => setNoisinh(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Giới Tính</label>
                            <select className="form-select"
                                onChange={(event) => setGioitinh(event.target.value)}>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
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

const User = (props) => {
    const [DSHocVien, setListHocVien] = useState([]);
    const { maHV } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectID, setselectID] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

    const handleOpenModalUpdate = (user) => {
        setSelectedUser(user);
        setShowModalUpdateUser(true);
    };

    const handleDelete = async () => {
        try {
            await deleteHV(selectID);
            console.log(maHV)
            // await axios.post(`http://localhost:2209/api/v1/deleteHV/${maHV}`);
            setShowModal(false);

            console.log("Xoá học viên thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa học viên:", error);
        }
    };

    useEffect(() => {
        fetchDSHocVien();
    }, []);


    const fetchDSHocVien = async () => {
        try {
            let res = await laydshv();
            console.log(res);

            if (res.status === 200) {
                setListHocVien(res.data.dataCD);
            } else {
                // Xử lý trường hợp lỗi
                console.error("Lỗi khi gọi API:", res.statusText);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error.message);
        }
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

    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Danh Sách Học Viên</h2>
                <Them />
                {/* <div className="search">
                    <div className="searchDV">
                        <div className="">
                            <div className="searchDV-input">
                                <input
                                    type="text"
                                    className="search_name"
                                    placeholder="Mã đoàn viên"
                                    value={searchData.MSSV}
                                    onChange={(e) => {
                                        setSearchData({ ...searchData, MSSV: e.target.value });
                                    }}
                                />
                            </div>
                            <div className="searchDV-input">
                                <input
                                    type="text"
                                    className="search_name"
                                    placeholder="Tên đoàn viên"
                                    value={searchData.HoTen}
                                    onChange={(e) => {
                                        setSearchData({ ...searchData, HoTen: e.target.value });
                                    }}
                                />
                            </div>
                            <div className="searchDV-input">
                                <select
                                    type="text"
                                    className="search_name"
                                    value={searchData.IDChucVu}
                                    onChange={(e) => {
                                        setSearchData({ ...searchData, IDChucVu: e.target.value });
                                    }}
                                >
                                    <option value="Chức vụ">
                                        Chọn chức vụ
                                    </option>
                                    {DSChucVu.map((item, index) => {
                                        return (
                                            <option key={index} value={item.IDChucVu}>
                                                {item.TenCV}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="searchDV-input">
                                <select
                                    type="text"
                                    className="search_name"
                                    value={searchData.GioiTinh}
                                    onChange={(e) => {
                                        setSearchData({ ...searchData, GioiTinh: e.target.value });
                                    }}
                                >
                                    <option value="Giới tính">
                                        Chọn giới tính
                                    </option>
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                    <option value="2">Khác</option>
                                </select>
                            </div>
                            <button className="formatButton" onClick={handleSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm
                            </button>
                        </div>
                        <div className="buttonSearch">
                            <button className="formatButton" onClick={exportToExcel}>
                                <FontAwesomeIcon icon={faDownload} /> Tải
                            </button>
                        </div>
                    </div>
                </div> */}

                <div className="listDV">
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="table-item ">STT</th>
                                    <th className="table-item">Tên Học Viên</th>
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
                                                <td className="table-item">{item.tenHV}</td>
                                                <td className="table-item">
                                                    {format(new Date(item.ngaysinh), "dd/MM/yyyy")}
                                                </td>
                                                <td className="table-item">
                                                    {item.gioitinh === 0
                                                        ? "Nữ"
                                                        : item.gioitinh === 1
                                                            ? "Nam"
                                                            : "Khác"}
                                                </td>
                                                <td className="table-item">{item.noisinh}</td>
                                                <td className="table-item">{item.email}</td>
                                                <td className="table-item">{item.sdt}</td>
                                                <td className="table-item">{item.hocphi ? item.hocphi : 0}</td>


                                                <td>
                                                    <button className="btn btn-warning mx-3" onClick={() => handleOpenModalUpdate(item)}>
                                                        <FontAwesomeIcon icon={faPenToSquare} /> Chỉnh sửa
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
                    </div>
                </div>
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    handleClose={() => setShowModalUpdateUser(false)}
                    selectedUser={selectedUser}
                    onUpdate={fetchDSHocVien} // Callback to refresh the list after updating
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