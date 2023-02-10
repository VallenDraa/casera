if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const apiRecipeRouter = require("./routes/apiRecipeRoutes");
const apiUserRouter = require("./routes/apiUserRoutes");
const apiRatingRouter = require("./routes/apiRatingRoute");
const authRouter = require("./routes/authRoutes");

// allow json
app.use(express.json({ limit: "500kb" }));

// handle cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://casera.vercel.app");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

// connect to database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGOSERVER)
  .then(() => console.log("connected to database"))
  .catch(() => process.exit(1));

// api links
app.use("/api", apiRecipeRouter);
app.use("/api", apiUserRouter);
app.use("/api", apiRatingRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from casera API " });
});

app.listen(process.env.PORT || 3001, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("listening on 3001");
  }
});
