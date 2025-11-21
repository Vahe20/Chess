var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Render } from "./Render.js";
import { Rules } from "../core/Rules.js";
import { gameMode } from "../Enums.js";
import { GameMode } from "../core/GameMode.js";
import { AI } from "../ai/AI.js";
import { isPawnPromotion, selectPiecePromotion } from "../core/Promotion.js";
// helpers for board event handlers
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
            let ai = AI.getMove(chessBoard, "black");
            if (ai)
                moveHandler(chessBoard, ai.piece, history, ai.oldPos, ai.newPos);
        }, 500);
    }
};
// helpers for menu events
const menuOpenHandler = () => {
    const menu = document.querySelector(".menu");
    const board = document.querySelector(".board");
    if (!menu || !board)
        return;
    if (menu.style.transform === "rotateY(0deg)") {
        menu.style.transform = "rotateY(180deg)";
        board.style.transform = "rotateY(0deg)";
        board.style.zIndex = "10";
        menu.style.zIndex = "-10";
        return;
    }
    else {
        menu.style.transform = "rotateY(0deg)";
        board.style.zIndex = "0";
        board.style.transform = "rotateY(180deg)";
        menu.style.zIndex = "10";
    }
};
// helper to generate html cells for board
const generateHtmlCells = () => {
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
};
export { moveHandler, mathHandler, promotionHandler, AiMove, menuOpenHandler, generateHtmlCells, };
//# sourceMappingURL=helper.js.map