# URL Shortener

## Project Setup

1. clone the repo
2. run command ```git checkout middlware ```

3. To install dependencies,Run `npm i`
4. Create .env file put following Details\
   DATABASE_URL="yourPostgressurl"

   TEST_USER1_API_KEY="testapikeyapjcr"--keep this for testing

   TEST_USER2_API_KEY="testapikey2sdfhsgsg"----keep this for testing
3. Run ``` npx prisma migrate dev --name init ```
4. To seed Data Run ```npx prisma db seed ```
3. To start server Run ` npm start`
5. use above api keys for authentication 
4. Check docs at http://localhost:3000/api-docs
5. To test api helth run `npm test `





