// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // Sử dụng useParams để lấy maGV từ URL

// const TatCaKhoaHoc = () => {
//     return (
//         <div className="main-container">
//             <div className="banner-background">
//                 <div className="container search-container">

//                     <div className="header-search-bar">
//                         <div className="catalog-search">
//                             <div className="col-md-7">
//                                 <h1 className="headline">Tìm khóa học bạn quan tâm</h1>
//                                 <h2 className="headline" style="font-size: 20px;font-weight: 300;">Học chắc từ nền tảng<br />
//                                     Ứng dụng hiệu quả CNTT vào thực tế cuộc sống</h2>
//                             </div>
//                             <div className="col-md-5">
//                                 <div className="search-input-container">
//                                     <input className="catalog-search-input" type="search" placeholder="Tìm khóa học" value="" />
//                                     <div className="search_result_list"></div>
//                                 </div>
//                             </div>
//                             <div className="clearfix"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="container">
//                 {/* <div className="filters-container">
//                     <h6 className="filters-label">Lựa chọn khóa học theo:</h6>

//                     <select id="muchocphi" name="muchocphi[]" multiple="" className="form-control" style="display: none;">
//                         <option value="0-999999">Dưới 1 triệu</option>
//                         <option value="1000000-3000000">Từ 1 → 3 triệu</option>
//                         <option value="3000000-7000000">Từ 3 → 7 triệu</option>
//                         <option value="7000000-100000000">Trên 7 triệu</option>
//                     </select>
//                     <div id="muchocphi-container" className="btn-group" style="width: 220px;">
//                         <button type="button" className="multiselect dropdown-toggle btn btn-default" data-toggle="dropdown" title="Học phí" style="width: 200px; overflow: hidden; text-overflow: ellipsis; padding: 10px 12px;"><span className="multiselect-selected-text">Học phí</span> </button><ul className="multiselect-container dropdown-menu">
//                             <li className="multiselect-item filter" value="0"><div className="input-group">
//                                 <input className="form-control multiselect-search" type="text" placeholder="Search" /><span className="input-group-btn"><button className="btn btn-default multiselect-clear-filter" type="button"><i className="glyphicon glyphicon-remove-circle"></i></button></span></div></li><li><a tabindex="0"><label className="checkbox">
//                                     <input type="checkbox" value="0-999999"> Dưới 1 triệu/</input></label></a></li><li><a tabindex="0"><label className="checkbox">
//                                         <input type="checkbox" value="1000000-3000000" /> Từ 1 → 3 triệu</label></a></li><li><a tabindex="0"><label className="checkbox">
//                                             <input type="checkbox" value="3000000-7000000" /> Từ 3 → 7 triệu</label>
//                                         </a></li><li><a tabindex="0"><label className="checkbox">
//                                             <input type="checkbox" value="7000000-100000000" /> Trên 7 triệu</label></a></li></ul></div>
//                     <div className="dropdown bootstrap-select form-control sap-xep bs3" style="width: 200px;"><select id="sapxep" name="sapxep" className="form-control sap-xep" tabindex="-98">
//                         <option value="0">Sắp xếp</option>
//                         <option value="hocphi_asc">Học phí từ thấp đến cao</option>
//                         <option value="hocphi_desc">Học phí từ cao đến thấp</option>
//                     </select><button type="button" className="btn dropdown-toggle btn-default" data-toggle="dropdown" role="combobox" aria-owns="bs-select-1" aria-haspopup="listbox" aria-expanded="false" data-id="sapxep" title="Sắp xếp"><div className="filter-option"><div className="filter-option-inner"><div className="filter-option-inner-inner">Sắp xếp</div></div> </div><span className="bs-caret"><span className="caret"></span></span></button><div className="dropdown-menu open"><div className="inner open" role="listbox" id="bs-select-1" tabindex="-1"><ul className="dropdown-menu inner " role="presentation"></ul></div></div></div>
//                 </div>
//                 <div className="filters-active-container" data-id="catalog-filters" style="display: none;">
//                     <h6 className="filters-label">Các tiêu chí đã chọn:</h6>
//                     <ul className="filters-active">
//                         <li>
//                             <button className="filters-active-item">Android kotlin developer</button></li>
//                         <li>
//                             <button className="filters-active-item">Android</button></li>
//                         <li>
//                             <button className="filters-active-all">Clear All</button></li>
//                     </ul>
//                 </div> */}

