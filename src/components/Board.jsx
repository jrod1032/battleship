import React from 'react';
import PropTypes from 'prop-types';

const rows = ['A','B','C','D','E','F','G','H','I','J']
const columns = [1,2,3,4,5,6,7,8,9,10];

class Board extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.boardType === 'playerBoard') {
      return this.props.playerBoard !== nextProps.playerBoard || this.props.gamePhase !== nextProps.gamePhase
    } else {
      return this.props.enemyBoard !== nextProps.enemyBoard || this.props.gamePhase !== nextProps.gamePhase
    }
  }
  render() {
    const props = this.props;
    const board = props.boardType === 'playerBoard' ? props.playerBoard : props.enemyBoard;
    const lastRowHit = props.lastRowHit;
    const lastColumnHit = props.lastColumnHit;
    return (
    <div className={props.className}
         onMouseEnter={props.getCursorOnEnter}>
      <table>
        <thead>
          <tr className="boardOuter">
          <th></th>
          {columns.map(column=> <th key={column}>{column}</th>)}
          </tr> 
        </thead>
        <tbody>
          {board.map( (row, rowIdx) => {
            return <tr key={rowIdx}><th className="boardOuter">{rows[rowIdx]}</th>
            {columns.map((col, colIdx) => {
              return <td
              key={colIdx}
              className={`boardCell ${lastRowHit === rowIdx && lastColumnHit === colIdx && props.boardType === 'playerBoard' ? 'goldText': null}`}
              onClick={ 
                () => props.onCellClick(rowIdx, colIdx, props.boardType, props.gamePhase)}>
              {board[rowIdx][colIdx]}
              </td>
            })}</tr>
          })}   
        </tbody>
      </table>
    </div>
    )
  }
} 




Board.propTypes = {
  boardType: PropTypes.string.isRequired,
  playerBoard: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  enemyBoard: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  selectedPiece: PropTypes.string,
  selectedPos: PropTypes.string,
  getCursorOnEnter:PropTypes.func.isRequired,
  OnCellClick: PropTypes.func,
  lastRowHit: PropTypes.number,
  lastColumntHit: PropTypes.number
}

export default Board;