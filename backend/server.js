const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db.js");



dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/todos", require("./routes/todoRoutes"));

const PORT = 5000;

app.listen(PORT, () => console.log(`server is running on ${PORT}`));