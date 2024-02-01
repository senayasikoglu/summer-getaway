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
    },
    {
        imgPath: "./images/falseItems/jumper.png",
        itemType: false
    },
    {
        imgPath: "./images/falseItems/boot.png",
        itemType: false
    }

];

const player = new Player();


const boardDiv = document.getElementById("board");
const pointsDiv = document.getElementById("points");
const timerDiv = document.getElementById("timer");

const dialogDiv = document.getElementById("dialog");
const startBtn = document.getElementById("start-button");
const pointsArea = document.getElementById("points-area");


let timer;
let collision;
let points = 0;


startBtn.addEventListener("click", function () {
    boardDiv.innerHTML = "";
    startGame();
    showTimer();
});


function startGame() {
    player.createDomElement();
    pointsDiv.style.display = "block";
    timerDiv.style.display = "block";


    setInterval(() => {
        let selectedImgItem = itemsList[Math.floor(Math.random() * itemsList.length)];
        const newFallingItem = new FallingItem(selectedImgItem.imgPath, selectedImgItem.itemType);
        fallingItemList.push(newFallingItem);

    }, 600)

    collision = setInterval(() => {
        fallingItemList.forEach((fallingItemInstance) => {

            // 1. move current trueItem
            fallingItemInstance.moveDown();

            if (player.positionX < fallingItemInstance.positionX + fallingItemInstance.width &&
                player.positionX + player.width > fallingItemInstance.positionX &&
                player.positionY < fallingItemInstance.positionY + fallingItemInstance.height &&
                player.positionY + player.height > fallingItemInstance.positionY) {

                if (!fallingItemInstance.itemType) {
                    clearInterval(collision);

                    gameOver(false);
                    clearInterval(timer);

                } else {
                    fallingItemInstance.img.style.display = "none";
                    fallingItemInstance.stop();
                    fallingItemInstance.domElm.remove();

                    points += 10;

                    pointsDiv.innerHTML = `<h3> Points: ${points} </h3>`;

                    if (points === 100) {

                        clearInterval(collision);
                        clearInterval(timer);

                        dialogDiv.innerHTML = ""
                        dialogDiv.style.width = "30%";
                        dialogDiv.style.height = "50%";

                        const img = document.createElement("img");
                        img.setAttribute("src", "./images/bon-voyage.jpg");
                        img.setAttribute("class", "congratsImg");
                        img.style.width = "30vw"
                        img.style.height = "50vh"
                        dialogDiv.appendChild(img);



                        const hoverImg = document.createElement("img");
                        hoverImg.setAttribute("src", "./images/icons8-replay.gif");
                        hoverImg.setAttribute("class", "replayImg");

                        hoverImg.addEventListener("click", function () {
                            window.location.reload();
                        });

                        dialogDiv.style.display = 'block';
                        setInterval(function () {
                            dialogDiv.appendChild(hoverImg);

                        }, 2000);
                    }
                }
            }

        });

    }, 50);

    // add event listeners
    document.addEventListener("keydown", (e) => {
        if (e.code === 'ArrowLeft') {
            player.moveLeft();
        } else if (e.code === 'ArrowRight') {
            player.moveRight();
        } else if (e.code === 'ArrowUp') {
            player.moveUp();
        } else if (e.code === 'ArrowDown') {
            player.moveDown();
        }
    });

}


function gameOver(timeIsUp) {
    clearInterval(collision);
    dialogDiv.style.display = 'block';
    let title = timeIsUp ? `<h2>Time is Up!</h2>` : `<h2>Game Over</h2>`;
    pointsArea.innerHTML = title + "Score : " + points;
}

function showTimer() {
    timer = setInterval(function () {
        player.timeRemaining--;
        setTimerArea();

        if (player.timeRemaining === 0) {
            gameOver(true);
            clearInterval(timer);
        }
    }, 1000);

}

function setTimerArea() {
    const minutes = Math.floor(player.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (player.timeRemaining % 60).toString().padStart(2, "0");
    timerDiv.innerHTML = `<h3> Timer: ${minutes}:${seconds} </h3>`;
}



