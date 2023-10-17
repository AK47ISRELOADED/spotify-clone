var express = require('express');
var router = express.Router();

var users = require("/models/userModel");
var passport = require("passport");
var localStrategy = require('passport-local');
const { default: mongoose } = require('mongoose');
passport.use(new localStrategy(users.authenticate()));



// registering a user

router.post("/register",function(req,res,next){
    var newUser = new user({
        username:req.body.username,
        email:req.body.email,
        
    })
    user.register(newUser, req.body.password)
    .then(function(u){
        passport.authenticate('local')(req,res, function(){
            res.redirect('/');
        })
    })
    .catch(function(e){
        res.send(e);    
    })
});

// login a user


router.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect:'/login',

}));


//logout a user

router.get('/logout',function(req,res,next){
    req.logOut();
    res.redirect('/login');
})


// is logeed in middle ware

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/login');
    }
}