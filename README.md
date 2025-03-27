# URL Shortener

## Project Setup

1. clone the repo
2. run command ```git checkout newA2 ```

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

# ChnageLog

## [v1.0.0] - 2025-03-20
- Initial release with:
    - `POST /shorten` (create ShortCode)
    - `DELETE /shorten`(Delete ShortCode)
    - `GET /redirect` (redirect to origionalUrl)

## [v2.0.0] - 2025-03-27

### Added
- New `GET /health` endpoint to get server health
- New `POST /shorten/bulk` to create bult shortcodes

- New `PATCH /shorten/:shortcode` to update shortcode fileds

### Changed
- `GET /redirect` need authentication for some protected shortcode

- `POST /shorten` now support optional paramters as follows
  - Added expiry:- yyyy-mm-dd format
  - Added customerCode:- customer short code from user
  - Added Password:- To protect shortcode
### Deprecated
- `POST /shorten` now requires authentication
- `DELETE /shorten` now requires authentication



