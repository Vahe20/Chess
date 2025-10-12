import { ChessBoard } from "./chess_board.js";
import { Pawn } from "./chessPiece/Pawn.js";
import { Rook } from "./chessPiece/Rook.js";
import { Knight } from "./chessPiece/Knight.js";
import { Bishop } from "./chessPiece/Bishop.js";
import { Queen } from "./chessPiece/Queen.js";
import { King } from "./chessPiece/King.js";
import { Render } from "./render.js";
export function start(chessBoard) {
    if (!chessBoard)
        return;
    chessBoard.setCurrentPlayer("white");
    const winner = document.getElementById("win");
    if (winner)
        winner.textContent = "";
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            chessBoard.deletePiece(i, j);
        }
    }
    const setupRow = (row, color, imgPrefix) => {
        chessBoard.setPiece(row, 0, new Rook(color, "rook", { row: row, col: 0 }, `../assets/images/${imgPrefix}_rook.png`));
        chessBoard.setPiece(row, 1, new Knight(color, "knight", { row: row, col: 1 }, `../assets/images/${imgPrefix}_knight.png`));
        chessBoard.setPiece(row, 2, new Bishop(color, "bishop", { row: row, col: 2 }, `../assets/images/${imgPrefix}_bishop.png`));
        chessBoard.setPiece(row, 3, new Queen(color, "queen", { row: row, col: 3 }, `../assets/images/${imgPrefix}_queen.png`));
        chessBoard.setPiece(row, 4, new King(color, "king", { row: row, col: 4 }, `../assets/images/${imgPrefix}_king.png`));
        chessBoard.setPiece(row, 5, new Bishop(color, "bishop", { row: row, col: 5 }, `../assets/images/${imgPrefix}_bishop.png`));
        chessBoard.setPiece(row, 6, new Knight(color, "knight", { row: row, col: 6 }, `../assets/images/${imgPrefix}_knight.png`));
        chessBoard.setPiece(row, 7, new Rook(color, "rook", { row: row, col: 7 }, `../assets/images/${imgPrefix}_rook.png`));
    };
    setupRow(0, "white", "white");
    setupRow(7, "black", "black");
    for (let i = 0; i < 8; i++) {
        chessBoard.setPiece(1, i, new Pawn("white", "pawn", { row: 1, col: i }, "../assets/images/white_pawn.png"));
        chessBoard.setPiece(6, i, new Pawn("black", "pawn", { row: 6, col: i }, "../assets/images/black_pawn.png"));
    }
    Render.renderBoard(chessBoard);
}
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
export function isPawnPromotion(chessBoard, row, col) {
    const piece = chessBoard.getPiece(row, col);
    return piece && piece.getType() === "pawn" && (row === 0 || row === 7);
}
export function selectPiecePromotion(chessBoard, row, col) {
    var _a, _b, _c, _d;
    const promote = document.querySelector(".promote");
    promote.style.transform = "scale(1)";
    const currentPlayer = chessBoard.getCurrentPlayer();
    const queen_btn = document.getElementById("promote_btn-queen");
    const rook_btn = document.getElementById("promote_btn-rook");
    const bishop_btn = document.getElementById("promote_btn-bishop");
    const knight_btn = document.getElementById("promote_btn-knight");
    queen_btn === null || queen_btn === void 0 ? void 0 : queen_btn.replaceWith(queen_btn.cloneNode(true));
    rook_btn === null || rook_btn === void 0 ? void 0 : rook_btn.replaceWith(rook_btn.cloneNode(true));
    bishop_btn === null || bishop_btn === void 0 ? void 0 : bishop_btn.replaceWith(bishop_btn.cloneNode(true));
    knight_btn === null || knight_btn === void 0 ? void 0 : knight_btn.replaceWith(knight_btn.cloneNode(true));
    (_a = document
        .getElementById(`promote_btn-queen`)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        chessBoard.setPiece(row, col, new Queen(currentPlayer, "queen", { row, col }, `../assets/images/${currentPlayer}_queen.png`));
        promote.style.transform = "scale(0)";
        Render.renderBoard(chessBoard);
    });
    (_b = document
        .getElementById(`promote_btn-rook`)) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        chessBoard.setPiece(row, col, new Rook(currentPlayer, "rook", { row, col }, `../assets/images/${currentPlayer}_rook.png`));
        promote.style.transform = "scale(0)";
        Render.renderBoard(chessBoard);
    });
    (_c = document
        .getElementById(`promote_btn-bishop`)) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        chessBoard.setPiece(row, col, new Bishop(currentPlayer, "bishop", { row, col }, `../assets/images/${currentPlayer}_bishop.png`));
        promote.style.transform = "scale(0)";
        Render.renderBoard(chessBoard);
    });
    (_d = document
        .getElementById(`promote_btn-knight`)) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        chessBoard.setPiece(row, col, new Knight(currentPlayer, "knight", { row, col }, `../assets/images/${currentPlayer}_knight.png`));
        promote.style.transform = "scale(0)";
        Render.renderBoard(chessBoard);
    });
}
export function getKing(chessBoard, color) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = chessBoard.getPiece(i, j);
            if (piece &&
                piece.getType() === "king" &&
                piece.getColor() === color)
                return piece;
        }
    }
}
export function isCheck(chessBoard) {
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
                        return (pos.row === (kingPos === null || kingPos === void 0 ? void 0 : kingPos.row) && pos.col === (kingPos === null || kingPos === void 0 ? void 0 : kingPos.col));
                    }))) {
                    Render.renderCheck(chessBoard, kingPos.row, kingPos.col);
                    return true;
                }
            }
        }
    }
    const tmp = document.querySelector(`.cell-${kingPos === null || kingPos === void 0 ? void 0 : kingPos.row}-${kingPos === null || kingPos === void 0 ? void 0 : kingPos.col}`);
    if (tmp)
        tmp.id = "";
    return false;
}
export function isMath(chessBoard) {
    const color = chessBoard.getCurrentPlayer();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = chessBoard.getPiece(i, j);
            if (piece && piece.getColor() === color) {
                const moves = piece.getAvailableMoves(chessBoard);
                if (moves === null || moves === void 0 ? void 0 : moves.some(pos => virtualBoard(chessBoard, { row: i, col: j }, pos))) {
                    return false;
                }
            }
        }
    }
    return true;
}
export function virtualBoard(chessBoard, pos, newPos) {
    var _a, _b, _c;
    const virtualBoard = new ChessBoard(chessBoard.getCurrentPlayer());
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const clone = (_a = chessBoard.getPiece(i, j)) === null || _a === void 0 ? void 0 : _a.clone();
            if (!clone)
                continue;
            virtualBoard.setPiece(i, j, clone);
            if (virtualBoard.getPiece(i, j)) {
                (_b = virtualBoard.getPiece(i, j)) === null || _b === void 0 ? void 0 : _b.setPosition({ row: i, col: j });
            }
        }
    }
    const piece = virtualBoard.getPiece(pos.row, pos.col);
    if (piece) {
        virtualBoard.setPiece(newPos.row, newPos.col, piece);
    }
    (_c = virtualBoard.getPiece(newPos.row, newPos.col)) === null || _c === void 0 ? void 0 : _c.setPosition({
        row: newPos.row,
        col: newPos.col,
    });
    virtualBoard.deletePiece(pos.row, pos.col);
    return !isCheck(virtualBoard);
}
//# sourceMappingURL=game.js.map