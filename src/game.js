import { Board } from './board';

export class Game {
    constructor(rowCount, columnCount, bombCount) {
        this._board = new Board(rowCount, columnCount, bombCount);
    }

    playMove(rowIndex, columnIndex) {
        // flip the tile
        this._board.flipTile(rowIndex, columnIndex);

        if (this._board.hasBomb(rowIndex, columnIndex)) {
            // game lost
            const msg = `Oh no! A bomb has been hit! :-(`;
            displayMsg(msg);
        } else if(!this._board.hasSafeTiles()) {
            // game won
            const msg = `Ayyyeee! You've won! :-)`;
            this._displayMsg(msg);
        } else {
            // not a bomb and more safe tiles remain; keep playing
        }
    }

    _displayMsg(msg) {
        vex.dialog.alert(msg)
    }
}