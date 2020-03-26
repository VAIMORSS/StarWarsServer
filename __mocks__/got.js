const fs = require('fs');

/**
 * data file paths
 */
const people = '/../assets/people.json';
const films = '/../assets/films.json';
const species = '/../assets/species.json';
const planets = '/../assets/planets.json';

const got = async (url, options) => {
    if (/^https:\/\/swapi.co\/api\/*/.test(url)) {

        const requestedObject = url.replace('https://swapi.co/api/', '').split('/');
        const objectId = requestedObject[1];

        if (isNaN(parseInt(objectId))) {
            return {
                data: {
                    status: 404,
                    error: "Not found"
                }
            };
        }

        const readJson = (path) => {
            return new Promise((resolve, reject) => {
                fs.readFile(__dirname + path, (error, fileData) => {
                    if (error) {
                        resolve({
                            status: 404,
                            body: 'Not found'
                        });
                        console.log(error)
                    } else {
                        resolve({
                            status: 200,
                            body: (JSON.parse(fileData))[objectId]
                        });
                    }
                });
            })

        };

        switch (requestedObject[0]) {
            case 'people':
                return await readJson(people);
            case 'planets':
                return await readJson(planets);
            case 'species':
                return await readJson(species);
            case 'films':
                return await readJson(films);
        }
    }
};


module.exports = got;