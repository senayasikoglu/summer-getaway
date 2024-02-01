class Player {

    constructor() {
        this.width = 5;
        this.height = 10;
        this.positionX = 0;
        this.positionY = 0;
        this.domElm = null;
        this.timeRemaining=30;

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
            this.positionX = this.positionX - 4;
            this.domElm.style.left = this.positionX + "vw";
        }
    }
    moveRight() {
        if (this.positionX + this.width < 50) {
            this.positionX = this.positionX + 3;
            this.domElm.style.left = this.positionX + "vw";
        }
    }
    moveUp() {
        if (this.positionY + this.height < 70) {
            this.positionY = this.positionY + 4;
            this.domElm.style.bottom = this.positionY + "vh";
        }
    }
    moveDown() {
        if (this.positionY > 0) {
            this.positionY = this.positionY - 4;
            this.domElm.style.bottom = this.positionY + "vh";
        }
    }
}