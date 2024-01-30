import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
import { format, parse } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileImport
} from "@fortawesome/free-solid-svg-icons";

const ModalUpdateGV = ({ show, handleClose, selectedGiangVien, onUpdate }) => {
    const [maGV, setmaGV] = useState('');
    const [tenGV, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaysinh, setNgaysinh] = useState('02/02/2002');
    const [gioitinh, setGioitinh] = useState('Nam');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    // const newns = format(new Date(ngaysinh), "dd/MM/yyyy");
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
        if (selectedGiangVien) {
            setmaGV(selectedGiangVien.maGV);
            setTen(selectedGiangVien.tenGV);
            setEmail(selectedGiangVien.email);
            setSdt(selectedGiangVien.sdt);
            setNgaysinh(selectedGiangVien.ngaysinh);
            setGioitinh(selectedGiangVien.gioitinh == 1 ? 'Nam' : 'Nữ');
            setImage(selectedGiangVien.tenHA);
        }
    }, [selectedGiangVien]);

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const handleUpdate = async () => {
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        const validatePhoneNumber = (sdt) => {
            return String(sdt).match(/^(09|08|02|03|07|05)[0-9]{8}$/);
        };

        const normalizetenGV = (tenGV) => {
            tenGV = tenGV.trim();
            tenGV = tenGV.replace(/\s+/g, ' ');
            console.log(tenGV)
            return tenGV;
        };

        const isValidEmail = validateEmail(email);
        const isValidPhone = validatePhoneNumber(sdt);

        const normalizedtenGV = normalizetenGV(tenGV);

        if (!tenGV.trim() || !email || !sdt || !gioitinh) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }
        // Kiểm tra tên có ít nhất 2 cụm từ
        const words = tenGV.trim().split(/\s+/);
        if (words.length < 2) {
            toast.error('Tên phải có ít nhất 2 cụm từ.');
            return;
        }

        if (!/^[^\d!@#$%^&*()_+={}\[\]:;<>,?~\\/`"\|]*$/.test(tenGV)) {
            toast.error('Tên không được chứa các kí tự đặc biệt');
            return;
        }

        if (!isValidEmail) {
            toast.error('Email không hợp lệ');
            return;
        }
        if (!isValidPhone) {
            toast.error('Số điện thoại không hợp lệ');
            return;
        }
        if (!isValidDate(ngaysinh)) {
            toast.error('Ngày không hợp lệ');
        } else {
            const formattedNgayBatDau = (ngaysinh) => {
                // Chuyển đổi chuỗi ngày từ dd-mm-yyyy sang đối tượng Date
                const parsedDate = parse(ngaysinh, 'dd-MM-yyyy', new Date());

                // Định dạng lại ngày theo yyyy-mm-dd
                const formattedDate = format(parsedDate, 'yyyy-MM-dd');

                return formattedDate;
            };
            const formattedNgaySinhValue = formattedNgayBatDau(ngaysinh);
            try {
                const formData = new FormData();
                formData.append('maGV', maGV);
                formData.append('tenGV', normalizedtenGV);
                formData.append('email', email);
                formData.append('sdt', sdt);
                // Ánh xạ giới tính từ frontend sang backend
                const gioitinhValue = gioitinh == 'Nam' ? 1 : 0;
                formData.append('gioitinh', gioitinhValue);
                formData.append('ngaysinh', formattedNgaySinhValue);
                if (image instanceof Blob) {
                    formData.append("file", image, image.name);
                }
                for (const value of formData.values()) {
                    console.log(value);
                }

                let res = await axios.post('http://localhost:2209/api/v1/updateGV', formData);
                toast.success('Update thành công');
                onUpdate();
                handleClose();
            }
            catch (error) {
                console.error("Lỗi khi gọi API cập nhật giảng viên:", error.message);
                toast.error("Đã xảy ra lỗi khi cập nhật giảng viên");
            }
        }

    };


    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" backdrop='static' className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật giảng viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Tên giảng viên</label>
                            <input type="text" className="form-control" value={tenGV}
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
                            <label className="form-label" >Ngày sinh</label>
                            <input type="text" className="form-control" value={check_date(ngaysinh)}
                                onChange={(event) => setNgaysinh(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Giới tính</label>
                            <select className="form-select"
                                onChange={(event) => setGioitinh(event.target.value)}>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <FontAwesomeIcon icon={faFileImport} /> Thay đổi ảnh </label>
                            <input type="file" id="labelUpload" hidden
                                onChange={(event) => handleUpLoadImage(event)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            <img
                                className="avatar_img"
                                src={
                                    previewImage ||
                                    (selectedGiangVien && selectedGiangVien.tenHA
                                        ? `http://localhost:2209/images/${selectedGiangVien.tenHA}`
                                        : '')
                                }
                                alt=""
                            />
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

export default ModalUpdateGV;
