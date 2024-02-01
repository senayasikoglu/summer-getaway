class Player {

    constructor() {
        this.width = 7;
        this.height = 15;
        this.positionX = 0;
        this.positionY = 0;
        this.domElm = null;

        this.createDomElement();

    }
    createDomElement() {
        // create dom element..
        this.domElm = document.createElement("div");

        // add content or modify
        this.domElm.setAttribute("id", "player");
        this.domElm.style.width = this.width + "vw"
        this.domElm.style.height = this.height + "vh"

        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";

        const img = document.createElement("img");
        img.setAttribute("src", "./images/girl.png");
        img.style.width = this.width - 1 + "vw"
        img.style.height = this.height - 1 + "vh"

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
        if (this.positionX + this.width < 50) {
            this.positionX++;
            this.domElm.style.left = this.positionX + "vw";
        }
    }
}


class FallingItem {
    constructor(imgPath, itemType) {
        this.width = 5;
        this.height = 8;
        this.positionX = Math.floor(Math.random() * (50 - this.width + 1)); // random number between 0 and (100 - this.width)
        this.positionY = 100;
        this.domElm = null;
        this.imgPath = imgPath;
        this.itemType = itemType;
        this.img = null;
        this.createDomElement();
    }

    createDomElement() {
        // create dom element..
        this.domElm = document.createElement("div");

        // add content or modify
        this.domElm.setAttribute("class", "fallingItem");
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";
        this.domElm.style.width = this.width + "vw"
        this.domElm.style.height = this.height + "vh"

        this.img = document.createElement("img");
        this.img.setAttribute("src", this.imgPath);
        this.img.style.width = this.width - 1 + "vw"
        this.img.style.height = this.height - 1 + "vh"

        this.domElm.appendChild(this.img);

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }

    moveDown() {
        this.positionY--;
        this.domElm.style.bottom = this.positionY + "vh";

    }
    stop(position) {
        this.positionY = position;
        this.domElm.style.bottom = this.positionY + "vh";
    }
}

const player = new Player();
const fallingItemList = [];
const itemsList = [
    {
        imgPath: "./images/trueItems/fins.png",
        itemType: true
    },
    {
        imgPath: "./images/trueItems/snorkel.png",
        itemType: true
    },
    {
        imgPath: "./images/trueItems/flipflops.png",
        itemType: true
    },
    {
        imgPath: "./images/trueItems/sun.png",
        itemType: true
    },
    {
        imgPath: "./images/trueItems/summer-hat.png",
        itemType: true
    },
    {
        imgPath: "./images/trueItems/sunbed.png",
        itemType: true
    },
    {
        imgPath: "./images/trueItems/sunglasses.png",
        itemType: true
    },
    {
        imgPath: "./images/trueItems/swim-suit.png",
        itemType: true
    },
    {
        imgPath: "./images/falseItems/gloves.png",
        itemType: false
    },
    {
        imgPath: "./images/falseItems/ice-skating-shoes.png",
        itemType: false
    },
    {
        imgPath: "./images/falseItems/ski.png",
        itemType: false
    },
    {
        imgPath: "./images/falseItems/snowflake.png",
        itemType: false
    },
    {
        imgPath: "./images/falseItems/snowman.png",
        itemType: false
    },
    {
        imgPath: "./images/falseItems/winter-hat.png",
        itemType: false
    },
    {
        imgPath: "./images/falseItems/coat.png",
        itemType: false
    }

];

let points = 0;
const pointsDiv = document.getElementById("points");
const dialogDiv = document.getElementById("dialog");

setInterval(() => {
    let selectedImgItem = itemsList[Math.floor(Math.random() * itemsList.length)];
    const newFallingItem = new FallingItem(selectedImgItem.imgPath, selectedImgItem.itemType);
    fallingItemList.push(newFallingItem);

}, 1500)

collision = setInterval(() => {
    fallingItemList.forEach((fallingItemInstance) => {

        // 1. move current trueItem
        fallingItemInstance.moveDown();

        if (player.positionX < fallingItemInstance.positionX + fallingItemInstance.width &&
            player.positionX + player.width > fallingItemInstance.positionX &&
            player.positionY < fallingItemInstance.positionY + fallingItemInstance.height &&
            player.positionY + player.height > fallingItemInstance.positionY) {

            if (!fallingItemInstance.itemType) {
                console.log("game over");
                //fallingItemInstance.stop(fallingItemInstance.positionY);
                clearInterval(collision);
                dialogDiv.style.display = 'block';


                //location.href = "gameover.html";     
            } else {
                fallingItemInstance.img.style.display = "none";
                fallingItemInstance.stop();
                fallingItemInstance.domElm.remove();

                points++;
                pointsDiv.innerHTML = `<h3> Points: ${points} </h3>`;
            }
        }

    });

}, 100);


// add event listeners
document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowLeft') {
        player.moveLeft();
    } else if (e.code === 'ArrowRight') {
        player.moveRight();
    }
});
