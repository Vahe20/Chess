import { ChessBoard } from "../core/ChessBoard.js";
import { ChessPiece } from "../chessPiece/chessPiece.js";
import * as Types from "../Types.js";
import { Rules } from "../core/Rules.js";
import { Render } from "../ui/Render.js";

export class AI {
	static pieceValue: Record<string, number> = {
		pawn: 10,
		knight: 30,
		bishop: 30,
		rook: 50,
		queen: 90,
		king: 1000,
	};

	static positionBonus(row: number, col: number, type: string): number {
		if (type === "pawn") return row > 1 && row < 6 ? 1 : 0;
		if (type === "knight" || type === "bishop")
			return row > 1 && row < 6 && col > 1 && col < 6 ? 2 : 0;
		if (type === "rook")
			return row === 0 || row === 7 || col === 0 || col === 7 ? 1 : 0;
		return 0;
	}

	static evaluateBoard(
		chessBoard: ChessBoard,
		color: Types.typePieceColor,
		level: string
	): number {
		let score = 0;

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const piece = chessBoard.getPiece(i, j);
				if (!piece) continue;

				let value = this.pieceValue[piece.getType()] || 0;

				if (level !== "easy")
					value += this.positionBonus(i, j, piece.getType());

				score += piece.getColor() === color ? value : -value;
			}
		}

		if (level === "hard" && Rules.isCheck(chessBoard)) {
			score += color === chessBoard.getCurrentPlayer() ? -50 : 50;
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

	static minimax(
		chessBoard: ChessBoard,
		depth: number,
		maximizingPlayer: boolean,
		color: Types.typePieceColor,
		level: string,
		alpha = -Infinity,
		beta = Infinity
	): number {
		if (depth === 0) return this.evaluateBoard(chessBoard, color, level);

		const moves = this.getAllMoves(
			chessBoard,
			maximizingPlayer ? color : color === "white" ? "black" : "white"
		);

		if (moves.length === 0)
			return this.evaluateBoard(chessBoard, color, level);

		if (maximizingPlayer) {
			let maxEval = -Infinity;
			for (const m of moves) {
				const cloneBoard = this.cloneBoard(chessBoard);
				const oldPos = m.piece.getPosition();
				cloneBoard
					.getPiece(oldPos.row, oldPos.col)
					?.move(cloneBoard, oldPos, m.move);

				const evalScore = this.minimax(
					cloneBoard,
					depth - 1,
					false,
					color,
					level,
					alpha,
					beta
				);
				maxEval = Math.max(maxEval, evalScore);

				if (level === "hard") alpha = Math.max(alpha, evalScore);
				if (level === "hard" && beta <= alpha) break;
			}
			return maxEval;
		} else {
			let minEval = Infinity;
			for (const m of moves) {
				const cloneBoard = this.cloneBoard(chessBoard);
				const oldPos = m.piece.getPosition();
				cloneBoard
					.getPiece(oldPos.row, oldPos.col)
					?.move(cloneBoard, oldPos, m.move);

				const evalScore = this.minimax(
					cloneBoard,
					depth - 1,
					true,
					color,
					level,
					alpha,
					beta
				);
				minEval = Math.min(minEval, evalScore);

				if (level === "hard") beta = Math.min(beta, evalScore);
				if (level === "hard" && beta <= alpha) break;
			}
			return minEval;
		}
	}

	static getBestMove(
		chessBoard: ChessBoard,
		color: Types.typePieceColor,
		level: string
	) {
		const moves = this.getAllMoves(chessBoard, color);
		if (moves.length === 0) return null;

		let bestMove = moves[0];
		let bestScore = -Infinity;

		const depth = level === "easy" ? 1 : level === "medium" ? 2 : 3;

		for (const m of moves) {
			const cloneBoard = this.cloneBoard(chessBoard);
			const oldPos = m.piece.getPosition();
			cloneBoard
				.getPiece(oldPos.row, oldPos.col)
				?.move(cloneBoard, oldPos, m.move);

			const score = this.minimax(
				cloneBoard,
				depth - 1,
				false,
				color,
				level,
				-Infinity,
				Infinity
			);
			if (score > bestScore) {
				bestScore = score;
				bestMove = m;
			}
		}

		return bestMove;
	}

	static makeMove(
		chessBoard: ChessBoard,
		color: Types.typePieceColor,
		level: string
	) {
		const move = this.getBestMove(chessBoard, color, level);
		if (!move) return;

		const oldPos = move.piece.getPosition();
		const newPos = move.move;

		move.piece.move(chessBoard, oldPos, newPos);
		Render.movePieceAnim(chessBoard, oldPos, newPos);
	}

	static cloneBoard(chessBoard: ChessBoard) {
		const clone = new ChessBoard(chessBoard.getCurrentPlayer());
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const piece = chessBoard.getPiece(i, j)?.clone();
				if (piece) clone.setPiece(i, j, piece);
			}
		}
		return clone;
	}
}
