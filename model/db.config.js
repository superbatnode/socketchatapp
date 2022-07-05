const mongoose = require("mongoose"); 
async function dbcon(){
    try{
       return await mongoose.connect("mongodb://127.0.0.1:27017/chat")
    }catch(e){
        throw new Error(e)
    }
}
module.exports = dbcon;