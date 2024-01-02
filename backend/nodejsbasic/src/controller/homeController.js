import pool from '../configs/connectDB';

let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM user');

    return res.render('index.ejs', { dataUser: rows })
}
let getDetailPage = async (req, res) => {
    let userid = req.params.id;
    let [user] = await pool.execute('SELECT * FROM user WHERE id = ?', [userid])
    console.log('check req params: ', user)
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    console.log('check req:', req.body)
    let { firstname, lastname, email, address } = req.body;

    await pool.execute('insert into user(firstname, lastname, email, address) value (?, ?, ?, ?)',
        [firstname, lastname, email, address])
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from user where id = ?', [userId])
    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('Select * from user where id = ?', [id]);

    return res.render('update.ejs', { dataUser: user[0] });
}

let postUpdateUser = async (req, res) => {
    let { firstname, lastname, email, address, id } = req.body;
    await pool.execute('update user set firstname = ?, lastname= ?, email= ?, address= ? where id= ?',
        [firstname, lastname, email, address, id]);
    return res.redirect('/');
}

module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser
}