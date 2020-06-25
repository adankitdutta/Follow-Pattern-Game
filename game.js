var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(start).click(function(event){
  if(!started){
    $("#level-title").text("Level "+level);
    $('#start').hide();
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
