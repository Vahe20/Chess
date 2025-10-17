import { gameMode } from "../Enums.js"

export class GameMode {
	static gameMode: gameMode = GameMode.loadFromStorage();

	static getGameMode(): gameMode {
		return this.gameMode;
	}

	static setGameMode(mode: gameMode) {
		this.gameMode = mode;
		localStorage.setItem("game.difficulty", mode);
	}

	private static loadFromStorage(): gameMode {
		const saved = localStorage.getItem("game.difficulty");
		if (saved && Object.values(gameMode).includes(saved as gameMode)) {
			return saved as gameMode;
		}
		return gameMode.medium;
	}
	
}
