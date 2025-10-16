import { initBoardEvents } from "./boardEvents.js";
import { initGameModeChangeEvent } from "./gameModeChangeEvent.js";
import { initMenuEvents } from "./menuEvents.js";
import { initUiEvents } from "./uiEvents.js";
export function initEvents(chessBoard, history, game) {
    initBoardEvents(chessBoard, history);
    initMenuEvents(chessBoard, history, game);
    initUiEvents(chessBoard, history);
    initGameModeChangeEvent();
}
//# sourceMappingURL=index.js.map