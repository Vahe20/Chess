import { ChessBoard } from "../core/ChessBoard";
import * as Types from "../Types.js";
export declare abstract class ChessPiece {
    protected color: Types.typePieceColor;
    protected type: Types.typePiece;
    protected position: Types.position;
    protected img: string;
    protected isMoved: boolean;
    constructor(color: Types.typePieceColor, type: Types.typePiece, position: Types.position, img: string);
    getStatus(): boolean;
    changeStatus(): void;
    getColor(): Types.typePieceColor;
    setColor(color: Types.typePieceColor): void;
    getType(): Types.typePiece;
    setType(type: Types.typePiece): void;
    getPosition(): Types.position;
    setPosition(position: Types.position): void;
    getImg(): string;
    setImg(img: string): void;
    abstract clone(): ChessPiece | undefined;
    abstract getAvailableMoves(chessBoard: ChessBoard): Types.position[] | void;
    move(chessBoard: ChessBoard, newPos: Types.position): void;
}
//# sourceMappingURL=chessPiece.d.ts.map