import express from "express";
import APIController from '../controller/APIController';
import multer from "multer";
import path from 'path'
import pool from '../configs/connectDB';
const formidable = require('formidable');
import { autUser } from '../middleware/autuser'

let router = express.Router();

const initAPIRoute = (app) => {

    router.post('/createKhoaHoc', APIController.createKhoaHoc)
    router.get('/laydshv/:page/:tukhoa', APIController.laydshv)
    router.get('/laydsgv/:page/:tukhoa', APIController.laydsgv)
    router.post("/loginhv", APIController.loginhv)
    router.post("/loginadmin", autUser, APIController.loginadmin)
    router.post('/updateGV', APIController.updateGV)
    router.post("/deleteGV/:maGV", APIController.deleteGV)
    router.post('/themHV', APIController.themHV)
    router.post("/deleteHV/:maHV", APIController.deleteHV)
    router.post('/updateHV', APIController.updateHV)
    router.get('/laydskh/:page/:tukhoa', APIController.laydskh)
    router.post("/deleteKH/:maKH", APIController.deleteKH)
    router.post('/updateKH', APIController.updateKH)
    router.post('/themKH', APIController.themKH)
    router.get('/laydsLopHoc/:maKH/:page/:tukhoa', APIController.laydsLopHoc)
    router.post("/deleteLH/:maLopHoc", APIController.deleteLH)
    router.post('/updateLH', APIController.updateLH)
    router.get('/DSGiangVien', APIController.DSGiangVien)
    router.get('/laydsHocVien/:maLopHoc/:page/:tukhoa', APIController.laydsHocVien)

    router.get('/layTrangChu', APIController.layTrangChu)
    router.get('/layTrangChuKhoaHoc', APIController.layTrangChuKhoaHoc)
    router.get('/layTrangChuGiangVien', APIController.layTrangChuGiangVien)

    router.post("/dangnhapnguoidung", APIController.dangnhapnguoidung)
    router.post('/dangkyTKNguoiDung', APIController.dangkyTKNguoiDung)


    var filename = ''
    const upload = multer({
        storage: multer.diskStorage({
            destination: './src/public/giangvien',
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

// const upload1 = multer({ storage: storage });

// router.post(
//     "/ThemHocVienExcel",
//     upload1.single("file"),
//     async (req, res) => {
//         let { maLopHoc } = req.body;
//         console.log(req.body);

//         maLopHoc = parseInt(maLopHoc, 10);

//         if (isNaN(maLopHoc)) {
//             console.error("Invalid maLopHoc:", req.body.maLopHoc);
//             res.status(400).json({ message: "Invalid maLopHoc" });
//             return;
//         }

//         try {
//             const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
//             const sheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[sheetName];
//             const data = XLSX.utils.sheet_to_json(worksheet);

//             for (const row of data) {
//                 const {
//                     MSSV,
//                     HoTen,
//                     Email,
//                     SoDienThoai,
//                     GioiTinh: GioiTinhFromRow,
//                     QueQuan,
//                     DanToc,
//                     TonGiao,
//                     NgaySinh,
//                     NgayVaoDoan,
//                     ChucVu,
//                 } = row;

//                 console.log(row);

//                 const trimmedMSSV = String(MSSV).trim();
//                 const trimmedHoTen = String(HoTen).trim();
//                 const trimmedEmail = String(Email).trim();
//                 const trimmedSoDienThoai = String(SoDienThoai).trim();
//                 const trimmedGioiTinhFromRow = String(GioiTinhFromRow).trim();
//                 const trimmedQueQuan = String(QueQuan).trim();
//                 const trimmedDanToc = String(DanToc).trim();
//                 const trimmedTonGiao = String(TonGiao).trim();
//                 const trimmedChucVu = String(ChucVu).trim();

//                 const parsedNgaySinh = format(
//                     parse(NgaySinh, "dd/MM/yyyy", new Date()),
//                     "yyyy/MM/dd"
//                 );
//                 const parsedNgayVaoDoan = format(
//                     parse(NgayVaoDoan, "dd/MM/yyyy", new Date()),
//                     "yyyy/MM/dd"
//                 );

//                 console.log(row);
//                 try {
//                     let GioiTinh;

//                     if (trimmedGioiTinhFromRow === "Nữ") {
//                         GioiTinh = 0;
//                     } else if (trimmedGioiTinhFromRow === "Nam") {
//                         GioiTinh = 1;
//                     } else {
//                         GioiTinh = 2;
//                     }

//                     const [dantoc, fieldsdantoc] = await pool.execute(
//                         "SELECT * FROM dantoc WHERE dantoc.tendantoc like ?",
//                         ["%" + trimmedDanToc + "%"]
//                     );

//                     const [tongiao, fieldsTongiao] = await pool.execute(
//                         "SELECT * FROM tongiao WHERE tongiao.tentongiao like ?",
//                         ["%" + trimmedTonGiao + "%"]
//                     );

//                     const [chucvu, fieldsChucvu] = await pool.execute(
//                         "SELECT * FROM chucvu WHERE chucvu.tencv like ?",
//                         ["%" + trimmedChucVu + "%"]
//                     );

//                     const [existingRows1, existingFields1] = await pool.execute(
//                         "SELECT * FROM doanvien WHERE doanvien.MSSV = ?",
//                         [trimmedMSSV]
//                     );

//                     if (existingRows1.length > 0) {
//                         const [existedNamHoc, existingNamHocFields1] = await pool.execute(
//                             "SELECT * FROM chitietnamhoc WHERE chitietnamhoc.IDDoanVien = ? and chitietnamhoc.idnamhoc = ?",
//                             [existingRows1[0].IDDoanVien, idnamhoc]
//                         );

//                         if (existedNamHoc.length > 0) {
//                             console.log("Nam Hoc va MSSV da ton tai");
//                             res.status(500).json({ message: "Nam Hoc va MSSV da ton tai" });
//                             return;
//                         } else {
//                             await pool.execute(
//                                 "INSERT INTO chitietnamhoc (IDDoanVien, IDChucVu, IDNamHoc) VALUES (?, ?, ?)",
//                                 [existingRows1[0].IDDoanVien, chucvu[0].IDChucVu, idnamhoc]
//                             );
//                         }
//                     } else {
//                         const [resultDoanVien] = await pool.execute(
//                             "INSERT INTO doanvien (maLopHoc, MSSV, HoTen, Email, SoDT, GioiTinh, QueQuan, IDDanToc, IDTonGiao, NgaySinh, NgayVaoDoan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//                             [
//                                 maLopHoc,
//                                 trimmedMSSV,
//                                 trimmedHoTen,
//                                 trimmedEmail,
//                                 trimmedSoDienThoai,
//                                 GioiTinh,
//                                 trimmedQueQuan,
//                                 dantoc[0].IDDanToc,
//                                 tongiao[0].IDTonGiao,
//                                 parsedNgaySinh,
//                                 parsedNgayVaoDoan,
//                             ]
//                         );

//                         let IDDoanVien = resultDoanVien.insertId;

//                         await pool.execute(
//                             "INSERT INTO chitietnamhoc (IDDoanVien, IDChucVu, IDNamHoc) VALUES (?, ?, ?)",
//                             [IDDoanVien, chucvu[0].IDChucVu, idnamhoc]
//                         );

//                         await pool.execute(
//                             "INSERT INTO anh (TenAnh, IDDoanVien) VALUES (?, ?)",
//                             ["logo.jpg", IDDoanVien]
//                         );

//                         console.log("them thanh cong");
//                     }
//                 } catch (error) {
//                     console.error(error);
//                     res.status(500).json({ message: "Có lỗi xảy ra" });
//                     return;
//                 }
//             }

//             res.status(200).json({ message: "Thêm nhiều đoàn viên thành công!" });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: "Có lỗi xảy ra" });
//         }
//     }
// );

export default initAPIRoute;