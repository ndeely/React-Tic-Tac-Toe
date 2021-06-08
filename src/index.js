import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*class Square extends React.Component {
  render() {
    return (
      <button 
          className="square"
          onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}*/

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  
  renderSquare(i) {
    return (<Square
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)}
          />
      );
  }

  render() {
    return (
      <div>
        
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        xIsNext: true,
        col: 0,
        row: 0,
      }],
      stepNumber: 0,
      xIsNext: true,
      isActive: -1,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
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
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) === 0,
      isActive: step,
    });
    
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        "Go to move #" + move + " : " + this.playerMove(move):
        "Go to game start";
      return (
        <li key={move}>
          <button class={this.state.isActive === move ? "active" : ""} onClick = {() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (this.state.history.length === 10) {
      status = "The game ends in a draw";
    } else {
      status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  playerMove(move) {
    return (this.state.history[move].xIsNext ? "O" : "X") + 
            " (" + this.state.history[move].col + ", " + this.state.history[move].row + ")";
  }
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
