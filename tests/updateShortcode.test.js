const request = require("supertest");
const {app} = require("../jest.setup"); 
const { nanoid } = require("nanoid");

const test_main_user_api_key = process.env.TEST_USER1_API_KEY;

let generatedShortcode='';
//generated short code for updation
describe("Generating shortcode to delete ", () => {
    test("post /shorten should return Status 201 ", async () => {
      const response = await request(app).post("/shorten").send({"longUrl":`test${nanoid(8)}`}).set('Authorization', `Bearer ${test_main_user_api_key}`);
      generatedShortcode=response.body.shortcode
    //   console.log(generatedShortcode);clear
     expect(response.status).toBe(201);
        
    });
});

///send without body
describe("testing short code edit ", () => {
    test("patch /shorten/:shortcode should return Status 400 ", async () => {
      const response = await request(app).patch(`/shorten/${generatedShortcode}`).set('Authorization', `Bearer ${test_main_user_api_key}`);
     expect(response.status).toBe(400);
        
    });
});

//send wrong invalid date
describe("testing short code edit ", () => {
    test("patch /shorten/:shortcode should return Status 400 ", async () => {
      const response = await request(app).patch(`/shorten/${generatedShortcode}`).send({"expiry":"20245748"}).set('Authorization', `Bearer ${test_main_user_api_key}`);
     expect(response.status).toBe(400);
        
    });
});


//send invalid password
describe("testing short code edit ", () => {
    test("patch /shorten/:shortcode should return Status 400 ", async () => {
      const response = await request(app).patch(`/shorten/${generatedShortcode}`).send({"password":"20"}).set('Authorization', `Bearer ${test_main_user_api_key}`);
     expect(response.status).toBe(400);
        
    });
});

//send both valid input 

describe("testing short code edit ", () => {
    test("patch /shorten/:shortcode should return Status 200 ", async () => {
      const response = await request(app).patch(`/shorten/${generatedShortcode}`).send({"expiry":"2025-03-03","password":"2afhhfdbhb"}).set('Authorization', `Bearer ${test_main_user_api_key}`);
     expect(response.status).toBe(200);
        
    });
});

