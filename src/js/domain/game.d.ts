import { ChessBoard } from "./chess_board.js";
import * as Types from "./globalTypes.js";
export declare function start(chessBoard: ChessBoard): void;
export declare function generateHtmlCells(): void;
export declare function isPawnPromotion(chessBoard: ChessBoard, row: number, col: number): boolean | undefined;
export declare function selectPiecePromotion(chessBoard: ChessBoard, row: number, col: number): void;
export declare function getKing(chessBoard: ChessBoard, color: Types.typePieceColor): import("./chessPiece/chessPiece.js").ChessPiece | undefined;
export declare function isCheck(chessBoard: ChessBoard): boolean;
export declare function isMath(chessBoard: ChessBoard): boolean;
export declare function virtualBoard(chessBoard: ChessBoard, pos: Types.position, newPos: Types.position): boolean;
//# sourceMappingURL=game.d.ts.map