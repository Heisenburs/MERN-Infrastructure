const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function createJWT(user) {
    return jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'})
}

async function create(req,res) {
    // console.log('[From POST handler]', req.body);
    try {
        //* creating a new user & adding to the database
        const user = await User.create(req.body)
        //* token will be a strinf
        const token = createJWT(user)

        //*
        res.json(token);
        console.log(user);

        //* creating a new jwt
        

    } catch (error) {
        res.status(400).json(error)
    }
}

async function login(req, res) {
    try {
        // find the user by email in db
        const user = await User.findOne({email: req.body.email})
        console.log('[USER FOUND]', user);
        if (!user) {
            throw Error('User Not Found');
        }

        // if user exist: compare the password to hashed password
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            throw Error('Password Not Found');
        }

        // if password matches, create a JWToken with the user data in the payload
        res.json(createJWT(user));
    } catch (error) {
    res.status(400).json({error: 'Credentials Unknown'})
    }
}

async function checkToken(req, res) {
    console.log(req.user);
    console.log(req.exp);
    res.json(req.exp)
}


module.exports = {create, login, checkToken}