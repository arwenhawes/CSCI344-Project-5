// We need to 'require' the following modules                                                                                                                    
var express = require("express"),
    http = require("http"),
    path = require("path"),
    app = express(),
    pc;

// Load Controllers
pc = require("./controllers/todo_controller.js");

app.configure(function () {
    // Define our static file directory, it will be 'public'                             
    app.use(express.static(path.join(__dirname, "public")));

    // This allows us to parse the post requests data
    app.use(express.bodyParser());
});

http.createServer(app).listen(3000, function () {
    console.log("Server running on port 3000");
});

app.get("/all.json", pc.list); //gets the todos from the all.json file
app.post("/todo/new", pc.create); //posts new todo to the mongoDB
//app.post("/todo/delete", pc.destroy);