const people = require('./../assets/people.json');
const films = require('./../assets/films.json');
const species = require('./../assets/species.json');
const planets = require('./../assets/planets.json');


const got = async (url, options) => {
    let data;
    if (/^https:\/\/swapi.co\/api\/*/.test(url)) {

        const path = url.replace('https://swapi.co/api/', '').split('/');
        const object_id = parseInt(path[1]);

        if (isNaN(object_id) || object_id > 7) {
            Promise.resolve({
                data: {
                    status: 400,
                    error: "Bad request "
                }
            });
        }

        switch (path[0]) {
            case 'people':
                data = people[object_id.toString()];
                break;
            case 'planets':
                data = planets[object_id.toString()];
                break;
            case 'species':
                data = species[object_id.toString()];
                break;
            case 'films':
                data = films[object_id.toString()];
                break;
            default:
                isError = true;
                break;
        }

    }
    if (!data) {
        return Promise.reject({
            status: 400,
            error: "Bad request "
        }
        );
    }

    return Promise.resolve({
        status: 200,
        body: data
    });
};


module.exports = got;