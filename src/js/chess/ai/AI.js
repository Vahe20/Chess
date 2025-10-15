import { Rules } from "../core/Rules.js";
import { Render } from "../ui/Render.js";
import { History } from "../core/history.js";
var PricePiece;
(function (PricePiece) {
    PricePiece[PricePiece["pawn"] = 10] = "pawn";
    PricePiece[PricePiece["knight"] = 30] = "knight";
    PricePiece[PricePiece["bishop"] = 30] = "bishop";
    PricePiece[PricePiece["rook"] = 50] = "rook";
    PricePiece[PricePiece["queen"] = 90] = "queen";
    PricePiece[PricePiece["king"] = 1000] = "king";
})(PricePiece || (PricePiece = {}));
var Level;
(function (Level) {
    Level[Level["high"] = 3] = "high";
    Level[Level["normal"] = 2] = "normal";
    Level[Level["easy"] = 1] = "easy";
})(Level || (Level = {}));
export class AI {
    static getScore(ChessBoard, move, level) {
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
    static getBestMove(ChessBoard, color, level) {
        const moves = this.getAllMoves(ChessBoard, color);
        if (moves.length === 0)
            return undefined;
        let bestMove = moves[Math.floor(Math.random() * moves.length)];
        let bestScore = 0;
        for (const move of moves) {
            const newBoard = ChessBoard.clone();
            const score = this.getScore(newBoard, move, level);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return bestMove;
    }
    static makeMove(chessBoard, history, color, level) {
        let levelValue;
        if (level === "easy")
            levelValue = Level.easy;
        else if (level === "normal")
            levelValue = Level.normal;
        else if (level === "high")
            levelValue = Level.high;
        else if (typeof level === "number")
            levelValue = level;
        else
            throw new Error("Invalid Level");
        const move = this.getBestMove(chessBoard, color, levelValue);
        if (!move)
            return;
        const oldPos = move.piece.getPosition();
        const newPos = move.move;
        History.addMove(oldPos, newPos, chessBoard.getPiece(newPos.row, newPos.col));
        move.piece.move(chessBoard, newPos);
        Render.movePieceAnim(chessBoard, oldPos, newPos);
    }
}
//# sourceMappingURL=AI.js.map