import { Rules } from "../core/Rules.js";
import { PricePiece } from "../Enums.js";
import { moveHandler } from "../ui/events/helper.js";
export class AI {
    static getScore(ChessBoard, move) {
        let score = 0;
        const piece = move.piece;
        const oldPos = piece.getPosition();
        const newPos = move.move;
        const attack = ChessBoard.getPiece(newPos.row, newPos.col);
        if (attack) {
            const type = attack.getType();
            score += PricePiece[`${type}`];
        }
        return score;
    }
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
    static getBestMove(ChessBoard, color) {
        const moves = this.getAllMoves(ChessBoard, color);
        if (moves.length === 0)
            return undefined;
        let bestMove = moves[Math.floor(Math.random() * moves.length)];
        let bestScore = 0;
        for (const move of moves) {
            const newBoard = ChessBoard.clone();
            const score = this.getScore(newBoard, move);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return bestMove;
    }
    static makeMove(chessBoard, history, color) {
        const move = this.getBestMove(chessBoard, color);
        if (!move)
            return;
        const oldPos = move.piece.getPosition();
        const newPos = move.move;
        moveHandler(chessBoard, move.piece, history, oldPos, newPos);
    }
}
//# sourceMappingURL=AI.js.map