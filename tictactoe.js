const readline = require("readline");

class TicTacToe {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.space = "_";
    this.pX = "X";
    this.pO = "O";

    this.rl.question("enter size of the board: ", (size) => {
      this.size = size;
      this.initializeGame();
    });
  }

  initializeGame() {
    this.board = this.initializeBoard(this.size);
    this.winningCombinations = this.generateWinningCombinations(this.size);
    this.currentPlayer = this.pX;
    this.gameLoop();
  }

  initializeBoard() {
    return Array(this.size * this.size).fill(this.space);
  }

  printBoard() {
    let size = Math.sqrt(this.board.length);
    for (let i = 0; i < this.board.length; i += size) {
      console.log(this.board.slice(i, i + size)); // slice takes index of starting element and size
    }
  }

  isMovesLeft() {
    return this.board.includes(this.space);
  }

  generateWinningCombinations() {
    const size = this.size;
    const combinations = [];
    // [
    //     [0, 1, 2], // r1
    //     [3, 4, 5], // r2
    //     [6, 7, 8], // r3
    //     [0, 3, 6], // col1
    //     [1, 4, 7], // col2
    //     [2, 5, 8], // col3
    //     [0, 4, 8], // diag1
    //     [2, 4, 6]  // diag2
    //   ]

    // rows
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(i * size + j);
      }
      combinations.push(row);
    }

    // columns
    for (let i = 0; i < size; i++) {
      const col = [];
      for (let j = 0; j < size; j++) {
        col.push(j * size + i);
      }
      combinations.push(col);
    }

    // diagonals
    const mainDiagonal = [];
    for (let i = 0; i < size; i++) {
      mainDiagonal.push(i * size + i);
    }
    combinations.push(mainDiagonal);

    // d2
    const otherDiagonal = [];
    for (let i = 0; i < size; i++) {
      otherDiagonal.push(i * size + (size - i - 1));
    }
    combinations.push(otherDiagonal);

    return combinations;
  }

  checkWinner(player) {
    for (const combination of this.winningCombinations) {
      if (combination.every((index) => this.board[index] === player)) {
        return true;
      }
    }
    return false;
  }

  makeMove(position, player) {
    if (this.board[position] === this.space) {
      this.board[position] = player;
      return true;
    }
    return false;
  }

  gameLoop() {
    this.printBoard();

    const playerName = this.currentPlayer === this.pX ? "player X" : "player O";
    this.rl.question(
      `${playerName}, enter position (0-${this.board.length - 1}): `,
      (input) => {
        const position = parseInt(input);

        if (this.makeMove(position, this.currentPlayer)) {
          if (this.checkWinner(this.currentPlayer)) {
            this.printBoard();
            console.log(`${playerName} wins!`);
            this.rl.close();
            return;
          } else if (!this.isMovesLeft()) {
            this.printBoard();
            console.log("It's a draw!");
            this.rl.close();
            return;
          }

          // switch player
          this.currentPlayer =
            this.currentPlayer === this.pX ? this.pO : this.pX;
          this.gameLoop();
        } else {
          console.log("invalid move, try again.");
          this.gameLoop();
        }
      }
    );
  }
}

// start
new TicTacToe();
