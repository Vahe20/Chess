import { ChessBoard } from "./domain/chess_board.js";
import * as func from "./domain/func.js";
import { boardEvents } from "./domain/event.js";

func.generateHtmlCells();

let chessBoard = new ChessBoard();

boardEvents(chessBoard);

func.start(chessBoard);