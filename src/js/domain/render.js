import { ChessPiece } from "./chessPiece/chessPiece.js";
export class Render {
    static renderBoard(chessBoard) {
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
        console.log(boardEl);
        console.log(boardEl.offsetWidth);
        const boardSizePx = boardEl.offsetWidth;
        const cellSize = boardSizePx / 8;
        const deltaX = (newPos.col - oldPos.col) * cellSize;
        const deltaY = (oldPos.row - newPos.row) * cellSize;
        img.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        img.addEventListener("transitionend", () => {
            img.style.transition = "none";
            img.style.transform = "";
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
        const winnerColor = color === "white" ? "Black" : "White";
        const menu = document.querySelector(".menu");
        const winner = document.getElementById("win");
        const menuImg = document.getElementById("menu_img");
        if (menu)
            menu.style.transform = "scale(1)";
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
//# sourceMappingURL=render.js.map