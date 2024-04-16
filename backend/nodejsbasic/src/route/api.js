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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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
    router.get('/layLichThi/:page/:tukhoa', APIController.layLichThi)
    router.get('/laydsCaThi/:maLichThi/:page/:tukhoa', APIController.laydsCaThi)
    router.post("/deleteLichThi/:maLichThi", APIController.deleteLichThi)
    router.post("/updateLichThi", APIController.updateLichThi)
    router.post("/updateCaThi", APIController.updateCaThi)
    router.post('/themLT', APIController.themLT)
    router.post("/deleteCaThi/:maCaThi", APIController.deleteCaThi)
    router.get('/laydsCamNhan/:maLopHoc/:page/:tukhoa', APIController.laydsCamNhan)
    router.get('/laydsCamNhanHienThi/:page/:tukhoa', APIController.laydsCamNhanHienThi)
    router.post('/TrangThaiCamNhan', APIController.TrangThaiCamNhan)

    router.get('/laydsHocVien/:maLopHoc/:page/:tukhoa', APIController.laydsHocVien)
    router.get('/laydsThiSinh/:maCaThi/:page/:tukhoa', APIController.laydsThiSinh)
    router.post("/deleteThiSinhDK/:maDSDK", APIController.deleteThiSinhDK)
    router.post("/SaveCheckboxStatesHPTS", APIController.SaveCheckboxStatesHPTS);
    router.post("/updateTrangThaiLichThi/:maLichThi", APIController.updateTrangThaiLichThi);
    router.get('/layThongTinLTTSTD', APIController.layThongTinLTTSTD)
    router.post("/updateTTLTTSTD", APIController.updateTTLTTSTD)

    router.post("/SaveCheckboxStates", APIController.SaveCheckboxStates);
    router.post("/SaveCheckboxStatesLopHoc", APIController.SaveCheckboxStatesLopHoc);
    router.post("/SaveCheckboxStatesLopHocBatDau", APIController.SaveCheckboxStatesLopHocBatDau);
    router.post("/SaveCheckboxStatesCamNhan", APIController.SaveCheckboxStatesCamNhan);

    router.get('/checkChiTietExists/:maKH', APIController.checkChiTietExists)
    router.post("/updateChiTietKhoaHoc/:maChiTiet", APIController.updateChiTietKhoaHoc);

    // USer
    router.get('/layTrangChu', APIController.layTrangChu)
    router.get('/layTrangChuKhoaHoc', APIController.layTrangChuKhoaHoc)
    router.get('/layTrangChuGiangVien', APIController.layTrangChuGiangVien)
    router.get('/layHinhAnhTrangChu', APIController.layHinhAnhTrangChu)
    router.get('/layTrangChuCamNhan', APIController.layTrangChuCamNhan)
    router.get('/layCaThiDK', APIController.layCaThiDK)


    // router.post("/dangnhapnguoidung", APIController.dangnhapnguoidung)
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
    router.get('/layThongBaoLopHocHV/:maLopHoc', APIController.layThongBaoLopHocHV)

    router.get('/layLopHocGiaoVien/:maLopHoc', APIController.layLopHocGiaoVien)
    router.get('/layLopHocGV/:maGV', APIController.layLopHocGV)



    router.get('/layKhoaHocDaDK/:maHV', APIController.layKhoaHocDaDK)
    router.get('/layThongTinTrangGiangVien/:maGV', APIController.layThongTinTrangGiangVien)
    router.get('/layThongBaoGV/:maLopHoc/:maGV', APIController.layThongBaoGV)
    router.get('/layThongBaoLopHoc/:maLopHoc', APIController.layThongBaoLopHoc)
    router.get('/layThongBaoLopHocChiTiet/:maTB', APIController.layThongBaoLopHocChiTiet)
    router.get('/layFile/:maTB', APIController.layFile)
    router.get('/layNguoiDung/:maLopHoc', APIController.layNguoiDung)
    router.get('/layTrangCaNhanGV/:maGV', APIController.layTrangCaNhanGV)
    router.post("/kiemtraDK", APIController.kiemtraDK)
    router.post("/themHocVienDKThi", APIController.themHocVienDKThi)
    router.get('/laydsCaThiND', APIController.laydsCaThiND)
    router.post("/DangKyLopHoc", APIController.DangKyLopHoc)
    router.post('/TimDiem', APIController.TimDiem)
    router.post('/TraCuuChungChi', APIController.TraCuuChungChi)

    router.post('/GuiCamNhan', APIController.GuiCamNhan)
    router.get('/KiemTraDanhGia', APIController.KiemTraDanhGia)

    router.get('/laydskh1/:tukhoa1', APIController.laydskh1)

    function generateToken(email, role) {
        const secretKey = "yourSecretKey"; // Replace with your actual secret key
        const token = jwt.sign({ email, role }, secretKey, { expiresIn: "1h" });
        return token;
    }

    router.post("/login", async (req, res) => {
        const { email, password } = req.body;
        console.log(req.body);

        try {
            const [HV, fields] = await pool.execute("SELECT maHV, tenHV, password, gioitinh FROM hoc_vien WHERE email = ?", [email]);
            console.log(password)
            if (HV.length > 0) {
                const maHV = HV[0].maHV;
                const tenHV = HV[0].tenHV;
                const gioitinh = HV[0].gioitinh;
                const hashedPassword = HV[0].password;

                const passwordMatch = await bcrypt.compare(password, hashedPassword);

                if (passwordMatch) {
                    const token = generateToken(HV[0].email, "HocVien");

                    return res.status(200).json({
                        maHV: maHV,
                        tenHV: tenHV,
                        gioitinh: gioitinh,
                        token: token
                    });
                }
            }
            const [GV, field] = await pool.execute(
                "SELECT giang_vien.maGV, tenGV, password, tenHA FROM giang_vien, hinh_anh WHERE email = ? and giang_vien.maGV = hinh_anh.maGV",
                [email]
            );

            if (GV.length > 0) {
                const maGV = GV[0].maGV;
                const tenGV = GV[0].tenGV;
                const tenHA = GV[0].tenHA;
                const hashedPassword = GV[0].password;
                const passwordMatch = await bcrypt.compare(password, hashedPassword);

                if (passwordMatch) {
                    const token = generateToken(GV[0].email, "GiangVien");

                    return res.status(200).json({
                        maGV: maGV,
                        tenGV: tenGV,
                        tenHA: tenHA,
                        token: token
                    });
                }
            }

            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    });

    function generateToken(email, role) {
        const secretKey = "yourSecretKey"; // Replace with your actual secret key
        const token = jwt.sign({ email, role }, secretKey, { expiresIn: "1h" });
        return token;
    }




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

    function generateRandomPassword(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < length; ++i) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }


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

            // Tạo mật khẩu ngẫu nhiên
            const password = generateRandomPassword(6);
            const hashedPassword = await bcrypt.hash(password, 10);
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                service: 'gmail',
                auth: {
                    user: "ld7941682@gmail.com",
                    pass: "ijippjqyfxuyqgxs",
                },
            });

            const mailOptions = {
                from: 'ld7941682@gmail.com',
                to: email,
                subject: ' Password',
                text: `Your password is: ${password}`,
            };

            await transporter.sendMail(mailOptions);
            // Thêm giảng viên vào bảng giang_vien
            await pool.execute(
                "INSERT INTO giang_vien (tenGV, email, sdt, ngaysinh, gioitinh, password) VALUES (?, ?, ?, ?, ?, ?)",
                [tenGV, email, sdt, ngaysinh, gioitinh, hashedPassword]
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
                    'gioitinh': gioitinh,
                    'password': password
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

        let { tenKH, hocphi, mota, so_gio } = req.body;
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
            await pool.execute("insert into khoa_hoc(tenKH, hocphi, mota, so_gio) values (?, ?, ?, ?)",
                [tenKH, hocphi, mota, so_gio]
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
        let { maKH, tenKH, hocphi, mota, so_gio, hocphisaukhigiam } = req.body;

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
            await pool.execute("UPDATE khoa_hoc SET tenKH = ?, hocphi =?, hocphisaukhigiam = ?, mota = ?, so_gio = ? WHERE maKH=?", [tenKH, hocphi, hocphisaukhigiam, mota, so_gio, maKH])


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

    router.post("/themchitietkhoahoc", async (req, res) => {
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

    //user
    router.post("/themthongbao", async (req, res) => {
        try {

            let { maLopHoc, maGV, ngaydang } = req.body;
            const { noidung_thongbao } = req.body;
            const { tieude_thongbao } = req.body;

            console.log("maLH:", maLopHoc);
            console.log("maGV:", maGV);
            console.log("title:", tieude_thongbao);
            console.log("Content:", noidung_thongbao);

            // Kiểm tra dữ liệu đầu vào
            if (!maLopHoc || !maGV || !noidung_thongbao || !tieude_thongbao) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            await pool.execute(
                "INSERT INTO thongbao (tieude_thongbao, noidung_thongbao, maLopHoc, maGV, ngaydang) VALUES (?, ?, ?, ?, ?)",
                [tieude_thongbao, noidung_thongbao, maLopHoc, maGV, ngaydang]
            );

            res.status(200).json({
                message: 'Data received successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    router.post("/updateGiangVien", upload.single("file"), async (req, res) => {
        let { maGV, tenGV, email, sdt, ngaysinh, gioitinh, mota, kinhnghiem, gioithieu } = req.body;

        console.log(req.body);
        const { file } = req; // Lấy thông tin về file từ request
        let filename = file ? file.filename : undefined;

        try {
            if (file && file.filename) {
                filename = file.filename;
            }

            // Cập nhật thông tin đoàn viên
            await pool.execute("UPDATE giang_vien SET tenGV = ?, email =?, sdt = ?, ngaysinh=STR_TO_DATE(?, '%Y-%m-%d'), gioitinh = ?, mota = ?,kinhnghiem = ?, gioithieu= ?  WHERE maGV = ? ", [tenGV, email, sdt, ngaysinh, gioitinh, mota, kinhnghiem, gioithieu, maGV])


            if (file && file.filename) {
                filename = file.filename;

                // Cập nhật tên ảnh trong bảng 'anh'
                await pool.execute("UPDATE hinh_anh SET tenHA = ? WHERE maGV = ?", [
                    filename,
                    maGV,
                ]);
                console.log(filename)
            }

            if (filename != undefined) {
                return res.status(200).json({
                    message: "Cập nhật thành công!",
                    tenHA: filename,
                    tenGV: tenGV,
                });
            }

            return res.status(200).json({
                message: "Cập nhật thành công!",
                tenGV: tenGV
            });
        } catch (error) {
            console.log("Không cập nhật được!", error);
            return res.status(500).json({ error: "Không hiển thị được!" });
        }
    });

    router.post("/updateHocVien", upload.single("file"), async (req, res) => {
        let { maHV, tenHV, email, sdt, ngaysinh, gioitinh, noisinh } = req.body;

        console.log(req.body);
        const { file } = req; // Lấy thông tin về file từ request
        let filename = file ? file.filename : undefined;

        try {
            if (file && file.filename) {
                filename = file.filename;
            }

            // Cập nhật thông tin đoàn viên
            await pool.execute("UPDATE hoc_vien SET tenHV = ?, email =?, sdt = ?, ngaysinh=STR_TO_DATE(?, '%Y-%m-%d'), gioitinh = ?, noisinh = ?  WHERE maHV = ? ", [tenHV, email, sdt, ngaysinh, gioitinh, noisinh, maHV])


            if (file && file.filename) {
                filename = file.filename;

                // Cập nhật tên ảnh trong bảng 'anh'
                await pool.execute("UPDATE hinhanh_hocvien SET tenHinhAnhHV = ? WHERE maHV = ?", [
                    filename,
                    maHV,
                ]);
                console.log(filename)
            }

            if (filename != undefined) {
                return res.status(200).json({
                    message: "Cập nhật thành công!",
                    tenHinhAnhHV: filename,
                    tenHV: tenHV,
                });
            }

            return res.status(200).json({
                message: "Cập nhật thành công!",
                tenHV: tenHV
            });
        } catch (error) {
            console.log("Không cập nhật được!", error);
            return res.status(500).json({ error: "Không hiển thị được!" });
        }
    });

    router.post('/themHACC', upload.single('file'), async (req, res) => {

        let { tenHinhAnhCC } = req.body;
        console.log(req.body);
        try {
            // Thêm ảnh vào bảng hinh_anh
            await pool.execute(
                "INSERT INTO chung_chi (tenHinhAnhCC) VALUES ( ?)",
                [filename]
            );
            res.status(200).json({
                'DT': {
                    'tenHinhAnhCC': tenHinhAnhCC
                },
                'EC': 0,
                'EM': 'Tạo thành công'
            });

        } catch (error) {
            console.log("Lỗi khi thêm khoá học: ", error);
            return res.status(500).json({ error: "Lỗi khi thêm khoá học" });
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