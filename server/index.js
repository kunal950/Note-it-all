//importing modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

//import files
const { authenticate } = require("./utils/authentication");
const { connectDB } = require("./db/Connectdb");
const userRoute = require("./routes/user.route");
const noteRoute = require("./routes/note.route");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

dotenv.config();
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", userRoute);
app.use("/api/note", authenticate, noteRoute);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
