import { ChessBoard } from "./chess_board.js";
import * as Types from "./globalTypes";
export declare class Render {
    static renderBoard(chessBoard: ChessBoard): void;
    static movePieceAnim(chessboard: ChessBoard, oldPos: Types.position, newPos: Types.position): void;
    static renderCastlingMove(castling_pos: Types.position[]): void;
    static renderMoves(moves: Types.position[]): void;
    static renderCheck(chessBoard: ChessBoard, row: number, col: number): void;
    static renderMath(chessBoard: ChessBoard): void;
    static clearSelectedCell(): void;
}
//# sourceMappingURL=render.d.ts.map