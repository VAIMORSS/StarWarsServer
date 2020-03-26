'use strict';

const utils = require('./../utils/common.js');

/**
 * data file paths
 */
const people = '/testData/people.json';
const films = '/testData/films.json';
const species = '/testData/species.json';
const planets = '/testData/planets.json';

/** const obj */
const errorObj = {
    status: 404,
    error: "Not found"
};


class GotSwapi {

    constructor() {
    }

    async getFakeData(path, objectId) {
        if (isNaN(parseInt(objectId))) {
            return { errorObj };
        }

        const fileData = await utils.readJson(__dirname + path);

        if (fileData.error) {
            return { errorObj };
        }

        return {
            status: 200,
            body: fileData.data[objectId]
        };


    }

    async get(url) {
        const requestedObject = url.replace('https://swapi.co/api/', '').split('/');
        switch (requestedObject[0]) {
            case 'people':
                return this.getFakeData(people, requestedObject[1]);
            case 'planets':
                return this.getFakeData(planets, requestedObject[1]);
            case 'species':
                return this.getFakeData(species, requestedObject[1]);
            case 'films':
                return this.getFakeData(films, requestedObject[1]);
        }
    }

    post() {
        /** Not needed */
    }
}

module.exports = new GotSwapi();