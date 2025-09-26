export class History {
    static addMove(oldPos, newPos) {
        const MovesList = document.getElementById("movesList");
        let o = (String.fromCharCode("A".charCodeAt(0) + oldPos.col)) + "" + (oldPos.row + 1);
        let n = (String.fromCharCode("A".charCodeAt(0) + newPos.col)) + "" + (newPos.row + 1);
        MovesList.innerHTML = `<p>${o} move ${n}</p>` + MovesList.innerHTML;
        const movesCount = document.getElementById("movesCount");
        if (movesCount) {
            let tmp = +movesCount.textContent;
            movesCount.textContent = tmp >= 0 ? String(tmp += 1) : "0";
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