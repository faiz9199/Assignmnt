const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
const cors = require("cors")
require('dotenv').config()
require("./db");

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://note-app-tan-two.vercel.app',
  credentials: true,
};

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.send("Hello world");
});

const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1", noteRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});