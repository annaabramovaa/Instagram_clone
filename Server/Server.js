const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001; // You can change this port if needed

// Update Cloudinary configuration
const cloudinaryConfig = {
  cloudName: "djx0lbw5o",
  apiKey: "814153273792937",
  apiSecret: "aIU-xvuF4GGd1GCTt5qJ2YZMA04",
};

// Define custom CORS options
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all methods
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204, // Set the preflight response status to 204
};

// Sample route to test if the server is working
app.get("/", (req, res) => {
  // Set the cookie with SameSite=None; Secure attributes
  res.cookie("myCookie", "myValue", {
    sameSite: "None",
    secure: true,
  });

  // Send a response
  res.send("Server is running!");
});

// Your routes and other server logic can be added here
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
