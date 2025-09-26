import { ChessBoard } from "../chess_board.js";
import { ChessPiece } from "./chessPiece.js";
import * as Types from "../globalTypes.js";
export declare class Pawn extends ChessPiece {
    constructor(color: Types.typePieceColor, type: Types.typePiece, position: Types.position, img: string);
    getAvailableMoves(chessBoard: ChessBoard): Types.position[];
    clone(): ChessPiece | undefined;
}
//# sourceMappingURL=Pawn.d.ts.map