import { ChessBoard } from "./ChessBoard.js";
import { Render } from "../ui/Render.js";
import { getKing } from "./Utils.js";
import * as Types from "../Types.js";

export class Rules {
	static isCheck(chessBoard: ChessBoard) {
		const currentPlayer = chessBoard.getCurrentPlayer();
		const king = getKing(chessBoard, currentPlayer);
		const kingPos = king?.getPosition();

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const piece = chessBoard.getPiece(i, j);
				if (piece && piece.getColor() !== currentPlayer) {
					const moves_pos = piece.getAvailableMoves(chessBoard);
					if (
						kingPos &&
						moves_pos?.some(pos => {
							return (
								pos.row === kingPos?.row &&
								pos.col === kingPos?.col
							);
						})
					) {
						Render.renderCheck(
							chessBoard,
							kingPos.row,
							kingPos.col
						);
						return true;
					}
				}
			}
		}

		const tmp = document.querySelector(
			`.cell-${kingPos?.row}-${kingPos?.col}`
		);
		tmp?.removeAttribute("id");

		return false;
	}

	static isMath(chessBoard: ChessBoard) {
		const color = chessBoard.getCurrentPlayer();

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const piece = chessBoard.getPiece(i, j);
				if (piece && piece.getColor() === color) {
					const moves = piece.getAvailableMoves(chessBoard);
					if (
						moves?.some(pos =>
							this.virtualBoard(
								chessBoard,
								{ row: i, col: j },
								pos
							)
						)
					) {
						return false;
					}
				}
			}
		}

		return true;
	}

	static virtualBoard(
		chessBoard: ChessBoard,
		pos: Types.position,
		newPos: Types.position
	) {
		const virtualBoard = new ChessBoard(chessBoard.getCurrentPlayer());

		virtualBoard.loadState(chessBoard.clone());

		const piece = virtualBoard.getPiece(pos.row, pos.col);
		if (piece) {
			virtualBoard.setPiece(newPos.row, newPos.col, piece);
		}
		virtualBoard.getPiece(newPos.row, newPos.col)?.setPosition({
			row: newPos.row,
			col: newPos.col,
		});
		virtualBoard.deletePiece(pos.row, pos.col);

		return !this.isCheck(virtualBoard);
	}
}
