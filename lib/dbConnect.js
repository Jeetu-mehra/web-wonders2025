import mongoose from "mongoose";

//connecting to the database
async function connectionToDatabase(){
    try{
        await mongoose.connect(process.env.MongoURL)
        console.log("connected to the database");
        
    }
    catch(err){
        console.log(err)
    }
}

export default connectionToDatabase