export function initUiEvents(chessBoard, history) {
    var _a, _b;
    (_a = document.getElementById("undo")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        history.undo(chessBoard);
    });
    (_b = document.getElementById("redo")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        history.redo(chessBoard);
    });
}
//# sourceMappingURL=uiEvents.js.map