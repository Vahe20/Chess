import { ChessBoard } from "../core/ChessBoard.js";
import { ChessPiece } from "../chessPiece/chessPiece.js";
import * as Types from "../Types.js";
export declare class AI {
    static pieceValue: Record<string, number>;
    static positionBonus(row: number, col: number, type: string): number;
    static evaluateBoard(chessBoard: ChessBoard, color: Types.typePieceColor, level: string): number;
    static getAllMoves(chessBoard: ChessBoard, color: Types.typePieceColor): {
        piece: ChessPiece;
        move: Types.position;
    }[];
    static minimax(chessBoard: ChessBoard, depth: number, maximizingPlayer: boolean, color: Types.typePieceColor, level: string, alpha?: number, beta?: number): number;
    static getBestMove(chessBoard: ChessBoard, color: Types.typePieceColor, level: string): {
        piece: ChessPiece;
        move: Types.position;
    } | null | undefined;
    static makeMove(chessBoard: ChessBoard, color: Types.typePieceColor, level: string): void;
    static cloneBoard(chessBoard: ChessBoard): ChessBoard;
}
//# sourceMappingURL=AI.d.ts.map