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
                    cell.innerHTML = `<img class="${piece.getColor() === "white" ? "white" : "black"}" src="${piece.getImg()}" draggable="false" alt="${piece.getType()}">`;
                }
                else {
                    cell.innerHTML = "";
                }
            }
        }
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