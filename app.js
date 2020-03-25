const express = require('express');
const app = express();
const got = require('got');
const swapi = require('./api/swapi.js');

app.get('/:id',async (req, res) => {
    try{
         const detailedCharacter = await swapi.getDetailedCharacter(req.params.id);
         res.status(200).send(detailedCharacter);
    }catch(e){
        res.status(404).send({"error":"something went wrong"});
    }
});

module.exports = app;