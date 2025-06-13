const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load .env

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => console.log("DB Connection Failed:", err));


// Mongoose model
const Fruit = mongoose.model("Fruit", { Name: String }, "fruit");

// Routes
app.get("/fruitslist", function (req, res) {
    Fruit.find().then(function (retdata) {
        res.send(retdata);
    });
});

app.post("/addfruits", function (req, res) {
    const newfruit = req.body.newfruit;
    const newFruit = new Fruit({ Name: newfruit });

    newFruit.save()
        .then(() => {
            console.log("Saved Successfully");
            res.status(200).send("Fruit added");
        })
        .catch(err => {
            console.error("Error saving fruit:", err);
            res.status(500).send("Error saving fruit");
        });
});

// Server

app.listen(3000, function () {
    console.log(`Server Started on port`);
});
