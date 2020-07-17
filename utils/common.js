const fs = require('fs');

const readJson = async (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, fileData) => {
            if (error) {
                reject({ error: error });
            } else {
                resolve({ data: JSON.parse(fileData) });
            }
        });
    });
};

const utils = {
    readJson: readJson
}

module.exports = utils;