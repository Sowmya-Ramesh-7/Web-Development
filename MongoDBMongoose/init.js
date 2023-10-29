const mongoose=require("mongoose");
const Chat=require("./models/chat.js");


main()
    .then(() => {
        console.log("connection successfull");
    })
    .catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp"); 
}

let allchats=[{
        from:"Surya",
        to:"Dannie",
        msg:"This is the file",
        created_at:new Date()
    },
    {
        from:"John",
        to:"Sneha",
        msg:"I Love You",
        created_at:new Date()
    },
    {
        from:"Sahana",
        to:"Naina",
        msg:"How r u?",
        created_at:new Date()
    },
    {
        from:"Riya",
        to:"Nisha",
        msg:"Hello Frnd",
        created_at:new Date()
    }

];
Chat.insertMany(allchats);

// let chat1=new Chat({
//     from:"Neha",
//     to:"Priya",
//     msg:"Hi Priya",
//     created_at:new Date()
// })

// chat1.save().then((res)=>console.log(res));