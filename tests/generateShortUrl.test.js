const request = require("supertest");
const {app} = require("../jest.setup"); 
const { nanoid } = require("nanoid");


//auth test
describe("Check Short Code Genaration Auth", () => {
    test("Post /shorten should return Status 401 as auth not provided", async () => {
      const response = await request(app).post("/shorten").send({"longUrl":`test${nanoid(8)}`});
       expect(response.status).toBe(401);
    
    });
});

//.set('Authorization', `Bearer ${authToken}`)



describe("Check Short Code Genaration ", () => {
    test("Post /shorten should return Status 201 ", async () => {
      const response = await request(app).post("/shorten").send({"longUrl":`test${nanoid(8)}`}).set('Authorization', `Bearer testapikeysdfhsgsg`);
       expect(response.status).toBe(201);
    
    });
});

//sending wrong expiary
describe("Check Validity of input ", () => {
    test("Post /shorten should return Status 201 ", async () => {
      const response = await request(app).post("/shorten").send({"longUrl":`test${nanoid(8)}`,"expiry":'5454af'}).set('Authorization', `Bearer testapikeysdfhsgsg`);
       expect(response.status).toBe(400);
    
    });
});
//sending invalid customee code

describe("Check Validity of input ", () => {
    test("Post /shorten should return Status 201 ", async () => {
      const response = await request(app).post("/shorten").send({"longUrl":`test${nanoid(8)}`,"customecode":'5454af'}).set('Authorization', `Bearer testapikeysdfhsgsg`);
       expect(response.status).toBe(400);
    
    });
});
//seding in valid password

describe("Check Validity of input ", () => {
    test("Post /shorten should return Status 201 ", async () => {
      const response = await request(app).post("/shorten").send({"longUrl":`test${nanoid(8)}`,"password":'5454af'}).set('Authorization', `Bearer testapikeysdfhsgsg`);
       expect(response.status).toBe(400);
    
    });
});