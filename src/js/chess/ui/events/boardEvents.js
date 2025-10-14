import { Render } from "../Render.js";
import { Rules } from "../../core/Rules.js";
import { selectPiecePromotion, isPawnPromotion } from "../../core/Promotion.js";
export function initBoardEvents(chessBoard, history) {
    var _a;
    let selectedPiece = undefined;
    (_a = document.querySelector(".board")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", event => {
        var _a, _b, _c, _d;
        if (event.target instanceof Element) {
            const cell = event.target.closest(".board_cell");
            if (!cell)
                return;
            const match = [...cell.classList].find(cls => cls.startsWith("cell-"));
            if (!match)
                return;
            const [, row, col] = match.split("-").map(Number);
            if (typeof row !== "number" || typeof col !== "number")
                return;
            if (selectedPiece) {
                const cell = document.querySelector(`.cell-${row}-${col}`);
                if (cell && cell.id === "available_cell") {
                    const pos = selectedPiece.getPosition();
                    const targetPiece = chessBoard.getPiece(row, col);
                    selectedPiece.move(chessBoard, pos, { row, col });
                    Render.movePieceAnim(chessBoard, pos, { row, col });
                    if (isPawnPromotion(chessBoard, row, col)) {
                        selectPiecePromotion(chessBoard, row, col);
                    }
                    chessBoard.changeCurrentPlayer();
                    history.push(pos, { row, col }, targetPiece, chessBoard);
                    if (Rules.isMath(chessBoard)) {
                        Render.renderMath(chessBoard);
                    }
                }
                if (cell && cell.id === "castling_cell") {
                    const pos = selectedPiece.getPosition();
                    const targetPiece = chessBoard.getPiece(row, col);
                    Render.movePieceAnim(chessBoard, pos, { row, col });
                    selectedPiece.move(chessBoard, pos, { row, col });
                    const rook = chessBoard.getPiece(row, col === 6 ? 7 : 0);
                    if (rook) {
                        const oldPos = { row: row, col: col === 6 ? 7 : 0 };
                        const newPos = { row: row, col: col === 6 ? 5 : 3 };
                        Render.movePieceAnim(chessBoard, oldPos, newPos);
                        rook.move(chessBoard, oldPos, newPos);
                    }
                    chessBoard.changeCurrentPlayer();
                    history.push(pos, { row, col }, targetPiece, chessBoard);
                    if (Rules.isMath(chessBoard)) {
                        Render.renderMath(chessBoard);
                    }
                }
            }
            if (chessBoard.getPiece(row, col) &&
                ((_a = chessBoard.getPiece(row, col)) === null || _a === void 0 ? void 0 : _a.getColor()) ===
                    chessBoard.getCurrentPlayer()) {
                Render.clearSelectedCell();
                selectedPiece = chessBoard.getPiece(row, col);
                const av_moves = (_b = selectedPiece === null || selectedPiece === void 0 ? void 0 : selectedPiece.getAvailableMoves(chessBoard)) === null || _b === void 0 ? void 0 : _b.filter(pos => {
                    return Rules.virtualBoard(chessBoard, { row: row, col: col }, pos);
                });
                const castling_pos = (_d = (_c = selectedPiece).castling) === null || _d === void 0 ? void 0 : _d.call(_c, chessBoard);
                if (castling_pos) {
                    Render.renderCastlingMove(castling_pos);
                }
                if (av_moves) {
                    Render.renderMoves(av_moves);
                }
            }
            else {
                selectedPiece = undefined;
                Render.clearSelectedCell();
            }
        }
    });
}
//# sourceMappingURL=boardEvents.js.map