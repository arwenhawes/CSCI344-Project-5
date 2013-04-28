var td = require("../models/todo.js"),
    toDoController = {};

toDoController.list = function (req, res) {
    td.find({}, function (err, todo) {
	if (err !== null) {
	    console.log(err);
	} else {
	    res.json(todo);
	}
    });
};

toDoController.create = function (req, res) {
    var t = new td({
	"description":req.body.description,
	"categories":req.body.categories
    });

    p.save(function (err, result) {
	if (err !== null) {
	    //send the error
	} else {
	    res.json(result);
	}
    });
};

PersonController.destroy = function (req, res) {
    Person.findOne({"name":req.body.name}, function (err, person) {
	if (err !== null) {
	    //handle err
	} else if (person === null) {
	    //person not found
	} else {
	    person.remove(function (err) {
		if (err !== null) {
		    //handle err
		}
	    });
	}
    });
};

module.exports = toDoController;