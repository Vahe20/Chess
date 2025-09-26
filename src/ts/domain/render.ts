import { ChessBoard } from "./chess_board.js";
import { ChessPiece } from "./chessPiece/chessPiece.js";
import * as Types from "./globalTypes";

export class Render {
	static renderBoard(chessBoard: ChessBoard) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const cell = document.querySelector(`.cell-${i}-${j}`);
				const piece = chessBoard.getPiece(i, j);

				if (!cell) continue;

				if (piece instanceof ChessPiece) {
					cell.innerHTML = `<img class="${
						piece.getColor() === "white" ? "white" : "black"
					}" src="${piece.getImg()}" draggable="false" alt="${piece.getType()}">`;
				} else {
					cell.innerHTML = "";
				}
			}
		}
	}

	static renderCastlingMove(castling_pos: Types.position[]) {
		castling_pos.forEach(pos => {
			const cell = document.querySelector(`.cell-${pos.row}-${pos.col}`);
			if (cell) cell.id = "castling_cell";
		});
	}

	static renderMoves(moves: Types.position[]) {
		moves.forEach(pos => {
			const cell = document.querySelector(`.cell-${pos.row}-${pos.col}`);
			if (cell) cell.id = "available_cell";
		});
	}

	static renderCheck(chessBoard: ChessBoard, row: number, col: number) {
		const tmp = document.querySelector(
			`.cell-${row}-${col}`
		) as HTMLDivElement;
		if (tmp) tmp.id = "check_cell";
	}

	static renderMath(chessBoard: ChessBoard) {
		const color = chessBoard.getCurrentPlayer();
		const winnerColor = color === "white" ? "Black" : "White";

		const menu = document.querySelector(".menu") as HTMLElement | null;
		const winner = document.getElementById("win");
		const menuImg = document.getElementById(
			"menu_img"
		) as HTMLImageElement | null;

		if (menu) menu.style.transform = "scale(1)";
		if (winner) winner.textContent = `${winnerColor} win!`;
		if (menuImg)
			menuImg.src = `../assets/images/${
				color === "white" ? "black" : "white"
			}_king.png`;
	}

	static clearSelectedCell() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const tmp = document.querySelector(`.cell-${i}-${j}`);
				if (tmp) tmp.id = "";
			}
		}
	}
}
