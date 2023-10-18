var express = require('express');
var router = express.Router();
var multer = require('multer');


var users = require('../models/userModel')
var songModel = require('../models/songModel')
var playlistModel = require('../models/playlistModel')
var passport = require("passport");
var localStrategy = require('passport-local');
var id3 = require('node-id3');

passport.use(new localStrategy(users.authenticate()));

const mongoose = require('mongoose');
const songModel = require('../models/songModel');

mongoose.connect('mongodb://0.0.0.0/spotify').then(() => {
  console.log('connected to database')
}).catch(err => {
  console.log(err)
})

const conn = mongoose.connection

var gfsBucket, gfsBucketPoster
conn.once('open', () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'audio'
  })
  gfsBucketPoster = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'poster'
  })
})





const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/uploadMusic',upload.single('song') , async (req,res,next)=>{

})




//---------------------------------------------------------------------

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


//--------------------------------------------------------------------

