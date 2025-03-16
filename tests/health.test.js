const request = require("supertest");
const {app} = require("../jest.setup"); 
// afterAll((done) => {
//     server.close(done);
// });


describe("Check server health", () => {
    test("GET / should return server status 200", async () => {
      const response = await request(app).get("/health");
      expect(response.status).toBe(200);
    //   expect(response.body).toHaveProperty("message", "Server is running");
    });
});