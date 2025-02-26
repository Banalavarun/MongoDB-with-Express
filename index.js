const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");



app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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


app.listen(8080,()=>{
    console.log("Server is listening on the port 8080");
})


app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
})

app.post("/chats",(req,res)=>{
    let { from,msg,to } = req.body;
    let chat1 = new Chat({
        from : from,
        msg : msg,
        to : to,
        created_at : new Date()
    })
    chat1.save()
    .then((res)=>{
        console.log("new chat saved succesfully");
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
});

app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let newChat = await Chat.findByIdAndUpdate(
        id,
        {msg : newMsg},
        {runValidators:true,new : true}
    );
    console.log(newChat);
    res.redirect("/chats");
})


app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findByIdAndDelete(id);
    console.log(chat);
    res.redirect("/chats");
})
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

app.get("/",(req,res)=>{
    res.send("request recieved succesfully");
})
