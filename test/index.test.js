const request = require("supertest");
const app = require('../app.js');
const testPerson = require('./testPerson.json')


/**
 * In case of need of got module's functionality we can use this newGot!
 * const newGot = jest.requireActual('got');
 */


jest.mock('./../api/swapi.js', () => {
    const Swapi = require('../__mocks__/swapi');
    return {
        getDetailedCharacter: (url) => Swapi.getDetailedCharacter(url)
    }
});

describe('People endpoint', () => {
    let response;

    beforeEach(async () => {
        response = await request(app).get("/1");
    });

    it("Should match with response 200 OK", async (done) => {
        expect(response.status).toBe(200);
        done();
    });

    it("Should match with 'Human'", async (done) => {
        expect(response.body.species.name).toEqual('Human');
        done();
    });

    it("Should match with test object", async (done) => {
        expect(response.body).toEqual(testPerson);
        done();
    });
});


describe('People endpoint', () => {
    let response;

    beforeEach(async () => {
        response = await request(app).get("/2");
    });

    it("Should match with response 200 OK", async (done) => {
        expect(response.status).toBe(200);
        done();
    });

    it("Should match with name C-3P0", async (done) => {
        expect(response.body.name).toBe('C-3PO');
        done();
    });

    it("Should match with the length of films", async (done) => {
        expect(response.body.films.length).toBe(6);
        done();
    });

    it("Should match with length of starship", async (done) => {
        expect(response.body.starships.length).toBe(0);
        done();
    });
});




test("wrong data test", async (done) => {
    const response = await request(app).get('/a');
    expect(response.status).toBe(404);
    done();
});
