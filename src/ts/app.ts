import { ChessBoard } from "./chess/core/ChessBoard.js";
import { Game } from "./chess/core/Game.js";
import { generateHtmlCells } from "./chess/ui/helper.js";
import { History } from "./chess/core/history.js";
import { initEvents } from "./chess/ui/events/index.js";

generateHtmlCells();

const chessBoard = new ChessBoard();
const history = new History();

const game = new Game(chessBoard);

initEvents(chessBoard, history, game);
game.start();

history.init(chessBoard);
