import { ChessBoard } from "../../core/ChessBoard.js";
import { Game } from "../../core/Game.js";
import { History } from "../../core/history.js";

import { initBoardEvents } from "./boardEvents.js";
import { initMenuEvents } from "./menuEvents.js";
import { initUiEvents } from "./uiEvents.js";

export function initEvents(
	chessBoard: ChessBoard,
	history: History,
	game: Game
) {
	initBoardEvents(chessBoard, history);
	initMenuEvents(chessBoard, history, game);
	initUiEvents(chessBoard, history);
}
