

import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

function uploadAdapter(loader) {
    return loader.file.then(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function (event) {
                resolve({ default: event.target.result });
            };

            reader.onerror = function (error) {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    });
}

function ThemChiTiet() {
    const [editorData, setEditorData] = useState("");
    const editorInstance = useRef(null);
    const [maChiTiet, setMaChiTiet] = useState(null);
    const [detailExists, setDetailExists] = useState(false); // Biến để kiểm tra xem dữ liệu chi tiết đã tồn tại hay không
    const { maKH } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        checkDetailExists();
    }, []);

    const checkDetailExists = async () => {
        try {
            const response = await axios.get(`http://localhost:2209/api/v1/checkChiTietExists/${maKH}`);
            const { exists, maChiTiet, chitiet } = response.data;
            setMaChiTiet(maChiTiet);
            if (exists && chitiet) {
                setEditorData(chitiet);
                setDetailExists(true); // Nếu dữ liệu chi tiết tồn tại, set biến state này thành true
            }
        } catch (error) {
            console.error("Error checking detail existence:", error);
        }
    };

    const handleSendData = async () => {
        try {
            const content = editorInstance.current.getData();
            console.log(maChiTiet)
            console.log(content)
            if (detailExists) { // Nếu dữ liệu chi tiết đã tồn tại, gọi API update
                await axios.post(
                    `http://localhost:2209/api/v1/updateChiTietKhoaHoc/${maChiTiet}`,
                    { chitiet: editorData },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                toast.success('Cập nhật thành công');
            } else { // Nếu dữ liệu chi tiết chưa tồn tại, gọi API thêm mới
                await axios.post(
                    "http://localhost:2209/api/v1/themchitietkhoahoc",
                    { maKH, content },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                toast.success('Thêm thành công');
            }
            setTimeout(() => {
                navigate(`/mota/${maKH}`);
            }, 4000);

        } catch (error) {
            console.error("Error sending data:", error);
            toast.error('Lỗi khi thực hiện');
        }
    };

    const handleToastClose = () => {
        navigate('/khoahoc');
    };

    const handleToastCloseToast = () => {
        navigate(`/mota/${maKH}`);
    };


    return (
        <>
            <div className="">
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                    <button className="btn btn-info ">
                        <Link to={`/mota/${maKH}`} style={{ textDecoration: 'none', color: 'white' }}>
                            Xem mô tả
                        </Link>
                    </button>
                </div>

                <CKEditor
                    editor={ClassicEditor}
                    onReady={(editor) => {
                        editorInstance.current = editor;
                        uploadPlugin(editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorData(data);
                    }}
                    data={editorData}
                />
                <div className="button-container1">
                    <button className="btn btn-secondary mx-2" onClick={handleToastClose} >Huỷ</button>
                    {detailExists ? ( // Hiển thị nút Submit nếu dữ liệu chi tiết đã tồn tại
                        <button className="btn btn-info" onClick={handleSendData}>Cập nhật</button>
                    ) : ( // Hiển thị nút Submit nếu dữ liệu chi tiết chưa tồn tại
                        <button className="btn btn-info" onClick={handleSendData}>Thêm</button>
                    )}
                </div>
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
                    onClose={handleToastCloseToast}
                />
            </div>
        </>
    );
}

function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return uploadAdapter(loader);
    };
}

export default ThemChiTiet;



