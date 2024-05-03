import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {
    laydsCamNhan, deleteHVLopHoc
} from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
// import ModalUpdateLopHoc from "./ModalUpdateLopHoc";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
const DSCamNhan = (props) => {
    const [DSCamNhan, setListHocVien] = useState([]);
    const { maLopHoc } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectedLH, setselectedLH] = useState(null);
    const [showModalUpdateLopHoc, setshowModalUpdateLopHoc] = useState(false);
    const [selectID, setselectID] = useState(null);

    let [tukhoa, setTuKhoa] = useState("")

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchDSCamNhan();
    }, [currentPage, tukhoa]);


    const handleDelete = async () => {
        try {
            await deleteHVLopHoc(selectID);
            console.log(maLopHoc)
            setShowModal(false);
            toast.success("Xoá cảm nhận thành công");

            fetchDSCamNhan();
            console.log("Xoá cảm nhận thành công!");
        } catch (error) {
            toast.error("Lỗi khi xoá cảm nhận")
            console.error("Lỗi khi xóa cảm nhận:", error);
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

    const fetchDSCamNhan = async () => {
        try {
            let tukhoa_ = localStorage.getItem("tukhoa");
            let res = await laydsCamNhan(maLopHoc, currentPage, tukhoa_);
            console.log(res);

            if (res.status === 200) {
                setListHocVien(res.data.dataCD);
                const newCheckboxStates = res.data.dataCD.map((item) => item.hien_thi === 1);
                setCheckboxStates(newCheckboxStates);
                setNewState(newCheckboxStates);

                const trangthaiCamNhan = res.data.dataCD[0]?.trangthai_camnhan;
                if (trangthaiCamNhan === 1) {
                    setStatus("Mở");
                } else {
                    setStatus("Đóng");
                }


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
        await fetchDSCamNhan();
    };

    useEffect(() => {
        fetchDSCamNhan();
    }, [currentPage, tukhoa]);

    const [checkboxStates, setCheckboxStates] = useState([]);
    const [newState, setNewState] = useState([]);

    useEffect(() => {
        if (DSCamNhan.length > 0) {
            const initialCheckboxStates = DSCamNhan.map((item) => item.hien_thi === 1);
            setCheckboxStates(initialCheckboxStates);
            setNewState(initialCheckboxStates);
        }
    }, [DSCamNhan]);

    const handleCheckboxChange = async (maCN, isChecked, index) => {
        // Cập nhật trạng thái của checkbox
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = isChecked;
        setCheckboxStates(newCheckboxStates);

        // Cập nhật trạng thái mới
        const newNewState = [...newState];
        newNewState[index] = isChecked;
        setNewState(newNewState);

        // Chuẩn bị dữ liệu để gửi đi
        const dataToSave = newNewState.map((isChecked, index) => ({
            maCN: DSCamNhan[index].maCN,
            isChecked: isChecked,
        }));

        try {
            const response = await axios.post('http://localhost:2209/api/v1/SaveCheckboxStatesCamNhan', {
                isChecked: dataToSave,
            });

            if (response.status === 200) {
                toast.success('Cập nhật trạng thái thành công');
            } else {
                toast.error('Cập nhật trạng thái thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu API:', error);
            toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
        }
    };
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleStatusSelect = (selectedStatus) => {
        setSelectedStatus(selectedStatus);
        setShowModal1(true);
    };

    const handleCloseModal = () => {
        setShowModal1(false);
    };

    const [status, setStatus] = useState("");
    const [showModal1, setShowModal1] = useState(false);

    const handleConfirmChange = async () => {
        try {
            let newValue;
            if (selectedStatus === "Mở") {
                newValue = 1;
            } else if (selectedStatus === "Đóng") {
                newValue = 0;
            }

            const response = await axios.post('http://localhost:2209/api/v1/TrangThaiCamNhan', { trang_thai: newValue, maLopHoc });

            if (response.status === 200) {
                setStatus(selectedStatus);
                toast.success(response.data.message);
                setShowModal1(false);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Có lỗi xảy ra khi cập nhật trạng thái.');
            setShowModal1(false);
        }
    };

    // const maLopHoc_ = maLopHoc

    let formData = {
        maLopHoc: maLopHoc
    }


    const handleSubmit = async () => {
        try {
            console.log(formData, 'formData')
            const response = await axios.post('http://127.0.0.1:8000/predict_comment', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log(response.data);
            // Do something with the response if needed
        } catch (error) {
            console.error('Error:', error);
            // Handle error if needed
        }
    };




    // const handleStatusSelect = async (selectedStatus) => {
    //     try {
    //         let newValue;
    //         if (selectedStatus === "Mở cảm nhận") {
    //             newValue = 1;
    //         } else if (selectedStatus === "Đóng cảm nhận") {
    //             newValue = 0;
    //         }

    //         // Gửi yêu cầu HTTP đến API endpoint để cập nhật giá trị trangthai_camnhan
    //         const response = await axios.post('http://localhost:2209/api/v1/TrangThaiCamNhan', { trang_thai: newValue, maLopHoc });

    //         // Cập nhật lại trạng thái trong trường hợp cập nhật thành công
    //         if (response.status === 200) {
    //             setStatus(selectedStatus);
    //             // Hiển thị toast thông báo
    //             toast.success(response.data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error updating status:', error);
    //         // Hiển thị toast thông báo lỗi
    //         toast.error('Có lỗi xảy ra khi cập nhật trạng thái.');
    //     }
    // };

    const styles = {
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        tableHeader: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: '#e1e1e1'
        },
        tableData: {
            border: '1px solid #dddddd',
            textAlign: 'left',
            padding: '8px',
            maxWidth: '400px',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            fontSize: '18px'
        },
        alternatingRow: {
            backgroundColor: '#ffffff' // Màu nền mặc định là trắng
        },
        grayBackgroundRow: {
            backgroundColor: '#f2f2f2' // Màu nền xám xen kẽ
        }
    };


    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Danh Sách Cảm Nhận</h2>

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
                        <div style={{ display: 'flex' }}>
                            <DropdownButton title={`Trạng thái: ${status}`} variant="success" id="bg-nested-dropdown" style={{ marginTop: '20px' }}
                                onSelect={handleStatusSelect} >
                                <Dropdown.Item eventKey="Mở">Mở</Dropdown.Item>
                                <Dropdown.Item eventKey="Đóng">Đóng</Dropdown.Item>
                            </DropdownButton>

                            <button className="formatButton1 mx-2" onClick={handleSubmit} style={{ height: '60px' }}>
                                Phân loại cảm nhận
                            </button>
                        </div>

                    </div>
                </div>

                <div className="listDV">
                    <div className="">
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.tableHeader}>STT</th>
                                    <th style={styles.tableHeader}>Tên học viên</th>
                                    <th style={styles.tableHeader}>Email</th>
                                    <th style={styles.tableHeader}>Nội dung</th>
                                    <th style={styles.tableHeader}>Hiển thị</th>
                                    <th style={styles.tableHeader}>Dự đoán</th>
                                    <th style={styles.tableHeader}></th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {DSCamNhan &&
                                    DSCamNhan.length > 0 &&
                                    DSCamNhan.map((item, index) => {
                                        return (
                                            <tr key={`table-doanvien-${index}`} >
                                                <td style={styles.tableData}>{index + 1}</td>
                                                <td style={styles.tableData}>{item.tenHV}</td>
                                                <td style={styles.tableData}>{item.email}</td>
                                                <td style={styles.tableData}>{item.noidung}</td>
                                                <td style={styles.tableData} className="col-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={checkboxStates[index]}
                                                        onChange={() => handleCheckboxChange(item.maCN, !checkboxStates[index], index)}
                                                    />
                                                </td>


                                                <td style={styles.tableData}>{item.nhan}</td>
                                                <td style={styles.tableData}>
                                                    <button className="btn btn-danger" onClick={() => { setselectID(item.maDSHV); setShowModal(true) }}>
                                                        Xoá
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                {DSCamNhan && DSCamNhan.length === 0 && (
                                    <tr>
                                        <td style={styles.tableData}>Không có cảm nhận nào!</td>
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

            {/* <ModalUpdateLopHoc
                show={showModalUpdateLopHoc}
                handleClose={() => setshowModalUpdateLopHoc(false)}
                selectedLH={selectedLH}
                onUpdate={fetchDSCamNhan}
            /> */}

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                className="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xoá cảm nhận này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal1(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal1} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận thay đổi trạng thái</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn thay đổi trạng thái thành "{selectedStatus}" không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Hủy bỏ
                    </Button>
                    <Button variant="primary" onClick={handleConfirmChange}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DSCamNhan;