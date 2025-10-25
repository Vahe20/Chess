import { Rook, Knight, Bishop, Queen, Pawn, King } from "../chessPiece/index.js";
export function getKing(chessBoard, color) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = chessBoard.getPiece(i, j);
            if (piece &&
                piece.getType() === "king" &&
                piece.getColor() === color)
                return piece;
        }
    }
}
export function clearBoard(chessBoard) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            chessBoard.deletePiece(i, j);
        }
    }
}
export function setupPieces(chessBoard) {
    const setupRow = (row, color, imgPrefix) => {
        chessBoard.setPiece(row, 0, new Rook(color, "rook", { row: row, col: 0 }, `../assets/images/${imgPrefix}_rook.png`, false));
        chessBoard.setPiece(row, 1, new Knight(color, "knight", { row: row, col: 1 }, `../assets/images/${imgPrefix}_knight.png`));
        chessBoard.setPiece(row, 2, new Bishop(color, "bishop", { row: row, col: 2 }, `../assets/images/${imgPrefix}_bishop.png`));
        chessBoard.setPiece(row, 3, new Queen(color, "queen", { row: row, col: 3 }, `../assets/images/${imgPrefix}_queen.png`));
        chessBoard.setPiece(row, 4, new King(color, "king", { row: row, col: 4 }, `../assets/images/${imgPrefix}_king.png`, false));
        chessBoard.setPiece(row, 5, new Bishop(color, "bishop", { row: row, col: 5 }, `../assets/images/${imgPrefix}_bishop.png`));
        chessBoard.setPiece(row, 6, new Knight(color, "knight", { row: row, col: 6 }, `../assets/images/${imgPrefix}_knight.png`));
        chessBoard.setPiece(row, 7, new Rook(color, "rook", { row: row, col: 7 }, `../assets/images/${imgPrefix}_rook.png`, false));
    };
    setupRow(0, "white", "white");
    setupRow(7, "black", "black");
    for (let i = 0; i < 8; i++) {
        chessBoard.setPiece(1, i, new Pawn("white", "pawn", { row: 1, col: i }, "../assets/images/white_pawn.png"));
        chessBoard.setPiece(6, i, new Pawn("black", "pawn", { row: 6, col: i }, "../assets/images/black_pawn.png"));
    }
}
//# sourceMappingURL=Utils.js.map