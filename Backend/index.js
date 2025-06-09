const express = require("express")

const cors = require("cors")

const mongoose = require("mongoose")

const app = express()

app.use(cors())

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/todo").then(()=>console.log("DB Success"))
.catch(()=>console.log("DB Failed"))

const Fruit = mongoose.model("Fruit",{Name:String},"fruit")

app.get("/fruitslist",function(req,res){
     Fruit.find().then(function(retdata){
     res.send(retdata)
     })
})

app.post("/addfruits",function(req,res){
    var newfruit = req.body.newfruit
     const newFruit = new Fruit(
        {
            Name : newfruit
        }
     )

     newFruit.save().then(()=>console.log("Saved Sucessfully"))
})
app.listen(5000,function(){
    console.log("Server Started...")
})