export function generateHtmlCells() {
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
}
