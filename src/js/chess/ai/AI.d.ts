import { ChessBoard } from "../core/ChessBoard.js";
import { ChessPiece } from "../chessPiece/chessPiece.js";
import * as Types from "../Types.js";
export declare class AI {
    static getScore(chessBoard: ChessBoard, color: Types.typePieceColor): number;
    static getAllMoves(chessBoard: ChessBoard, color: Types.typePieceColor): {
        piece: ChessPiece;
        move: Types.position;
    }[];
    static getBestMove(ChessBoard: ChessBoard, color: Types.typePieceColor): {
        piece: ChessPiece;
        move: Types.position;
    } | undefined;
    static getMove(chessBoard: ChessBoard, color: Types.typePieceColor): {
        piece: ChessPiece;
        oldPos: Types.position;
        newPos: Types.position;
    } | undefined;
}
//# sourceMappingURL=AI.d.ts.map