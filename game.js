//colour of buttons
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false; //initializing start to false
var level = 0;

$(document).keypress(function() { //jQuery function for player keypress operation
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() { //button click function

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour); //to play the respective button sound as pressed by the player
  animatePress(userChosenColour); //button press animation

  checkAnswer(userClickedPattern.length-1); //checking whether pattern is same as generated
});

function checkAnswer(currentLevel) { //computing current level of the player
// GENERATING PATTERNS ACCORDING TO LEVEL(HIGHER THE LEVEL TOUGHER THE PATTERN)
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else { // GAME OVER CASE
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () { //game over timeout
        $("body").removeClass("game-over");
      }, 200);

      startOver(); //for restart
    }
}


function nextSequence() { //for generation of next sequence
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); //random sequence generation among the 4 colours
  var randomChosenColour = buttonColours[randomNumber]; //choosing buttons randomly for the next sequence generation
  gamePattern.push(randomChosenColour); //pushing the randomly generated button to the memory stack

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) { //for press animation sounds according to the colour button pressed
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) { //sounds for diff buttons
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() { //start over or restart function if the player wants to try again
  level = 0;
  gamePattern = [];//initializing game pattern to 0
  started = false;
}
