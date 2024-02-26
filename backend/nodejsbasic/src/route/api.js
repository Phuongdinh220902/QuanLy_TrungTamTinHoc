import express from "express";
import APIController from '../controller/APIController';
import multer from "multer";
import path from 'path'
import pool from '../configs/connectDB';
const formidable = require('formidable');
import { autUser } from '../middleware/autuser'
const XLSX = require("xlsx");
let router = express.Router();
const { parse, format } = require("date-fns");

const initAPIRoute = (app) => {

    router.get('/laydshv/:page/:tukhoa', APIController.laydshv)
    router.get('/laydsgv/:page/:tukhoa', APIController.laydsgv)
    router.post("/loginhv", APIController.loginhv)
    router.post("/loginadmin", autUser, APIController.loginadmin)
    router.post('/getMaXacNhan', APIController.getMaXacNhan)
    router.post("/deleteGV/:maGV", APIController.deleteGV)
    router.post('/themHV', APIController.themHV)
    router.post("/deleteHV/:maHV", APIController.deleteHV)
    router.post('/updateHV', APIController.updateHV)
    router.get('/laydskh/:page/:tukhoa', APIController.laydskh)
    router.post("/deleteKH/:maKH", APIController.deleteKH)
    router.get('/laydsLopHoc/:maKH/:page/:tukhoa', APIController.laydsLopHoc)
    router.post('/themLopHoc', APIController.themLopHoc)
    router.post("/deleteLH/:maLopHoc", APIController.deleteLH)
    router.post('/updateLH', APIController.updateLH)
    router.post("/deleteHVLopHoc/:maDSHV", APIController.deleteHVLopHoc)
    router.get('/DSGiangVien', APIController.DSGiangVien)
    router.get('/layHinhAnhGioiThieu/:page', APIController.layHinhAnhGioiThieu)
    router.post("/deleteHAQC/:maHinhAnhQC", APIController.deleteHAQC)
    router.get('/layMoTaKH/:maKH', APIController.layMoTaKH)
    router.post("/updateMoTa/:maND", APIController.updateMoTa)
    router.get('/lay1MoTaKH/:maND', APIController.lay1MoTaKH)
    router.post("/deleteMoTa/:maND", APIController.deleteMoTa)
    router.post('/updateHV1', APIController.updateHV1)
    router.post('/doiMatKhau', APIController.doiMatKhau)
    // USer
    router.get('/laydsHocVien/:maLopHoc/:page/:tukhoa', APIController.laydsHocVien)
    router.get('/layTrangChu', APIController.layTrangChu)
    router.get('/layTrangChuKhoaHoc', APIController.layTrangChuKhoaHoc)
    router.get('/layTrangChuGiangVien', APIController.layTrangChuGiangVien)
    router.get('/layHinhAnhTrangChu', APIController.layHinhAnhTrangChu)
    router.get('/layTrangChuCamNhan', APIController.layTrangChuCamNhan)

    router.post("/dangnhapnguoidung", APIController.dangnhapnguoidung)
    router.post('/dangkyTKNguoiDung', APIController.dangkyTKNguoiDung)
    router.get('/layKhoaHoc/:maKH', APIController.layKhoaHoc)
    router.get('/layLopHoc/:maKH', APIController.layLopHoc)
    router.get('/layGiangVien/:maGV', APIController.layGiangVien)
    router.get('/BoLocHocPhi', APIController.BoLocHocPhi)

    router.get('/layGioiThieuKhoaHoc/:maKH', APIController.layGioiThieuKhoaHoc)
    router.get('/layNoiDungKhoaHoc/:maKH', APIController.layNoiDungKhoaHoc)
    router.get('/layThongTinDiemThi', APIController.layThongTinDiemThi)
    router.post("/updateTTDT", APIController.updateTTDT)
    router.get('/layTrangCaNhanHV/:maHV', APIController.layTrangCaNhanHV)
    router.post("/SaveCheckboxStates", APIController.SaveCheckboxStates);
    router.post("/SaveCheckboxStatesLopHoc", APIController.SaveCheckboxStatesLopHoc);

    var filename = ''
    const upload = multer({
        storage: multer.diskStorage({
            destination: './src/public/images',
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


    router.post('/themKH', upload.single('file'), async (req, res) => {

        let { tenKH, hocphi, mota, monhoc, so_gio } = req.body;
        console.log(req.body);
        try {
            const [existingRows, existingFields] = await pool.execute("SELECT * FROM khoa_hoc WHERE tenKH = ?", [tenKH]);

            if (existingRows.length > 0) {
                return res.status(200).json({
                    'DT': "",
                    'EC': 1,
                    'EM': 'Tên khoá học đã tồn tại'
                });
            }
            // Thêm 
            await pool.execute("insert into khoa_hoc(tenKH, hocphi, mota, monhoc, so_gio) values (?, ?, ?, ?, ?)",
                [tenKH, hocphi, mota, monhoc, so_gio]
            );

            // Lấy khóa học vừa thêm
            const [newKhoaHoc] = await pool.execute("SELECT * FROM khoa_hoc WHERE tenKH = ?", [tenKH]);

            if (filename === undefined || filename === "" || filename === null) {
                filename = "hinhanhmacdinh.jpg";
            }

            // Thêm ảnh vào bảng hinh_anh
            await pool.execute(
                "INSERT INTO hinhanh_khoahoc (tenHinhAnhKH, maKH) VALUES (?, ?)",
                [filename, newKhoaHoc[0].maKH]
            );
            res.status(200).json({
                'DT': {
                    'tenKH': tenKH,
                    'hocphi': hocphi,
                    'mota': mota,
                    'monhoc': monhoc,
                    'so_gio': so_gio,
                },
                'EC': 0,
                'EM': 'Tạo thành công'
            });

        } catch (error) {
            console.log("Lỗi khi thêm khoá học: ", error);
            return res.status(500).json({ error: "Lỗi khi thêm khoá học" });
        }
    });

    router.post("/updateKH", upload.single("file"), async (req, res) => {
        let { maKH, tenKH, hocphi, mota, monhoc, so_gio, hocphisaukhigiam } = req.body;

        console.log(req.body);
        const { file } = req; // Lấy thông tin về file từ request
        let filename = file ? file.filename : undefined;

        try {
            // Kiểm tra xem file có tồn tại không và có thay đổi không
            // let filename = "";
            if (file && file.filename) {
                filename = file.filename;
            }

            // Cập nhật thông tin đoàn viên
            await pool.execute("UPDATE khoa_hoc SET tenKH = ?, hocphi =?, hocphisaukhigiam = ?, mota = ?, monhoc = ?, so_gio = ? WHERE maKH=?", [tenKH, hocphi, hocphisaukhigiam, mota, monhoc, so_gio, maKH])


            if (file && file.filename) {
                filename = file.filename;

                // Cập nhật tên ảnh trong bảng 'anh'
                await pool.execute("UPDATE hinhanh_khoahoc SET tenHinhAnhKH = ? WHERE maKH = ?", [
                    filename,
                    maKH,
                ]);
                console.log(filename)
            }

            return res.status(200).json({
                message: "Cập nhật thành công!",
            });
        } catch (error) {
            console.log("Không cập nhật được!", error);
            return res.status(500).json({ error: "Không hiển thị được!" });
        }
    });

    router.post("/updateGV", upload.single("file"), async (req, res) => {
        let { maGV, tenGV, email, sdt, ngaysinh, gioitinh } = req.body;

        console.log(req.body);
        const { file } = req; // Lấy thông tin về file từ request
        let filename = file ? file.filename : undefined;

        try {
            if (file && file.filename) {
                filename = file.filename;
            }

            // Cập nhật thông tin đoàn viên
            await pool.execute("UPDATE giang_vien SET tenGV = ?, email =?, sdt = ?, ngaysinh=STR_TO_DATE(?, '%Y-%m-%d'), gioitinh = ? WHERE maGV=?", [tenGV, email, sdt, ngaysinh, gioitinh, maGV])


            if (file && file.filename) {
                filename = file.filename;

                // Cập nhật tên ảnh trong bảng 'anh'
                await pool.execute("UPDATE hinh_anh SET tenHA = ? WHERE maGV = ?", [
                    filename,
                    maGV,
                ]);
                console.log(filename)
            }

            return res.status(200).json({
                message: "Cập nhật thành công!",
            });
        } catch (error) {
            console.log("Không cập nhật được!", error);
            return res.status(500).json({ error: "Không hiển thị được!" });
        }
    });

    router.post('/themHAQC', upload.single('file'), async (req, res) => {

        let { tenHinhAnhQC } = req.body;
        console.log(req.body);
        try {
            // Thêm ảnh vào bảng hinh_anh
            await pool.execute(
                "INSERT INTO anh_quangcao (tenHinhAnhQC) VALUES ( ?)",
                [filename]
            );
            res.status(200).json({
                'DT': {
                    'tenHinhAnhQC': tenHinhAnhQC
                },
                'EC': 0,
                'EM': 'Tạo thành công'
            });

        } catch (error) {
            console.log("Lỗi khi thêm khoá học: ", error);
            return res.status(500).json({ error: "Lỗi khi thêm khoá học" });
        }
    });

    router.post("/updateHAQC", upload.single("file"), async (req, res) => {
        let { maHinhAnhQC } = req.body;

        console.log(req.body);
        const { file } = req; // Lấy thông tin về file từ request
        let filename = file ? file.filename : undefined;

        try {

            if (file && file.filename) {
                filename = file.filename;

                // Cập nhật tên ảnh trong bảng 'anh'
                await pool.execute("UPDATE anh_quangcao SET tenHinhAnhQC = ? WHERE maHinhAnhQC = ?", [
                    filename,
                    maHinhAnhQC,
                ]);
                console.log(filename)
            }

            return res.status(200).json({
                message: "Cập nhật thành công!",
            });
        } catch (error) {
            console.log("Không cập nhật được!", error);
            return res.status(500).json({ error: "Không hiển thị được!" });
        }
    });

    // router.post('/themchitietkhoahoc', upload.single('file'), async (req, res) => {
    //     try {
    //         const content = req.body.content;
    //         const imageUrl = req.file.path;
    //         console.log(req.file.path)
    //         // Thực hiện lưu trữ dữ liệu vào CSDL MySQL
    //         // Trong thực tế, bạn cần thay thế các tham số kết nối CSDL của mình ở dòng sau
    //         await pool.execute("INSERT INTO chitiet_khoahoc (chitiet, anh) VALUES (?, ?)", [content, imageUrl]);

    //         // Trả về thông báo thành công nếu lưu trữ thành công
    //         res.status(200).json({ message: 'Data saved successfully' });
    //     } catch (error) {
    //         console.error('Error saving data:', error);
    //         res.status(500).json({ error: 'Error saving data' });
    //     }
    // });

    router.post('/uploadanhchitiet', upload.single('file'), async (req, res) => {
        let { anh } = req.body;
        console.log(req.body);
        try {
            await pool.execute(
                "INSERT INTO chitiet_khoahoc (anh) VALUES ( ?)",
                [filename]
            );
            res.status(200).json({
                'DT': {
                    'anh': anh
                },
                'EC': 0,
                'EM': 'Tạo thành công'
            });

        } catch (error) {
            console.log("Lỗi khi thêm khoá học: ", error);
            return res.status(500).json({ error: "Lỗi khi thêm khoá học" });
        }
    });

    router.post("/themmotakhoahoc", async (req, res) => {
        try {
            // const { maKH } = req.params; 
            let { maKH } = req.body;
            const { content } = req.body; // Lấy nội dung từ body của yêu cầu

            console.log("maKH:", maKH);
            console.log("Content:", content);

            // Thực hiện truy vấn SQL để chèn dữ liệu vào cơ sở dữ liệu
            await pool.execute(
                "INSERT INTO chitiet_khoahoc (maKH, chitiet) VALUES (?, ?)",
                [maKH, content]
            );

            res.json({ message: 'Data received successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    router.post("/themnoidungkhoahoc", async (req, res) => {
        try {
            // const { maKH } = req.params; 
            let { maKH } = req.body;
            const { content } = req.body; // Lấy nội dung từ body của yêu cầu
            const { title } = req.body;

            console.log("maKH:", maKH);
            console.log("title:", title);
            console.log("Content:", content);

            // Thực hiện truy vấn SQL để chèn dữ liệu vào cơ sở dữ liệu
            await pool.execute(
                "INSERT INTO noidung_khoahoc (maKH, tieude, noidung) VALUES (?, ?, ?)",
                [maKH, title, content]
            );

            res.json({ message: 'Data received successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });



    return app.use('/api/v1/', router)
}


// const storage = multer.memoryStorage();
// const upload1 = multer({ storage: storage });

// function ExcelDateToJSDate(serial) {
//     var utc_days = Math.floor(serial - 25569);
//     var utc_value = utc_days * 86400;
//     var date_info = new Date(utc_value * 1000);

//     var fractional_day = serial - Math.floor(serial) + 0.0000001;

//     var total_seconds = Math.floor(86400 * fractional_day);

//     var seconds = total_seconds % 60;

//     total_seconds -= seconds;

//     var hours = Math.floor(total_seconds / (60 * 60));
//     var minutes = Math.floor(total_seconds / 60) % 60;

//     return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
// }

// router.post(
//     "/ThemHocVienExcel",
//     upload1.single("file"),
//     async (req, res) => {
//         let { maLopHoc } = req.body;
//         console.log(req.body);

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
//                     tenHV,
//                     email,
//                     sdt,
//                     ngaysinh,
//                     gioitinh,
//                     hocphi,
//                     noisinh,
//                 } = row;

//                 console.log(row);

//                 console.log(typeof ngaysinh)
//                 console.log(ExcelDateToJSDate(ngaysinh))

//                 const trimmedHoten = String(tenHV).trim();
//                 const trimmedHocphi = String(hocphi).trim();
//                 const trimmedEmail = String(email).trim();
//                 const trimmedSdt = String(sdt).trim();
//                 const trimmedGioiTinhFromRow = String(gioitinh).trim();
//                 const trimmednoisinh = String(noisinh).trim();

//                 // const parsedNgaySinh = format(
//                 //     parse(ngaysinh, "dd/MM/yyyy", new Date()),
//                 //     "yyyy/MM/dd"
//                 // );

//                 // console.log(row);

//                 // try {
//                 //     let GioiTinh;

//                 //     if (trimmedGioiTinhFromRow === "Nữ") {
//                 //         GioiTinh = 0;
//                 //     } else if (trimmedGioiTinhFromRow === "Nam") {
//                 //         GioiTinh = 1;
//                 //     } 

//                 //     const [existingRows1, existingFields1] = await pool.execute(
//                 //         "SELECT * FROM hoc_vien WHERE hoc_vien.email = ?",
//                 //         [trimmedEmail]
//                 //     );

//                 //     if (existingRows1.length > 0) {
//                 //         const [existedNamHoc, existingNamHocFields1] = await pool.execute(
//                 //             "SELECT * FROM dshv WHERE dshv.maHV = ? and dshv.maLopHoc = ?",
//                 //             [existingRows1[0].maHV, maLopHoc]
//                 //         );

//                 //         if (existedNamHoc.length > 0) {
//                 //             console.log("da ton tai");
//                 //             res.status(500).json({ message: "da ton tai" });
//                 //             return;
//                 //         } else {
//                 //             await pool.execute(
//                 //                 "INSERT INTO dshv ( maHV, maLopHoc) VALUES (?, ?)",
//                 //                 [existingRows1[0].maHV, lop_hoc.maLopHoc, ]
//                 //             );
//                 //         }
//                 //     } else {
//                 //         const password = trimmedMSSV;
//                 //         const saltRounds = 10;
//                 //         const hashedPassword = await bcrypt.hash(password, saltRounds);

//                 //         const [resultDoanVien] = await pool.execute(
//                 //             "INSERT INTO hoc_vien (tenHV, email, sdt, ngaysinh, gioitinh, hocphi, noisinh) VALUES (?, ?, ?, ?, ?, ?, ?)",
//                 //             [
//                 //                 trimmedHoten,
//                 //                 trimmedEmail,
//                 //                 trimmedSdt,
//                 //                 parsedNgaySinh,
//                 //                 GioiTinh,
//                 //                 trimmedHocphi ,                            
//                 //                 trimmednoisinh,
//                 //                 // hashedPassword,
//                 //             ]
//                 //         );

//                 //         let IDDoanVien = resultDoanVien.insertId;

//                 //         await pool.execute(
//                 //             "INSERT INTO chitietnamhoc (IDDoanVien, IDChucVu, IDNamHoc) VALUES (?, ?, ?)",
//                 //             [IDDoanVien, chucvu[0].IDChucVu, idnamhoc]
//                 //         );

//                 //         console.log("them thanh cong");
//                 //     }
//                 // } catch (error) {
//                 //     console.error(error);
//                 //     res.status(500).json({ message: "Có lỗi xảy ra" });
//                 //     return;
//                 // }
//             }

//             res.status(200).json({ message: "Thêm nhiều đoàn viên thành công!" });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: "Có lỗi xảy ra" });
//         }
//     }
// );

export default initAPIRoute;