//reuired modules
const express = require("express")
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use('/static', express.static('static'));



// req and res
app.use("/",(req,res)=>{
    res.sendFile(__dirname + "/landing.html");
});


app.get("/signUp.html",(req,res)=>{
    res.sendFile(__dirname + "/signUp.html");
})

app.get("/doctors.html",(req,res)=>{
    res.sendFile(__dirname + "/doctors.html");
})


app.get("/profile.html",(req,res)=>{
    res.sendFile(__dirname + "/profile.html");
})

app.get("/form.html" ,(req,res)=>{
    res.sendFile(__dirname + "/form.html");
});

/*app.get("/loginpage.html",(req,res)=>{
    res.sendFile(__dirname +"/loginpage.html");
})*/

//connection to mongodb
mongoose.set('strictQuery',true)
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Kishore:mongodb2003@mycluster.jhyu1pw.mongodb.net/Mydatabase", {
useNewUrlParser: true,
useUnifiedTopology: true
},(err)=>{
    if(!err){
        console.log("connected to db");

    }
    else{
        console.log(err);
        console.log("error")
    }
});             

//1st schema
var nameSchema = new mongoose.Schema({
	email: String,
	password: String
   },{versionKey:false});
var User = mongoose.model("Users", nameSchema);

//2nd schema
var nameSchema = new mongoose.Schema({
    Name:String,
    Age:Number,
    Doctor:String,
    Contact:Number
},{versionKey:false});
var Userdetail = mongoose.model("Details",nameSchema);

//signup details
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/add", (req, res) => {
	
	var myData = new User(req.body);
	myData.save()
	.then(item => {
		res.sendFile(__dirname + "/loginpage.html");
	})
	.catch(err => {
		res.status(400).send("unable to save to database");
	});
   });

//userdetails
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/new",(req,res)=>{

    var myData = new Userdetail(req.body);
    myData.save()
    .then(item=>{
        res.send("Appointment successful");
    })
    .catch(err => {
        res.status(400).send("Check your internet connection");
    })
});


//port to listen
app.listen(8000,(err)=>{
    if(!err){
        console.log("Server started running at port 8000");
    }
    else{
        console.log("Error in the server");
    }
});