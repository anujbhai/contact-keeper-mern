const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }))

app.get("/", (req, res) => res.json({ message: "Welcome to the ContackKeeper API!" }));

// Define routes
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App started on server ${ PORT }`));

