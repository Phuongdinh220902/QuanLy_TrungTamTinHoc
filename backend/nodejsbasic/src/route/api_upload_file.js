import express from "express";
import multer from "multer";
import pool from '../configs/connectDB';
const XLSX = require("xlsx");
let router = express.Router();
const { parse, format } = require("date-fns");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');

const initAPIRoute1 = (app) => {

    var filename = ''
    // const upload = multer({
    //     storage: multer.diskStorage({
    //         destination: './src/public/upload_file',
    //         filename: (req, file, cb) => {
    //             // tạo tên file duy nhất
    //             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //             const originalName = file.originalname;
    //             const extension = originalName.split('.').pop();
    //             cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    //             filename = file.fieldname + '-' + uniqueSuffix + '.' + extension
    //         }
    //     })
    // });

    const upload = multer({
        storage: multer.diskStorage({
            destination: './src/public/upload_file',
            filename: (req, file, cb) => {
                const originalName = file.originalname;
                const uploadPath = './src/public/upload_file/';

                // Kiểm tra xem tên file đã tồn tại trong thư mục hay chưa
                fs.readdir(uploadPath, (err, files) => {
                    if (err) {
                        console.error('Error checking directory for existing files:', err);
                        cb(err);
                        return;
                    }

                    let newFileName = originalName;

                    // Kiểm tra xem tên file đã tồn tại trong thư mục hay chưa
                    if (files.includes(newFileName)) {
                        let count = 1;
                        const fileNameParts = originalName.split('.');
                        const extension = fileNameParts.pop();
                        const baseName = fileNameParts.join('.');

                        // Tạo tên mới với số đằng sau
                        while (files.includes(newFileName)) {
                            newFileName = `${baseName}_${count}.${extension}`;
                            count++;
                        }
                    }

                    filename = newFileName;
                    cb(null, filename);
                });
            }
        })
    });


    router.post('/themthongbao1', upload.array('file'), async (req, res) => {

        let { maLopHoc, maGV, ngaydang } = req.body;
        const { noidung_thongbao } = req.body;
        const { tieude_thongbao } = req.body;

        try {

            // Thêm 
            await pool.execute(
                "INSERT INTO thongbao (tieude_thongbao, noidung_thongbao, maLopHoc, maGV, ngaydang) VALUES (?, ?, ?, ?, ?)",
                [tieude_thongbao, noidung_thongbao, maLopHoc, maGV, ngaydang]
            );

            // Lấy khóa học vừa thêm
            const [newTB] = await pool.execute("SELECT maTB FROM thongbao WHERE ngaydang = ?", [ngaydang]);

            // Thêm ảnh vào bảng hinh_anh
            await pool.execute(
                "INSERT INTO thongbao_file (tenFile, maGV, maTB) VALUES (?, ?, ?)",
                [filename, maGV, newTB[0].maTB]
            );
            res.status(200).json({
                'DT': {
                    'noidung_thongbao': noidung_thongbao,
                    'tieude_thongbao': tieude_thongbao,
                    'maLopHoc': maLopHoc,
                    'maGV': maGV,
                    'ngaydang': ngaydang,
                },
                'EC': 0,
                'EM': 'Tạo thành công'
            });

        } catch (error) {
            console.log("Lỗi khi thêm thông báo: ", error);
            return res.status(500).json({ error: "Lỗi khi thêm thông báo" });
        }
    });




    return app.use('/api/v1/', router)
}

export default initAPIRoute1;