require("dotenv/config");
require("./db");
const express = require("express");
const cors = require('cors');

const { isAuthenticated } = require("./middleware/jwt.middleware");
const allRoutes = require("./routes");
const authRouter = require("./routes/auth.routes");
const protectedRoute = require("./routes/protected.routes");

const app = express();
app.use(cors());

require("./config")(app);

app.use("/api", allRoutes);
app.use("/api/protected", isAuthenticated, protectedRoute);
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;
