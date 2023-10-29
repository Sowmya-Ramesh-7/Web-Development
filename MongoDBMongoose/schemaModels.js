const mongoose=require("mongoose");
//calling the main() function that we defined

main()
    .then(() => {
        console.log("connection successfull");
    })
    .catch((err)=>console.log(err));

//defining an async function
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test"); //async method that returns a promise
}


//creating schema
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number
});



//create Model(Collection)
const User=mongoose.model("User",userSchema);

//inserting documents into collection
const user1=new User({
    name:"Soumya",
    email:"xyz@gmail.com",
    age:40
});


user1.save()
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));

//insert many
User.insertMany([{
    name:"CBA",
    email:"xyz@gmail.com",
    age:45
},
{
    name:"XYZ",
    email:"avz@gmail.com",
    age:20
}]).then((res)=>console.log(res));

//model methods returns query objects that is thennable

User.find({age:{$gt:30}})
    .then((res)=>console.log(res));

User.deleteMany({age:{$gt:30}})
    .then((res)=>console.log(res));