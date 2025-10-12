import { Render } from "./render.js";
class node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
export class History {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.current = null;
    }
    init(chessBoard) {
        const initialNode = new node({
            oldPos: { row: -1, col: -1 },
            newPos: { row: -1, col: -1 },
            chessPiece: undefined,
            chessBoard: chessBoard.clone(),
        });
        this.head = initialNode;
        this.tail = initialNode;
        this.current = initialNode;
        this.size = 1;
    }
    push(oldPos, newPos, chessPiece, chessBoard) {
        const newNode = new node({
            oldPos,
            newPos,
            chessPiece,
            chessBoard: chessBoard.clone(),
        });
        if (this.current) {
            this.current.next = newNode;
            newNode.prev = this.current;
            this.current = newNode;
            this.tail = newNode;
        }
        else {
            this.head = newNode;
            this.tail = newNode;
            this.current = newNode;
        }
        this.size++;
        this.renderHistory();
    }
    undo(chessBoard) {
        if (this.current && this.current.prev) {
            this.current = this.current.prev;
            Render.movePieceAnim(chessBoard, this.current.next.value.newPos, this.current.next.value.oldPos);
            chessBoard.loadState(this.current.value.chessBoard);
            this.renderHistory();
        }
    }
    redo(chessBoard) {
        if (this.current && this.current.next) {
            this.current = this.current.next;
            Render.movePieceAnim(chessBoard, this.current.value.oldPos, this.current.value.newPos);
            chessBoard.loadState(this.current.value.chessBoard);
            this.renderHistory();
        }
    }
    renderHistory() {
        History.clear();
        for (let node = this.head; node !== null; node = node.next) {
            if (node.value.oldPos.row === -1)
                continue;
            const move = node.value;
            History.addMove(move.oldPos, move.newPos, move.chessPiece);
        }
    }
    static addMove(oldPos, newPos, chessPiece) {
        const MovesList = document.getElementById("movesList");
        let o = String.fromCharCode("A".charCodeAt(0) + oldPos.col) +
            "" +
            (oldPos.row + 1);
        let n = String.fromCharCode("A".charCodeAt(0) + newPos.col) +
            "" +
            (newPos.row + 1);
        if (chessPiece) {
            MovesList.innerHTML =
                `<p>${o} => ${n} attack ${chessPiece.getType()}</p>` +
                    MovesList.innerHTML;
        }
        else {
            MovesList.innerHTML =
                `<p>${o} => ${n} move</p>` + MovesList.innerHTML;
        }
        const movesCount = document.getElementById("movesCount");
        if (movesCount) {
            movesCount.textContent = String((+movesCount.textContent || 0) + 1);
        }
    }
    static clear() {
        const MovesList = document.getElementById("movesList");
        MovesList.innerHTML = ``;
        const movesCount = document.getElementById("movesCount");
        if (movesCount) {
            movesCount.textContent = "0";
        }
    }
}
//# sourceMappingURL=history.js.map