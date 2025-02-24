const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


main()
.then(()=>{
    console.log("Connection established succesfully");
})
.catch((err)=>{
    console.log(err);;
})


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.listen(8080,()=>{
    console.log("Server is listening on the port 3000");
})

app.get("/",(req,res)=>{
    res.send("request recieved succesfully");
})
