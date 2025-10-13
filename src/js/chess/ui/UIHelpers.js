export function generateHtmlCells() {
    var _a;
    for (let i = 7; i >= 0; --i) {
        for (let j = 0; j < 8; ++j) {
            const cell = document.createElement("div");
            cell.classList.add("board_cell");
            cell.classList.add(`cell-${i}-${j}`);
            (_a = document.querySelector(".board")) === null || _a === void 0 ? void 0 : _a.appendChild(cell);
            if ((i + j) % 2 === 0) {
                cell.classList.add("black_cell");
            }
        }
    }
}
//# sourceMappingURL=UIHelpers.js.map