//                 <div className="khoa-hoc-container">
//                     <ul className="khoa-hoc-list">
//                         <li className="courses" data-program="6" data-level="beginner-intermediate" data-duration="2.5" data-tuition="7800000" data-title="kiểm thử phần mềm cơ bản + kiểm thử phần mềm tự động" data-description="khóa học đặc biệt cho người mới bắt đầu, trang bị kỹ cho học viên những kiến thức cơ bản về kiểm thử phần mềm.  khóa học giúp học viên nắm chắc quy trình xây dựng và phát..." data-duration-alt="0">
//                             <a className="khoa-hoc-item" href="/kiem-thu-phan-mem/Kiem-thu-phan-mem-co-ban--Kiem-thu-phan-mem-tu-dong_176">
//                                 <div className="khoa-hoc-body">
//                                     <div className="khoa-hoc-image-container">
//                                         <img className="khoa-hoc-image hidden-xs" src="/data/images/mon-hoc-thumb/Kiem-thu-phan-mem-co-ban--Kiem-thu-phan-mem-tu-dong.jpg" alt="" loading="lazy" />
//                                         <img className="khoa-hoc-image-mobile visible-xs" src="/data/images/mon-hoc/lap-trinh/kiem-thu-phan-mem-co-ban-tu-dong.jpg" alt="" loading="lazy" />
//                                     </div>
//                                     <div className="khoa-hoc-overview">
//                                         <div className="khoa-hoc-flag-container">
//                                             <div className="khoa-hoc-flag shortterm">Khóa học chuyên đề</div>
//                                         </div>
//                                         <h2 className="khoa-hoc-title">Kiểm thử phần mềm cơ bản + Kiểm thử phần mềm tự động</h2>
//                                         <p className="khoa-hoc-summary">Khóa học đặc biệt cho người mới bắt đầu, trang bị kỹ cho học viên những kiến thức cơ bản về kiểm thử phần mềm.  Khóa học giúp học viên nắm chắc quy trình xây dựng và phát...</p>
//                                     </div>

//                                     <div className="khoa-hoc-actions">
//                                         <button className="btn button--primary khoa-hoc-action">Chi tiết khóa học</button>
//                                     </div>
//                                     <div className="khoa-hoc-stats">
//                                         <span style="display:none;" className="khoa-hoc-level beginner-intermediate"></span>
//                                         <span className="khoa-hoc-duration">10 tuần</span><span className="khoa-hoc-price">
//                                             <span className="old">7.800.000đ</span><span className="new">6.000.000đ</span>
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className="khoa-hoc-sidebar">
//                                     <div className="khoa-hoc-image-container">

//                                         {/* <img className="khoa-hoc-image khoa-hoc-image-topleft" src="/data/images/mon-hoc-thumb/Kiem-thu-phan-mem-co-ban--Kiem-thu-phan-mem-tu-dong.jpg" alt="" loading="lazy"></div> */}
//                                     </div>
//                                     <div className="khoa-hoc-actions">
//                                         <button className="btn button--primary khoa-hoc-action">Chi tiết khóa học</button></div>
//                                 </div>
//                             </a>
//                         </li>
//                         <li className="courses" data-program="14" data-level="beginner-intermediate-advanced" data-duration="5" data-tuition="21000000" data-title="data analytics certificate" data-description="nếu không có các nhà phân tích dữ liệu, doanh nghiệp sẽ bỏ lỡ những “viên ngọc giá trị” từ kho dữ liệu lưu trữ. xã hội, doanh nghiệp, tổ chức đều đang tăng tốc trong quá..." data-duration-alt="0">
//                             <a className="khoa-hoc-item" href="/data-analysis/data-analytics-certificate_245">
//                                 <div className="khoa-hoc-body">
//                                     <div className="khoa-hoc-image-container">
//                                         {/* <img className="khoa-hoc-image hidden-xs" src="/data/images/mon-hoc-thumb/data-analytics.png" alt="" loading="lazy">
//                                 <img className="khoa-hoc-image-mobile visible-xs" src="/data/images/mon-hoc/Data-Analytics/data-analytics-certificate-mon-hoc.png" alt="" loading="lazy"> */}
//                                     </div>
//                                     <div className="khoa-hoc-overview">
//                                         <div className="khoa-hoc-flag-container">
//                                             <div className="khoa-hoc-flag longterm">Khóa học dài hạn</div>
//                                         </div>
//                                         <h2 className="khoa-hoc-title">Data Analytics Certificate</h2>
//                                         <p className="khoa-hoc-summary">Nếu không có các nhà phân tích dữ liệu, doanh nghiệp sẽ bỏ lỡ những “viên ngọc giá trị” từ kho dữ liệu lưu trữ. Xã hội, doanh nghiệp, tổ chức đều đang tăng tốc trong quá...</p>
//                                     </div>

