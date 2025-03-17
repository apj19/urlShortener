const request = require("supertest");
const {app} = require("../jest.setup"); 
const { nanoid } = require("nanoid");
//create shortcode
const test_main_user_api_key = process.env.TEST_USER1_API_KEY;
//gernerate url to teste redirection workes or not
let generatedShortcode='';
describe("Check Short Code Genaration for redirect testing ", () => {
    test("Post /shorten should return Status 201 ", async () => {
      const response = await request(app).post("/shorten").send({"longUrl":`test${nanoid(8)}`}).set('Authorization', `Bearer ${test_main_user_api_key}`);
      generatedShortcode=response.body.shortcode
       expect(response.status).toBe(201);
    
    });
});

//check if shortcodet not sent
describe("Should send 404 without short code", () => {
    test("GET /redirect?code={code} should return 400", async () => {
      const response = await request(app).get(`/redirect?code=`);
      expect(response.status).toBe(400);
    
    });
});

//check redirectio works or not

describe("Should redirect with 302", () => {
    test("GET /redirect?code={code} should return 200", async () => {
      const response = await request(app).get(`/redirect?code=${generatedShortcode}`);
      expect(response.status).toBe(302);
    
    });
});
//updating shortcode to expiry date 
describe("testing short code edit ", () => {
    test("patch /shorten/:shortcode should return Status 200 ", async () => {
      const response = await request(app).patch(`/shorten/${generatedShortcode}`).send({"expiry":"2025-02-03","password":"2afhhfdbhb"}).set('Authorization', `Bearer ${test_main_user_api_key}`);
     expect(response.status).toBe(200);
        
    });
});
//shoud give 404 on expiry url
describe("Should redirect with 404", () => {
  test("GET /redirect?code={code} should return 200", async () => {
    const response = await request(app).get(`/redirect?code=${generatedShortcode}`);
    expect(response.status).toBe(404);
  
  });
});


//updating shortcode to password
describe("testing short code edit ", () => {
  test("patch /shorten/:shortcode should return Status 200 ", async () => {
    const response = await request(app).patch(`/shorten/${generatedShortcode}`).send({"expiry":"2035-02-03","password":"2afhhfdbhb"}).set('Authorization', `Bearer ${test_main_user_api_key}`);
   expect(response.status).toBe(200);    
  });
});

//should give 401 on delete url
describe("Should redirect with 404", () => {
  test("GET /redirect?code={code} should return 200", async () => {
    const response = await request(app).get(`/redirect?code=${generatedShortcode}`);
    expect(response.status).toBe(401);
  
  });
});