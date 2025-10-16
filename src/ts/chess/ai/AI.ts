import { ChessBoard } from "../core/ChessBoard.js";
import { ChessPiece } from "../chessPiece/chessPiece.js";
import * as Types from "../Types.js";
import { Rules } from "../core/Rules.js";
import { History } from "../core/history.js";
import { gameMode } from "../Enums.js";
import { PricePiece } from "../Enums.js";
import { moveHandler } from "../ui/events/helper.js";
import { GameMode } from "../core/GameMode.js";

export class AI {
	static getScore(
		chessBoard: ChessBoard,
		color: Types.typePieceColor
	): number {
		let score = 0;
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const piece = chessBoard.getPiece(i, j);
				if (!piece) continue;
				const value = PricePiece[piece.getType()];
				score += piece.getColor() === color ? value : -value;
			}
		}
		return score;
	}

	static getAllMoves(chessBoard: ChessBoard, color: Types.typePieceColor) {
		const moves: { piece: ChessPiece; move: Types.position }[] = [];

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const piece = chessBoard.getPiece(i, j);
				if (piece && piece.getColor() === color) {
					const availableMoves = piece.getAvailableMoves(chessBoard);
					availableMoves?.forEach(move => {
						if (
							Rules.virtualBoard(
								chessBoard,
								{ row: i, col: j },
								move
							)
						) {
							moves.push({ piece, move });
						}
					});
				}
			}
		}

		return moves;
	}
	

	static getBestMove(
		ChessBoard: ChessBoard,
		color: Types.typePieceColor
	): { piece: ChessPiece; move: Types.position } | undefined {
		if (GameMode.getGameMode() === gameMode.easy) {
			const moves = this.getAllMoves(ChessBoard, color);
			if (moves.length === 0) return undefined;

			let bestMove = moves[Math.floor(Math.random() * moves.length)];
			let bestScore: number = -Infinity;

			for (const move of moves) {
				const boardClone = ChessBoard.clone();
				const piece = boardClone.getPiece(move.piece.getPosition().row, move.piece.getPosition().col);
				piece?.move(boardClone, move.move);

				const score = this.getScore(boardClone, color) + Math.random() * 0.5;
				if (score > bestScore) {
					bestScore = score;
					bestMove = move;
				}
			}

			return bestMove;
		}
		
		if (GameMode.getGameMode() === gameMode.medium) {
			const moves = this.getAllMoves(ChessBoard, color);
			if (moves.length === 0) return undefined;

			let bestMove = moves[0];
			let bestScore = -Infinity;

			for (const move of moves) {
				const boardClone = ChessBoard.clone();
				const piece = boardClone.getPiece(
					move.piece.getPosition().row,
					move.piece.getPosition().col
				);
				
				piece?.move(boardClone, move.move);

				let score = this.getScore(boardClone, color);

				const opponentColor = color === "white" ? "black" : "white";
				const opponentMoves = this.getAllMoves(
					boardClone,
					opponentColor
				);

				let worstResponse = 0;
				for (const oppMove of opponentMoves) {
					worstResponse = Math.max(
						worstResponse,
						this.getScore(boardClone, opponentColor)
					);
				}

				score -= worstResponse;

				if (score > bestScore) {
					bestScore = score;
					bestMove = move;
				}
			}

			return bestMove;
		}
		if (GameMode.getGameMode() === gameMode.hard) {
		}
	}

	static makeMove(
		chessBoard: ChessBoard,
		history: History,
		color: Types.typePieceColor
	) {
		const move = this.getBestMove(chessBoard, color);

		if (!move) return;

		const oldPos = move.piece.getPosition();
		const newPos = move.move;

		moveHandler(chessBoard, move.piece, history, oldPos, newPos);
	}
}
