import { ChessPiece } from "../chessPiece/chessPiece.js";
import { menuOpenHandler } from "./helper.js";
import { Rules } from "../core/Rules.js";
export class Render {
    static renderBoard(chessBoard) {
        this.clearSelectedCell();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cell = document.querySelector(`.cell-${i}-${j}`);
                const piece = chessBoard.getPiece(i, j);
                if (!cell)
                    continue;
                if (piece instanceof ChessPiece) {
                    cell.innerHTML = `<img class="${piece.getColor() === "white" ? "white" : "black"}" id="img-${i}-${j}" src="${piece.getImg()}" draggable="false" alt="${piece.getType()}">`;
                }
                else {
                    cell.innerHTML = "";
                }
            }
        }
    }
    static movePieceAnim(chessboard, oldPos, newPos) {
        const img = document.querySelector(`#img-${oldPos.row}-${oldPos.col}`);
        if (!img)
            return;
        img.style.transition = "transform 0.3s ease-in-out";
        const boardEl = document.querySelector(".board");
        if (!boardEl)
            return;
        const boardSizePx = boardEl.offsetWidth;
        const cellSize = boardSizePx / 8;
        const deltaX = (newPos.col - oldPos.col) * cellSize;
        const deltaY = (oldPos.row - newPos.row) * cellSize;
        const computedStyle = getComputedStyle(img);
        const baseTransform = computedStyle.transform === "none" ? "" : computedStyle.transform;
        img.style.transform = `${baseTransform} translate(${deltaX}px, ${deltaY}px)`;
        img.addEventListener("transitionend", () => {
            // img.style.transition = "none";
            img.style.transform = baseTransform;
            img.id = `img-${newPos.row}-${newPos.col}`;
            this.renderBoard(chessboard);
        }, { once: true });
    }
    static renderCastlingMove(castling_pos) {
        castling_pos.forEach(pos => {
            const cell = document.querySelector(`.cell-${pos.row}-${pos.col}`);
            if (cell)
                cell.id = "castling_cell";
        });
    }
    static renderMoves(moves) {
        moves.forEach(pos => {
            const cell = document.querySelector(`.cell-${pos.row}-${pos.col}`);
            if (cell)
                cell.id = "available_cell";
        });
    }
    static renderCheck(chessBoard, row, col) {
        const tmp = document.querySelector(`.cell-${row}-${col}`);
        if (tmp)
            tmp.id = "check_cell";
    }
    static renderMath(chessBoard) {
        const color = chessBoard.getCurrentPlayer();
        const winner = document.getElementById("win");
        const menuImg = document.getElementById("menu_img");
        if (!Rules.isCheck(chessBoard)) {
            if (winner)
                winner.textContent = "Ничья!";
            if (menuImg)
                menuImg.src = "none";
            menuOpenHandler();
            return;
        }
        const winnerColor = color === "white" ? "Чёрный" : "Белый";
        menuOpenHandler();
        if (winner)
            winner.textContent = `${winnerColor} win!`;
        if (menuImg)
            menuImg.src = `../assets/images/${color === "white" ? "black" : "white"}_king.png`;
    }
    static clearSelectedCell() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const tmp = document.querySelector(`.cell-${i}-${j}`);
                if (tmp)
                    tmp.id = "";
            }
        }
    }
}
//# sourceMappingURL=Render.js.map