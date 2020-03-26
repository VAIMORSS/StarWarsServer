const request = require("supertest");
const app = require('../app.js');
const testPerson = require('./testPerson.json')

/**
 * In case of need of got module's functionality we can use this newGot!
 * const newGot = jest.requireActual('got');
 */

jest.mock('got');

describe('App module test for person with id 1!', () => {
    let response;

    beforeEach(async () => {
        response = await request(app).get("/1");
    });

    test("response status is okay", async (done) => {
        expect(response.status).toBe(200);
        done();
    });

    test("the whole object should match with local json", async (done) => {
        expect(response.body.species.name).toEqual('Human');
        done();
    });

    test("the whole object should match with local json", async (done) => {
        expect(response.body).toEqual(testPerson);
        done();
    });
});


describe('App module test for person with id 2!', () => {
    let response;

    beforeEach(async () => {
        response = await request(app).get("/2");
    });

    test("response status is okay", async (done) => {
        expect(response.status).toBe(200);
        done();
    });

    test("name of the person fetrched is same", async (done) => {
        expect(response.body.name).toBe('C-3PO');
        done();
    });

    test("length of the film should be same", async (done) => {
        expect(response.body.films.length).toBe(6);
        done();
    });

    test("length of the starship should be same", async (done) => {
        expect(response.body.starships.length).toBe(0);
        done();
    });
});




test("wrong data test", async (done) => {
    const response = await request(app).get('/a');
    expect(response.status).toBe(404);
    done();
});
