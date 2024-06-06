const mongoose = require("mongoose")
const connectDB = async() =>{
    try {
        const conn = await mongoose.connect("mongodb+srv://gargnimit36:chaintech%401234@chaintech.drkuqew.mongodb.net/");
        console.log(
          `Connected To Mongodb Database` 
        );
      } catch (error) {
        console.log(`Error in Mongodb`);
      }
    };

module.exports = connectDB;