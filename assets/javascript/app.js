var players = ["Michael Jordan", "Lebron James", "Magic Johnson", "Larry Bird"];

function renderButtons() {
    $("#bballButtons").empty();
    console.log("this worked"+ players);
    for (var i = 0; i < players.length; i++) {
          var a = $("<button>");
          a.addClass("player");
          a.attr("data-name", players[i]);
          console.log(a.attr("data-name"));
          a.text(players[i]);
          $("#bballButtons").append(a);
          
    };
};

$("#addPlayer").on("click", function(event) {
    event.preventDefault();
    var player = $("#playerInput").val().trim();
    players.push(player);

    renderButtons();
    
    $("button").on("click", function() {
        $("#players").empty();
        var player = $(this).attr("data-name");
        console.log("button clicked:" + player);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=dc6zaTOxFJmzC&limit=10";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        })
    
        .then(function(response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                  var gifDiv = $("<div class='item'>");
                  var rating = results[i].rating;
                  var p = $("<p>").text("Rating: " + rating);
                  var playerImage = $("<img>");
                  playerImage.attr("src", results[i].images.fixed_height.url);
      
                  gifDiv.prepend(p);
                  gifDiv.prepend(playerImage);
      
                  $("#players").prepend(gifDiv);
                }
              });
          });
});

renderButtons();

$("button").on("click", function() {
    $("#players").empty();
    var player = $(this).attr("data-name");
    console.log("button clicked:" + player);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var playerImage = $("<img>");
              playerImage.attr("src", results[i].images.fixed_height.url);
              playerImage.attr("class", "gif");
              playerImage.attr("data-still", results[i].images.fixed_height_still.url);
              playerImage.attr("data-animate", results[i].images.fixed_height.url);
              gifDiv.prepend(p);
              gifDiv.prepend(playerImage);
  
              $("#players").prepend(gifDiv);
            }
          });
      });

$(document.body).on("click", ".gif", function() {
        console.log("this click worked")
        var state = $(this).attr("data-state");
  
        if (state === "still"){
         $(this).attr("src", $(this).attr("data-animate"));
         $(this).attr("data-state","animate");
        } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state","still");
        }
   
});