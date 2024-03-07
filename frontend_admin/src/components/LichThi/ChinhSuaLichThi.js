import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from 'react-toastify';
import { format, parse } from "date-fns";

const ModalUpdate = ({ show, handleClose, selectedLT, onUpdate }) => {
    const [maLichThi, setmaLichThi] = useState('');
    const [ngaythi, setNgayThi] = useState('');
    const [ngayhethan, setNgayHetHan] = useState('');
    const [hocphi, setHocPhi] = useState('');


    // Các biến khác nếu có
    console.log(selectedLT)
    useEffect(() => {
        if (selectedLT) {
            setmaLichThi(selectedLT.maLichThi);
            setNgayThi(selectedLT.ngaythi);
            setNgayHetHan(selectedLT.ngayhethan);
            setHocPhi(selectedLT.hocphi);
        }
    }, [selectedLT]);

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

    const handleUpdate = async () => {
        if (!isValidDate(ngaythi) || !isValidDate(ngayhethan)) {
            toast.error('Ngày không hợp lệ');
        } else {
            const formattedNgayBatDau = (ngaythi) => {
                // Chuyển đổi chuỗi ngày từ dd-mm-yyyy sang đối tượng Date
                const parsedDate = parse(ngaythi, 'dd-MM-yyyy', new Date());
                // Định dạng lại ngày theo yyyy-mm-dd
                const formattedDate = format(parsedDate, 'yyyy-MM-dd');
                return formattedDate;
            };
            const formattedNgayBatDauValue = formattedNgayBatDau(ngaythi);

            const formattedNgayHetHan = (ngayhethan) => {
                // Chuyển đổi chuỗi ngày từ dd-mm-yyyy sang đối tượng Date
                const parsedDate = parse(ngayhethan, 'dd-MM-yyyy', new Date());
                // Định dạng lại ngày theo yyyy-mm-dd
                const formattedDate1 = format(parsedDate, 'yyyy-MM-dd');
                return formattedDate1;
            };

            const formattedNgayHetHanValue = formattedNgayHetHan(ngayhethan);

            try {
                const formData = new FormData();
                formData.append('ngaythi', formattedNgayBatDauValue);
                formData.append('ngayhethan', formattedNgayHetHanValue);
                formData.append('hocphi', hocphi);
                console.log(selectedLT.maLichThi);


                let mdata = {
                    maLichThi: selectedLT.maLichThi,
                    ngaythi: formattedNgayBatDauValue,
                    ngayhethan: formattedNgayHetHanValue,
                    hocphi: hocphi,
                }
                await axios.post('http://localhost:2209/api/v1/updateLichThi', mdata, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                toast.success('Update lịch thi thành công');
                onUpdate();
                handleClose();
            }
            catch (error) {
                console.error("Lỗi khi gọi API cập nhật lịch thi:", error.message);
                toast.error("Đã xảy ra lỗi khi cập nhật lịch thi");
            }
        }
    };


    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" backdrop='static' className="modal-add">
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa lịch thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label className="form-label">Ngày thi (Nhập : dd/mm/yyyy)</label>
                            <input type="text" className="form-control" value={ngaythi}
                                onChange={(event) => setNgayThi(event.target.value)} />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Ngày hết hạn (Nhập : dd/mm/yyyy)</label>
                            <input type="text" className="form-control" value={ngayhethan}
                                onChange={(event) => setNgayHetHan(event.target.value)} />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Lệ phí</label>
                            <input type="text" className="form-control" value={hocphi}
                                onChange={(event) => setHocPhi(event.target.value)} />
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

export default ModalUpdate;
