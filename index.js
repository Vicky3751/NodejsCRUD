/*
1. Create a folder in the windows.
2. open with vs code
3. open terminal
4. do    > npm init -y
5. install dependencies  --> npm i express mongoose
*/

//6.  create a entry point file --> index.json

//7. require express
const express = require("express");
//8. call express function in a variable app
const app = express();

//22. require the conn.js file here for the mongodb connection
require("./db/conn");
//23. require the students.js file for the creating of records in our database
const Students = require("./models/students");

//29. to render the json body type we should use app.use(express.json()) method -->middleware
app.use(express.json());
//30. to render the url req into the body we make use of this middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

//9. to get a home page GET request
app.get("/", async (req, res) => {
  const details = await Students.find();
  //console.log(details);
  res.send(details);
});

//11. Create a post request route for creating the student database
//you can do post request at "/" also   -->after step 11 make db folder
app.post("/", (req, res) => {
  //24. create a new instance of our model using new keyword
  const student = new Students({
    //25. the json input given will be in the body can be accessed by req.body variable.
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
  });
  //26. save the object into the database
  student.save();
  //29. to console log the req.body do this
  console.log(req.body);
  //28. to render the body we can make use of res.send(re.body)
  res.send(req.body);
});

app.get("/:id", async (req, res) => {
  let student = await Students.findById(req.params.id);

  if (!student) {
    return res.status(500).json({
      success: false,
      message: "Not found",
    });
  } else {
    res.send(student);
  }
});

app.put("/:id", async (req, res) => {
  let student = await Students.findById(req.params.id);
  if (!student) {
    return res.send({
      success: false,
      message: "Not found",
    });
  }
  student = await Students.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.send({
    success: true,
    message: "Done updating",
  });
});

app.delete("/:id", async (req, res) => {
  let student = await Students.findById(req.params.id);
  if (!student) {
    return res.send({
      success: false,
      message: "Not found",
    });
  }
  await student.remove();
  res.send({
    success: true,
    message: "Removed",
  });
});

//10. make the server listen to you code
app.listen(process.env.PORT | 3000, function () {
  console.log("port is running");
});
