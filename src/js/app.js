import { ChessBoard } from "./domain/chess_board.js";
import * as func from "./domain/game.js";
import { boardEvents } from "./domain/event.js";
import { History } from './domain/history.js';
func.generateHtmlCells();
const chessBoard = new ChessBoard();
const history = new History();
boardEvents(chessBoard, history);
func.start(chessBoard);
history.init(chessBoard);
//# sourceMappingURL=app.js.map