import { ChessBoard } from "../core/ChessBoard.js";
import { Rules } from "../core/Rules.js";
export class AI {
    static getAllMoves(chessBoard, color) {
        const moves = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = chessBoard.getPiece(i, j);
                if (piece && piece.getColor() === color) {
                    const availableMoves = piece.getAvailableMoves(chessBoard);
                    availableMoves === null || availableMoves === void 0 ? void 0 : availableMoves.forEach(move => {
                        if (Rules.virtualBoard(chessBoard, { row: i, col: j }, move)) {
                            moves.push({ piece, move });
                        }
                    });
                }
            }
        }
        return moves;
    }
    static makeMove(chessBoard, history, color, level) {
    }
    static cloneBoard(chessBoard) {
        var _a;
        const clone = new ChessBoard(chessBoard.getCurrentPlayer());
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = (_a = chessBoard.getPiece(i, j)) === null || _a === void 0 ? void 0 : _a.clone();
                if (piece)
                    clone.setPiece(i, j, piece);
            }
        }
        return clone;
    }
}
AI.pieceValue = {
    pawn: 10,
    knight: 30,
    bishop: 30,
    rook: 50,
    queen: 90,
    king: 1000,
};
//# sourceMappingURL=AI.js.map