import { GameMode } from "../../core/GameMode.js";
import { gameMode } from "../../Enums.js";

export function initGameModeChangeEvent() {
    const sel = document.getElementById("gameMode") as HTMLSelectElement;
	if (!sel) return;

	sel.value = GameMode.getGameMode();

	sel.addEventListener("change", () => {
		GameMode.setGameMode(sel.value as gameMode);
	});
}