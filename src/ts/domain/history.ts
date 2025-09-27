import * as Types from "./globalTypes.js";
import { ChessPiece } from "./chessPiece/chessPiece";

export class History {
	static addMove(
		oldPos: Types.position,
		newPos: Types.position,
		chessPiece: ChessPiece | undefined
	) {
		const MovesList = document.getElementById("movesList");

		let o =
			String.fromCharCode("A".charCodeAt(0) + oldPos.col) +
			"" +
			(oldPos.row + 1);
		let n =
			String.fromCharCode("A".charCodeAt(0) + newPos.col) +
			"" +
			(newPos.row + 1);

		if (chessPiece) {
			MovesList!.innerHTML =
				`<p>${o} => ${n} attack ${chessPiece.getType()}</p>` +
				MovesList!.innerHTML;
		} else {
			MovesList!.innerHTML =
				`<p>${o} => ${n} move</p>` + MovesList!.innerHTML;
		}
		const movesCount = document.getElementById("movesCount");
		if (movesCount) {
			movesCount.textContent = String((+movesCount.textContent || 0) + 1);
		}
	}

	static clear() {
		const MovesList = document.getElementById("movesList");

		MovesList!.innerHTML = ``;
		const movesCount = document.getElementById("movesCount");
		if (movesCount) {
			movesCount.textContent = "0";
		}
	}
}
