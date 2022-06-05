function randomNumber(){
    return Math.floor(Math.random()*255);
}

function color(){
 
 
    let r = randomNumber();
    let g = randomNumber();
    let b = randomNumber();
    var bgColor = "rgb(" + r + "," + g + "," + b + ")";
    document.body.style.background = bgColor;
}