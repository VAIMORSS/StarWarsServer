'use strict';

const got = require('got');

const paths = {
    people: 'people/',
    films: 'films/',
    species: 'species/',
    planet: 'planets/'
};


class Swapi {

    constructor(path) {
        this.baseUrl = 'https://swapi.co/api/';
        this.objectId = path;
        this.gotDefaultOption = {
            json: true
        };
    }

    async get(url, options = this.gotDefaultOption) {
        return got(url, options);
    }

    async getDetailedCharacter(characterId) {
        const url = `${this.baseUrl}${paths.people}${characterId}`;

        try {
            const character = await this.get(url);
            const species = await this.get(character.body.species[0]);
            const homeWorld = await this.get(character.body.homeworld);
            const films = await Promise.all(character.body.films.map(film => this.get(film)));
            return { ...character.body, homeworld: homeWorld.body, species: species.body, films: films.map((film) => film.body) };
        } catch (e) {
            throw e;
        }
    }


    async getCharacter(objectId, options = {}) {
        const url = `${this.baseUrl}${paths.people}/${objectId}`;
        const params = { ...this.gotDefaultOption, ...options };
        const response = await this.get(url, params);
        return response.body;
    }

    async getSpecies(objectId, options = {}) {
        const url = `${this.baseUrl}${paths.people}/${objectId}`;
        const params = { ...this.gotDefaultOption, ...options };
        const response = await this.get(url, params);
        return response.body;
    }

    async getFilms(objectId, options = {}) {
        const url = `${this.baseUrl}${paths.people}/${objectId}`;
        const params = { ...this.gotDefaultOption, ...options };
        return await this.get(url, params);
    }

    async getHomeworld(objectId, options = {}) {
        const url = `${this.baseUrl}${paths.people}/${objectId}`;
        const params = { ...this.gotDefaultOption, ...options };
        return await this.get(url, params);
    }
}

module.exports = new Swapi();