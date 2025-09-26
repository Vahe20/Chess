import { ChessBoard } from "../chess_board.js";
import { ChessPiece } from "./chessPiece.js";
import * as Types from "../globalTypes.js";
export declare class King extends ChessPiece {
    constructor(color: Types.typePieceColor, type: Types.typePiece, position: Types.position, img: string);
    getAvailableMoves(chessBoard: ChessBoard): Types.position[] | void;
    castling(chessBoard: ChessBoard): Types.position[] | void;
    clone(): ChessPiece | undefined;
}
//# sourceMappingURL=King.d.ts.map