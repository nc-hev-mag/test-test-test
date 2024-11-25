// app and request
const app = require("../app.js");
const request = require("supertest");
// endpoints data to assert GET /api response body against
const endpointsJson = require("../endpoints.json");
// data and seed for seeding test database before each test
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
//  database connection pool for ending connection after tests run
const db = require("../db/connection");

beforeEach(() => {
	return seed(testData);
});

afterAll(() => {
	return db.end();
});

describe("GET /api", () => {
	test("200: Responds with an object detailing the documentation for each endpoint", () => {
		return request(app)
			.get("/api")
			.expect(200)
			.then(({ body: { endpoints } }) => {
				expect(endpoints).toEqual(endpointsJson);
			});
	});
});
