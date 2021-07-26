import React from "react";

import Board from "../board/board.component";

import './game.styles.scss';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                xIsNext: true,
                col: 0,
                row: 0
            }],
            stepNumber: 0,
            xIsNext: true,
            isActive: -1,
            reversed: false
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([{
                squares: squares,
                xIsNext: !this.state.xIsNext,
                col: (i % 3) + 1,
                row: i > 5 ? 3 : (i > 2 ? 2 : 1),
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            isActive: -1,
            reversed: this.state.reversed
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step%2) === 0,
            isActive: step
        });

    }

    playerMove(move) {
        return (this.state.history[move].xIsNext ? "O" : "X") +
            " (" + this.state.history[move].col + ", " + this.state.history[move].row + ")";
    }

    reverseMoves() {
        this.setState({
            reversed: !this.state.reversed
        });
    }

    // returns the winner (X or O) if there is one, null otherwise
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            // the first square is occupied by something (X or O), and the second and third in the line contain the same value
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {
                    square: squares[a],
                    winningLine: lines[i]
                };
            }
        }
        return null;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        let moves = history.map(
            (step, move) => {
                const desc = move ?
                    "Go to move #" + move + " : " + this.playerMove(move):
                    "Go to game start";
                return (
                    <li key={move}>
                        <button
                            className={this.state.isActive === move ? "active" : ""}
                            onClick = {() => this.jumpTo(move)}
                        >
                            {desc}
                        </button>
                    </li>
                );
            }
        );

        if (this.state.reversed) {
            moves = moves.slice().reverse();
        }

        let status;
        if (winner) {
            status = "Winner: " + winner.square;
        } else if (history.length === 10) {
            status = "The game ends in a draw";
        } else {
            status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares = {current.squares}
                        winningLine = {winner ? winner.winningLine : null}
                        onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => {this.reverseMoves()}}>Toggle Move Order</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;