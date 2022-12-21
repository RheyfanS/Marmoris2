const express = require('express');
const Router = express.Router();
const homeSchema = require('../models/homeSchema')
const session = require('express-session')
const methodOverride = require('method-override')

Router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))
Router.use(methodOverride('_method'))

Router.get('/',(err,res) => {
    res.render('login', {title: '', password:'',email:''})
})

Router.get('/login', (req,res) => {
    res.render('login', {title: '', password:'',email:''})
})

Router.get('/home',(req, res) => {
    res.render('home')
})

Router.get('/visit1',(req, res) => {
    res.render('visit1')
})

Router.get('/visit2',(req, res) => {
    res.render('visit2')
})

Router.get('/visit3',(req, res) => {
    res.render('visit3')
})

Router.delete('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login')
})


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
        res.render('login',{title:'Please Fill all', password:'',email:''})
    }
})

// Login
Router.post('/login', async (req, res) => {
    const user = await homeSchema.findOne({email:req.body.email})
    if (!user)
        return res.redirect('/login')
    
    let session = req.session
    session.user = {email:user.email}
    res.redirect('/home')
})

module.exports = Router;