const gameBoard = (() => {
    const gameSquares = [];

    const createSquares = () => {
        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div');
            square.setAttribute('class', 'square');
            let board = document.getElementsByClassName('gameBoard');
            board[0].appendChild(square);
            gameSquares.push(square);
            
            const playerOne = document.getElementById('one');
            playerOne.setAttribute('class', 'selected');

            square.addEventListener('click', function() {
                square.innerHTML = displayController.changePiece();

                const markers = document.getElementsByClassName('markers');
                if (markers[0].classList.contains('selected')) {
                    markers[1].setAttribute('class', 'markers selected');
                    markers[0].setAttribute('class', 'markers');
                }                 
                if (markers[1].classList.contains('selected')) {
                    markers[0].setAttribute('class', 'markers selected');
                    markers[1].setAttribute('class', 'markers');
                }
            })
        }
    }    

    return {createSquares};
})();

const displayController = (() => {
    let playerPiece = 'x';

    const playerOnePiece = () => {
        const markers = document.getElementsByClassName('markers');
        markers[0].setAttribute('class', 'markers selected');
        markers[1].addEventListener('click', function() {
            markers[1].setAttribute('class', 'markers selected');
            markers[0].setAttribute('class', 'markers');
        })
    }   

    const changePiece = () => {
        const markers = document.getElementsByClassName('markers');
        if (markers[1].classList.contains('selected')) {
            playerPiece = 'o';
        }
        if (markers[0].classList.contains('selected')) {
            playerPiece = 'x';
        }
        return playerPiece;
    }

    return {playerOnePiece, changePiece}; 
})();

const gameLogic = (() => {

})();

// const player = (name, piece, id) => {
//     const playerTurn = () => {
//         const player = document.getElementById(id);
//         player.setAttribute('class', 'selected');
//         //const square = document.getElementsByClassName('square');

//     }

//     return {playerTurn};
// };

displayController.playerOnePiece();
gameBoard.createSquares();
// const playerOne = player('one', 'x', 'one');
// playerOne.playerTurn();
