const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require(`cookie-parser`);
const dotenv = require('dotenv');
const path = require ('path');
const cors = require ('cors');
const routes = require('./routes/userRoutes');


dotenv.config();
const app = express();

app.use(cookieParser())//middleware for cookies
 app.use(cors({credentials:true, origin:"http://127.0.0.1:5501"}));


//configure middleware
app.use(express.static(path.join(__dirname, 'Frontend')));//serve static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));//middleware to handle urlencoded form data
//app.use(express.json)






//configure routes
app.use('/api', routes)


const PORT = process.env.PORT || 4000;

//start server
app.listen(PORT, ()=>{
    console.log(`Server is running at :http://localhost:${PORT}`);
});