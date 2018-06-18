import React from 'react';
import PropTypes from 'prop-types';

const GamePhaseBoard = (props) => {
 
  return (
  <div id="gamePhase">
    <div id="gamePhaseTitle">{props.gamePhase.toUpperCase()}</div>
  </div>
  )
}

GamePhaseBoard.PropTypes = {
  gamePhase: PropTypes.string.isRequired
}

export default GamePhaseBoard;