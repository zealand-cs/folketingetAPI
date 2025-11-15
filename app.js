const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const logger = require("./logger");
const personRoutes = require("./routes/personRoutes");

const app = express();
app.use(express.json());


app.use(morgan("dev"));


mongoose.connect("mongodb://localhost:27017/folketinget")
    .then(() => logger.info("Connected to MongoDB"))
    .catch(err => logger.error("MongoDB connection error: " + err));


app.use("/api/person", personRoutes);

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
