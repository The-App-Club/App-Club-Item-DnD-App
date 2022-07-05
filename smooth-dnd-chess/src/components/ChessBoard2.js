import { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import useForceUpdate from 'use-force-update';
// https://github.com/CharlesStover/use-force-update
// https://stackoverflow.com/questions/46240647/react-how-to-force-a-function-component-to-render

function ChessBoard() {
  const forceUpdate = useForceUpdate();

  const [board, setBoard] = useState(initBoard());

  function shouldAcceptDrop(payload, rowIndex, colIndex) {
    const { colIndex: fromCol, rowIndex: fromRow } = payload;
    const fromPiece = board[fromRow][fromCol];
    const piece = board[rowIndex][colIndex];

    if (fromPiece === piece) {
      return true;
    }
    if (fromPiece.side === piece.side) {
      return false;
    }

    return true;
  }

  function onDrop(dropResult, rowIndex, colIndex) {
    const { addedIndex, removedIndex, payload } = dropResult;

    if (addedIndex !== null || removedIndex !== null) {
      const newBoard = [...board] || [];

      if (removedIndex !== null) {
        newBoard[rowIndex][colIndex] = {};
      }

      if (addedIndex !== null) {
        newBoard[rowIndex][colIndex] = payload.piece;
      }

      setBoard(newBoard);
      forceUpdate();
      console.log('newBoard', newBoard);
    }
  }

  function onDragEnter(row, col) {
    const newBoard = [...board] || [];
    newBoard[row][col].hover = true;
    setBoard(newBoard);
    forceUpdate();
  }

  function onDragLeave(row, col) {
    const newBoard = [...board] || [];
    newBoard[row][col].hover = false;
    setBoard(newBoard);
    forceUpdate();
  }

  function renderPiece(piece) {
    if (piece.side) {
      const htmlcode = `&#${piece.data + (piece.side === 'black' ? 6 : 0)};`;
      const hover = piece.hover ? ' hover' : '';
      return (
        <Draggable>
          <div className={`piece${hover} ${piece.side}`}>
            <span dangerouslySetInnerHTML={{ __html: htmlcode }}></span>
          </div>
        </Draggable>
      );
    } else {
      return null;
    }
  }

  function getFirstPieceRow(side) {
    return [
      { type: 'rook', side, data: 9816 },
      { type: 'knight', side, data: 9814 },
      { type: 'bishop', side, data: 9815 },
      { type: 'queen', side, data: 9813 },
      { type: 'king', side, data: 9812 },
      { type: 'bishop', side, data: 9815 },
      { type: 'knight', side, data: 9814 },
      { type: 'rook', side, data: 9816 },
    ];
  }

  function getSecondPieceRow(side) {
    return [
      { type: 'pawn', side, data: 9817 },
      { type: 'pawn', side, data: 9817 },
      { type: 'pawn', side, data: 9817 },
      { type: 'pawn', side, data: 9817 },
      { type: 'pawn', side, data: 9817 },
      { type: 'pawn', side, data: 9817 },
      { type: 'pawn', side, data: 9817 },
      { type: 'pawn', side, data: 9817 },
    ];
  }

  function initBoard() {
    const board = [];
    for (let i = 0; i < 8; i++) {
      if (i === 0) {
        board.push(getFirstPieceRow('black'));
      } else if (i === 1) {
        board.push(getSecondPieceRow('black'));
      } else if (i === 6) {
        board.push(getSecondPieceRow('white'));
      } else if (i === 7) {
        board.push(getFirstPieceRow('white'));
      } else {
        board.push([{}, {}, {}, {}, {}, {}, {}, {}]);
      }
    }

    return board;
  }

  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return (
          <div className="row" key={rowIndex}>
            {row.map((piece, colIndex) => {
              return (
                <div className={`square ${(rowIndex + colIndex) % 2 === 0 ? 'white' : 'black'}`} key={`${rowIndex}${colIndex}`}>
                  <Container
                    style={{ height: '100%' }}
                    behaviour="drop-zone"
                    onDrop={(result) => onDrop(result, rowIndex, colIndex)}
                    shouldAcceptDrop={(_, payload) => shouldAcceptDrop(payload, rowIndex, colIndex)}
                    getChildPayload={() => ({ colIndex, rowIndex, piece })}
                    onDragEnter={() => onDragEnter(rowIndex, colIndex)}
                    onDragLeave={() => onDragLeave(rowIndex, colIndex)}
                  >
                    {renderPiece(piece)}
                  </Container>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ChessBoard;
