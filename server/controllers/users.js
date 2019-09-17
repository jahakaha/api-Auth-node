const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user => {
    return JWT.sign({
        iss: 'jax', // issue
        sub: user.id, // subject - will ocnnect token with particular user
        iat: new Date().getTime(), // issued at // Cuurent time
        exp: new Date().setDate(new Date().getDate() +1), // Current time + 1 day ahead
    }, JWT_SECRET);
}

module.exports = {
    signUp: async(req, res, next) => {
        // email & password 
    
        const email = req.value.body.email;
        const password = req.value.body.password;

        //Check if there is a user with the same email 
        const foundUser = await User.findOne({ email: email});
        //Create a new user
        if(foundUser) {
            return res.status(403).json({ error: 'Email is already exist'})
        }
        const newUser = new User({
            email: email,
            password: password
        });
        await newUser.save();

        //generate the token
        const token = signToken(newUser);
          
        //Respond with token
        res.status(200).json({ token: token})    
    },
    signIn: async(req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({ token}); 
    },

    secret: async(req, res, next) => {
        console.log('I manager to get here!'); 
        res.json({ secret: "resource"});
    }
}
