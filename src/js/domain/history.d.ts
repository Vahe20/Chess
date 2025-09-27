import * as Types from "./globalTypes.js";
import { ChessPiece } from "./chessPiece/chessPiece";
export declare class History {
    static addMove(oldPos: Types.position, newPos: Types.position, chessPiece: ChessPiece | undefined): void;
    static clear(): void;
}
//# sourceMappingURL=history.d.ts.map