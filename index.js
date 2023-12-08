require("dotenv").config();

const express = require("express");

const googleAiRoutes = require("./routes/google-ai.js");
const app = express();

const PORT = process.env.PORT;

// middlewares

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "welcome to the app",
    status: 200,
  });
});

app.use("/api/google-ai", googleAiRoutes);

// at this point if user is requesting a route and its not showing up its definetly does not exist
app.use((req, res, next) => {
  res.status(404).json({
    message: "Ohh you are lost",
    status: res.statusCode,
  });
});

// handle error eg: typo error while sending req
app.use((error, req, res, next) => {
  res.send({
    success: false,
    error: error.message,
  });
});

// connect to db

app.listen(PORT, () => {
  // only listen to req once db is connected
  console.log(`Server is running on Port ${PORT}`);
});
