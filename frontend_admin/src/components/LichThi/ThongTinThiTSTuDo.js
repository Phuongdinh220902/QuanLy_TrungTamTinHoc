import React, { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

function ThongTinLTTSTD() {
    const [editorData, setEditorData] = useState("");
    const editorInstance = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:2209/api/v1/layThongTinLTTSTD");
            const { ND } = response.data;

            if (ND && ND.length > 0 && ND[0].noidung) {
                setEditorData(ND[0].noidung);
            } else {
                console.error("Dữ liệu không hợp lệ từ API");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu: ", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.post("http://localhost:2209/api/v1/updateTTLTTSTD", {
                noidung: editorData
            });

            // Hiển thị thông báo thành công
            toast.success("Cập nhật thành công!");

            setTimeout(() => {
                navigate('/lichthi');
            }, 4000);

        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu: ", error);
            // Xử lý lỗi
        }
    };
    const handleToastClose = () => {
        navigate('/lichthi');
    };

    return (
        <>
            <div className="">
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
                <div className="button-container">
                    <button className="btn btn-info" onClick={handleUpdate}>Submit</button>
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

export default ThongTinLTTSTD;
