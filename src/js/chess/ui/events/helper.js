import { Render } from "../Render.js";
import { Rules } from "../../core/Rules.js";
import { gameMode } from "../../Enums.js";
import { GameMode } from "../../core/GameMode.js";
import { AI } from "../../ai/AI.js";
const moveHandler = (chessBoard, piece, history, oldPos, newPos) => {
    const targetPiece = chessBoard.getPiece(newPos.row, newPos.col);
    piece.move(chessBoard, newPos);
    Render.movePieceAnim(chessBoard, oldPos, newPos);
    chessBoard.changeCurrentPlayer();
    history.push(oldPos, newPos, targetPiece, chessBoard);
};
function promotionHandler() { }
const mathHandler = (chessBoard, history) => {
    if (Rules.isMath(chessBoard)) {
        Render.renderMath(chessBoard);
    }
    else {
        AiMove(chessBoard, history);
    }
};
const AiMove = (chessBoard, history) => {
    if (GameMode.getGameMode() !== gameMode.PVP &&
        chessBoard.getCurrentPlayer() === "black") {
        setTimeout(() => {
            AI.makeMove(chessBoard, history, "black");
        }, 500);
    }
};
export { moveHandler, mathHandler };
//# sourceMappingURL=helper.js.map