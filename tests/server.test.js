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

describe("Should return shortcode", () => {
    test("Post /shorten should return shortcode", async () => {
      const response = await request(app).post("/shorten").send({"longUrl":"https://www.netflix.com/in/"});
      expect(response.status).toBe(200 || 201);
    //   expect(response.body).toHaveProperty("message", "Server is running");
    });
});



describe("Should redirect with 200 for netflix", () => {
    test("GET /redirect?code={code} should return 200", async () => {
      const response = await request(app).get("/redirect?code=testfb");
      expect(response.status).toBe(302);
    //   expect(response.body).toHaveProperty("message", "Server is running");
    });
});