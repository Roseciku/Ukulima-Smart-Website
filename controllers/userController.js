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
            return res.status(400).json({message: 'User already exists'})
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
        const [user] = await db.execute('SELECT user_id, name, email, password, role FROM users WHERE email = ?', [email])
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
        req.session.role = user[0].role;

        console.log(req.session);
        
        return res.status(200).json({message: 'Successful Login!', role: user[0].role})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'An error occured during login',error:error.message})
    }
}

// adding produce to the database
exports.produce = async (req, res) => {
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:'Please correct input errors', errors:errors.array()})
    }
    console.log(req.session)

    if(!req.session.userId){
        
        return res.status(401).json({message: 'Unauthorized!'})

    }

    const{farmer_name,
        email,
        farmer_contact,
        produce_location,
        produce_name,
        quantity,
        price,
        description } = req.body;

        console.log(req.body); 

    if (!farmer_name || !email || !farmer_contact || !produce_location || !produce_name || !quantity || !price || !description) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {    

        const [user] = await db.execute('SELECT user_id, name, email, password FROM users WHERE email = ?', [email])
        console.log({user})
        if(user.length ===0){
            return res.status(400).json({message: 'The user does not exist'})
        }

        const user_id = user[0].user_id;

        await db.execute('INSERT INTO commodities(user_id, farmer_name, email,farmer_contact, produce_location, produce_name, quantity, price,description )VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',[user_id,farmer_name, email, farmer_contact, produce_location, produce_name, quantity, price, description])
        return res.status(201).json({message: 'Produce entered Successfully!'})
    
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'An error occured during entry', error:error.message})
    }
}

// getting all produce for a specific farmer to display it in their dashboard

exports.getFarmerProduce =async(req, res)=>{

    if(!req.session.userId){
        return res.status(401).json({message: 'Unauthorized!'})
    }

try {
    const [user] = await db.execute('SELECT user_id, name, email, password FROM users WHERE email = ?', [req.session.email])
    console.log({user})
    if(user.length ===0){
        return res.status(400).json({message: 'The user does not exist'})
    }

    const user_email = user[0].email;
    const [produce] = await db.execute('SELECT * FROM commodities WHERE email = ?', [user_email])
    return res.status(201).json({ message: 'Produce retrieved successfully', produce: produce })

} catch (error) {
    console.error(error);
    return res.status(500).json({message: 'An error occured during retrieving,', error:error.message});
}

}

//getting all the produce for all the farmer for market purposes

exports.getAllProduce = async (req, res)=>{

try {
    const [produce] = await db.execute('SELECT * FROM commodities');
    return res.status(200).json(produce);

} catch (error) {
    console.error(error);
    res.status(500).json({message: 'An error occurred while fetching produce', error: error.message})
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

