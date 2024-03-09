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
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

function MyCarousel() {
    const [dsAnh, setDsAnh] = useState([]);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    useEffect(() => {
        const fetchHinhAnh = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/layHinhAnhTrangChu');
                setDsAnh(response.data.HA);
                console.log(response.data.HA);
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };
        fetchHinhAnh();
    }, []);

    return (
        <Carousel className="custom-carousel" interval={3000} controls={false} indicators onSelect={handleSelect}>
            {dsAnh.map((anh, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:2209/images/${anh.tenHinhAnhQC}`}
                        alt=""
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

const KhoaHoc = ({ match }) => {
    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const { maKH } = useParams();
    const [khoaHoc, setKhoaHoc] = useState(null);
    const [lopHoc, setLopHoc] = useState([]);
    const [gioiThieu, setGioiThieu] = useState("");
    const [hinhAnh, setHinhAnh] = useState("");
    const [tieude, setTieuDe] = useState("");
    const [noidung, setNoiDung] = useState("");
    const [contentData, setContentData] = useState([]);

    const navigate = useNavigate();
    const loggedIn = localStorage.getItem('user') !== null;
    const [showModal, setShowModal] = useState(false);
    const [maLopHoc, setMaLopHoc] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseKhoaHoc = await axios.get(`http://localhost:2209/api/v1/layKhoaHoc/${maKH}`);
                const { TCKH } = responseKhoaHoc.data;
                setKhoaHoc(TCKH[0]); // Lấy thông tin của khoá học đầu tiên

                const responseLopHoc = await axios.get(`http://localhost:2209/api/v1/layLopHoc/${maKH}`);
                const { LH } = responseLopHoc.data;
                setLopHoc(LH);

                const responseGioiThieu = await axios.get(`http://localhost:2209/api/v1/layGioiThieuKhoaHoc/${maKH}`);
                const { chitiet, tenHinhAnhKH } = responseGioiThieu.data.TCKH[0];
                if (chitiet) {
                    setGioiThieu(chitiet); // Lưu trữ nội dung từ API vào state
                }
                if (tenHinhAnhKH) {
                    setHinhAnh(tenHinhAnhKH); // Lưu trữ tên hình ảnh từ API vào state
                }

                const responseNoiDung = await axios.get(`http://localhost:2209/api/v1/layNoiDungKhoaHoc/${maKH}`);
                console.log(responseNoiDung)
                setContentData(responseNoiDung.data.ND);
                // const { tieude, noidung } = responseNoiDung.data.ND[0];
                // if (tieude) {
                //     setTieuDe(tieude); // Lưu trữ nội dung từ API vào state
                // }
                // if (noidung) {
                //     setNoiDung(noidung); // Lưu trữ tên hình ảnh từ API vào state
                // }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ API: ', error);
            }
        };

        fetchData();
    }, [maKH]);

    if (!khoaHoc) {
        return <div>Loading...</div>;
    }


    const handleDangKy = async (maLopHoc) => {
        if (loggedIn) {
            setMaLopHoc(maLopHoc)
            setShowModal(true);
        } else {
            alert('Bạn cần đăng nhập để thực hiện chức năng này.');
            navigate('/dangnhap');
        }
    };

    const handleThem = async () => {
        const maHV = localStorage.getItem('maHV');
        console.log(maLopHoc, 'malophoc')
        console.log(maHV, 'mahocvien')
        try {
            const response = await axios.post("http://localhost:2209/api/v1/DangKyLopHoc", {
                maLopHoc,
                maHV
            });

            if (response.status === 200) {
                toast.success('Đăng ký lớp học thành công')
            }
        } catch (error) {
            // Nếu có lỗi khi gửi yêu cầu đến server
            if (error.response) {
                // Nếu server trả về mã trạng thái 400
                if (error.response.status === 400) {
                    // Lấy thông báo lỗi từ phản hồi
                    const errorMessage = error.response.data;
                    // Hiển thị thông báo lỗi
                    toast.error(errorMessage);
                } else {
                    // Xử lý các trường hợp lỗi khác từ server
                    console.error("Lỗi khi đăng ký lớp học:", error);
                    toast.error("Lỗi khi đăng ký lớp học");
                }
            } else {
                // Xử lý các lỗi khác không phải từ server
                console.error("Lỗi khi đăng ký lớp học:", error);
                toast.error("Lỗi khi đăng ký lớp học");
            }
        }

        // Sau khi đăng ký xong, bạn có thể thực hiện các hành động khác ở đây, ví dụ: đóng modal
        setShowModal(false);
    };

    // const handleDangKy = async (maLopHoc) => {
    //     if (loggedIn) {

    //         const response = await axios.post("http://localhost:2209/api/v1/DangKyLopHoc", {
    //             maLopHoc,
    //             maHV,
    //         });

    //         if (response.status === 200) {

    //         }

    //         console.log('Đã đăng nhập, tiến hành đăng ký...');
    //     } else {
    //         alert('Bạn cần đăng nhập để thực hiện chức năng này.');
    //         navigate('/dangnhap');

    //     }
    // };

    return (
        <>
            <MyCarousel />
            <div className="container nganh-khoang-cach" id="GioiThieuMonHoc">
                <div className="col-md-9 khoang-cach-5">
                    <div className="col-md-4 khoang-cach-5 mon-hoc-image" style={{ textAlign: "center" }}>
                        <img
                            src={

                                `http://localhost:2209/images/${hinhAnh}`
                            }
                            alt=""
                        />
                    </div>
                    <div className="col-md-8 khoang-cach-5">
                        <h1 className="nganh-tieu-de">
                            <div> {khoaHoc.tenKH}</div>
                        </h1>
                        <div className="nganh-noi-dung">

                            <div dangerouslySetInnerHTML={{ __html: gioiThieu }}></div> {/* Hiển thị nội dung từ state */}
                        </div>
                    </div>

                    <div className="nganh-khoang-cach-muc" style={{ clear: 'both' }}></div>
                    <div className="panel-group khoang-cach-5" id="accordion">
                        {contentData.map((item, index) => (
                            <div className="panel panel-default" key={index}>
                                <div className="panel-heading">
                                    <a className="myCollapse" data-toggle="collapse" data-parent="#accordion" aria-expanded="true">
                                        <h4 className="panel-title" style={{ float: 'left', paddingTop: '3px', width: '95%', color: '#FD6504' }}>
                                            {item.tieude}
                                        </h4>
                                        <span className="glyphicon nganh-chon glyphicon-menu-up" aria-hidden="true" style={{ float: 'right' }}></span>
                                    </a>
                                    <div style={{ clear: 'both' }}></div>
                                </div>
                                <div id={`collapse${index + 1}`} className="panel-collapse collapse in" aria-expanded="true">
                                    <div className="panel-body nganh-tieu-de-muc" dangerouslySetInnerHTML={{ __html: item.noidung }}></div>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            </div>


            <div className="khoa-hoc-container1">

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
                        {lopHoc && lopHoc.map((lop, index) => (
                            <tr key={lop.maLopHoc}>
                                <td>{index + 1}</td>
                                <td>{lop.tenLopHoc}</td>
                                <td>{lop.thoigian}</td>
                                <td>{lop.tenGV}</td>
                                <td>{lop.ngay_batdau}</td>
                                <td>{lop.diadiem}</td>
                                <td>
                                    <button className="button-dk" onClick={() => handleDangKy(lop.maLopHoc)}> Đăng ký</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
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
                    <Modal.Title>Xác nhận đăng ký</Modal.Title>
                </Modal.Header>
                <Modal.Body>Khi đăng ký thành công, bạn cần thanh toán học phí bằng cách đóng trực tiếp ở trung tâm trong khoảng thời gian 3 ngày từ khi bạn đăng ký thành công</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleThem}>
                        Đăng ký
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};


export default KhoaHoc;


