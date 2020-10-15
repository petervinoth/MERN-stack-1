const express =require("express");
const mongoose=require("mongoose");
const cors =require("cors");
require("dotenv").config();
require("./Models/db");


const app=express();

app.use(express.json());
app.use(cors());


//connct port
app.listen(5000,()=>{
    console.log("connection port 5000");
});

//setup routes
app.use("/users", require("./Routes/UserRouter"));
