const request = require("supertest");
const app = require('../app.js');
const testPerson = require('./testPerson.json')

jest.mock('got');

describe('Positive tests',()=>{
    let response;

    beforeEach(async () => {
        response=await request(app).get("/1");
    });
    
    test("response status is okay", async (done) => {
        expect(response.status).toBe(200);
        done();
    });

    test("name of the person fetrched is same",async (done)=>{
        expect(response.body.name).toBe('Luke Skywalker');
        done();
    });

    test("length of the film should be same",async (done)=>{
        expect(response.body.films.length).toBe(5);
        done();
    });

    test("length of the starship should be same",async (done)=>{
        expect(response.body.starships.length).toBe(2);
        done();
    });

    test("the whole object should match with local json",async (done)=>{
        expect(response.body).toEqual(testPerson);
        done();
    });
});



test("wrong data test", async (done) => {
    const response = await request(app).get('/a');
    expect(response.status).toBe(404);
    done();
});
