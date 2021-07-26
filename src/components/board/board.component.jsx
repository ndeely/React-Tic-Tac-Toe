import React from "react";
import Square from "../square/square.component";

class Board extends React.Component {
    // draws a single square
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                active={this.props.winningLine && this.props.winningLine.includes(i)}
            />
        );
    }

    // draws the board with 3 rows of 3 squares each
    render() {
        let boardRows = [];
        for (let i = 0; i < 3; i++) {
            // build row of 3 squares
            let startSquare = 3 * i; // 0, 3, 6...
            let squares = [];
            for (let j = 0; j < 3; j++) {
                squares.push(this.renderSquare(startSquare + j));
            }
            // push row onto boardRows
            boardRows.push(
                <div className="board-row" key={i}>
                    {squares}
                </div>
            );
        }
        return (
            <div>
                {boardRows}
            </div>
        );
    }
}

export default Board;