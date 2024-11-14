const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.getConnection((err)=>{
    if(err){
        console.log("Error connecting to DB:", err.stack)
        return;
    }
    console.log('Successfully connected to DB')
})



module.exports=pool.promise();