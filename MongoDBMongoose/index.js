const express= require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
    .then(() => {
        console.log("connection successfull");
    })
    .catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp"); 
}

//index route
app.get("/chats", async (req,res)=>{
    let chats= await Chat.find();
    res.render("index.ejs",{chats});
})

//create and new route
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
})
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body
    let newChat= new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date()
    });
    console.log(newChat);
    newChat.save().then((res)=>console.log(res)).catch((err)=>console.log(err));
    res.redirect("/chats");
})

//edit and update route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id }=req.params;
    let chat=await Chat.findById(id);
    console.log(chat);
    res.render("edit.ejs",{chat});
})

app.put("/chats/:id",async (req,res)=>{
    let { id }=req.params;
    let {msg}=req.body; //or {msg: newMsg}
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:msg},{runValidators:true, new:true});
    res.redirect("/chats");
})

//DELETE ROUTE
app.delete("/chats/:id",async (req,res)=>{
    let { id }=req.params;
    await Chat.findByIdAndDelete(id, {runValidators:true});
    res.redirect("/chats");
})

app.listen(8080,()=>{
    console.log("Server Listening to port 8080");
});