export class ChessBoard {
    constructor(color = "white") {
        this.board = Array.from({ length: 8 }, () => new Array(8).fill(undefined));
        this.currentPlayer = color;
    }
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    changeCurrentPlayer() {
        this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
    }
    setCurrentPlayer(color) {
        this.currentPlayer = color;
    }
    getPiece(i, j) {
        var _a;
        return (_a = this.board[i]) === null || _a === void 0 ? void 0 : _a[j];
    }
    setPiece(i, j, Piece) {
        if (!this.board[i]) {
            this.board[i] = [];
        }
        this.board[i][j] = Piece;
    }
    deletePiece(i, j) {
        if (!this.board[i]) {
            this.board[i] = [];
        }
        this.board[i][j] = undefined;
    }
}
//# sourceMappingURL=chess_board.js.map