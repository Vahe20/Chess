import { Rules } from "../core/Rules.js";
import { gameMode } from "../Enums.js";
import { PricePiece } from "../Enums.js";
import { moveHandler } from "../ui/events/helper.js";
import { GameMode } from "../core/GameMode.js";
export class AI {
    static getScore(chessBoard, color) {
        let score = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = chessBoard.getPiece(i, j);
                if (!piece)
                    continue;
                const value = PricePiece[piece.getType()];
                score += piece.getColor() === color ? value : -value;
            }
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
        if (GameMode.getGameMode() === gameMode.easy) {
            const moves = this.getAllMoves(ChessBoard, color);
            if (moves.length === 0)
                return undefined;
            let bestMove = moves[Math.floor(Math.random() * moves.length)];
            let bestScore = -Infinity;
            for (const move of moves) {
                const boardClone = ChessBoard.clone();
                const piece = boardClone.getPiece(move.piece.getPosition().row, move.piece.getPosition().col);
                piece === null || piece === void 0 ? void 0 : piece.move(boardClone, move.move);
                const score = this.getScore(boardClone, color);
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
            return bestMove;
        }
        if (GameMode.getGameMode() === gameMode.medium) {
            const moves = this.getAllMoves(ChessBoard, color);
            if (moves.length === 0)
                return undefined;
            let bestMove = moves[Math.floor(Math.random() * moves.length)];
            let bestScore = -Infinity;
            for (const move of moves) {
                const boardClone = ChessBoard.clone();
                const piece = boardClone.getPiece(move.piece.getPosition().row, move.piece.getPosition().col);
                piece === null || piece === void 0 ? void 0 : piece.move(boardClone, move.move);
                const opponentColor = color === "white" ? "black" : "white";
                const opponentMoves = this.getAllMoves(boardClone, opponentColor);
                let worstResponseScore = Infinity;
                for (const move2 of opponentMoves) {
                    const boardClone2 = boardClone.clone();
                    const piece2 = boardClone2.getPiece(move2.piece.getPosition().row, move2.piece.getPosition().col);
                    piece2 === null || piece2 === void 0 ? void 0 : piece2.move(boardClone2, move2.move);
                    const score = this.getScore(boardClone2, color) + Math.random() * 0.1;
                    if (score < worstResponseScore)
                        worstResponseScore = score;
                }
                if (worstResponseScore > bestScore) {
                    bestScore = worstResponseScore;
                    bestMove = move;
                }
            }
            return bestMove;
        }
        if (GameMode.getGameMode() === gameMode.hard) {
        }
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