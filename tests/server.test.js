const request = require("supertest");
const {app,server} = require("../index"); 


// beforeAll(() => {
//   server = app.listen(4000);
// });

afterAll((done) => {
    server.close(done);
  });

describe("Check server health", () => {
    test("GET / should return server status", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
    //   expect(response.body).toHaveProperty("message", "Server is running");
    });
  });