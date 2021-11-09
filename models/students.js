//17. create a file students.js for creating schema

//18.  require mongoose module
const mongoose = require("mongoose");

//19. create a new schema using the mongoose.Schema({})
//give the appropriate type for the records.
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: Number,
  },
});

//20. crating the model for this schema
const student = mongoose.model("Student", studentSchema);

//21. exporting the schema
module.exports = student;

//-->go to index.js for further steps
