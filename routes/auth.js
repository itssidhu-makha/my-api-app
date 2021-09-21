const express = require('express');
const router  = express.Router()
const userModel = require('../models/users')
const bcrypt=require('bcrypt')

//Registering the user
//@Post api/auth/register
router.post('/register',async (req,res)=>{
    
    try {
       
        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(req.body.password,salt);

        //have to construct new user as we need to change password
        const newUser = new userModel({
            username:req.body.username,
            email:req.body.email,
            password:hashPwd,
        })
        const userInDB= await newUser.save()
         res.status(201).json({
             success:true,
             data:userInDB
         })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:'User Not created in DB'+error
        })
    }
    
})

//Login user
//api/auth/login
router.post("/login",async (req,res)=>{
    try {
        const {email,password} = req.body
        const dbUserName = await userModel.findOne({email})        
        !dbUserName && res.status(404).json({sucess:false,message:"Username is Incorrect"})

        const dbPassword = await bcrypt.compare(password,dbUserName.password)
        !dbPassword && res.status(404).json({sucess:false,message:"Password is Incorrect"})

        res.status(200).json({ success:true,
            data:req.body})
    } catch (error) {
        res.status(500).json({
            success:false,
            error:'User Not found in DB'
        })
    }
})

module.exports = router