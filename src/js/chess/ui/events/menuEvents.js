import { History } from "../../core/history.js";
import { Render } from "../Render.js";
import { menuOpenHandler } from "../helper.js";
export function initMenuEvents(chessBoard, history, game) {
    var _a, _b, _c, _d;
    (_a = document.getElementById("menu_open")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        menuOpenHandler();
    });
    (_b = document.getElementById("menu_exit")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        menuOpenHandler();
    });
    (_c = document.getElementById("restart")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        game.start();
        history.init(chessBoard);
        History.clear();
        Render.renderBoard(chessBoard);
        menuOpenHandler();
    });
    (_d = document.getElementById("changeColor")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        var _a;
        const board = document.querySelector(".board");
        const menu = document.querySelector(".menu");
        if (!board || !menu)
            return;
        let current = Number((_a = board.dataset.colorVariant) !== null && _a !== void 0 ? _a : "0");
        current = (current + 1) % 3;
        board.dataset.colorVariant = String(current);
        board.classList.remove("theme-0", "theme-1", "theme-2");
        board.classList.add(`theme-${current}`);
        menu.classList.remove("theme-0", "theme-1", "theme-2");
        menu.classList.add(`theme-${current}`);
    });
}
//# sourceMappingURL=menuEvents.js.map