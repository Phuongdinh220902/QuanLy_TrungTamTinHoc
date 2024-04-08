const { json } = require("body-parser")
import pool from '../configs/connectDB';
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
import autUser from '../middleware/autuser'

let loginhv = async (req, res) => {
    let { email, password } = req.body;
    const [rows, fields] = await pool.execute("SELECT * FROM hoc_vien WHERE email = ? and password = ?", [email, password])
    if (rows.length > 0) {
        return res.status(200).json({
            check: "1"
        })
    } else {
        return res.status(200).json({
            check: "0",
        })
    }
}

let loginadmin = async (req, res) => {
    let { email, password } = req.body;
    console.log(req.body)
    // Thực hiện truy vấn để kiểm tra thông tin đăng nhập
    const [rows, fields] = await pool.execute("SELECT * FROM admin WHERE email = ? and password = ?", [email, password]);

    if (rows.length > 0) {
        // Tạo JWT token nếu thông tin đăng nhập chính xác
        const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });

        return res.status(200).json({
            check: "1",
            token: token
        });
    } else {
        return res.status(200).json({
            check: "0",
        });
    }
}

let laydshv = async (req, res) => {
    try {
        let tukhoa = req.params.tukhoa

        if (tukhoa == "null" || !tukhoa) {
            const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
            const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

            const offset = (page - 1) * pageSize;

            const [sotrang, fields] = await pool.execute("SELECT * FROM hoc_vien where hoc_vien.trang_thai = 1");

            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT * FROM hoc_vien where hoc_vien.trang_thai = 1 LIMIT ? OFFSET ?", [
                    pageSize,
                    offset,

                ]),
            ]);

            if (result2[0] && result2[0].length > 0) {
                return res.status(200).json({
                    dataCD: result2[0],
                    totalPages: Math.ceil(sotrang.length / pageSize),
                    currentPage: page,
                });
            } else {
                console.log("Không tìm thấy kết quả");
                return res.status(200).json({
                    dataCD: [],
                    totalPages: 0,
                    currentPage: 1,
                });
            }
        }
        console.log(tukhoa)
        const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
        const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

        const offset = (page - 1) * pageSize;

        const [sotrang, fields] = await pool.execute(
            "SELECT * FROM hoc_vien WHERE hoc_vien.trang_thai = 1 AND (UPPER(hoc_vien.tenHV) LIKE UPPER(?) OR UPPER(hoc_vien.email) LIKE UPPER(?) OR UPPER(hoc_vien.sdt) LIKE UPPER(?))",
            ["%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT * FROM hoc_vien WHERE hoc_vien.trang_thai = 1 AND (UPPER(hoc_vien.tenHV) LIKE UPPER(?) OR UPPER(hoc_vien.email) LIKE UPPER(?) OR UPPER(hoc_vien.sdt) LIKE UPPER(?))",
                ["%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%"]
            ),
        ]);

        if (result2[0] && result2[0].length > 0) {
            return res.status(200).json({
                dataCD: result2[0],
                totalPages: Math.ceil(sotrang.length / pageSize),
                currentPage: page,
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
                totalPages: 0,
                currentPage: 1,
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};



let laydsgv = async (req, res) => {
    try {
        let tukhoa = req.params.tukhoa

        if (tukhoa == "null" || !tukhoa) {
            const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
            const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

            const offset = (page - 1) * pageSize;

            const [sotrang, fields] = await pool.execute("SELECT giang_vien.maGV, tenGV, email, sdt, DATE_FORMAT(STR_TO_DATE(ngaysinh, '%Y-%m-%d'), '%d-%m-%Y') AS ngaysinh, gioitinh, maHA, tenHA FROM giang_vien, hinh_anh where giang_vien.trang_thai = 1 and hinh_anh.maGV = giang_vien.maGV");

            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT giang_vien.maGV, tenGV, email, sdt, DATE_FORMAT(STR_TO_DATE(ngaysinh, '%Y-%m-%d'), '%d-%m-%Y') AS ngaysinh, gioitinh, maHA, tenHA FROM giang_vien, hinh_anh where giang_vien.trang_thai = 1 and hinh_anh.maGV = giang_vien.maGV LIMIT ? OFFSET ?", [
                    pageSize,
                    offset,

                ]),
            ]);

            if (result2[0] && result2[0].length > 0) {
                return res.status(200).json({
                    dataCD: result2[0],
                    totalPages: Math.ceil(sotrang.length / pageSize),
                    currentPage: page,
                });
            } else {
                console.log("Không tìm thấy kết quả");
                return res.status(200).json({
                    dataCD: [],
                    totalPages: 0,
                    currentPage: 1,
                });
            }
        }
        console.log(tukhoa)
        const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
        const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

        const offset = (page - 1) * pageSize;

        const [sotrang, fields] = await pool.execute(
            "SELECT giang_vien.maGV, tenGV, email, sdt, DATE_FORMAT(STR_TO_DATE(ngaysinh, '%Y-%m-%d'), '%d-%m-%Y') AS ngaysinh, gioitinh, maHA, tenHA FROM giang_vien, hinh_anh where giang_vien.trang_thai = 1 and hinh_anh.maGV = giang_vien.maGV AND (UPPER(giang_vien.tenGV) LIKE UPPER(?) OR UPPER(giang_vien.email) LIKE UPPER(?) OR UPPER(giang_vien.sdt) LIKE UPPER(?) OR UPPER(giang_vien.ngaysinh) LIKE UPPER(?))",
            ["%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT giang_vien.maGV, tenGV, email, sdt, DATE_FORMAT(STR_TO_DATE(ngaysinh, '%Y-%m-%d'), '%d-%m-%Y') AS ngaysinh, gioitinh, maHA, tenHA FROM giang_vien, hinh_anh where giang_vien.trang_thai = 1 and hinh_anh.maGV = giang_vien.maGV AND (UPPER(giang_vien.tenGV) LIKE UPPER(?) OR UPPER(giang_vien.email) LIKE UPPER(?) OR UPPER(giang_vien.sdt) LIKE UPPER(?) OR UPPER(giang_vien.ngaysinh) LIKE UPPER(?))",
                ["%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%"]
            ),
        ]);

        if (result2[0] && result2[0].length > 0) {
            return res.status(200).json({
                dataCD: result2[0],
                totalPages: Math.ceil(sotrang.length / pageSize),
                currentPage: page,
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
                totalPages: 0,
                currentPage: 1,
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};


// let updateGV = async (req, res) => {
//     let { maGV, tenGV, email, sdt, ngaysinh, gioitinh } = req.body;
//     console.log(req.body);
//     try {
//         const [rows, fields] = await pool.execute("UPDATE giang_vien SET tenGV = ?, email =?, sdt = ?, ngaysinh=STR_TO_DATE(?, '%Y-%m-%d'), gioitinh = ? WHERE maGV=?", [tenGV, email, sdt, ngaysinh, gioitinh, maGV])
//         return res.status(200).json({
//             "message": "Cập nhật thành công"
//         })
//     }
//     catch (error) {
//         console.log("Lỗi khi cập nhật học viên: ", error);
//         return res.status(500).json({ error: "Lỗi khi cập nhật học viên" });
//     }
// }

let deleteGV = async (req, res) => {
    let maGV = req.params.maGV;
    console.log("Mã giảng viên để xoá:", maGV);

    try {
        await pool.execute(
            "update giang_vien set giang_vien.trang_thai = 0 where giang_vien.maGV = ?", [maGV]);

        console.log("Xoa thanh cong");
        return res.status(200).json({
            message: "Xóa thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let themHV = async (req, res) => {
    console.log("ok")
    let { tenHV, email, sdt, ngaysinh, gioitinh, noisinh } = req.body;
    console.log(req.body);
    try {
        await pool.execute("insert into hoc_vien(tenHV, email, sdt, ngaysinh, gioitinh, noisinh) values (?, ?, ?, ?, ?, ?)",
            [tenHV, email, sdt, ngaysinh, gioitinh, noisinh]
        );

        res.status(200).json({
            'DT': {
                'tenHV': tenHV,
                'email': email,
                'sdt': sdt,
                'ngaysinh': ngaysinh,
                'gioitinh': gioitinh,
                'noisinh': noisinh,
            },
            'EC': 0,
            'EM': 'Tạo thành công'
        });
    } catch (error) {
        console.log("Lỗi khi thêm học viên: ", error);
        return res.status(500).json({ error: "Lỗi khi thêm học viên" });
    }
};

let deleteHV = async (req, res) => {
    console.log("ok");

    let maHV = req.params.maHV;
    console.log("Mã học viên để xoá:", maHV);

    try {
        await pool.execute(
            "update hoc_vien set hoc_vien.trang_thai = 0 where hoc_vien.maHV = ?", [maHV]);

        return res.status(200).json({
            message: "Xóa thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let updateHV = async (req, res) => {
    let { maHV, tenHV, email, sdt, gioitinh, noisinh } = req.body;
    console.log(req.body);
    try {
        const [rows, fields] = await pool.execute("UPDATE hoc_vien SET tenHV = ?, email =?, sdt = ?, gioitinh = ?, noisinh = ? WHERE maHV=?", [tenHV, email, sdt, gioitinh, noisinh, maHV])
        return res.status(200).json({
            "message": "Cập nhật thành công"
        })
    }
    catch (error) {
        console.log("Lỗi khi cập nhật học viên: ", error);
        return res.status(500).json({ error: "Lỗi khi cập nhật học viên" });
    }
}

let laydskh = async (req, res) => {
    try {
        let tukhoa = req.params.tukhoa

        if (tukhoa == "null" || !tukhoa) {
            const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
            const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

            const offset = (page - 1) * pageSize;

            const [sotrang, fields] = await pool.execute("SELECT khoa_hoc.maKH, tenKH, hocphi, hocphisaukhigiam, so_gio, mota, monhoc, tenHinhAnhKH, maHinhAnh FROM khoa_hoc, hinhanh_khoahoc where khoa_hoc.trang_thai = 1 and khoa_hoc.maKH = hinhanh_khoahoc.maKH");

            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT khoa_hoc.maKH, tenKH, hocphi,hocphisaukhigiam, so_gio, mota, monhoc, tenHinhAnhKH, maHinhAnh FROM khoa_hoc, hinhanh_khoahoc where khoa_hoc.trang_thai = 1 and khoa_hoc.maKH = hinhanh_khoahoc.maKH LIMIT ? OFFSET ?", [
                    pageSize,
                    offset,

                ]),
            ]);

            if (result2[0] && result2[0].length > 0) {
                return res.status(200).json({
                    dataCD: result2[0],
                    totalPages: Math.ceil(sotrang.length / pageSize),
                    currentPage: page,
                });
            } else {
                console.log("Không tìm thấy kết quả");
                return res.status(200).json({
                    dataCD: [],
                    totalPages: 0,
                    currentPage: 1,
                });
            }
        }
        console.log(tukhoa)
        console.log(sotrang)
        const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
        const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

        const offset = (page - 1) * pageSize;

        const [sotrang, fields] = await pool.execute(
            "SELECT khoa_hoc.maKH, tenKH, hocphi,hocphisaukhigiam, so_gio, mota, monhoc, tenHinhAnhKH, maHinhAnh FROM khoa_hoc, hinhanh_khoahoc where khoa_hoc.trang_thai = 1 and khoa_hoc.maKH = hinhanh_khoahoc.maKH AND (UPPER(khoa_hoc.tenKH) LIKE UPPER(?) OR UPPER(khoa_hoc.monhoc) LIKE UPPER(?) OR UPPER(khoa_hoc.so_gio) LIKE UPPER(?))",
            ["%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT khoa_hoc.maKH, tenKH, hocphi,hocphisaukhigiam, so_gio, mota, monhoc, tenHinhAnhKH, maHinhAnh FROM khoa_hoc, hinhanh_khoahoc where khoa_hoc.trang_thai = 1 and khoa_hoc.maKH = hinhanh_khoahoc.maKH AND (UPPER(khoa_hoc.tenKH) LIKE UPPER(?) OR UPPER(khoa_hoc.monhoc) LIKE UPPER(?) OR UPPER(khoa_hoc.so_gio) LIKE UPPER(?))",
                ["%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%"]
            ),
        ]);

        if (result2[0] && result2[0].length > 0) {
            return res.status(200).json({
                dataCD: result2[0],
                totalPages: Math.ceil(sotrang.length / pageSize),
                currentPage: page,
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
                totalPages: 0,
                currentPage: 1,
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};


let deleteKH = async (req, res) => {
    console.log("ok");

    let maKH = req.params.maKH;
    console.log("Mã học viên để xoá:", maKH);

    try {
        await pool.execute(
            "update khoa_hoc set khoa_hoc.trang_thai = 0 where khoa_hoc.maKH = ?", [maKH]);

        return res.status(200).json({
            message: "Xóa thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let createKhoaHoc = async (req, res) => {
    console.log(req.body);
    try {
        const { tenKH, hocphi, mota, maGV, monhoc } = req.body;

        if (!tenKH || !hocphi || !maGV || !monhoc) {
            return res.status(400).json({
                message: 'Missing required parameters'
            });
        }

        // Kiểm tra xem giảng viên với mã giảng viên (maGV) có tồn tại không
        const [giangVienRows, giangVienFields] = await pool.execute("SELECT * FROM giang_vien WHERE maGV = ?", [maGV]);
        if (giangVienRows.length === 0) {
            return res.status(400).json({
                message: 'Giảng viên không tồn tại'
            });
        }

        // Thêm khoá học vào cơ sở dữ liệu
        const query = 'INSERT INTO khoa_hoc(tenKH, hocphi, mota, maGV, monhoc) VALUES (?, ?, ?, ?, ?)';
        await pool.execute(query, [tenKH, hocphi, mota, maGV, monhoc]);

        return res.status(200).json({
            message: 'OK'
        });
    } catch (error) {
        console.error('Error while adding course:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// let updateKH = async (req, res) => {
//     let { maKH, tenKH, hocphi, mota, monhoc, so_gio } = req.body;
//     console.log(req.body);
//     try {
//         const [rows, fields] = await pool.execute("UPDATE khoa_hoc SET tenKH = ?, hocphi =?, mota = ?, monhoc = ?, so_gio = ? WHERE maKH=?", [tenKH, hocphi, mota, monhoc, so_gio, maKH])
//         return res.status(200).json({
//             "message": "Cập nhật thành công"
//         })
//     }
//     catch (error) {
//         console.log("Lỗi khi cập nhật khoá học: ", error);
//         return res.status(500).json({ error: "Lỗi khi cập nhật khoá học" });
//     }
// }

// let themKH = async (req, res) => {
//     console.log("ok")
//     let { tenKH, hocphi, mota, monhoc, so_gio } = req.body;
//     console.log(req.body);
//     try {
//         await pool.execute("insert into khoa_hoc(tenKH, hocphi, mota, monhoc, so_gio) values (?, ?, ?, ?, ?)",
//             [tenKH, hocphi, mota, monhoc, so_gio]
//         );

//         res.status(200).json({
//             'DT': {
//                 'tenKH': tenKH,
//                 'hocphi': hocphi,
//                 'mota': mota,
//                 'monhoc': monhoc,
//                 'so_gio': so_gio,
//             },
//             'EC': 0,
//             'EM': 'Tạo thành công'
//         });
//     } catch (error) {
//         console.log("Lỗi khi thêm khoá học: ", error);
//         return res.status(500).json({ error: "Lỗi khi thêm khoá học" });
//     }
// };

// let lay1KhoaHoc = async (req, res) => {
//     try {
//         const maKH = req.params.maKH;
//         const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
//         const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

//         const offset = (page - 1) * pageSize;

//         const [sotrang, fields] = await pool.execute(
//             "SELECT * FROM lop_hoc where khoa_hoc.maKH = ? and khoa_hoc.maKH = lop_hoc.maKH"
//         );

//         const [result1, result2] = await Promise.all([
//             pool.execute(
//                 "UPDATE hoatdong SET ttHD = CASE WHEN ttHD = 3 THEN 3 WHEN NgayBanHanh > CURRENT_DATE THEN 0 WHEN NgayBanHanh <= CURRENT_DATE AND NgayHetHan > CURRENT_DATE THEN 1 WHEN NgayHetHan < CURRENT_DATE THEN 2 END"
//             ),
//             pool.execute(
//                 "SELECT * FROM hoatdong where ttHD = 0 or ttHD = 1 or ttHD = 2 LIMIT ? OFFSET ?",
//                 [pageSize, offset]
//             ),
//         ]);

//         if (result2[0] && result2[0].length > 0) {
//             return res.status(200).json({
//                 dataHD: result2[0],
//                 totalPages: Math.ceil(sotrang.length / pageSize),
//                 currentPage: page,
//             });
//         } else {
//             console.log("Không tìm thấy kết quả");
//             return res.status(200).json({
//                 dataHD: [],
//                 totalPages: 0,
//                 currentPage: 1,
//             });
//         }
//     } catch (error) {
//         console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
//         return res.status(500).json({
//             error: "Lỗi khi truy vấn cơ sở dữ liệu",
//         });
//     }
// };
let DSGiangVien = async (req, res) => {
    const [dsGV, a] = await pool.execute("SELECT maGV, tenGV FROM giang_vien where giang_vien.trang_thai = 1");
    console.log(dsGV)
    return res.status(200).json({
        dsGV: dsGV
    });
}

let laydsLopHoc = async (req, res) => {
    const maKH = req.params.maKH;
    console.log(maKH);
    try {
        let tukhoa = req.params.tukhoa
        const [dsGV, a] = await pool.execute("SELECT maGV, tenGV FROM giang_vien where giang_vien.trang_thai = 1");
        // console.log(dsGV)
        if (tukhoa == "null" || !tukhoa) {
            const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
            const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

            const offset = (page - 1) * pageSize;

            const [sotrang, fields] = await pool.execute("SELECT maLopHoc, lop_hoc.maLH, lop_hoc.maKH, lop_hoc.maGV, lich_hoc.thoigian, lop_hoc.hoan_thanh,lop_hoc.bat_dau,tenGV, tenLopHoc, DATE_FORMAT(STR_TO_DATE(lich_hoc.ngay_batdau, '%Y-%m-%d'), '%d-%m-%Y') AS ngay_batdau , lich_hoc.diadiem FROM lop_hoc, giang_vien, lich_hoc where lop_hoc.maKH = ? and lop_hoc.trang_thai = 1 and lop_hoc.maGV = giang_vien.maGV and lop_hoc.maLH = lich_hoc.maLH", [maKH]);
            console.log(sotrang)
            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT maLopHoc, lop_hoc.maLH, lop_hoc.maKH, lop_hoc.maGV,lop_hoc.hoan_thanh, lich_hoc.thoigian, lop_hoc.bat_dau, tenGV, tenLopHoc,DATE_FORMAT(STR_TO_DATE(lich_hoc.ngay_batdau, '%Y-%m-%d'), '%d-%m-%Y') AS ngay_batdau , lich_hoc.diadiem FROM lop_hoc, giang_vien, lich_hoc where lop_hoc.maKH = ? and lop_hoc.trang_thai = 1 and lop_hoc.maGV = giang_vien.maGV and lop_hoc.maLH = lich_hoc.maLH LIMIT ? OFFSET ?", [
                    maKH,
                    pageSize,
                    offset,

                ]),
            ]);

            if (result2[0] && result2[0].length > 0) {
                return res.status(200).json({
                    dataCD: result2[0],
                    totalPages: Math.ceil(sotrang.length / pageSize),
                    currentPage: page,
                    dsGV: dsGV
                });
            } else {
                console.log("Không tìm thấy kết quả");
                return res.status(200).json({
                    dataCD: [],
                    totalPages: 0,
                    currentPage: 1,
                    dsGV: dsGV
                });
            }
        }
        // console.log(tukhoa)
        const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
        const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5
        const offset = (page - 1) * pageSize;

        const [sotrang, fields] = await pool.execute(
            "SELECT maLopHoc, lop_hoc.maLH, lop_hoc.maKH, lop_hoc.maGV, lich_hoc.thoigian,lop_hoc.hoan_thanh ,lop_hoc.bat_dau,tenGV, tenLopHoc, DATE_FORMAT(STR_TO_DATE(lich_hoc.ngay_batdau, '%Y-%m-%d'), '%d-%m-%Y') AS ngay_batdau, lich_hoc.diadiem FROM lop_hoc, giang_vien, lich_hoc where lop_hoc.maKH = ? and lop_hoc.trang_thai = 1 and lop_hoc.maGV = giang_vien.maGV and lop_hoc.maLH = lich_hoc.maLH AND (UPPER(lop_hoc.tenLopHoc) LIKE UPPER(?) OR UPPER(giang_vien.tenGV) LIKE UPPER(?))",
            [maKH, "%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT maLopHoc, lop_hoc.maLH, lop_hoc.maKH, lop_hoc.maGV, lich_hoc.thoigian ,lop_hoc.hoan_thanh, lop_hoc.bat_dau, tenGV, tenLopHoc, DATE_FORMAT(STR_TO_DATE(lich_hoc.ngay_batdau, '%Y-%m-%d'), '%d-%m-%Y') AS ngay_batdau, lich_hoc.diadiem FROM lop_hoc, giang_vien, lich_hoc where lop_hoc.maKH = ? and lop_hoc.trang_thai = 1 and lop_hoc.maGV = giang_vien.maGV and lop_hoc.maLH = lich_hoc.maLH AND (UPPER(lop_hoc.tenLopHoc) LIKE UPPER(?) OR UPPER(giang_vien.tenGV) LIKE UPPER(?))",
                [maKH, "%" + tukhoa + "%", "%" + tukhoa + "%"]
            ),
        ]);

        if (result2[0] && result2[0].length > 0) {
            return res.status(200).json({
                dataCD: result2[0],
                totalPages: Math.ceil(sotrang.length / pageSize),
                currentPage: page,
                dsGV: dsGV
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
                totalPages: 0,
                currentPage: 1,
                dsGV: dsGV
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let deleteLH = async (req, res) => {
    console.log("ok");

    let maLopHoc = req.params.maLopHoc;
    console.log("Mã lớp học để xoá:", maLopHoc);

    try {
        await pool.execute(
            "update lop_hoc set lop_hoc.trang_thai = 0 where lop_hoc.maLopHoc = ?", [maLopHoc]);

        return res.status(200).json({
            message: "Xóa thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let updateLH = async (req, res) => {
    let { maLopHoc, tenLopHoc, maGV, diadiem, ngay_batdau, thoigian } = req.body;
    console.log(req.body);
    try {
        const [rows, fields] = await pool.execute("UPDATE lop_hoc, lich_hoc SET tenLopHoc = ?, maGV = ?,  diadiem=?, thoigian=?, ngay_batdau=STR_TO_DATE(?, '%Y-%m-%d') WHERE maLopHoc=? and lop_hoc.maLH = lich_hoc.maLH", [tenLopHoc, maGV, diadiem, thoigian, ngay_batdau, maLopHoc])
        return res.status(200).json({
            "message": "Cập nhật thành công",
        })
    }
    catch (error) {
        console.log("Lỗi khi cập nhật khoá học: ", error);
        return res.status(500).json({ error: "Lỗi khi cập nhật khoá học" });
    }
}

let themLH = async (req, res) => {
    console.log("ok")
    let { maGV, maLH, maKH, tenLopHoc, trang_thai } = req.body;
    console.log(req.body);
    try {
        await pool.execute("insert into khoa_hoc(tenKH, hocphi, mota, monhoc, so_gio) values (?, ?, ?, ?, ?)",
            [tenKH, hocphi, mota, monhoc, so_gio]
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
};


let laydsHocVien = async (req, res) => {
    const maLopHoc = req.params.maLopHoc;
    console.log(maLopHoc);
    try {
        let tukhoa = req.params.tukhoa
        // console.log(dsGV)
        if (tukhoa == "null" || !tukhoa) {
            const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
            const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

            const offset = (page - 1) * pageSize;

            const [sotrang, fields] = await pool.execute("SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, tenHV, email, sdt, lop_hoc.maKH, khoa_hoc.hocphisaukhigiam, hoc_phi.maDSHV, hoc_phi.trang_thai, hoc_phi.maHP FROM dshv, lop_hoc, khoa_hoc, hoc_vien, hoc_phi where dshv.maLopHoc = ? and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and lop_hoc.maKH = khoa_hoc.maKH and dshv.maDSHV = hoc_phi.maDSHV", [maLopHoc]);
            console.log(sotrang)
            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, tenHV, email, sdt, lop_hoc.maKH, khoa_hoc.hocphisaukhigiam, hoc_phi.maDSHV, hoc_phi.trang_thai, hoc_phi.maHP FROM dshv, lop_hoc, khoa_hoc, hoc_vien, hoc_phi where dshv.maLopHoc = ? and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and lop_hoc.maKH = khoa_hoc.maKH and dshv.maDSHV = hoc_phi.maDSHV LIMIT ? OFFSET ?", [
                    maLopHoc,
                    pageSize,
                    offset,

                ]),
            ]);

            if (result2[0] && result2[0].length > 0) {
                return res.status(200).json({
                    dataCD: result2[0],
                    totalPages: Math.ceil(sotrang.length / pageSize),
                    currentPage: page,
                });
            } else {
                console.log("Không tìm thấy kết quả");
                return res.status(200).json({
                    dataCD: [],
                    totalPages: 0,
                    currentPage: 1,

                });
            }
        }
        // console.log(tukhoa)
        const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
        const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5
        const offset = (page - 1) * pageSize;

        const [sotrang, fields] = await pool.execute(
            "SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, tenHV, email, sdt, lop_hoc.maKH, khoa_hoc.hocphisaukhigiam, hoc_phi.maDSHV, hoc_phi.trang_thai, hoc_phi.maHP FROM dshv, lop_hoc, khoa_hoc, hoc_vien, hoc_phi where dshv.maLopHoc = ? and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and lop_hoc.maKH = khoa_hoc.maKH and dshv.maDSHV = hoc_phi.maDSHV AND (UPPER(hoc_vien.tenHV) LIKE UPPER(?) OR UPPER(hoc_vien.email) LIKE UPPER(?))",
            [maLopHoc, "%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, tenHV, email, sdt, lop_hoc.maKH, khoa_hoc.hocphisaukhigiam, hoc_phi.maDSHV, hoc_phi.trang_thai, hoc_phi.maHP FROM dshv, lop_hoc, khoa_hoc, hoc_vien, hoc_phi where dshv.maLopHoc = ? and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and lop_hoc.maKH = khoa_hoc.maKH and dshv.maDSHV = hoc_phi.maDSHV AND (UPPER(hoc_vien.tenHV) LIKE UPPER(?) OR UPPER(hoc_vien.email) LIKE UPPER(?))",
                [maLopHoc, "%" + tukhoa + "%", "%" + tukhoa + "%"]
            ),
        ]);

        if (result2[0] && result2[0].length > 0) {
            return res.status(200).json({
                dataCD: result2[0],
                totalPages: Math.ceil(sotrang.length / pageSize),
                currentPage: page,
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
                totalPages: 0,
                currentPage: 1,
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let deleteHVLopHoc = async (req, res) => {
    console.log("ok");

    let maDSHV = req.params.maDSHV;
    console.log("Mã lớp học để xoá:", maDSHV);

    try {
        await pool.execute(
            "update dshv set dshv.trang_thai = 0 where dshv.maDSHV = ?", [maDSHV]);

        return res.status(200).json({
            message: "Xóa thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let layLichThi = async (req, res) => {
    try {
        let tukhoa = req.params.tukhoa

        if (tukhoa == "null" || !tukhoa) {
            const page = parseInt(req.params.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 5;

            const offset = (page - 1) * pageSize;

            const [sotrang, fields] = await pool.execute("SELECT maLichThi, DATE_FORMAT(STR_TO_DATE(lich_thi.ngaythi, '%Y-%m-%d'), '%d-%m-%Y') AS ngaythi , DATE_FORMAT(STR_TO_DATE(lich_thi.ngayhethan, '%Y-%m-%d'), '%d-%m-%Y') AS ngayhethan, trang_thai, hocphi, batdau FROM lich_thi WHERE lich_thi.trang_thai = 1 ORDER BY lich_thi.batdau DESC, STR_TO_DATE(lich_thi.ngayhethan, '%Y-%m-%d') DESC");

            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT maLichThi, DATE_FORMAT(STR_TO_DATE(lich_thi.ngaythi, '%Y-%m-%d'), '%d-%m-%Y') AS ngaythi , DATE_FORMAT(STR_TO_DATE(lich_thi.ngayhethan, '%Y-%m-%d'), '%d-%m-%Y') AS ngayhethan, trang_thai, hocphi, batdau FROM lich_thi WHERE lich_thi.trang_thai = 1 ORDER BY lich_thi.batdau DESC, STR_TO_DATE(lich_thi.ngayhethan, '%Y-%m-%d') DESC LIMIT ? OFFSET ?", [
                    pageSize,
                    offset,

                ]),
            ]);

            if (result2[0] && result2[0].length > 0) {
                return res.status(200).json({
                    dataCD: result2[0],
                    totalPages: Math.ceil(sotrang.length / pageSize),
                    currentPage: page,
                });
            } else {
                console.log("Không tìm thấy kết quả");
                return res.status(200).json({
                    dataCD: [],
                    totalPages: 0,
                    currentPage: 1,
                });
            }
        }
        console.log(tukhoa)
        console.log(sotrang)
        const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
        const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

        const offset = (page - 1) * pageSize;

        const [sotrang, fields] = await pool.execute(
            "SELECT maLichThi, DATE_FORMAT(STR_TO_DATE(lich_thi.ngaythi, '%Y-%m-%d'), '%d-%m-%Y') AS ngaythi , DATE_FORMAT(STR_TO_DATE(lich_thi.ngayhethan, '%Y-%m-%d'), '%d-%m-%Y') AS ngayhethan, trang_thai, hocphi, batdau FROM lich_thi WHERE lich_thi.trang_thai = 1 AND (UPPER(lich_thi.ngaythi) LIKE UPPER(?) OR UPPER(lich_thi.ngayhethan) LIKE UPPER(?)) ORDER BY lich_thi.batdau DESC, STR_TO_DATE(lich_thi.ngayhethan, '%Y-%m-%d') DESC",
            ["%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT maLichThi, DATE_FORMAT(STR_TO_DATE(lich_thi.ngaythi, '%Y-%m-%d'), '%d-%m-%Y') AS ngaythi , DATE_FORMAT(STR_TO_DATE(lich_thi.ngayhethan, '%Y-%m-%d'), '%d-%m-%Y') AS ngayhethan, trang_thai, hocphi, batdau FROM lich_thi WHERE lich_thi.trang_thai = 1 AND (UPPER(lich_thi.ngaythi) LIKE UPPER(?) OR UPPER(lich_thi.ngayhethan) LIKE UPPER(?)) ORDER BY lich_thi.batdau DESC, STR_TO_DATE(lich_thi.ngayhethan, '%Y-%m-%d') DESC",
                ["%" + tukhoa + "%", "%" + tukhoa + "%"]
            ),
        ]);

        if (result2[0] && result2[0].length > 0) {
            return res.status(200).json({
                dataCD: result2[0],
                totalPages: Math.ceil(sotrang.length / pageSize),
                currentPage: page,
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
                totalPages: 0,
                currentPage: 1,
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let deleteLichThi = async (req, res) => {
    let maLichThi = req.params.maLichThi;
    console.log("Mã học viên để xoá:", maLichThi);

    try {
        await pool.execute(
            "update lich_thi set lich_thi.trang_thai = 0 where lich_thi.maLichThi = ?", [maLichThi]);

        return res.status(200).json({
            message: "Xóa thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let updateLichThi = async (req, res) => {
    let { maLichThi, ngaythi, hocphi, ngayhethan } = req.body;
    console.log(req.body);
    try {
        const [rows, fields] = await pool.execute("UPDATE lich_thi SET ngaythi = ?, hocphi = ?, ngayhethan = ? WHERE maLichThi = ? ", [ngaythi, hocphi, ngayhethan, maLichThi])
        return res.status(200).json({
            "message": "Cập nhật thành công",
        })
    }
    catch (error) {
        console.log("Lỗi khi cập nhật khoá học: ", error);
        return res.status(500).json({ error: "Lỗi khi cập nhật khoá học" });
    }
}

let updateTrangThaiLichThi = async (req, res) => {
    let { batdau } = req.body;
    let maLichThi = req.params.maLichThi;

    try {
        const [rows, fields] = await pool.execute("UPDATE lich_thi SET batdau = ? WHERE maLichThi = ?", [batdau, maLichThi]);
        return res.status(200).json({
            "message": "Cập nhật trạng thái thành công",
        });
    }
    catch (error) {
        console.log("Lỗi khi cập nhật trạng thái lịch thi: ", error);
        return res.status(500).json({ error: "Lỗi khi cập nhật trạng thái lịch thi" });
    }
}


let themLT = async (req, res) => {
    let { ngaythi, hocphi, ngayhethan } = req.body;
    console.log(req.body);
    try {
        await pool.execute("insert into lich_thi(ngaythi, hocphi, ngayhethan, batdau, trang_thai) values (?, ?, ?, 0, 1)",
            [ngaythi, hocphi, ngayhethan]
        );

        res.status(200).json({
            'DT': {
                'ngaythi': ngaythi,
                'hocphi': hocphi,
                'ngayhethan': ngayhethan
            },
            'EC': 0,
            'EM': 'Tạo thành công'
        });
    } catch (error) {
        console.log("Lỗi khi thêm khoá học: ", error);
        return res.status(500).json({ error: "Lỗi khi thêm khoá học" });
    }
};

let laydsCaThi = async (req, res) => {
    const maLichThi = req.params.maLichThi;
    console.log(maLichThi);
    try {
        let tukhoa = req.params.tukhoa
        // const [dsGV, a] = await pool.execute("SELECT maGV, tenGV FROM giang_vien where giang_vien.trang_thai = 1");
        // console.log(dsGV)
        if (tukhoa == "null" || !tukhoa) {
            const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
            const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

            const offset = (page - 1) * pageSize;

            const [sotrang, fields] = await pool.execute("SELECT maCaThi, thoigian, slDaDK, slToiDa, ca_thi.trang_thai, lich_thi.maLichThi FROM ca_thi, lich_thi where ca_thi.maLichThi = ? and ca_thi.trang_thai = 1 and ca_thi.maLichThi = lich_thi.maLichThi", [maLichThi]);
            console.log(sotrang)
            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT maCaThi, thoigian, slDaDK, slToiDa, ca_thi.trang_thai, lich_thi.maLichThi FROM ca_thi, lich_thi where ca_thi.maLichThi = ? and ca_thi.trang_thai = 1 and ca_thi.maLichThi = lich_thi.maLichThi LIMIT ? OFFSET ?", [
                    maLichThi,
                    pageSize,
                    offset,

                ]),
            ]);

            if (result2[0] && result2[0].length > 0) {
                return res.status(200).json({
                    dataCD: result2[0],
                    totalPages: Math.ceil(sotrang.length / pageSize),
                    currentPage: page,

                });
            } else {
                console.log("Không tìm thấy kết quả");
                return res.status(200).json({
                    dataCD: [],
                    totalPages: 0,
                    currentPage: 1,

                });
            }
        }
        // console.log(tukhoa)
        const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
        const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5
        const offset = (page - 1) * pageSize;

        const [sotrang, fields] = await pool.execute(
            "SELECT maCaThi, thoigian, slDaDK, slToiDa, ca_thi.trang_thai, lich_thi.maLichThi FROM ca_thi, lich_thi where ca_thi.maLichThi = ? and ca_thi.trang_thai = 1 and ca_thi.maLichThi = lich_thi.maLichThi AND (UPPER(ca_thi.thoigian) LIKE UPPER(?) OR UPPER(ca_thi.slDaDK) LIKE UPPER(?))",
            [maLichThi, "%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT maCaThi, thoigian, slDaDK, slToiDa, ca_thi.trang_thai, lich_thi.maLichThi FROM ca_thi, lich_thi where ca_thi.maLichThi = ? and ca_thi.trang_thai = 1 and ca_thi.maLichThi = lich_thi.maLichThi AND (UPPER(ca_thi.thoigian) LIKE UPPER(?) OR UPPER(ca_thi.slDaDK) LIKE UPPER(?))",
                [maLichThi, "%" + tukhoa + "%", "%" + tukhoa + "%"]
            ),
        ]);

        if (result2[0] && result2[0].length > 0) {
            return res.status(200).json({
                dataCD: result2[0],
                totalPages: Math.ceil(sotrang.length / pageSize),
                currentPage: page,

            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
                totalPages: 0,
                currentPage: 1,

            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let updateCaThi = async (req, res) => {
    let { maCaThi, thoigian, slDaDK, slToiDa } = req.body;
    console.log(req.body);
    try {
        const [rows, fields] = await pool.execute("UPDATE ca_thi SET thoigian=?, slDaDK = ?, slToiDa = ? WHERE maCaThi=? ", [thoigian, slDaDK, slToiDa, maCaThi])
        return res.status(200).json({
            "message": "Cập nhật thành công",
        })
    }
    catch (error) {
        console.log("Lỗi khi cập nhật khoá học: ", error);
        return res.status(500).json({ error: "Lỗi khi cập nhật khoá học" });
    }
}

let deleteCaThi = async (req, res) => {
    console.log("ok");

    let maCaThi = req.params.maCaThi;
    console.log("Mã lớp học để xoá:", maCaThi);

    try {
        await pool.execute(
            "update ca_thi set ca_thi.trang_thai = 0 where ca_thi.maCaThi = ?", [maCaThi]);

        return res.status(200).json({
            message: "Xóa thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let laydsThiSinh = async (req, res) => {
    const maCaThi = req.params.maCaThi;
    console.log(maCaThi);
    try {
        let tukhoa = req.params.tukhoa
        // console.log(dsGV)
        if (tukhoa == "null" || !tukhoa) {
            const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
            const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

            const offset = (page - 1) * pageSize;

            const [sotrang, fields] = await pool.execute("SELECT dsdkthi.maDSDK, dsdkthi.maThiSinh, dsdkthi.maCaThi, hoten, email, sdt, lich_thi.maLichThi, lich_thi.hocphi, hocphi_thisinh.maHocPhiTS, hocphi_thisinh.trang_thai, hocphi_thisinh.maDSDK FROM dsdkthi, lich_thi, thi_sinh, ca_thi, hocphi_thisinh where dsdkthi.maCaThi = ? and dsdkthi.trang_thai = 1 and dsdkthi.maThiSinh = thi_sinh.maThiSinh and dsdkthi.maCaThi = ca_thi.maCaThi and hocphi_thisinh.maDSDK = dsdkthi.maDSDK and lich_thi.maLichThi = ca_thi.maLichThi", [maCaThi]);
            console.log(sotrang)
            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT dsdkthi.maDSDK, dsdkthi.maThiSinh, dsdkthi.maCaThi, hoten, email, sdt, lich_thi.maLichThi, lich_thi.hocphi, hocphi_thisinh.maHocPhiTS, hocphi_thisinh.trang_thai, hocphi_thisinh.maDSDK FROM dsdkthi, lich_thi, thi_sinh, ca_thi, hocphi_thisinh where dsdkthi.maCaThi = ? and dsdkthi.trang_thai = 1 and dsdkthi.maThiSinh = thi_sinh.maThiSinh and dsdkthi.maCaThi = ca_thi.maCaThi and hocphi_thisinh.maDSDK = dsdkthi.maDSDK and lich_thi.maLichThi = ca_thi.maLichThi LIMIT ? OFFSET ?", [
                    maCaThi,
                    pageSize,
                    offset,

                ]),
            ]);

            if (result2[0] && result2[0].length > 0) {
                return res.status(200).json({
                    dataCD: result2[0],
                    totalPages: Math.ceil(sotrang.length / pageSize),
                    currentPage: page,
                });
            } else {
                console.log("Không tìm thấy kết quả");
                return res.status(200).json({
                    dataCD: [],
                    totalPages: 0,
                    currentPage: 1,

                });
            }
        }
        // console.log(tukhoa)
        const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
        const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5
        const offset = (page - 1) * pageSize;

        const [sotrang, fields] = await pool.execute(
            "SELECT dsdkthi.maDSDK, dsdkthi.maThiSinh, dsdkthi.maCaThi, hoten, email, sdt, lich_thi.maLichThi, lich_thi.hocphi, hocphi_thisinh.maHocPhiTS, hocphi_thisinh.trang_thai, hocphi_thisinh.maDSDK FROM dsdkthi, lich_thi, thi_sinh, ca_thi, hocphi_thisinh where dsdkthi.maCaThi = ? and dsdkthi.trang_thai = 1 and dsdkthi.maThiSinh = thi_sinh.maThiSinh and dsdkthi.maCaThi = ca_thi.maCaThi and hocphi_thisinh.maDSDK = dsdkthi.maDSDK and lich_thi.maLichThi = ca_thi.maLichThi AND (UPPER(thi_sinh.hoten) LIKE UPPER(?) OR UPPER(thi_sinh.email) LIKE UPPER(?))",
            [maCaThi, "%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT dsdkthi.maDSDK, dsdkthi.maThiSinh, dsdkthi.maCaThi, hoten, email, sdt, lich_thi.maLichThi, lich_thi.hocphi, hocphi_thisinh.maHocPhiTS, hocphi_thisinh.trang_thai, hocphi_thisinh.maDSDK FROM dsdkthi, lich_thi, thi_sinh, ca_thi, hocphi_thisinh where dsdkthi.maCaThi = ? and dsdkthi.trang_thai = 1 and dsdkthi.maThiSinh = thi_sinh.maThiSinh and dsdkthi.maCaThi = ca_thi.maCaThi and hocphi_thisinh.maDSDK = dsdkthi.maDSDK and lich_thi.maLichThi = ca_thi.maLichThi AND (UPPER(thi_sinh.hoten) LIKE UPPER(?) OR UPPER(thi_sinh.email) LIKE UPPER(?))",
                [maCaThi, "%" + tukhoa + "%", "%" + tukhoa + "%"]
            ),
        ]);

        if (result2[0] && result2[0].length > 0) {
            return res.status(200).json({
                dataCD: result2[0],
                totalPages: Math.ceil(sotrang.length / pageSize),
                currentPage: page,
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
                totalPages: 0,
                currentPage: 1,
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let deleteThiSinhDK = async (req, res) => {
    console.log("ok");

    let maDSDK = req.params.maDSDK;
    console.log("Mã lớp học để xoá:", maDSDK);

    try {
        await pool.execute(
            "update dsdkthi set dsdkthi.trang_thai = 0 where dsdkthi.maDSDK = ?", [maDSDK]);

        return res.status(200).json({
            message: "Xóa thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let SaveCheckboxStatesHPTS = async (req, res) => {
    let { maDSDK, isChecked } = req.body;

    console.log(req.body);
    console.log("+=============");
    console.log(isChecked);

    try {
        // Assuming checkboxStates is an array of objects with IDChiTietDoanPhi and isChecked
        for (let { maHocPhiTS, isChecked } of isChecked) {
            if (isChecked == false) {
                isChecked = 0;
            } else {
                isChecked = 1;
            }
            console.log(isChecked);
            await pool.execute(
                "UPDATE hocphi_thisinh SET trang_thai = ? WHERE maDSDK = ? and maHocPhiTS = ?",
                [isChecked, maDSDK, maHocPhiTS]
            );
        }

        return res.status(200).json({
            success: true,
            message: "Cập nhật thành công!",
        });
    } catch (error) {
        console.error("Error updating checkbox states:", error);
        return res.status(500).json({ message: "Cập nhật thành công!" });
    }
};

let themHocVienDKThi = async (req, res) => {
    console.log("ok")
    let { tenHV, email, sdt, ngaysinh, gioitinh, noisinh, dantoc, cccd, maCaThi } = req.body;
    try {
        const [existingData] = await pool.execute("SELECT email, cccd FROM thi_sinh, lich_thi, ca_thi WHERE lich_thi.batdau = 1 and ca_thi.maLichThi = lich_thi.maLichThi and thi_sinh.maCaThi = ca_thi.maCaThi AND email = ? AND cccd = ?", [email, cccd]);

        // Nếu không có dữ liệu trùng lặp, tiến hành thêm dữ liệu mới
        if (existingData.length === 0) {
            const [DSTS] = await pool.execute("INSERT INTO thi_sinh(hoten, email, sdt, ngaysinh, gioitinh, noisinh, dantoc, cccd, maCaThi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [tenHV, email, sdt, ngaysinh, gioitinh, noisinh, dantoc, cccd, maCaThi]
            );

            const maThiSinh = DSTS.insertId;
            console.log(maThiSinh, 'mathisinh')

            const [DSDK] = await pool.execute("INSERT INTO dsdkthi(maThiSinh, maCaThi, trang_thai) VALUES (?, ?, 1)",
                [maThiSinh, maCaThi]
            );

            const maDSDK = DSDK.insertId;
            console.log(maDSDK, 'maDSDK')

            await pool.execute("INSERT INTO hocphi_thisinh(maDSDK, trang_thai) VALUES (?, 1)",
                [maDSDK]
            );

            return res.status(200).json({
                'DT': {
                    'tenHV': tenHV,
                    'email': email,
                    'sdt': sdt,
                    'ngaysinh': ngaysinh,
                    'gioitinh': gioitinh,
                    'noisinh': noisinh,
                },
                'EC': 0,
                'EM': 'Tạo thành công'
            });
        }
        else {
            return res.status(400).send("Đăng ký thi thất bại! Bạn chỉ có thể đăng ký 1 ca thi trong lần thi này");
        }

    } catch (error) {
        console.log("Lỗi khi thêm học viên: ", error);
        return res.status(500).json({ error: "Lỗi khi thêm học viên" });
    }
};

let layThongTinLTTSTD = async (req, res) => {
    try {
        const [ND, a] = await pool.execute("SELECT noidung FROM thongtinlichthitstudo");
        return res.status(200).json({
            ND: ND
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let updateTTLTTSTD = async (req, res) => {
    let noidung = req.body.noidung;
    console.log("Nội dung:", noidung);
    try {
        await pool.execute(
            "update thongtinlichthitstudo set thongtinlichthitstudo.noidung = ? ", [noidung]);

        return res.status(200).json({
            message: "Update thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let laydsCaThiND = async (req, res) => {
    try {
        const [CT, fields] = await pool.execute("SELECT thoigian, ngayhethan, lich_thi.ngaythi, lich_thi.maLichThi, ca_thi.maCaThi FROM ca_thi, lich_thi where lich_thi.batdau = 1 and ca_thi.trang_thai = 1 and lich_thi.maLichThi = ca_thi.maLichThi");
        return res.status(200).json({
            CT: CT,
        })
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

// cảm nhận
let laydsCamNhan = async (req, res) => {
    const maLopHoc = req.params.maLopHoc;
    console.log(maLopHoc);
    try {
        let tukhoa = req.params.tukhoa
        // console.log(dsGV)
        if (tukhoa == "null" || !tukhoa) {
            const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
            const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

            const offset = (page - 1) * pageSize;

            const [sotrang, fields] = await pool.execute("SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, tenHV, email, sdt, cam_nhan.noidung, cam_nhan.nhan, cam_nhan.maCN, cam_nhan.hien_thi, cam_nhan.trang_thai, cam_nhan.da_hienthi,lop_hoc.trangthai_camnhan FROM dshv, lop_hoc, hoc_vien, cam_nhan where dshv.maLopHoc = ? and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and dshv.maDSHV = cam_nhan.maDSHV", [maLopHoc]);
            console.log(sotrang)
            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, tenHV, email, sdt, cam_nhan.noidung, cam_nhan.nhan, cam_nhan.maCN, cam_nhan.hien_thi, cam_nhan.trang_thai, cam_nhan.da_hienthi,lop_hoc.trangthai_camnhan FROM dshv, lop_hoc, hoc_vien, cam_nhan where dshv.maLopHoc = ? and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and dshv.maDSHV = cam_nhan.maDSHV LIMIT ? OFFSET ?", [
                    maLopHoc,
                    pageSize,
                    offset,

                ]),
            ]);

            if (result2[0] && result2[0].length > 0) {
                return res.status(200).json({
                    dataCD: result2[0],
                    totalPages: Math.ceil(sotrang.length / pageSize),
                    currentPage: page,
                });
            } else {
                console.log("Không tìm thấy kết quả");
                return res.status(200).json({
                    dataCD: [],
                    totalPages: 0,
                    currentPage: 1,

                });
            }
        }
        // console.log(tukhoa)
        const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
        const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5
        const offset = (page - 1) * pageSize;

        const [sotrang, fields] = await pool.execute(
            "SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, tenHV, email, sdt, cam_nhan.noidung, cam_nhan.nhan, cam_nhan.maCN, cam_nhan.hien_thi, cam_nhan.trang_thai, cam_nhan.da_hienthi,lop_hoc.trangthai_camnhan FROM dshv, lop_hoc, hoc_vien, cam_nhan where dshv.maLopHoc = ? and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and dshv.maDSHV = cam_nhan.maDSHV AND (UPPER(hoc_vien.tenHV) LIKE UPPER(?) OR UPPER(hoc_vien.sdt) LIKE UPPER(?) OR UPPER(hoc_vien.email) LIKE UPPER(?))",
            [maLopHoc, "%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, tenHV, email, sdt, cam_nhan.noidung, cam_nhan.nhan, cam_nhan.maCN, cam_nhan.hien_thi, cam_nhan.trang_thai, cam_nhan.da_hienthi,lop_hoc.trangthai_camnhan FROM dshv, lop_hoc, hoc_vien, cam_nhan where dshv.maLopHoc = ? and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and dshv.maDSHV = cam_nhan.maDSHV AND (UPPER(hoc_vien.tenHV) LIKE UPPER(?) OR UPPER(hoc_vien.email) LIKE UPPER(?) OR UPPER(hoc_vien.sdt) LIKE UPPER(?))",
                [maLopHoc, "%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%"]
            ),
        ]);

        if (result2[0] && result2[0].length > 0) {
            return res.status(200).json({
                dataCD: result2[0],
                totalPages: Math.ceil(sotrang.length / pageSize),
                currentPage: page,
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
                totalPages: 0,
                currentPage: 1,
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let SaveCheckboxStatesCamNhan = async (req, res) => {
    let { isChecked } = req.body;

    console.log(req.body);
    console.log("+=============");
    console.log(isChecked, 'hi');

    try {
        for (let { maCN, isChecked } of isChecked) {
            if (isChecked == false) {
                isChecked = 0;
                maCN = maCN;
            }
            else {
                isChecked = 1;
                maCN = maCN;
            }
            console.log(isChecked)

            await pool.execute(
                "UPDATE cam_nhan SET hien_thi = ?, da_hienthi = 1 WHERE maCN = ?",
                [isChecked, maCN]
            );
        }

        return res.status(200).json({
            success: true,
            message: "Cập nhật thành công!",
        });
    } catch (error) {
        console.error("Error updating checkbox states:", error);
        return res.status(500).json({ message: "Cập nhật thất bại!" });
    }
};

let TrangThaiCamNhan = async (req, res) => {
    let { trang_thai, maLopHoc } = req.body;

    try {
        await pool.execute(
            "UPDATE lop_hoc SET trangthai_camnhan = ? WHERE maLopHoc = ?",
            [trang_thai, maLopHoc]
        );

        return res.status(200).json({
            message: "Cập nhật thành công!",
        });
    } catch (error) {
        console.error("có lỗi xảy ra", error);
        return res.status(500).json({ message: "Cập nhật thất bại!" });
    }
};

//cảm nhận hiển thị
let laydsCamNhanHienThi = async (req, res) => {
    try {
        let tukhoa = req.params.tukhoa
        // console.log(dsGV)
        if (tukhoa == "null" || !tukhoa) {
            const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
            const pageSize = parseInt(req.query.pageSize) || 10; // Lấy số lượng mục trên mỗi trang, mặc định là 5

            const offset = (page - 1) * pageSize;

            const [sotrang, fields] = await pool.execute("SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, lop_hoc.tenLopHoc, tenHV, email, sdt, cam_nhan.noidung, cam_nhan.nhan, cam_nhan.hien_thi, cam_nhan.da_hienthi FROM dshv, lop_hoc, hoc_vien, cam_nhan where cam_nhan.da_hienthi = 1 and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and dshv.maDSHV = cam_nhan.maDSHV ORDER BY cam_nhan.hien_thi DESC");
            console.log(sotrang)
            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, lop_hoc.tenLopHoc,tenHV, email, sdt, cam_nhan.noidung, cam_nhan.nhan, cam_nhan.hien_thi, cam_nhan.da_hienthi FROM dshv, lop_hoc, hoc_vien, cam_nhan where cam_nhan.da_hienthi = 1 and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and dshv.maDSHV = cam_nhan.maDSHV ORDER BY cam_nhan.hien_thi DESC LIMIT ? OFFSET ?", [
                    pageSize,
                    offset,
                ]),
            ]);

            if (result2[0] && result2[0].length > 0) {
                return res.status(200).json({
                    dataCD: result2[0],
                    totalPages: Math.ceil(sotrang.length / pageSize),
                    currentPage: page,
                });
            } else {
                console.log("Không tìm thấy kết quả");
                return res.status(200).json({
                    dataCD: [],
                    totalPages: 0,
                    currentPage: 1,

                });
            }
        }
        // console.log(tukhoa)
        const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Lấy số lượng mục trên mỗi trang, mặc định là 5
        const offset = (page - 1) * pageSize;

        const [sotrang, fields] = await pool.execute(
            "SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, lop_hoc.tenLopHoc,tenHV, email, sdt, cam_nhan.noidung, cam_nhan.nhan, cam_nhan.hien_thi, cam_nhan.da_hienthi FROM dshv, lop_hoc, hoc_vien, cam_nhan where cam_nhan.da_hienthi = 1 and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and dshv.maDSHV = cam_nhan.maDSHV ORDER BY cam_nhan.hien_thi DESC AND (UPPER(hoc_vien.tenHV) LIKE UPPER(?) OR UPPER(hoc_vien.sdt) LIKE UPPER(?) OR UPPER(hoc_vien.email) LIKE UPPER(?) OR UPPER(lop_hoc.tenLopHoc) LIKE UPPER(?))",
            ["%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT dshv.maDSHV, dshv.maLopHoc, dshv.maHV, lop_hoc.tenLopHoc,tenHV, email, sdt, cam_nhan.noidung, cam_nhan.nhan, cam_nhan.hien_thi, cam_nhan.da_hienthi FROM dshv, lop_hoc, hoc_vien, cam_nhan where cam_nhan.da_hienthi = 1 and dshv.trang_thai = 1 and dshv.maLopHoc = lop_hoc.maLopHoc and dshv.maHV = hoc_vien.maHV and dshv.maDSHV = cam_nhan.maDSHV ORDER BY cam_nhan.hien_thi DESC AND (UPPER(hoc_vien.tenHV) LIKE UPPER(?) OR UPPER(hoc_vien.sdt) LIKE UPPER(?) OR UPPER(hoc_vien.email) LIKE UPPER(?) OR UPPER(lop_hoc.tenLopHoc) LIKE UPPER(?))",
                ["%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%"]
            ),
        ]);

        if (result2[0] && result2[0].length > 0) {
            return res.status(200).json({
                dataCD: result2[0],
                totalPages: Math.ceil(sotrang.length / pageSize),
                currentPage: page,
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
                totalPages: 0,
                currentPage: 1,
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};




// người dùng

let layTrangChu = async (req, res) => {

    try {
        const [dsKH, a] = await pool.execute("SELECT maKH, tenKH FROM khoa_hoc where khoa_hoc.trang_thai = 1");
        for (let i = 0; i < dsKH.length; i++) {
            const [dsLH, a] = await pool.execute("SELECT maLopHoc, tenLopHoc FROM lop_hoc where lop_hoc.trang_thai = 1 and lop_hoc.maKH=?", [dsKH[i]['maKH']]);
            dsKH[i]['dsLH'] = dsLH
        }
        return res.status(200).json({
            dsKH: dsKH
        });
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layTrangChuKhoaHoc = async (req, res) => {

    try {
        const [TCKH, a] = await pool.execute("SELECT khoa_hoc.maKH, tenKH, hocphi,hocphisaukhigiam, mota, so_gio,tenHinhAnhKH, maHinhAnh FROM khoa_hoc, hinhanh_khoahoc where khoa_hoc.trang_thai = 1 and khoa_hoc.maKH = hinhanh_khoahoc.maKH");
        return res.status(200).json({
            TCKH: TCKH
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layTrangChuGiangVien = async (req, res) => {
    try {
        const [TCGV, a] = await pool.execute("SELECT giang_vien.maGV, tenGV, tenHA, maHA FROM giang_vien, hinh_anh where giang_vien.trang_thai = 1 and giang_vien.maGV = hinh_anh.maGV");
        return res.status(200).json({
            TCGV: TCGV
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};
// let dangkyTKNguoiDung = async (req, res) => {
//     console.log("ok")
//     let { tenHV, email, sdt, ngaysinh, gioitinh, noisinh, password } = req.body;
//     console.log(req.body);
//     try {
//         await pool.execute("insert into hoc_vien(tenHV, email, sdt, ngaysinh, gioitinh, noisinh, password) values (?, ?, ?, ?, ?, ?, ?)",
//             [tenHV, email, sdt, ngaysinh, gioitinh, noisinh, password]
//         );

//         return res.status(200).json({
//             // 'DT': {
//             //     'tenHV': tenHV,
//             //     'email': email,
//             //     'sdt': sdt,
//             //     'ngaysinh': ngaysinh,
//             //     'gioitinh': gioitinh,
//             //     'noisinh': noisinh,
//             //     'password': password,
//             // },
//             // 'EC': 0,
//             // 'EM': 'Tạo thành công'
//         });
//     } catch (error) {
//         console.log("Lỗi khi thêm học viên: ", error);
//         return res.status(500).json({ error: "Lỗi khi thêm học viên" });
//     }
// };

const bcrypt = require('bcrypt');

let dangkyTKNguoiDung = async (req, res) => {
    let { tenHV, email, sdt, ngaysinh, gioitinh, noisinh, password } = req.body;

    const [existingRows, existingFields] = await pool.execute("SELECT * FROM hoc_vien WHERE email = ? ", [email]);
    const [existingRows1, existingFields1] = await pool.execute("SELECT * FROM hoc_vien WHERE sdt = ? ", [sdt]);

    if (existingRows.length > 0) {
        console.log("Email đã tồn tại")
        return res.status(400).json({
            message: "Email đã tồn tại",
        });
    }
    if (existingRows1.length > 0) {
        console.log("Số điện thoại đã tồn tại")
        return res.status(400).json({
            message: "Số điện thoại đã tồn tại",
        });
    }

    try {
        // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(password, 10);

        const [rows, fields] = await pool.execute(
            "INSERT INTO hoc_vien (tenHV, email, sdt, ngaysinh, gioitinh, noisinh, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [tenHV, email, sdt, ngaysinh, gioitinh, noisinh, hashedPassword]
        );
        console.log("ok thanh cong")

        return res.status(200).json({
            message: "Đăng ký thành công"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Có lỗi xảy ra trong quá trình đăng ký",
        });
    }
}

let getMaXacNhan = async (req, res) => {
    let email = req.body.email
    // let testAccount = await nodemailer.createTestAccount();
    const generateVerificationCode = (length) => {
        // return Math.floor(1000 + Math.random() * 9000).toString();
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const verificationCode = generateVerificationCode(6);
    const pwdHash = await bcrypt.hash(verificationCode, 10);


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

    const [r1, f1] = await pool.execute("SELECT * FROM hoc_vien WHERE email = ?", [email])
    console.log(email)
    if (r1.length == 0) {
        console.log("email ko ton tai")
        return res.status(404).json({
            msg: "Email không tồn tại"
        })
    }

    // const [r2, f2] = await pool.execute("UPDATE users set maxacnhan=? where email = ?", [verificationCode, email])
    const [r2, f2] = await pool.execute('SELECT password FROM hoc_vien WHERE email = ?', [email])

    const old_password = r2[0].password
    // console.log(old_password)
    await pool.execute("UPDATE hoc_vien SET password = ? WHERE email = ?", [pwdHash, email])
    const mailOptions = {
        from: 'ld7941682@gmail.com',
        to: email,
        subject: 'New Password',
        text: `Your new password is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.log(error);
            await pool.execute("UPDATE hoc_vien SET password = ? WHERE email = ?", [
                old_password,
                email,
            ]);
            return res.status(404).json({ msg: "Gui mat khau that bai" });
        } else {
            console.log("Ok")
            return res.status(200).json({ msg: "Thanh cong" });
        }
    });
}

let dangnhapnguoidung = async (req, res) => {
    let { email, password } = req.body;
    // Thực hiện truy vấn để lấy mật khẩu đã hash từ cơ sở dữ liệu
    const [rows, fields] = await pool.execute("SELECT maHV, tenHV, password, gioitinh FROM hoc_vien WHERE email = ?", [email]);
    console.log(password)
    if (rows.length > 0) {
        const hashedPassword = rows[0].password;
        const maHV = rows[0].maHV;
        const tenHV = rows[0].tenHV;
        const gioitinh = rows[0].gioitinh;
        // So sánh mật khẩu đã hash với mật khẩu người dùng nhập vào
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            // Tạo JWT token nếu thông tin đăng nhập chính xác
            const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });

            return res.status(200).json({
                maHV: maHV,
                tenHV: tenHV,
                gioitinh: gioitinh,
                token: token
            });
        } else {
            return res.status(401).json({
                error: "Thông tin đăng nhập không đúng",
            });
        }
    } else {
        return res.status(401).json({
            error: "Thông tin đăng nhập không đúng",
        });
    }
}

let layKhoaHoc = async (req, res) => {
    const maKH = req.params.maKH;
    try {
        const [TCKH, a] = await pool.execute("SELECT * FROM khoa_hoc where khoa_hoc.maKH = ? and khoa_hoc.trang_thai = 1", [maKH]);
        return res.status(200).json({
            TCKH: TCKH,
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layGiangVien = async (req, res) => {
    const maGV = req.params.maGV;
    try {
        const [TCGV, a] = await pool.execute("SELECT giang_vien.maGV, tenGV, gioithieu, kinhnghiem, mota, tenHA, maHA FROM giang_vien, hinh_anh where giang_vien.maGV = ? and giang_vien.trang_thai = 1 and giang_vien.maGV = hinh_anh.maGV ", [maGV]);
        return res.status(200).json({
            TCGV: TCGV,
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layLopHoc = async (req, res) => {
    const maKH = req.params.maKH;
    console.log(maKH);
    try {
        const [LH, fields] = await pool.execute("SELECT maLopHoc, lop_hoc.maLH, lop_hoc.maKH, lop_hoc.maGV, lich_hoc.thoigian, tenGV, tenLopHoc, DATE_FORMAT(STR_TO_DATE(lich_hoc.ngay_batdau, '%Y-%m-%d'), '%d-%m-%Y') AS ngay_batdau , lich_hoc.diadiem FROM lop_hoc, giang_vien, lich_hoc where lop_hoc.maKH = ? and lop_hoc.trang_thai = 1 and lop_hoc.maGV = giang_vien.maGV and lop_hoc.maLH = lich_hoc.maLH", [maKH]);
        return res.status(200).json({
            LH: LH,
        })
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};


let themLopHoc = async (req, res) => {
    let { maKH, tenLopHoc, slHVToiDa, ngay_batdau, diadiem, maGV, thoigian, hanDK } = req.body;

    try {
        console.log(req.body); // Kiểm tra dữ liệu nhận được từ request

        // Thêm thông tin vào bảng NgayHoc
        await pool.execute("INSERT INTO lich_hoc(ngay_batdau, thoigian, diadiem) VALUES (?, ?, ?)", [ngay_batdau, thoigian, diadiem]);
        // Lấy mã lịch học vừa thêm
        const [ngayHocRow] = await pool.execute("SELECT LAST_INSERT_ID() AS maLH");
        const maLH = ngayHocRow[0].maLH;

        console.log(maLH);

        // Thêm thông tin vào bảng LopHoc
        await pool.execute("INSERT INTO lop_hoc(maKH, tenLopHoc, slHVToiDa, maGV, maLH, hanDK) VALUES (?, ?, ?, ?, ?, ?)",
            [maKH, tenLopHoc, slHVToiDa, maGV, maLH, hanDK]);

        res.status(200).json({
            'DT': {
                'maKH': maKH,
                'tenLopHoc': tenLopHoc,
                'slHVToiDa': slHVToiDa,
                'maGV': maGV,
                'ngay_batdau': ngay_batdau,
                'diadiem': diadiem,
                'thoigian': thoigian,
                'hanDK': hanDK,
            },
            'EC': 0,
            'EM': 'Tạo lớp học thành công',
        });
    } catch (error) {
        console.log("Lỗi khi thêm lớp học: ", error);
        return res.status(500).json({ error: "Lỗi khi thêm lớp học" });
    }
};

let layHinhAnhGioiThieu = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1; // Lấy trang từ query parameters, mặc định là trang 1
        const pageSize = parseInt(req.query.pageSize) || 5; // Lấy số lượng mục trên mỗi trang, mặc định là 5

        const offset = (page - 1) * pageSize;

        const [sotrang, fields] = await pool.execute("SELECT * FROM anh_quangcao where anh_quangcao.trang_thai = 1");

        const [result2, fields1] = await Promise.all([
            pool.execute("SELECT * FROM anh_quangcao where anh_quangcao.trang_thai = 1 LIMIT ? OFFSET ?", [
                pageSize,
                offset,
            ]),
        ]);

        if (result2[0] && result2[0].length > 0) {
            return res.status(200).json({
                dataCD: result2[0],
                totalPages: Math.ceil(sotrang.length / pageSize),
                currentPage: page,
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
                totalPages: 0,
                currentPage: 1,
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let deleteHAQC = async (req, res) => {
    let maHinhAnhQC = req.params.maHinhAnhQC;
    console.log("Mã hình ảnh để xoá:", maHinhAnhQC);

    try {
        await pool.execute(
            "update anh_quangcao set anh_quangcao.trang_thai = 0 where anh_quangcao.maHinhAnhQC = ?", [maHinhAnhQC]);

        return res.status(200).json({
            message: "Xóa thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let layHinhAnhTrangChu = async (req, res) => {
    try {
        const [HA, a] = await pool.execute("SELECT tenHinhAnhQC FROM anh_quangcao where anh_quangcao.trang_thai = 1");
        return res.status(200).json({
            HA: HA,
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let BoLocHocPhi = async (req, res) => {
    try {
        const [rows, fields] = await pool.execute("SELECT hocphi FROM khoa_hoc where khoa_hoc.trang_thai = 1");

        const duoi2trieu = rows.filter(row => row.hocphi < 2000000);
        const tu2den5trieu = rows.filter(row => row.hocphi >= 2000000 && row.hocphi <= 5000000);
        const tren5trieu = rows.filter(row => row.hocphi > 5000000);

        return res.status(200).json({
            duoi2trieu,
            tu2den5trieu,
            tren5trieu
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
}

let layGioiThieuKhoaHoc = async (req, res) => {
    const maKH = req.params.maKH;
    try {
        const [TCKH, a] = await pool.execute("SELECT chitiet, tenHinhAnhKH FROM chitiet_khoahoc, khoa_hoc, hinhanh_khoahoc where chitiet_khoahoc.maKH = ? and chitiet_khoahoc.maKH = khoa_hoc.maKH and hinhanh_khoahoc.maKH = khoa_hoc.maKH ", [maKH]);
        return res.status(200).json({
            TCKH: TCKH
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layNoiDungKhoaHoc = async (req, res) => {
    const maKH = req.params.maKH;
    try {
        const [ND, a] = await pool.execute("SELECT tieude, noidung FROM noidung_khoahoc, khoa_hoc where noidung_khoahoc.maKH = ? and noidung_khoahoc.maKH = khoa_hoc.maKH", [maKH]);
        return res.status(200).json({
            ND: ND
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layThongTinDiemThi = async (req, res) => {
    try {
        const [ND, a] = await pool.execute("SELECT noidung FROM thongtindiemthi");
        return res.status(200).json({
            ND: ND
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let updateTTDT = async (req, res) => {
    let noidung = req.body.noidung;
    console.log("Nội dung:", noidung);
    try {
        await pool.execute(
            "update thongtindiemthi set thongtindiemthi.noidung = ? ", [noidung]);

        return res.status(200).json({
            message: "Update thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let layMoTaKH = async (req, res) => {
    const maKH = req.params.maKH;
    try {
        const [ND, a] = await pool.execute("SELECT maND, maKH, tieude, noidung FROM noidung_khoahoc where noidung_khoahoc.maKH = ? and noidung_khoahoc.trang_thai = 1", [maKH]);
        return res.status(200).json({
            ND: ND
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let lay1MoTaKH = async (req, res) => {
    const maND = req.params.maND;
    try {
        const [ND, a] = await pool.execute("SELECT maND, maKH, tieude, noidung FROM noidung_khoahoc where noidung_khoahoc.maND = ? and noidung_khoahoc.trang_thai = 1", [maND]);
        return res.status(200).json({
            ND: ND
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let updateMoTa = async (req, res) => {
    const maND = req.params.maND;
    let { tieude, noidung } = req.body;
    try {
        await pool.execute(
            "update noidung_khoahoc set noidung_khoahoc.tieude = ? where noidung_khoahoc.maND = ?", [tieude, maND]);
        await pool.execute(
            "update noidung_khoahoc set noidung_khoahoc.noidung = ? where noidung_khoahoc.maND = ?", [noidung, maND]);
        return res.status(200).json({
            message: "Update thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let deleteMoTa = async (req, res) => {
    let maND = req.params.maND;
    console.log("Mã hình ảnh để xoá:", maND);

    try {
        await pool.execute(
            "update noidung_khoahoc set noidung_khoahoc.trang_thai = 0 where noidung_khoahoc.maND = ?", [maND]);

        return res.status(200).json({
            message: "Xóa thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
}

let layTrangCaNhanHV = async (req, res) => {
    const maHV = req.params.maHV;
    try {
        const [TCN, a] = await pool.execute("SELECT maHV, tenHV, email, sdt, DATE_FORMAT(STR_TO_DATE(ngaysinh, '%Y-%m-%d'), '%d-%m-%Y') AS ngaysinh, noisinh, gioitinh FROM hoc_vien where hoc_vien.maHV = ? and hoc_vien.trang_thai = 1", [maHV]);
        return res.status(200).json({
            TCN: TCN
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layKhoaHocDaDK = async (req, res) => {
    const maHV = req.params.maHV;
    console.log(maHV)
    try {
        const [KH, a] = await pool.execute("SELECT tenKH, tenHinhAnhKH,lop_hoc.tenLopHoc, hoc_vien.tenHV, lop_hoc.tenLopHoc, lop_hoc.maLopHoc from khoa_hoc, lop_hoc, dshv, hoc_phi, hinhanh_khoahoc, hoc_vien where hoc_phi.trang_thai = 1 and lop_hoc.bat_dau = 1 and hoc_vien.maHV = ? and khoa_hoc.maKH = lop_hoc.maKH and dshv.maHV = hoc_vien.maHV and lop_hoc.maLopHoc = dshv.maLopHoc and dshv.maDSHV = hoc_phi.maDSHV and hinhanh_khoahoc.maKH = khoa_hoc.maKH", [maHV]);
        return res.status(200).json({
            KH: KH
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layThongBaoLopHocHV = async (req, res) => {
    const maLopHoc = req.params.maLopHoc;
    try {
        const [TB, a] = await pool.execute("SELECT maTB, tieude_thongbao, noidung_thongbao, ngaydang, tenGV, giang_vien.maGV, lop_hoc.maLopHoc, tenHA, lop_hoc.tenLopHoc FROM thongbao, lop_hoc, giang_vien, hinh_anh where thongbao.maLopHoc = ? and thongbao.maLopHoc = lop_hoc.maLopHoc and thongbao.maGV = giang_vien.maGV and giang_vien.maGV = hinh_anh.maGV", [maLopHoc]);
        return res.status(200).json({
            TB: TB
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let updateHV1 = async (req, res) => {
    let { maHV, tenHV, email, sdt, ngaysinh, gioitinh, noisinh } = req.body;
    console.log(req.body);
    try {

        const [rows, fields] = await pool.execute("UPDATE hoc_vien SET tenHV = ?, email =?, sdt = ?, ngaysinh=STR_TO_DATE(?, '%Y-%m-%d'), gioitinh = ?, noisinh = ? WHERE maHV=?", [tenHV, email, sdt, ngaysinh, gioitinh, noisinh, maHV])
        return res.status(200).json({
            "message": "Cập nhật thành công"
        })
    }
    catch (error) {
        console.log("Lỗi khi cập nhật học viên: ", error);
        return res.status(500).json({ error: "Lỗi khi cập nhật học viên" });
    }
}

let doiMatKhau = async (req, res) => {
    let { maHV, oldPassword, newPassword } = req.body;

    try {
        console.log(newPassword)
        // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
        const [existingRows, existingFields] = await pool.execute("SELECT * FROM hoc_vien WHERE maHV = ? ", [maHV]);

        if (existingRows.length === 0) {
            return res.status(400).json({
                message: "Email không tồn tại",
            });
        }

        const user = existingRows[0];
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Mật khẩu cũ không đúng",
            });
        }

        // Hash mật khẩu mới
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Thực hiện cập nhật mật khẩu mới vào cơ sở dữ liệu
        await pool.execute(
            "UPDATE hoc_vien SET password = ? WHERE maHV = ?",
            [hashedNewPassword, maHV]
        );

        return res.status(200).json({
            message: "Đổi mật khẩu thành công",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Có lỗi xảy ra trong quá trình đổi mật khẩu",
        });
    }
}

let SaveCheckboxStates = async (req, res) => {
    let { maDSHV, isChecked } = req.body;

    console.log(req.body);
    console.log("+=============");
    console.log(isChecked);

    try {
        // Assuming checkboxStates is an array of objects with IDChiTietDoanPhi and isChecked
        for (let { maHP, isChecked } of isChecked) {
            if (isChecked == false) {
                isChecked = 0;
            } else {
                isChecked = 1;
            }
            console.log(isChecked);
            await pool.execute(
                "UPDATE hoc_phi SET trang_thai = ? WHERE maDSHV = ? and maHP = ?",
                [isChecked, maDSHV, maHP]
            );
        }

        return res.status(200).json({
            success: true,
            message: "Cập nhật thành công!",
        });
    } catch (error) {
        console.error("Error updating checkbox states:", error);
        return res.status(500).json({ message: "Cập nhật thành công!" });
    }
};

let SaveCheckboxStatesLopHoc = async (req, res) => {
    let { maLopHoc, isChecked } = req.body;

    console.log(req.body);
    console.log("+=============");
    console.log(isChecked);

    try {
        for (let { maLopHoc, isChecked } of isChecked) {
            if (isChecked == false) {
                isChecked = 0;
            } else {
                isChecked = 1;
            }
            console.log(isChecked);
            await pool.execute(
                "UPDATE lop_hoc SET hoan_thanh = ? WHERE maLopHoc = ?",
                [isChecked, maLopHoc]
            );
        }

        return res.status(200).json({
            success: true,
            message: "Cập nhật thành công!",
        });
    } catch (error) {
        console.error("Error updating checkbox states:", error);
        return res.status(500).json({ message: "Cập nhật thất bại!" });
    }
};

let SaveCheckboxStatesLopHocBatDau = async (req, res) => {
    let { maLopHoc, isCheckedBD } = req.body;

    console.log(req.body);
    console.log("+=============");
    console.log(isCheckedBD);

    try {
        for (let { maLopHoc, isCheckedBD } of isCheckedBD) {
            if (isCheckedBD == false) {
                isCheckedBD = 0;
            } else {
                isCheckedBD = 1;
            }
            console.log(isCheckedBD);
            await pool.execute(
                "UPDATE lop_hoc SET bat_dau = ? WHERE maLopHoc = ?",
                [isCheckedBD, maLopHoc]
            );
        }

        return res.status(200).json({
            success: true,
            message: "Cập nhật thành công!",
        });
    } catch (error) {
        console.error("Error updating checkbox states:", error);
        return res.status(500).json({ message: "Cập nhật thất bại!" });
    }
};

let layTrangChuCamNhan = async (req, res) => {
    try {
        const [CN, a] = await pool.execute("SELECT maCN, cam_nhan.noidung, cam_nhan.trang_thai, cam_nhan.maDSHV, dshv.maHV, dshv.maLopHoc, khoa_hoc.tenKH, hoc_vien.tenHV, maHinhAnhHV, tenHinhAnhHV, hinhanh_hocvien.maHV FROM cam_nhan, khoa_hoc, hoc_vien,lop_hoc, hinhanh_hocvien,dshv where cam_nhan.trang_thai = 1 and cam_nhan.maDSHV = dshv.maDSHV and dshv.maHV = hoc_vien.maHV and dshv.maLopHoc = lop_hoc.maLopHoc and lop_hoc.maKH = khoa_hoc.maKH and hoc_vien.maHV = hinhanh_hocvien.maHV");
        return res.status(200).json({
            CN: CN
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layLopHocGiaoVien = async (req, res) => {
    const maLopHoc = req.params.maLopHoc;
    try {
        const [LopHoc, a] = await pool.execute("SELECT lop_hoc.tenLopHoc, lop_hoc.maLopHoc, dshv.maDSHV, hoc_vien.tenHV, hoc_vien.maHV from lop_hoc, dshv, hoc_vien where lop_hoc.maLopHoc = ? and dshv.maHV = hoc_vien.maHV and lop_hoc.maLopHoc = dshv.maLopHoc;", [maLopHoc]);
        return res.status(200).json({
            LopHoc: LopHoc
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layLopHocGV = async (req, res) => {
    const maGV = req.params.maGV;
    try {
        const [KH, a] = await pool.execute("SELECT giang_vien.maGV, tenGV, gioithieu, kinhnghiem, giang_vien.mota, tenHA, maHA, khoa_hoc.tenKH, khoa_hoc.maKH, lop_hoc.maLopHoc, lop_hoc.tenLopHoc, hinhanh_khoahoc.tenHinhAnhKH, hinhanh_khoahoc.maHinhAnh FROM giang_vien, hinh_anh, khoa_hoc, lop_hoc, hinhanh_khoahoc where giang_vien.maGV = ? and giang_vien.trang_thai = 1 and giang_vien.maGV = hinh_anh.maGV and giang_vien.maGV = lop_hoc.maGV and lop_hoc.maKH = khoa_hoc.maKH and hinhanh_khoahoc.maKH = khoa_hoc.maKH", [maGV]);

        return res.status(200).json({
            KH: KH
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layThongTinTrangGiangVien = async (req, res) => {

    const maGV = req.params;
    try {
        const [TCGV, a] = await pool.execute("SELECT giang_vien.maGV, tenGV, gioithieu, kinhnghiem, mota, tenHA, maHA, khoa_hoc.tenKH, khoa_hoc.maKH, FROM giang_vien, hinh_anh where giang_vien.maGV = ? and giang_vien.trang_thai = 1 and giang_vien.maGV = hinh_anh.maGV ", [maGV]);

        return res.status(200).json({
            TCGV: TCGV,
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }

};

let layThongBaoGV = async (req, res) => {
    const maGV = req.params.maGV;
    const maLopHoc = req.params.maLopHoc;

    try {
        const [TB, a] = await pool.execute("SELECT giang_vien.maGV, tenGV, tieude_thongbao, noidung_thongbao, ngaydang, maTB, lop_hoc.maLopHoc FROM giang_vien, thongbao, lop_hoc where lop_hoc.maLopHoc = ? and giang_vien.trang_thai = 1 and giang_vien.maGV = ? and giang_vien.maGV = thongbao.maGV and thongbao.maLopHoc = lop_hoc.maLopHoc", [maLopHoc, maGV]);

        return res.status(200).json({
            TB: TB
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layThongBaoLopHoc = async (req, res) => {
    const maLopHoc = req.params.maLopHoc;
    try {
        const [TB, a] = await pool.execute("SELECT maTB, tieude_thongbao, noidung_thongbao, ngaydang, tenGV, giang_vien.maGV, lop_hoc.maLopHoc FROM thongbao, lop_hoc, giang_vien where thongbao.maLopHoc = ? and thongbao.maLopHoc = lop_hoc.maLopHoc and thongbao.maGV = giang_vien.maGV", [maLopHoc]);
        return res.status(200).json({
            TB: TB
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layThongBaoLopHocChiTiet = async (req, res) => {
    const maTB = req.params.maTB;
    try {
        const [TBCT, a] = await pool.execute("SELECT thongbao.maTB, tieude_thongbao, noidung_thongbao, ngaydang, tenGV, giang_vien.maGV, lop_hoc.maLopHoc FROM thongbao, lop_hoc, giang_vien where thongbao.maTB = ? and thongbao.maLopHoc = lop_hoc.maLopHoc and thongbao.maGV = giang_vien.maGV", [maTB]);
        console.log(TBCT, 'tbct')
        return res.status(200).json({
            TBCT: TBCT
        })
    }

    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layFile = async (req, res) => {
    const maTB = req.params.maTB;
    try {
        const [File, a] = await pool.execute("SELECT tenFile FROM thongbao, thongbao_file where thongbao.maTB = ? and thongbao.maTB = thongbao_file.maTB", [maTB]);
        return res.status(200).json({
            File: File
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};


let layNguoiDung = async (req, res) => {
    const maLopHoc = req.params.maLopHoc;
    try {
        const [MN, a] = await pool.execute("SELECT DISTINCT giang_vien.maGV, hoc_vien.maHV, tenGV, lop_hoc.maLopHoc, tenHV, hinhanh_hocvien.tenHinhAnhHV, hinh_anh.tenHA FROM giang_vien, lop_hoc , hoc_vien, hinhanh_hocvien, dshv, hinh_anh, hoc_phi where lop_hoc.maLopHoc = ? and giang_vien.trang_thai = 1 and hoc_phi.trang_thai = 1 and giang_vien.maGV = hinh_anh.maGV and lop_hoc.maGV = giang_vien.maGV and dshv.maHV = hoc_vien.maHV and dshv.maLopHoc = lop_hoc.maLopHoc and hoc_vien.maHV = hinhanh_hocvien.maHV and hoc_phi.maDSHV = dshv.maDSHV", [maLopHoc]);
        return res.status(200).json({
            MN: MN
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layTrangCaNhanGV = async (req, res) => {
    const maGV = req.params.maGV;
    try {
        const [TCN, a] = await pool.execute("SELECT giang_vien.maGV, tenGV, email, sdt, DATE_FORMAT(STR_TO_DATE(ngaysinh, '%Y-%m-%d'), '%d-%m-%Y') AS ngaysinh, gioitinh, mota, kinhnghiem, gioithieu, tenHA, hinh_anh.maHA FROM giang_vien, hinh_anh where giang_vien.maGV = ? and giang_vien.trang_thai = 1 and giang_vien.maGV = hinh_anh.maGV", [maGV]);
        return res.status(200).json({
            TCN: TCN
        })
    }
    catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let layCaThiDK = async (req, res) => {
    try {
        const [DSCT, a] = await pool.execute("SELECT ca_thi.maCaThi, ca_thi.thoigian, ca_thi.trang_thai, DATE_FORMAT(STR_TO_DATE(lich_thi.ngaythi, '%Y-%m-%d'), '%d-%m-%Y') AS ngaythi, batdau,  DATE_FORMAT(STR_TO_DATE(lich_thi.ngayhethan, '%Y-%m-%d'), '%d-%m-%Y') AS ngayhethan FROM ca_thi, lich_thi where lich_thi.batdau = 1 and slDaDK < slToiDa and lich_thi.maLichThi = ca_thi.maLichThi");
        return res.status(200).json({
            DSCT: DSCT
        })

    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
        return res.status(500).json({
            error: "Lỗi khi truy vấn cơ sở dữ liệu",
        });
    }
};

let kiemtraDK = async (req, res) => {
    let { maHV } = req.body;
    console.log(maHV, 'do')

    try {

        const [hocVienResults, fields] = await pool.execute(
            'SELECT email FROM hoc_vien WHERE maHV = ?',
            [maHV]
        );

        const { email } = hocVienResults[0];
        console.log(email)

        const [thiSinhResults, _] = await pool.execute(
            'SELECT email FROM thi_sinh, lich_thi, ca_thi WHERE lich_thi.batdau = 1 and ca_thi.maLichThi = lich_thi.maLichThi and thi_sinh.maCaThi = ca_thi.maCaThi AND thi_sinh.email = ?',
            [email]
        );

        const [ThongTinCaThi, a] = await pool.execute(
            'SELECT ca_thi.thoigian FROM thi_sinh, lich_thi, ca_thi WHERE lich_thi.batdau = 1 and ca_thi.maLichThi = lich_thi.maLichThi and thi_sinh.maCaThi = ca_thi.maCaThi AND thi_sinh.email = ? ',
            [email]
        );

        if (thiSinhResults.length === 0) {
            return res.status(200).json({
                thiSinhResults: thiSinhResults
            })
        } else {
            return res.status(200).json({
                ThongTinCaThi: ThongTinCaThi
            })
        }
    } catch (error) {
        console.error('Lỗi khi truy vấn cơ sở dữ liệu: ', error);
        return res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
    }
};

let DangKyLopHoc = async (req, res) => {
    let { maLopHoc, maHV } = req.body;
    console.log(req.body);
    const [existingData] = await pool.execute("SELECT maHV, maLopHoc FROM dshv WHERE dshv.maHV = ? and dshv.maLopHoc = ? ", [maHV, maLopHoc]);
    try {
        // Nếu không có dữ liệu trùng lặp, tiến hành thêm dữ liệu mới
        if (existingData.length === 0) {
            const [DSHV] = await pool.execute("insert into dshv( maLopHoc, maHV, trang_thai) values (?, ?, 1)",
                [maLopHoc, maHV]
            );

            const maDSHV = DSHV.insertId;
            console.log(maDSHV, 'maDSHV')

            const [DSHP] = await pool.execute("INSERT INTO hoc_phi(maDSHV, trang_thai) VALUES ( ?, 0)",
                [maDSHV]
            );

            res.status(200).json({
                'DT': {
                    'maLopHoc': maLopHoc,
                },
                'EC': 0,
                'EM': 'Tạo thành công'
            });
        }
        else {
            return res.status(400).send("Đăng ký không thành công! Bạn đã đăng ký lớp học này");
        }
    } catch (error) {
        console.log("Lỗi khi thêm học viên: ", error);
        return res.status(500).json({ error: "Lỗi khi thêm học viên" });
    }
};

let TimDiem = async (req, res) => {
    let { cccd } = req.body;
    try {

        const [KQ, fields] = await pool.execute(
            'SELECT diem_thi.tongdiem, diem_thi.diemLT, diem_thi.diemTH, ca_thi.thoigian, DATE_FORMAT(STR_TO_DATE(ngaythi, "%Y-%m-%d"), "%d-%m-%Y") AS ngaythi FROM lich_thi JOIN ca_thi ON lich_thi.maLichThi = ca_thi.maLichThi JOIN thi_sinh ON ca_thi.maCaThi = thi_sinh.maCaThi JOIN diem_thi ON thi_sinh.maThiSinh = diem_thi.maThiSinh WHERE thi_sinh.cccd = ? ORDER BY lich_thi.ngaythi DESC',
            [cccd]
        );
        return res.status(200).json({
            KQ: KQ
        })
    } catch (error) {
        console.error('Lỗi khi truy vấn cơ sở dữ liệu: ', error);
        return res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
    }
};

let TraCuuChungChi = async (req, res) => {
    let { giatri } = req.body;
    try {

        const [KQ, fields] = await pool.execute(
            'SELECT diem_thi.diemLT, diem_thi.diemTH, DATE_FORMAT(STR_TO_DATE(ngaythi, "%Y-%m-%d"), "%d-%m-%Y") AS ngaythi, hoten, DATE_FORMAT(STR_TO_DATE(ngaysinh, "%Y-%m-%d"), "%d-%m-%Y") AS ngaysinh, DATE_FORMAT(STR_TO_DATE(ngaycap, "%Y-%m-%d"), "%d-%m-%Y") AS ngaycap FROM lich_thi JOIN ca_thi ON lich_thi.maLichThi = ca_thi.maLichThi JOIN thi_sinh ON ca_thi.maCaThi = thi_sinh.maCaThi JOIN diem_thi ON thi_sinh.maThiSinh = diem_thi.maThiSinh JOIN chung_chi ON chung_chi.maThiSinh = thi_sinh.maThiSinh WHERE chung_chi.so_vaoso = ? OR chung_chi.sohieu = ?',
            [giatri, giatri]
        );
        return res.status(200).json({
            KQ: KQ
        })
    } catch (error) {
        console.error('Lỗi khi truy vấn cơ sở dữ liệu: ', error);
        return res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
    }
};

let GuiCamNhan = async (req, res) => {
    let { noidung, maLopHoc, maHV } = req.body;

    try {
        // Truy vấn để lấy maDSHV từ maLopHoc và maHV
        const [rows, fields] = await pool.execute(
            "SELECT maDSHV FROM dshv WHERE maLopHoc = ? AND maHV = ?",
            [maLopHoc, maHV]
        );

        // Lấy maDSHV từ kết quả truy vấn
        const maDSHV = rows[0].maDSHV;

        // Thực hiện truy vấn INSERT để thêm dữ liệu vào bảng cam_nhan
        const [insertResult, insertFields] = await pool.execute(
            "INSERT INTO cam_nhan (noidung, maDSHV) VALUES (?, ?)",
            [noidung, maDSHV]
        );

        return res.status(200).json({
            message: "Gửi cảm nhận thành công"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Có lỗi xảy ra trong quá trình đăng ký",
        });
    }
}

let KiemTraDanhGia = async (req, res) => {
    const { maLopHoc, maHV } = req.query;
    console.log(maLopHoc, maHV, 'malophoc')
    try {
        // Truy vấn cơ sở dữ liệu để lấy trạng thái cảm nhận của lớp học
        const [result, fields1] = await pool.execute(
            "SELECT trangthai_camnhan FROM lop_hoc WHERE maLopHoc = ?",
            [maLopHoc]
        );
        const trangThaiCamNhan = result[0].trangthai_camnhan;

        // Nếu trạng thái cảm nhận là 0, không cần kiểm tra và trả về kết quả
        if (trangThaiCamNhan === 0) {
            return res.status(200).json({
                message: "Đánh giá lớp học vẫn chưa được mở",
                trangThaiCamNhan: trangThaiCamNhan
            });
        }

        // Truy vấn cơ sở dữ liệu để kiểm tra xem người dùng đã đánh giá lớp học này chưa
        const [rows, fields2] = await pool.execute(
            "SELECT COUNT(*) AS count FROM cam_nhan WHERE maDSHV = (SELECT maDSHV FROM dshv WHERE maLopHoc = ? AND maHV = ?)",
            [maLopHoc, maHV]
        );
        const count = rows[0].count;

        // Trả về kết quả kiểm tra cùng với trạng thái cảm nhận của lớp học
        res.status(200).json({
            alreadyReviewed: count > 0,
            trangThaiCamNhan: trangThaiCamNhan
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Có lỗi xảy ra trong quá trình kiểm tra đánh giá",
        });
    }
}


module.exports = {
    laydshv, laydsgv, loginhv, loginadmin, createKhoaHoc, deleteGV, themHV, deleteHV, updateHV, getMaXacNhan,
    laydskh, deleteKH, laydsLopHoc, updateLH, themLH, deleteLH, DSGiangVien, laydsHocVien, deleteHVLopHoc, themLopHoc,
    layHinhAnhGioiThieu, deleteHAQC, layHinhAnhTrangChu, layGiangVien,
    layTrangChu, layTrangChuKhoaHoc, layTrangChuGiangVien,
    dangnhapnguoidung, dangkyTKNguoiDung, layLichThi, laydsCaThi, deleteLichThi, updateLichThi, updateCaThi, themLT,
    deleteCaThi, laydsThiSinh, deleteThiSinhDK, SaveCheckboxStatesHPTS, themHocVienDKThi, updateTrangThaiLichThi,
    layCaThiDK, kiemtraDK, TimDiem, TraCuuChungChi, laydsCamNhan, SaveCheckboxStatesCamNhan, laydsCamNhanHienThi,
    TrangThaiCamNhan,

    layKhoaHoc, layLopHoc, BoLocHocPhi, layGioiThieuKhoaHoc, layNoiDungKhoaHoc, layThongTinDiemThi, updateTTDT, layMoTaKH,
    updateMoTa, lay1MoTaKH, deleteMoTa, layTrangCaNhanHV, layKhoaHocDaDK, layThongBaoLopHocHV, updateHV1, doiMatKhau, SaveCheckboxStates, SaveCheckboxStatesLopHoc,
    layTrangChuCamNhan, layLopHocGiaoVien, layLopHocGV, layThongTinTrangGiangVien, SaveCheckboxStatesLopHocBatDau, layThongBaoGV,
    layThongBaoLopHoc, layThongBaoLopHocChiTiet, layNguoiDung, layTrangCaNhanGV, layFile, layThongTinLTTSTD, updateTTLTTSTD, laydsCaThiND,
    DangKyLopHoc, GuiCamNhan, KiemTraDanhGia,
}