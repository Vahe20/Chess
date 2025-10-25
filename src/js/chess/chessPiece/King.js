import { ChessPiece } from "./chessPiece.js";
import { Rules } from "../core/Rules.js";
import { Rook } from "./Rook.js";
export class King extends ChessPiece {
    constructor(color, type, position, img, isMoved) {
        super(color, type, position, img, isMoved);
    }
    getAvailableMoves(chessBoard) {
        const moves = [];
        const directions = [
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 0, col: 1 },
            { row: -1, col: 1 },
            { row: -1, col: 0 },
            { row: -1, col: -1 },
            { row: 0, col: -1 },
            { row: 1, col: -1 },
        ];
        directions.forEach(direction => {
            let newRow = this.position.row + direction.row;
            let newCol = this.position.col + direction.col;
            const field = chessBoard.getPiece(newRow, newCol);
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                if ((field === null || field === void 0 ? void 0 : field.getColor()) !== this.color)
                    moves.push({ row: newRow, col: newCol });
            }
        });
        return moves;
    }
    castling(chessBoard) {
        if (this.isMoved === true) {
            return;
        }
        const shortPos = [
            { row: this.position.row, col: this.position.col + 1 },
            { row: this.position.row, col: this.position.col + 2 },
        ];
        const longPos = [
            { row: this.position.row, col: this.position.col - 1 },
            { row: this.position.row, col: this.position.col - 2 },
            { row: this.position.row, col: this.position.col - 3 },
        ];
        const castlingMoves = [];
        const color = this.color;
        const row = color === "white" ? 0 : 7;
        const rookShort = chessBoard.getPiece(row, 7);
        const rookLong = chessBoard.getPiece(row, 0);
        if (rookShort instanceof Rook && rookShort.getColor() === color) {
            if (rookShort.getStatus() === false) {
                const canCastleShort = shortPos.every(pos => {
                    return Rules.virtualBoard(chessBoard, { row: this.position.row, col: this.position.col }, { row: pos.row, col: pos.col });
                });
                if (chessBoard.getPiece(row, 5) === undefined &&
                    chessBoard.getPiece(row, 6) === undefined &&
                    canCastleShort) {
                    castlingMoves.push({ row: row, col: 6 });
                }
            }
        }
        if (rookLong instanceof Rook && rookLong.getColor() === color) {
            if (rookLong.getStatus() === false) {
                const canCastleLong = longPos.every(pos => {
                    return Rules.virtualBoard(chessBoard, { row: this.position.row, col: this.position.col }, { row: pos.row, col: pos.col });
                });
                if (chessBoard.getPiece(row, 1) === undefined &&
                    chessBoard.getPiece(row, 2) === undefined &&
                    chessBoard.getPiece(row, 3) === undefined &&
                    canCastleLong) {
                    castlingMoves.push({ row: row, col: 2 });
                }
            }
        }
        return castlingMoves;
    }
    clone() {
        return new King(this.color, this.type, { row: this.position.row, col: this.position.col }, this.img, this.isMoved);
    }
}
//# sourceMappingURL=King.js.map