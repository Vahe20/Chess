import { Render } from "../ui/Render.js";
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
        this.size = 1;
    }
    push(oldPos, newPos, chessPiece, chessBoard) {
        const newNode = new node({
            oldPos,
            newPos,
            chessPiece,
            chessBoard: chessBoard.clone(),
        });
        if (this.tail) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        else {
            this.head = newNode;
            this.tail = newNode;
        }
        this.size++;
        this.renderHistory();
    }
    undo(chessBoard) {
        if (this.tail && this.tail.prev) {
            this.tail = this.tail.prev;
            Render.movePieceAnim(chessBoard, this.tail.next.value.newPos, this.tail.next.value.oldPos);
            chessBoard.loadState(this.tail.value.chessBoard);
            this.renderHistory();
        }
    }
    redo(chessBoard) {
        if (this.tail && this.tail.next) {
            this.tail = this.tail.next;
            Render.movePieceAnim(chessBoard, this.tail.value.oldPos, this.tail.value.newPos);
            chessBoard.loadState(this.tail.value.chessBoard);
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