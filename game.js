
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];



$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    
    playSound(userChosenColor);  
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
});


function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4); //Random number between 0-3
    var randomChosenColor = buttonColors[randomNumber]; //chossing a random color from the buttonColours array 
    gamePattern.push(randomChosenColor); //add the randomChosenColor to the end of the gamePattern array

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100); //making one of the buttons to flash
 
    var audio = new Audio("sounds/"+ randomChosenColor + ".mp3"); //attaching the audios to colors
    audio.play();

    var level = gamePattern.length-1;

    $("h1").text("Level "+level);

    
 };

 function playSound(name){ //Play sound when de user clicks in a button

    var audio = new Audio("sounds/"+ name + ".mp3"); //attaching the audios to colors
    audio.play();
 }


 function animatePress(currentColor){ //add animation when the button get pressed
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
    
 } 

 $(document).one("keydown", nextSequence)  //identify the first keydown and call nextSequence


function checkAnswer(currentLevel){ //check userClickedPattern and gamePattern

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("Sucess");
        
    }

    if(gamePattern.length == userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);

    }

    else if (gamePattern[currentLevel] !== userClickedPattern[currentLevel] ){  //gameover
        console.log("gameover");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
            

        $("h1").text("Game Over, Press Any Key to Restar");    

        var gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();

        starOver();
    }
          
}

function starOver(){
    gamePattern = [];
    $(document).one("keydown", nextSequence);
}
 

 
