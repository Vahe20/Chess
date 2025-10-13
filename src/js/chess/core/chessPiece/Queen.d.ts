import { ChessPiece } from "./chessPiece.js";
import * as Types from "../../Types.js";
import { ChessBoard } from "../ChessBoard.js";
export declare class Queen extends ChessPiece {
    constructor(color: Types.typePieceColor, type: Types.typePiece, position: Types.position, img: string);
    getAvailableMoves(chessBoard: ChessBoard): Types.position[];
    clone(): ChessPiece | undefined;
}
//# sourceMappingURL=Queen.d.ts.map