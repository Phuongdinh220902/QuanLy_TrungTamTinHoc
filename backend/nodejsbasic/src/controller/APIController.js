const { json } = require("body-parser")
import pool from '../configs/connectDB';
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// let filtertenHB = async (req, res) => {
//     let { tenHB } = req.body;
//     const [rows, fields] = await pool.execute("SELECT * FROM hoc_bong WHERE tenHB = ?", [tenHB])
//     const [rows2, fields2] = await pool.execute("SELECT DISTINCT tenHB FROM hoc_bong")
//     const [rows3, fields3] = await pool.execute("SELECT DISTINCT donVi FROM hoc_bong")
//     const [rows4, fields4] = await pool.execute("SELECT DISTINCT hanDK FROM hoc_bong")
//     return res.status(200).json({
//         thongtin: rows,
//         tk2: rows2,
//         tk3: rows3,
//         tk4: rows4
//     })
// }

// let tthb = async (req, res) => {
//     let { maHB } = req.body;
//     console.log(maHB);
//     try {
//         const [rows, fields] = await pool.execute("SELECT * FROM hoc_bong WHERE maHB = ?", [maHB])
//         if (rows.length > 0) {
//             const info = rows[0];
//             return res.status(200).json({ info });
//         } else {
//             return res.status(404).json({ message: "Không tìm thấy thông tin học bổng" });
//         }
//     } catch (error) {
//         return res.status(500).json({ message: "Lỗi server" });
//     }
// }


// let trangchusv = async (req, res) => {
//     const currentDate = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại (định dạng YYYY-MM-DD)

//     const [rows, fields] = await pool.execute("SELECT * FROM hoc_bong WHERE hanDK >= ? ORDER BY hanDK DESC", [currentDate])

//     return res.status(200).json({
//         thongtin: rows,
//     })
// }



// let getMaXacNhan = async (req, res) => {
//     let email = req.body.email
//     // let testAccount = await nodemailer.createTestAccount();
//     const generateVerificationCode = (length) => {
//         // return Math.floor(1000 + Math.random() * 9000).toString();
//         var result = '';
//         var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         var charactersLength = characters.length;
//         for (var i = 0; i < length; i++) {
//             result += characters.charAt(Math.floor(Math.random() * charactersLength));
//         }
//         return result;
//     };

//     const verificationCode = generateVerificationCode(6);

//     // console.log(verificationCode)

//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         service: 'gmail',
//         auth: {
//             user: "ld7941682@gmail.com",
//             pass: "ijippjqyfxuyqgxs",
//         },
//     });

//     const [r1, f1] = await pool.execute("SELECT * FROM sinh_vien WHERE email = ?", [email])

//     if (r1.length == 0) {
//         console.log("em mail ko ton tai")
//         return res.status(200).json({
//             check: "0",
//             msg: "Email không tồn tại"
//         })
//     }

//     // const [r2, f2] = await pool.execute("UPDATE users set maxacnhan=? where email = ?", [verificationCode, email])
//     const [r2, f2] = await pool.execute('SELECT password FROM sinh_vien WHERE email = ?', [email])

//     const old_password = r2[0].password
//     // console.log(old_password)
//     await pool.execute("UPDATE sinh_vien SET password = ? WHERE email = ?", [verificationCode, email])
//     const mailOptions = {
//         from: 'ld7941682@gmail.com',
//         to: email,
//         subject: 'New Password',
//         text: `Your new password is: ${verificationCode}`,
//     };

//     await transporter.sendMail(mailOptions, async function (error, info) {
//         if (error) {
//             console.log(error);
//             await pool.execute("UPDATE sinh_vien SET password = ? WHERE email = ?", [
//                 old_password,
//                 email,
//             ]);
//             return res.status(200).json({ check: "0" });
//         } else {
//             console.log("Ok")
//             return res.status(200).json({ check: "1" });
//         }
//     });
// }
// let hsungtuyen = async (req, res) => {
//     try {
//         // Kiểm tra xem trường maHB có trong req.body không
//         if (!req.body.maHB) {
//             return res.status(400).json({ message: "Thiếu thông tin mã học bổng" });
//         }

//         const maHB = req.body.maHB; // Giả sử trường mã học bổng là maHB
//         console.log(req.body);
//         const [rows, fields] = await pool.execute("SELECT id_sv, ten_file FROM ung_tuyen WHERE maHB = ?", [maHB]);
//         if (rows.length > 0) {
//             console.log(rows)
//             return res.status(200).json({ sv: rows });
//         } else {
//             return res.status(404).json({ message: "Không tìm thấy thông tin học bổng" });
//         }
//     } catch (error) {
//         console.error("Error occurred: ", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// let getfile = async (req, res) => {
//     const fileId = req.params.id;

