const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const urlModel = require('../models/urlModel');

const isValidUrl = (url)=>{
    const urlRegex = new RegExp(/^(https|http):\/\/[^ "]+$/);

    return urlRegex.test(url);
};

const generateShortCode = (longUrl) =>{
    // console.log(longUrl)
    const hash = crypto.createHash('sha256').update(longUrl).digest('base64');

    return hash.replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
}

router.post('/shorten', async(req, res)=>{
    const {longUrl, custom} = req.body;
    // console.log(req.body);

    if (!isValidUrl(longUrl)) return res.json({msg: 'Not a Valid Base URL'});

    try {
        const alreadyUrlExists = await urlModel.findOne({longUrl});

        if(alreadyUrlExists) return res.json({shortUrl: `${process.env.CLIENT_URL}/${alreadyUrlExists.shortUrlCode}`});

        if(custom){
            const url = new urlModel({
                longUrl,
                shortUrlCode: custom
            });

            await url.save();

            return res.json({shortUrl: `${process.env.CLIENT_URL}/${custom}`})
        }

        const code = generateShortCode(longUrl);

        const url = new urlModel({
            longUrl,
            shortUrlCode: code
        });

        await url.save();

        return res.json({shortUrl: `${process.env.CLIENT_URL}/${code}`})

    } catch (error) {
        console.log('Error while shortening the url');
        return res.status(500).json({msg:'Error while shortening the url'});
    }
});

router.get('/:code', async(req, res)=>{
    const {code} = req.params;

    try {
        const isCode = await urlModel.findOne({shortUrlCode: code});
        if(isCode) return res.json({url: isCode.longUrl});

        return res.json({msg: 'Your Shortned URL is not found in our DataBase'});
    } catch (error) {
        console.log('Error getting the URL');
        return res.status(500).json({msg: 'Error getting the URL'});
    }
});

module.exports = router;