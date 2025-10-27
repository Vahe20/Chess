import { ChessBoard } from "./ChessBoard.js";
import { Queen, Rook, Bishop, Knight } from "../chessPiece/index.js";
import { Render } from "../ui/Render.js";


export function selectPiecePromotion(
	chessBoard: ChessBoard,
	row: number,
	col: number
) {
	const promote = document.querySelector(".promote") as HTMLDivElement;
	promote.style.transform = "scale(1)";

	const currentPlayer = chessBoard.getPiece(row, col)?.getColor();

	if (!currentPlayer) return;

	const queen_btn = document.getElementById("promote_btn-queen");
	const rook_btn = document.getElementById("promote_btn-rook");
	const bishop_btn = document.getElementById("promote_btn-bishop");
	const knight_btn = document.getElementById("promote_btn-knight");

	queen_btn?.replaceWith(queen_btn.cloneNode(true) as HTMLButtonElement);

	rook_btn?.replaceWith(rook_btn.cloneNode(true) as HTMLButtonElement);

	bishop_btn?.replaceWith(bishop_btn.cloneNode(true) as HTMLButtonElement);

	knight_btn?.replaceWith(knight_btn.cloneNode(true) as HTMLButtonElement);

	document
		.getElementById(`promote_btn-queen`)
		?.addEventListener("click", () => {
			chessBoard.setPiece(
				row,
				col,
				new Queen(
					currentPlayer,
					"queen",
					{ row, col },
					`../assets/images/${currentPlayer}_queen.png`
				)
			);
			promote.style.transform = "scale(0)";
			Render.renderBoard(chessBoard);
		});

	document
		.getElementById(`promote_btn-rook`)
		?.addEventListener("click", () => {
			chessBoard.setPiece(
				row,
				col,
				new Rook(
					currentPlayer,
					"rook",
					{ row, col },
					`../assets/images/${currentPlayer}_rook.png`,
					true
				)
			);
			promote.style.transform = "scale(0)";
			Render.renderBoard(chessBoard);
		});

	document
		.getElementById(`promote_btn-bishop`)
		?.addEventListener("click", () => {
			chessBoard.setPiece(
				row,
				col,
				new Bishop(
					currentPlayer,
					"bishop",
					{ row, col },
					`../assets/images/${currentPlayer}_bishop.png`
				)
			);
			promote.style.transform = "scale(0)";
			Render.renderBoard(chessBoard);
		});

	document
		.getElementById(`promote_btn-knight`)
		?.addEventListener("click", () => {
			chessBoard.setPiece(
				row,
				col,
				new Knight(
					currentPlayer,
					"knight",
					{ row, col },
					`../assets/images/${currentPlayer}_knight.png`
				)
			);
			promote.style.transform = "scale(0)";
			Render.renderBoard(chessBoard);
		});
}

export function isPawnPromotion(
	chessBoard: ChessBoard,
	row: number,
	col: number
) {
	const piece = chessBoard.getPiece(row, col);
	return piece && piece.getType() === "pawn" && (row === 0 || row === 7);
}
