var mongoose = require("mongoose"),
    toDoSchema,
    toDo;

mongoose.connect("mongodb://localhost/development");

toDoSchema = new mongoose.Schema({
    "description": String,
    "categories" : String
});

toDo = mongoose.model("toDo", toDoSchema);

toDo.findOne({}, function (err, result) {
    if (err !== null) {
	console.log(err);
    } else if (result === null) {
	var t = new toDo({
	    "description": "finish project 5",
	    "categories": "CSCI344"
	});

	t.save(function (err) {
	    if (err !== null) {
		console.log(err);
	    }
	});
    }
});

module.exports = toDo;