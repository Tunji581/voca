var socket = io();
var playerAnswered = false;
var correct = false;
var name;
var score = 0;

function connect(data){

socket.on('connect', function() {
    //Tell server that it is host connection from game view
    socket.emit('player-join-game', data);
    
    document.getElementById('answer1').style.visibility = "visible";
    // document.getElementById('answer2').style.visibility = "visible";
    // document.getElementById('answer3').style.visibility = "visible";
    // document.getElementById('answer4').style.visibility = "visible";
});
}

socket.on('noGameFound', function(){
    window.location.href = '../../';//Redirect user to 'join game' page 
});

function answerSubmitted(num){
    
    if(playerAnswered == false){
        playerAnswered = true;
        
        socket.emit('playerAnswer', document.getElementById('anwser').value);//Sends player answer to server
        //!!!!!!!!!!!!!!!!Wichtig 
        //Hiding buttons from user
       
        document.getElementById('answer1').style.visibility = "hidden";
        // document.getElementById('answer2').style.visibility = "hidden";
        // document.getElementById('answer3').style.visibility = "hidden";
        // document.getElementById('answer4').style.visibility = "hidden";
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Answer Submitted! Waiting on other players...";
        
    }
}

//Get results on last question
socket.on('answerResult', function(data){
    if(data == true){
        correct = true;
    }
});

socket.on('questionOver', function(data){
    if(correct == true){
        document.getElementById("boxe").style.backgroundColor = "#4CAF50";
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Correct!";
    }else{
        document.getElementById("boxe").style.backgroundColor = "#f94a1e";
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Incorrect!";
    }
    document.getElementById('answer1').style.visibility = "hidden";
  
    socket.emit('getScore');
});

socket.on('newScore', function(data){
    document.getElementById('scoreText').innerHTML = "Score: " + data;
});

socket.on('nextQuestionPlayer', function(){
    correct = false;
    playerAnswered = false;
    
    document.getElementById('answer1').style.visibility = "visible";
    
    // document.getElementById('answer2').style.visibility = "visible";
    // document.getElementById('answer3').style.visibility = "visible";
    // document.getElementById('answer4').style.visibility = "visible";
    document.getElementById('message').style.display = "none";
    document.getElementById("boxe").style.backgroundColor = "white";
    
});

socket.on('hostDisconnect', function(){
    window.location.href = "../../";
});

socket.on('playerGameData', function(data){
   for(var i = 0; i < data.length; i++){
       if(data[i].playerId == socket.id){
           document.getElementById('nameText').innerHTML = "Name: " + data[i].name;
           document.getElementById('scoreText').innerHTML = "Score: " + data[i].gameData.score;
       }
   }
});

socket.on('GameOver', function(){
    document.getElementById("boxe").style.backgroundColor = "#FFFFFF";
    document.getElementById('answer1').style.visibility = "hidden";
    
    // document.getElementById('answer2').style.visibility = "hidden";
    // document.getElementById('answer3').style.visibility = "hidden";
    // document.getElementById('answer4').style.visibility = "hidden";
    document.getElementById('message').style.display = "block";
    document.getElementById('message').innerHTML = "GAME OVER";
});

