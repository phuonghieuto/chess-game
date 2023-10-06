class Piece {
	constructor(position, rank, name) {
		this.position = position;
		this.rank     = rank;
		this.name     = name;
		this.color    = this.name.substring(0,5);
	}


	hasRank(rank) {
		return this.rank == rank;
	}

	changePosition(position) {
		this.position = parseInt(position);
	}

	getAllowedMoves() {
		return [];
	}

	getMovesTop() {
		const movesTop = [];
		for (let move = this.position+10; move <= 88; move+=10) movesTop.push(move);
		return filterPositions(movesTop);
	}

	getMovesBottom() {
		const movesBottom = [];
		for (let move = this.position-10; move >= 11 ; move-=10) movesBottom.push(move);
		return filterPositions(movesBottom);
	}

	getMovesRight() {
		const num = this.position+'';
		const movesRight = [];
		for (let move = this.position+1; move <= parseInt(num[0]+'8'); move++) movesRight.push(move);
		return filterPositions(movesRight);
	}

	getMovesLeft() {
		const num = this.position+'';
		const movesLeft = [];
		for (let move = this.position-1; move >= parseInt(num[0]+'1'); move--) movesLeft.push(move);
		return filterPositions(movesLeft);
	}

	getMovesTopRight() {
		const movesTopRight = [];
		for (let move = this.position+11; move <= 88; move+=11) {
			const firstDigit = (''+move)[1];
			if (firstDigit > 8 || firstDigit < 1) break;
			movesTopRight.push(move);
		}
		return filterPositions(movesTopRight);
	}

	getMovesTopLeft() {
		const movesTopLeft = [];
		for (let move = this.position+9; move <= 88; move+=9) {
			const firstDigit = (''+move)[1];
			if (firstDigit > 8 || firstDigit < 1) break;
			movesTopLeft.push(move);
		}
		return filterPositions(movesTopLeft);
	}

	getMovesBottomRight() {
		const movesBottomRight = [];
		for (let move = this.position-9; move >= 11 ; move-=9) {
			const firstDigit = (''+move)[1];
			if (firstDigit > 8 || firstDigit < 1) break;
			movesBottomRight.push(move);
		}
		return filterPositions(movesBottomRight);
	}

	getMovesBottomLeft() {
		const movesBottomLeft = [];
		for (let move = this.position-11; move >= 11 ; move-=11) {
			const firstDigit = (''+move)[1];
			if (firstDigit > 8 || firstDigit < 1) break;
			movesBottomLeft.push(move);
		}
		return filterPositions(movesBottomLeft);
	}
}