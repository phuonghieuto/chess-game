const pieces = [
    new Rook(11, 'whiteRook1'),
    new Knight(12, 'whiteKnight1'),
    new Bishop(13, 'whiteBishop1'),
    new Queen(14, 'whiteQueen'),
    new King(15, 'whiteKing'),
    new Bishop(16, 'whiteBishop2'),
    new Knight(17, 'whiteKnight2'),
    new Rook(18, 'whiteRook2'),
    new Pawn(21, 'whitePawn1'),
    new Pawn(22, 'whitePawn2'),
    new Pawn(23, 'whitePawn3'),
    new Pawn(24, 'whitePawn4'),
    new Pawn(25, 'whitePawn5'),
    new Pawn(26, 'whitePawn6'),
    new Pawn(27, 'whitePawn7'),
    new Pawn(28, 'whitePawn8'),

    new Pawn(71, 'blackPawn1'),
    new Pawn(72, 'blackPawn2'),
    new Pawn(73, 'blackPawn3'),
    new Pawn(74, 'blackPawn4'),
    new Pawn(75, 'blackPawn5'),
    new Pawn(76, 'blackPawn6'),
    new Pawn(77, 'blackPawn7'),
    new Pawn(78, 'blackPawn8'),
    new Rook(81, 'blackRook1'),
    new Knight(82, 'blackKnight1'),
    new Bishop(83, 'blackBishop1'),
    new Queen(84, 'blackQueen'),
    new King(85, 'blackKing'),
    new Bishop(86, 'blackBishop2'),
    new Knight(87, 'blackKnight2'),
    new Rook(88, 'blackRook2')
];

const cells = document.querySelectorAll('.cell');
var turn = 'W';
// Inserting the Images
function initBoard() {

    document.querySelectorAll('.piece').forEach(image => {

        if (image.innerText.length !== 0) {
            image.innerHTML = `${image.innerText} <img draggable="false" class='image' src="./assets/images/${image.innerText}.png" alt="">`
        }
    })
}
initBoard()

//Coloring

function coloring() {
    var images = document.querySelectorAll('.image');
    var prevColor = 'B';
    var i = 0;
    images.forEach(cell => {
        i++;
        if(i<=16){
            cell.classList.add('B');
        } else {
            cell.classList.add('W');
        }
    })
}
coloring();

function changeTurn() {
    var images = document.querySelectorAll('.image'+'.'+turn);
    images.forEach(image => image.removeEventListener('mousedown', handleMouseDown));
    images.forEach(image => image.removeEventListener('mouseup', handleMouseUp));
    images.forEach(image => image.removeEventListener('mousemove', handleMouseMove));

    if(turn == 'W'){
        turn = 'B';
        document.getElementById('turn').innerText = 'Black\'s Turn';
    } else {
        turn = 'W';
        document.getElementById('turn').innerText = 'White\'s Turn';
    }
}

function cleanHighlight() {
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('highlight'));
}

function cleanHint() {
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('hint'));
}

function cleanCapture() {
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('capture'));
}

function cleanOldMove() {
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('old-move'));
}

function handleMovePiece() {
    var images = document.querySelectorAll('.image'+'.'+turn);
    images.forEach(image => image.addEventListener('mousedown', handleMouseDown));
    images.forEach(image => image.addEventListener('mouseup', handleMouseUp));
    images.forEach(image => image.addEventListener('mousemove', handleMouseMove));
}
handleMovePiece();

function handleChooseHint(positions) {
    positions.forEach(pos => document.getElementById(pos).addEventListener('click', handleClickHint));
}


function handleMouseDown(e) {
    cleanCapture();
    cleanHint();
    if(document.getElementById(this.parentNode.id+'i').classList.contains('highlight')){
        cleanHighlight();
        return
    } else {
        cleanHighlight();
    }
    this.allowedPos = showAvailableMove(this);
    this.style.cursor = 'grabbing';
    this.isDown = true;
    this.oldX = e.clientX;
    this.oldY = e.clientY;
    var clone = this.cloneNode(true);
    clone.style.zIndex=1;
    clone.style.opacity = '0.5';
    clone.classList.add('clone');
    this.parentNode.appendChild(clone);
    var highlight = document.getElementById(this.parentNode.id+'i');
    highlight.classList.add('highlight');
    this.style.zIndex = 3;

    handleChooseHint(this.allowedPos);
}
function handleMouseUp(e){
    this.isDown = false;
    this.style.cursor = 'grab';

    var clone = document.querySelector('.clone');
    if(clone) clone.remove();

    var board = document.querySelector('.board');
    var newi = 9-Math.ceil((this.oldY-board.offsetTop)/70); 
    var newj = Math.ceil((this.oldX-board.offsetLeft)/70); 
    var newid = newi*10+newj;

    const position = parseInt(this.parentNode.id);
    var p = getPieceByPos(position);

    if(this.allowedPos && this.allowedPos.includes(newid)) {
        cleanOldMove();
        checkCaptureMove(newid);

        var oldPos = document.getElementById(this.parentNode.id+'i');
        oldPos.classList.add('old-move');

        var newCell = document.getElementById(newid);
        newCell.innerHTML = `${this.parentNode.innerText} <img draggable="false" class='image ${turn}' src="./assets/images/${this.parentNode.innerText}.png" alt="">`
        this.parentNode.innerHTML = '';

        p.changePosition(newid);

        this.allowedPos.forEach(pos => document.getElementById(pos).removeEventListener('click', handleClickHint));
        cleanHint();
        cleanCapture();

        var highlight = document.getElementById(newid+'i');
        highlight.classList.add('highlight');
        highlight.classList.add('old-move');

        cleanHighlight();
        changeTurn();
    } else {
        this.parentNode.innerHTML = `${this.parentNode.innerText} <img draggable="false" class='image ${turn}' src="./assets/images/${this.parentNode.innerText}.png" alt="">`
    }
    this.style.zIndex = 2;
    handleMovePiece();
}

