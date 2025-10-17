var gameMode;
(function (gameMode) {
    gameMode["hard"] = "hard";
    gameMode["medium"] = "medium";
    gameMode["easy"] = "easy";
    gameMode["PVP"] = "PVP";
})(gameMode || (gameMode = {}));
var PricePiece;
(function (PricePiece) {
    PricePiece[PricePiece["pawn"] = 1] = "pawn";
    PricePiece[PricePiece["knight"] = 4] = "knight";
    PricePiece[PricePiece["bishop"] = 4] = "bishop";
    PricePiece[PricePiece["rook"] = 8] = "rook";
    PricePiece[PricePiece["queen"] = 20] = "queen";
    PricePiece[PricePiece["king"] = 200] = "king";
})(PricePiece || (PricePiece = {}));
export { gameMode, PricePiece };
//# sourceMappingURL=Enums.js.map