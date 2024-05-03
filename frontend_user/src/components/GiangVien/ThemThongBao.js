

import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import {
    faFileImport
} from "@fortawesome/free-solid-svg-icons";

function uploadAdapter(loader) {
    return loader.file.then(file1 => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function (event) {
                resolve({ default: event.target.result });
            };

            reader.onerror = function (error) {
                reject(error);
            };

            reader.readAsDataURL(file1);
        });
    });
}

function ThemThongBao() {
    const [editorData, setEditorData] = useState(" ");
    const editorInstance = useRef(null);
    const maGV = localStorage.getItem('maGV');
    const { maLopHoc } = useParams();
    const [tieude_thongbao, setTitle] = useState("")
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [previewFile, setPreviewFile] = useState('');

    const getCurrentDateTime = () => {
        const currentDateTime = new Date();
        const year = currentDateTime.getFullYear();
        const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
        const date = currentDateTime.getDate().toString().padStart(2, '0');
        const hours = currentDateTime.getHours().toString().padStart(2, '0');
        const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentDateTime.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    };

    const handleUpLoad = (event) => {
        if (event.target && event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
            const previews = selectedFiles.map(file => URL.createObjectURL(file));
            setPreviewFile(previews);
        }
    };


    const handleSendData = async () => {
        try {
            const formData = new FormData();
            const noidung_thongbao = editorInstance.current.getData();
            const ngaydang = getCurrentDateTime();
            formData.append('tieude_thongbao', tieude_thongbao);
            formData.append('noidung_thongbao', noidung_thongbao);
            formData.append('maLopHoc', maLopHoc);
            formData.append('maGV', maGV);
            formData.append('ngaydang', ngaydang);
            files.forEach((file, index) => {
                formData.append(`file`, file, file.name);
            });
            const response = await axios.post("http://localhost:2209/api/v1/themthongbao1", formData);
            console.log(maGV);
            console.log(maLopHoc);
            toast.success('Thêm thành công');
            setTimeout(() => {
                navigate(`/lophocgv/${maLopHoc}`);
            }, 4000);
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error('Lỗi khi thêm');
        }
    };

    const handleToastClose = () => {
        navigate(`/lophocgv/${maLopHoc}`);
    };

    return (
        <>

            <div className="">
                <div className="searchHV-input">
                    <h3>Tiêu Đề</h3>
                    <input
                        placeholder="Nhập tiêu đề"
                        type="text"
                        value={tieude_thongbao}
                        onChange={(e) => setTitle(e.target.value)}
                    />
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
                <div className="button-container d-flex justify-content-center" style={{ marginTop: '20px' }}>
                    <button className="btn btn-info mx-2" onClick={handleSendData}>Thêm</button>
                    <Link to={`/giangvien`}>
                        <button className="btn btn-info">Huỷ</button>
                    </Link>


                </div>
                <div>
                    <label className="form-label label-upload" htmlFor="labelUpload">
                        <FontAwesomeIcon icon={faFileImport} /> Tải file lên
                    </label>
                    <input type="file" id="labelUpload" hidden onChange={(event) => handleUpLoad(event)} />
                </div>

                <div className="file-info">
                    {files.length > 0 && (
                        <div>
                            <p>Các tệp đã chọn:</p>
                            <ul>
                                {files.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
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
                    onClose={handleToastClose}
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

export default ThemThongBao;





