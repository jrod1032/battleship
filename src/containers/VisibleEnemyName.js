import { connect } from 'react-redux';
import EnemyName from '../components/EnemyName.jsx';

const getGlowingState = (turn, name) => {
  return turn === name ? 'glowing' : '';
}

const mapStateToProps = state => {
  return {
    glowingState: getGlowingState(state.gameLogic.turn, state.gameLogic.enemyName),
    name: state.gameLogic.enemyName
  }
}

export default connect (
  mapStateToProps
  )(EnemyName)