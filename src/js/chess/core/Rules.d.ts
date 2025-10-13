import { ChessBoard } from "./ChessBoard.js";
import * as Types from "../Types.js";
export declare class Rules {
    static isCheck(chessBoard: ChessBoard): boolean;
    static isMath(chessBoard: ChessBoard): boolean;
    static virtualBoard(chessBoard: ChessBoard, pos: Types.position, newPos: Types.position): boolean;
}
//# sourceMappingURL=Rules.d.ts.map