//                                     <div className="khoa-hoc-actions">
//                                         <button className="btn button--primary khoa-hoc-action">Chi tiết khóa học</button></div>
//                                     <div className="khoa-hoc-stats"><span style="display:none;" className="khoa-hoc-level beginner-intermediate-advanced"></span><span className="khoa-hoc-duration">5 tháng</span><span className="khoa-hoc-price"><span className="old">21.000.000đ</span><span className="new">17.000.000đ</span></span></div>
//                                 </div>
//                                 <div className="khoa-hoc-sidebar">
//                                     <div className="khoa-hoc-image-container">
//                                         {/* <img className="khoa-hoc-image khoa-hoc-image-topright" src="/data/images/mon-hoc-thumb/data-analytics.png" alt="" loading="lazy"></div> */}

//                                     </div>
//                                     <div className="khoa-hoc-actions">
//                                         <button className="btn button--primary khoa-hoc-action">Chi tiết khóa học</button></div>
//                                 </div>
//                             </a></li><li className="courses" data-program="5" data-level="beginner" data-duration="0" data-tuition="2500000" data-title="lập trình di động đa nền tảng với flutter" data-description="khóa học lập trình flutter cơ bản là một khóa học thực tế để học viên khám phá sức mạnh của việc phát triển ứng dụng di động đa nền tảng. flutter là một framework phát..." data-duration-alt="0"><a className="khoa-hoc-item" href="/lap-trinh-di-dong/lap-trinh-di-dong-da-nen-tang-voi-flutter_272">
//                                 <div className="khoa-hoc-body">
//                                     <div className="khoa-hoc-image-container">
//                                         {/* <img className="khoa-hoc-image hidden-xs" src="/data/images/mon-hoc-thumb/lap-trinh-di-dong-da-nen-tang-voi-flutter.png" alt="" loading="lazy">
//                                 <img className="khoa-hoc-image-mobile visible-xs" src="/data/images/mon-hoc/lap-trinh-di-dong/khoa-hoc-flutter-a1.png" alt="" loading="lazy"> */}
//                                     </div>
//                                     <div className="khoa-hoc-overview">
//                                         <div className="khoa-hoc-flag-container">
//                                             <div className="khoa-hoc-flag shortterm">Khóa học chuyên đề</div>
//                                         </div>
//                                         <h2 className="khoa-hoc-title">Lập trình di động đa nền tảng với Flutter</h2>
//                                         <p className="khoa-hoc-summary">Khóa học lập trình Flutter cơ bản là một khóa học thực tế để học viên khám phá sức mạnh của việc phát triển ứng dụng di động đa nền tảng. Flutter là một framework phát...</p>
//                                     </div>

