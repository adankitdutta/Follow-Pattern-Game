var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

/*modal*/
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$(start).click(function(event){
  if(!started){
    $("#level-title").text("Level "+level);
    $('#start').hide();
    $('#myBtn').hide();
    nextSequence();
    started=true;
  }
});


$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
     if (userClickedPattern.length === gamePattern.length){
       setTimeout(function () {
         nextSequence();
       }, 1000);
     }
   } else {
     playSound("wrong");
     $("body").addClass("game-over");
     $("#level-title").text("GAME OVER😥");
     $('#start').show();
     $('#myBtn').show();
     $('#start').text('PLAY AGAIN!');
     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     startOver();

  }
}
function nextSequence(){

  userClickedPattern=[];

  level=level+1;
  $("#level-title").text("Level "+level);

  var randomNumber=Math.floor(Math.random()*4);
  randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);


}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}


function startOver(){
   gamePattern=[];
   level=0;
   started=false;
}
