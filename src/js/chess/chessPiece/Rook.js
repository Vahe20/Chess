import { ChessPiece } from "./chessPiece.js";
export class Rook extends ChessPiece {
    constructor(color, type, position, img, isMoved) {
        super(color, type, position, img, isMoved);
    }
    getAvailableMoves(chessBoard) {
        const moves = [];
        const directions = [
            { row: 1, col: 0 },
            { row: -1, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: -1 },
        ];
        for (const direction of directions) {
            let newRow = this.position.row + direction.row;
            let newCol = this.position.col + direction.col;
            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const field = chessBoard.getPiece(newRow, newCol);
                if (field) {
                    if (field.getColor() !== this.color)
                        moves.push({ row: newRow, col: newCol });
                    break;
                }
                moves.push({ row: newRow, col: newCol });
                newRow += direction.row;
                newCol += direction.col;
            }
        }
        return moves;
    }
    clone() {
        return new Rook(this.color, this.type, { row: this.position.row, col: this.position.col }, this.img, this.isMoved);
    }
}
//# sourceMappingURL=Rook.js.map