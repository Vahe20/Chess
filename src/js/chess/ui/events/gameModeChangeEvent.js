import { GameMode } from "../../core/GameMode.js";
import { gameMode } from "../../Enums.js";
import { AiMove } from "../helper.js";
export function initGameModeChangeEvent(ChessBoard, history) {
    const sel = document.getElementById("gameMode");
    if (!sel)
        return;
    sel.value = GameMode.getGameMode();
    sel.addEventListener("change", () => {
        GameMode.setGameMode(sel.value);
        if (sel.value !== gameMode.PVP &&
            ChessBoard.getCurrentPlayer() === "black") {
            AiMove(ChessBoard, history);
        }
    });
}
//# sourceMappingURL=gameModeChangeEvent.js.map