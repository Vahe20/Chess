var gameMode;
(function (gameMode) {
    gameMode["hard"] = "hard";
    gameMode["medium"] = "medium";
    gameMode["easy"] = "easy";
    gameMode["PVP"] = "PVP";
})(gameMode || (gameMode = {}));
var PricePiece;
(function (PricePiece) {
    PricePiece[PricePiece["pawn"] = 10] = "pawn";
    PricePiece[PricePiece["knight"] = 30] = "knight";
    PricePiece[PricePiece["bishop"] = 30] = "bishop";
    PricePiece[PricePiece["rook"] = 50] = "rook";
    PricePiece[PricePiece["queen"] = 90] = "queen";
    PricePiece[PricePiece["king"] = 1000] = "king";
})(PricePiece || (PricePiece = {}));
export { gameMode, PricePiece };
//# sourceMappingURL=Enums.js.map