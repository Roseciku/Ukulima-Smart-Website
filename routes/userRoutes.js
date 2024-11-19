const express =  require ('express');
const{registerUser, loginUser, logoutUser,produce}= require('../controllers/userController')
const {check} = require('express-validator');
const router = express.Router();

//User registration Route

router.post('/register/user', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please provide a valid email').isEmail(),
        check('password','Password must be 6characters or more.').isLength({min: 6}),
        check('phone', 'Phone number is required').not().isEmpty(),
        check('county', 'County is required').not().isEmpty(),
        check('town', 'Town is required').not().isEmpty(),
],
registerUser
);

router.post('/login/user', loginUser);

router.get('/logout/user', logoutUser)

router.post('/produce', produce)

module.exports = router;