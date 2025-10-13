import { ChessBoard } from "../../core/ChessBoard.js";
import { History } from "../../core/history.js";
import { Render } from "../Render.js";
import { Game } from "../../core/Game.js";

export function initMenuEvents(
	chessBoard: ChessBoard,
	history: History,
	game: Game
) {
	document.getElementById("menu_open")?.addEventListener("click", () => {
		const menu = document.querySelector(".menu") as HTMLDivElement;
		menu.style.transform = "scale(1)";
	});

	document.getElementById("menu_exit")?.addEventListener("click", () => {
		const menu = document.querySelector(".menu") as HTMLDivElement;
		menu.style.transform = "scale(0)";
	});

	document.getElementById("restart")?.addEventListener("click", () => {
		game.start();
		history.init(chessBoard);
		History.clear();
		Render.renderBoard(chessBoard);

		const menu = document.querySelector(".menu") as HTMLDivElement;
		menu.style.transform = "scale(0)";
	});

	document.getElementById("changeColor")?.addEventListener("click", () => {
		const board = document.querySelector(".board") as HTMLElement | null;
		if (!board) return;

		let current = Number(board.dataset.colorVariant ?? "0");
		current = (current + 1) % 3;
		board.dataset.colorVariant = String(current);

		board.classList.remove("theme-0", "theme-1", "theme-2");
		board.classList.add(`theme-${current}`);
	});
}
