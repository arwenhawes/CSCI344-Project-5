var mongoose = require("mongoose"),
    toDoSchema,
    toDo;

mongoose.connect("mongodb://localhost/development");

toDoSchema = new mongoose.Schema({
    "desc": String,
    "cats" : Array
});

toDo = mongoose.model("toDo", toDoSchema);

toDo.findOne({}, function (err, result) {
    if (err !== null) {
	console.log(err);
    } else if (result === null) {
	var t = new toDo({
	    "desc": "finish project 5",
	    "cats": "CSCI344"
	});

	t.save(function (err) {
	    if (err !== null) {
		console.log(err);
	    }
	});
    }
});

module.exports = toDo;