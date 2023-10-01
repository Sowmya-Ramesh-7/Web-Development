const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4: uuidv4}=require('uuid'); //package to create universal unique ids
const methodOverride =require("method-override");

app.use(methodOverride("_method"));

//parsing data that we get from "post" request
app.use(express.urlencoded({ extended:true }));
app.use(express.json());


//setting ejs as view engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//serving static files
app.use(express.static(path.join(__dirname,"public")));

let posts=[{
    "id":uuidv4(),
    "username" : "soumya",
    "content" : "I am a Software developer"
},
{
    "id":uuidv4(),
    "username" : "ramya",
    "content" : "Discovering the world"
},
{
    "id":uuidv4(),
    "username" : "ramesh",
    "content" : "Hard Worker"
}
];

//Restfull APIs to handle crud operations

//index route
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

//create route
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    // let post=req.body;
    // posts.push(post);
    let {username, content}=req.body;
    let id=uuidv4();
    posts.push({id, username, content}); //key and value name is equal
    res.redirect("/posts"); //redirects to the url, and by default post req is sent
});

//view route
app.get("/posts/:id",(req,res)=>{
    let {id}= req.params; //deconstruct data using {}
    let post=posts.find((p)=> id===p.id)
    res.render("show.ejs",{post});
});

//update route
app.patch("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let content=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=content;
    res.redirect("/posts");
});

//edit route
app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params; //deconstruct data using {}
    let post=posts.find((p)=> id===p.id)
    res.render("edit.ejs",{post});
});

//delete route
app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    posts=posts.filter((p)=> id!== p.id);
    res.redirect("/posts");
});

//creates web server listening incoming request
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});
