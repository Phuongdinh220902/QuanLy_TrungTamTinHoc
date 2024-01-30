import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
import { format, parse } from "date-fns";


const ModalUpdateLopHoc = ({ show, handleClose, selectedLH, onUpdate }) => {
    const [tenLopHoc, setTenLopHoc] = useState('');
    const [maGV, setmaGV] = useState('');
    const [thoigian, setThoiGian] = useState('');
    const [diadiem, setDiaDiem] = useState('');
    const [ngay_batdau, setNgayBatDau] = useState('02/02/2002');
    const [dsGV, setDsGV] = useState([]);
    // const newns = format(new Date(ngay_batdau), "dd/MM/yyyy");

    // function check_date(cur_date) {
    //     // cur_date = cur_date.toString()
    //     var dateArray = cur_date.split('/');
    //     var year = dateArray[0]
    //     var month = dateArray[1]
    //     var day = dateArray[2]
    //     var viTriT = year.indexOf('T');

    //     if (viTriT !== -1) {
    //         year = year.substring(0, viTriT);
    //     }
    //     if (day.length == 2) {
    //         try {
    //             var day_number = Number(day)
    //             if (day_number < 0 || day_number > 31) {
    //                 alert("Ngay khong hop le")
    //             }
    //         }
    //         catch (err) {
    //             alert(err)
    //         }

    //     }

    //     if (month.length == 2) {
    //         try {
    //             var month_nubmer = Number(month)
    //             console.log(month_nubmer)
    //             if (month_nubmer < 0 || month_nubmer > 12) {
    //                 alert("thang khong hop le")
    //             }
    //         }
    //         catch (err) {
    //             alert("thang khong hop le")
    //         }

    //     }

    //     try {
    //         var year_number = Number(year)

    //     } catch (err) {
    //         alert("nam khong hop le")
    //     }

    //     return day + '/' + month + '/' + year
    // }

    function check_date(cur_date) {
        // // Kiểm tra nếu cur_date không tồn tại hoặc là chuỗi rỗng
        console.log(cur_date)
        if (!cur_date || cur_date.trim() === '') {
            // alert("Ngày không hợp lệ");
            return cur_date;
        }

        var dateArray = cur_date.split('-');
        // // Kiểm tra độ dài của mảng
        if (dateArray.length !== 3) {
            // alert("Ngày không hợp lệ");
            return cur_date;
        }

        var day = dateArray[0];
        var month = dateArray[1];
        var year = dateArray[2];

        // // Kiểm tra nếu day, month, hoặc year không tồn tại
        if (!day || !month || !year) {

            // alert("Ngày không hợp lệ slkdfjkdslkf");
            return cur_date;
        }

        var viTriT = day.indexOf('T');

        if (viTriT !== -1) {
            year = year.substring(0, viTriT);
        }

        return day + '-' + month + '-' + year;
    }

    function isValidDate(inputDate) {
        // Sử dụng regex để kiểm tra định dạng ngày tháng năm
        const dateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;

        // Kiểm tra xem chuỗi đầu vào có khớp với định dạng không
        if (!dateRegex.test(inputDate)) {
            return false;
        }

        // Chia chuỗi thành các phần ngày, tháng, năm
        const [day, month, year] = inputDate.split('-');

        // Chuyển đổi thành số để kiểm tra giá trị hợp lệ
        const numericDay = parseInt(day, 10);
        const numericMonth = parseInt(month, 10);
        const numericYear = parseInt(year, 10);

        // Kiểm tra tính hợp lệ của ngày, tháng, năm
        if (
            isNaN(numericDay) ||
            isNaN(numericMonth) ||
            isNaN(numericYear) ||
            numericMonth < 1 ||
            numericMonth > 12 ||
            numericDay < 1 ||
            numericDay > 31 ||
            numericYear < 1000 ||
            numericYear > 9999
        ) {
            return false;
        }

        // Kiểm tra độ dài của ngày và tháng
        const isValidLength = day.length <= 2 && month.length <= 2 && year.length === 4;

        return isValidLength;
    }

    useEffect(() => {
        const fetchDSGV = async () => {
            try {
                const response = await axios.get('http://localhost:2209/api/v1/DSGiangVien');
                setDsGV(response.data.dsGV);
            } catch (error) {
                console.error("Lỗi khi gọi API danh sách giảng viên:", error.message);
            }
        };

        fetchDSGV();
    }, []);

    useEffect(() => {
        if (selectedLH) {
            setTenLopHoc(selectedLH.tenLopHoc);
            setmaGV(selectedLH.maGV);
            setThoiGian(selectedLH.thoigian);
            setDiaDiem(selectedLH.diadiem);
            setNgayBatDau(selectedLH.ngay_batdau);
        }
    }, [selectedLH]);

    const handleUpdate = async () => {
        if (!isValidDate(ngay_batdau)) {
            toast.error('Ngày không hợp lệ');
        } else {
            const formattedNgayBatDau = (ngay_batdau) => {
                // Chuyển đổi chuỗi ngày từ dd-mm-yyyy sang đối tượng Date
                const parsedDate = parse(ngay_batdau, 'dd-MM-yyyy', new Date());

                // Định dạng lại ngày theo yyyy-mm-dd
                const formattedDate = format(parsedDate, 'yyyy-MM-dd');

                return formattedDate;
            };

            const formattedNgayBatDauValue = formattedNgayBatDau(ngay_batdau);

            // const formattedNgayBatDau = format(new Date(ngay_batdau), 'yyyy-MM-dd')
            try {
                const formData = new FormData();
                formData.append('tenLopHoc', tenLopHoc);
                formData.append('maGV', maGV);
                formData.append('thoigian', thoigian);
                formData.append('diadiem', diadiem);
                formData.append('ngay_batdau', formattedNgayBatDauValue);

                let mdata = {
                    maLopHoc: selectedLH.maLopHoc,
                    tenLopHoc: tenLopHoc,
                    maGV: maGV,
                    thoigian: thoigian,
                    diadiem: diadiem,
                    ngay_batdau: formattedNgayBatDauValue,
                }
                await axios.post('http://localhost:2209/api/v1/updateLH', mdata, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                onUpdate();
                toast.success('Update thành công');
                handleClose();
            }
            catch (error) {
                console.error("Lỗi khi gọi API cập nhật lớp học:", error.message);
                toast.error("Đã xảy ra lỗi khi cập nhật lớp học");
            }
        }

    };



    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" backdrop='static' className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật lớp học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên Lớp Học</label>
                            <input type="text" className="form-control" value={tenLopHoc}
                                onChange={(event) => setTenLopHoc(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Giảng Viên</label>
                            <select className="form-select" value={maGV} onChange={(event) => setmaGV(event.target.value)}>
                                <option value="">Chọn giảng viên</option>
                                {dsGV.map((gv) => (
                                    <option key={gv.maGV} value={gv.maGV}>
                                        {gv.tenGV}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Thời gian</label>
                            <input type="text" className="form-control" value={thoigian}
                                onChange={(event) => setThoiGian(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Địa điểm</label>
                            <input type="text" className="form-control" value={diadiem}
                                onChange={(event) => setDiaDiem(event.target.value)} />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Ngày bắt đầu</label>
                            <input type="text" className="form-control" value={check_date(ngay_batdau)}
                                onChange={(event) => setNgayBatDau(event.target.value)} />
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdate()}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );

};

export default ModalUpdateLopHoc;
