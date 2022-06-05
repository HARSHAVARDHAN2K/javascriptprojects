 

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
 