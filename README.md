# URL Shortener

## Project Setup

1. clone the repo
2. run command ```git checkout newA2 ```

3. To install dependencies,Run `npm i`
4. Create .env file put following Details\
   DATABASE_URL="yourPostgressurl"

   TEST_USER1_API_KEY="testapikeyapjcr"--keep this for testing

   TEST_USER2_API_KEY="testapikey2sdfhsgsg"----keep this for testing
3. Rul ``` npx prisma migrate dev --name init ```
4. check db for user table if no data in user table run ```npx prisma db seed ```
3. To start server Run ` npm start`
4. Check docs at http://localhost:3000/api-docs
5. To test api helth run `npm test `


# Modification
## A2
 ###  branch-- newA2 