function handleMouseMove(e){
    if(this.isDown){
        this.style.zIndex = 10;
        const dX = e.clientX - this.oldX;
        const dY = e.clientY - this.oldY;

        this.style.left = (this.offsetLeft + dX) +'px';
        this.style.top = (this.offsetTop + dY) +'px';

        this.oldX = e.clientX;
        this.oldY = e.clientY;
    }
}

function showAvailableMove(piece) {
    const position = parseInt(piece.parentNode.id);
    var p = getPieceByPos(position);
    var allowedPos = handlePieceMove(p);
    return allowedPos;
}

function handlePieceMove(piece) {
    var possibleMove = piece.getAllowedMoves();
    const allowedMove = [];
    var allies = getPlayerPositions(piece.color);
    var enemies = getPlayerPositions(piece.color=='black'?'white':'black');
    switch (piece.rank) {
        case 'pawn':
            possibleMove[0].forEach( (pos) => {
                if(enemies.includes(pos)) {
                    allowedMove.push(pos);
                    var capture = document.getElementById(pos+'i');
                    capture.classList.add('capture');
                }
            });
            for(let i = 0; i < possibleMove[1].length; i++) {
                if(!allies.includes(possibleMove[1][i])&&!enemies.includes(possibleMove[1][i])) {
                    allowedMove.push(possibleMove[1][i]);
                    var hint = document.getElementById(possibleMove[1][i]+'i');
                    hint.classList.add('hint');
                } else {
                    break;
                }
            }
            break;
        default:
            for(let i = 0; i < possibleMove.length; i++) {
                for(let j = 0; j < possibleMove[i].length; j++) {
                    var pos = possibleMove[i][j];
                    if(enemies.includes(pos)) {
                        allowedMove.push(pos);
                        var capture = document.getElementById(pos+'i');
                        capture.classList.add('capture');
                    }
                    if(!allies.includes(pos)&&!enemies.includes(pos)) {
                        allowedMove.push(pos);
                        var hint = document.getElementById(pos+'i');
                        hint.classList.add('hint');
                    } else {
                        break;
                    }
                    
                }
            }
            break;
    }
    return allowedMove;
}

function checkCaptureMove(id){
    var newCell = document.getElementById(id);
    if(newCell.innerHTML.length > 0){
        var p = getPieceByPos(id);
        p.changePosition('00');
    }
}

 function getPlayerPositions(color){
    const pieces = getPiecesByColor(color);
    return pieces.map( a => parseInt(a.position));
}

function getPiecesByColor(color) {
    return pieces.filter(obj => {
    return obj.color === color
    });
}

function filterPositions(positions) {
    return positions.filter(pos => {
        const secondDigit = pos.toString().charAt(1);
        return pos > 10 && pos < 89 && secondDigit < 9 && secondDigit > 0;
    });
};

function getPieceByPos(piecePosition) {
    return pieces.filter(obj =>  obj.position == piecePosition )[0];
}

function handleClickHint(e){

    if(!document.getElementById(this.id+'i').classList.contains('hint')&&(!document.getElementById(this.id+'i').classList.contains('capture'))){
        return;
    }
    cleanOldMove();
    checkCaptureMove(this.id);

    console.log(document.getElementsByClassName('highlight')[0]);
    var oldPos = document.getElementsByClassName('highlight')[0].id.substring(0,2);

    var oldCell = document.getElementById(oldPos);
    document.getElementById(oldPos+'i').classList.add('old-move');
    this.allowedPos = showAvailableMove(oldCell.querySelector('.image'));

    var newCell = document.getElementById(this.id);
    newCell.innerHTML = `${oldCell.innerText} <img draggable="false" class='image ${turn}' src="./assets/images/${oldCell.innerText}.png" alt="">`
    oldCell.innerHTML = '';

    const position = parseInt(oldPos);
    var p = getPieceByPos(position);
    p.changePosition(this.id);

    this.allowedPos.forEach(pos => document.getElementById(pos).removeEventListener('click', handleClickHint));
    cleanHint();
    cleanCapture();

    var highlight = document.getElementById(this.id+'i');
    highlight.classList.add('highlight');
    highlight.classList.add('old-move');

    cleanHighlight();
    changeTurn();

    this.style.zIndex = 2;
    handleMovePiece();
}



