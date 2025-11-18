import { ChessBoard } from "../core/ChessBoard";
import * as Types from "../Types.js";

export abstract class ChessPiece {
	protected color: Types.typePieceColor;
	protected type: Types.typePiece;
	protected position: Types.position;
	protected img: string;
	protected isMoved = false;

	constructor(
		color: Types.typePieceColor,
		type: Types.typePiece,
		position: Types.position,
		img: string,
		isMoved: boolean = false
	) {
		this.color = color;
		this.type = type;
		this.position = position;
		this.img = img;
		this.isMoved = isMoved
	}

	getStatus(): boolean {
		return this.isMoved;
	}

	changeStatus() {
		this.isMoved = true;
	}

	getColor(): Types.typePieceColor {
		return this.color;
	}

	setColor(color: Types.typePieceColor): void {
		this.color = color;
	}

	getType(): Types.typePiece {
		return this.type;
	}

	setType(type: Types.typePiece): void {
		this.type = type;
	}

	getPosition(): Types.position {
		return this.position;
	}

	setPosition(position: Types.position): void {
		this.position = position;
	}

	getImg(): string {
		return this.img;
	}

	setImg(img: string): void {
		this.img = img;
	}

	abstract clone(): ChessPiece | undefined;

	abstract getAvailableMoves(chessBoard: ChessBoard): Types.position[];

	move(
		chessBoard: ChessBoard,
		newPos: Types.position
	): void {
		this.changeStatus();
		const pos = this.getPosition();
		chessBoard.deletePiece(pos.row, pos.col);
		chessBoard.setPiece(newPos.row, newPos.col, this);
		this.setPosition({ row: newPos.row, col: newPos.col });
	}
}
