const cors = require("cors");
require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const userRoutes = require("./routes/users_routes");
const tasksRoutes = require("./routes/tasks_routes");
const birthDaysRoutes = require("./routes/birthDays_routes");
const path = require('path');
const { startTaskStatusCron } = require("./hooks/statusTasks");

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: `http://127.0.0.1:5500`,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
}));


app.use("/api/welcome", (req, res, next) => {
    res.status(200).json({ msg: "Les cors marchent ! " });
});

app.use("/api/auth", userRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/birthDays", birthDaysRoutes);

app.use("/api/images/avatars", express.static(path.join(__dirname, "uploads/pictures/avatars")));

startTaskStatusCron();

module.exports = app;