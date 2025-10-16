import { ChessPiece } from "../../chessPiece/chessPiece.js";
import { ChessBoard } from "../../core/ChessBoard.js";
import * as Types from "../../Types.js";
import { History } from "../../core/history.js";
declare const moveHandler: (chessBoard: ChessBoard, piece: ChessPiece, history: History, oldPos: Types.position, newPos: Types.position) => void;
declare function promotionHandler(chessBoard: ChessBoard, row: number, col: number): Promise<void>;
declare const mathHandler: (chessBoard: ChessBoard, history: History) => void;
export { moveHandler, mathHandler, promotionHandler };
//# sourceMappingURL=helper.d.ts.map