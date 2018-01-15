export class Board {
    constructor(rowCount, columnCount, bombCount) {
        this._bombCount = bombCount;
        this._tileCount = rowCount * columnCount;
        this._playerBoard = this.generatePlayerBoard(rowCount, columnCount);
        this._bombBoard = this.generateBombBoard(rowCount, columnCount, bombCount);
    }

    get playerBoard() {
        this._playerBoard;
    }

    flipTile(rowIndex, columnIndex) {
        if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
            // tile already flipped; do nothing
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
        }
        this._tileCount--;
    }

    getNumberOfNeighborBombs(rowIndex, columnIndex){
        const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
        const rowCount = this._bombBoard.length;
        const columnCount = this._bombBoard[0].length;

        let bombCount = 0;
        neighborOffsets.forEach((offset) => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
    
            if (neighborRowIndex >= 0 && neighborRowIndex < rowCount 
                && neighborColumnIndex >=0 && neighborColumnIndex < columnCount) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    bombCount++;
                }
            }
        });
        return bombCount;
    }

    hasSafeTiles() {
        return !(this._tileCount === this._bombCount);
    }

    hasBomb(rowIndex, columnIndex) {
        return this._playerBoard[rowIndex][columnIndex] === 'B';
    }

    print() {
        let printBoard = this._playerBoard.map(row => {
            return row.join(' | ');
        }).join('\n');
        console.log(printBoard);
    }

    static generatePlayerBoard(rowCount, columnCount) {
        let board = [];
        for (let i = 0; i < rowCount; i++) {
            let row = [];
            for (let j = 0; j < columnCount; j++) {
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }
    
    static generateBombBoard(rowCount, columnCount, bombCount) {
        let board = [];
        for (let i = 0; i < rowCount; i++) {
            let row = [];
            for (let j = 0; j < columnCount; j++) {
                row.push(null);
            }
            board.push(row);
        }
    
        let numberOfBombsPlaced = 0;
        while (numberOfBombsPlaced < bombCount) {
            let randomRowIndex = Math.floor(Math.random() * rowCount);
            let randomColumnIndex = Math.floor(Math.random() * columnCount);
            if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;
    }
}