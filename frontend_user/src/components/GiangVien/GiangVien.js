// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import {
//     faChevronRight,
//     faChevronLeft,
//     faMagnifyingGlass,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//     laydsgv
// } from "../../services/apiService";
// import axios from "axios"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ModalUpdateGV from "./ModalUpdate";
// import ModalDelete from "./ModalDelete";
// import ModalCreateGV from "./ModalCreateGV";

// <div className="wrapper">

//     <div className="container hidden-xs">
//         <ol className="breadcrumb duong-dan">
//             <li><a href="/">Trang chủ</a></li>
//             <li><a href="#">Giáo viên</a></li>
//         </ol>
//     </div>

//     <div className="container nganh-khoang-cach">
//         <div id="vitri"></div>
//         <div className="col-md-12 khoang-cach-5">
//             <h1 className="nganh-tieu-de-giao-vien">ĐỘI NGŨ GIẢNG VIÊN</h1>
//             <p id="sologan" className="nganh-slogan-giao-vien">Tất cả Giáo viên Trung tâm Tin học là những chuyên gia giàu kinh nghiệm thực tế và chuyên nghiệp</p>

//             <div className="khung-giao-vien-chon">
//                 <div className="row nganh-khoang-cach-0">
//                     <div className="col-md-12 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/tin-hoc-van-phong/thud-To-Ho-Giang.png" id="hinhgvView" className="thumbnail">
//                             <div className="nganh-gioi-thieu-giao-vien">
//                                 <div id="gioithieugv" className="gioi-thieu"><h1>Giảng viên: Tô Trần Hồ Giảng</h1></div>
//                                 <div id="noidunggv" className="mo-ta"><p>
//                                     Thầy Tô Trần Hồ Giảng hiện có hơn 20 năm giảng dạy và làm việc tại Trung Tâm Tin Học ĐH KHTN.</p>
//                                     <p>
//                                         Thầy đang đảm nhiệm chuyên môn ngành Tin Học Ứng Dụng</p>
//                                     <p>
//                                         Kinh nghiệm giảng dạy Ứng dụng CNTT cơ bản, ứng dụng CNTT nâng cao, chuyên đề Xử lý dữ liệu Excel, Chuyên đề VBA, Chuyên đề Phân tích dữ liệu Excel,...tại Trung Tâm và các đơn vị ban ngành, cơ quan nhà nước, các doanh nghiệp tư nhân,...</p>
//                                     <p>
//                                         &nbsp;</p>
//                                     <p>
//                                         &nbsp;</p>
//                                 </div>
//                             </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="khung-giao-vien">
//                 <div className="row nganh-khoang-cach-0"><div id="GV74" onclick="DocGV(74)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                     <img src="/data/images/giao-vien/tin-hoc-van-phong/thud-To-Ho-Giang.png" alt="Tô Trần Hồ Giảng" className="thumbnail">
//                         <p className="nganh-ten-giao-vien">Tô Trần Hồ Giảng</p>
//                 </div><div id="GV73" onclick="DocGV(73)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/do-hoa/Do-hoa-Doan-Van-Cuong.png" alt="Cường Đoàn" className="thumbnail">
//                             <p className="nganh-ten-giao-vien">Cường Đoàn</p>
//                     </div><div id="GV72" onclick="DocGV(72)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/lap-trinh-va-csdl/Vu-Dinh-Ai-1.png" alt="Vũ Đình Ái" className="thumbnail">
//                             <p className="nganh-ten-giao-vien">Vũ Đình Ái</p>
//                     </div><div id="GV71" onclick="DocGV(71)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/lap-trinh-va-csdl/Thuy-Rieng.png" alt="Trần Thùy Riêng" className="thumbnail">
//                             <p className="nganh-ten-giao-vien">Trần Thùy Riêng</p>
//                     </div><div id="GV70" onclick="DocGV(70)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/lap-trinh-va-csdl/Tran-Hong-Vinh.png" alt="Trần Hồng Vinh" className="thumbnail">
//                             <p className="nganh-ten-giao-vien">Trần Hồng Vinh</p>
//                     </div><div id="GV68" onclick="DocGV(68)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/lap-trinh-va-csdl/Nguyen-Phan-Chi-Thanh-nen-trang.png" alt="Nguyễn Phan Chí Thành" className="thumbnail">
//                             <p className="nganh-ten-giao-vien">Nguyễn Phan Chí Thành</p>
//                     </div><div id="GV66" onclick="DocGV(66)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/do-hoa/TTK.png" alt="Trương Trọng Kính" className="thumbnail">
//                             <p className="nganh-ten-giao-vien">Trương Trọng Kính</p>
//                     </div><div id="GV64" onclick="DocGV(64)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/do-hoa/co_Thuy_dohoa.jpg" alt="Vũ Thị Thanh Thúy" className="thumbnail">
//                             <p className="nganh-ten-giao-vien">Vũ Thị Thanh Thúy</p>
//                     </div><div id="GV63" onclick="DocGV(63)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/tin-hoc-van-phong/GV_Hoang_Anh_UDCNTT.jpg" alt="Trần Thị Hoàng Anh" className="thumbnail">
//                             <p className="nganh-ten-giao-vien">Trần Thị Hoàng Anh</p>
//                     </div><div id="GV61" onclick="DocGV(61)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/tin-hoc-van-phong/pham-hong-loan-khanh.jpg" alt="Phạm Hồng Loan Khánh" className="thumbnail">
//                             <p className="nganh-ten-giao-vien">Phạm Hồng Loan Khánh</p>
//                     </div><div id="GV60" onclick="DocGV(60)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/kiem-thu-phan-mem/giang-vien-tester-kim.png" alt="Nguyễn Minh Thiên Kim" className="thumbnail">
//                             <p className="nganh-ten-giao-vien">Nguyễn Minh Thiên Kim</p>
//                     </div><div id="GV59" onclick="DocGV(59)" className="col-xs-6 col-sm-4 col-md-2 nganh-khoang-cach-0">
//                         <img src="/data/images/giao-vien/tin-hoc-van-phong/DTHP.png" alt="Đặng Thị Hồng Phấn" className="thumbnail">
//                             <p className="nganh-ten-giao-vien">Đặng Thị Hồng Phấn</p>
//                     </div></div>
//                 <div style="text-align:center">
//                     <nav>
//                         <ul className="pagination" style="margin:5px;"><li><a className="active control" aria-label="Previous"><i className="fa fa-fast-backward" aria-hidden="true"></i></a></li><li><a className="active control" aria-label="Previous"><i className="fa fa-step-backward" aria-hidden="true"></i></a></li><li><a className="active">1</a></li><li><a className="link" href="/giao-vien~0/trang-2">2</a></li><li><a className="link" href="/giao-vien~0/trang-3">3</a></li><li><a className="link" href="/giao-vien~0/trang-4">4</a></li><li><a className="link" href="/giao-vien~0/trang-2" aria-label="Next"><i className="fa fa-step-forward" aria-hidden="true"></i></a></li><li><a className="link" href="/giao-vien~0/trang-4" aria-label="Next"><i className="fa fa-fast-forward" aria-hidden="true"></i></a></li></ul>
//                     </nav>
//                 </div>
//             </div>
//         </div>
//         <div className="col-md-3 hidden-sm hidden-xs khoang-cach-5">
//             <div className="sidebar">

