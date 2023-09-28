const express= require("express"); 
//express stores the function to create web application

//that is to run and it returns an object thats stored in app variable
const app=express();
let port=3000;

app.listen(port,()=>{
    console.log("app is listening");
})

// app.use((req,res)=>{
//     console.log("request recieved");
//     let htmlcode="<h1>This is a html response</h1>"
//     res.send(htmlcode)
// });

app.get("/",(req,res)=>{
    res.send("<h1>This is the root path</h1>");
});
app.get("/fruits",(req,res)=>{
    res.send("<h1>Fruits Page</h1>");
});
app.get("*",(req,res)=>{
    res.send("<h1>This path does not exists</h1>");
});

app.post("/",(req,res)=>{
    res.send("<h1>hi, You sent a post request</h1>");
});