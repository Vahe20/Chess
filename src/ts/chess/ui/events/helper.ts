import { ChessPiece } from "../../chessPiece/chessPiece.js";
import { ChessBoard } from "../../core/ChessBoard.js";
import * as Types from "../../Types.js";
import { Render } from "../Render.js";
import { History } from "../../core/history.js";
import { Rules } from "../../core/Rules.js";
import { gameMode } from "../../Enums.js";
import { GameMode } from "../../core/GameMode.js";
import { AI } from "../../ai/AI.js";
import { isPawnPromotion, selectPiecePromotion } from "../../core/Promotion.js";

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

export { moveHandler, mathHandler, promotionHandler, AiMove };
