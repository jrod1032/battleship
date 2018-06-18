import { connect } from 'react-redux';
import PlayerName from '../components/PlayerName.jsx';

const getGlowingState = (turn, name) => {
  return turn === name ? 'glowing' : '';
}

const mapStateToProps = state => {
  return {
    glowingState: getGlowingState(state.gameLogic.turn, state.gameLogic.playerName),
    name: state.gameLogic.playerName
  }
}

export default connect (
  mapStateToProps
  )(PlayerName)