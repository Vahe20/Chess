import { ChessBoard } from "../../core/ChessBoard.js";
import { ChessPiece } from "../../chessPiece/chessPiece.js";
import { Render } from "../Render.js";
import { History } from "../../core/history.js";
import { Rules } from "../../core/Rules.js";
import { mathHandler, moveHandler, promotionHandler } from "./helper.js";

export function initBoardEvents(chessBoard: ChessBoard, history: History) {
	let selectedPiece: ChessPiece | undefined = undefined;

	document.querySelector(".board")?.addEventListener("click", async event => {
		if (event.target instanceof Element) {
			const cell = event.target.closest(".board_cell");

			if (!cell) return;

			const match = [...cell.classList].find(cls =>
				cls.startsWith("cell-")
			);
			if (!match) return;

			const [, row, col] = match.split("-").map(Number);

			if (typeof row !== "number" || typeof col !== "number") return;

			if (selectedPiece) {
				const cell = document.querySelector(`.cell-${row}-${col}`);
				if (cell && cell.id === "available_cell") {
					const pos = selectedPiece.getPosition();

					moveHandler(chessBoard, selectedPiece, history, pos, {
						row,
						col,
					});

					await promotionHandler(chessBoard, row, col);

					mathHandler(chessBoard, history);
					
				}

				if (cell && cell.id === "castling_cell") {
					const pos = selectedPiece.getPosition();

					moveHandler(chessBoard, selectedPiece, history, pos, {
						row,
						col,
					});

					const rook = chessBoard.getPiece(row, col === 6 ? 7 : 0);
					if (rook) {
						const oldPos = { row: row, col: col === 6 ? 7 : 0 };
						const newPos = { row: row, col: col === 6 ? 5 : 3 };

						Render.movePieceAnim(chessBoard, oldPos, newPos);
						rook.move(chessBoard, newPos);
					}

					mathHandler(chessBoard, history);
				}
			}

			if (
				chessBoard.getPiece(row, col) &&
				chessBoard.getPiece(row, col)?.getColor() ===
					chessBoard.getCurrentPlayer()
			) {
				Render.clearSelectedCell();
				selectedPiece = chessBoard.getPiece(row, col);

				const av_moves = selectedPiece
					?.getAvailableMoves(chessBoard)
					?.filter(pos => {
						return Rules.virtualBoard(
							chessBoard,
							{ row: row, col: col },
							pos
						);
					});

				const castling_pos = (selectedPiece as any).castling?.(
					chessBoard
				);

				if (castling_pos) {
					Render.renderCastlingMove(castling_pos);
				}

				if (av_moves) {
					Render.renderMoves(av_moves);
				}
			} else {
				selectedPiece = undefined;
				Render.clearSelectedCell();
			}
		}
	});
}
