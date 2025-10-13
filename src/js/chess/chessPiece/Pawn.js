import { ChessPiece } from "./chessPiece.js";
export class Pawn extends ChessPiece {
    constructor(color, type, position, img) {
        super(color, type, position, img);
    }
    getAvailableMoves(chessBoard) {
        const moves = [];
        const direction = this.color === "white" ? 1 : -1;
        const row = this.position.row;
        const col = this.position.col;
        if (chessBoard.getPiece(row + direction, col) === undefined) {
            moves.push({ row: row + direction, col: col });
            const pos = this.color === "white" ? 1 : 6;
            if (row === pos &&
                chessBoard.getPiece(row + direction + direction, col) ===
                    undefined) {
                moves.push({ row: row + direction + direction, col: col });
            }
        }
        if (col + 1 < 8 &&
            chessBoard.getPiece(row + direction, col + 1) !== undefined) {
            const tmp = chessBoard.getPiece(row + direction, col + 1);
            if (tmp && tmp.getColor() !== this.color) {
                moves.push({ row: row + direction, col: col + 1 });
            }
        }
        if (col - 1 >= 0 &&
            chessBoard.getPiece(row + direction, col - 1) !== undefined) {
            const tmp = chessBoard.getPiece(row + direction, col - 1);
            if (tmp && tmp.getColor() !== this.color) {
                moves.push({ row: row + direction, col: col - 1 });
            }
        }
        return moves;
    }
    clone() {
        return new Pawn(this.color, this.type, { row: this.position.row, col: this.position.col }, this.img);
    }
}
//# sourceMappingURL=Pawn.js.map