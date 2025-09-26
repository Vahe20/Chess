import { ChessPiece } from "./chessPiece.js";
export class Queen extends ChessPiece {
    constructor(color, type, position, img) {
        super(color, type, position, img);
    }
    getAvailableMoves(chessBoard) {
        const moves = [];
        const directions = [
            { row: 1, col: 0 },
            { row: -1, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: -1 },
            { row: 1, col: 1 },
            { row: -1, col: -1 },
            { row: 1, col: -1 },
            { row: -1, col: 1 },
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
        return new Queen(this.color, this.type, { row: this.position.row, col: this.position.col }, this.img);
    }
}
//# sourceMappingURL=Queen.js.map