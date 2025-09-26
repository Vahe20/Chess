import { ChessPiece } from "./chessPiece.js";
import * as Types from "../globalTypes.js";
import { ChessBoard } from "../chess_board.js";
export declare class Knight extends ChessPiece {
    constructor(color: Types.typePieceColor, type: Types.typePiece, position: Types.position, img: string);
    getAvailableMoves(chessBoard: ChessBoard): Types.position[];
    clone(): ChessPiece | undefined;
}
//# sourceMappingURL=Knight.d.ts.map