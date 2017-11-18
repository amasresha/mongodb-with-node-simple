// For windows install mongo db from here: 
// https://docs.mongodb.com/v2.8/tutorial/install-mongodb-on-windows/
// Then create a directory c:/data/db
//Then go to C:\MongoDB\Server\3.4\bin and open "mongod.exe" as admin
// Go to project directory using gitbash and run node app.js
// go to http://localhost:3000 on your browser
// add values to the fields and click submit

var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    port = 3000;

//use body-parser to capture inputs from DOM and convert to JSON format and send to the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connecting to the Database
mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/restful-demo-node", {
        useMongoClient: true,
    });

    //creating schema to mongodb
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

  //creating model from the schema
var User = mongoose.model("User", nameSchema);

// read route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// post route: adding values to db
app.post("/addinfo", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Data saved to db");
        })
        .catch(err => {
            res.status(400).send("Failed to save the data");
        });
});

//port service
app.listen(port, () => {
    console.log("Serving at port " + port);
});
