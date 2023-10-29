const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
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

// creating my sql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'myapp_db',
    password:'1234'
});


//home route - fetch and show total number of users in our app
app.get("/",(req,res)=>{
    let q="select count(*) from user";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let count=result[0]["count(*)"];
            res.render("home.ejs",{count});
        });
    }catch(err){
        res.send("error");
    }
});

// create route- new user
app.get("/user/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/user",(req,res)=>{
    let user=req.body;
    console.log(user);
    let data=[uuidv4(),user.username,user.email,user.password];
    console.log(data);
    let q="insert into user(id,username,email,password) values(?)";
    try{
        connection.query(q,[data],(err,result)=>{
            if(err) throw err;
            res.redirect("/");
        });
    }catch(err){
        res.send("error");
    }
});


//show route
app.get("/user",(req,res)=>{
    let q="select id,username,email from user";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            res.render("show.ejs",{result});
        });
    }catch(err){
        res.send("error");
    }
});

//edit route
app.get("/user/:id/edit",(req,res)=>{
    let {id}= req.params; //deconstruct data using {}
    let q="select * from user where id=?";
    try{
        connection.query(q,id,(err,result)=>{
            if(err) throw err;
            res.render("edit.ejs",{user:result[0]});
        });
    }catch(err){
        res.send("error");
    }
});

//Update route
app.patch("/user/:id",(req,res)=>{
    let {id}= req.params; //deconstruct data using {}
    let {username,password}=req.body;
    console.log(username);
    let q1=`select * from user where id='${id}'`;
    try{
        connection.query(q1,(err,user)=>{
            if(err) throw err;
            if(password!=user[0].password){
                res.send("Invalid password");
            }else{
                let q2=`update user set username=? where id='${id}'`;
                connection.query(q2,username,(err,user)=>{
                    if(err) throw err;
                    res.redirect("/user"); 
                });
            }
        });
    }catch(err){
        res.send("error");
    }
});

//delete route
app.get("/user/:id/delete",(req,res)=>{
    let {id}= req.params; //deconstruct data using {}
    let q="select * from user where id=?";
    try{
        connection.query(q,id,(err,result)=>{
            if(err) throw err;
            res.render("delete.ejs",{user:result[0]});
        });
    }catch(err){
        res.send("error");
    }
});

app.delete("/user/:id",(req,res)=>{
    let {id}= req.params; //deconstruct data using {}
    let {email,password}=req.body;
    let q1=`select * from user where id='${id}'`;
    try{
        connection.query(q1,(err,user)=>{
            if(err) throw err;
            if(password!=user[0].password && email!=user[0].email){
                res.send("Invalid email or password");
            }else{
                let q2=`delete from user where id='${id}'`;
                connection.query(q2,(err,user)=>{
                    if(err) throw err;
                    res.redirect("/"); 
                });
            }
        });
    }catch(err){
        res.send("error");
    }
});


app.listen("8080",()=>{
    console.log("App is Listening at port 8080");
});



//generate fake data
let getRandomUser=()=>{
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password()
    ]
};


// let data=[];
// for(let i=0;i<100;i++){
//     data.push(getRandomUser());
// }


// let user= [["1","user1","user1@gmail.com","pass1"],
//            ["2","user2","user2@gmail.com","pass2"]
// ];


//insert data using placeholder

// let q="insert into user(id,username,email,password) values ?";

// try{
// connection.query(q,[data],(err,result)=>{
//     if(err) throw err;
//     console.log(result);
// })
// }catch(err){
//     console.log(err);
// }
// connection.end();


