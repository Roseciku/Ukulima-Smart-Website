const db =require ('../config/db');
const bcrypt = require ('bcryptjs');
const {validationResult} = require('express-validator');

//register a user
exports.registerUser = async (req, res) => {
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:'Please correct input errors', errors:errors.array()})
    }
    const{name, email, password, phone, county, town, role } = req.body;

    try {
        const[users] = await db.execute('SELECT email FROM users WHERE email = ?', [email]);
        if(users.length > 0){
            return res.status(400).jsonn({message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute('INSERT INTO users(name, email, password, phone, county, town, role )VALUES(?, ?, ?, ?, ?, ?, ?)',[name, email, hashedPassword, phone, county, town, role ])
        return res.status(201).json({message: 'User registered Successfully!'})
    
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'An error occured during registered', error:error.message})
    }
}

//login
exports.loginUser = async (req, res) => {
    const {email, password}= req.body
    try {
        //check if user exists
        const [user] = await db.execute('SELECT user_id, name, email, password FROM users WHERE email = ?', [email])
        console.log({user})
        if(user.length ===0){
            return res.status(400).json({message: 'The user does not exist'})
        }
        const isMatch = await bcrypt.compare(password, user[0].password)
        if(!isMatch){
            return res.status(400).json({message: 'Invalid email/password'})
        }
        req.session.userId = user[0].user_id;
        req.session.name = user[0].name;
        req.session.email = user[0].email;

        console.log(req.session);
        return res.status(200).json({message: 'Successful Login!'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'An error occured during login',error:error.message})
    }
}

//logout
exports.logoutUser = (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.error(err);
            return res.status(500).json({message: 'An error occured', error:err.message})
        }
        return res.status(200).json({message:'Successfully logged out!'})
    })
}