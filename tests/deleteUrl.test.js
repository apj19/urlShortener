const request = require("supertest");
const {app} = require("../jest.setup"); 
const { nanoid } = require("nanoid");
//create shortcode
//get shortcode make as delete
//call shartcode to gete not found

// const test_api_key= env("TEST_API_KEY");
const test_main_user_api_key = process.env.TEST_USER1_API_KEY;

const test_other_user_api_key=process.env.TEST_USER2_API_KEY;

let generatedShortcode='';
//generated short code for deletation
describe("Generating shortcode to delete ", () => {
    test("post /shorten should return Status 201 ", async () => {
      const response = await request(app).post("/shorten").send({"longUrl":`test${nanoid(8)}`}).set('Authorization', `Bearer ${test_main_user_api_key}`);
      generatedShortcode=response.body.shortcode
    //   console.log(generatedShortcode);clear
     expect(response.status).toBe(201);
        
    });
});

//sending differnt user to delete

describe("Delet shortcode of differnt user ", () => {
    test("delete /shorten should return Status 404", async () => {
      const response = await request(app).delete("/shorten").send({"shortCode":`${generatedShortcode}`}).set('Authorization', `Bearer ${test_other_user_api_key}`);
     expect(response.status).toBe(404);
        
    });
});

//deleteing short code

describe("Delete shortcode of differnt user ", () => {
    test("delete /shorten should return Status 404", async () => {
      const response = await request(app).delete("/shorten").send({"shortCode":`${generatedShortcode}`}).set('Authorization', `Bearer ${test_main_user_api_key}`);
     expect(response.status).toBe(200);
        
    });
});