//                                     <div className="khoa-hoc-actions">
//                                         <button className="btn button--primary khoa-hoc-action">Chi tiết khóa học</button></div>
//                                     <div className="khoa-hoc-stats"><span style="display:none;" className="khoa-hoc-level beginner"></span><span className="khoa-hoc-duration"></span><span className="khoa-hoc-price"><span className="old">2.500.000đ</span><span className="new">Ưu đãi chi tiết</span></span></div>
//                                 </div>
//                                 <div className="khoa-hoc-sidebar">
//                                     <div className="khoa-hoc-image-container">
//                                     </div>
//                                     <img className="khoa-hoc-image khoa-hoc-image-bottomleft" src="/data/images/mon-hoc-thumb/lap-trinh-di-dong-da-nen-tang-voi-flutter.png" alt="" loading="lazy" />
//                                     <div className="khoa-hoc-actions">
//                                         <button className="btn button--primary khoa-hoc-action">Chi tiết khóa học</button></div>
//                                 </div>
//                             </a></li><li className="courses" data-program="12" data-level="beginner-intermediate-advanced" data-duration="10" data-tuition="32700000" data-title="data science and machine learning certificate " data-description="data science &amp; machine learning (khoa học dữ liệu &amp; máy học) được xếp hạng là một trong những ngành nghề “hot” nhất trong cách mạng công nghiệp 4.0 vì thế nhu cầu về..." data-duration-alt="12"><a className="khoa-hoc-item" href="/data-science-machine-learning/data-science-and-machine-learning-certificate-version-2024_285">
//                                 <div className="khoa-hoc-body">
//                                     <div className="khoa-hoc-image-container">
//                                         {/* <img className="khoa-hoc-image hidden-xs" src="/data/images/mon-hoc/data-science-machine-learning/DL00_data-science-and-machine-learning-2024.png" alt="" loading="lazy">
//                                 <img className="khoa-hoc-image-mobile visible-xs" src="/data/images/mon-hoc/data-science-machine-learning/chuong-trinh-data-science-machine-learning-2024.png" alt="" loading="lazy"> */}
//                                     </div>
//                                     <div className="khoa-hoc-overview">
//                                         <div className="khoa-hoc-flag-container">
//                                             <div className="khoa-hoc-flag longterm">Khóa học dài hạn</div>
//                                         </div>
//                                         <h2 className="khoa-hoc-title">Data Science and Machine Learning Certificate </h2>
//                                         <p className="khoa-hoc-summary">Data Science &amp; Machine Learning (Khoa học dữ liệu &amp; Máy học) được xếp hạng là một trong những ngành nghề “hot” nhất trong Cách mạng công nghiệp 4.0 vì thế nhu cầu về...</p>
//                                     </div>

//                                     <div className="khoa-hoc-actions">
//                                         <button className="btn button--primary khoa-hoc-action">Chi tiết khóa học</button></div>
//                                     <div className="khoa-hoc-stats"><span style="display:none;" className="khoa-hoc-level beginner-intermediate-advanced"></span><span className="khoa-hoc-duration">10 - 12 tháng</span><span className="khoa-hoc-price"><span className="old">32.700.000đ</span><span className="new">22.500.000đ</span></span></div>
//                                 </div>
//                                 <div className="khoa-hoc-sidebar">
//                                     <div className="khoa-hoc-image-container">
//                                     </div>
//                                     {/* <img className="khoa-hoc-image khoa-hoc-image-bottomright" src="/data/images/mon-hoc/data-science-machine-learning/DL00_data-science-and-machine-learning-2024.png" alt="" loading="lazy"></div> */}
//                                     <div className="khoa-hoc-actions">
//                                         <button className="btn button--primary khoa-hoc-action">Chi tiết khóa học</button></div>
//                                 </div>
//                             </a></li>
//                         <li className="courses" data-program="12" data-level="beginner" data-duration="0" data-tuition="3000000" data-title="artificial intelligence and applications for business" data-description="khóa học cung cấp bức tranh toàn cảnh về những công nghệ tiên tiến dự báo sẽ tác động, ảnh hưởng và định hình tất cả các hoạt động trên thế giới trong hiện tại và tương..." data-duration-alt="0">
//                             <a className="khoa-hoc-item" href="/data-science-machine-learning/artificial-intelligence-and-applications-for-business_294">
//                                 <div className="khoa-hoc-body">
//                                     <div className="khoa-hoc-image-container">
//                                         {/* <img className="khoa-hoc-image hidden-xs" src="/data/images/mon-hoc-thumb/artificial-intelligence-and-applications-for-business.png" alt="" loading="lazy"> */}
//                                         {/* <img className="khoa-hoc-image-mobile visible-xs" src="/data/images/mon-hoc/data-science-machine-learning/tri-tue-nhan-tao-ung-dung-doanh-nghiep-mon-hoc-khtn.png" alt="" loading="lazy"> */}
//                                     </div>
//                                     <div className="khoa-hoc-overview">
//                                         <div className="khoa-hoc-flag-container">
//                                             <div className="khoa-hoc-flag shortterm">Khóa học chuyên đề</div>
//                                         </div>
//                                         <h2 className="khoa-hoc-title">Artificial Intelligence and Applications for Business</h2>
//                                         <p className="khoa-hoc-summary">Khóa học cung cấp bức tranh toàn cảnh về những công nghệ tiên tiến dự báo sẽ tác động, ảnh hưởng và định hình tất cả các hoạt động trên thế giới trong hiện tại và tương...</p>
//                                     </div>

