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
    clone() {
        const newBoard = new ChessBoard(this.currentPlayer);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = this.getPiece(i, j);
                if (piece) {
                    newBoard.setPiece(i, j, piece.clone());
                }
            }
        }
        return newBoard;
    }
    loadState(chessBoard) {
        this.board = Array.from({ length: 8 }, () => new Array(8).fill(undefined));
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = chessBoard.getPiece(i, j);
                if (piece) {
                    this.setPiece(i, j, piece.clone());
                }
            }
        }
        this.currentPlayer = chessBoard.getCurrentPlayer();
    }
}
//# sourceMappingURL=chess_board.js.map