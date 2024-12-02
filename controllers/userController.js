const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
require("dotenv").config();

//register a user
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Please correct input errors", errors: errors.array() });
  }
  const { name, email, password, phone, county, town, role } = req.body;

  try {
    const [users] = await db.execute(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );
    if (users.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users(name, email, password, phone, county, town, role )VALUES(?, ?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone, county, town, role]
    );
    return res.status(201).json({ message: "User registered Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occured during registered",
      error: error.message,
    });
  }
};

//login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user exists
    const [user] = await db.execute(
      "SELECT user_id, name, email, password, role FROM users WHERE email = ?",
      [email]
    );
    console.log({ user });
    if (user.length === 0) {
      return res.status(400).json({ message: "The user does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email/password" });
    }

    //create JWTs
    const accessToken = jwt.sign(
      { userId: user[0].user_id, email: user[0].email, role: user[0].role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    console.log("Access token is:", accessToken);
    const refreshToken = jwt.sign(
      { userId: user[0].user_id, email: user[0].email, role: user[0].role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //saving refreshToken with current user in the database

    const [saveTokens] = await db.execute(
      "INSERT INTO refresh_tokens(user_id, refreshToken )VALUES(?, ?)",
      [user[0].user_id, refreshToken]
    );
    console.log("Refresh token saved:", saveTokens);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occured during login", error: error.message });
  }
};

// adding produce to the database
exports.produce = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Please correct input errors", errors: errors.array() });
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "invalid token" });
    }

    req.userId = decoded.userId;
    req.email = decoded.email;
    req.role = decoded.role;

    const {
      farmer_name,
      email,
      farmer_contact,
      produce_location,
      produce_name,
      quantity,
      price,
      description,
    } = req.body;

    // console.log(req.body);

    if (
      !farmer_name ||
      !email ||
      !farmer_contact ||
      !produce_location ||
      !produce_name ||
      !quantity ||
      !price ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    try {
      const [user] = await db.execute(
        "SELECT user_id, name, email, password FROM users WHERE email = ?",
        [email]
      );
      console.log({ user });
      if (user.length === 0) {
        return res.status(400).json({ message: "The user does not exist" });
      }

      const user_id = user[0].user_id;

      await db.execute(
        "INSERT INTO commodities(user_id, farmer_name, email,farmer_contact, produce_location, produce_name, quantity, price,description )VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          user_id,
          farmer_name,
          email,
          farmer_contact,
          produce_location,
          produce_name,
          quantity,
          price,
          description,
        ]
      );

      // Get all produce items for this farmer
      const [produce] = await db.execute(
        "SELECT * FROM commodities WHERE email = ?",
        [email]
      );
// Ensure the response is always an array
// if (!Array.isArray(produce)) {
//   return res.status(200).json({ message: 'Produce retrieved successfully', produce: [] });  // Return an empty array if produce is not found
// }

      // Return the produce array to the frontend
      return res
        .status(201)
        .json({ message: "Produce added successfully!", produce: produce }); // Send all produce items as an array
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occured during entry",
        error: error.message,
      });
    }
  });
};

// getting all produce for a specific farmer to display it in their dashboard

exports.getFarmerProduce = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "invalid token" });
    }

    req.userId = decoded.userId;
    req.email = decoded.email;
    req.role = decoded.role;

    try {
      const [user] = await db.execute(
        "SELECT user_id, name, email, password FROM users WHERE user_id = ?",
        [req.userId]
      );
      console.log({ user });
      if (user.length === 0) {
        return res.status(400).json({ message: "The user does not exist" });
      }

      const user_email = user[0].email;
      const [produce] = await db.execute(
        "SELECT * FROM commodities WHERE email = ?",
        [user_email]
      );
      return res
        .status(201)
        .json({ message: "Produce retrieved successfully", produce: produce });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occured during retrieving,",
        error: error.message,
      });
    }
  });
};

//getting all the produce for all the farmer for market purposes

exports.getAllProduce = async (req, res) => {
  try {
    const [produce] = await db.execute("SELECT * FROM commodities");
    return res.status(200).json(produce);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching produce",
      error: error.message,
    });
  }
};

//Delete produce
exports.deleteProduce= async(req, res)=>{

const {produceId}=req.params;

const authHeader = req.headers['authorization'];
if(!authHeader){
  return res.status(401).json({message:'unauthorized'});
}

const token = authHeader.split(' ')[1];

jwt.verify(
  token,
  process.env.ACCESS_TOKEN_SECRET,
  async(err, decoded) =>{
    if (err){
      return res.status(403).json({message: 'Invalid token'});
    }

    req.userId = decoded.userId;
    req.email = decoded.email;
    req.role = decoded.role;

    try{
      //verify if produce belongs to the farmer
      const [produce] = await db.execute('SELECT * FROM commodities WHERE commodity_id = ?', [produceId])
        if (produce.length === 0){
          return res.status(404).json({ message: 'Produce not found'})
        }

        //delete produce
        await db.execute('DELETE FROM commodities WHERE commodity_id =?',[produceId])
        return res.status(200).json({ message: 'Produce deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({message: 'An error occurred during deletion', error: error.message})
    }
  }
)

}

//logout
exports.logoutUser = async (req, res) => {
  
  //verify if jwt cookie exist in the request
  const cookies = req.cookies;
  if(!cookies?.jwt)return res.status(204);//No content found
  const refresh = cookies.jwt;

  try {
    //Is refreshToken in db?
    const[tokens]= await db.execute('SELECT * FROM refresh_tokens WHERE refreshToken =?', [refreshToken])
    if(tokens.length === 0){
      res.clearCookie('jwt',{httpOnly:true, sameSite: 'None', secure:true});
      return res.status(204);// No content
    }

    //Delete refreshtokens in db
    await db.execute('DELETE FROM refresh_tokens WHERE refreshToken=?',[refreshToken])
  
    res.clearCookie('jwt',{httpOnly:true, sameSite: 'None', secure:true});
    return res.status(204);// No content)
  
  } catch (error) {
   console.error('Error during logout:', error);
   return res.status(500);//Internal server error 
  }
};
