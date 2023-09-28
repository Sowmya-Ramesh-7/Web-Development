const express=require("express");
const path=require("path");

const app=express();
const port=8080;

//ejs is also a package that is internally required by express it self so we dont have to explicitly require it 
app.set("view engine","ejs");
//setting constant path for views folder
app.set("views",path.join(__dirname,"/views"));
app.get("/",(req,res)=>{
    res.render("home.ejs")
});

app.listen(port,()=>{
    console.log("app is listening")
})