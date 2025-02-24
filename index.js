const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then((res)=>{
    console.log("Connection with database made succesful");
})
.catch((err)=>{
    console.log(err);
})


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.listen(8080,()=>{
    console.log("Server is listening on the port 8080");
})


app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
})

app.get("/",(req,res)=>{
    res.send("request recieved succesfully");
})