//             </div>
//         </div>
//     </div>
//     <div style="height:10px;"></div>

//     <script type="text/javascript">

//         function scrollWin() {
//             $('html, body').animate({ scrollTop: $("#vitri").offset().top });
//       }

//     </script>



//     <div className="footer">
//         <div className="container" style="min-height: 30px">
//             <div className="col-md-10">
//                 <div>
//                     <div id="nhom3cs" style="padding-top: 15px; font-size: 13px; overflow: hidden">
//                         <div className="col-md-4 nhomcs">
//                             <div className="tencs">
//                                 <b>Trụ sở chính:</b></div>
//                             <div>
//                                 <span className="glyphicon glyphicon-map-marker" style="width: 16px">&nbsp;</span>227 Nguyễn Văn Cừ, P4, Quận 5, Tp HCM</div>
//                             <div>
//                                 <span className="glyphicon glyphicon-phone-alt" style="width: 16px">&nbsp;</span>(028) 38 351 056 (số máy nhánh 111)</div>
//                         </div>
//                         <div className="col-md-4 nhomcs">
//                             <div className="tencs">
//                                 <b>Cơ sở:</b></div>
//                             <div>
//                                 <span className="glyphicon glyphicon-map-marker" style="width: 16px">&nbsp;</span>21-23 Nguyễn Biểu, P1, Quận 5, Tp HCM</div>
//                             <div>
//                                 <span className="glyphicon glyphicon-phone-alt" style="width: 16px">&nbsp;</span>(028) 38 351 056 (số máy nhánh 222)</div>
//                         </div>
//                         <div className="col-md-4 nhomcs">
//                             <div className="tencs">
//                                 <b>Chính sách và quy định chung</b></div>
//                             <div>
//                                 <span className="glyphicon glyphicon-ok" style="width: 16px">&nbsp;</span><a href="http://csc.edu.vn/tin-tuc/tin-tuc-trung-tam-tin-hoc/Chinh-sach-chung-va-dieu-khoan-4088" style="color: #FFF">Điều khoản dịch vụ</a></div>
//                             <div>
//                                 <span className="glyphicon glyphicon-ok" style="width: 16px">&nbsp;</span><a href="http://csc.edu.vn/tin-tuc/tin-tuc-trung-tam-tin-hoc/Chinh-sach-bao-mat-thong-tin-4091" style="color: #FFF">Chính sách bảo mật</a></div>
//                             <div>
//                                 <span className="glyphicon glyphicon-registration-mark" style="width: 16px;">&nbsp;</span>Số ĐKKD 4109000014 cấp ngày 31/08/2010</div>
//                         </div>
//                     </div>
//                     <div style="color: #FFF; font-style: italic; font-size: 14px; padding: 10px 0 15px">
//                         Copyright © Trung Tâm Tin Học Trường Đại học khoa học Tự nhiên</div>
//                 </div>

//             </div>
//             <div className="col-md-2" style="text-align: center; padding: 15px;">
//                 <a href="https://www.facebook.com/Trungtamtinhockhtn" title="Liên kết với chúng tôi" target="_blank"><img src="/data/images/trang-chu/facebook.png"></a><a href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=46248" title="Đã thông báo" target="_blank"><img src="/data/images/trang-chu/da_thong_bao.png" style="margin-top:10px"></a>
//             </div>
//             <div style="clear: both"></div>
//         </div>
//     </div>
// </div>

// export default GiangVien;