import { ChessBoard } from "../core/ChessBoard.js";
import { ChessPiece } from "../chessPiece/chessPiece.js";
import * as Types from "../Types.js";
import { Rules } from "../core/Rules.js";
import { Render } from "../ui/Render.js";
import { History } from '../core/history';

export class AI {
	static pieceValue: Record<string, number> = {
		pawn: 10,
		knight: 30,
		bishop: 30,
		rook: 50,
		queen: 90,
		king: 1000,
	};

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


	static makeMove(
		chessBoard: ChessBoard,
		history: History,
		color: Types.typePieceColor,
		level: string
	) {
		
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
