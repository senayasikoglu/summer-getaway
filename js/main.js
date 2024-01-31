class Player {

    constructor() {
        this.width = 7;
        this.height = 15;
        this.positionX = 0;
        this.positionY = 0;
        this.domElm = null;

        this.createDomElement();

    }
    createDomElement(){
        // create dom element..
        this.domElm = document.createElement("div");


        // add content or modify
        this.domElm.setAttribute("id", "player");
        this.domElm.style.width = this.width + "vw"
        this.domElm.style.height = this.height + "vh"
        
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";
        
        const img  = document.createElement("img");
        img.setAttribute("src", '/images/girl.png');
        img.style.width = this.width-1 + "vw"
        img.style.height = this.height-1 + "vh"

        this.domElm.appendChild(img);

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);

    }

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX--;
            this.domElm.style.left = this.positionX + "vw";
        }
    }
    moveRight() {
        if (this.positionX + this.width  < 100) {
            this.positionX++;
            this.domElm.style.left = this.positionX + "vw";
        }
    }
}



class TrueItem{
    constructor(){
        this.width = 5;
        this.height = 8;
        this.positionX = Math.floor(Math.random() * (50 - this.width + 1)); // random number between 0 and (100 - this.width)
        this.positionY = 100;
        this.domElm = null;
 
        this.createDomElement();

    }

    createDomElement(){
        // create dom element..
        this.domElm = document.createElement("div");

        // add content or modify
        this.domElm.setAttribute("class", "trueItem");
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";
        this.domElm.style.width = this.width + "vw"
        this.domElm.style.height = this.height + "vh"

        const img  = document.createElement("img");
        img.setAttribute("src", '/images/falseItems/winter-hat.png');
        img.style.width = this.width-1 + "vw"
        img.style.height = this.height-1 + "vh"

        this.domElm.appendChild(img);

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);

    }

    moveDown(){
        this.positionY--;
        this.domElm.style.bottom = this.positionY + "vh"; 
        
    }

}


const player = new Player();
const trueItems = [];
const falseItems = [];
let points = 0;
const pointsDiv = document.getElementById("points");


 
//ben olsam iki farklı array yaparım
//birinde true itemlar diğerinde false itemlar 
// bunu yapabilmek için de farklı iki sınıfa ihtiyac var
setInterval(() => {
    const newTrueItem = new TrueItem();
    trueItems.push(newTrueItem);
    console.log(player);

},2000)

setInterval(() => {
    trueItems.forEach((trueItemInstance) => {

        // 1. move current trueItem
        trueItemInstance.moveDown();

        if (player.positionX < trueItemInstance.positionX + trueItemInstance.width &&
            player.positionX + player.width > trueItemInstance.positionX &&
            player.positionY < trueItemInstance.positionY + trueItemInstance.height &&
            player.positionY + player.height > trueItemInstance.positionY) {
            console.log("game over");
            location.href = "gameover.html";

           /* points+= 20;
            pointsDiv.innerHTML = `<h3> Points: ${points} </h3>`; */
            
        }

    });

},100);



// add event listeners
document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowLeft') {
        player.moveLeft();
    } else if (e.code === 'ArrowRight') {
        player.moveRight();
    }
});
//document.body.style.backgroundImage = "url('/Users/senayasikoglu/Downloads/vecteezy_gradient-happy-summer-background-with-beach_7718046_849/vecteezy_gradient-happy-summer-background-with-beach_7718046.jpg')";


//console.log("hello");

/*
body {
  background-image: url('/Users/senayasikoglu/Downloads/vecteezy_gradient-happy-summer-background-with-beach_7718046_849/vecteezy_gradient-happy-summer-background-with-beach_7718046.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

*/