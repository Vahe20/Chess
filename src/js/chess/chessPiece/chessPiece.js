export class ChessPiece {
    constructor(color, type, position, img, isMoved = false) {
        this.isMoved = false;
        this.color = color;
        this.type = type;
        this.position = position;
        this.img = img;
        this.isMoved = isMoved;
    }
    getStatus() {
        return this.isMoved;
    }
    changeStatus() {
        this.isMoved = true;
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    getPosition() {
        return this.position;
    }
    setPosition(position) {
        this.position = position;
    }
    getImg() {
        return this.img;
    }
    setImg(img) {
        this.img = img;
    }
    move(chessBoard, newPos) {
        this.changeStatus();
        const pos = this.getPosition();
        chessBoard.deletePiece(pos.row, pos.col);
        chessBoard.setPiece(newPos.row, newPos.col, this);
        this.setPosition({ row: newPos.row, col: newPos.col });
    }
}
//# sourceMappingURL=chessPiece.js.map