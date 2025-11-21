export function initUiEvents(chessBoard, history) {
    var _a, _b, _c, _d;
    (_a = document.getElementById("goStart")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        history.goStart(chessBoard);
    });
    (_b = document.getElementById("undo")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        history.undo(chessBoard);
    });
    (_c = document.getElementById("redo")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        history.redo(chessBoard);
    });
    (_d = document.getElementById("goEnd")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        history.goEnd(chessBoard);
    });
}
//# sourceMappingURL=uiEvents.js.map