const people = require('./../assets/people.json');
const films = require('./../assets/films.json');
const species = require('./../assets/species.json');
const planets = require('./../assets/planets.json');


const got = async (url, options) => {
    let data;
    if (/^https:\/\/swapi.co\/api\/*/.test(url)) {

        const path = url.replace('https://swapi.co/api/', '').split('/');
        const objectId = parseInt(path[1]);

        if (isNaN(objectId)) {
            Promise.resolve({
                data: {
                    status: 400,
                    error: "Bad request "
                }
            });
        }

        switch (path[0]) {
            case 'people':
                data = people[objectId.toString()];
                break;
            case 'planets':
                data = planets[objectId.toString()];
                break;
            case 'species':
                data = species[objectId.toString()];
                break;
            case 'films':
                data = films[objectId.toString()];
                break;
            default:
                break;
        }

    }
    if (!data) {
        return Promise.reject({
            status: 404,
            error: "Not found"
        }
        );
    }

    return Promise.resolve({
        status: 200,
        body: data
    });
};


module.exports = got;