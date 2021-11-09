//12. create a file conn.js for mongoose db connection

//13. require mongoose module
const mongoose = require("mongoose");

//14. make use of mongoose.connect to connect to mongodb
const check = mongoose
  .connect(
    "mongodb+srv://Vicky:Vinayaka@cluster0.j480f.mongodb.net/howgood?retryWrites=true&w=majority"
  ) //15. make sure to use the password you have given for your mongodb
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
//16. since it is a promise we need to resolve it using then and catch it

//--> after this go to creating the students schema
