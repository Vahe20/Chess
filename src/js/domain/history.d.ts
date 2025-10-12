import * as Types from "./globalTypes.js";
import { ChessPiece } from "./chessPiece/chessPiece";
import { ChessBoard } from './chess_board';
export declare class History {
    private head;
    private tail;
    private size;
    private current;
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