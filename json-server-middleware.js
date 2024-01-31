const express = require("express");
const corsMiddleware = require("./path/to/corsMiddleware"); // Adjust the path

const app = express();
const port = 3001;

// Apply CORS middleware
app.use(corsMiddleware);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Your routes and other server logic can be added here

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
