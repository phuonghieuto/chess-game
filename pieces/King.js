class King extends Piece {
	constructor(position, name) {
		super(position, 'king', name);
		this.ableToCastle = true;
	}


	getAllowedMoves() {
		const position = this.position;
		return [
			filterPositions([parseInt(position) + 1]),
			filterPositions([parseInt(position) - 1]),
			filterPositions([parseInt(position) + 10]),
			filterPositions([parseInt(position) - 10]),
			filterPositions([parseInt(position) + 11]),
			filterPositions([parseInt(position) - 11]),
			filterPositions([parseInt(position) + 9]),
			filterPositions([parseInt(position) - 9])
		];
	}

	changePosition(position, castle=false) {
		if (castle) {
			this.ableToCastle = false;
		}
		this.position = parseInt(position);
	}
}