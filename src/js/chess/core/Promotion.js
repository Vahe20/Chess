import { Queen, Rook, Bishop, Knight } from "../chessPiece/index.js";
import { Render } from "../ui/Render.js";
export function selectPiecePromotion(chessBoard, row, col) {
    var _a, _b, _c, _d, _e;
    const promote = document.querySelector(".promote");
    promote.style.transform = "scale(1)";
    const currentPlayer = (_a = chessBoard.getPiece(row, col)) === null || _a === void 0 ? void 0 : _a.getColor();
    if (!currentPlayer)
        return;
    const queen_btn = document.getElementById("promote_btn-queen");
    const rook_btn = document.getElementById("promote_btn-rook");
    const bishop_btn = document.getElementById("promote_btn-bishop");
    const knight_btn = document.getElementById("promote_btn-knight");
    queen_btn === null || queen_btn === void 0 ? void 0 : queen_btn.replaceWith(queen_btn.cloneNode(true));
    rook_btn === null || rook_btn === void 0 ? void 0 : rook_btn.replaceWith(rook_btn.cloneNode(true));
    bishop_btn === null || bishop_btn === void 0 ? void 0 : bishop_btn.replaceWith(bishop_btn.cloneNode(true));
    knight_btn === null || knight_btn === void 0 ? void 0 : knight_btn.replaceWith(knight_btn.cloneNode(true));
    (_b = document
        .getElementById(`promote_btn-queen`)) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        chessBoard.setPiece(row, col, new Queen(currentPlayer, "queen", { row, col }, `../assets/images/${currentPlayer}_queen.png`));
        promote.style.transform = "scale(0)";
        Render.renderBoard(chessBoard);
    });
    (_c = document
        .getElementById(`promote_btn-rook`)) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        chessBoard.setPiece(row, col, new Rook(currentPlayer, "rook", { row, col }, `../assets/images/${currentPlayer}_rook.png`));
        promote.style.transform = "scale(0)";
        Render.renderBoard(chessBoard);
    });
    (_d = document
        .getElementById(`promote_btn-bishop`)) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        chessBoard.setPiece(row, col, new Bishop(currentPlayer, "bishop", { row, col }, `../assets/images/${currentPlayer}_bishop.png`));
        promote.style.transform = "scale(0)";
        Render.renderBoard(chessBoard);
    });
    (_e = document
        .getElementById(`promote_btn-knight`)) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
        chessBoard.setPiece(row, col, new Knight(currentPlayer, "knight", { row, col }, `../assets/images/${currentPlayer}_knight.png`));
        promote.style.transform = "scale(0)";
        Render.renderBoard(chessBoard);
    });
}
export function isPawnPromotion(chessBoard, row, col) {
    const piece = chessBoard.getPiece(row, col);
    return piece && piece.getType() === "pawn" && (row === 0 || row === 7);
}
//# sourceMappingURL=Promotion.js.map