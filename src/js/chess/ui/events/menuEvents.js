import { History } from "../../core/history.js";
import { Render } from "../Render.js";
export function initMenuEvents(chessBoard, history, game) {
    var _a, _b, _c, _d, _e;
    (_a = document.getElementById("menu_open")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        const menu = document.querySelector(".menu");
        menu.style.transform = "scale(1)";
    });
    (_b = document.getElementById("menu_exit")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        const menu = document.querySelector(".menu");
        menu.style.transform = "scale(0)";
    });
    (_c = document.getElementById("restart")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        game.start();
        history.init(chessBoard);
        History.clear();
        Render.renderBoard(chessBoard);
        const menu = document.querySelector(".menu");
        menu.style.transform = "scale(0)";
    });
    (_d = document.getElementById("rotate")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        const blackPieces = document.getElementsByClassName("black");
        for (let i = 0; i < blackPieces.length; i++) {
            const el = blackPieces[i];
            el.style.transform =
                el.style.transform === "rotate(180deg)"
                    ? "rotate(0deg)"
                    : "rotate(180deg)";
        }
    });
    (_e = document.getElementById("changeColor")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
        var _a;
        const board = document.querySelector(".board");
        if (!board)
            return;
        let current = Number((_a = board.dataset.colorVariant) !== null && _a !== void 0 ? _a : "0");
        current = (current + 1) % 3;
        board.dataset.colorVariant = String(current);
        board.classList.remove("theme-0", "theme-1", "theme-2");
        board.classList.add(`theme-${current}`);
    });
}
//# sourceMappingURL=menuEvents.js.map