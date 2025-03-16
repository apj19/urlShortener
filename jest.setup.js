const {app,server} = require("./index"); 


// beforeAll(() => {
//   server = app.listen(4000);
// });


afterAll((done) => {
    server.close(done);
});

module.exports = {
    app
};