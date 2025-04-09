const request = require("supertest");
const {app} = require("../jest.setup"); 

// const {redisClient}= require("../src/helpers/redisClient");
const { nanoid } = require("nanoid");


const test_main_user_api_key = process.env.TEST_USER1_API_KEY;
let genShortcode="";


describe("create shortcode for rate limit ", () => {
    test("Post /shorten should return Status 201 ", async () => {
      const response = await request(app).post("/shorten").send({"longUrl":`test${nanoid(8)}`}).set('Authorization', `Bearer ${test_main_user_api_key}`);
      genShortcode=response.body.shortcode;
       expect(response.status).toBe(201);
    
    });
});


describe("Rate limit test", () => {

    const ip= "12.12.12.12";

    // beforeEach(async () => {
    //     // clear Redis state between tests
        
    //     await redisClient.del(`rate_limit:test:${ip}`);
    //     redisClient.disconnect();
    // });

     
    test("GET /lookup should return 200 for 5 requt", async () => {

        for(let i=0;i< 5;i++){
            const response = await request(app).get(`/lookup?code=${genShortcode}`).set("X-Forwarded-For", ip);
            expect(response.status).toBe(200);
        }
        
    });
    //npx jest .\tests\ratelimit.test.js
    test("GET /lookup should block for 6th requtest", async () => {

        for(let i=0;i< 5;i++){
            const response = await request(app).get(`/lookup?code=${genShortcode}`).set("X-Forwarded-For", ip);
            expect(response.status).toBe(429);
        }
      
    });


});