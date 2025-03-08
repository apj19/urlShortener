const request = require("supertest");
const {app,server} = require("../index"); 
const { nanoid } = require("nanoid");


// beforeAll(() => {
//   server = app.listen(4000);
// });

afterAll((done) => {
    server.close(done);
  });

describe("Check server health", () => {
    test("GET / should return server status 200", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
    //   expect(response.body).toHaveProperty("message", "Server is running");
    });
});

describe("Check Short Code Genaration", () => {
    test("Post /shorten should return Status 201", async () => {
      const response = await request(app).post("/shorten").send({"longUrl":`test${nanoid(8)}`});
       expect(response.status).toBe(201);
    
    });
});



describe("Should redirect with 200 for defaulft dataclear", () => {
    test("GET /redirect?code={code} should return 200", async () => {
      const response = await request(app).get("/redirect?code=testg");
      expect(response.status).toBe(302);
    
    });
});


describe("Should delete the intial Shortcode", () => {
  
  //creating simple shortcode to delete in 
  let currentShortCode=''
  test("Post /shorten For Delete create new Code", async () => {
    const createRes = await request(app).post("/shorten").send({"longUrl":`test${nanoid(8)}`});
     expect(createRes.status).toBe(201);
     currentShortCode=createRes.body.shortcode;
  });
  
  test("delete /shorten should return 200", async () => {
    const response = await request(app).delete("/shorten").send({"shortCode":`${currentShortCode}`});
    expect(response.status).toBe(200);
  });



});

//adding test to check if empty url send it should resturn 400

describe("Check Short Code with empty url", () => {
  test("Post /shorten should return Status 400 bad request", async () => {
    const response = await request(app).post("/shorten").send({"longUrl":``});
     expect(response.status).toBe(400);
  
  });
});