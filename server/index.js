//Import module
const server = require("./app");

// Ensure the application listens for network requests on the specific endpoint
server.listen(8484, function () {
  //log a message that the server is listening and port
  console.log(`Server is listening on localhost:8484`);
});
