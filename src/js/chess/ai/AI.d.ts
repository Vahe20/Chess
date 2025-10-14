import { ChessBoard } from "../core/ChessBoard.js";
import { ChessPiece } from "../chessPiece/chessPiece.js";
import * as Types from "../Types.js";
import { History } from '../core/history';
export declare class AI {
    static pieceValue: Record<string, number>;
    static getAllMoves(chessBoard: ChessBoard, color: Types.typePieceColor): {
        piece: ChessPiece;
        move: Types.position;
    }[];
    static makeMove(chessBoard: ChessBoard, history: History, color: Types.typePieceColor, level: string): void;
    static cloneBoard(chessBoard: ChessBoard): ChessBoard;
}
//# sourceMappingURL=AI.d.ts.map