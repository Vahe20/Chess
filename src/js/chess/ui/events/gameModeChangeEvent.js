import { GameMode } from "../../core/GameMode.js";
export function initGameModeChangeEvent() {
    const sel = document.getElementById("gameMode");
    if (!sel)
        return;
    sel.value = GameMode.getGameMode();
    sel.addEventListener("change", () => {
        GameMode.setGameMode(sel.value);
    });
}
//# sourceMappingURL=gameModeChangeEvent.js.map