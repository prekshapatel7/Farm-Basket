const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerController = async (req, res) => {
    try {
        const { Username, email, password, phone, address } = req.body;

        if (!Username || !email || !password || !phone) {
            return res.status(500).send({
                success: false,
                message: 'All fields are required'
            });
        }
        //check user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: 'Already registered, please login'
            });


        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

            //register user
        const user=await userModel.create({
            Username,
            email,
            password: hashedPassword,
            phone,
            address
        })
        return res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        }); 

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in registration'
        });
    }
};

//login controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'pls provide email and password'
            });
        }

        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
         //compare password
       const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid  password'
            });
        }
//token
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

       res.status(200).send({
        success: true,
        token,
        message: 'login successful',
        user
       });

      

        

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in login'
        });
    }
};

module.exports = { registerController, loginController };