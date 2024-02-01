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