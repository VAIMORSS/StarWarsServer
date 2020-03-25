'use strict';

const got = require('got');

const paths = {
    people: 'people/',
    films: 'films/',
    species: 'species/',
    planet: 'planets/'
}


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
            const films = await Promise.all(character.body.films.map(film=>this.get(film)));
            return { ...character.body, homeworld: homeWorld.body, species: species.body, films: films.map((film)=>film.body) };
        } catch (e) {
            console.log(e)
        }
    }


    // async getCharacter({ id = 0, options = gotDefaultOption, url = null }) {
    //     url = url || `${this.baseUrl}${paths.people}/${objectId}`;
    //     const response = await this.get(fullUrl || url, options);
    //     return response.body;
    // }

    // async getSpecies({ id = 0, options = gotDefaultOption, url = null }) {
    //     url = url || `${this.baseUrl}${paths.species}/${objectId}`;
    //     const response = await this.get(fullUrl || url, options);
    //     return response.body;
    // }

    // async getFilms({ id = 0, options = gotDefaultOption, url = null }) {
    //     url = url || `${this.baseUrl}${paths.films}/${objectId}`;
    //     return await this.get(fullUrl || url, options);
    // }

    // async getHomeworld({ id = 0, options = gotDefaultOption, url = null }) {
    //     url = url || `${this.baseUrl}${paths.films}/${objectId}`;
    //     return await this.get(fullUrl || url, options);
    // }
}

module.exports = new Swapi();