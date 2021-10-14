const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

//get all
router.get('/', async (req, res) => {
    try{
        const urls = await Url.find();
        res.json(urls);
    }catch(err){
        res.json({ message: err });
    }
});

//get one 
router.get('/:urlId', async (req, res) => {
    try{
        const url = await Url.findById(req.params.urlId)
        res.json(url);
    }catch(err){
        res.json({ message: err });
    }
});


//nv url
router.post('/', async (req, res) => {
    let shortURL = (Math.random() + 1).toString(36).substring(7);

    //console.log(shortURL)

    const url = new Url({
        mainUrl: req.body.mainUrl,
        shortUrl: shortURL,
        nbv: 0
    });
    try{
        const savedUrl = await url.save();
    }catch(err){
        res.json({message: err});
    }
});

//update
router.patch('/:urlId', async (req, res) => {
    try{
        const majUrl = await Url.updateOne({ _id: req.params.urlId }, {$inc: {nbv: 1}} );
        res.json(majUrl);
    }catch(err){
        res.json({ message: err });
    }
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