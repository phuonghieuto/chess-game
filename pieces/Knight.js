class Knight extends Piece {
	constructor(position, name) {
		super(position, 'knight', name);
	}

	getAllowedMoves() {
		const position = this.position;
		return [
			filterPositions([parseInt(position) + 21]),
			filterPositions([parseInt(position) - 21]),
			filterPositions([parseInt(position) + 19]),
			filterPositions([parseInt(position) - 19]),
			filterPositions([parseInt(position) + 12]),
			filterPositions([parseInt(position) - 12]),
			filterPositions([parseInt(position) + 8]),
			filterPositions([parseInt(position) - 8])
		];
	}
}