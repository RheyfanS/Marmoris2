const express = require('express');
const Router = express.Router();
const homeSchema = require('../models/homeSchema')

Router.get('/',(err,res) => {
    res.render('login', {title: '', password:'',email:''})
})

// Register
Router.post('/register', async(req,res) => {
    try{
        const {
            username,
            noTelp,
            email,
            password,
            cpassword
        } = req.body;

        if(password === cpassword){
            const userData = new homeSchema({
                username,
                noTelp,
                email,
                password,
            })
            userData.save(err =>{
                if(err){
                    console.log("err")
                }else{
                    res.render('login', {title: 'Done', password:'',email:''})
                }
            })

        const useremail = await homeSchema.findOne({email:email})
            if(email === useremail.email){
                res.render('login', {title: '', password:'',email:'Email is Already Exists '})
            }else{
                console.log('Err')
            }

        }else{
            res.render('login',{title:'', password:'Password Not Match',email:''})
        }

    }catch(error){

        res.render('login',{title:'Error in Code', password:'',email:''})
    }
})

// Login
Router.post('/login',(req, res) => {
    const {
        email,
        password
    } = req.body

    homeSchema.findOne({email:email},(err,result) => {
        if(email === result.email && password === result.password){
            res.render('home')
        }else{
            res.render('login',{title:'Wrong Email or Password', password:'',email:''})
        }

    })
})

module.exports = Router;