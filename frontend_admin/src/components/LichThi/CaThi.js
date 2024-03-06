import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    faChevronRight,
    faChevronLeft,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {
    laydsCaThi, deleteCaThi
} from "../../services/apiService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import ModalUpdateCaThi from "./ChinhSuaCaThi";
import { Link } from "react-router-dom";
// import ModalCreateLH from "./ModalCreateCaThi";
import axios from "axios";

const CaThi = (props) => {
    const [DSCaThi, setListCaThi] = useState([]);
    const { maLichThi } = useParams();
    const { maCaThi } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectedCT, setselectedCT] = useState(null);
    const [showModalUpdateCaThi, setshowModalUpdateCaThi] = useState(false);
    const [selectID, setselectID] = useState(null);

    let [tukhoa, setTuKhoa] = useState("")

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchDSCaThi();
    }, [currentPage, tukhoa]);


    const handleOpenModalUpdate = (CT) => {
        try {
            setselectedCT(CT);
            setshowModalUpdateCaThi(true);
        }
        catch (err) {
            console.log(err)
        }

    };

    const handleDelete = async () => {
        try {
            await deleteCaThi(selectID);
            console.log(maCaThi)
            setShowModal(false);
            toast.success("Xoá ca thi thành công");

            fetchDSCaThi();
            console.log("Xoá ca thi thành công!");
        } catch (error) {
            toast.error("Lỗi khi xoá ca thi")
            console.error("Lỗi khi xóa ca thi:", error);
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

    const fetchDSCaThi = async () => {
        try {
            let tukhoa_ = localStorage.getItem("tukhoa")
            let res = await laydsCaThi(maLichThi, currentPage, tukhoa_);
            console.log(res);

            if (res.status === 200) {
                setListCaThi(res.data.dataCD);
                // const newCheckboxStates = res.data.dataCD.map((item) => item.hoan_thanh === 1);
                // setCheckboxStates(newCheckboxStates);
                // setNewState(newCheckboxStates);

                // const newCheckboxStatesBD = res.data.dataCD.map((item) => item.bat_dau === 1);
                // setCheckboxStatesBD(newCheckboxStatesBD);
                // setNewStateBD(newCheckboxStatesBD);
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
        await fetchDSCaThi();
    };
    const [showModalCreateCT, setshowModalCreateCT] = useState(false);

    const handleshowModalCreateCT = () => {
        setshowModalCreateCT(true);
    };
    const handleCloseModalCT = () => {
        setshowModalCreateCT(false);
    };

    // const [checkboxStates, setCheckboxStates] = useState([]);
    // const [checkboxStatesBD, setCheckboxStatesBD] = useState([]);

    // const [newState, setNewState] = useState([]);
    // const [newStateBD, setNewStateBD] = useState([]);

    // useEffect(() => {
    //     if (DSCaThi.length > 0) {
    //         const initialCheckboxStates = DSCaThi.map((item) => item.hoan_thanh === 1);
    //         setCheckboxStates(initialCheckboxStates);
    //         setNewState(initialCheckboxStates);

    //         const initialCheckboxStatesBD = DSCaThi.map((item) => item.bat_dau === 1);
    //         setCheckboxStatesBD(initialCheckboxStatesBD);
    //         setNewStateBD(initialCheckboxStatesBD);
    //     }
    // }, [DSCaThi]);


    // const handleCheckboxChange = async (maDSHV, isChecked, index) => {
    //     const newCheckboxStates = [...checkboxStates];
    //     newCheckboxStates[index] = !newCheckboxStates[index];
    //     setCheckboxStates(newCheckboxStates);

    //     const newNewState = [...newState];
    //     newNewState[index] = !newNewState[index]; // Cập nhật trạng thái mới
    //     setNewState(newNewState);

    //     const dataToSave = DSCaThi.map((item, index) => ({
    //         maCaThi: item.maCaThi, // Replace with the actual property name
    //         isChecked: newNewState[index],
    //     }));

    //     try {
    //         const response = await axios.post('http://localhost:2209/api/v1/SaveCheckboxStatesCaThi', {
    //             maCaThi: maCaThi,
    //             isChecked: dataToSave,
    //         });

    //         if (response.status === 200) {
    //             toast.success('Cập nhật trạng thái thành công')
    //         } else {
    //             toast.error('Cập nhật trạng thái thất bại')
    //         }
    //     } catch (error) {
    //         console.error('Lỗi khi gửi yêu cầu API:', error);
    //     }
    // };

    // const handleCheckboxChangeBD = async (maDSHV, isChecked, index) => {
    //     const newCheckboxStatesBD = [...checkboxStatesBD];
    //     newCheckboxStatesBD[index] = !newCheckboxStatesBD[index];
    //     setCheckboxStatesBD(newCheckboxStatesBD);

    //     const newNewStateBD = [...newStateBD];
    //     newNewStateBD[index] = !newNewStateBD[index];
    //     setNewStateBD(newNewStateBD);

    //     const dataToSaveBD = DSCaThi.map((item, index) => ({
    //         maCaThi: item.maCaThi, // Replace with the actual property name
    //         isCheckedBD: newNewStateBD[index],
    //     }));

    //     try {
    //         const response = await axios.post('http://localhost:2209/api/v1/SaveCheckboxStatesCaThiBatDau', {
    //             maCaThi: maCaThi,
    //             isCheckedBD: dataToSaveBD,
    //         });

    //         if (response.status === 200) {
    //             toast.success('Cập nhật trạng thái thành công')
    //         } else {
    //             toast.error('Cập nhật trạng thái thất bại')
    //         }
    //     } catch (error) {
    //         console.error('Lỗi khi gửi yêu cầu API:', error);
    //     }
    // };

    return (
        <>
            <div className="container-fluid app__content">
                <h2 className="text-center">Danh Sách Ca Thi</h2>

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
                            <button className="formatButton addButton" onClick={handleshowModalCreateCT}>
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
                                    <th className="table-item">STT</th>
                                    <th className="table-item ">Thời gian</th>
                                    <th className="table-item ">Số lượng đã đăng ký</th>
                                    <th className="table-item ">Số lượng tối đa</th>
                                    <th className="table-item ">  </th>
                                </tr>
                            </thead>
                            <tbody id="myTable">
                                {DSCaThi &&
                                    DSCaThi.length > 0 &&
                                    DSCaThi.map((item, index) => {
                                        return (
                                            <tr key={`table-doanvien-${index}`} className="tableRow">
                                                <td className="table-item col-right">{index + 1}</td>
                                                <td className="">{item.thoigian}</td>
                                                <td className="table-item">{item.slDaDK}</td>
                                                <td className="table-item">{item.slToiDa}</td>

                                                <td className="table-item">
                                                    <button className="btn btn-info">
                                                        <Link to={`/dsthisinh/${item.maCaThi}`} className="navlink linkStyle">
                                                            Xem Danh Sách HV
                                                        </Link>
                                                    </button>

                                                    <button className="btn btn-warning mx-2" onClick={() => handleOpenModalUpdate(item)}>
                                                        Cập nhật
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => { setselectID(item.maCaThi); setShowModal(true) }}
                                                    >Xoá</button>

                                                </td>
                                            </tr>
                                        );
                                    })}
                                {DSCaThi && DSCaThi.length === 0 && (
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

            <ModalUpdateCaThi
                show={showModalUpdateCaThi}
                handleClose={() => setshowModalUpdateCaThi(false)}
                selectedCT={selectedCT}
                onUpdate={fetchDSCaThi}
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
                    Bạn có chắc chắn muốn xoá ca thi này không?
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




export default CaThi;