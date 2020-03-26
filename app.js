const express = require('express');
const app = express();
const swapi = require('./api/swapi.js');

app.get('/:id', async (req, res) => {
    try {
        const detailedCharacter = await swapi.getDetailedCharacter(req.params.id);
        return res.status(200).send(detailedCharacter);
    } catch (e) {
        return res.status(404).send({ "error": "something went wrong" });
    }
});

module.exports = app;