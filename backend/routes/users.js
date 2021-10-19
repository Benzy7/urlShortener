const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");
const webToken = require("jsonwebtoken");

require("dotenv").config()

router.post("/inscription", (req,res)=>{
    const {username, password, email} = req.body;

    if (username == undefined || username == "" || password == undefined || password == "" || email == undefined || email == "") {
        res.status(401).json({
            sucess: false,
            message: "remplissez tous les champs s'il vous plait",
            status:res.statusCode
        })
    } else {
        User.findOne({email: email})
        .then((value)=> {
            if (value === null) {
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(password, salt, function(err, hash) {
                        User.create({
                            username: username,
                            email: email,
                            password: hash
                        }).then((value)=>{
                            res.json({
                                success: true,
                                message:"votre compte a été créé avec succès",
                            })
                        }).catch(err=> res.status(404).json({
                            success: false,
                            message:"Quelque chose s'est mal passé essaie encore",
                        }))
                    })
                })
                
            } else {
                res.json({
                    success: false,
                    message:"Email existe déjà",
                })
            }
        })
    }
})

//login api
router.post("/login",(req,res) => {
    const {password, email} = req.body;

    if (email == undefined || email == "" || password == undefined || password == "") {
        res.json({
            message: "remplissez tous les champs s'il vous plait",
        })
    } else {
        var myUser = User.findOne({email: email}).exec();
        
        myUser.then(function (Suser) {
            //console.log(Suser)
            if (Suser === null) {
                res.json({
                    succsess: false,
                    message:"Email est pas enregistré veuillez vous inscrire.",
                    token:""
                })
            } else {
                var userPwd = Suser.password;
                var userName = Suser.username;
                var userId = Suser._id;
                
                const userPassword = userPwd;
                //console.log('userPassword');
                bcrypt.compare(password, userPassword, function(err, result){
                    if (result) {
                        const userDetails = {
                            username: userName,
                            id: userId
                        }

                        const token = webToken.sign(userDetails, process.env.secret_key,{
                            expiresIn:"3600s"
                        })

                        res.json({
                            succsess: true,
                            message:"Connecté avec succès",
                            user: Suser,
                            token
                        })
                    } else {
                        res.json({
                            succsess: false,
                            message:"l'email ou le mot de passe entré est incorrect",
                            token:""
                        })
                    }
                })
            }
        })
    }
})

//actv
router.patch('/:id', async (req, res) => {
    try{
        const actvUser = await User.updateOne({ _id: req.params.id }, {active: true} );
        res.json(actvUser);
    }catch(err){
        res.json({ message: err });
    }
});

// Profile
//router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
//    res.json({user: req.user});
//});

//user profile api
router.get("/profile", (req, res)=>{
    const authHeader = req.headers["authorization"];
    console.log(authHeader)
    if (authHeader) {
        const token = authHeader.substr("Bearer".length + 1);
        webToken.verify(token, process.env.secret_key, (err, user) => {
            if (user) {
                return res.json({
                    user: user,
                    message:"Succès"
                });
            } else {
                res.json({
                    message:"veuillez vous connecter",
                })
                console.log(err);
            }
        });
    } else {
        res.status(401).json({
            message:"veuillez vous connecter",
            status:res.statusCode
        });
    }
});

module.exports = router;