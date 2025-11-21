import { ChessBoard } from "../../core/ChessBoard.js";
import { History } from "../../core/history.js";

export function initUiEvents(chessBoard: ChessBoard, history: History) {
	document.getElementById("goStart")?.addEventListener("click", () => {
		history.goStart(chessBoard);
	});

	document.getElementById("undo")?.addEventListener("click", () => {
		history.undo(chessBoard);
	});

	document.getElementById("redo")?.addEventListener("click", () => {
		history.redo(chessBoard);
	});

	document.getElementById("goEnd")?.addEventListener("click", () => {
		history.goEnd(chessBoard);
	});
}
