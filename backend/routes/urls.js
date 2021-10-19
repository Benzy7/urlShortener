const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Url = require('../models/Url');
require("dotenv").config()

//get all
router.get('/', async (req, res) => {
    try{
        const urls = await Url.find();
        res.json(urls);
    }catch(err){
        res.json({ message: err });
    }
});

//redirect
router.get('/:urlCode', async (req, res) => {
    try{
        const url = await Url.findOneAndUpdate({ urlCode: req.params.urlCode }, {$inc: {nbv: 1}})
        if (url) {
            return res.redirect(url.mainUrl);
        } else {
            return res.status(404).json('Pas de url trouvée')
        }
    }catch(err){
        console.log(err);
        res.json({ message: err });
    }
});


//nv url
router.post('/shorten', (req, res) => {
    const {mainUrl} =  req.body;
    const baseUrl = process.env.baseUrl;
    const nbv =  0;

    //to do (validate and...)
    const urlCode = shortid.generate();

    //todo more stuff...
    let url;

    const shortUrl = baseUrl + '/url/' + urlCode;
    url = new Url({
        mainUrl,
        shortUrl,
        nbv,
        urlCode
    });
    url.save();

    res.json('all good')
});

//delete
router.delete('/:urlId', async (req, res) => {
    try{
        const delUrl = await Url.remove({ _id: req.params.urlId });
        res.json(delUrl);
    }catch(err){
        res.json({ message: err });
    }
});


module.exports = router; 