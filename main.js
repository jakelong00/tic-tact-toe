Player = (name, sign) => {
    return { name, sign };
}

Gameboard = (() => {
    let gb = [];

    let w2c = () => console.log({ gameboard: gb });

    let initboard = () => {
        gb = ['#', '#', '#',
            '#', '#', '#',
            '#', '#', '#'
        ];
        //return gameboard
    };

    let w2gb = (sign, index) => {
        // console.log({ index });
        gb[index] = sign;
    };

    let checkWin = () => {

        if (gb.length > 4) {

            //diagonals
            //console.table(gb);

            if ((gb[0] === gb[4]) && (gb[4] === gb[8]) && (gb[0] !== '#')) {
                return gb[0];
            }

            if ((gb[2] === gb[4]) && (gb[4] === gb[6]) && (gb[2] !== '#')) {
                return gb[2];
            }

            //columns
            let i = 0;
            for (i = 0; i < 3; i++) {
                if ((gb[i] === gb[3 + i]) && (gb[3 + i] === gb[6 + i]) && (gb[i] !== '#')) {
                    console.log('in column' + i);
                    return gb[i];
                }
            }

            //row
            for (i = 0; i < 3; i++) {
                if ((gb[i] === gb[1 + i]) && (gb[1 + i] === gb[2 + i]) && (gb[i] !== '#')) {
                    console.log('in row' + i);
                    return gb[i];
                }
            }

        }

    }

    return { w2c, w2gb, initboard, checkWin };

})();

GameManager = (() => {
    let currPlayer = Player('', '');
    let setcurrPlayer = p => {
        currPlayer = p;
    }
    let getcurrPlayer = () => {
        //console.log('currplayer set to ' + currPlayer.name);
        return currPlayer;
    };

    function InitGame() {
        console.log('in initgame()');
        GameManager.setcurrPlayer(playerX);
        //Gameboard.w2gb('X');
        //Gameboard.w2c();
        Gameboard.initboard();

        let cells = Array.from(document.querySelectorAll('.cell'));
        cells.forEach(c => {
            c.innerHTML = '';
            c.addEventListener('click', Playturn);
        });
    }

    return { setcurrPlayer, getcurrPlayer, InitGame };
})();

playerX = Player('PlayerX', 'X');
playerO = Player('PlayerO', 'O');

GameManager.InitGame();

function Playturn(target) {
    let cp = GameManager.getcurrPlayer();
    let x = target.currentTarget;
    switch (cp) {
        case playerX:
            //console.log(cp.sign);
            x.innerHTML = cp.sign;
            GameManager.setcurrPlayer(playerO);
            break;

        case playerO:
            //console.log(cp.sign);
            x.innerHTML = cp.sign;
            GameManager.setcurrPlayer(playerX);
            break;
    };
    Gameboard.w2gb(cp.sign, x.getAttribute('cell'));
    x.removeEventListener('click', Playturn);
    let a = Gameboard.checkWin();
    if (playerX.sign === a) {
        alert('PlayerX wins');
        GameManager.InitGame();
    } else if (playerO.sign === a) {
        alert('PlayerO wins');
        GameManager.InitGame();
    }
    // console.log({ a });

    //console.log(Gameboard.w2c());
}