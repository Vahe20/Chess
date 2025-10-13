import { Rules } from "./Rules.js";
import { Render } from "../ui/Render.js";
import { setupPieces, clearBoard } from "./Utils.js";
export class Game {
    constructor(chessBoard) {
        this.chessBoard = chessBoard;
    }
    start() {
        this.chessBoard.setCurrentPlayer("white");
        clearBoard(this.chessBoard);
        setupPieces(this.chessBoard);
        Render.renderBoard(this.chessBoard);
    }
    isCheck() {
        return Rules.isCheck(this.chessBoard);
    }
    isMath() {
        return Rules.isMath(this.chessBoard);
    }
}
//# sourceMappingURL=Game.js.map