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
        const [rows, fields] = await pool.execute("SELECT * FROM hoc_vien");
        if (rows && rows.length > 0) {
            return res.status(200).json({
                dataCD: rows,
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
};

let laydsgv = async (req, res) => {
    try {
        const [rows, fields] = await pool.execute("SELECT * FROM giang_vien");
        if (rows && rows.length > 0) {
            return res.status(200).json({
                dataCD: rows,
            });
        } else {
            console.log("Không tìm thấy kết quả");
            return res.status(200).json({
                dataCD: [],
            });
        }
    } catch (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu: ", error);
    }
};

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

let themgv = async (req, res) => {
    try {
        const { tenGV, email, sdt, ngaysinh, gioitinh, tenHA } = req.body;

        // Kiểm tra xem email đã tồn tại hay chưa
        const [existingRows, existingFields] = await pool.execute("SELECT * FROM giang_vien WHERE email = ?", [email]);

        if (existingRows.length > 0) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }

        // Thêm giảng viên vào bảng giang_vien
        const [rows, fields] = await pool.execute(
            "INSERT INTO giang_vien (tenGV, email, sdt, ngaysinh, gioitinh) VALUES (?, ?, ?, ?, ?)",
            [tenGV, email, sdt, ngaysinh, gioitinh]
        );

        // Lấy giảng viên vừa thêm
        const [newGiangVien] = await pool.execute("SELECT * FROM giang_vien WHERE email = ?", [email]);

        // Thêm ảnh vào bảng hinh_anh
        const [rowsHinhAnh, fieldsHinhAnh] = await pool.execute(
            "INSERT INTO hinh_anh (tenHA, maGV) VALUES (?, ?)",
            [tenHA, newGiangVien[0].maGV]
        );

        console.log("Rows affected in hinh_anh table:", rowsHinhAnh.affectedRows);

        if (rowsHinhAnh.affectedRows === 1) {
            return res.status(200).json({
                check: "1",
            });
        } else {
            console.error("Error adding image to hinh_anh table");
            return res.status(500).json({
                check: "0",
            });
        }
    } catch (error) {
        console.error("Error in themgv function:", error.message);
        return res.status(500).json({
            check: "0",
        });
    }
};



let updateGV = async (req, res) => {
    let { maGV, tenGV, email, sdt, ngaysinh, gioitinh } = req.body;
    const [rows, fields] = await pool.execute("UPDATE giang_vien SET tenGV = ?, email =?, sdt = ?, ngaysinh = ?, gioitinh = ? WHERE maGV=?", [tenGV, email, sdt, ngaysinh, gioitinh, maGV])
    return res.status(200).json({
        "message": "ok"
    })
}

let deleteGV = async (req, res) => {
    let maGV = req.body.maGV;
    console.log(req.body.maGV)
    if (!maGV) {
        return res.status(400).json({ message: 'Mã khoá học không hợp lệ.' });
    }

    try {
        const [rows, fields] = await pool.execute("DELETE FROM giang_vien WHERE maGV=?", [maGV]);
        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: 'ok' });
        } else {
            return res.status(404).json({ message: 'Không tìm thấy khoá học để xóa.' });
        }
    } catch (error) {
        console.error("Lỗi khi xóa khoá học:", error);
        return res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình xóa khoá học.' });
    }
}


module.exports = {
    laydshv, laydsgv, loginhv, loginadmin, createKhoaHoc, dangkytk, themgv, deleteGV, updateGV
}