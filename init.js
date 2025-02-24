const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(()=>{
    console.log("Connection established succesfully");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let chats = [
    {
        from : "Rahul",
        to : "Varun",
        msg : "Hello",
        created_at : new Date()
    },
    {
        from : "Rahul",
        to : "Vamshi",
        msg : "Helloo",
        created_at : new Date()
    },
    {
        from : "Varun",
        to : "Rahul",
        msg : "Hi",
        created_at : new Date()
    }
]

Chat.insertMany(chats)
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

