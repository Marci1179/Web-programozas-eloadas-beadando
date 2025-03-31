class BaseTile {
    constructor(value) {
        this.value = value;
    }

    createElement() {
        const div = document.createElement("div");
        div.classList.add("tile");
        div.textContent = this.value !== 0 ? this.value : "";
        if (this.value === 0) div.classList.add("empty");
        return div;
    }
}

class Tile extends BaseTile {
    constructor(value) {
        super(value);
    }

    createElement() {
        const div = super.createElement();
        div.addEventListener("click", () => game.moveTile(this.value));
        return div;
    }
}

class Game {
    constructor() {
        this.board = [];
        this.size = 4;
        this.initBoard();
    }

    initBoard() {
        this.board = [...Array(this.size * this.size).keys()];
        this.board.shift();
        this.board.push(0); 
        this.render();
    }

    shuffleTiles() {
        do {
            for (let i = this.board.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.board[i], this.board[j]] = [this.board[j], this.board[i]];
            }
        } while (!this.isSolvable());  
        this.render();
    }

    isSolvable() {
        let inversions = 0;
        const flatBoard = this.board.filter(num => num !== 0);
        for (let i = 0; i < flatBoard.length; i++) {
            for (let j = i + 1; j < flatBoard.length; j++) {
                if (flatBoard[i] > flatBoard[j]) inversions++;
            }
        }
        const emptyRow = Math.floor(this.board.indexOf(0) / this.size);
        return (inversions % 2 === 0) === (emptyRow % 2 === 1);
    }

    moveTile(value) {
        if (value === 0) return;
        const index = this.board.indexOf(value);
        const emptyIndex = this.board.indexOf(0);
        const possibleMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - this.size, emptyIndex + this.size];
        
        if (possibleMoves.includes(index)) {
            [this.board[index], this.board[emptyIndex]] = [this.board[emptyIndex], this.board[index]];
            this.render();
        }
    }

    solveGame() {
        this.board = [...Array(this.size * this.size).keys()].slice(1);
        this.board.push(0);
        this.render();
    }

    checkWin() {
        const isWin = this.board.slice(0, -1).every((num, i) => num === i + 1);
        this.showMessage(isWin ? "🎉 Gratulálok! Nyertél!" : "❌ Még nincs kész!");
    }
    
    showMessage(text) {
        const messageBox = document.getElementById("message-box");
        messageBox.textContent = text;
        messageBox.style.display = "block";
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 3000);
    }
    

    render() {
        const boardDiv = document.getElementById("game-board");
        boardDiv.innerHTML = "";
        this.board.forEach(num => boardDiv.appendChild(new Tile(num).createElement()));
    }
}

const game = new Game();
