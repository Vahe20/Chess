import { GameMode } from "../../core/GameMode.js";
import { gameMode } from "../../Enums.js";
import { ChessBoard } from "../../core/ChessBoard";
import { AiMove } from "../helper.js";
import { History } from "../../core/history.js";

export function initGameModeChangeEvent(
	ChessBoard: ChessBoard,
	history: History
) {
	const sel = document.getElementById("gameMode") as HTMLSelectElement;
	if (!sel) return;

	sel.value = GameMode.getGameMode();

	sel.addEventListener("change", () => {
		GameMode.setGameMode(sel.value as gameMode);
		if (
			sel.value !== gameMode.PVP &&
			ChessBoard.getCurrentPlayer() === "black"
		) {
			AiMove(ChessBoard, history);
		}
	});
}
