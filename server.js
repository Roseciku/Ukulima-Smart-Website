const express = require('express');
const db = require('./config/db');

const app = express();


app.get('/createTables', async(req, res) => {
try {
    const usersTable=`
    CREATE TABLE IF NOT EXISTS users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    county VARCHAR(50) NOT NULL,
    town VARCHAR(50) NOT NULL,
    role VARCHAR (50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;
    const commoditiesTable=`
    CREATE TABLE IF NOT EXISTS commodities(
    commodity_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    farmer_name VARCHAR(50) NOT NULL,
    produce_location VARCHAR(50) NOT NULL,
    produce_name VARCHAR(50) NOT NULL,
    quantity VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)

    )
    `
    await db.query(usersTable);
    console.log('Users table created successfully');

    await db.query(commoditiesTable);
    console.log('Commodities table created successfully');
    
    res.send('All tables created successfully');

} catch (error) {
    console.error('Error creating Tables:', error);
    res.status(500).send('Error creating tables')
}
});

const PORT = process.env.PORT || 4000;

//start server
app.listen(PORT, ()=>{
    console.log(`Server is running at :http://localhost: ${PORT}`);
})