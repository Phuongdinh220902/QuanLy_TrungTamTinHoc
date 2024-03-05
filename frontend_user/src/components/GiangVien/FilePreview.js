import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import DocViewer from '@cyntler/react-doc-viewer';

const FilePreview = () => {
    const [fileContent, setFileContent] = useState(null);
    const { tenFile } = useParams();

    useEffect(() => {
        const fetchFileContent = async () => {
            try {
                const response = await axios.get(`http://localhost:2209/upload_file/${tenFile}`, {
                    responseType: 'blob'
                });
                setFileContent(response.data);
            } catch (error) {
                console.error('Error fetching file content:', error);
            }
        };

        fetchFileContent();
    }, [tenFile]);

    const getFileType = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        if (extension === 'pdf') return 'pdf';
        if (extension === 'docx' || extension === 'doc') return 'docx';
        if (extension === 'xlsx' || extension === 'xls') return 'xlsx';
        return null;
    };

    const renderFileViewer = () => {
        const fileType = getFileType(tenFile);
        if (fileType === 'pdf' || fileType === 'docx') {
            return (
                <DocViewer
                    documents={[{ uri: URL.createObjectURL(fileContent), fileType }]}
                />
            );
        } else if (fileType === 'xlsx') {
            return (
                <DocViewer
                    documents={[{ uri: URL.createObjectURL(fileContent), fileType }]}
                />
            );
        } else {
            return <p>Unsupported file format</p>;
        }
    };

    return (
        <div>
            {fileContent && renderFileViewer()}
        </div>
    );
};


export default FilePreview;
