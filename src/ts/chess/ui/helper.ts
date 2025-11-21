import { ChessPiece } from "../chessPiece/chessPiece.js";
import { ChessBoard } from "../core/ChessBoard.js";
import * as Types from "../Types.js";
import { Render } from "./Render.js";
import { History } from "../core/history.js";
import { Rules } from "../core/Rules.js";
import { gameMode } from "../Enums.js";
import { GameMode } from "../core/GameMode.js";
import { AI } from "../ai/AI.js";
import { isPawnPromotion, selectPiecePromotion } from "../core/Promotion.js";

// helpers for board event handlers

const moveHandler = (
	chessBoard: ChessBoard,
	piece: ChessPiece,
	history: History,
	oldPos: Types.position,
	newPos: Types.position
) => {
	const targetPiece = chessBoard.getPiece(newPos.row, newPos.col);
	piece.move(chessBoard, newPos);
	Render.movePieceAnim(chessBoard, oldPos, newPos);
	chessBoard.changeCurrentPlayer();

	history.push(oldPos, newPos, targetPiece, chessBoard);
};

async function promotionHandler(
	chessBoard: ChessBoard,
	row: number,
	col: number
) {
	if (isPawnPromotion(chessBoard, row, col)) {
		selectPiecePromotion(chessBoard, row, col);

		const promote = document.querySelector(".promote") as HTMLDivElement;

		await new Promise<void>(resolve => {
			const observer = new MutationObserver(() => {
				if (promote.style.transform === "scale(0)") {
					observer.disconnect();
					resolve();
				}
			});
			observer.observe(promote, {
				attributes: true,
				attributeFilter: ["style"],
			});
		});
	}
}

const mathHandler = (chessBoard: ChessBoard, history: History) => {
	if (Rules.isMath(chessBoard)) {
		Render.renderMath(chessBoard);
	} else {
		AiMove(chessBoard, history);
	}
};

const AiMove = (chessBoard: ChessBoard, history: History) => {
	if (
		GameMode.getGameMode() !== gameMode.PVP &&
		chessBoard.getCurrentPlayer() === "black"
	) {
		setTimeout(() => {
			let ai = AI.getMove(chessBoard, "black");
			if (ai)
				moveHandler(
					chessBoard,
					ai.piece,
					history,
					ai.oldPos,
					ai.newPos
				);
		}, 500);
	}
};

// helpers for menu events

const menuOpenHandler = () => {
	const menu = document.querySelector(".menu") as HTMLDivElement;
	const board = document.querySelector(".board") as HTMLDivElement;
	if (!menu || !board) return;

	if (menu.style.transform === "rotateY(0deg)") {
		menu.style.transform = "rotateY(180deg)";
		board.style.transform = "rotateY(0deg)";
		board.style.zIndex = "10";
		menu.style.zIndex = "-10";
		return;
	} else {
		menu.style.transform = "rotateY(0deg)";
		board.style.zIndex = "0";
		board.style.transform = "rotateY(180deg)";
		menu.style.zIndex = "10";
	}
};

// helper to generate html cells for board

const generateHtmlCells = () => {
	for (let i = 7; i >= 0; --i) {
		for (let j = 0; j < 8; ++j) {
			const cell = document.createElement("div");
			cell.classList.add("board_cell");
			cell.classList.add(`cell-${i}-${j}`);
			document.querySelector(".board")?.appendChild(cell);

			if ((i + j) % 2 === 0) {
				cell.classList.add("black_cell");
			}
		}
	}
};

export {
	moveHandler,
	mathHandler,
	promotionHandler,
	AiMove,
	menuOpenHandler,
	generateHtmlCells,
};
