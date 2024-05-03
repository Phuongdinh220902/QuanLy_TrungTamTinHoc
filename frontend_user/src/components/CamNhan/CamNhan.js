// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ngoisao from '../../images/ngoisao_cam.png';
// import ReactPaginate from 'react-paginate';

// const CamNhanHocVien = () => {
//     const [camNhan, setCamNhan] = useState([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [itemsPerPage] = useState(6);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:2209/api/v1/layTrangChuCamNhan');
//                 setCamNhan(response.data.CN);
//             } catch (error) {
//                 console.error('Lỗi khi gọi API: ', error);
//             }
//         };
//         fetchData();
//     }, []);

//     const chunkArray = (myArray, chunkSize) => {
//         const results = [];
//         while (myArray.length) {
//             results.push(myArray.splice(0, chunkSize));
//         }
//         return results;
//     };
//     const handlePageClick = ({ selected }) => {
//         setCurrentPage(selected);
//     };

//     const indexOfLastItem = (currentPage + 1) * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = camNhan.slice(indexOfFirstItem, indexOfLastItem);
//     const pageCount = Math.ceil(camNhan.length / itemsPerPage);

//     return (
//         <div className="wrapper" style={{ backgroundColor: 'white', paddingBottom: '100px', position: 'relative' }}>
//             <div className="container" style={{ textAlign: 'center' }}>
//                 <h1 className="tieu-de-muc">
//                     <a className="tieu-de-muc" name="camnhan">
//                         Cảm nhận học viên
//                     </a>
//                 </h1>
//                 <img src={ngoisao} width="250px" alt="" />

//                 {chunkArray(camNhan, 2).map((row, rowIndex) => (
//                     <div key={rowIndex} className="container nganh-khoang-cach">
//                         <div id="vitri"></div>
//                         <div className="col-md-9 khoang-cach-5">
//                             <div className="khung-hoc-vien">
//                                 <div className="row nganh-khoang-cach-0">
//                                     {row.map((item, itemIndex) => (
//                                         <div key={itemIndex} className="col-md-6 nganh-khoang-cach-0" style={{ padding: '20px' }}>
//                                             <div className="col-md-4 khoang-cach-5">
//                                                 <img src={`http://localhost:2209/images/${item.tenHinhAnhHV}`} className="thumbnail" alt="" />
//                                             </div>
//                                             <div className="col-md-8 khoang-cach-5">
//                                                 <p className="tom-tat">{item.noidung}</p>
//                                                 <h3>{item.tenHV}</h3>
//                                                 <h3>{item.tenKH}</h3>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//                 <ReactPaginate
//                     breakLabel="..."
//                     nextLabel="next >"
//                     onPageChange={handlePageClick}
//                     pageRangeDisplayed={5}
//                     pageCount={pageCount}
//                     previousLabel="< previous"
//                     renderOnZeroPageCount={null}
//                 />

//             </div>

//         </div>
//     );
// };

// export default CamNhanHocVien;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ngoisao from '../../images/ngoisao_cam.png';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faForwardStep,
    faBackwardStep

} from "@fortawesome/free-solid-svg-icons";

const CamNhanHocVien = () => {
    const [camNhan, setCamNhan] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/layTrangChuCamNhan');
                setCamNhan(response.data.CN);

                // Tính tổng số trang dựa trên số lượng dữ liệu và số lượng dữ liệu mỗi trang
                const total = Math.ceil(response.data.CN.length / itemsPerPage);
                setTotalPages(total);
            } catch (error) {
                console.error('Lỗi khi gọi API: ', error);
            }
        };
        fetchData();
    }, []);



    const chunkArray = (myArray, chunkSize) => {
        const results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunkSize));
        }
        return results;
    };
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };


    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = camNhan.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="wrapper" style={{ backgroundColor: 'white', paddingBottom: '50px', position: 'relative' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h1 className="tieu-de-muc">
                    <a className="tieu-de-muc" name="camnhan">
                        Cảm nhận học viên
                    </a>
                </h1>
                <img src={ngoisao} width="250px" alt="" />

                {chunkArray(currentItems, 2).map((row, rowIndex) => (
                    <div key={rowIndex} className="container nganh-khoang-cach" style={{ marginTop: '20px' }}>
                        <div id="vitri"></div>
                        <div className="col-md-9 khoang-cach-5">
                            <div className="khung-hoc-vien">
                                <div className="row nganh-khoang-cach-0">
                                    {row.map((item, itemIndex) => (
                                        <div key={itemIndex} className="col-md-6 nganh-khoang-cach-0" style={{ padding: '20px' }}>
                                            <div className="col-md-4 khoang-cach-5">
                                                <img src={`http://localhost:2209/images/${item.tenHinhAnhHV}`} className="thumbnail" alt="" />
                                            </div>
                                            <div className="col-md-8 khoang-cach-5">
                                                <p className="tom-tat">{item.noidung}</p>
                                                <h3>{item.tenHV}</h3>
                                                <h3>{item.tenKH}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<FontAwesomeIcon icon={faForwardStep} />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel={<FontAwesomeIcon icon={faBackwardStep} />}
                    renderOnZeroPageCount={null}
                    containerClassName="phan-trang" // Thêm lớp cho thanh phân trang
                    activeClassName="active"
                />
            </div>
        </div>
    );
};

export default CamNhanHocVien;
