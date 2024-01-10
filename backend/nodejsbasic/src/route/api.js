import express from "express";
import APIController from '../controller/APIController';
import multer from "multer";
import path from 'path'
import pool from '../configs/connectDB';
const formidable = require('formidable');

let router = express.Router();

const initAPIRoute = (app) => {
    // router.post("/login", APIController.login)
    // 
    // router.get('/trangchu1', APIController.trangchu1)
    // router.get('/trangchu2', APIController.trangchu2)
    // router.post('/tthb', APIController.tthb)

    // router.post('/filtertenHB', APIController.filtertenHB)

    // router.get('/trangchusv', APIController.trangchusv)
    // router.post("/loginsv", APIController.loginsv)
    // router.post('/registersv', APIController.registersv)
    // router.post('/hsungtuyen', APIController.hsungtuyen)
    router.post('/dangkytk', APIController.dangkytk)
    router.post('/createKhoaHoc', APIController.createKhoaHoc)
    router.get('/laydshv/:page/:tukhoa', APIController.laydshv)
    router.get('/laydsgv/:page/:tukhoa', APIController.laydsgv)
    router.post("/loginhv", APIController.loginhv)
    router.post("/loginadmin", APIController.loginadmin)
    router.post('/updateGV', APIController.updateGV)
    router.post("/deleteGV/:maGV", APIController.deleteGV)
    router.post('/themHV', APIController.themHV)
    router.post("/deleteHV/:maHV", APIController.deleteHV)
    router.post('/updateHV', APIController.updateHV)
    router.get('/laydskh/:page/:tukhoa', APIController.laydskh)
    router.post("/deleteKH/:maKH", APIController.deleteKH)
    router.post('/updateKH', APIController.updateKH)
    router.post('/themKH', APIController.themKH)



    var filename = ''
    const upload = multer({
        storage: multer.diskStorage({
            destination: './src/public/ungtuyen',
            filename: (req, file, cb) => {
                // tạo tên file duy nhất
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const originalName = file.originalname;
                const extension = originalName.split('.').pop();
                cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
                filename = file.fieldname + '-' + uniqueSuffix + '.' + extension
            }
        })
    });

    router.post('/themgv', upload.single('file'), async (req, res) => {

        let { tenGV, email, sdt, ngaysinh, gioitinh } = req.body
        console.log(req.body)
        try {
            const [existingRows, existingFields] = await pool.execute("SELECT * FROM giang_vien WHERE email = ?", [email]);

            if (existingRows.length > 0) {
                return res.status(200).json({
                    'DT': "",
                    'EC': 1,
                    'EM': 'Email đã tồn tại'
                });
            }
            // Thêm giảng viên vào bảng giang_vien
            await pool.execute(
                "INSERT INTO giang_vien (tenGV, email, sdt, ngaysinh, gioitinh) VALUES (?, ?, ?, ?, ?)",
                [tenGV, email, sdt, ngaysinh, gioitinh]
            );

            // Lấy giảng viên vừa thêm
            const [newGiangVien] = await pool.execute("SELECT * FROM giang_vien WHERE email = ?", [email]);

            // Thêm ảnh vào bảng hinh_anh
            await pool.execute(
                "INSERT INTO hinh_anh (tenHA, maGV) VALUES (?, ?)",
                [filename, newGiangVien[0].maGV]
            );
            res.status(200).json({
                'DT': {
                    'tenGV': tenGV,
                    'email': email,
                    'sdt': sdt,
                    'ngaysinh': ngaysinh,
                    'gioitinh': gioitinh
                },
                'EC': 0,
                'EM': 'Tạo thành công'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    });

    return app.use('/api/v1/', router)
}

export default initAPIRoute;