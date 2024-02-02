// import React, { useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import axios from 'axios';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

// const ThemChiTiet = () => {
//     const [editorData, setEditorData] = useState('');

//     const handleEditorChange = (event, editor) => {
//         const data = editor.getData();
//         setEditorData(data);
//     };

//     const handleImageUpload = async (file) => {
//         try {
//             const formData = new FormData();
//             formData.append('file', file);

//             // Gửi yêu cầu POST để tải lên ảnh lên server và lưu cả dữ liệu nhập liệu
//             const response = await axios.post('/api/v1/themchitietkhoahoc', {
//                 content: editorData,
//                 image: formData
//             }, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             console.log('Response from server:', response.data);
//         } catch (error) {
//             console.error('Error uploading image and saving data:', error);
//         }
//     };

//     const handleSubmit = () => {
//         // Gọi hàm handleImageUpload khi nút submit được nhấn
//         handleImageUpload();
//     };

//     return (
//         <div className="App">
//             <h2>Using CKEditor 5 build in React</h2>
//             <CKEditor
//                 editor={ClassicEditor}
//                 data={editorData}
//                 onChange={handleEditorChange}
//                 onBlur={(event, editor) => {
//                     console.log('Blur.', editor);
//                 }}
//                 onFocus={(event, editor) => {
//                     console.log('Focus.', editor);
//                 }}
//                 config={{
//                     plugins: [EasyImage, ImageUpload, Image, CloudServices, Essentials, Paragraph, Bold, Italic],
//                     toolbar: ['bold', 'italic'],
//                     image: {
//                         toolbar: ['imageTextAlternative'],
//                         upload: {
//                             handler: handleImageUpload,
//                             types: ['jpeg', 'png', 'gif', 'bmp', 'webp'],
//                         },
//                     },
//                 }}
//             />
//             <button onClick={handleSubmit}>Submit</button>
//         </div>
//     );
// }

// export default ThemChiTiet;

import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    const [editorData, setEditorData] = useState("<p>Hello world</p>");
    const editorInstance = useRef(null);
    const { maKH } = useParams(); // Lấy maKH từ URL
    const handleSendData = async () => {
        try {
            const content = editorInstance.current.getData();
            const response = await axios.post(
                "http://localhost:2209/api/v1/themchitietkhoahoc",
                { maKH, content },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
                console.log(maKH)
            );
            console.log("Response from server:", response.data);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
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
            <button onClick={handleSendData}>Submit</button>
        </div>
    );
}

function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return uploadAdapter(loader);
    };
}

export default ThemChiTiet;





