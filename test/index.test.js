const request = require("supertest");
const app = require('../app.js');
const testPerson = require('./testPerson.json')

test("Test the get method", async (done) => {
    const response = await request(app).get("/1");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Luke Skywalker');
    expect(response.body.films.length).toBe(5);
    expect(response.body.vehicles.length).toBe(2);
    expect(response.body.starships.length).toBe(2);
    expect(response.body).toEqual(testPerson);
    done();
})

test("wrong data test", async (done) => {
    const response = await request(app).get('/a');
    expect(response.status).toBe(404);
    done();
})