//                                     <div className="khoa-hoc-actions">
//                                         <button className="btn button--primary khoa-hoc-action">Chi tiết khóa học</button></div>
//                                     <div className="khoa-hoc-stats"><span style="display:none;" className="khoa-hoc-level beginner"></span><span className="khoa-hoc-duration"></span><span className="khoa-hoc-price"><span className="old">3.000.000đ</span><span className="new">Ưu đãi chi tiết</span></span></div>
//                                 </div>
//                                 <div className="khoa-hoc-sidebar">
//                                     <div className="khoa-hoc-image-container">
//                                         {/* <img className="khoa-hoc-image khoa-hoc-image-topleft" src="/data/images/mon-hoc-thumb/artificial-intelligence-and-applications-for-business.png" alt="" loading="lazy">*/}
//                                     </div>
//                                     <div className="khoa-hoc-actions">
//                                         <button className="btn button--primary khoa-hoc-action">Chi tiết khóa học</button></div>
//                                 </div>

//                             </a>
//                         </li>
//                     </ul>
//                     {/* <div style="display: none" className="hoc-phi-mon" data-value="7800000,18000000,5000000,4000000,21000000,4500000,2500000,32700000,3000000,22300000,1500000,2450000,6800000,1300000,3900000,26000000,8000000,7000000,3600000,13500000,1600000,26600000,35000000,10000000,2300000,900000,28200000,7500000,5500000,5200000,2400000,29200000,3500000,6000000,300000,3300000,2900000,1700000,2200000,2700000,1100000,2000000,6400000,16200000,8400000,8500000,5800000,3200000,11000000,2600000,50100000,3800000,1800000"></div> */}

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TatCaKhoaHoc;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/timkhoahoc.css"
import { Link } from "react-router-dom";
const TatCaKhoaHoc = () => {
    const [khoaHoc, setKhoaHoc] = useState([]);

    useEffect(() => {
        const fetchKhoaHoc = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/layTrangChuKhoaHoc');
                const data = response.data.TCKH;
                setKhoaHoc(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ API: ', error);
            }
        };

        fetchKhoaHoc();
    }, []);
    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className="wrapper" style={{ "backgroundColor": "#fbfbfb" }}>
            <div className="main-container" style={{ "marginBottom": "0" }}>
                <div className="banner-background">
                    <div className="container search-container">
                        <div className="header-search-bar">
                            <div className="catalog-search">
                                <div className="col-md-7">
                                    <h1 className="headline">Tìm khóa học bạn quan tâm</h1>
                                    <h2 className="headline" style={{ "fontSize": '20px', "fontWeight": "300" }}>Học chắc từ nền tảng<br />
                                        Ứng dụng hiệu quả CNTT vào thực tế cuộc sống</h2>
                                </div>
                                <div className="col-md-5">
                                    <div className="search-input-container">
                                        <input className="catalog-search-input" type="search" placeholder="Tìm khóa học" value="" />
                                        <div className="search_result_list"></div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" >
                    {/* <div className="filters-container">
                    <h6 className="filters-label">Lựa chọn khóa học theo:</h6>

                    <select id="muchocphi" name="muchocphi[]" multiple="" className="form-control" style={{ "display": "none" }}>
                        <option value="0-999999">Dưới 1 triệu</option>
                        <option value="1000000-3000000">Từ 1 → 3 triệu</option>
                        <option value="3000000-7000000">Từ 3 → 7 triệu</option>
                        <option value="7000000-100000000">Trên 7 triệu</option>
                    </select>
                    <div id="muchocphi-container" className="btn-group" style={{ "width": "220px" }}>
                        <button type="button" className="multiselect dropdown-toggle btn btn-default" data-toggle="dropdown" title="Học phí" style={{ "width": '200px', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'padding': "10px 12px" }}><span className="multiselect-selected-text">Học phí</span> </button><ul className="multiselect-container dropdown-menu">
                            <li className="multiselect-item filter" value="0"><div className="input-group">
                                <input className="form-control multiselect-search" type="text" placeholder="Search" />
                                <span className="input-group-btn">
                                    <button className="btn btn-default multiselect-clear-filter" type="button">
                                        <i className="glyphicon glyphicon-remove-circle"></i>
                                    </button></span>
                            </div></li><li><a tabindex="0">
                                <label className="checkbox">
                                    <input type="checkbox" value="0-999999"> Dưới 1 triệu/</input></label></a></li><li><a tabindex="0"><label className="checkbox">
                                        <input type="checkbox" value="1000000-3000000" /> Từ 1 → 3 triệu</label></a></li><li><a tabindex="0"><label className="checkbox">
                                            <input type="checkbox" value="3000000-7000000" /> Từ 3 → 7 triệu</label>
                                        </a></li><li><a tabindex="0"><label className="checkbox">
                                            <input type="checkbox" value="7000000-100000000" /> Trên 7 triệu</label></a></li></ul></div>
                    <div className="dropdown bootstrap-select form-control sap-xep bs3" style={{ "width": "200px" }}><select id="sapxep" name="sapxep" className="form-control sap-xep" tabindex="-98">
                        <option value="0">Sắp xếp</option>
                        <option value="hocphi_asc">Học phí từ thấp đến cao</option>
                        <option value="hocphi_desc">Học phí từ cao đến thấp</option>
                    </select><button type="button" className="btn dropdown-toggle btn-default" data-toggle="dropdown" role="combobox" aria-owns="bs-select-1" aria-haspopup="listbox" aria-expanded="false" data-id="sapxep" title="Sắp xếp"><div className="filter-option"><div className="filter-option-inner"><div className="filter-option-inner-inner">Sắp xếp</div></div> </div><span className="bs-caret"><span className="caret"></span></span></button><div className="dropdown-menu open"><div className="inner open" role="listbox" id="bs-select-1" tabindex="-1"><ul className="dropdown-menu inner " role="presentation"></ul></div></div></div>
                </div> */}
                    <div className="khoa-hoc-container">
                        <ul className="khoa-hoc-list">
                            {khoaHoc.map(kh => (
                                <li key={kh.maKH} className="courses">
                                    <a className="khoa-hoc-item" href={`/khoahoc/${kh.maKH}`}>
                                        <div className="khoa-hoc-body">
                                            <div className="khoa-hoc-overview">
                                                <h2 className="khoa-hoc-title1">{kh.tenKH}</h2>
                                                <p className="khoa-hoc-summary">{kh.mota}</p>
                                            </div>

                                            <div className="khoa-hoc-actions">
                                                <Link to={`/khoahoc/${kh.maKH}`}
                                                    className="btn button--primary khoa-hoc-action">
                                                    Chi tiết khóa học</Link>

                                            </div>
                                            <div className="khoa-hoc-stats">
                                                <span className="khoa-hoc-duration">{kh.so_gio} giờ</span>
                                                <span className="khoa-hoc-price">
                                                    {kh.hocphisaukhigiam ? (
                                                        <>
                                                            <span className="old">{`${formatCurrency(kh.hocphi)}đ`}</span>
                                                            <span className="new">{`${formatCurrency(kh.hocphisaukhigiam)}đ`}</span>
                                                        </>
                                                    ) : (
                                                        <span className="hocphi">{`${formatCurrency(kh.hocphi)}đ`}</span>
                                                    )}
                                                </span>


                                            </div>
                                        </div>
                                        <div className="khoa-hoc-sidebar">
                                            <div className="khoa-hoc-image-container">
                                                {/* <img className="khoa-hoc-image khoa-hoc-image-topleft" 
                                            src={`/data/images/mon-hoc-thumb/${kh.tenHinhAnhKH}`} alt="" loading="lazy" /> */}

                                                <img
                                                    className="khoa-hoc-image khoa-hoc-image-topleft"
                                                    src={

                                                        `http://localhost:2209/images/${kh.tenHinhAnhKH}`
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="khoa-hoc-actions">
                                                <button className="btn button--primary khoa-hoc-action">Chi tiết khóa học</button>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TatCaKhoaHoc;