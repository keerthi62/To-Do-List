const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
const day = date.getDate();

res.render("list",{listTitle: day, newListItems: items,page: "/"});
});

app.post("/",function(req,res){
	const item = req.body.newItem;

	if(req.body.list === "Work List"){
		workItems.push(item);
		res.redirect("/work");
	}
	else{
		items.push(item);
	    res.redirect("/");
	}
});

app.get("/work", function(req,res){
res.render("list",{listTitle: "Work List", newListItems: workItems, page: "/work"});
});

app.post("/work",function(req,res){
	const item = req.body.newItem;
	workItems.push(item);
	res.redirect("/work");
});

app.listen(3000 ,function(){
	console.log("Server started on port 3000");
});

