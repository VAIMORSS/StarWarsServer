const people = require('./../assets/people.json');
const films = require('./../assets/films.json');
const species = require('./../assets/species.json');
const planets = require('./../assets/planets.json');


const got = (url, options) => {
    let data, isError;
    if (/^https:\/\/swapi.co\/api\/*/.test(url)) {

        const path = url.replace('https://swapi.co/api/', '').split('/');
        const pathNum = parseInt(path[1])-1;

        if (isNaN(pathNum) || pathNum > 7) {
            Promise.resolve({
                data: {
                    status: 400,
                    error: "Bad request "
                }
            })
        }

        switch (path[0]) {
            case 'people':
                if (people[pathNum]) {
                    data = people[pathNum];
                } else {
                    isError = true;
                }
                break;
            case 'planets':
                if (planets[pathNum]) {
                    data = planets[pathNum];
                } else {
                    isError = true;
                }
                break;
            case 'species':
                if (species[pathNum]) {
                    data = species[pathNum];
                } else {
                    isError = true;
                }
                break;
            case 'films':
                if (films[pathNum]) {
                    data = films[pathNum];
                } else {
                    isError = true;
                }
                break;
            default:
                isError = true;
                break;
        }

    }
    if (isError==true) {
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