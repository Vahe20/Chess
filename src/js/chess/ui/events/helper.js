var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Render } from "../Render.js";
import { Rules } from "../../core/Rules.js";
import { gameMode } from "../../Enums.js";
import { GameMode } from "../../core/GameMode.js";
import { AI } from "../../ai/AI.js";
import { isPawnPromotion, selectPiecePromotion } from "../../core/Promotion.js";
const moveHandler = (chessBoard, piece, history, oldPos, newPos) => {
    const targetPiece = chessBoard.getPiece(newPos.row, newPos.col);
    piece.move(chessBoard, newPos);
    Render.movePieceAnim(chessBoard, oldPos, newPos);
    chessBoard.changeCurrentPlayer();
    history.push(oldPos, newPos, targetPiece, chessBoard);
};
function promotionHandler(chessBoard, row, col) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isPawnPromotion(chessBoard, row, col)) {
            selectPiecePromotion(chessBoard, row, col);
            const promote = document.querySelector(".promote");
            yield new Promise(resolve => {
                const observer = new MutationObserver(() => {
                    if (promote.style.transform === "scale(0)") {
                        observer.disconnect();
                        resolve();
                    }
                });
                observer.observe(promote, {
                    attributes: true,
                    attributeFilter: ["style"],
                });
            });
        }
    });
}
;
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
export { moveHandler, mathHandler, promotionHandler };
//# sourceMappingURL=helper.js.map