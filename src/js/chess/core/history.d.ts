import * as Types from "../Types.js";
import { ChessPiece } from "../chessPiece/chessPiece.js";
import { ChessBoard } from "./ChessBoard.js";
export declare class History {
    private head;
    private tail;
    private size;
    constructor();
    init(chessBoard: ChessBoard): void;
    push(oldPos: Types.position, newPos: Types.position, chessPiece: ChessPiece | undefined, chessBoard: ChessBoard): void;
    undo(chessBoard: ChessBoard): void;
    redo(chessBoard: ChessBoard): void;
    renderHistory(): void;
    private static addMove;
    static clear(): void;
}
//# sourceMappingURL=history.d.ts.map