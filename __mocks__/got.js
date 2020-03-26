const fs = require('fs');
const gotSwapi = require('./gotSwapi.js');


const got = async (url, options) => {
    if (/^https:\/\/swapi.co\/api\/*/.test(url)) {
        return await gotSwapi.get(url);
    }
};


module.exports = got;