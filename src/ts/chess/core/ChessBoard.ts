import { ChessPiece } from "../chessPiece/chessPiece.js";
import * as Types from "../Types.js";

export class ChessBoard {
	private board: (ChessPiece | undefined)[][];
	private currentPlayer: Types.typePieceColor;

	constructor(color: Types.typePieceColor = "white") {
		this.board = Array.from(
			{ length: 8 },
			() => new Array(8).fill(undefined) as (ChessPiece | undefined)[]
		);
		this.currentPlayer = color;
	}

	getCurrentPlayer(): Types.typePieceColor {
		return this.currentPlayer;
	}

	changeCurrentPlayer() {
		this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
	}

	setCurrentPlayer(color: Types.typePieceColor) {
		this.currentPlayer = color;
	}

	getPiece(i: number, j: number): ChessPiece | undefined {
		return this.board[i]?.[j];
	}

	setPiece(i: number, j: number, Piece: ChessPiece) {
		if (!this.board[i]) {
			this.board[i] = [];
		}
		this.board[i][j] = Piece;
	}

	deletePiece(i: number, j: number) {
		if (!this.board[i]) {
			this.board[i] = [];
		}
		this.board[i][j] = undefined;
	}

	clone(): ChessBoard {
		const newBoard = new ChessBoard(this.currentPlayer);
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const piece = this.getPiece(i, j);
				if (piece) {
					newBoard.setPiece(i, j, piece.clone() as ChessPiece);
				}
			}
		}
		return newBoard;
	}

	loadState(chessBoard: ChessBoard) {
		this.board = Array.from(
			{ length: 8 },
			() => new Array(8).fill(undefined) as (ChessPiece | undefined)[]
		);

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const piece = chessBoard.getPiece(i, j);
				if (piece) {
					this.setPiece(i, j, piece.clone() as ChessPiece);
				}
			}
		}
		this.currentPlayer = chessBoard.getCurrentPlayer();
	}
}
