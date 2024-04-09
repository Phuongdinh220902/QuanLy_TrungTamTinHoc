import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {
    laydsCamNhanHienThi, deleteHVLopHoc
} from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
const CamNhanHienThi = (props) => {
    const [CamNhanHienThi, setListCamNhan] = useState([]);
    // const { maLopHoc } = useParams();
    const { maLopHoc } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectedLH, setselectedLH] = useState(null);
    const [showModalUpdateLopHoc, setshowModalUpdateLopHoc] = useState(false);
    const [selectID, setselectID] = useState(null);

    let [tukhoa, setTuKhoa] = useState("")

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchCamNhanHienThi();
    }, [currentPage, tukhoa]);


    const handleDelete = async () => {
        try {
            await deleteHVLopHoc(selectID);
            console.log(maLopHoc)
            setShowModal(false);
            toast.success("Xoá cảm nhận thành công");

            fetchCamNhanHienThi();
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

    const [checkboxStates, setCheckboxStates] = useState([]);
    const [newState, setNewState] = useState([]);

    useEffect(() => {
        if (CamNhanHienThi.length > 0) {
            const initialCheckboxStates = CamNhanHienThi.map((item) => item.hien_thi === 1);
            setCheckboxStates(initialCheckboxStates);
            setNewState(initialCheckboxStates);
        }
    }, [CamNhanHienThi]);

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
            maCN: CamNhanHienThi[index].maCN,
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

    const fetchCamNhanHienThi = async () => {
        try {
            let tukhoa_ = localStorage.getItem("tukhoa");
            let res = await laydsCamNhanHienThi(currentPage, tukhoa_);
            console.log(res);

            if (res.status === 200) {
                setListCamNhan(res.data.dataCD);
                const newCheckboxStates = res.data.dataCD.map((item) => item.hien_thi === 1);
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
        await fetchCamNhanHienThi();
    };

    useEffect(() => {
        fetchCamNhanHienThi();
    }, [currentPage, tukhoa]);


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
                <h2 className="text-center">Danh Sách Cảm Nhận Hiển Thị</h2>

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
                    <div className="">
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.tableHeader}>STT</th>
                                    <th style={styles.tableHeader}>Tên học viên</th>
                                    <th style={styles.tableHeader}>Số điện thoại</th>
                                    <th style={styles.tableHeader}>Nội dung</th>
                                    <th style={styles.tableHeader}>Hiển thị</th>
                                    <th style={styles.tableHeader}>Dự đoán</th>
                                    <th style={styles.tableHeader}></th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {CamNhanHienThi &&
                                    CamNhanHienThi.length > 0 &&
                                    CamNhanHienThi.map((item, index) => {
                                        const rowStyle = index % 2 === 0 ? styles.alternatingRow : styles.grayBackgroundRow;
                                        return (
                                            <tr key={`table-doanvien-${index}`} style={rowStyle}>
                                                <td style={styles.tableData}>{index + 1}</td>
                                                <td style={styles.tableData}>{item.tenHV}</td>
                                                <td style={styles.tableData}>{item.sdt}</td>
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
                                {CamNhanHienThi && CamNhanHienThi.length === 0 && (
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

export default CamNhanHienThi;