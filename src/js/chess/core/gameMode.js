import { gameMode } from "../Enums.js";
export class GameMode {
    static getGameMode() {
        return this.gameMode;
    }
    static setGameMode(mode) {
        this.gameMode = mode;
        localStorage.setItem("game.difficulty", mode);
    }
    static loadFromStorage() {
        const saved = localStorage.getItem("game.difficulty");
        if (saved && Object.values(gameMode).includes(saved)) {
            return saved;
        }
        return gameMode.medium;
    }
}
GameMode.gameMode = GameMode.loadFromStorage();
//# sourceMappingURL=GameMode.js.map