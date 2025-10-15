import { ChessBoard } from "../core/ChessBoard.js";
import { ChessPiece } from "../chessPiece/chessPiece.js";
import * as Types from "../Types.js";
import { History } from "../core/history.js";
declare enum Level {
    high = 3,
    normal = 2,
    easy = 1
}
export declare class AI {
    static getScore(ChessBoard: ChessBoard, move: {
        piece: ChessPiece;
        move: Types.position;
    }, level: number): number;
    static getAllMoves(chessBoard: ChessBoard, color: Types.typePieceColor): {
        piece: ChessPiece;
        move: Types.position;
    }[];
    static getBestMove(ChessBoard: ChessBoard, color: Types.typePieceColor, level: number): {
        piece: ChessPiece;
        move: Types.position;
    } | undefined;
    static makeMove(chessBoard: ChessBoard, history: History, color: Types.typePieceColor, level: string | Level): void;
}
export {};
//# sourceMappingURL=AI.d.ts.map