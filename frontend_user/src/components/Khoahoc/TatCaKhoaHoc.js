import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/timkhoahoc.css"
import { Link } from "react-router-dom";
import {
    laydskh1
} from "../../services/apiService";
import tim from '../../images/search-icon.png'
const TatCaKhoaHoc = () => {
    const [khoaHoc, setKhoaHoc] = useState([]);
    let [tukhoa1, settukhoa1] = useState("")

    // useEffect(() => {
    //     const fetchKhoaHoc = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:2209/api/v1/layTrangChuKhoaHoc');
    //             const data = response.data.TCKH;
    //             setKhoaHoc(data);
    //         } catch (error) {
    //             console.error('Lỗi khi lấy dữ liệu từ API: ', error);
    //         }
    //     };

    //     fetchKhoaHoc();
    // }, []);

    useEffect(() => {
        fetchKhoaHoc();
    }, [tukhoa1]);


    const fetchKhoaHoc = async () => {
        try {
            let tukhoa1_ = localStorage.getItem("tukhoa1")
            let res = await laydskh1(tukhoa1_);
            console.log(res);

            if (res.status === 200) {
                setKhoaHoc(res.data.dataKH);
            } else {
                // Xử lý trường hợp lỗi
                console.error("Lỗi khi gọi API:", res.statusText);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error.message);
        }
    };


    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleSearch = async () => {
        if (tukhoa1 == "" || !tukhoa1) {
            tukhoa1 = "null"
        }
        localStorage.setItem("tukhoa1", tukhoa1)
        await fetchKhoaHoc();
    };



    return (
        <div className="wrapper" style={{ "backgroundColor": "#f6f6f6" }}>
            <div className="main-container" style={{ marginBottom: "-50px" }}>
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
                                        <input className="catalog-search-input"
                                            type="search" placeholder="Tìm khóa học"
                                            value={tukhoa1}
                                            onChange={(e) => settukhoa1(e.target.value)} />
                                        <span className="search-button-container" onClick={handleSearch}>
                                            <img className="search-icon" src={tim} alt="Search" />
                                        </span>
                                        {/* <button className="formatButton" onClick={handleSearch}>
                                            Tìm
                                        </button> */}
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