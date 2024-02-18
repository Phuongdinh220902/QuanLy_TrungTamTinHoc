
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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
    const [editorData, setEditorData] = useState(" ");
    const editorInstance = useRef(null);
    const { maKH } = useParams();
    const navigate = useNavigate();

    const handleSendData = async () => {
        try {
            const content = editorInstance.current.getData();
            const response = await axios.post(
                "http://localhost:2209/api/v1/themmotakhoahoc",
                { maKH, content },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
                console.log(maKH)
            );
            toast.success('Thêm thành công');
            setTimeout(() => {
                navigate('/khoahoc');
            }, 4000);

        } catch (error) {
            console.error("Error sending data:", error);
            toast.error('Lỗi khi thêm');
        }
    };

    const handleToastClose = () => {
        navigate('/khoahoc');
    };

    return (
        <>
            <div className="">
                <Link to={`/themnoidungkhoahoc/${maKH}`}>
                    <button style={{ marginLeft: '1200px', marginBottom: '10px' }} className="formatButton addButton">
                        Thêm nội dung khoá học
                    </button>
                </Link>
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
                    <button className="btn btn-info" onClick={handleSendData}>Submit</button>
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

export default ThemChiTiet;





