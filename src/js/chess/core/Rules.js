import { ChessBoard } from "./ChessBoard.js";
import { Render } from "../ui/Render.js";
import { getKing } from "./Utils.js";
export class Rules {
    static isCheck(chessBoard) {
        const currentPlayer = chessBoard.getCurrentPlayer();
        const king = getKing(chessBoard, currentPlayer);
        const kingPos = king === null || king === void 0 ? void 0 : king.getPosition();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = chessBoard.getPiece(i, j);
                if (piece && piece.getColor() !== currentPlayer) {
                    const moves_pos = piece.getAvailableMoves(chessBoard);
                    if (kingPos &&
                        (moves_pos === null || moves_pos === void 0 ? void 0 : moves_pos.some(pos => {
                            return (pos.row === (kingPos === null || kingPos === void 0 ? void 0 : kingPos.row) &&
                                pos.col === (kingPos === null || kingPos === void 0 ? void 0 : kingPos.col));
                        }))) {
                        Render.renderCheck(chessBoard, kingPos.row, kingPos.col);
                        return true;
                    }
                }
            }
        }
        const tmp = document.querySelector(`.cell-${kingPos === null || kingPos === void 0 ? void 0 : kingPos.row}-${kingPos === null || kingPos === void 0 ? void 0 : kingPos.col}`);
        tmp === null || tmp === void 0 ? void 0 : tmp.removeAttribute("id");
        return false;
    }
    static isMath(chessBoard) {
        const color = chessBoard.getCurrentPlayer();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = chessBoard.getPiece(i, j);
                if (piece && piece.getColor() === color) {
                    const moves = piece.getAvailableMoves(chessBoard);
                    if (moves === null || moves === void 0 ? void 0 : moves.some(pos => this.virtualBoard(chessBoard, { row: i, col: j }, pos))) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    static virtualBoard(chessBoard, pos, newPos) {
        var _a;
        const virtualBoard = new ChessBoard(chessBoard.getCurrentPlayer());
        virtualBoard.loadState(chessBoard.clone());
        const piece = virtualBoard.getPiece(pos.row, pos.col);
        if (piece) {
            virtualBoard.setPiece(newPos.row, newPos.col, piece);
        }
        (_a = virtualBoard.getPiece(newPos.row, newPos.col)) === null || _a === void 0 ? void 0 : _a.setPosition({
            row: newPos.row,
            col: newPos.col,
        });
        virtualBoard.deletePiece(pos.row, pos.col);
        return !this.isCheck(virtualBoard);
    }
}
//# sourceMappingURL=Rules.js.map