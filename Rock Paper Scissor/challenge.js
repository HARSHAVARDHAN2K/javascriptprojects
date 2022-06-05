//Challenge 3:Rock Paper Scissor


function rpsGame(yourchoice){
     
    var humanChoice,botChoice;
    humanChoice = yourchoice.id;
    botChoice = numberToChoice(randomToRpsInt());
    console.log('computerChoice:', botChoice);
    console.log('your choice:', humanChoice);
    results= decideWinner(humanChoice,botChoice);
    console.log(results); 
    message = finalMessage(results); // {'message': 'you won!', 'color': 'green}
    console.log(message);
    rpsFrontEnd(yourchoice.id , botChoice, message);
}

function randomToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return ['rock','paper', 'scissor'][number];
}

function decideWinner(yourChoice,computerChoice) {
    rpsDataBase = {
        'rock': {'scissor': 1, 'rock': 0.5, 'paper':0},
        'paper':{'scissor': 0, 'rock': 1, 'paper':0.5},
        'scissor': {'scissor': 0.5, 'rock': 0, 'paper':1}
    }
    var yourScore = rpsDataBase[yourChoice][computerChoice];
    var computerScore = rpsDataBase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore,computerScore]){
    if (yourScore === 0){
        return {'message': 'you lost!', 'color': 'green'};
    }else if (yourScore === 0.5){
        return {'message': 'you Draw!', 'color': 'blue'};
    }else {
        return {'message': 'you Won!', 'color': 'yellow'};
    }
}

function rpsFrontEnd(humanChoice,botChoice,finalMessage){
    var imageDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissor':document.getElementById('scissor').src
    }
    //let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanimage = document.createElement('img');
    var botimage = document.createElement('img');
    humanimage.src = imageDatabase[humanChoice];
    console.log(humanimage);
    botimage.src = imageDatabase[botChoice];
    console.log(botimage);
    var sen = document.createElement('div');
    var div = document.getElementById('flex-box-rps-div');
    div.appendChild(humanimage);
 sen.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1> "
 div.appendChild(sen);   
 div.appendChild(botimage);
}

 