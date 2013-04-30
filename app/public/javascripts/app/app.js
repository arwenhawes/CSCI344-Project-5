var main = function () {
  use="strict";
  
  var setUpClickHandler = function (anchor) {
      anchor.click(function () {
      var target = $(this).attr("href");
    
      $(".active").removeClass("active");
      $(this).addClass("active");
      $("#"+target).addClass("active");
    
      return false;
    });    
  };

  var setUpJSONTab = function (tab) {
      var tab_a = $("<a>"+tab.title+"</a>").addClass("tab").attr("href", tab.title);
      $(".tabs").append(tab_a);
    
      var content = $("<div>"+tab.content+"</div>").addClass("tab").attr("id",tab.title);
      $(".content").append(content);
      setUpClickHandler(tab_a);    
  }; 


  var setUpJSONTabAll = function (tab) {
      $('#tab1').append('<ul>'); // begin ul
      var counter = 0;
      for(i in tab) // iterate elements in all.json
      {
          var element = '<li><span>' + tab[i].description + "</span>: "; // append each desc
          tab[i].categories.forEach( function(cat) { // append each category seperately
              element += " " + cat;
          });
          element += '</li>';
          $('#tab1 ul').append(element);
          counter ++;
      }
      $('#tab1').append('</ul>');
  };

  $.getJSON("tabs/all.json", setUpJSONTabAll);
    
    var setUpJSONTabCats = function (todos) {
        todos.forEach( function (todo) { // iterate each todo on the entire list
            todo.categories.forEach(function (category) { // build div tab for each unique category
                if($('#' + category).length === 0) { // if category div doesn't exist, append
                    $('#tab2').append('<div id="' + category + '"><h2>' + category + '</h2><ul></ul></div>');
                }
            });
        });
      
        todos.forEach( function (todo) { // iterate each todo on the entire list
            todo.categories.forEach(function (category) { 
                $('#' + category + ' ul').append('<li>' + todo.description + '</li>');
            });
        });                    
    }// end setUpJSONTabCats
  
    $.getJSON("tabs/all.json", setUpJSONTabCats);
    setUpClickHandler($(".tabs .tab"));
 
    $(document).on('click', 'li', function() { // anytime an li is clicked, remove all matching 
        var textToCheck = $(this).html();
        $(this).remove();
        $('li').each(function() {
            if($(this).html().indexOf(textToCheck) !== -1 || textToCheck.indexOf($(this).html()) !== -1) { 
                $(this).remove(); 
            }        
        });        
    });
    
    $('#submit').click(function() {
        var desc = $('#desc').val();
        var cats = $('#cats').val().split(',');   
        var outStr = '<li><span>' + desc + '</span>: ';
        for(var i = 0; i < cats.length; i++) {
            outStr += cats[i] + " ";
        }
        outStr += "</li>";
        $('#tab1 ul').append(outStr);
        
        for(var i = 0; i < cats.length; i++) {
            if($('div#' + cats[i]).length > 0) { // if category exists on tab 2
                $('div#' + cats[i] + ' ul').append('<li>' + desc + '</li>');
            } else {
                $('#tab2').append('<div id="' + cats[i] + '"><h2>' + cats[i] + '</h2><ul><li>' + desc + '</li></ul></div>');                
            }
        }
        
        //add mongoDB code here to add stuff to db
     //$("#new_person").click(function () {
	    //  var name = $("#name").val(),
	      //    age = $("#age").val(),
	       var post_object = {};

	      if (desc === "" || cats === "") {
	        alert("Please have a todo and at least one category when creating a new todo");
	        } else {
	        post_object.desc = name;
	        post_object.cats = age;
	        console.log(post_object);

	    $.post("/todo/new", post_object, function (response) {
		      console.log(response);
		      $("#desc").val("");
		      $("#cats").val("");
	        });
	    }
    });
        
        
        return false;
    });
  
};

$(document).ready(main);
