import { ChessPiece } from "../../chessPiece/chessPiece.js";
import { ChessBoard } from "../../core/ChessBoard.js";
import * as Types from "../../Types.js";
import { Render } from "../Render.js";
import { History } from "../../core/history.js";
import { Rules } from "../../core/Rules.js";
import { gameMode } from "../../Enums.js";
import { GameMode } from "../../core/GameMode.js";
import { AI } from "../../ai/AI.js";

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

function promotionHandler() {}

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
			AI.makeMove(chessBoard, history, "black");
		}, 500);
	}
};

export { moveHandler, mathHandler };
