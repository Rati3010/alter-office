const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "*"
    })
  );
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
