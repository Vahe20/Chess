import { ChessPiece } from "./chessPiece.js";
import * as Types from "../globalTypes.js";
import { ChessBoard } from "../chess_board.js";

export class Knight extends ChessPiece {
	constructor(
		color: Types.typePieceColor,
		type: Types.typePiece,
		position: Types.position,
		img: string
	) {
		super(color, type, position, img);
	}

	getAvailableMoves(chessBoard: ChessBoard) {
		const moves: Types.position[] = [];

		const directions = [
			{ row: 2, col: 1 },
			{ row: 2, col: -1 },
			{ row: -2, col: 1 },
			{ row: -2, col: -1 },
			{ row: 1, col: 2 },
			{ row: 1, col: -2 },
			{ row: -1, col: 2 },
			{ row: -1, col: -2 },
		];

		for (const direction of directions) {
			const newRow = this.position.row + direction.row;
			const newCol = this.position.col + direction.col;

			if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
				const field = chessBoard.getPiece(newRow, newCol);

				if (field?.getColor() !== this.color)
					moves.push({ row: newRow, col: newCol });
			}
		}

		return moves;
	}

	clone(): ChessPiece | undefined {
		return new Knight(
			this.color,
			this.type,
			{ row: this.position.row, col: this.position.col },
			this.img
		);
	}
}
