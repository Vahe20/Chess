import { initBoardEvents } from "./boardEvents.js";
import { initMenuEvents } from "./menuEvents.js";
import { initUiEvents } from "./uiEvents.js";
export function initEvents(chessBoard, history, game) {
    initBoardEvents(chessBoard, history);
    initMenuEvents(chessBoard, history, game);
    initUiEvents(chessBoard, history);
}
//# sourceMappingURL=index.js.map