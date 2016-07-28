$(document).ready( function() {
console.log("J-E-T-S! JETS! JETS! JETS!");

  var teamNames = [["New England Patriots", "ne", "new england patriots", "patriots", "new england", "pats"], ["New York Jets", "nyj", "new york jets",  "jets", "gang green", "jet"], ["Buffalo Bills", "buf", "buffalo bills", "buffalo", "bills", "buff"], ["Miami Dolphins", "mia", "miami dolphins", "miami", "dolphins", "phins"], ["Cincinnati Bengals", "cin", "cincinnati", "bengals", "cincinnati bengals"], ["Pittsburgh Steelers", "pit", "pittsburgh", "steelers", "pittsburgh steelers"], ["Baltimore Ravens", "bal", "baltimore ravens", "baltimore", "ravens"], ["Cleveland Browns", "cle", "cleveland browns", "cleveland", "browns"], ["Houston Texans", "hou", "houston texans", "houston", "texans", "texas"], ["Indianapolis Colts", "ind", "indianapolis colts", "indianapolis", "colts", "indi"], ["Jacksonville Jaguars", "jax", "jacksonville jaguars", "jacksonville", "jaguars", "jags"], ["Tennessee Titans", "ten", "tennessee titans", "tennessee", "titans"], ["Denver Broncos", "den", "denver broncos", "denver", "broncos"], ["Kansas City Chiefs", "kc", "kansas city cheifs", "kansas city", "kansas", "chiefs"], ["Oakland Raiders", "oak", "oakland raiders", "oakland", "raiders"], ["San Diego Chargers", "sd", "san diego chargers", "sandiego chargers", "san diego", "chargers"], ["Washington Redskins", "was", "washington", "redskins", "skins"], ["Philidelphia Eagles", "phi", "philidelphia eagles", "philidelphia", "eagles", "philly"], ["New York Giants", "nyg", "new york giants", "giants", "big blue"], ["Dallas Cowboys", "dal", "dallas cowboys", "dallas", "cowboys"], ["Minnesota Vikings", "min", "minnesota vikings", "minnesota", "vikings"], ["Green Bay Packers", "gb", "green bay pakers", "green bay", "packers", "cheeseheads"], ["Detroit Lions", "det", "detroit lions", "detroit", "lions"], ["Chicago Bears", "chi", "chicago bears", "chicago", "bears"], ["Carolina Panthers", "car", "carolina panthers", "carolina", "panthers"], ["Atlanta Falcons", "atl", "atlanta falcons", "atlanta", "falcons", "atl birds"], ["New Orleans Saints", "new orleans saints", "new orleans", "saints"], ["Tampa Bay Buccaneers", "tb", "tampa bay buccaneers", "tampa bay", "tampa", "buccaneers", "bucs"], ["Arizona Cardinals", "ari", "arizona cardinals", "arizona", "cardinals", "cards"], ["Seattle Seahawks", "sea", "seattle", "seahawks", "seattle seahawks"], ["Los Angeles Rams", "la", "los angeles rams", "la rams", "rams"], ["San Francisco 49ers", "sf", "san francisco 49ers", "san fran", "49ers"]];

  var choices = [["Conferences", "conferences"], ["Division", "division"], ["Wins", "wins"], ["Losses", "losses"], ["Touchdowns", "touchdowns"]];

  var chatArea = $('.chat-area');
  var teamPosition;
  var faveTeam;
  var localHostUrl = 'http://localhost:3000';
  var herokuURL = 'https://floating-taiga-62407.herokuapp.com';
  var userTyped = "";
  var team = "";

  function johnMessage(txt) {
    var messageContainer = document.createElement('div');
    messageContainer.classList.add('messageContainer');
    var messageBox = document.createElement('div');
    var newTxt = document.createElement('div');
    var messageImg = document.createElement('img');
    messageImg.setAttribute("src", "chatpic.jpg")
    messageImg.classList.add('jmImg')
    messageBox.classList.add('talkbubble-jm');
    newTxt.classList.add('word');
    newTxt.innerHTML = txt;
    messageBox.appendChild(newTxt);
    messageContainer.appendChild(messageImg);
    messageContainer.appendChild(messageBox);
    $('.chat-area').append(messageContainer);
    $('.chat-area').animate({scrollTop: $('.chat-area').prop("scrollHeight")}, 400);
  };

  setTimeout(function() {
    johnMessage("Hey, John Madden here!");
  }, 1000);
  setTimeout(function() {
    johnMessage("Glad to chat with you.");
  }, 3000);
  setTimeout(function() {
    johnMessage("I can let you know about certain football stats if you ask me with the correct keywords.");
  }, 5000);
  setTimeout(function() {
    johnMessage("Right now, I only have information on the 2015 regular season.");
  }, 8000);
  setTimeout(function() {
    johnMessage("Pick a team!");
    userMessage();
  }, 10000);

  function userMessage() {
    $('#usermsg').on('keypress', function(e) {
      if (e.which == 13) {
        userTyped = $('#usermsg').val();
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('messageContainer');
        var messageBox = document.createElement('div');
        var newTxt = document.createElement('div');
        var userImg = document.createElement('img');
        userImg.setAttribute("src", "user.png")
        userImg.classList.add('userImg')
        messageBox.classList.add('talkbubble-user');
        newTxt.classList.add('word');
        newTxt.innerHTML = userTyped;
        messageBox.appendChild(newTxt);
        messageContainer.appendChild(userImg);
        messageContainer.appendChild(messageBox);
        $('.chat-area').append(messageContainer);
        $('.chat-area').animate({scrollTop: $('.chat-area').prop("scrollHeight")}, 400);
        console.log(userTyped);

        for (var i = 0; i < teamNames.length; i++) {
          for (var j = 0; j <teamNames[i].length; j++){
            if (userTyped.toLowerCase() === teamNames[i][j]) {
              $('#usermsg').val('');
              team = teamNames[i][0];
              teamPosition = i;
              console.log(teamNames[i][0]);
              teamStats();
            }
          };
        };

        for (var k = 0; k < choices.length; k++) {
          for (var l = 0; l < choices[k].length; l++) {
            if (team && userTyped.toLowerCase() == choices[k][l]) {
              $("#usermsg").val('');
              choice = choices[k][0];
              console.log(choice);
              getTeamStats();
            }
          };
        };

        if (userTyped.toLowerCase() == ("yes" || "ok" || "sure" || "yea" || "yeah")) {
          $("#usermsg").val('');

          var data = {
            team: faveTeam
          };

          console.log(data);

          $.ajax({
            // url: localHostUrl + '/jmc/favorites',
            url: herokuURL + '/jmc/favorites',
            method: 'POST',
            data: data,
            dataType: 'json'
          }).done(function(response) {
            console.log(response);
            setTimeout(function() {
              johnMessage("Your team has been saved to your favorites!");
            }, 1000);
            setTimeout(function() {
              johnMessage("Type 'View Faves' to view your favorite teams! Or type another team name to view more stats!");
            }, 2000);
          })
        }
        else if (userTyped.toLowerCase() == ("no" || "nope" || "no thanks" || "maybe" || "nah")) {
          $("#usermsg").val('');
          setTimeout(function() {
            johnMessage("Pick another team!");
          }, 2000);
        }

        if (userTyped.toLowerCase() == "view faves") {
          $("#usermsg").val('');
          console.log("view");
          viewFaves();
        }
        else if (userTyped.toLowerCase() == "clear") {
          $("#usermsg").val('');
          console.log("delete");
          deleteFaves();
        }
      }
    });
  }

  function teamStats() {
    setTimeout(function() {
      johnMessage("What would you like to know about the " + team + "?");
    }, 1000);
    setTimeout(function() {
      johnMessage("Here are some examples: `Conference`, `Division`, `Wins`, `Losses`, `Touchdowns`.");
    }, 3000);
  };

  function getTeamStats(){
    $.ajax({
      // url: localHostUrl + '/jmc/search',
      url: herokuURL + '/jmc/search',
      method: 'POST',
      dataType: 'json'
    })
    .done(function(data) {
      console.log("touchdown!");
      console.log(data);
      setTimeout(function() {
        faveTeam = data[teamPosition].Name;
        johnMessage(data[teamPosition][choice]);
      }, 1000)
      setTimeout(function() {
        johnMessage("Do you want to favorite this team?");
      }, 2000);
    })
    .fail(function() {
      console.log("erROAR!");
    });
  };

  function viewFaves() {
    console.log("view");
    $.ajax({
      // url: localHostUrl + '/jmc/favorites',
      url: herokuURL + '/jmc/favorites',
      method: 'GET',
      dataType: 'json'
    }).done(function(response){
      if (response.length){
        console.log(response);
        var faveList = ""
        for (var i = 0; i < response.length; i++){
          if (i === response.length -1){
            faveList += response[i].team + ".";
          }
          else {
            faveList += response[i].team + ", ";
          }
        }
        johnMessage(faveList);
        setTimeout(function() {
          johnMessage("Type 'Clear' to clear your favorite's list!");
        }, 2000);
      }
      else {
        johnMessage("You do not have any teams saved on your list! Type a team name to view team stats!");
      }
    });
  }

  function deleteFaves() {
    $.ajax({
      // url: localHostUrl + '/jmc/delete',
      url: herokuURL + '/jmc/delete',
      method: 'DELETE',
      dataType: 'json'
    }).done(function(response){
      console.log(response);
      johnMessage("You cleared your favorites list!");
      setTimeout(function() {
        johnMessage("Type another team name to view more stats!");
      }, 2000);
    });
  };
});
