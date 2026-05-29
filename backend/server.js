require("dotenv").config();
console.log("API KEY:", process.env.GROQ_API_KEY); // <-- add this


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const explainRoutes = require("./routes/explain.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/explain", explainRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});