//challenge 1: YOUR AGE IN DAYS
function ageInDayz(){
    var birthYear = prompt("what year were you born..?");
    var h1 = document.createElement('h1');
    var ageInDays = (2021-birthYear)*365;
    var textAnswer = document.createTextNode('You are ' + ageInDays + 'days old');
    console.log(ageInDays);
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
 
function reset(){
    document.getElementById('ageInDays').remove();
}

//CAT Generator challenge


function cat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://cdn2.thecatapi.com/images/MTc5MTMxNw.jpg";
    div.append(image);
}

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

//Button challenge


var allButton = document.getElementsByTagName('button');
 

var copyAllButtons = [];
for(let i=0; i<allButton.length; i++){
    copyAllButtons.push(allButton[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy){
    if(buttonThingy.value === 'red'){
        buttonsRed();
    }else if(buttonThingy.value === 'green'){
        buttonsGreen();
    }else if(buttonThingy.value === 'random'){
        randomColor();
    }else{
        reset();
    }
}

function buttonsRed(){
    for(let i=3; i<allButton.length; i++){
        allButton[i] .classList.remove(allButton[i].classList[1]);
        allButton [i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i=3; i<allButton.length; i++){
        allButton[i] .classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-success');
    }
}

function reset(){
    for(let i=3; i<allButton.length; i++){
        allButton[i] .classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(copyAllButtons[i]);
    }
}

function randomColor(){
    for(let i=3; i<allButton.length; i++){
    var choices = ['btn-primary','btn-danger','btn-success','btn-warning'];
    allButton[i].classList.remove(allButton[i].classList[1]);
    allButton[i].classList.add(choices[Math.floor(Math.random()*4)]);
    }
} 

// Challenge 5: Blackjack


let blackJackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div':'#your-box','score':0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div':'#dealer-box','score':0},
    'cards' : ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':1},
    'wins':0,
    'loses':0,
    'draws':0,
    'isStand':false,
    'turnOver':false,
};

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
console.log(YOU);

const hitsound = new Audio('./source/sounds/swish.m4a');
const winsound = new Audio('./source/sounds/cash.mp3');
const loseSound = new Audio('./source/sounds/aww.mp3');

function hit(){
    if(blackJackGame['isStand'] === false){
        let card = randomCard();
        console.log(card);
        updateScore(card,YOU);
        showCard(card, YOU);
        showscore(YOU);
        console.log(blackJackGame['you']['score']);
    }
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
          let image = document.createElement('img');
         image.setAttribute('src',`./source/images/${card}.png`);
         document.querySelector(activePlayer['div']).appendChild(image);
         hitsound.play();
        } 
}

function randomCard(){
    return blackJackGame['cards'][Math.floor(Math.random()*13)];
}

function updateScore(card, activePlayer){
    let points = activePlayer['score'] + blackJackGame['cardsMap'][card];
   
    activePlayer['score'] += blackJackGame['cardsMap'][card];
   
}

function showscore(activePlayer){
    if(activePlayer['score'] > 21 ){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';     
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
 
function deal(){
    if(blackJackGame['turnOver'] === true){
        blackJackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    console.log(yourImages);
    for(let i=0; i<yourImages.length; i++){
        yourImages[i].remove();
    }
    for(let i=0; i<dealerImages.length; i++){
        dealerImages[i].remove();
    }
        console.log(YOU['score']);
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.getElementById('your-blackjack-result').textContent = 0;
        document.getElementById('dealer-blackjack-result').textContent = 0;
        document.getElementById('your-blackjack-result').style.color = 'white';
        document.getElementById('dealer-blackjack-result').style.color = 'white';
        tableResult();
        blackJackGame['turnOver']  = false;
    }
}

//DEALER LOGIC
async function dealerLogic(){
    blackJackGame['isStand'] = true;
    while(DEALER['score']<16 && blackJackGame['isStand'] === true){
        let card = randomCard();
        console.log(card);
        updateScore(card,DEALER);
        showCard(card, DEALER);
        showscore(DEALER); 
        await sleep(1000);
    } 
        blackJackGame['turnOver'] = true;
        let winner = computeWinner();
        showResult(winner);
}

//compute winner and return who just won 
function computeWinner(){
    let winner;
    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21)){
            console.log('you won!');
            winner = YOU;
            blackJackGame['wins']++;
        }else if(YOU['score']<DEALER['score']){
            console.log('you lost');
            winner = DEALER;
            blackJackGame['loses']++;
        }else if(YOU['score'] === DEALER['score']){
            console.log('you drew');
            blackJackGame['draws']++;
        }
    }else if(YOU['score']>21 && DEALER['score'<=21]){
        console.log('You lost');
        winner = DEALER;
        blackJackGame['loses']++;
    }else if(YOU['score']>21 && DEALER['score']>21){
        console.log('you drew!');
        blackJackGame['draws']++;
    }
    console.log('winner:' ,winner)
    return winner;
    
}

function showResult(winner){
    if(blackJackGame['turnOver'] === true){
        let message,messageColor;
    if(winner === YOU){
        message = 'You Won!';
        messageColor = 'green';
        winsound.play();
    }else if(winner === DEALER){
        message = 'You Lost!';
        messageColor = 'red';
        loseSound.play();
    }else{
        message = 'You Drew!';
        messageColor = 'black';
    }
    document.querySelector('#black-jack-result').textContent = message;
    document.querySelector('#black-jack-result').style.color = messageColor;
    console.log(blackJackGame);
    }
}

function tableResult(){
    document.querySelector('#win').textContent = blackJackGame['wins'];
    document.querySelector('#draw').textContent = blackJackGame['draws'];
    document.querySelector('#loses').textContent = blackJackGame['loses'];
}
 