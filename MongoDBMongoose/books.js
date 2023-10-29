
const mongoose=require("mongoose");

main()
    .then(()=>console.log("connection successful"))
    .catch((err)=>console.error(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
    },
    price:{
        type:String,
    }
})

const Book=new mongoose.model("Book",bookSchema);

let book1=new Book({title:"Wings",price:200});
book1.save()
    .then((res)=>console.log(res))
    .catch((err)=>console.error(err));