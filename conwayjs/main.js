

const DEAD = 0;
const ALIVE = 1;
class Cell 
{
    static get DEAD() { return DEAD; }
    static get ALIVE() { return ALIVE; }

    constructor(x, y, start_state = Cell.DEAD) {
        this.x = x;
        this.y = y;
        this.state = start_state;
    }

    update(neighbors) {
        // Figure out how many neighbors are alive
        var alive_count = 0;
        for (var i = 0; i < neighbors.length; ++i) {
            if (neighbors[i].state == Cell.ALIVE) {
                ++alive_count;
            }
        }

        // Decided State
        if (this.state == Cell.DEAD) {
            if (alive_count == 3) {
                this.state = Cell.ALIVE;
                return;
            }
        } else if (this.state == Cell.ALIVE) {
            if (alive_count == 3 || alive_count == 2) {
                this.state = Cell.ALIVE;
                return;
            }
        }

        this.state = Cell.DEAD;
    }
};


class Game
{
    constructor(x, y) {
        this.board = new Array(x);
        for (var i = 0; i < this.board.length; ++i) {
            this.board[i] = new Array(y);
            for (var j = 0; j < this.board[i].length; ++j) {
                this.board[i][j] = new Cell(i, j);
            }
        }

        this.cell_symbol = "&#9748;";
    }

    findNeighbors(i, j) {
        var neighhors = [];
        if (i + 1 < this.board.length) {
            neighhors.push(this.board[i + 1][j]);

            if (j + 1 < this.board[i].length) {
                neighhors.push(this.board[i + 1][j + 1]);
            }
            if (j - 1 > -1) {
                neighhors.push(this.board[i + 1][j - 1]);
            }
        }
        if (i - 1 > -1) {
            neighhors.push(this.board[i - 1][j]);

            if (j + 1 < this.board[i].length) {
                neighhors.push(this.board[i - 1][j + 1]);
            }
            if (j - 1 > -1) {
                neighhors.push(this.board[i - 1][j - 1]);
            }
        }

        if (j + 1 < this.board[i].length) {
            neighhors.push(this.board[i][j + 1]);
        }
        if (j - 1 > -1) {
            neighhors.push(this.board[i][j - 1]);
        }

        return neighhors;
    }

    update() {
        for (var i = 0; i < this.board.length; ++i) {
            for (var j = 0; j < this.board[i].length; ++j) {
                this.board[i][j].update(this.findNeighbors(i, j));
            }
        }

        this.draw();
    }

    draw() {
        $('#game-table tr').each((i, row) => {
            for (var j = 0; j < row.cells.length; ++j) {
                if (this.board[i][j].state == Cell.ALIVE) {
                    $(row.cells[j]).html(" | " + this.cell_symbol);
                } else {
                    $(row.cells[j]).html(" | ");
                }
            }
        });
    }
};

$(document).ready(function() {
    game = new Game(35, 40);

    var Delay = $('<input type="range" min="10" max="1500" value="16" id="delay-time"><span id="delay-value"></span>');
    var Alive = $('<input type="text" maxlength="1" id="cell-symbol" value="&#9748;">');
    var Freeze = $('<input type="checkbox" id="game-stop"><label>Stop</label>');
    var Step = $("<button>Step</button>");

    var GameTable = $("<table id='game-table'></table>");

    for (var i = 0; i < game.board.length; ++i) {
        var row = $("<tr></tr>");

        for (var j = 0; j < game.board[i].length; ++j) {
            row.append("<td></td>")

            if (j % 2 == 0) {
                game.board[i][j].state = Cell.ALIVE;
            }
        }

        GameTable.append(row);
    }

    $("#game").append(Delay);
    $("#game").append(Alive);
    $("#game").append(Freeze);
    $("#game").append(Step);
    $("#game").append(GameTable);

    game.update();

    var dt = setInterval(game.update.bind(game), 16);

    Delay.change(function() {
        $("#delay-value").html(Delay.val());
        clearInterval(dt);
        dt = setInterval(game.update.bind(game), Delay.val());
    });

    Alive.change(function() {
        game.cell_symbol = $("#cell-symbol").val();
    });

    Freeze.change(function() {
        if (Freeze.is(":checked")) {
            clearInterval(dt);
        } else {
            dt = setInterval(game.update.bind(game), Delay.val());
        }
    });

    Step.click(function() {
        game.update();
    });
});



