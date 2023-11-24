const { Router } = require("express");
const router = Router();
const User = require('../database/schemas/User');
const { hashPassword, comparePassword } = require('../utils/helper');
const jwt = require('jsonwebtoken');

const SECRET_TOKEN  = 'hell0jwt'

// Login Route Response Access & Refresh Tokens
router.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const userDB = await User.findOne({ email });

    if (!userDB) res.status(400).json({ message: 'User not found' });
    else {
        const accessToken = jwt.sign({ id: userDB._id }, SECRET_TOKEN, { expiresIn: '1hr' })
        const refreshToken = jwt.sign({ id: userDB._id }, SECRET_TOKEN, { expiresIn: '1d' })
        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
            return res.send({ accessToken, refreshToken });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    }
})

// Register Route
router.post('/api/auth/register', async (req, res) => {

    const { email, username } = req.body;

    const userDB = await User.findOne({ email });
    if (userDB) {
        return res.status(400).json({ message: `${email} is already registered` });
    } else {
        const password = hashPassword(req.body.password);
        const newUser = new User({ username, email, password });
        newUser.save();
        return res.status(200).json({ message: 'User registered successfully' });
    }
})


// Refresh token Route
router.post('/api/refresh-token',(req,res)=>{
    const {refreshToken} = req.body;
    if(!refreshToken) return res.status(400).json({message:'Refresh token is required'});
    try{
        const {id} = jwt.verify(refreshToken,SECRET_TOKEN);
        const accessToken = jwt.sign({id},SECRET_TOKEN,{expiresIn:'1d'});
        return res.status(200).json({accessToken});
    }catch(err){    
        return res.status(400).json({message:'Invalid refresh token'});
    }
})


module.exports = router;