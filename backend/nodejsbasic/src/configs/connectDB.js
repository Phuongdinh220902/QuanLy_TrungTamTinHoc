import mysql from 'mysql2/promise';

console.log("Createing connection pool..");
// create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    port: '3307',
    user: 'root',
    database: 'qlttth'
});


export default pool;