//     try {
//         const [rows, fields] = await pool.execute('SELECT ten_file FROM ung_tuyen WHERE id = ?', [fileId]);
//         if (rows.length > 0) {
//             const fileUrl = rows[0].ten_file; // Đường dẫn tới file trong cơ sở dữ liệu
//             // Code để trả về file tại đây
//             res.download(fileUrl); // Hoặc sử dụng res.sendFile(fileUrl);
//         } else {
//             res.status(404).json({ error: 'File not found' });
//         }
//     } catch (error) {
//         console.error('Internal Server Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


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

            const [sotrang, fields] = await pool.execute("SELECT * FROM giang_vien where giang_vien.trang_thai = 1");

            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT * FROM giang_vien where giang_vien.trang_thai = 1 LIMIT ? OFFSET ?", [
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
            "SELECT * FROM giang_vien WHERE giang_vien.trang_thai = 1 AND (UPPER(giang_vien.tenGV) LIKE UPPER(?) OR UPPER(giang_vien.email) LIKE UPPER(?) OR UPPER(giang_vien.sdt) LIKE UPPER(?))",
            ["%" + tukhoa + "%", "%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT * FROM giang_vien WHERE giang_vien.trang_thai = 1 AND (UPPER(giang_vien.tenGV) LIKE UPPER(?) OR UPPER(giang_vien.email) LIKE UPPER(?) OR UPPER(giang_vien.sdt) LIKE UPPER(?))",
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

let dangkytk = async (req, res) => {
    let { tenHV, email, sdt, ngaysinh, gioitinh, noisinh, password } = req.body;

    const [existingRows, existingFields] = await pool.execute("SELECT * FROM hoc_vien WHERE email = ?", [email]);

    if (existingRows.length > 0) {
        return res.status(400).json({
            message: "Email đã tồn tại",
        });
    }

    try {
        const [rows, fields] = await pool.execute(
            "INSERT INTO hoc_vien (tenHV, email, sdt, ngaysinh, gioitinh, noisinh, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [tenHV, email, sdt, ngaysinh, gioitinh, noisinh, password]
        );

        return res.status(200).json({
            check: "1",
        });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            check: "0",
        });
    }
}


let updateGV = async (req, res) => {
    let { maGV, tenGV, email, sdt, gioitinh } = req.body;
    console.log(req.body);
    try {
        const [rows, fields] = await pool.execute("UPDATE giang_vien SET tenGV = ?, email =?, sdt = ?, gioitinh = ? WHERE maGV=?", [tenGV, email, sdt, gioitinh, maGV])
        return res.status(200).json({
            "message": "Cập nhật thành công"
        })
    }
    catch (error) {
        console.log("Lỗi khi cập nhật học viên: ", error);
        return res.status(500).json({ error: "Lỗi khi cập nhật học viên" });
    }
}

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

            const [sotrang, fields] = await pool.execute("SELECT * FROM khoa_hoc where khoa_hoc.trang_thai = 1");

            const [result2, fields1] = await Promise.all([
                pool.execute("SELECT * FROM khoa_hoc where khoa_hoc.trang_thai = 1 LIMIT ? OFFSET ?", [
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
            "SELECT * FROM khoa_hoc WHERE khoa_hoc.trang_thai = 1 AND (UPPER(khoa_hoc.tenKH) LIKE UPPER(?) OR UPPER(khoa_hoc.monhoc) LIKE UPPER(?))",
            ["%" + tukhoa + "%", "%" + tukhoa + "%"]
        );
        console.log(sotrang)

        const [result2, fields1] = await Promise.all([
            pool.execute(
                "SELECT * FROM khoa_hoc WHERE khoa_hoc.trang_thai = 1 AND (UPPER(khoa_hoc.tenKH) LIKE UPPER(?) OR UPPER(khoa_hoc.monhoc) LIKE UPPER(?))",
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

let updateKH = async (req, res) => {
    let { maKH, tenKH, hocphi, mota, monhoc, so_gio } = req.body;
    console.log(req.body);
    try {
        const [rows, fields] = await pool.execute("UPDATE khoa_hoc SET tenKH = ?, hocphi =?, mota = ?, monhoc = ?, so_gio = ? WHERE maKH=?", [tenKH, hocphi, mota, monhoc, so_gio, maKH])
        return res.status(200).json({
            "message": "Cập nhật thành công"
        })
    }
    catch (error) {
        console.log("Lỗi khi cập nhật khoá học: ", error);
        return res.status(500).json({ error: "Lỗi khi cập nhật khoá học" });
    }
}

let themKH = async (req, res) => {
    console.log("ok")
    let { tenKH, hocphi, mota, monhoc, so_gio } = req.body;
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


module.exports = {
    laydshv, laydsgv, loginhv, loginadmin, createKhoaHoc, dangkytk, deleteGV, updateGV, themHV, deleteHV, updateHV,
    laydskh, deleteKH, updateKH, themKH
}