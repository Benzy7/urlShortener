const express = require("express");
const router = express.Router();

const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const webToken = require("jsonwebtoken");

require("dotenv").config()

//reg api
router.post("/inscription",(req,res)=>{
    const {username, password, email} = req.body;

    if (username == undefined || username == "" || password == undefined || password == "" || email == undefined || email == "") {
        res.status(401).json({
            message: "remplissez tous les champs s'il vous plait",
            status:res.statusCode
        })
    } else {
        userModel.findOne({
            attributes:["username"],
            where:{
                email,
            },
        }).then((value)=> {
            if (value === null) {
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(password, salt, function(err, hash) {
                        userModel.create({
                            username: username,
                            email: email,
                            password: hash
                        }).then((value)=>{
                            res.status(201).json({
                                message:"votre compte a été créé avec succès",
                                status:res.statusCode
                            })
                        }).catch(err=> res.status(404).json({
                            message:"Quelque chose s'est mal passé essaie encore"
                        }))
                    })
                })
                
            } else {
                res.status(401).json({
                    message:"Email existe déjà",
                    status:res.statusCode
                })
            }
        })
    }
})

//login api
router.post("/login",(req,res) => {
    const {username, password, email} = req.body;

    if (email == undefined || email == "" || password == undefined || password == "") {
        res.status(401).json({
            message: "remplissez tous les champs s'il vous plait",
            status:res.statusCode
        })
    } else {
        userModel.findOne({
            where:{
                email,
            },
        }).then((value)=> {
            if (value === null) {
                res.status(401).json({
                    message:"Email est pas enregistré veuillez vous inscrire.",
                    status:res.statusCode,
                    token:""
                })
            } else {
                const userPassword = value.getDataValue('password');
                bcrypt.compare(password, userPassword, function(err, result){
                    if (result) {
                        const userDetails = {
                            username:value.getDataValue("username"),
                            id:value.getDataValue("id")
                        }

                        const token = webToken.sign(userDetails, process.env.secret_key,{
                            expiresIn:"300s"
                        })

                        res.status(200).json({
                            message:"Connecté avec succès",
                            status:res.statusCode,
                            token
                        })
                    } else {
                        res.status(401).json({
                            message:"l'email ou le mot de passe entré est incorrect",
                            status:res.statusCode,
                            token:""
                        })
                    }
                })
            }
        })
    }
})

//user profile api
router.get("/profile", (req, res)=>{
    const authHeader = req.headers["authorization"];

    if (authHeader) {
        const token = authHeader.substr("Bearer".length + 1);
        webToken.verify(token, process.env.secret_key, (err, user) => {
            if (user) {
                return res.status(200).json({
                    status:res.statusCode,
                    data: user,
                    message:"Succès"
                });
            } else {
                res.status(401).json({
                    message:"veuillez vous connecter",
                    status:res.statusCode
                })
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