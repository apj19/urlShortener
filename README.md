# URL Shortener

## Project Setup

1. clone the repo
2. run command ```git checkout newA2 ```

3. To install dependencies,Run `npm i`
4. Create .env file put following files
   DATABASE_URL="yourPostgressurl"

   TEST_USER1_API_KEY="testapikeyapjcr"--keep this for testing

   TEST_USER2_API_KEY="testapikey2sdfhsgsg"----keep this for testing

3. To test api helth run `npm test `
4. To start server Run ` npm start`
5. To run load test please instat k6 on your systme
   the run `k6 run loadTest\simpletest.js `

# Modification
## A2
 ###  branch-- newA2 
npx prisma db seed



