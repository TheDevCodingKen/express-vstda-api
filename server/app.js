// Import modules and files
const express = require("express");
const logger = require("morgan");
let mockData = require("../server/mockData.json");

// Create Express application object
const app = express();

// Utilize Morgan logger middleware using pre-defined tokens
app.use(
  logger(":method :url :status :response-time ms - :res[content-length]")
);
app.use(express.json());

// Route handler
app.get("/", function (req, res) {
  res.status(200).send({ status: "ok" });
});

// Respond with all items in the data set
app.get("/api/TodoItems", function (req, res) {
  res.status(200).send(mockData);
});

// Respond with a single item from the data set
app.get("/api/TodoItems/:number", function (req, res) {
  res.status(200).send(mockData[req.params.number]);
  console.log(mockData[req.params.number]);
});

// Create a single to-do item and add it to the data set using POST method.
app.post("/api/TodoItems", function (req, res) {
  let foundIndex = mockData.findIndex(
    (toDoItem) => toDoItem.todoItemId == req.body.todoItemId
  );
  foundIndex == -1
    ? mockData.push(req.body)
    : (mockData[foundIndex] = req.body);
  for (i = 0; i < mockData.length; i++) {
    // If there is already an item with a matching todoItemId, overwrite the existing item.
    mockData[i].todoItemId = i;
  }
  res.status(201).send(req.body);
  // Log a copy of the item that was posted in the console
  console.log("New To-Do Item: ", req.body);
});

// Remove the item with a matching todoItemId from the data set using DELETE method
app.delete("/api/TodoItems/:number", function (req, res) {
  mockData.splice(req.params.number, 1);
  for (i = 0; i < mockData.length; i++) {
    mockData[i].todoItemId = i;
  }
  res.status(200).send(mockData[req.params.number]);
});
app.get("*", function (req, res) {
  res.end("No Page Found");
});

// Export app functionality
module.exports = app;
